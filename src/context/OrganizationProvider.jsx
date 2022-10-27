import React, { createContext, useEffect, useState } from "react"
import { app } from "../config/firebase"

const OrganizationContext = createContext()

const OrganizationProvider = ({ children }) => {
  const [organizationId, setOrganizationId] = useState("")
  const [fetchSpecificOrg, setFetchSpecificOrg] = useState([])
  const [fetchOrganization, setOrganization] = useState([])

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
    if (organizationId) {
      const document = app
        .firestore()
        .collection("organizationData")
        .doc(organizationId)
      return document.onSnapshot((snapshot) => {
        const items_array = []
        if (snapshot) {
          items_array.push({ ...snapshot.data(), id: snapshot.id })
          setFetchSpecificOrg(items_array)
        }
      })
    }
  }

  useEffect(fetchSpecificOrganization, [organizationId])

  return (
    <OrganizationContext.Provider
      value={{
        fetchSpecificOrg,
        setFetchSpecificOrg,
        fetchOrganization,
        setOrganizationId,
        organizationId,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  )
}

export { OrganizationProvider, OrganizationContext }
