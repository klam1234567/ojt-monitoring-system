import React, { createContext, useEffect, useState } from "react"
import { app } from "../config/firebase"

const OrganizationContext = createContext()

const OrganizationProvider = ({ children }) => {
  const [fetchSpecificOrg, setFetchSpecificOrg] = useState([])
  const [fetchOrganization, setOrganization] = useState([])

  const updateId = localStorage.getItem("updateId")

  const fetchdata = () => {
    const document = app.firestore().collection("organizationData")
    return document.onSnapshot((snapshot) => {
      const organizationArray = []

      snapshot.forEach((farmLocation) => {
        organizationArray.push({ ...farmLocation.data(), id: farmLocation.id })
      })

      setOrganization(organizationArray)
    })
  }

  useEffect(fetchdata, [])

  const fetchSpecificOrganization = () => {
    if (updateId) {
      const document = app
        .firestore()
        .collection("organizationData")
        .doc(updateId)
      return document.onSnapshot((snapshot) => {
        const items_array = []
        if (snapshot) {
          items_array.push({ ...snapshot.data(), id: snapshot.id })
          setFetchSpecificOrg(items_array)
        }
      })
    }
  }

  useEffect(fetchSpecificOrganization, [updateId])

  return (
    <OrganizationContext.Provider
      value={{
        fetchSpecificOrg,
        setFetchSpecificOrg,
        fetchOrganization,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  )
}

export { OrganizationProvider, OrganizationContext }
