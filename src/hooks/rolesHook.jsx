import { useState, useEffect, useContext } from "react"
import { admin, coordinator, student } from "data"
import { UserContext } from "context/UserProvider"
import { StudentContext } from "context/StudentProvider"
import { AuthContext } from "context/auth"

export default function RolesHook() {
  const { userInformation } = useContext(UserContext)
  const { fetchStudent } = useContext(StudentContext)
  const context = useContext(AuthContext)

  const [links, setLinks] = useState([])
  const [info, setInfo] = useState({
    name: "",
    email: "",
    status: "",
  })

  const fetchUserInformation = () => {
    // const split = location.pathname.split("/")

    const email = localStorage.getItem("email")

    const userInfo = userInformation.filter((obj) => obj.email === email)
    const studentInfo = fetchStudent.filter((obj) => obj.email === email)

    localStorage.setItem("user_details", JSON.stringify({ studentInfo }))

    userInfo.forEach((user) => {
      if (user.email === context.email) {
        user.status === "admin" && setLinks(admin)
        user.status === "coordinator" && setLinks(coordinator)
        user.status === "student" && setLinks(student)

        setInfo({
          name: user.name,
          email: user.email,
          status: user.status,
        })
      }
    })
  }

  useEffect(fetchUserInformation, [userInformation, context.email])

  return { info, links }
}
