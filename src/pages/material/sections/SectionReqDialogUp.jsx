import React from "react";
import { DocumentIcon } from "@heroicons/react/24/outline";
import {
  Typography,
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  CardFooter,
  Dialog,
  DialogBody,
  Textarea,
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
} from "@material-tailwind/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
//helpers
import {
  currencyFormat,
  inputNumber,
  toThaiDateTimeString,
} from "@/helpers/format";
import {
  BellIcon,
  ClockIcon,
  CurrencyDollarIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";

const materialSchema = Yup.object().shape({
  mtrReq_Id: Yup.string().required("กรุณาระบุข้อมูล"),
  material_Id: Yup.string().required("กรุณาระบุข้อมูล"),
  mtrReq_Amount: Yup.string().required("กรุณาระบุข้อมูล"),
  mtrReq_Date: Yup.string().required("กรุณาระบุข้อมูล"),
});

const mtStatusSchema = Yup.object().shape({
  mtrReq_Id: Yup.string().required("กรุณาระบุข้อมูล"),
  mtrReqStatus_Id: Yup.string().required("กรุณาระบุข้อมูล"),
  mtrReqStatus_Name: Yup.string().required("กรุณาระบุข้อมูล"),
  recipient_Id: Yup.string().required("กรุณาระบุข้อมูล"),
  recipient_Name: Yup.string().required("กรุณาระบุข้อมูล"),
  recDpm_Id: Yup.string().required("กรุณาระบุข้อมูล"),
});

export const SectionDialogReqUp = ({
  action = "",
  open = false,
  value = null,
  employee = null,
  onSubmitReqMaterial = () => {},
  onSubmitMtrReqStatus = () => {},
  handleCloseReq = () => {},
}) => {
  let TABLE_HEAD = [];
  let TABLE_ROWS = [];
  if (action === "detail") {
    TABLE_HEAD = ["หัวข้อ", "รายละเอียด"];
    TABLE_ROWS = [
      {
        name: "รหัสเบิกสื่อ",
        detail: value ? (value.mtrReq_Code ?? "") : "",
        icon: "",
      },
      {
        name: "วันที่เบิก",
        detail: value
          ? (format(value.mtrReq_CreationDate, "yyyy-MM-dd hh:mm") ?? "")
          : "",
        icon: "",
      },
      {
        name: "วันที่ใช้งาน",
        detail: value
          ? (format(value.mtrReq_Date, "yyyy-MM-dd hh:mm") ?? "")
          : "",
        icon: "",
      },
      {
        name: "สื่อ",
        detail: value ? (value.material_Name ?? "") : "",
        icon: "",
      },

      {
        name: "จำนวนที่เบิก",
        detail: value ? (`${value.mtrReq_Amount} รายการ` ?? "") : "",
        icon: "",
      },
      {
        name: "มูลค่า",
        detail: value
          ? (`${currencyFormat(value.material_Price)} บาท` ?? "")
          : "",
        icon: "",
      },
      {
        name: "มูลค่ารวม",
        detail: value
          ? (`${currencyFormat(value.mtrReq_TotalPrice)} บาท` ?? "")
          : "",
        icon: "",
      },
      {
        name: "หมายเหตุ",
        detail: value ? (value.mtrReq_Note ?? "") : "",
        icon: "",
      },
    ];
  }

  return (
    <Dialog
      open={open}
      handler={handleCloseReq}
      className="bg-transparent shadow-none"
    >
      {action === "update" ? (
        <Formik
          enableReinitialize
          initialValues={{
            department_Id: value ? (value.department_Id ?? "") : "",
            department_Name: value ? (value.department_Name ?? "") : "",
            empDpm_Id: value ? (value.empDpm_Id ?? "") : "",
            employee_FirstName: value ? (value.employee_FirstName ?? "") : "",
            material_Stock: value ? (value.material_Stock ?? "") : "",
            material_Code: value ? (value.material_Code ?? "") : "",
            material_Detail: value ? (value.material_Detail ?? "") : "",
            material_Id: value ? (value.material_Id ?? "") : "",
            material_Image: value ? (value.material_Image ?? "") : "",
            material_IsShow: value ? (value.material_IsShow ?? "") : "",
            material_Name: value ? (value.material_Name ?? "") : "",
            material_Position: value ? (value.material_Position ?? "") : "",
            material_Price: value ? (value.material_Price ?? "") : "",
            mtrReqStatus_Id: value ? (value.mtrReqStatus_Id ?? "") : "",
            mtrReq_OldAmount: value ? (value.mtrReq_Amount ?? "") : "",
            mtrReq_Amount: value ? (value.mtrReq_Amount ?? "") : "",
            mtrReq_Code: value ? (value.mtrReq_Code ?? "") : "",
            mtrReq_Date: value
              ? (format(value.mtrReq_Date, "yyyy-MM-dd hh:mm") ?? "")
              : "",
            mtrReq_Id: value ? (value.mtrReq_Id ?? "") : "",
            mtrReq_IsShow: value ? (value.mtrReq_IsShow ?? "") : "",
            mtrReq_Note: value ? (value.mtrReq_Note ?? "") : "",
            mtrReq_TotalPrice: value ? (value.mtrReq_TotalPrice ?? "") : "",
            mtrType_Id: value ? (value.mtrType_Id ?? "") : "",
            recDpm_Id: value ? (value.recDpm_Id ?? "") : "",
            recipient_Id: value ? (value.recipient_Id ?? "") : "",
            recipient_Name: value ? (value.recipient_Name ?? "") : "",
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
                      อัปเดต ({values.mtrReq_Code || ""})
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
                        name="material_Code"
                        label="รหัสสื่อ"
                        value={values.material_Code || ""}
                        onChange={() => {}}
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
                        name="material_Name"
                        value={values.material_Name || ""}
                        onChange={() => {}}
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
                        name="material_Stock"
                        value={`คงเหลือ: ${values.material_Stock || "0"}`}
                        onChange={() => {}}
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
                        name="employee_FirstName"
                        value={values.employee_FirstName || ""}
                        onChange={() => {}}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 grid-cols-1 gap-2 items-start">
                    <div className="w-full">
                      <Typography className="text-black" variant="h6">
                        {`จำนวนที่เบิก  (สูงสุด: ${parseInt(values.mtrReq_OldAmount || 0) + parseInt(values.material_Stock || 0)})`}
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
                          className: "hidden",
                        }}
                        name="mtrReq_Amount"
                        value={values.mtrReq_Amount || ""}
                        onChange={(e) => {
                          const amount = parseInt(e.target.value);
                          const reqAmo = parseInt(values.mtrReq_OldAmount || 0);
                          const mtrAmo =
                            parseInt(values.material_Stock || 0) + reqAmo;
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
                          className: "hidden",
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
      ) : action === "status" ? (
        <Formik
          enableReinitialize
          initialValues={{
            mtrReq_Id: value ? (value.mtrReq_Id ?? "") : "",
            mtrReqStatus_Id: value ? (value.mtrReqStatus_Id ?? "") : "",
            mtrReqStatus_Name: value ? (value.mtrReqStatus_Name ?? "") : "",
            mrHis_Detail: value ? (value.mrHis_Detail ?? "") : "",
            recipient_Id: employee ? (employee.id ?? "") : "",
            recipient_Name: employee ? (employee.firstname ?? "") : "",
            recDpm_Id: employee ? (employee.dpm_id ?? "") : "",
          }}
          validationSchema={mtStatusSchema}
          onSubmit={onSubmitMtrReqStatus}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Card className="mx-auto w-full h-full">
                <CardHeader floated={false} shadow={false}>
                  <Typography variant="h3" className="!font-bold text-center">
                    {values.mtrReqStatus_Name}
                  </Typography>
                </CardHeader>
                <CardBody>
                  <Typography
                    color="blue-gray"
                    variant="lead"
                    className="!font-bold"
                  >
                    คำอธิบาย <span className="text-red-700">*</span>
                  </Typography>
                  <Textarea
                    label="note timeline"
                    name="mrHis_Detail"
                    value={values.mrHis_Detail || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // error={Boolean(
                    //   touched &&
                    //   touched.mrHis_Detail &&
                    //   errors &&
                    //   errors.mrHis_Detail,
                    // )}
                  />
                </CardBody>
                <CardFooter className="flex justify-end pt-0">
                  <Button type="submit" color="blue">
                    ยืนยัน
                  </Button>
                </CardFooter>
              </Card>
            </Form>
          )}
        </Formik>
      ) : action === "detail" ? (
        <Card className=" w-full overflow-scroll">
          <CardHeader
            floated={false}
            shadow={false}
            className="mb-2 rounded-none p-2"
          >
            <div className="w-full md:w-96"></div>
          </CardHeader>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.length > 0 &&
                  TABLE_HEAD.map((head) => (
                    <th key={head} className="border-b border-gray-300 p-4">
                      <div className="flex items-center gap-1">
                        <Typography
                          color="blue-gray"
                          variant="small"
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
                    : "p-4 border-b border-gray-300";

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <div className="flex items-center gap-1">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          className="font-normal text-gray-600"
                        >
                          {detail}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Card>
      ) : action === "timeline" ? (
        <Card>
          <CardBody className="overflow-scroll max-h-[90vh]">
            <Timeline>
              {value &&
                value.length > 0 &&
                value.map(
                  (
                    {
                      mrHis_Id,
                      mrHis_Detail,
                      mrHis_CreationDate,
                      mtrReq_Id,
                      mtrReqStatus_Id,
                      mtrReqStatus_Name,
                    },
                    index,
                  ) => (
                    <TimelineItem key={index}>
                      <TimelineConnector />
                      <TimelineHeader>
                        <TimelineIcon className="p-2">
                          <ClockIcon className="h-4 w-4" />
                        </TimelineIcon>
                        <Typography variant="h6" className="text-black">
                          {mtrReqStatus_Name || ""}
                        </Typography>
                      </TimelineHeader>
                      <TimelineBody className="pb-8">
                        <Typography className="font-medium text-black text-[16px]">
                          {mrHis_CreationDate
                            ? toThaiDateTimeString(mrHis_CreationDate)
                            : ""}
                        </Typography>
                        <Typography className="font-normal text-blue-gray-600 text-[14px]">
                          {mrHis_Detail || ""}
                        </Typography>
                      </TimelineBody>
                    </TimelineItem>
                  ),
                )}
            </Timeline>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardHeader shadow={false} floated={false}>
            Not Found 404
          </CardHeader>
        </Card>
      )}
    </Dialog>
  );
};
