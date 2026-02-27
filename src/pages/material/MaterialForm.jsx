import { useContext, useEffect, useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
//sections
import { SectionFormCard } from "./sections/SectionFormCard";
import { SectionFormDialogInUp } from "./sections/SectionFormDialogInUp";
import { SectionReqDialog } from "./sections/SectionReqDialog";
//components
import { OSPagination } from "@/components/OSPagination";
//context
import MyContext from "@/context/MyContext";
//guard
import { PrivateRoute } from "@/guard/PrivateRoute";
//services
import {
  GetMaterialService,
  InsertMaterialService,
  UpdateMaterialService,
} from "@/services/material.service";
import { InsertMtrReqService } from "@/services/material-requisition.service";

// const authorsTableData = [
//   {
//     material_Id: "1",
//     material_Code: "M-001",
//     material_Image: "",
//     material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
//     material_Detail:
//       "เป็นกล้องมิเรอร์เลส Full-Frame ไฮบริดรุ่นยอดนิยม ความละเอียด 33MP ชิปประมวลผล BIONZ XR โฟกัสรวดเร็วแม่นยำ (Real-time Eye AF) ถ่ายวิดีโอสูงสุด 4K 60p 10-bit 4:2:2 พร้อมจอพับ Vari-angle และระบบกันสั่น 5 แกน (5.5EV) เหมาะสำหรับทั้งภาพนิ่งและวิดีโอระดับมืออาชีพ ",
//     material_Price: "25000",
//     material_Stock: "5",
//     material_Position: "คลังสื่อ ชั้น 2 ห้อง 204",
//     material_CreationDate: "02/02/2569",
//     mtrType_Id: "กล้อง",
//   }
// ];

export function MaterialForm() {
  const { dataEmp, loader, setLoader } = useContext(MyContext);
  const navigate = useNavigate();

  const [itemReq, setItemReq] = useState();
  const [action, setAction] = useState("insert" || "update");
  const [itemMtr, setMtrItem] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [materials, setMaterials] = useState([]);
  const [fileBase64, setFileBase64] = useState("");
  const [imgFile, setImgFile] = useState(null);

  useEffect(() => {
    fetchData();
  }, [page, pageSize, dataEmp]);

  useEffect(() => {
    const intervalId = setInterval(fetchRealTimeData, 10000); // Fetch every 10 seconds
    return () => clearInterval(intervalId);
  }, [page, pageSize, dataEmp]);

  const fetchData = async () => {
    setLoader(true);
    if (dataEmp) {
      const resp = await GetMaterialService(
        page,
        pageSize,
        dataEmp.role_id,
        dataEmp.dpm_id,
      );
      if (resp) {
        setPage(resp.page || 1);
        setPageSize(resp.pageSize || 10);
        setTotalPages(resp.totalPages || 0);
        setTotalCount(resp.total || 0);
        setMaterials(resp.data || []);
      } else {
      }
    }
    setLoader(false);
  };

  const fetchRealTimeData = async () => {
    if (dataEmp) {
      const resp = await GetMaterialService(
        page,
        pageSize,
        dataEmp.role_id,
        dataEmp.dpm_id,
      );
      if (resp) {
        setPage(resp.page || 1);
        setPageSize(resp.pageSize || 10);
        setTotalPages(resp.totalPages || 0);
        setTotalCount(resp.total || 0);
        setMaterials(resp.data || []);
      } else {
      }
    }
  };

  const onPageChange = async (e) => {
    const selected = e.selected;
    setPage(selected + 1);
  };

  const handleChangePageSize = async (number) => {
    setPageSize(number);
  };

  const handleOpen = (text, item) => {
    setAction(text);
    setMtrItem(item);
  };

  const handleClose = () => {
    setAction("")
    setMtrItem(null);
    setFileBase64("");
    setImgFile(null);
    setItemReq(null)
  };

  const handleOpenReq = (item) => {
    setItemReq(item);
  };

  const handleCloseReq = () => {
    setAction("")
    setItemReq(null);
  };

  const handleUploadImg = async (file) => {
    const reader = new FileReader();
    setImgFile(file);
    setFileBase64("");
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];
      setFileBase64(base64);
    };
    reader.readAsDataURL(file);
  };

  const onSubmitMaterial = async (value) => {
    console.log("imgFile:", imgFile);
    //setOpen(false);
    setMtrItem(null);
    const mimeType = imgFile ? imgFile.type : "";
    const fileName = imgFile ? imgFile.name : "";
    setLoader(true);
    if (action === "insert") {
      const material_Image = fileBase64 ? fileBase64 : value.material_Image;
      const newValue = { ...value, mimeType, fileName, material_Image };
      const resp = await InsertMaterialService(newValue);
      //console.log("resp", resp);

      if (resp && resp.status === "200") {
        setFileBase64("");
        setImgFile(null);
        fetchData();
      }
    } else if (action === "update") {
      const material_NewImage = fileBase64 ? fileBase64 : "";
      const newValue = {
        ...value,
        mimeType: mimeType,
        fileName: fileName,
        material_NewImage: material_NewImage,
      };
      const resp = await UpdateMaterialService(newValue);
      if (resp && resp.status === "200") {
        setFileBase64("");
        setImgFile(null);
        fetchData();
      }
    }
    setLoader(false);
  };

  const onSubmitReqMaterial = async (value) => {
    handleCloseReq();
    setLoader(true);
    const resp = await InsertMtrReqService(value);
    if (resp && resp.status === "200") {
      fetchData();
      Swal.fire({
        title: "เบิกสำเร็จ?",
        text: "คลิ๊กตกลงเพื่อไปยังหน้ารายการเบิก",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard/req-material");
        }
      });
    }
    setLoader(false);
  };

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12 min-h-[65vh]">
        <div className="flex flex-row justify-between">
          <Typography variant="h6" color="blue-gray">
            คลังสื่อ
          </Typography>
          <PrivateRoute
            rolePrimary={dataEmp && dataEmp.role_id}
            rolesTrial={"R01"}
          >
            <Button
              disabled={loader}
              variant="gradient"
              color="blue"
              className="flex items-center justify-center gap-2"
              onClick={() => handleOpen("insert", {})}
            >
              <PlusCircleIcon className="w-5 h-5" />
              <p>เพื่มสื่อใหม่</p>
            </Button>
          </PrivateRoute>
        </div>
        <SectionFormCard
          data={materials}
          employee={dataEmp ? dataEmp : null}
          loader={loader}
          handleOpen={handleOpen}
          handleOpenReq={handleOpenReq}
        />
        <div className="w-full">
          {totalCount > 0 && (
            <OSPagination
              total={totalCount}
              pageCount={totalPages}
              page={page}
              pageSize={pageSize}
              onPageChange={onPageChange}
              handleChangePageSize={handleChangePageSize}
            />
          )}
        </div>
      </div>
      <SectionReqDialog
        open={itemReq ? true : false}
        value={itemReq ? itemReq : null}
        employee={dataEmp ? dataEmp : null}
        loader={loader}
        onSubmitReqMaterial={onSubmitReqMaterial}
        handleCloseReq={handleCloseReq}
      />
      <SectionFormDialogInUp
        employee={dataEmp ? dataEmp : null}
        open={itemMtr ? true : false}
        value={itemMtr ? itemMtr : null}
        action={action}
        imgFile={imgFile}
        loader={loader}
        handleClose={handleClose}
        handleUploadImg={handleUploadImg}
        onSubmitMaterial={onSubmitMaterial}
      />
    </>
  );
}

export default MaterialForm;
