import React, { createContext, useEffect, useState } from "react"
import { app } from "../config/firebase"

const CoordinatorContext = createContext()

const CoordinatorProvider = ({ children }) => {
  const [fetchSpecificCoord, setFetchSpecificCoord] = useState([])
  const [fetchCoordinator, setCoordinator] = useState([])

  const updateId = localStorage.getItem("updateId")

  const fetchdata = () => {
    const document = app.firestore().collection("coordinatorData")
    return document.onSnapshot((snapshot) => {
      const coordinatorArray = []

      snapshot.forEach((farmLocation) => {
        coordinatorArray.push({ ...farmLocation.data(), id: farmLocation.id })
      })

      setCoordinator(coordinatorArray)
    })
  }

  useEffect(fetchdata, [])

  const fetchSpecificCoordinator = () => {
    if (updateId) {
      const document = app
        .firestore()
        .collection("coordinatorData")
        .doc(updateId)
      return document.onSnapshot((snapshot) => {
        const items_array = []
        if (snapshot) {
          items_array.push({ ...snapshot.data(), id: snapshot.id })
          setFetchSpecificCoord(items_array)
        }
      })
    }
  }

  useEffect(fetchSpecificCoordinator, [updateId])

  return (
    <CoordinatorContext.Provider
      value={{
        fetchSpecificCoord,
        fetchCoordinator,
        setFetchSpecificCoord,
      }}
    >
      {children}
    </CoordinatorContext.Provider>
  )
}

export { CoordinatorProvider, CoordinatorContext }
