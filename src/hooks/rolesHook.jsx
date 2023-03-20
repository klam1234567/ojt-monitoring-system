import { useState, useEffect, useContext } from "react"
import { admin, coordinator, student } from "data"
import { UserContext } from "context/UserProvider"
import { StudentContext } from "context/StudentProvider"
// import { EnrollmentContext } from "context/EnrollmentProvider"
// import { AuthContext } from "context/auth"

export default function RolesHook() {
  const { userInformation } = useContext(UserContext)
  const { fetchStudent } = useContext(StudentContext)
  // const context = useContext(AuthContext)

  const [links, setLinks] = useState([])
  const [info, setInfo] = useState({
    name: "",
    email: "",
    status: "",
  })

  const userCount = userInformation.length

  const fetchUserInformation = () => {
    // const split = location.pathname.split("/")

    const email = localStorage.getItem("email")

    const userInfo = userInformation?.filter((obj) => obj.email === email)

    const studentInfo = fetchStudent?.filter((obj) => obj?.email === email)

    studentInfo.length > 0 &&
      localStorage.setItem("user_details", JSON.stringify({ studentInfo }))

    userInfo.forEach((user) => {
      user.status === "admin" && setLinks(admin)
      user.status === "coordinator" && setLinks(coordinator)
      user.status === "student" && setLinks(student)

      setInfo({
        name: user.name,
        email: user.email,
        status: user.status,
      })
    })
  }

  useEffect(() => {
    fetchUserInformation()
  }, [userCount]) // eslint-disable-line react-hooks/exhaustive-deps

  return { info, links }
}
