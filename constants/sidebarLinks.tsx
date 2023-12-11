import { BiTask } from "react-icons/bi";
import { CiCalendar } from "react-icons/ci";
import { TfiDashboard } from "react-icons/tfi";

export const sideBarLinks = [
  {
    index: 1,
    id: "task",
    name: "My tasks",
    route: "/tasks",
    icon: <BiTask />,
  },
  {
    index: 2,
    id: "meeting",
    name: "Meeting",
    route: "/meetings",
    icon: <CiCalendar />,
  },
  {
    index: 4,
    id: "task",
    name: "Reports",
    route: "/reports",
    icon: <TfiDashboard />,
  },
];
