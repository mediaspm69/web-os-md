import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Progress,
} from "@material-tailwind/react";
import { ReportDepatrmentListService, ReportHistoryTimeService, ReportStatusListService } from "@/services/job.service";
import MyContext from "@/context/MyContext";
import { StatisticsCard } from "@/widgets/cards";

export function Home() {
  const { setLoader } = useContext(MyContext);
  const [dpms, setDpms] = useState([]);
  const [staList, setStaList] = useState([]);
  const [hisTime, setHisTime] = useState({days:0,hours:0,minutes:0,totalCount:0});

  useEffect( () => {
    fetchDataDPMS();
    fetchDataStatus()
    fetchDataHistoryTime()
  }, []);

  const fetchDataDPMS = async () => {
    setLoader(true);
    const resp = await ReportDepatrmentListService();
    if (resp) {
      setDpms(resp);
    } else {
      setDpms([]);
    }
  };

  const fetchDataStatus = async () => {
    const resp = await ReportStatusListService();
    if (resp) {
      setStaList(resp);
    } else {
      setStaList([]);
    }
  };

  const fetchDataHistoryTime = async () => {
    const resp = await ReportHistoryTimeService();
    if (resp) {
      setHisTime(resp);
    } else {
      setHisTime({day:0,hours:0,minutes:0});
    }
    setLoader(false);
  };
 
  return (
    <div className="mt-12 min-h-[75vh]">
      <div className="mb-12 grid gap-y-2 gap-x-2 md:grid-cols-2 xl:grid-cols-5">
        {/* {statisticsCardsData.map(({ icon, title, footer, ...rest }) => ( */}
       {hisTime && <StatisticsCard
          value={`${hisTime.totalCount}`}
          title={"งานทั้งหมด"}
        />}
        {staList &&
          staList.length > 0 &&
          staList
            .sort((a, b) => a.jobStatus_Id.localeCompare(b.jobStatus_Id))
            .map(({ jobStatus_Id, jobStatus_Name, total }) => {
              if (
                jobStatus_Id === "S02" ||
                jobStatus_Id === "S03" ||
                jobStatus_Id === "S05"
              )
                return (
                  <StatisticsCard
                    key={jobStatus_Id}
                    value={total ? total : 0}
                    title={jobStatus_Name}
                    // icon={React.createElement(icon, {
                    //   className: "w-6 h-6 text-white",
                    // })}
                    // footer={
                    //   <Typography className="font-normal text-blue-gray-600">
                    //     <strong className={color}>{footer.value}</strong>
                    //     &nbsp;{footer.label}
                    //   </Typography>
                    // }
                  />
                );
            })}
        {hisTime && <StatisticsCard
          value={` ${hisTime.days} วัน ${hisTime.hours} ชั่วโมง ${hisTime.minutes} นาที`}
          title={"ระยะเวลา (เฉลี่ย)"}
          // icon={React.createElement(icon, {
          //   className: "w-6 h-6 text-white",
          // })}
          // footer={
          //   <Typography className="font-normal text-blue-gray-600">
          //     <strong className={color}>{footer.value}</strong>
          //     &nbsp;{footer.label}
          //   </Typography>
          // }
        />}
        {/* ))} */}
      </div>
      <div className="mb-4 grid grid-cols-1 gap-6 ">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography
                variant="h6"
                color="blue-gray"
                className="mb-1 text-[18px]"
              >
                สถิติการสั่งงานแยกตามแผนก
              </Typography>
              {/* <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />
                <strong>30 done</strong> this month
              </Typography> */}
            </div>
            {/* <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu> */}
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["แผนก", "จำนวน"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-6 text-left "
                    >
                      <Typography
                        variant="small"
                        className="text-[16px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dpms.map(
                  ({ department_Id, department_Name, total }, index) => {
                    const className = `py-3 px-5 ${
                      index === dpms.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={index}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            {/* <Avatar src={img} alt={name} size="sm" /> */}
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {department_Name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              {total}
                            </Typography>
                            <Progress
                              value={total}
                              variant="gradient"
                              color={total === 100 ? "green" : "blue"}
                              className="h-1"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
        {/* <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Orders Overview
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>24%</strong> this month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            {ordersOverviewData.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3">
                  <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                      key === ordersOverviewData.length - 1
                        ? "after:h-0"
                        : "after:h-4/6"
                    }`}
                  >
                    {React.createElement(icon, {
                      className: `!w-5 !h-5 ${color}`,
                    })}
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      {title}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  </div>
                </div>
              )
            )}
          </CardBody>
        </Card> */}
      </div>
    </div>
  );
}

export default Home;
