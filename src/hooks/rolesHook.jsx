import { useState, useEffect, useContext } from "react"
import { admin, coordinator, student } from "data"
import { UserContext } from "context/UserProvider"
import { AuthContext } from "context/auth"

export default function RolesHook() {
  const { userInformation } = useContext(UserContext)
  const context = useContext(AuthContext)

  const [links, setLinks] = useState([])
  const [info, setInfo] = useState({
    name: "",
    email: "",
    status: "",
  })

  const fetchUserInformation = () => {
    userInformation.forEach((user) => {
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
