import { useContext, useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
//sections
import { SectionDialogReqUp } from "./sections/SectionReqDialogUp";
import { SectionReqTable } from "./sections/SectionReqTable";
//services
import {
  GetMRHistoryService,
  GetMtrReqService,
  UpdateMtrReqService,
  UpdateMtrReqStatusService,
} from "@/services/material-requisition.service";
import { GetByIdMaterialService } from "@/services/material.service";
//context
import MyContext from "@/context/MyContext";
//components
import { OSPagination } from "@/components/OSPagination";

// const authorsTableData = [
//   {
//     mtrReq_Id: "1",
//     mtrReq_Code: "REQ-1001",
//     mtrReq_Amount: "5",
//     mtrReq_TotalPrice: "125000",
//     mtrReq_DateStart: "09/2/2569",
//     mtrReq_DateEnd: "10/2/2569",
//     mtrReqStatus_Id: "S01",
//     material_Id: "1",
//     material_Code: "M-001",
//     material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
//     material_Position: "คลังสื่อ ชั้น 2 ห้อง 204",
//     material_Price: "25000",
//     employee_FirstName: "คุณมะม่วง",
//   }
// ];

export function MaterialReqTeble() {
  const { dataEmp, loader, setLoader } = useContext(MyContext);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [requisitions, setRequisitions] = useState([]);
  const [itemReq, setItemReq] = useState(null);
  const [action, setAction] = useState("");

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
      const resp = await GetMtrReqService(
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
        setRequisitions(resp.data);
      } else {
      }
    }
    setLoader(false);
  };

  const fetchRealTimeData = async () => {
    if (dataEmp) {
      const resp = await GetMtrReqService(
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
        setRequisitions(resp.data);
      } else {
      }
    }
    setLoader(false);
  };

  const fetchDataHistories = async (id) => {
    const resp = await GetMRHistoryService(id);
    return resp;
  };

  const fetchDataByIdMaterial = async (id) => {
    setLoader(true);
    const resp = await GetByIdMaterialService(id);
    setLoader(false);
    if (resp) {
      return resp;
    }
    return null;
  };

  const onPageChange = async (e) => {
    const selected = e.selected;
    setPage(selected + 1);
  };

  const handleChangePageSize = async (number) => {
    setPageSize(number);
  };

  const handleChangeReq = async (data, act) => {
    setAction(act);
    if (act && act === "update") {
      const result = await fetchDataByIdMaterial(data.material_Id);
      if (result) {
        setItemReq({ ...data, ...result });
      }
    } else if (act && act === "timeline") {
      setLoader(true);
      const result = await fetchDataHistories(data.mtrReq_Id);
      if (result) {
        setItemReq(result);
      }
      setLoader(false);
    } else {
      setItemReq({ ...data });
    }
  };

  const handleCloseReq = () => {
    setItemReq(null);
    setAction("");
  };

  const onSubmitMtrReqStatus = async (formData) => {
    setLoader(true);
    handleCloseReq();
    const resp = await UpdateMtrReqStatusService(formData);
    if (resp && resp.status === "200") {
      await fetchData();
      return;
    }
    setLoader(false);
  };

  const onSubmitReqMaterial = async (formData) => {
    setLoader(true);
    handleCloseReq();
    const resp = await UpdateMtrReqService(formData);
    if (resp && resp.status === "200") {
      await fetchData();
      return;
    }
    setLoader(false);
  };

  return (
    <>
      <div className="min-h-[70vh] mt-12 mb-8 flex flex-col gap-12">
        <div className="flex flex-row justify-between">
          <Typography variant="h6" color="blue-gray">
            รายการเบิกสื่อ
          </Typography>
          {/* <Button
            variant="gradient"
            color="blue"
            className="flex items-center justify-center gap-2"
            onClick={()=> navigate("insert")}
          >
            <PlusCircleIcon className="w-5 h-5" />
            <p>เบิกสื่อ</p>
          </Button> */}
        </div>
        <SectionReqTable
          data={requisitions}
          employee={dataEmp ? dataEmp : null}
          loader={loader}
          handleChangeReq={handleChangeReq}
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

      <SectionDialogReqUp
        action={action}
        open={itemReq ? true : false}
        value={itemReq ? itemReq : null}
        employee={dataEmp ? dataEmp : null}
        onSubmitMtrReqStatus={onSubmitMtrReqStatus}
        onSubmitReqMaterial={onSubmitReqMaterial}
        handleCloseReq={handleCloseReq}
      />
    </>
  );
}

export default MaterialReqTeble;
