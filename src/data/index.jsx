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

// dummy data
const coordinatorDummyData = [
  {
    id: 1,
    coordinatorName: "Snow",
    contact: 1,
    email: "iandrilon2@gmail.com",
    address: "address",
  },
  {
    id: 2,
    coordinatorName: "Lannister",
    contact: 3,
    email: "iandrilon2@gmail.com",
    address: "address",
  },
  {
    id: 4,
    coordinatorName: "Stark",
    contact: 4,
    email: "iandrilon2@gmail.com",
    address: "address",
  },
  {
    id: 5,
    coordinatorName: "Targaryen",
    contact: 5,
    email: "iandrilon2@gmail.com",
    address: "address",
  },
  {
    id: 6,
    coordinatorName: "Melisandre",
    contact: 6,
    email: "iandrilon2@gmail.com",
    address: "address",
  },
  {
    id: 7,
    coordinatorName: "Clifford",
    contact: 7,
    email: "iandrilon2@gmail.com",
    address: "address",
  },
  {
    id: 8,
    coordinatorName: "Frances",
    contact: 8,
    email: "iandrilon2@gmail.com",
    address: "address",
  },
  {
    id: 9,
    coordinatorName: "Roxie",
    contact: 9,
    email: "iandrilon2@gmail.com",
    address: "address",
  },
];

export { sidebarList, coordinatorDummyData };
