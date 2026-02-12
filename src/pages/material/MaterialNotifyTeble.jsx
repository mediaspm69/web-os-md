import {
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
//sections
import { SectionNotifyTable } from "./sections/SectionNotifyTable";
const authorsTableData = [
  {
    mtrReq_Id: "1",
    mtrReq_Code: "REQ-1001",
    mtrReq_Amount: "5",
    mtrReq_Price: "25000",
    mtrReq_DateStart: "09/2/2569",
    mtrReq_DateEnd: "10/2/2569",
    mtrReqStatus_Id:'S01',
    material_Id: "1",
    material_Code: "M-001",
    material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
    material_Position: "คลังสื่อ ชั้น 2 ห้อง 204", 
    employee_FirstName:"คุณมะม่วง"   
  },
  {
    mtrReq_Id: "2",
    mtrReq_Code: "REQ-1002",
    mtrReq_Amount: "5",
    mtrReq_Price: "25000",
    mtrReq_DateStart: "09/2/2569",
    mtrReq_DateEnd: "10/2/2569",
    mtrReqStatus_Id:'S01',
    material_Id: "1",
    material_Code: "M-001",
    material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
    material_Position: "คลังสื่อ ชั้น 2 ห้อง 204",
    employee_FirstName:"คุณมะม่วง"  
        
  },
  {
    mtrReq_Id: "3",
    mtrReq_Code: "REQ-1003",
    mtrReq_Amount: "5",
    mtrReq_Price: "25000",
    mtrReq_DateStart: "09/2/2569",
    mtrReq_DateEnd: "10/2/2569",
    mtrReqStatus_Id:'S04',
    material_Id: "1",
    material_Code: "M-001",
    material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
    material_Position: "คลังสื่อ ชั้น 2 ห้อง 204", 
    employee_FirstName:"คุณมะม่วง"     
  },
  {
    mtrReq_Id: "4",
    mtrReq_Code: "REQ-1004",
    mtrReq_Amount: "5",
    mtrReq_Price: "25000",
    mtrReq_DateStart: "09/2/2569",
    mtrReq_DateEnd: "10/2/2569",
    material_Id: "1",
    material_Code: "M-001",
    material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
    mtrReqStatus_Id:'S03',
    material_Position: "คลังสื่อ ชั้น 2 ห้อง 204", 
    employee_FirstName:"คุณมะม่วง"     
  },
  {
    mtrReq_Id: "5",
    mtrReq_Code: "REQ-1005",
    mtrReq_Amount: "5",
    mtrReq_Price: "25000",
    mtrReq_DateStart: "09/2/2569",
    mtrReq_DateEnd: "10/2/2569",
    mtrReqStatus_Id:'S02',
    material_Id: "1",
    material_Code: "M-001",
    material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
    material_Position: "คลังสื่อ ชั้น 2 ห้อง 204",  
    employee_FirstName:"คุณมะม่วง"    
  },
  {
    mtrReq_Id: "6",
    mtrReq_Code: "REQ-1006",
    mtrReq_Amount: "5",
    mtrReq_Price: "25000",
    mtrReq_DateStart: "09/2/2569",
    mtrReq_DateEnd: "10/2/2569",
    mtrReqStatus_Id:'S01',
    material_Id: "1",
    material_Code: "M-001",
    material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
    material_Position: "คลังสื่อ ชั้น 2 ห้อง 204",  
    employee_FirstName:"คุณมะม่วง"    
  },
];

export function MaterialNotifyTeble() {
  const navigate = useNavigate();
  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <div className="flex flex-row justify-between">
          <Typography variant="h6" color="blue-gray">
            จัดการคลังสื่อฯ (Inventory)
          </Typography>
          <Button
            variant="gradient"
            color="blue"
            className="flex items-center justify-center gap-2"
            onClick={()=> navigate("insert")}
          >
            <PlusCircleIcon className="w-5 h-5" />
            <p>เบิกสื่อ</p>
          </Button>
        </div>
        <SectionNotifyTable data={authorsTableData} />
      </div>
    </>
  );
}

export default MaterialNotifyTeble;
