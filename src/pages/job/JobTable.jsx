import {
  Card,
  CardBody,
  Typography,
  Button,
  CardHeader,
  IconButton,
  Dialog,
  DialogBody,
  DialogFooter,
  Textarea,
  Chip,
  CardFooter,
  Input,
  PopoverHandler,
  Popover,
  PopoverContent,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  DeleteJobService,
  GetListJobHistoryByIdService,
  GetListJobService,
  InsertJobHistoryService,
  RemoveIsShowService,
  UpdateJobStatusService,
} from "@/services/job.service";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InformationCircleIcon,
  LightBulbIcon,
  LinkIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import MyContext from "@/context/MyContext";
import Swal from "sweetalert2";

import { toThaiDateTimeString } from "@/helpers/format";
import { isShowData, jobStaEmp, jobStaManager, jsData } from "@/data";
import { JobHsitoryTimeline } from "./sections/JobHsitoryTimeline";
import { Form, Formik } from "formik";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { OSPagination } from "@/components/OSPagination";
import { PrivateRouteList } from "@/guard/PrivateRouteList";
import { PrivateRoute } from "@/guard/PrivateRoute";
import { DayPicker } from "react-day-picker";

export function JobTable() {
  const navigate = useNavigate();
  const { dataEmp, setLoader, dpms } = useContext(MyContext);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [jobs, setJobs] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 1,
    data: [],
  });
  const [seas, setSeas] = useState({
    employee_Id: "",
    jobStatus_Id: "",
    days: [],
  });
  const [open, setOpen] = useState(false);
  const [itemJob, setItemJob] = useState();
  const [jobHistory, setJobHistory] = useState([]);

  useEffect(() => {
    fetchData();
  }, [page, pageSize, dataEmp,seas]);

  useEffect(() => {
    const intervalId = setInterval(fetchRealTimeData, 10000); // Fetch every 10 seconds
    return () => clearInterval(intervalId);
  }, [page, pageSize, dataEmp,seas]);

  const fetchData = async () => {
    setLoader(true);
    if (dataEmp) {
      const res = await GetListJobService(
        page,
        pageSize,
        dataEmp.dpm_id,
        dataEmp.role_id,
        seas
      );

      if (res) {
        setJobs(res);
      } else {
        setJobs({ page: 1, pageSize: 10, total: 0, totalPages: 1 });
      }
      setLoader(false);
    }
  };

  const fetchRealTimeData = async () => {
    if (dataEmp) {
      const res = await GetListJobService(
        page,
        pageSize,
        dataEmp.dpm_id ?? "",
        dataEmp.role_id ?? "",
        seas
      );

      if (res) {
        setJobs(res);
      } else {
        setJobs({ page: 1, pageSize: 10, total: 0, totalPages: 1 });
      }
      setLoader(false);
    }
  };

  const fetchDataHistory = async (id) => {
    setLoader(true);
    const res = await GetListJobHistoryByIdService(id);
    setLoader(false);
    if (res) {
      setJobHistory(res);
    } else {
      setJobHistory([]);
    }
  };

  const handleOpen = async (data) => {
    setItemJob(data);
    await fetchDataHistory(data.job_Id);
    setOpen(true);
  };

  const handleClose = () => {
    setItemJob(null);
    setOpen(false);
  };

  const onPageChange = async (e) => {
    const selected = e.selected;
    setPage(selected + 1);
  };

  const handleChangePageSize = async (number) => {
    setPageSize(number);
  };

  // const handleSearchData = async () => {
  //   if (jobs.data.length) {
  //     let newData = [];
  //     if (secDays.length > 0) {
  //       jobs.data.forEach((elm) => {
  //         const creDate = format(elm.job_CreationDate, "dd/MM/yyyy");
  //         const secDay = secDays.find((fdDay) => format(fdDay, "dd/MM/yyyy") === creDate);
  //         if (Boolean(secDay)) {
  //           newData.push({ ...elm });
  //         }
  //       });
  //       return setJobs({ ...jobs, data: newData });
  //     } else {
  //       await fetchData();
  //     }
  //   }
  // };

  const jobStatusData = (id) => {
    if (id) {
      const item = jsData.find((fd) => fd?.id === id);
      if (item) {
        return (
          <Chip value={item.name} color={item.color} className="w-fit h-fit" />
        );
      }
    }
    return "";
  };

  const departmentData = (id) => {
    if (id) {
      if (dpms && dpms.length > 0) {
        const dpmName = dpms.find((fd) => fd?.department_Id === id,)?.department_Name;
        if (dpmName) {
          return dpmName;
        }
      }
    }
    return "";
  };

  const handleJobIsShowData = (isShow) => {
    if (isShow) {
      const sta = isShowData.find((fd) => fd?.status === isShow);
      if (sta) {
        return <LightBulbIcon color={sta?.color} className={`w-5 h-5 `} />;
      }
    }
    return "";
  };

  // const convertDriveIFrame = (url) => {
  //   if (url) {
  //     const fileId = url.match(/[-\w]{25,}/)[0];
  //     return `https://lh3.googleusercontent.com/d/${fileId}`;
  //   }
  //   return ""; // or handle invalid format
  // };

  const deleteJob = async (id) => {
    await Swal.fire({
      title: "คุณแน่ใจเหรอ?",
      text: "คุณจะไม่สามารถย้อนกลับการเปลี่ยนแปลงนี้ได้!",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#CACACA",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoader(true);
        const resp = await DeleteJobService(id);
        setLoader(false);
        if (resp && resp.success) {
          // Swal.fire({
          //   title: "ลบสำเร็จ",
          //   icon: "success",
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
          await fetchData();
        }
      }
    });
  };

  const removeIsShow = async (id, isShow) => {
    const resp = await RemoveIsShowService(id, isShow);
    if (resp && resp.success) {
      await fetchData();
    }
  };

  const empRemoveIsShow = async (id, isShow) => {
    handleClose();
    await Swal.fire({
      title: "คุณแน่ใจเหรอ?",
      text: "คุณจะไม่สามารถย้อนกลับการเปลี่ยนแปลงนี้ได้!",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#CACACA",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoader(true);
        const resp = await RemoveIsShowService(id, isShow);
        if (resp && resp.success) {
          // Swal.fire({
          //   title: "ลบสำเร็จ",
          //   icon: "success",
          //   showConfirmButton: false,
          //   timer: 1500,
          // });
          await fetchData();
        }
        setLoader(false);
      }
    });
  };

  const updateJobStatus = async (
    id,
    status_id,
    status_name,
    detail,
    rec_id,
    rec_name,
  ) => {
    handleClose();
    setLoader(true);
    const resp = await UpdateJobStatusService(id, status_id, rec_id, rec_name);

    if (resp && resp.success) {
      const resp2 = await InsertJobHistoryService({
        name: status_name,
        detail: detail ? detail : "",
        job_id: id,
      });

      if (resp2 && resp2.success) {
        await fetchData();
      }
    }
    setLoader(false);
  };

  const onSubmitSearch = async (value) => {
    let newValue = value;
    if (value.days.length > 0) {
      const days = value.days.map((mDay) => format(mDay, "dd/MM/yyyy"));
      newValue = { ...value, days };
    }
    console.log('newValue',newValue);
    setSeas(newValue)
  };
  
  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12 min-h-[70vh]">
        <Card>
          <div className="mb-8 p-6 bg-[#FFFFFF] shadow-md rounded-xl mt-[-30px] mx-2">
            <div className="w-full flex flex-row justify-between ">
              <Typography variant="h6" className="text-[#0057A1]">
                ข้อมูลการแจ้งงาน
              </Typography>

              <div className="flex justify-center items-center gap-4">
                <PrivateRouteList
                  role={(dataEmp && dataEmp.role_id) || ""}
                  roles={["R02"]}
                >
                  <Button
                    onClick={() => navigate("insert")}
                    className="flex justify-center items-center bg-[#0057A1]"
                  >
                    <Typography
                      variant="h3"
                      className="text- text-sm text-[#FFFFFF]"
                    >
                      แจ้งงานใหม่
                    </Typography>
                  </Button>
                </PrivateRouteList>
                <IconButton
                  color="green"
                  onClick={async () => await fetchData()}
                >
                  <ArrowPathIcon className="w-5 h-5" />
                </IconButton>
              </div>
            </div>

            <Formik
              enableReinitialize
              initialValues={{
                employee_Id: "",
                jobStatus_Id: "",
                days: [],
              }}
              onSubmit={onSubmitSearch}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                handleBlur,
                setFieldValue,
              }) => (
                <Form
                  onSubmit={handleSubmit}
                  className="p-3 flex md:flex-row flex-col md:justify-between justify-center items-center gap-2"
                >
                  <div className="flex md:flex-row flex-wrap  gap-2 w-full">
                    <div className="flex flex-col md:w-fit w-full gap-2">
                      <Typography className="text-sm text-black">
                        สถานะ
                      </Typography>
                      <select
                        className="md:w-fit w-full bg-transparent placeholder:text-blue-gray-400 text-blue-gray-700  text-sm rounded  px-3 py-2 transition duration-300 normal-case focus:outline-none border-[1px] focus:border-[1px] border-blue-gray-200 focus:border-blue-gray-900  hover:border-blue-gray-400  appearance-none cursor-pointer"
                        name="jobStatus_Id"
                        value={values.jobStatus_Id || ""}
                        onChange={(e) => {
                          setFieldValue("jobStatus_Id", e.target.value);
                        }}
                        onBlur={handleBlur}
                      >
                        <option value="">แสดงทั้งหมด</option>
                        {jsData.map(({ id, name }, index) => (
                          <option value={id} key={index}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <PrivateRouteList
                      role={(dataEmp && dataEmp.role_id) || ""}
                      roles={["R01", "R02"]}
                    >
                      {dataEmp && dataEmp.id && (
                        <div className="flex flex-col md:w-fit w-full gap-2">
                          <Typography className="text-sm text-black">
                            การแสดงผล
                          </Typography>
                          <select
                            className="md:w-fit w-full bg-transparent placeholder:text-blue-gray-400 text-blue-gray-700  text-sm rounded  px-3 py-2 transition duration-300 normal-case focus:outline-none border-[1px] focus:border-[1px] border-blue-gray-200 focus:border-blue-gray-900  hover:border-blue-gray-400  appearance-none cursor-pointer"
                            name="employee_Id"
                            value={values.employee_Id || ""}
                            onChange={(e) => {
                              setFieldValue("employee_Id", e.target.value);
                            }}
                            onBlur={handleBlur}
                          >
                            <option value="">แสดงทั้งหมด</option>
                            <option value={dataEmp.id}>เฉพาะผู้ใช้งาน</option>
                          </select>
                        </div>
                      )}
                    </PrivateRouteList>
                    <div className="flex flex-col md:w-fit w-full gap-2">
                      <Typography className="text-sm text-black">
                        วันที่แจ้งงาน
                      </Typography>
                      <Popover placement="bottom">
                        <PopoverHandler>
                          <Button
                            color="green"
                            size="sm"
                            variant="outlined"
                            className="flex gap-2 h-fit "
                          >
                            {values.days ? (
                              values.days.length > 0 ? (
                                values.days.map((title, index) => (
                                  <p key={index} className="text-sm">
                                    {title ? format(title, "dd/MM/yyyy") : ""}
                                  </p>
                                ))
                              ) : (
                                <Typography className="text-sm">
                                  วันที่เริ่ม - วันที่สิ้นสุด
                                </Typography>
                              )
                            ) : (
                              <Typography className="text-sm">
                                กรุณารอสักครู่
                              </Typography>
                            )}
                          </Button>
                        </PopoverHandler>
                        <PopoverContent>
                          <DayPicker
                            max={2}
                            mode="multiple"
                            selected={values.days}
                            onSelect={(sec) => {
                              if (sec.length > 1) {
                                const newSec = sec.sort(
                                  (a, b) => new Date(a) - new Date(b),
                                );
                                setFieldValue("days", newSec);
                                return;
                              }
                              setFieldValue("days", sec);
                            }}
                            showOutsideDays
                            components={{
                              IconLeft: ({ ...props }) => (
                                <ChevronLeftIcon
                                  {...props}
                                  className="h-4 w-4 stroke-2"
                                />
                              ),
                              IconRight: ({ ...props }) => (
                                <ChevronRightIcon
                                  {...props}
                                  className="h-4 w-4 stroke-2"
                                />
                              ),
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <Button
                    // onClick={handleSearchData}
                    size="sm"
                    color="blue"
                    className="h-fit"
                    type="submit"
                  >
                    ค้นหา
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <PrivateRouteList
              role={(dataEmp && dataEmp.role_id) || ""}
              roles={["R01", "R02"]}
            >
              <div className="flex flex-col gap-4 p-2">
                {jobs.data && jobs.data.length > 0 ? (
                  <>
                    {jobs.data.map((iJob, index) => (
                      <Card
                        key={index}
                        onClick={async () => await handleOpen(iJob)}
                      >
                        <CardBody className="grid md:grid-cols-2 sm:grid-cols-1">
                          <div className="flex flex-row justify-start items-center gap-2">
                            <div>{/* <Avatar alt="5" /> */}</div>
                            <div className="flex flex-col">
                              <Typography variant="h6" color="black">
                                {iJob.job_Code}
                              </Typography>
                              <Typography variant="h6" color="black">
                                <span className="text-blue-gray-800">
                                  หัวข้อ:
                                </span>
                                {` ${iJob.job_Name || ""}`}
                              </Typography>
                              <Typography variant="h6" color="black">
                                <span className="text-blue-gray-800">
                                  ผู้แจ้ง:
                                </span>
                                {` ${iJob.employee_FirstName || ""} `}
                                <span className="text-blue-gray-800">
                                  ผู้ตรวจสอบ:
                                </span>
                                {` ${iJob.reviewer_Name || ""}`}
                              </Typography>
                              {iJob.empDpt_Id && (
                                <Typography variant="h6" color="black">
                                  <span className="text-blue-gray-800">
                                    แผนกที่แจ้งงาน:
                                  </span>
                                  {` ${departmentData(iJob.empDpt_Id)} `}
                                </Typography>
                              )}
                              <Typography variant="h6" color="black">
                                <span className="text-blue-gray-800">
                                  กำหนดส่ง:
                                </span>
                                {` ${toThaiDateTimeString(iJob.job_DateTime)} `}
                              </Typography>
                              <Typography variant="h6" color="black">
                                <span className="text-blue-gray-800">
                                  วันที่แจ้ง:
                                </span>
                                {` ${toThaiDateTimeString(iJob.job_CreationDate)}`}
                              </Typography>
                            </div>
                          </div>
                          <div className="flex md:flex-col md:justify-center justify-start md:items-end items-start gap-2">
                            {iJob.recipient_Name && (
                              <Chip
                                color="purple"
                                value={iJob.recipient_Name}
                                className="w-fit h-fit"
                              />
                            )}
                            {iJob.department_Id && (
                              <Chip
                                color="green"
                                value={departmentData(iJob.department_Id)}
                                className="w-fit h-fit"
                              />
                            )}
                            {iJob.jobStatus_Id &&
                              jsData.map((ijs, index) => {
                                if (ijs.id === iJob.jobStatus_Id) {
                                  return (
                                    <Chip
                                      key={index}
                                      value={ijs.name}
                                      color={ijs.color}
                                      className="w-fit h-fit"
                                    />
                                  );
                                }
                              })}
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </PrivateRouteList>
            <PrivateRouteList
              role={(dataEmp && dataEmp.role_id) || ""}
              roles={["R99"]}
            >
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {[
                      "รหัสงาน",
                      "หัวข้องาน",
                      "ชื่อผู้แจ้ง",
                      "ชื่อผู้ตรวจ",
                      "วันที่แจ้ง",
                      "สถานะ",
                      "",
                    ].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left text-[14px] "
                      >
                        <Typography
                          variant="small"
                          className="text-[16px] font-bold uppercase text-blue-gray-400 "
                        >
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {jobs.data &&
                    jobs.data.length > 0 &&
                    jobs.data.map((item, index) => {
                      const className = `py-3 px-5 ${
                        index === jobs.data.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;
                      const {
                        job_Id,
                        job_Code,
                        job_Name,
                        employee_FirstName,
                        reviewer_Name,
                        job_CreationDate,
                        jobStatus_Id,
                        isShow,
                      } = item;
                      return (
                        <tr key={index}>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              {/* <Avatar src={img} alt={name} size="sm" /> */}
                              <Typography
                                color="blue-gray"
                                className="font-bold text-[14px]"
                              >
                                {job_Code || ""}
                              </Typography>
                            </div>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              className="font-medium text-[14px] text-blue-gray-600 w-[200px]"
                            >
                              {job_Name || ""}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              className="font-medium text-[14px] text-blue-gray-600 w-[100px]"
                            >
                              {employee_FirstName || ""}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              className="font-medium text-[14px] text-blue-gray-600 w-[100px]"
                            >
                              {reviewer_Name || ""}
                            </Typography>
                          </td>

                          <td className={className}>
                            <Typography
                              variant="small"
                              className="font-medium text-[14px] text-blue-gray-600 w-[200px]"
                            >
                              {toThaiDateTimeString(job_CreationDate)}
                            </Typography>
                          </td>
                          <td className={className}>
                            <div className="flex justify-start items-center">
                              {jobStatus_Id && jobStatusData(jobStatus_Id)}
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex gap-2">
                              <IconButton
                                className="bg-white"
                                onClick={async () =>
                                  await removeIsShow(job_Id, isShow)
                                }
                              >
                                {handleJobIsShowData(isShow)}
                              </IconButton>
                              <IconButton
                                onClick={async () => await handleOpen(item)}
                                className="bg-blue-400"
                              >
                                <InformationCircleIcon className="w-5 text-white" />
                              </IconButton>
                              <IconButton
                                onClick={async () => await deleteJob(job_Id)}
                                className="bg-red-700"
                              >
                                <TrashIcon className="w-5 text-white" />
                              </IconButton>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </PrivateRouteList>
          </CardBody>
          <CardFooter>
            <OSPagination
              total={jobs.total}
              pageCount={jobs.totalPages}
              page={page}
              pageSize={pageSize}
              onPageChange={onPageChange}
              handleChangePageSize={handleChangePageSize}
            />
          </CardFooter>
        </Card>
      </div>
      <Dialog className="bg-white" open={open} handler={handleClose} size="xl">
        <Formik
          initialValues={{
            job_Id: itemJob ? (itemJob.job_Id ?? "") : "",
            job_Name: itemJob ? (itemJob.job_Name ?? "") : "",
            job_Detail: itemJob ? (itemJob.job_Detail ?? "") : "",
            job_DateTime: itemJob
              ? (format(itemJob.job_DateTime, "yyyy-MM-dd HH:mm", {
                  locale: th,
                }) ?? "")
              : "",
            countUpdate: "",
            job_Target: itemJob ? (itemJob.job_Target ?? "") : "",
            job_Objective: itemJob ? (itemJob.job_Objective ?? "") : "",
            job_mt: itemJob ? (itemJob.job_mt ?? "") : "",
            job_mf: itemJob ? (itemJob.job_mf ?? "") : "",
            job_file: itemJob ? (itemJob.job_file ?? "") : "",
            jobType_Id: itemJob ? (itemJob.jobType_Id ?? "") : "",
            jobStatus_Id: itemJob ? (itemJob.jobStatus_Id ?? "") : "",
            recipient_Id: itemJob ? (itemJob.recipient_Id ?? "") : "",
            recipient_Name: itemJob ? (itemJob.recipient_Name ?? "") : "",
            reviewer_Name: itemJob ? itemJob.reviewer_Name : "",
            employee_Id: itemJob ? (itemJob.employee_Id ?? "") : "",
            employee_FirstName: itemJob ? itemJob.employee_FirstName : "",
            empDpt_Id: itemJob ? itemJob.empDpt_Id : "",
            department_Id: itemJob ? (itemJob.department_Id ?? "") : "",
            position_Id: itemJob ? (itemJob.position_Id ?? "") : "",
            isShow: itemJob ? (itemJob.isShow ?? "") : "",
            history: "",
          }}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form className="">
              <div className="flex flex-row justify-between p-2 gap-2 ">
                <Typography className="text-[18px] font-bold">
                  {values.job_Name || ""}
                </Typography>

                <XMarkIcon
                  className="w-8 h-8 text-red-500"
                  onClick={handleClose}
                />
              </div>

              <DialogBody className="md:max-h-[70vh] max-h-[50vh] overflow-scroll">
                <div className="w-full grid md:grid-cols-2 grid-cols-1">
                  <div className="w-full">
                    <div className="grid grid-cols-2  bg-[#FAFAFA] p-2 rounded-md gap-2">
                      <div className="w-full">
                        <div>
                          <Typography className="text-[16px] font-normal text-blue-gray-700">
                            ผู้สั่งงาน
                          </Typography>
                          <Typography className="text-[16px] font-normal text-black">
                            {values.employee_FirstName || ""}
                          </Typography>
                        </div>
                        <div>
                          <Typography className="text-[16px] font-normal text-blue-gray-700">
                            ผู้ตรวจสอบงาน
                          </Typography>
                          <Typography className="text-[16px] font-normal text-black">
                            {values.reviewer_Name || ""}
                          </Typography>
                        </div>
                      </div>
                      <div className="w-full">
                        <div>
                          <Typography className="text-[16px] font-normal text-blue-gray-700">
                            แผนก
                          </Typography>
                          <Typography className="text-[16px] font-normal text-black">
                            {values.empDpt_Id &&
                              departmentData(values.empDpt_Id)}
                          </Typography>
                        </div>
                        <div>
                          <Typography className="text-[16px] font-normal text-blue-gray-700">
                            กำหนดส่ง
                          </Typography>
                          <Typography className="text-[16px] font-normal text-black">
                            {toThaiDateTimeString(values.job_DateTime)}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <Typography className="text-[16px] font-bold my-4 text-black">
                      รายละเอียด (BRIEF)
                    </Typography>
                    <div className="bg-[#FAFAFA] pb-4">
                      <div className="grid grid-cols-2  p-2 rounded-md gap-2">
                        <div className="w-full flex flex-col gap-2">
                          <div className="border-[1px] border-gray-400 rounded-md p-2 bg-white">
                            <Typography className="text-[16px] font-normal text-blue-gray-700">
                              วัตถุประสงค์
                            </Typography>
                            <Typography className="text-[16px] font-normal text-black">
                              {values.job_Objective || ""}
                            </Typography>
                          </div>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                          <div className="border-[1px] border-gray-400 rounded-md p-2 bg-white">
                            <Typography className="text-[16px] font-normal text-blue-gray-700">
                              กลุ่มเป้าหมาย
                            </Typography>
                            <Typography className="text-[16px] font-normal text-black">
                              {values.job_Target || ""}
                            </Typography>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2  p-2 rounded-md gap-2">
                        <div className="w-full flex flex-col gap-2">
                          <div className="border-[1px] border-gray-400 rounded-md p-2 bg-white">
                            <Typography className="text-[16px] font-normal text-blue-gray-700">
                              MODE / TONE
                            </Typography>
                            <Typography className="text-[16px] font-normal text-black">
                              {values.job_mt || ""}
                            </Typography>
                          </div>
                        </div>
                        <div className="w-full flex flex-col gap-2">
                          <div className="border-[1px] border-gray-400 rounded-md p-2 bg-white">
                            <Typography className="text-[16px] font-normal text-blue-gray-700">
                              Key Message
                            </Typography>
                            <Typography className="text-[16px] font-normal text-black">
                              {values.job_mf || ""}
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1  p-2 rounded-md ">
                        <div className="border-[1px] border-gray-400 rounded-md p-2 ">
                          <Typography className="text-[16px] font-normal text-blue-gray-700">
                            รายละเอียดเพิ่มเติม
                          </Typography>
                          {values.job_Detail && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: values.job_Detail,
                              }}
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end">
                        {values.job_file ? (
                          <div className="flex items-center gap-2">
                            ลิงก์รูปภาพ
                            <a
                              className="w-fit text-green-500"
                              href={values.job_file}
                              download="proposed_file_name"
                              target="_blank"
                            >
                              <IconButton color="green">
                                <LinkIcon className="w-5" />
                              </IconButton>
                            </a>
                          </div>
                        ) : (
                          <Typography>ไม่พบลิงก์รูปภาพ</Typography>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-6">
                    <Typography className="text-[18px] font-bold text-blue-gray-700 text-center">
                      ประวัติการดำเนินงาน
                    </Typography>
                    <div className="py-4 flex flex-col justify-between">
                      <JobHsitoryTimeline itemHistory={jobHistory} />
                      <PrivateRouteList
                        role={dataEmp && dataEmp.id}
                        roles={[values.employee_Id, values.recipient_Id]}
                      >
                        <PrivateRouteList
                          role={values.jobStatus_Id}
                          roles={["S01", "S02"]}
                        >
                          <div className="w-full max-h-[20vh] pt-4">
                            <Typography className="text-[16px] font-normal text-blue-gray-700">
                              ข้อความ
                            </Typography>
                            <Textarea
                              placeholder="message"
                              className="rounded-md focus:border-[0.5px] appearance-none  !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                              labelProps={{
                                className:
                                  "before:content-none after:content-none",
                              }}
                              name="history"
                              value={values.history}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </PrivateRouteList>
                      </PrivateRouteList>
                    </div>
                  </div>
                </div>
              </DialogBody>

              <DialogFooter className="flex flex-row justify-between items-center gap-2">
                <div className="flex flex-col gap-2">
                  {values.recipient_Name && (
                    <Chip
                      color="purple"
                      value={values.recipient_Name}
                      className="w-fit h-fit"
                    />
                  )}
                  {values.department_Id && (
                    <Chip
                      color="green"
                      value={departmentData(values.department_Id)}
                      className="w-fit h-fit"
                    />
                  )}
                </div>

                <div className="flex flex-row gap-2">
                  {values.jobStatus_Id === "S01" ? (
                    <PrivateRoute
                      rolePrimary={dataEmp && dataEmp.role_id}
                      rolesTrial={"R01"}
                    >
                      {jobStaManager
                        .filter((ft) => ft.status_id === values.jobStatus_Id)
                        .map((item, index) => (
                          <Button
                            key={index}
                            type="button"
                            onClick={async () => {
                              await updateJobStatus(
                                values.job_Id,
                                item.js_id,
                                item.name,
                                values.history,
                                dataEmp.id,
                                dataEmp.firstname,
                              );
                            }}
                            variant="gradient"
                            color={item.color ? item.color : "gray"}
                          >
                            <span>{item.name}</span>
                          </Button>
                        ))}
                    </PrivateRoute>
                  ) : (
                    <PrivateRoute
                      rolePrimary={(dataEmp && dataEmp.id) || ""}
                      rolesTrial={values.recipient_Id || ""}
                    >
                      <PrivateRouteList
                        role={dataEmp && dataEmp.role_id}
                        roles={["R01"]}
                      >
                        {jobStaManager
                          .filter((ft) => ft.status_id === values.jobStatus_Id)
                          .map((item, index) => (
                            <Button
                              key={index}
                              type="button"
                              onClick={async () => {
                                await updateJobStatus(
                                  values.job_Id,
                                  item.js_id,
                                  item.name,
                                  values.history,
                                  dataEmp.id,
                                  dataEmp.firstname,
                                );
                              }}
                              variant="gradient"
                              color={item.color ? item.color : "gray"}
                            >
                              <span>{item.name}</span>
                            </Button>
                          ))}
                      </PrivateRouteList>
                    </PrivateRoute>
                  )}

                  <PrivateRouteList
                    role={dataEmp && dataEmp.role_id}
                    roles={["R02"]}
                  >
                    <PrivateRoute
                      rolePrimary={(dataEmp && dataEmp.id) || ""}
                      rolesTrial={values.employee_Id || ""}
                    >
                      <PrivateRouteList
                        role={values.jobStatus_Id || ""}
                        roles={["S01", "S02"]}
                      >
                        <Button
                          type="button"
                          variant="gradient"
                          color={"yellow"}
                          onClick={() =>
                            navigate("update", { state: values.job_Id })
                          }
                        >
                          <span>แก้ไขข้อมูล</span>
                        </Button>
                      </PrivateRouteList>

                      {jobStaEmp
                        .filter((ft) => ft.status_id === values.jobStatus_Id)
                        .map((item, index) => (
                          <Button
                            key={index}
                            type="button"
                            variant="gradient"
                            color={item.color ? item.color : "gray"}
                            onClick={async () => {
                              await updateJobStatus(
                                values.job_Id,
                                item.js_id,
                                item.name,
                                values.history,
                                values.position_Id,
                                values.recipient_Name,
                              );
                            }}
                          >
                            <span>{item.name}</span>
                          </Button>
                        ))}

                      <Button
                        type="button"
                        variant="gradient"
                        color={"red"}
                        onClick={async () =>
                          await empRemoveIsShow(values.job_Id, values.isShow)
                        }
                      >
                        <span>ลบ</span>
                      </Button>
                    </PrivateRoute>
                  </PrivateRouteList>
                </div>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}

export default JobTable;
