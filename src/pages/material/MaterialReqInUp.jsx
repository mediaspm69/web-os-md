import React from "react";
import { DocumentIcon, InboxStackIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import {
  Typography,
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Textarea,
  CardFooter,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//sections
import { SectionFormCard } from "./sections/SectionFormCard";
import { SectionFormDialogInUp } from "./sections/SectionFormDialogInUp";
import { Form, Formik } from "formik";
import * as Yup from 'yup'
const materialSchema = Yup.object().shape({
  material_Code: Yup.string().required("กรุณาระบุข้อมูล"),
  material_Name: Yup.string().required("กรุณาระบุข้อมูล"),
  material_Detail: Yup.string().required("กรุณาระบุข้อมูล"),
  material_Stock: Yup.string().required("กรุณาระบุข้อมูล"),
  material_Price: Yup.string().required("กรุณาระบุข้อมูล"),
  material_Position: Yup.string().required("กรุณาระบุข้อมูล"),
  material_CreationDate: Yup.string().required("กรุณาระบุข้อมูล"),
  //mtrType_Id: Yup.string().required("กรุณาระบุข้อมูล"),
});

const authorsTableData = [
  {
    material_Id: "1",
    material_Code: "M-001",
    material_Image:
      "https://images.unsplash.com/photo-1606986628470-26a67fa4730c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
    material_Detail:
      "เป็นกล้องมิเรอร์เลส Full-Frame ไฮบริดรุ่นยอดนิยม ความละเอียด 33MP ชิปประมวลผล BIONZ XR โฟกัสรวดเร็วแม่นยำ (Real-time Eye AF) ถ่ายวิดีโอสูงสุด 4K 60p 10-bit 4:2:2 พร้อมจอพับ Vari-angle และระบบกันสั่น 5 แกน (5.5EV) เหมาะสำหรับทั้งภาพนิ่งและวิดีโอระดับมืออาชีพ ",
    material_Price: "25000",
    material_Stock: "5",
    material_Position: "คลังสื่อ ชั้น 2 ห้อง 204",
    material_CreationDate: "23/04/18",
    mtrType_Id: "กล้อง",
  },
  {
    material_Id: "2",
    material_Code: "M-002",
    material_Image:
      "https://images.unsplash.com/photo-1606986628470-26a67fa4730c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
    material_Detail:
      "เป็นกล้องมิเรอร์เลส Full-Frame ไฮบริดรุ่นยอดนิยม ความละเอียด 33MP ชิปประมวลผล BIONZ XR โฟกัสรวดเร็วแม่นยำ (Real-time Eye AF) ถ่ายวิดีโอสูงสุด 4K 60p 10-bit 4:2:2 พร้อมจอพับ Vari-angle และระบบกันสั่น 5 แกน (5.5EV) เหมาะสำหรับทั้งภาพนิ่งและวิดีโอระดับมืออาชีพ ",
    material_Price: "25000",
    material_Stock: "5",
    material_Position: "คลังสื่อ ชั้น 2 ห้อง 204",
    material_CreationDate: "23/04/18",
    mtrType_Id: "กล้อง",
  },
  {
    material_Id: "3",
    material_Code: "M-003",
    material_Image:
      "https://images.unsplash.com/photo-1606986628470-26a67fa4730c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
    material_Detail:
      "เป็นกล้องมิเรอร์เลส Full-Frame ไฮบริดรุ่นยอดนิยม ความละเอียด 33MP ชิปประมวลผล BIONZ XR โฟกัสรวดเร็วแม่นยำ (Real-time Eye AF) ถ่ายวิดีโอสูงสุด 4K 60p 10-bit 4:2:2 พร้อมจอพับ Vari-angle และระบบกันสั่น 5 แกน (5.5EV) เหมาะสำหรับทั้งภาพนิ่งและวิดีโอระดับมืออาชีพ ",
    material_Price: "25000",
    material_Stock: "5",
    material_Position: "คลังสื่อ ชั้น 2 ห้อง 204",
    material_CreationDate: "23/04/18",
    mtrType_Id: "กล้อง",
  },
  {
    material_Id: "4",
    material_Code: "M-004",
    material_Image:
      "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
    material_Detail:
      "เป็นกล้องมิเรอร์เลส Full-Frame ไฮบริดรุ่นยอดนิยม ความละเอียด 33MP ชิปประมวลผล BIONZ XR โฟกัสรวดเร็วแม่นยำ (Real-time Eye AF) ถ่ายวิดีโอสูงสุด 4K 60p 10-bit 4:2:2 พร้อมจอพับ Vari-angle และระบบกันสั่น 5 แกน (5.5EV) เหมาะสำหรับทั้งภาพนิ่งและวิดีโอระดับมืออาชีพ ",
    material_Price: "25000",
    material_Stock: "0",
    material_Position: "คลังสื่อ ชั้น 2 ห้อง 204",
    material_CreationDate: "23/04/18",
    mtrType_Id: "กล้อง",
  },
  {
    material_Id: "5",
    material_Code: "M-005",
    material_Image:
      "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
    material_Detail:
      "เป็นกล้องมิเรอร์เลส Full-Frame ไฮบริดรุ่นยอดนิยม ความละเอียด 33MP ชิปประมวลผล BIONZ XR โฟกัสรวดเร็วแม่นยำ (Real-time Eye AF) ถ่ายวิดีโอสูงสุด 4K 60p 10-bit 4:2:2 พร้อมจอพับ Vari-angle และระบบกันสั่น 5 แกน (5.5EV) เหมาะสำหรับทั้งภาพนิ่งและวิดีโอระดับมืออาชีพ ",
    material_Price: "25000",
    material_Stock: "0",
    material_Position: "คลังสื่อ ชั้น 2 ห้อง 204",
    material_CreationDate: "23/04/18",
    mtrType_Id: "กล้อง",
  },
  {
    material_Id: "6",
    material_Code: "M-006",
    material_Image:
      "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
    material_Detail:
      "เป็นกล้องมิเรอร์เลส Full-Frame ไฮบริดรุ่นยอดนิยม ความละเอียด 33MP ชิปประมวลผล BIONZ XR โฟกัสรวดเร็วแม่นยำ (Real-time Eye AF) ถ่ายวิดีโอสูงสุด 4K 60p 10-bit 4:2:2 พร้อมจอพับ Vari-angle และระบบกันสั่น 5 แกน (5.5EV) เหมาะสำหรับทั้งภาพนิ่งและวิดีโอระดับมืออาชีพ ",
    material_Price: "25000",
    material_Stock: "0",
    material_Position: "คลังสื่อ ชั้น 2 ห้อง 204",
    material_CreationDate: "23/04/18",
    mtrType_Id: "กล้อง",
  },
];

export const MaterialReqInUp = () => {
   const [filter, setFilter] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [selected, setSelected] = useState(null);

  const  value = null
  const   action = "insert" || "update"
  const onSubmitMaterial = () => {

  }

  return (
    <div className="mt-10 p-2 min-h-[70vh]">
      <Card>
        <Formik
          enableReinitialize
          initialValues={{
            material_Id: value ? (value.material_Id ?? "") : "",
            material_Code: value ? (value.material_Code ?? "") : "",
            material_Name: value ? (value.material_Name ?? "") : "",
            material_Brand: value ? (value.material_Brand ?? "") : "",
            material_Model: value ? (value.material_Model ?? "") : "",
            material_Detail: value ? (value.material_Detail ?? "") : "",
            material_Stock: value ? (value.material_Stock ?? "") : "",
            material_Price: value ? (value.material_Price ?? "") : "",
            material_Position: value ? (value.material_Position ?? "") : "",
            material_ImgUrl: value ? (value.material_Image ?? "") : "",
            material_Image: "",
            material_File: "",
            material_CreationDate: value
              ? (value.material_CreationDate ?? "")
              : "",
            mtrType_Id: value ? (value.mtrType_Id ?? "") : "",
          }}
          validationSchema={materialSchema}
          onSubmit={onSubmitMaterial}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            const handleUpload = async (file) => {
              const reader = new FileReader();
              setFieldValue("material_File", file);
              setFieldValue("material_Image", "");
              reader.onloadend = async () => {
                const base64 = reader.result.split(",")[1];
                setFieldValue("material_Image", base64);
              };
              reader.readAsDataURL(file);
            };
            return (
              <Form onSubmit={handleSubmit}>
                <Card className="mx-auto w-full">
                  <CardBody className="flex flex-col gap-4 overflow-scroll max-h-[80vh]">
                    <div className="flex flex-row justify-start items-center gap-2">
                      <DocumentIcon className="w-5 h-5" />
                      <Typography variant="h4" color="blue-gray">
                        ทำรายการเบิกสื่อ
                      </Typography>
                    </div>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-2 items-start">
                      <div className="w-full">
                        <Typography className="text-black" variant="h6">
                          ค้นหาด้วยรหัส | เลือกจากรายการ{" "}
                          <span className="text-red-500">*</span>
                        </Typography>
                        <Menu open={openMenu} handler={setOpenMenu} allowHover>
                          <MenuHandler>
                            {/* The MenuHandler can be a custom button or input to open the menu */}
                            <Input
                              size="lg"
                              label="Select Option"
                              // onChange={(e) => setFilter(e.target.value)}
                              // value={selected ? selected.label : filter}
                            />
                          </MenuHandler>
                          <MenuList>
                            {authorsTableData.map((mtri) => (
                              <MenuItem
                                // key={option.value}
                                onClick={() => {
                                  // setSelected(option);
                                  // setFilter(option.label); // Update input with selected label
                                  setOpenMenu(false); // Close menu on select
                                }}
                              >
                                {`${mtri.material_Code}-${mtri.material_Name}-(คงเหลือ ${mtri.material_Stock})`}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </Menu>
                      </div>
                      <div className="w-full  grid md:grid-cols-2 grid-cols-1 gap-2">
                        <div className="w-full">
                          <Typography className="text-black" variant="h6">
                            จำนวนที่เบิก <span className="text-red-500">*</span>
                          </Typography>
                          <Input
                            size="lg"
                            className={`
                      rounded-md 
                      focus:border-[2px] 
                      appearance-none                   
                      ${
                        touched &&
                        touched.material_Name &&
                        errors &&
                        errors.material_Name
                          ? "!border-t-red-500 "
                          : "!border-t-gray-400 "
                      }  
                      placeholder:text-blue-gray-300 placeholder:opacity-100  
                      ${
                        touched &&
                        touched.material_Name &&
                        errors &&
                        errors.material_Name
                          ? "focus:!border-t-red-900 "
                          : "focus:!border-t-gray-900 "
                      }                                        
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&::-webkit-outer-spin-button]:appearance-none
                      `}
                            labelProps={{
                              className:
                                "before:content-none after:content-none",
                            }}
                            name="material_Name"
                            value={values.material_Name || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(
                              touched &&
                              touched.material_Name &&
                              errors &&
                              errors.material_Name,
                            )}
                          />
                          {touched &&
                            touched.material_Name &&
                            errors &&
                            errors.material_Name && (
                              <p className="font-normal text-red-500 text-[12px]">
                                {errors.material_Name}
                              </p>
                            )}
                        </div>
                        <div className="w-full">
                          <Typography className="text-black" variant="h6">
                            วันที่ต้องการใช้งาน{" "}
                            <span className="text-red-500">*</span>
                          </Typography>
                          <Input size="lg" type="datetime-local" />
                        </div>
                      </div>
                    </div>

                    <div></div>
                  </CardBody>
                  <CardFooter className="pt-0 flex justify-end gap-2">
                    <Button
                      variant="outlined"
                      color="blue-gray"
                      //onClick={handleClose}
                    >
                      ยกเลิก
                    </Button>
                    <Button
                      variant="gradient"
                      color="blue"
                      onClick={handleSubmit}
                    >
                      บันทึกข้อมูล
                    </Button>
                  </CardFooter>
                </Card>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </div>
  );
};

export default MaterialReqInUp;