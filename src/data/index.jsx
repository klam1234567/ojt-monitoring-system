import { Home, User, Users, Book, FileText } from "react-feather";

const iconSize = 18;

const sidebarList = [
  {
    id: 1,
    title: "Dashboard",
    icon: <Home size={iconSize} />,
    path: "/admin",
  },
  {
    id: 2,
    title: "Coordinator",
    icon: <User size={iconSize} />,
    path: "/coordinator",
  },
  {
    id: 3,
    title: "Students",
    icon: <Users size={iconSize} />,
    path: "/students",
  },
  {
    id: 4,
    title: "Enrollment Module",
    icon: <Book size={iconSize} />,
    path: "/enrollmentModule",
  },
  {
    id: 5,
    title: "Organization",
    icon: <FileText size={iconSize} />,
    path: "/organization",
  },
];

export { sidebarList };
