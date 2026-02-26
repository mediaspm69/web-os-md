import React from "react";
import {
  DocumentIcon,
  InboxStackIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
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
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//sections

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { inputNumber } from "@/helpers/format";

const materialSchema = Yup.object().shape({
  material_Id: Yup.string().required("กรุณาระบุข้อมูล"),
  material_Code: Yup.string().required("กรุณาระบุข้อมูล"),
  material_Name: Yup.string().required("กรุณาระบุข้อมูล"),
  material_Stock: Yup.string().required("กรุณาระบุข้อมูล"),
  material_Price: Yup.string().required("กรุณาระบุข้อมูล"),
  mtrReq_Amount: Yup.string().required("กรุณาระบุข้อมูล"),
  employee_Id: Yup.string().required("กรุณาระบุข้อมูล"),
  employee_FirstName: Yup.string().required("กรุณาระบุข้อมูล"),
  empDpm_Id: Yup.string().required("กรุณาระบุข้อมูล"),
  mtrReq_Date: Yup.string().required("กรุณาระบุข้อมูล"),
  //mtrType_Id: Yup.string().required("กรุณาระบุข้อมูล"),
});

// const authorsTableData = [
//   {
//     material_Id: "1",
//     material_Code: "M-001",
//     material_Image:
//       "https://images.unsplash.com/photo-1606986628470-26a67fa4730c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
//     material_Detail:
//       "เป็นกล้องมิเรอร์เลส Full-Frame ไฮบริดรุ่นยอดนิยม ความละเอียด 33MP ชิปประมวลผล BIONZ XR โฟกัสรวดเร็วแม่นยำ (Real-time Eye AF) ถ่ายวิดีโอสูงสุด 4K 60p 10-bit 4:2:2 พร้อมจอพับ Vari-angle และระบบกันสั่น 5 แกน (5.5EV) เหมาะสำหรับทั้งภาพนิ่งและวิดีโอระดับมืออาชีพ ",
//     material_Price: "25000",
//     material_Stock: "5",
//     material_Position: "คลังสื่อ ชั้น 2 ห้อง 204",
//     material_CreationDate: "23/04/18",
//     mtrType_Id: "กล้อง",
//   },
//   {
//     material_Id: "2",
//     material_Code: "M-002",
//     material_Image:
//       "https://images.unsplash.com/photo-1606986628470-26a67fa4730c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
//     material_Detail:
//       "เป็นกล้องมิเรอร์เลส Full-Frame ไฮบริดรุ่นยอดนิยม ความละเอียด 33MP ชิปประมวลผล BIONZ XR โฟกัสรวดเร็วแม่นยำ (Real-time Eye AF) ถ่ายวิดีโอสูงสุด 4K 60p 10-bit 4:2:2 พร้อมจอพับ Vari-angle และระบบกันสั่น 5 แกน (5.5EV) เหมาะสำหรับทั้งภาพนิ่งและวิดีโอระดับมืออาชีพ ",
//     material_Price: "25000",
//     material_Stock: "5",
//     material_Position: "คลังสื่อ ชั้น 2 ห้อง 204",
//     material_CreationDate: "23/04/18",
//     mtrType_Id: "กล้อง",
//   },
//   {
//     material_Id: "3",
//     material_Code: "M-003",
//     material_Image:
//       "https://images.unsplash.com/photo-1606986628470-26a67fa4730c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
//     material_Detail:
//       "เป็นกล้องมิเรอร์เลส Full-Frame ไฮบริดรุ่นยอดนิยม ความละเอียด 33MP ชิปประมวลผล BIONZ XR โฟกัสรวดเร็วแม่นยำ (Real-time Eye AF) ถ่ายวิดีโอสูงสุด 4K 60p 10-bit 4:2:2 พร้อมจอพับ Vari-angle และระบบกันสั่น 5 แกน (5.5EV) เหมาะสำหรับทั้งภาพนิ่งและวิดีโอระดับมืออาชีพ ",
//     material_Price: "25000",
//     material_Stock: "5",
//     material_Position: "คลังสื่อ ชั้น 2 ห้อง 204",
//     material_CreationDate: "23/04/18",
//     mtrType_Id: "กล้อง",
//   },
//   {
//     material_Id: "4",
//     material_Code: "M-004",
//     material_Image:
//       "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
//     material_Detail:
//       "เป็นกล้องมิเรอร์เลส Full-Frame ไฮบริดรุ่นยอดนิยม ความละเอียด 33MP ชิปประมวลผล BIONZ XR โฟกัสรวดเร็วแม่นยำ (Real-time Eye AF) ถ่ายวิดีโอสูงสุด 4K 60p 10-bit 4:2:2 พร้อมจอพับ Vari-angle และระบบกันสั่น 5 แกน (5.5EV) เหมาะสำหรับทั้งภาพนิ่งและวิดีโอระดับมืออาชีพ ",
//     material_Price: "25000",
//     material_Stock: "0",
//     material_Position: "คลังสื่อ ชั้น 2 ห้อง 204",
//     material_CreationDate: "23/04/18",
//     mtrType_Id: "กล้อง",
//   },
//   {
//     material_Id: "5",
//     material_Code: "M-005",
//     material_Image:
//       "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
//     material_Detail:
//       "เป็นกล้องมิเรอร์เลส Full-Frame ไฮบริดรุ่นยอดนิยม ความละเอียด 33MP ชิปประมวลผล BIONZ XR โฟกัสรวดเร็วแม่นยำ (Real-time Eye AF) ถ่ายวิดีโอสูงสุด 4K 60p 10-bit 4:2:2 พร้อมจอพับ Vari-angle และระบบกันสั่น 5 แกน (5.5EV) เหมาะสำหรับทั้งภาพนิ่งและวิดีโอระดับมืออาชีพ ",
//     material_Price: "25000",
//     material_Stock: "0",
//     material_Position: "คลังสื่อ ชั้น 2 ห้อง 204",
//     material_CreationDate: "23/04/18",
//     mtrType_Id: "กล้อง",
//   },
//   {
//     material_Id: "6",
//     material_Code: "M-006",
//     material_Image:
//       "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
//     material_Detail:
//       "เป็นกล้องมิเรอร์เลส Full-Frame ไฮบริดรุ่นยอดนิยม ความละเอียด 33MP ชิปประมวลผล BIONZ XR โฟกัสรวดเร็วแม่นยำ (Real-time Eye AF) ถ่ายวิดีโอสูงสุด 4K 60p 10-bit 4:2:2 พร้อมจอพับ Vari-angle และระบบกันสั่น 5 แกน (5.5EV) เหมาะสำหรับทั้งภาพนิ่งและวิดีโอระดับมืออาชีพ ",
//     material_Price: "25000",
//     material_Stock: "0",
//     material_Position: "คลังสื่อ ชั้น 2 ห้อง 204",
//     material_CreationDate: "23/04/18",
//     mtrType_Id: "กล้อง",
//   },
// ];

export const SectionReqDialog = ({
  open = false,
  value = null,
  employee = null,
  onSubmitReqMaterial = () => {},
  handleCloseReq = () => {},
}) => {
  return (
    <Dialog
      open={open}
      handler={handleCloseReq}
      className="bg-transparent shadow-none"
    >
      <Formik
        enableReinitialize
        initialValues={{
          material_Id: value ? (value.material_Id ?? "") : "",
          material_Code: value ? (value.material_Code ?? "") : "",
          material_Name: value ? (value.material_Name ?? "") : "",
          material_Stock: value ? (value.material_Stock ?? "") : "",
          material_Price: value ? (value.material_Price ?? "") : "",
          material_Position: value ? (value.material_Position ?? "") : "",
          employee_Id: employee ? (employee.id ?? "") : "",
          employee_FirstName: employee ? (employee.firstname ?? "") : "",
          empDpm_Id: employee ? (employee.dpm_id ?? "") : "",
          recipient_Id: "",
          recipient_Name: "",
          recDpm_Id:"D002",
          mtrReq_Amount: "",
          mtrReq_Price: "",
          mtrReq_Date: "",
          mtrReqStatus_Id: "",
          mtrReq_Note: "",
        }}
        validationSchema={materialSchema}
        onSubmit={onSubmitReqMaterial}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Card className="mx-auto w-full">
              <CardBody className="flex flex-col gap-4 overflow-scroll max-h-[80vh]">
                <div className="flex flex-row justify-start items-center gap-2">
                  <DocumentIcon className="w-5 h-5" />
                  <Typography variant="h4" color="blue-gray">
                    ทำรายการเบิกสื่อ
                  </Typography>
                </div>
                <div className="w-full flex flex-col gap-1">
                  <div className="flex flex-row items-center gap-1">
                    <Typography className="text-black w-[70px]" variant="h6">
                      รหัสสื่อ
                    </Typography>

                    <Input
                      disabled
                      size="md"
                      label="รหัสสื่อ"
                      value={values.material_Code || ""}
                    />
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <Typography className="text-black w-[70px]" variant="h6">
                      ชื่อสื่อ
                    </Typography>
                    <Input
                      disabled
                      size="lg"
                      label="ชื่อสื่อ"
                      value={values.material_Name || ""}
                    />
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <Typography className="text-black w-[70px]" variant="h6">
                      จำนวน
                    </Typography>
                    <Input
                      disabled
                      size="lg"
                      label="จำนวน"
                      value={values.material_Stock || "0"}
                    />
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <Typography className="text-black w-[70px]" variant="h6">
                      ผู้เบิก
                    </Typography>
                    <Input
                      disabled
                      size="lg"
                      label="ผู้เบิก"
                      value={values.employee_FirstName || ""}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 grid-cols-1 gap-2 items-start">
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
                        touched.mtrReq_Amount &&
                        errors &&
                        errors.mtrReq_Amount
                          ? "!border-t-red-500 "
                          : "!border-t-gray-400 "
                      }  
                      placeholder:text-blue-gray-300 placeholder:opacity-100  
                      ${
                        touched &&
                        touched.mtrReq_Amount &&
                        errors &&
                        errors.mtrReq_Amount
                          ? "focus:!border-t-red-900 "
                          : "focus:!border-t-gray-900 "
                      }                                        
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&::-webkit-outer-spin-button]:appearance-none
                      `}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      name="mtrReq_Amount"
                      value={values.mtrReq_Amount || ""}
                      onChange={(e) => {
                        const amount = parseInt(e.target.value);
                        const reqAmo = parseInt(values.mtrReq_Amount || 0);
                        const mtrAmo = parseInt(values.material_Stock || 0);
                        if (amount > 0) {
                          if (amount > mtrAmo) {
                          } else {
                            setFieldValue(
                              "mtrReq_Amount",
                              inputNumber(amount.toString()),
                            );
                          }
                        } else {
                          setFieldValue("mtrReq_Amount", "");
                        }
                      }}
                      onBlur={handleBlur}
                      error={Boolean(
                        touched &&
                        touched.mtrReq_Amount &&
                        errors &&
                        errors.mtrReq_Amount,
                      )}
                    />
                    {touched &&
                      touched.mtrReq_Amount &&
                      errors &&
                      errors.mtrReq_Amount && (
                        <p className="font-normal text-red-500 text-[12px]">
                          {errors.mtrReq_Amount}
                        </p>
                      )}
                  </div>
                  <div className="w-full">
                    <Typography className="text-black" variant="h6">
                      วันที่ใช้งาน <span className="text-red-500">*</span>
                    </Typography>
                    <Input
                      type="datetime-local"
                      size="lg"
                      className={`
                      rounded-md 
                      focus:border-[2px] 
                      appearance-none                   
                      ${
                        touched &&
                        touched.mtrReq_Date &&
                        errors &&
                        errors.mtrReq_Date
                          ? "!border-t-red-500 "
                          : "!border-t-gray-400 "
                      }  
                      placeholder:text-blue-gray-300 placeholder:opacity-100  
                      ${
                        touched &&
                        touched.mtrReq_Date &&
                        errors &&
                        errors.mtrReq_Date
                          ? "focus:!border-t-red-900 "
                          : "focus:!border-t-gray-900 "
                      }                                        
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&::-webkit-outer-spin-button]:appearance-none
                      `}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      name="mtrReq_Date"
                      value={values.mtrReq_Date || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        touched &&
                        touched.mtrReq_Date &&
                        errors &&
                        errors.mtrReq_Date,
                      )}
                    />
                    {touched &&
                      touched.mtrReq_Date &&
                      errors &&
                      errors.mtrReq_Date && (
                        <p className="font-normal text-red-500 text-[12px]">
                          {errors.mtrReq_Date}
                        </p>
                      )}
                  </div>
                </div>
                <div className="w-full">
                  <Typography className="text-black" variant="h6">
                    หมายเหตุ
                  </Typography>
                  <Textarea
                    label="note"
                    size="lg"
                    name="mtrReq_Note"
                    value={values.mtrReq_Note || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched &&
                      touched.mtrReq_Note &&
                      errors &&
                      errors.mtrReq_Note,
                    )}
                  />
                </div>
              </CardBody>
              <CardFooter className="pt-0 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outlined"
                  color="blue-gray"
                  onClick={handleCloseReq}
                >
                  ยกเลิก
                </Button>
                <Button
                  variant="gradient"
                  color="blue"
                  type="submit"
                  onClick={handleSubmit}
                >
                  บันทึกข้อมูล
                </Button>
              </CardFooter>
            </Card>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
