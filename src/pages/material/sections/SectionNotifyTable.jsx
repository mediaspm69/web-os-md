import { mtrReqStaData } from "@/data";
import { currencyFormat } from "@/helpers/format";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import React from "react";

export const SectionNotifyTable = ({ data = [] }) => {
    const handleTotalPrice = (amount, price) => {
      const parAmount = parseInt(amount || 0);
      const parPrice = parseFloat(price || 0.0);
      const total = parAmount * parPrice;
      const currTotal = currencyFormat(total);
      return currTotal;
    };
    const handleReqStatus = (id) => {
      const fd =  mtrReqStaData.find((fd) => fd.id === id)
      if(Boolean(fd)){
        return <Typography color={fd.color} className="text-xs font-normal">{fd.name}</Typography>
      }
      return <Typography className="text-xs font-normal text-blue-gray-500">ไม่พบสถานะ</Typography>
    }
  return (
    <>
      <Card>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["รหัส","ผู้เบิก/สื่อ", "จำนวน", "ราคา/หน่วย","รวมมูลค่า", "วันที่", "สถานะ"].map(
                  (el) => (
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
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {data &&
                data.length > 0 &&
                data.map(
                  (
                    {
                      employee_FirstName,
                      mtrReq_Code,                     
                      mtrReq_Amount,
                      mtrReq_Price,
                      material_Name,
                      mtrReq_DateStart,
                      mtrReq_DateEnd,
                      mtrReq_CreationDate,
                      material_Position,
                      mtrReqStatus_Id
                    },
                    key,
                  ) => {
                    const className = `py-3 px-5 ${
                      key === data.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={key}>
                        <td className={className}>{mtrReq_Code}</td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {employee_FirstName}
                              </Typography>
                              <Typography
                                color="gray"
                                className="font-normal text-sm"
                              >
                                {material_Name}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <Chip
                            variant="gradient"
                            color={
                              parseInt(mtrReq_Amount) > 0 ? "green" : "red"
                            }
                            value={mtrReq_Amount}
                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          />
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            ฿{currencyFormat(parseFloat(mtrReq_Price || 0))}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            ฿{handleTotalPrice(mtrReq_Price, mtrReq_Amount)}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {mtrReq_DateStart}
                            </Typography>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {mtrReq_DateEnd}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          
                            {handleReqStatus(mtrReqStatus_Id)}
                   
                        </td>
                        <td className={className}></td>
                      </tr>
                    );
                  },
                )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
};
