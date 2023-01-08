import React, { Fragment, useState, useContext } from "react"
import { TabPanel } from "@mui/lab"
import { MenuItem } from "@mui/material"
import { Layout, Tabs, Textbox, Table, SelectMenu } from "components"
import { generateTaskCode, Months } from "Utils/ReusableSyntax"
import { saveDoc, deleteDocument } from "config/firebase"
import { useNavigate } from "react-router-dom"
import { filterByUUID } from "Utils/ReusableSyntax"
import swal from "sweetalert2"

//context api
import { AuthContext } from "context/auth"
import { TaskContext } from "context/TasksProvider"
import { RegisteredStudentContext } from "context/RegisteredStudentProvider"

const initialState = {
  taskCode: generateTaskCode(),
  taskName: "",
  section: "",
  deadline: "",
  description: "",
}

export default function Tasks() {
  const [{ taskCode, taskName, section, deadline, description }, setState] =
    useState(initialState)

  const navigate = useNavigate()
  const context = useContext(AuthContext)
  const { fetchRegisteredStudent } = useContext(RegisteredStudentContext)
  const { fetchTasks } = useContext(TaskContext)

  const filteredTasks = filterByUUID(fetchTasks, context.uid)
  const filteredRegisteredStudent = filterByUUID(
    fetchRegisteredStudent,
    context.uid
  )
  const clearState = () => setState({ ...initialState })

  const onChange = (event) => {
    const { name, value } = event.target

    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const config = {
        coordinatorEmail: context.email,
        coordinatorUUID: context.uid,
        taskCode,
        taskName,
        section,
        deadline,
        description,
        deadlineStatus: "active",
      }

      const response = await swal.fire({
        title: "Opps!",
        text: "would you like to save this file?",
        icon: "question",
        showCancelButton: true,
      })

      if (response.isConfirmed) {
        config &&
          saveDoc(config, "tasksDetails").then(async () => {
            const result = await swal.fire({
              title: "Successfully Created",
              text: "please click the okay button to continue",
              icon: "success",
            })

            result.isConfirmed && window.location.reload()
          })

        clearState()

        return false
      }
    } catch (error) {
      console.log(error)
    }
  }

  //column example
  const columns = [
    {
      field: "id",
      headerName: "User Identification",
      width: 200,
      renderCell: (data) => {
        return <span className="text-blue-500">{data.id}</span>
      },
    },
    {
      field: "taskCode",
      headerName: "Task Code",
      width: 200,
    },
    {
      field: "taskName",
      headerName: "Task Name",
      type: "string",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
    },
    {
      field: "deadline",
      headerName: "Deadline",
      width: 200,
      renderCell: (data) => {
        var MyDate = new Date(data.row?.deadline)

        MyDate.setMonth(MyDate.getMonth())

        const MyDateString = `${
          Months[MyDate.getMonth()]
        } ${MyDate.getDate()}, ${MyDate.getFullYear()}`

        return (
          <span className="bg-slate-500 text-slate-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-slate-200 dark:text-slate-800 mt-2">
            {MyDateString}
          </span>
        )
      },
      // description: "This column has a value getter and is not sortable.",
      // sortable: false,
      // width: 160,
      // valueGetter: (params) =>
      //   `${params.row.contact || ""} ${params.row coordinatorName || ""}`,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        // delete data in coordinator row
        const Delete = (e) => {
          e.stopPropagation() // don't select this row after clicking

          swal
            .fire({
              title: "ARE YOU SURE?",
              text: "are you sure to delete this data?",
              icon: "warning",
              showCancelButton: true,
            })
            .then(async (result) => {
              if (result.isConfirmed) {
                await deleteDocument("tasksDetails", params.row.id).then(() => {
                  swal.fire({
                    title: "Successfully Deleted",
                    text: "Please click yes to continue",
                    icon: "success",
                  })
                })
              } else {
                swal.fire("Yay!", "your data is safe", "success")
              }
            })
        }

        // update data in coordinator row
        const Update = (e) => {
          e.stopPropagation() // don't select this row after clickin

          if (params.row.id) {
            navigate(`/admin/updateTasks?id=${params.row.id}`)
          }

          // updateToggleModal();
        }

        return (
          <div className="space-x-4">
            <button
              onClick={Update}
              className="cursor-pointer bg-slate-600 hover:bg-slate-800 transition-all text-white py-2 px-4 rounded-lg border-2"
            >
              Edit
            </button>
            <button
              onClick={Delete}
              className="cursor-pointer cursor-pointer bg-slate-900 hover:bg-slate-600 transition-all text-white py-2 px-4 rounded-lg border-2"
            >
              Delete
            </button>
          </div>
        )
      },
    },
  ]

  const add_new_trainee = (
    <Fragment>
      <h1 className="font-bold text-2xl mb-4">Add new task</h1>
      <form onSubmit={(event) => onSubmit(event)}>
        <div className="flex gap-4 my-4">
          <Textbox
            type="text"
            className="w-full"
            name="taskCode"
            disabled={true}
            value={taskCode}
            onChange={(event) => onChange(event)}
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
        </div>
        <div className="flex gap-4 my-4">
          <SelectMenu
            name="section"
            title="Section"
            onChange={(event) => onChange(event)}
          >
            {filteredRegisteredStudent.map((type, index) => (
              <MenuItem key={index} value={type.section}>
                {type.section}
              </MenuItem>
            ))}
          </SelectMenu>
          <Textbox
            type="date"
            className="w-full"
            value={deadline}
            onChange={(event) => onChange(event)}
            name="deadline"
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
            type="button"
            onClick={clearState}
            className="bg-slate-500 rounded-lg py-2 px-4 hover:bg-slate-800 transition-all"
          >
            cancel
          </button>
          <button
            type="submit"
            className="bg-slate-900 rounded-lg py-2 px-4 hover:bg-slate-600 transition-all"
          >
            Save task
          </button>
        </div>
      </form>
    </Fragment>
  )

  const tabName = ["Task List", "Add New Task"]

  return (
    <Layout title="Tasks" description="a list of tasks assigned by coordinator">
      <Tabs tabName={tabName}>
        <TabPanel value="1">
          <Table data={filteredTasks} columns={columns} loading={false} />
        </TabPanel>
        <TabPanel value="2">{add_new_trainee}</TabPanel>
      </Tabs>
    </Layout>
  )
}
