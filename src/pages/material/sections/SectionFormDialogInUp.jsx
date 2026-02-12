import { inputNumber } from "@/helpers/format";
import { InboxStackIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { Form, Formik } from "formik";
import * as Yup from 'yup'
import React from "react";

const materialSchema = Yup.object().shape({
  material_Code: Yup.string().required("กรุณาระบุข้อมูล"),
  material_Name: Yup.string().required("กรุณาระบุข้อมูล"),
  material_Detail: Yup.string().required("กรุณาระบุข้อมูล"),
  material_Amount: Yup.string().required("กรุณาระบุข้อมูล"),
  material_Price: Yup.string().required("กรุณาระบุข้อมูล"),
  material_Position: Yup.string().required("กรุณาระบุข้อมูล"),
  material_CreationDate: Yup.string().required("กรุณาระบุข้อมูล"),
  //mtrType_Id: Yup.string().required("กรุณาระบุข้อมูล"),
});

export const SectionFormDialogInUp = ({
  open = false,
  handleClose = () => {},
  onSubmitMaterial = () => {},
  value = null,
  action = "insert" || "update"
}) => {
  return (
    <Dialog
      size="xl"
      open={open}
      handler={handleClose}
      className="bg-transparent shadow-none"
    >
      <Formik
        enableReinitialize
        initialValues={{
          material_Id: value ? (value.material_Id ?? "") : "",
          material_Code: value ? (value.material_Code ?? "") : "",
          material_Name: value ? (value.material_Name ?? "") : "",
          material_Brand: value ? (value.material_Brand ?? "") : "",
          material_Model: value ? (value.material_Model ?? "") : "",
          material_Detail: value ? (value.material_Detail ?? "") : "",
          material_Amount: value ? (value.material_Amount ?? "") : "",
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
                    <InboxStackIcon className="w-5 h-5" />
                    <Typography variant="h4" color="blue-gray">
                      {action === "update" ? `แก้ไขสื่อ เลขที่: ${values.material_Code}`:"ลงทะเบียนเบิกสื่อใหม่เข้าสโตร์"}
                    </Typography>
                  </div>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                    <div className="w-full">
                      <Typography className="text-black" variant="h6">
                        รหัสสื่อ <span className="text-red-500">*</span>
                      </Typography>
                      <Input
                        disabled={Boolean(action === "update")}
                        size="lg"
                        className={`
                      rounded-md 
                      focus:border-[2px] 
                      appearance-none                   
                      ${
                        touched &&
                        touched.material_Code &&
                        errors &&
                        errors.material_Code
                          ? "!border-t-red-500 "
                          : "!border-t-gray-400 "
                      }  
                      placeholder:text-blue-gray-300 placeholder:opacity-100  
                      ${
                        touched &&
                        touched.material_Code &&
                        errors &&
                        errors.material_Code
                          ? "focus:!border-t-red-900 "
                          : "focus:!border-t-gray-900 "
                      } 
                      placeholder:text-blue-gray-300 placeholder:opacity-100                                         
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&::-webkit-outer-spin-button]:appearance-none
                      `}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        name="material_Code"
                        value={values.material_Code || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(
                          touched &&
                          touched.material_Code &&
                          errors &&
                          errors.material_Code,
                        )}
                      />
                      {touched &&
                        touched.material_Code &&
                        errors &&
                        errors.material_Code && (
                          <p className="font-normal text-red-500 text-[12px]">
                            {errors.material_Code}
                          </p>
                        )}
                    </div>
                    <div className="w-full">
                      <Typography className="text-black" variant="h6">
                        ชื่อสื่อ <span className="text-red-500">*</span>
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
                      placeholder:text-blue-gray-300 placeholder:opacity-100                                         
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&::-webkit-outer-spin-button]:appearance-none
                      `}
                        labelProps={{
                          className: "before:content-none after:content-none",
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
                  </div>
                  <div className="full">
                    <Typography className="text-black" variant="h6">
                      รายละเอียด (Specifications) <span className="text-red-500">*</span>
                    </Typography>
                    <Textarea
                      className={`
                      rounded-md 
                      focus:border-[2px] 
                      appearance-none                   
                      ${
                        touched &&
                        touched.material_Detail &&
                        errors &&
                        errors.material_Detail
                          ? "!border-t-red-500 "
                          : "!border-t-gray-400 "
                      }  
                      placeholder:text-blue-gray-300 placeholder:opacity-100  
                      ${
                        touched &&
                        touched.material_Detail &&
                        errors &&
                        errors.material_Detail
                          ? "focus:!border-t-red-900 "
                          : "focus:!border-t-gray-900 "
                      } 
                      placeholder:text-blue-gray-300 placeholder:opacity-100                                         
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&::-webkit-outer-spin-button]:appearance-none
                      `}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      name="material_Detail"
                      value={values.material_Detail || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(
                        touched &&
                        touched.material_Detail &&
                        errors &&
                        errors.material_Detail,
                      )}
                    />
                    {touched &&
                      touched.material_Detail &&
                      errors &&
                      errors.material_Detail && (
                        <p className="font-normal text-red-500 text-[12px]">
                          {errors.material_Detail}
                        </p>
                      )}
                  </div>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                    <div className="w-full">
                      <Typography className="text-black" variant="h6">
                        จำนวนในสโตร์ <span className="text-red-500">*</span>
                      </Typography>
                      <Input
                        size="lg"
                        className={`
                      rounded-md 
                      focus:border-[2px] 
                      appearance-none                   
                      ${
                        touched &&
                        touched.material_Amount &&
                        errors &&
                        errors.material_Amount
                          ? "!border-t-red-500 "
                          : "!border-t-gray-400 "
                      }  
                      placeholder:text-blue-gray-300 placeholder:opacity-100  
                      ${
                        touched &&
                        touched.material_Amount &&
                        errors &&
                        errors.material_Amount
                          ? "focus:!border-t-red-900 "
                          : "focus:!border-t-gray-900 "
                      } 
                      placeholder:text-blue-gray-300 placeholder:opacity-100                                         
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&::-webkit-outer-spin-button]:appearance-none
                      `}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        name="material_Amount"
                        value={values.material_Amount || ""}
                        onChange={(e) =>
                          setFieldValue(
                            "material_Amount",
                            inputNumber(e.target.value),
                          )
                        }
                        onBlur={handleBlur}
                        error={Boolean(
                          touched &&
                          touched.material_Amount &&
                          errors &&
                          errors.material_Amount,
                        )}
                      />
                      {touched &&
                        touched.material_Amount &&
                        errors &&
                        errors.material_Amount && (
                          <p className="font-normal text-red-500 text-[12px]">
                            {errors.material_Amount}
                          </p>
                        )}
                    </div>
                    <div className="w-full">
                      <Typography className="text-black" variant="h6">
                        ราคาต่อหน่วย (บาท){" "}
                        <span className="text-red-500">*</span>
                      </Typography>
                      <Input
                        size="lg"
                        className={`
                      rounded-md 
                      focus:border-[2px] 
                      appearance-none                   
                      ${
                        touched &&
                        touched.material_Price &&
                        errors &&
                        errors.material_Price
                          ? "!border-t-red-500 "
                          : "!border-t-gray-400 "
                      }  
                      placeholder:text-blue-gray-300 placeholder:opacity-100  
                      ${
                        touched &&
                        touched.material_Price &&
                        errors &&
                        errors.material_Price
                          ? "focus:!border-t-red-900 "
                          : "focus:!border-t-gray-900 "
                      } 
                      placeholder:text-blue-gray-300 placeholder:opacity-100                                         
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&::-webkit-outer-spin-button]:appearance-none
                      `}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        name="material_Price"
                        value={values.material_Price || ""}
                        onChange={(e) =>
                          setFieldValue(
                            "material_Price",
                            inputNumber(e.target.value),
                          )
                        }
                        onBlur={handleBlur}
                        error={Boolean(
                          touched &&
                          touched.material_Price &&
                          errors &&
                          errors.material_Price,
                        )}
                      />
                      {touched &&
                        touched.material_Price &&
                        errors &&
                        errors.material_Price && (
                          <p className="font-normal text-red-500 text-[12px]">
                            {errors.material_Price}
                          </p>
                        )}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                    <div className="w-full">
                      <Typography className="text-black" variant="h6">
                        สถานที่เก็บ <span className="text-red-500">*</span>
                      </Typography>
                      <Input
                        size="lg"
                        className={`
                      rounded-md 
                      focus:border-[2px] 
                      appearance-none                   
                      ${
                        touched &&
                        touched.material_Position &&
                        errors &&
                        errors.material_Position
                          ? "!border-t-red-500 "
                          : "!border-t-gray-400 "
                      }  
                      placeholder:text-blue-gray-300 placeholder:opacity-100  
                      ${
                        touched &&
                        touched.material_Position &&
                        errors &&
                        errors.material_Position
                          ? "focus:!border-t-red-900 "
                          : "focus:!border-t-gray-900 "
                      } 
                      placeholder:text-blue-gray-300 placeholder:opacity-100                                         
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&::-webkit-outer-spin-button]:appearance-none
                      `}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        name="material_Position"
                        value={values.material_Position || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(
                          touched &&
                          touched.material_Position &&
                          errors &&
                          errors.material_Position,
                        )}
                      />
                      {touched &&
                        touched.material_Position &&
                        errors &&
                        errors.material_Position && (
                          <p className="font-normal text-red-500 text-[12px]">
                            {errors.material_Position}
                          </p>
                        )}
                    </div>
                    <div className="w-full">
                      <Typography className="text-black" variant="h6">
                        รูปภาพสื่อ
                      </Typography>
                      <Input
                        type="file"
                        size="lg"
                        className={`
                      rounded-md 
                      focus:border-[2px] 
                      appearance-none                   
                      border-t-gray-400
                      focus:!border-t-gray-900
                      placeholder:text-blue-gray-300 
                      placeholder:opacity-100                              
                      [&::-webkit-inner-spin-button]:appearance-none 
                      [&::-webkit-outer-spin-button]:appearance-none
                      `}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        onChange={(e) => {
                          handleUpload(e.target.files[0]);
                          e.target.value = null;
                        }}
                      />
                    </div>
                  </div>
                </CardBody>
                <CardFooter className="pt-0 flex justify-end gap-2">
                  <Button
                    variant="outlined"
                    color="blue-gray"
                    onClick={handleClose}
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
    </Dialog>
  );
};
