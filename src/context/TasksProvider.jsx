import React, { createContext, useEffect } from "react"
import {
  app,
  getFirestore,
  getDocs,
  collection,
  query,
} from "../config/firebase"
import { useState } from "react"

const TaskContext = createContext()

const TaskProvider = ({ children }) => {
  const [taskId, setTaskId] = useState("")
  const [fetchOneTask, setFetchOneTask] = useState([])
  const [fetchSubCollection, setSubCollection] = useState([])
  const [fetchTasks, setFetchTasks] = useState([])

  const fetchDataSubCollection = async () => {
    const taskArray = []
    const db = getFirestore()
    const q = query(collection(db, "tasksDetails"))
    const snapshot = await getDocs(q)

    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))

    data.map(async (elem) => {
      const taskDetails = query(
        collection(db, `tasksDetails/${elem.id}/submittedDocuments`)
      )

      const submittedDocumentsDetails = await getDocs(taskDetails)

      submittedDocumentsDetails.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))

      submittedDocumentsDetails.docs.map((doc) =>
        taskArray.push({ ...doc.data(), id: doc.id })
      )

      setSubCollection(taskArray)
      // localStorage.setItem("documents", JSON.stringify(docs))
    })
  }

  useEffect(() => {
    fetchDataSubCollection()
  }, [])

  const fetchdata = () => {
    const document = app.firestore().collection("tasksDetails")
    return document.onSnapshot((snapshot) => {
      const tasksArray = []

      snapshot.forEach((result) => {
        tasksArray.push({ ...result.data(), id: result.id })
      })

      setFetchTasks(tasksArray)
    })
  }

  useEffect(fetchdata, [])

  const fetchSpecificTasks = () => {
    if (taskId) {
      const document = app.firestore().collection("tasksDetails").doc(taskId)
      return document.onSnapshot((snapshot) => {
        const items_array = []
        if (snapshot) {
          items_array.push({ ...snapshot.data(), id: snapshot.id })
          setFetchOneTask(items_array)
        }
      })
    }
  }

  useEffect(fetchSpecificTasks, [taskId])

  return (
    <TaskContext.Provider
      value={{
        taskId,
        setTaskId,
        fetchOneTask,
        fetchTasks,
        fetchSubCollection,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export { TaskProvider, TaskContext }
