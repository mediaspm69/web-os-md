import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  IconButton,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { InboxStackIcon, LinkIcon } from "@heroicons/react/24/solid";
import { Form, Formik } from "formik";
import * as Yup from "yup";
//helpers
import {
  convertDriveImage,
  currencyFormat,
  inputNumber,
  toThaiDateTimeString,
} from "@/helpers/format";

const materialSchema = Yup.object().shape({
  material_Code: Yup.string().required("กรุณาระบุข้อมูล"),
  material_Name: Yup.string().required("กรุณาระบุข้อมูล"),
  material_Detail: Yup.string().required("กรุณาระบุข้อมูล"),
  material_Stock: Yup.string().required("กรุณาระบุข้อมูล"),
  material_Price: Yup.string().required("กรุณาระบุข้อมูล"),
  material_Position: Yup.string().required("กรุณาระบุข้อมูล"),
  employee_Id: Yup.string().required("กรุณาระบุข้อมูล"),
  employee_FirstName: Yup.string().required("กรุณาระบุข้อมูล"),
  department_Id: Yup.string().required("กรุณาระบุข้อมูล"),
  material_IsShow: Yup.string().required("กรุณาระบุข้อมูล"),
  //mtrType_Id: Yup.string().required("กรุณาระบุข้อมูล"),
});

