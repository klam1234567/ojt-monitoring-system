import React, { createContext, useEffect, useState } from "react"
import { app } from "../config/firebase"

const StudentContext = createContext()

const StudentProvider = ({ children }) => {
  const [studentId, setStudentId] = useState("")
  const [fetchSpecificStudent, setFetchSpecificStudent] = useState([])
  const [fetchStudent, setStudent] = useState([])

  const fetchdata = () => {
    const document = app.firestore().collection("studentsData")
    return document.onSnapshot((snapshot) => {
      const coordinatorArray = []

      snapshot.forEach((farmLocation) => {
        coordinatorArray.push({ ...farmLocation.data(), id: farmLocation.id })
      })

      setStudent(coordinatorArray)
    })
  }

  useEffect(fetchdata, [])

  const fetchSpecificCoordinator = () => {
    if (studentId) {
      const document = app.firestore().collection("studentsData").doc(studentId)
      return document.onSnapshot((snapshot) => {
        const items_array = []
        if (snapshot) {
          items_array.push({ ...snapshot.data(), id: snapshot.id })
          setFetchSpecificStudent(items_array)
        }
      })
    }
  }

  useEffect(fetchSpecificCoordinator, [studentId])

  return (
    <StudentContext.Provider
      value={{
        fetchSpecificStudent,
        setFetchSpecificStudent,
        fetchStudent,
        setStudentId,
        studentId,
      }}
    >
      {children}
    </StudentContext.Provider>
  )
}

export { StudentProvider, StudentContext }
