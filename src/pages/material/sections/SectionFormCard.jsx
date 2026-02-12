import { MapPinIcon } from "@heroicons/react/24/solid";
import { Button, Card, CardBody, CardHeader, Chip, Typography } from "@material-tailwind/react";
import React from "react";

export const SectionFormCard = ({ data = [] ,handleOpen = ()=> {}}) => {
  return (
    <div className="grid lg:grid-cols-3  sm:grid-cols-2 grid-cols-1 gap-2">
      {data &&
        data.length > 0 &&
        data.map(
          (
            itemMtr,
            index,
          ) => 
          {
         const { material_Code, material_Name, material_Amount, material_Image, material_Detail, material_Price, material_Position, mtrType_Id } = itemMtr
            return (
            <Card key={index} className="max-w-[24rem] overflow-hidden">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                <img src={material_Image} alt={material_Name}/>
              </CardHeader>
              <CardBody className="flex flex-col gap-1">
                <div className="flex flex-row  justify-between">
                  <Chip variant="outlined" value={material_Code || "ไม่พบรหัส"} />
                  <Chip
                    variant="gradient"
                    color={parseInt(material_Amount || 0) > 0 ? "green" : "red"}
                    value={
                      parseInt(material_Amount || 0) > 0 ? "In Stock" : "Out of Stock"
                    }
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
                      color={parseInt(material_Amount || 0) > 0 ? "green" : "red"}
                      className="font-medium text-sm"
                    >
                      <span className="text-black">คงเหลือ: </span>
                      {`${material_Amount}`}
                    </Typography>
                  </div>
                  <Button
                    onClick={()=> handleOpen('update',itemMtr)}
                    variant="text"
                    size="md"
                    color="yellow"
                    className="font-medium text-sm"
                  >
                    แก้ไขข้อมูล
                  </Button>
                </div>
              </CardBody>
            </Card>
          )
          }
           
        )}
    </div>
  );
};
