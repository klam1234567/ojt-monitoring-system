import React, { createContext, useEffect } from "react"
import { app } from "../config/firebase"
import { useState } from "react"

const TaskContext = createContext()

const TaskProvider = ({ children }) => {
  const [taskId, setTaskId] = useState("")
  const [fetchOneTask, setFetchOneTask] = useState([])
  const [fetchTasks, setFetchTasks] = useState([])

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
      value={{ taskId, setTaskId, fetchOneTask, fetchTasks }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export { TaskProvider, TaskContext }
