import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import React from "react";

export const SectionFormTable = ({ data = [] }) => {
  return (
    <>
      <Card>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Name", "Amount", "Price", "Position", "Date", ""].map(
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
                      material_Image,
                      material_Name,
                      material_Amount,
                      material_Price,
                      material_Position,
                      material_CreationDate,
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
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar
                              src={material_Image}
                              alt={material_Name}
                              size="sm"
                              variant="rounded"
                            />
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
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
                              parseInt(material_Amount) > 0 ? "green" : "red"
                            }
                            value={material_Amount}
                            className="py-0.5 px-2 text-[11px] font-medium w-fit"
                          />
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {material_Price}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {material_Position}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {material_CreationDate}
                          </Typography>
                        </td>

                        <td className={className}>
                        </td>
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