export const SectionFormDialogInUp = ({
  open = false,
  value = null,
  action = "insert" || "update" || "detail",
  imgFile = null,
  employee = null,
  loader = false,
  handleClose = () => {},
  onSubmitMaterial = () => {},
  handleUploadImg = () => {},
}) => {
  function filePreview(file) {
    if (!file) return null;
    const url = URL.createObjectURL(file);
    if (file.type.startsWith("image/")) {
      return <img src={url} alt="preview" className="w-full" />;
    }
    return <iframe src={url} title="preview" className="w-full h-full" />;
  }

  const itemDetail = (mtr) => {
    let TABLE_HEAD = [];
    let TABLE_ROWS = [];
    if (action === "detail") {
      TABLE_HEAD = ["หัวข้อ", "รายละเอียด"];
      if (
        (employee && employee.role_id === "R01") ||
        (employee && employee.role_id === "R99")
      ) {
        if (mtr) {
          const isShow = mtr.material_IsShow === "on" ? "แสดง" : "ซ่อน";
          TABLE_ROWS = [
            {
              name: "รหัสสื่อ",
              detail: mtr.material_Code ?? "",
              icon: "",
            },
            {
              name: "วันที่สร้าง",
              detail: toThaiDateTimeString(mtr.material_CreationDate) ?? "",

              icon: "",
            },
            {
              name: "สื่อ",
              detail: mtr.material_Name ?? "",
              icon: "",
            },

            {
              name: "จำนวน",
              detail: `${mtr.material_Stock} รายการ` ?? "",
              icon: "",
            },
            {
              name: "มูลค่า",
              detail: `${currencyFormat(mtr.material_Price)} บาท` ?? "",

              icon: "",
            },
            {
              name: "รายละเอียดสื่อ",
              detail: mtr.material_Detail ?? "",
              icon: "",
            },
            {
              name: "ผู้ดูแล",
              detail: mtr.employee_FirstName ?? "",
              icon: "",
            },
            {
              name: "สถานะ",
              detail: isShow ?? "",
              icon: "",
            },
          ];
        }
      } else if (employee && employee.role_id === "R02") {
        if (mtr) {
          TABLE_ROWS = [
            {
              name: "รหัสสื่อ",
              detail: mtr.material_Code ?? "",
              icon: "",
            },
            {
              name: "สื่อ",
              detail: mtr.material_Name ?? "",
              icon: "",
            },

            {
              name: "จำนวน",
              detail: `${mtr.material_Stock} รายการ` ?? "",
              icon: "",
            },
            {
              name: "มูลค่า",
              detail: `${currencyFormat(mtr.material_Price)} บาท` ?? "",

              icon: "",
            },
            {
              name: "รายละเอียดสื่อ",
              detail: mtr.material_Detail ?? "",
              icon: "",
            },
            {
              name: "ผู้ดูแล",
              detail: mtr.employee_FirstName ?? "",
              icon: "",
            },
          ];
        }
      }
    }

    return (
      <Card className="w-full h-full">
        <CardHeader
          floated={false}
          shadow={false}
          className="mb-2 rounded-none p-2"
        >
          <div className="w-full md:w-96"></div>
        </CardHeader>
         <CardBody className="flex overflow-scroll md:max-h-[80vh] max-h-[70vh]">
             <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.length > 0 &&
                TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-gray-300 p-4">
                    <div className="flex items-center gap-1">
                      <Typography
                        color="blue-gray"
                        variant="lead"
                        className="!font-bold"
                      >
                        {head}
                      </Typography>
                    </div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.length > 0 &&
              TABLE_ROWS.map(({ name, detail }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-gray-300 w-[50px]";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex items-center gap-1">
                        <Typography
                          variant="lead"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="lead"
                        className="font-normal text-gray-600"
                      >
                        {detail}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            <tr>
              <td className="p-4">
                <div className="flex items-center gap-1">
                  <Typography
                    variant="lead"
                    color="blue-gray"
                    className="font-bold"
                  >
                    ลิงก์รูปภาพ
                  </Typography>
                </div>
              </td>
              <td>
                <a
                  className="w-fit text-green-500"
                  href={mtr.material_Image}
                  download="proposed_file_name"
                  target="_blank"
                >
                  <IconButton color="green">
                    <LinkIcon className="w-5" />
                  </IconButton>
                </a>
              </td>
            </tr>
            <tr>
              <td className="p-4">
                <div className="flex items-center gap-1">
                  <Typography
                    variant="lead"
                    color="blue-gray"
                    className="font-bold"
                  >
                    รูปภาพ
                  </Typography>
                </div>
              </td>
              <td>
                <div className="w-[450px]">
                  <img
                    src={convertDriveImage(mtr.material_Image)}
                    className="object-contain"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
         </CardBody>
     
      </Card>
    );
  };

  return (
    <Dialog
      size="xl"
      open={open}
      handler={handleClose}
      className="bg-transparent shadow-none  "
    >
      {action === "insert" || action === "update" ? (
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
            material_IsShow: value ? (value.material_IsShow ?? "") : "",
            material_Image: value ? (value.material_Image ?? "") : "",
            material_File: "",
            material_CreationDate: "",
            //mtrType_Id: value ? (value.mtrType_Id ?? "") : "",
            employee_Id: employee ? (employee.id ?? "") : "",
            employee_FirstName: employee ? (employee.firstname ?? "") : "",
            department_Id: employee ? (employee.dpm_id ?? "") : "",
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
          }) => (
            <Form onSubmit={handleSubmit}>
              <Card className="mx-auto w-full">
                <CardBody className="flex flex-col gap-4 overflow-scroll md:max-h-[80vh] max-h-[70vh]">
                  <div className="flex flex-row justify-start items-center gap-2">
                    <InboxStackIcon className="w-5 h-5" />
                    <Typography variant="h4" color="blue-gray">
                      {action === "update"
                        ? `แก้ไขสื่อ เลขที่: ${values.material_Code}`
                        : "ลงทะเบียนเบิกสื่อใหม่เข้าสโตร์"}
                    </Typography>
                  </div>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                    <div className="w-full">
                      <Typography className="text-black" variant="h6">
                        การแสดงผล <span className="text-red-500">*</span>
                      </Typography>
                      <Select
                        label="show"
                        size="lg"
                        name="material_IsShow"
                        value={values.material_IsShow || ""}
                        onChange={(text) =>
                          setFieldValue("material_IsShow", text)
                        }
                        error={Boolean(
                          touched &&
                          touched.material_IsShow &&
                          errors &&
                          errors.material_IsShow,
                        )}
                      >
                        <Option value="">เลือกการแสดงผล</Option>
                        <Option value="on">แสดง</Option>
                        <Option value="off">ซ่อน</Option>
                      </Select>
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
                      รายละเอียด (Specifications){" "}
                      <span className="text-red-500">*</span>
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
                        touched.material_Stock &&
                        errors &&
                        errors.material_Stock
                          ? "!border-t-red-500 "
                          : "!border-t-gray-400 "
                      }  
                      placeholder:text-blue-gray-300 placeholder:opacity-100  
                      ${
                        touched &&
                        touched.material_Stock &&
                        errors &&
                        errors.material_Stock
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
                        name="material_Stock"
                        value={values.material_Stock || ""}
                        onChange={(e) =>
                          setFieldValue(
                            "material_Stock",
                            inputNumber(e.target.value),
                          )
                        }
                        onBlur={handleBlur}
                        error={Boolean(
                          touched &&
                          touched.material_Stock &&
                          errors &&
                          errors.material_Stock,
                        )}
                      />
                      {touched &&
                        touched.material_Stock &&
                        errors &&
                        errors.material_Stock && (
                          <p className="font-normal text-red-500 text-[12px]">
                            {errors.material_Stock}
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
                          handleUploadImg(e.target.files[0]);
                          e.target.value = null;
                        }}
                      />
                    </div>
                  </div>
                  <div>{imgFile && filePreview(imgFile)}</div>
                  {action === "update" && values.material_ImgUrl && (
                    <div>
                      <div className="flex">
                        <Typography variant="h4" color="black">
                          รูปภาพเดิม
                        </Typography>
                        <a
                          className="w-fit text-green-500"
                          href={values.material_ImgUrl}
                          download="proposed_file_name"
                          target="_blank"
                        >
                          <IconButton color="green">
                            <LinkIcon className="w-5" />
                          </IconButton>
                        </a>
                      </div>

                      <img
                        src={convertDriveImage(values.material_ImgUrl)}
                        className="w-full"
                      />
                    </div>
                  )}
                </CardBody>
                <CardFooter className="pt-0 flex justify-end gap-2">
                  <Button
                    disabled={loader}
                    variant="outlined"
                    color="blue-gray"
                    onClick={handleClose}
                  >
                    ยกเลิก
                  </Button>
                  <Button
                    disabled={loader}
                    variant="gradient"
                    color="blue"
                    onClick={handleSubmit}
                  >
                    บันทึกข้อมูล
                  </Button>
                </CardFooter>
              </Card>
            </Form>
          )}
        </Formik>
      ) : action === "detail" ? (
        value && itemDetail(value)
      ) : (
        <div>
          <Typography>Error 404</Typography>
        </div>
      )}
    </Dialog>
  );
};
