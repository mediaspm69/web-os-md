import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { LinkIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";
import React from "react";
//guard
import { PrivateRoute } from "@/guard/PrivateRoute";
//helpers
import { convertDriveImage } from "@/helpers/format";

export const SectionFormCard = ({
  employee = null,
  data = [],
  loader = false,
  handleOpen = () => {},
  handleOpenReq = () => {},
}) => {
  return (
    <div className="grid lg:grid-cols-3  sm:grid-cols-2 grid-cols-1 gap-2">
      {data &&
        data.length > 0 &&
        data.map((itemMtr, index) => {
          const {
            material_Code,
            material_Name,
            material_Stock,
            material_Image,
            material_Detail,
            material_Price,
            material_Position,
            mtrType_Id,
            employee_Id,
          } = itemMtr;
          const image = convertDriveImage(material_Image || "");
          const amount = parseInt(material_Stock || 0);
          return (
            <Card key={index} className="max-w-[24rem] overflow-hidden">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                {image ? (
                  <img
                    src={image}
                    alt={material_Code}
                    className="w-full object-cover h-60"
                  />
                ) : (
                  <div className="h-60"></div>
                )}
              </CardHeader>
              <CardBody className="flex flex-col gap-1">
                <div className="flex flex-row  justify-between">
                  <div className="flex gap-2">
                    <Chip
                      variant="outlined"
                      value={material_Code || "ไม่พบรหัส"}
                    />
                    <a
                      className="w-fit text-green-500"
                      href={material_Image}
                      download="proposed_file_name"
                      target="_blank"
                    >
                      <IconButton variant="outlined" color="green" size="md">
                        <LinkIcon className="w-5" />
                      </IconButton>
                    </a>
                  </div>

                  <Chip
                    variant="gradient"
                    color={amount > 0 ? "green" : "red"}
                    value={amount > 0 ? "In Stock" : "Out of Stock"}
                    className="py-0.5 px-2 text-[11px] font-medium w-fit"
                  />
                </div>
                <Typography variant="h5" color="blue-gray">
                  {material_Name}
                </Typography>
                <p className="font-normal line-clamp-3">{material_Detail}</p>
                <div className="flex flex-row gap-2 bg-gray-200 rounded-md p-2">
                  <MapPinIcon className="w-5 h-5 line-clamp-1" />{" "}
                  <p>{material_Position}</p>
                </div>
                <hr className="mt-4 h-[0.5px] border-t-0 bg-blue-gray-200 opacity-100 dark:opacity-50" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Typography
                      color={amount > 0 ? "green" : "red"}
                      className="font-medium text-sm"
                    >
                      <span className="text-black">คงเหลือ: </span>
                      {`${amount}`}
                    </Typography>
                  </div>
                  <div className="flex">
                    <PrivateRoute
                      rolePrimary={"R01"}
                      rolesTrial={employee && employee.role_id}
                    >
                      <PrivateRoute
                        rolePrimary={employee && employee.id}
                        rolesTrial={employee_Id}
                      >
                        <div className="flex">
                          <Button
                            disabled={loader}
                            onClick={() => handleOpen("update", itemMtr)}
                            variant="text"
                            size="md"
                            color="yellow"
                            className="font-medium text-sm"
                          >
                            แก้ไขข้อมูล
                          </Button>
                        </div>
                      </PrivateRoute>
                    </PrivateRoute>
                    <PrivateRoute
                      rolePrimary={"R02"}
                      rolesTrial={employee && employee.role_id}
                    >
                      <Button                       
                        disabled={Boolean(amount <= 0 || loader)}
                        onClick={() => handleOpenReq(itemMtr)}
                        variant="text"
                        size="md"
                        color="blue"
                        className="font-medium text-sm"
                      >
                        แจ้งเบิกสื่อ
                      </Button>
                    </PrivateRoute>
                    <Button
                      disabled={loader}
                      onClick={() => handleOpen("detail", itemMtr)}
                      variant="text"
                      size="md"
                      color="teal"
                      className="font-medium text-sm"
                    >
                      รายละเอียด
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          );
        })}
    </div>
  );
};
