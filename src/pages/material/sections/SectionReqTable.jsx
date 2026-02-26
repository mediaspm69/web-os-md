import { mrs_EmpData, mrs_ManData, mrsData } from "@/data";
import { PrivateRoute } from "@/guard/PrivateRoute";
import { PrivateRouteList } from "@/guard/PrivateRouteList";
import { currencyFormat, toThaiDateString } from "@/helpers/format";
import {
  CheckCircleIcon,
  ClockIcon,
  InformationCircleIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  IconButton,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";

export const SectionReqTable = ({
  employee = null,
  data = [],
  loader = false,
  handleChangeReq = () => {},
}) => {
  const handleReqStatus = (id) => {
    const fd = mrsData.find((fd) => fd.id === id);
    if (Boolean(fd)) {
      return (
        <Typography color={fd.color} className="text-xs font-normal">
          {fd.name}
        </Typography>
      );
    }
    return (
      <Typography className="text-xs font-normal text-blue-gray-500">
        ไม่พบสถานะ
      </Typography>
    );
  };
  return (
    <>
      <Card>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "รหัส",
                  "ผู้เบิก/สื่อ",
                  "จำนวน",
                  // "ราคา/หน่วย",
                  // "รวมมูลค่า",
                  "วันที่",
                  "สถานะ",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data &&
                data.length > 0 &&
                data.map((reqItem, key) => {
                  const {
                    mtrReq_Id,
                    employee_Id,
                    employee_FirstName,
                    mtrReq_Code,
                    mtrReq_Amount,
                    mtrReq_TotalPrice,
                    material_Name,
                    mtrReq_Date,
                    mtrReq_CreationDate,
                    material_Price,
                    material_Position,
                    mtrReqStatus_Id,
                    recipient_Id,
                    recipient_Name,
                    recDpm_id,
                  } = reqItem;
                  const className = `py-3 px-5 ${
                    key === data.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={key}>
                      <td className={className}>
                        <p className="text-sm font-bold">{mtrReq_Code}</p>
                      </td>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {employee_FirstName || ""}
                            </Typography>
                            <Typography
                              color="gray"
                              className="font-normal text-sm"
                            >
                              {material_Name || ""}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={parseInt(mtrReq_Amount) > 0 ? "green" : "red"}
                          value={mtrReq_Amount || ""}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      {/* <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          ฿{currencyFormat(parseFloat(material_Price || 0))}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          ฿{currencyFormat(mtrReq_TotalPrice)}
                        </Typography>
                      </td> */}
                      <td className={className}>
                        <div>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {toThaiDateString(mtrReq_Date)}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        {handleReqStatus(mtrReqStatus_Id)}
                      </td>
                      <td className={className}>
                        <div className="flex gap-1 justify-end">
                          <PrivateRoute
                            rolePrimary={
                              employee ? (employee.role_id ?? "") : ""
                            }
                            rolesTrial={"R02"}
                          >
                            <PrivateRoute
                              rolePrimary="S01"
                              rolesTrial={mtrReqStatus_Id}
                            >
                              <IconButton
                                title="แก้ไขข้อมูล"
                                disabled={loader}
                                onClick={() =>
                                  handleChangeReq(reqItem, "update")
                                }
                                className="bg-yellow-700 w-8 h-8"
                              >
                                <PencilIcon className="w-5 h-5 text-white" />
                              </IconButton>
                            </PrivateRoute>

                            <PrivateRoute
                              rolePrimary={employee ? employee.id : ""}
                              rolesTrial={employee_Id}
                            >
                              {mrs_EmpData
                                .filter(
                                  (ft) => ft.status_id === mtrReqStatus_Id,
                                )
                                ?.map(
                                  ({ id, reqsta_id, name, icon, color }) => (
                                    <IconButton
                                      key={id}
                                      title={name}
                                      disabled={loader}
                                      color={color}
                                      onClick={() =>
                                        handleChangeReq(
                                          {
                                            ...reqItem,
                                            mtrReqStatus_Id: reqsta_id,
                                            mtrReqStatus_Name: name,
                                          },
                                          "status",
                                        )
                                      }
                                      className="w-8 h-8"
                                    >
                                      {React.createElement(icon, {
                                        className: "w-6 h-6 text-white",
                                      })}
                                    </IconButton>
                                  ),
                                )}
                            </PrivateRoute>
                          </PrivateRoute>
                          <PrivateRoute
                            rolePrimary={employee ? employee.role_id : ""}
                            rolesTrial={"R01"}
                          >
                            <PrivateRoute
                              rolePrimary="S01"
                              rolesTrial={mtrReqStatus_Id}
                            >
                              {mrs_ManData
                                .filter((ft) => ft.status_id === "S01")
                                ?.map(
                                  ({ id, reqsta_id, name, icon, color }) => (
                                    <IconButton
                                      key={id}
                                      title={name}
                                      disabled={loader}
                                      color={color}
                                      onClick={() =>
                                        handleChangeReq(
                                          {
                                            ...reqItem,
                                            mtrReqStatus_Id: reqsta_id,
                                            mtrReqStatus_Name: name,
                                          },
                                          "status",
                                        )
                                      }
                                      className="w-8 h-8"
                                    >
                                      {React.createElement(icon, {
                                        className: "w-6 h-6 text-white",
                                      })}
                                    </IconButton>
                                  ),
                                )}
                            </PrivateRoute>

                            <PrivateRouteList
                              roles={["S02", "S03", "S04", "S05"]}
                              role={mtrReqStatus_Id}
                            >
                              <PrivateRoute
                                rolePrimary={employee ? employee.id : ""}
                                rolesTrial={recipient_Id}
                              >
                                {mrs_ManData
                                  .filter(
                                    (ft) => ft.status_id === mtrReqStatus_Id,
                                  )
                                  ?.map((itemRS) => {
                                    const { id, reqsta_id, name, icon, color } =
                                      itemRS;
                                    return (
                                      <IconButton
                                        key={id}
                                        title={name}
                                        disabled={loader}
                                        color={color}
                                        onClick={() =>
                                          handleChangeReq(
                                            {
                                              ...reqItem,
                                              mtrReqStatus_Id: reqsta_id,
                                              mtrReqStatus_Name: name,
                                            },
                                            "status",
                                          )
                                        }
                                        className="w-8 h-8"
                                      >
                                        {React.createElement(icon, {
                                          className: "w-6 h-6 text-white",
                                        })}
                                      </IconButton>
                                    );
                                  })}
                              </PrivateRoute>
                            </PrivateRouteList>
                          </PrivateRoute>

                          <IconButton
                            title="รายละเอียด"
                            disabled={loader}
                            onClick={() => handleChangeReq(reqItem, "detail")}
                            className="bg-blue-400 w-8 h-8"
                          >
                            <InformationCircleIcon className="w-5 h-5 text-white" />
                          </IconButton>

                          {mtrReqStatus_Id && mtrReqStatus_Id !== "S01" && (
                            <IconButton
                              title="timeline"
                              disabled={loader}
                              onClick={() =>
                                handleChangeReq(reqItem, "timeline")
                              }
                              className="bg-blue-gray-500 w-8 h-8"
                            >
                              <ClockIcon className="w-5 h-5 text-white" />
                            </IconButton>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
};
