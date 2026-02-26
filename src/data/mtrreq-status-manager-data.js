import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
const icon = {
  className: "w-5 h-5 text-inherit",
};
export const mrs_ManData = [
  {
    id: "1",
    status_id: "S01",
    reqsta_id: "S02",
    name: "รับเบิก",
    color: "blue",
    icon: CheckIcon,
  },
  {
    id: "2",
    status_id: "S02",
    reqsta_id: "S03",
    name: "จัดเตรียมสำเร็จ",
    color: "blue",
    icon: CheckIcon,
  },
  {
    id: "3",
    status_id: "S03",
    reqsta_id: "S04",
    name: "เข้ารับสำเร็จ",
    color: "blue",
    icon: CheckIcon,
  },
  {
    id: "4",
    status_id: "S02",
    reqsta_id: "S07",
    name: "ไม่สำเร็จ",
    color: "red",
    icon: XMarkIcon,
  },
  {
    id: "5",
    status_id: "S01",
    reqsta_id: "S06",
    name: "ไม่รับเบิก",
    color: "red",
    icon: XMarkIcon,
  },
];

export default mrs_ManData;
