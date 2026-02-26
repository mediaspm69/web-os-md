import {
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
//sections
import { SectionFormTable } from "./sections/SectionFormTable";
const authorsTableData = [
  {
    material_Id: "1",
    material_Code: "M-001",
    material_Image: "https://images.unsplash.com/photo-1606986628470-26a67fa4730c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
    material_Detail: "เป็นกล้องมิเรอร์เลส Full-Frame ไฮบริดรุ่นยอดนิยม ความละเอียด 33MP ชิปประมวลผล BIONZ XR โฟกัสรวดเร็วแม่นยำ (Real-time Eye AF) ถ่ายวิดีโอสูงสุด 4K 60p 10-bit 4:2:2 พร้อมจอพับ Vari-angle และระบบกันสั่น 5 แกน (5.5EV) เหมาะสำหรับทั้งภาพนิ่งและวิดีโอระดับมืออาชีพ ",
    material_Price: "25000",
    material_Stock: "5",
    material_Position: "คลังสื่อ ชั้น 2 ห้อง 204",
    material_CreationDate: "23/04/18",
    mtrType_Id: "กล้อง",
  },
  {
    material_Id: "2",
    material_Code: "M-002",
    material_Image: "https://images.unsplash.com/photo-1606986628470-26a67fa4730c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
    material_Detail: "เป็นกล้องมิเรอร์เลส Full-Frame ไฮบริดรุ่นยอดนิยม ความละเอียด 33MP ชิปประมวลผล BIONZ XR โฟกัสรวดเร็วแม่นยำ (Real-time Eye AF) ถ่ายวิดีโอสูงสุด 4K 60p 10-bit 4:2:2 พร้อมจอพับ Vari-angle และระบบกันสั่น 5 แกน (5.5EV) เหมาะสำหรับทั้งภาพนิ่งและวิดีโอระดับมืออาชีพ ",
    material_Price: "25000",
    material_Stock: "5",
    material_Position: "คลังสื่อ ชั้น 2 ห้อง 204",
    material_CreationDate: "23/04/18",
    mtrType_Id: "กล้อง",
  },
  {
    material_Id: "3",
    material_Code: "M-003",
    material_Image: "https://images.unsplash.com/photo-1606986628470-26a67fa4730c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
    material_Detail: "เป็นกล้องมิเรอร์เลส Full-Frame ไฮบริดรุ่นยอดนิยม ความละเอียด 33MP ชิปประมวลผล BIONZ XR โฟกัสรวดเร็วแม่นยำ (Real-time Eye AF) ถ่ายวิดีโอสูงสุด 4K 60p 10-bit 4:2:2 พร้อมจอพับ Vari-angle และระบบกันสั่น 5 แกน (5.5EV) เหมาะสำหรับทั้งภาพนิ่งและวิดีโอระดับมืออาชีพ ",
    material_Price: "25000",
    material_Stock: "5",
    material_Position: "คลังสื่อ ชั้น 2 ห้อง 204",
    material_CreationDate: "23/04/18",
    mtrType_Id: "กล้อง",
  },
  {
    material_Id: "4",
    material_Code: "M-004",
    material_Image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
    material_Detail: "เป็นกล้องมิเรอร์เลส Full-Frame ไฮบริดรุ่นยอดนิยม ความละเอียด 33MP ชิปประมวลผล BIONZ XR โฟกัสรวดเร็วแม่นยำ (Real-time Eye AF) ถ่ายวิดีโอสูงสุด 4K 60p 10-bit 4:2:2 พร้อมจอพับ Vari-angle และระบบกันสั่น 5 แกน (5.5EV) เหมาะสำหรับทั้งภาพนิ่งและวิดีโอระดับมืออาชีพ ",
    material_Price: "25000",
    material_Stock: "0",
    material_Position: "คลังสื่อ ชั้น 2 ห้อง 204",
    material_CreationDate: "23/04/18",
    mtrType_Id: "กล้อง",
  },
  {
    material_Id: "5",
    material_Code: "M-005",
    material_Image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
    material_Detail: "เป็นกล้องมิเรอร์เลส Full-Frame ไฮบริดรุ่นยอดนิยม ความละเอียด 33MP ชิปประมวลผล BIONZ XR โฟกัสรวดเร็วแม่นยำ (Real-time Eye AF) ถ่ายวิดีโอสูงสุด 4K 60p 10-bit 4:2:2 พร้อมจอพับ Vari-angle และระบบกันสั่น 5 แกน (5.5EV) เหมาะสำหรับทั้งภาพนิ่งและวิดีโอระดับมืออาชีพ ",
    material_Price: "25000",
    material_Stock: "0",
    material_Position: "คลังสื่อ ชั้น 2 ห้อง 204",
    material_CreationDate: "23/04/18",
    mtrType_Id: "กล้อง",
  },
  {
    material_Id: "6",
    material_Code: "M-006",
    material_Image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    material_Name: "Sony Alpha a7 IV (ILCE-7M4)",
    material_Detail: "เป็นกล้องมิเรอร์เลส Full-Frame ไฮบริดรุ่นยอดนิยม ความละเอียด 33MP ชิปประมวลผล BIONZ XR โฟกัสรวดเร็วแม่นยำ (Real-time Eye AF) ถ่ายวิดีโอสูงสุด 4K 60p 10-bit 4:2:2 พร้อมจอพับ Vari-angle และระบบกันสั่น 5 แกน (5.5EV) เหมาะสำหรับทั้งภาพนิ่งและวิดีโอระดับมืออาชีพ ",
    material_Price: "25000",
    material_Stock: "0",
    material_Position: "คลังสื่อ ชั้น 2 ห้อง 204",
    material_CreationDate: "23/04/18",
    mtrType_Id: "กล้อง",

  },
];

export function MaterialTeble() {
  const navigate = useNavigate();
  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <div className="flex flex-row justify-between">
          <Typography variant="h6" color="blue-gray">
            ตารางรายการสื่อฯ (Inventory)
          </Typography>
        </div>
        <SectionFormTable data={authorsTableData} />
      </div>
    </>
  );
}

export default MaterialTeble;
