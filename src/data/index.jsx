import React from "react"
import { Home, User, Users, Book, FileText } from "react-feather"

const iconSize = 18

const admin = [
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
    path: "/admin/coordinator",
  },
  {
    id: 3,
    title: "Students",
    icon: <Users size={iconSize} />,
    path: "/admin/students",
  },
  {
    id: 4,
    title: "Enrollment Module",
    icon: <Book size={iconSize} />,
    path: "/admin/enrollmentModule",
  },
  {
    id: 5,
    title: "Organization",
    icon: <FileText size={iconSize} />,
    path: "/admin/organization",
  },
]

const coordinator = [
  {
    id: 1,
    title: "Dashboard",
    icon: <Home size={iconSize} />,
    path: "/admin",
  },
  {
    id: 2,
    title: "Master List",
    icon: <Users size={iconSize} />,
    path: "/admin/masterList",
  },
  {
    id: 3,
    title: "Tasks",
    icon: <FileText size={iconSize} />,
    path: "/admin/tasks",
  },
  {
    id: 4,
    title: "Task Submitted",
    icon: <Book size={iconSize} />,
    path: "/admin/taskSubmitted",
  },
]

const student = [
  {
    id: 1,
    title: "Dashboard",
    icon: <Home size={iconSize} />,
    path: "/admin",
  },
  {
    id: 2,
    title: "My Tasks",
    icon: <User size={iconSize} />,
    path: "/admin/studentTasks",
  },
  {
    id: 3,
    title: "Task Record",
    icon: <Users size={iconSize} />,
    path: "/admin/taskRecord",
  },
]

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
]

export { admin, coordinator, student, coordinatorDummyData }
