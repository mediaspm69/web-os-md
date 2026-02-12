import {
  HomeIcon,
  TableCellsIcon,
  ServerStackIcon,
  RectangleStackIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Home } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { EmployeeInsert, EmployeeTable, EmployeeUpdate } from "./pages/employee";
import { JobInsert, JobTable, JobUpdate } from "./pages/job";
import { MaterialTeble,MaterialForm, MaterialNotifyTeble, MaterialNotifyInUp } from "./pages/material";
import { DocumentChartBarIcon } from "@heroicons/react/24/outline";


const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    role: "R99",
    main:'home',
    token:true,
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
        show:false,
      },
      {
        icon: <UserIcon {...icon} />,
        name: "ตารางพนักงาน",
        path: "/employee",
        element: <EmployeeTable />,
        show:false,
        pages2: [
          {
            icon2: <UserIcon {...icon} />,
            name2: "employee insert",
            path2: "/employee/insert",
            element2: <EmployeeInsert />,
            show2: false,
          },
          {
            icon2: <UserIcon {...icon} />,
            name2: "employee insert",
            path2: "/employee/update",
            element2: <EmployeeUpdate />,
            show2: false,
          },
        ],
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "ตารางแจ้งงานสื่อ",
        path: "/job",
        element: <JobTable />,
        show:false,
        pages2: [
          {
            icon2: <TableCellsIcon {...icon} />,
            name2: "job insert",
            path2: "/job/insert",
            element2: <JobInsert />,
            show2: false,
          },
          {
            icon2: <TableCellsIcon {...icon} />,
            name2: "job insert",
            path2: "/job/update",
            element2: <JobUpdate />,
            show2: false,
          },
        ],
      },
      // {
      //   icon: <DocumentChartBarIcon {...icon} />,
      //   name: "เบิกสื่อ",
      //   path: "/material/table-material",
      //   element: <MaterialTeble />,
      //   show: true,
      //   layout2:'material',
      //   pages2:[
      //     {
      //       icon2: <TableCellsIcon {...icon} />,
      //       name2: "แจ้งเบิกสื่อ",
      //       path2: "material/notify-material",
      //       element2: <MaterialNotifyTeble />,
      //       show2: true,
      //     },
      //     {
      //       icon2: <TableCellsIcon {...icon} />,
      //       name2: "จัดการคลังสื่อ",
      //       path2: "/form-material",
      //       element2: <MaterialForm />,
      //       show2: true,
      //     },
      //   ]
      // },      
      // {
      //   icon: <DocumentChartBarIcon {...icon} />,
      //   name: "จัดการคลังสื่อ",
      //   path: "/form-material",
      //   element: <MaterialForm />,
      //   show:false,
      // }
      //,      
      // {
      //   icon: <DocumentChartBarIcon {...icon} />,
      //   name: "แจ้งเบิกสื่อ",
      //   path: "/notify-material",
      //   element: <MaterialNotifyTeble />,
      //   show:false,
      //   pages2: [
      //     {
      //       icon2: <TableCellsIcon {...icon} />,
      //       name2: "เบิกสื่อ",
      //       path2: "/notify-material/insert",
      //       element2: <MaterialNotifyInUp />,
      //       show2: false,
      //     }
      //   ],
      // }
    ]
  },
    {
    layout: "dashboard",
    role: "R01",
    main:'home',
    token:true,
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
        show:false,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "แจ้งงานสื่อ",
        path: "/job",
        element: <JobTable />,
        show:false,
        pages2: [
          {
            icon2: <UserIcon {...icon} />,
            name2: "job insert",
            path2: "/job/insert",
            element2: <JobInsert />,
            show2: false,
          },
          {
            icon2: <UserIcon {...icon} />,
            name2: "job insert",
            path2: "/job/update",
            element2: <JobUpdate />,
            show2: false,
          },
        ],
      },
    ],
  },
   {
    layout: "dashboard",
    main:'job',
    role: "R02",
    token:true,
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
        show:false,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "แจ้งงานสื่อ",
        path: "/job",
        element: <JobTable />,
        show:false,
        pages2: [
          {
            icon2: <UserIcon {...icon} />,
            name2: "job insert",
            path2: "/job/insert",
            element2: <JobInsert />,
            show2: false,
          },
          {
            icon2: <UserIcon {...icon} />,
            name2: "job insert",
            path2: "/job/update",
            element2: <JobUpdate />,
            show2: false,
          },
        ],
      },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "แจ้งเบิกสื่อ",
      //   path: "/material",
      //   element: <MaterialTeble />,
      // }
    ],
  },
  {
    title: "auth pages",
    token:false,
    main:'sign-in',
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
        show:false,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
        show:false,
      },
    ],
  },
];

export default routes;
