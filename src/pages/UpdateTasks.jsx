import React, { useState, useEffect, useContext } from "react"
import { useLocation } from "react-router-dom"
import { TaskContext } from "context/TasksProvider"
import { Layout, Back, Textbox } from "components"
import { updateDocument } from "config/firebase"

//Utils
import { objectAssign } from "Utils/ReusableSyntax"

const initialState = {
  taskCode: "",
  taskName: "",
  deadline: "",
  description: "",
}

export default function UpdateTasks() {
  const [{ taskCode, taskName, deadline, description }, setState] =
    useState(initialState)

  const params = useLocation()
  const paramsId = params.search.split("=")

  const { setTaskId, fetchOneTask } = useContext(TaskContext)

  fetchOneTask && objectAssign(fetchOneTask, initialState)

  useEffect(() => {
    paramsId[1] && setTaskId(paramsId[1])
  }, [paramsId]) // eslint-disable-line react-hooks/exhaustive-deps

  const onChange = (event) => {
    const { name, value } = event.target

    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()

    try {
      const config = {
        taskCode,
        taskName,
        deadline,
        description,
      }

      updateDocument("tasksDetails", config, paramsId[1])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout
      title="Update Tasks Information"
      description="this section you can update Tasks information"
    >
      <Back redirect="/admin/tasks" />
      <h1 className="font-bold text-2xl mb-4">Update tasks</h1>
      <form onSubmit={(event) => onSubmit(event)}>
        <div className="flex gap-4 my-4">
          <Textbox
            type="text"
            className="w-full"
            name="taskCode"
            value={taskCode}
            onChange={(event) => onChange(event)}
            disabled={true}
            label="Task Code"
          />
          <Textbox
            type="text"
            className="w-full"
            name="taskName"
            value={taskName}
            onChange={(event) => onChange(event)}
            label="Task Name"
          />
          <Textbox
            type="date"
            className="w-full"
            name="deadline"
            value={deadline}
            onChange={(event) => onChange(event)}
          />
        </div>
        <div className="w-full">
          <Textbox
            type="text"
            className="w-full"
            name="description"
            value={description}
            onChange={(event) => onChange(event)}
            rows={4}
            column={4}
            multiline
            label="Description"
          />
        </div>
        <div className="text-white flex gap-2 justify-end mt-4">
          <button
            type="submit"
            className="bg-slate-900 rounded-lg py-2 px-4 hover:bg-slate-600 transition-all"
          >
            Update task
          </button>
        </div>
      </form>
    </Layout>
  )
}
