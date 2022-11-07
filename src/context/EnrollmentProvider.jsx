import React, { createContext, useEffect, useState } from "react"
import { app } from "../config/firebase"

const EnrollmentContext = createContext()

const EnrollmentProvider = ({ children }) => {
  const [enrollmentId, setEnrollmentId] = useState("")
  const [fetchSpecificEnroll, setFetchSpecificEnroll] = useState([])
  const [fetchEnrollment, setEnrollment] = useState([])

  const fetchdata = () => {
    const document = app.firestore().collection("enrollmentModuleData")
    return document.onSnapshot((snapshot) => {
      const enrollmentArray = []

      snapshot.forEach((farmLocation) => {
        enrollmentArray.push({ ...farmLocation.data(), id: farmLocation.id })
      })

      setEnrollment(enrollmentArray)
    })
  }

  useEffect(fetchdata, [])

  const fetchSpecificEnrollment = () => {
    if (enrollmentId) {
      const document = app
        .firestore()
        .collection("enrollmentModuleData")
        .doc(enrollmentId)
      return document.onSnapshot((snapshot) => {
        const items_array = []
        if (snapshot) {
          items_array.push({ ...snapshot.data(), id: snapshot.id })
          setFetchSpecificEnroll(items_array)
        }
      })
    }
  }

  useEffect(fetchSpecificEnrollment, [enrollmentId])

  return (
    <EnrollmentContext.Provider
      value={{
        fetchSpecificEnroll,
        fetchEnrollment,
        setEnrollmentId,
        setFetchSpecificEnroll,
        enrollmentId,
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  )
}

export { EnrollmentProvider, EnrollmentContext }
