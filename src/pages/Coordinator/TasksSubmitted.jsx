import React, { useContext, useEffect } from "react"
import { Layout, Table } from "components"
import { useNavigate } from "react-router-dom"
import { filterByUUID } from "Utils/ReusableSyntax"

// context
import { TaskContext } from "context/TasksProvider"
import { AuthContext } from "context/auth"

export default function TasksSubmitted() {
  const context = useContext(AuthContext)
  const { fetchTasks, fetchSubCollection } = useContext(TaskContext)
  const filteredTasks = filterByUUID(fetchTasks, context.uid)

  const navigate = useNavigate()

  const returnNewProperty = () => {
    fetchTasks.forEach((elem) => {
      elem.studentSubmit = fetchSubCollection
    })
  }

  useEffect(returnNewProperty, [])

  console.log(fetchTasks)

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
      field: "section",
      headerName: "Section",
      width: 200,
    },
    {
      field: "studentSubmit",
      headerName: "Number of Submission",
      width: 200,
      renderCell: (data) => {
        return <span>{data.row.studentSubmit.length}</span>
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        // delete data in coordinator row
        // const Delete = (e) => {
        //   e.stopPropagation() // don't select this row after clicking

        //   swal
        //     .fire({
        //       title: "ARE YOU SURE?",
        //       text: "are you sure to delete this data?",
        //       icon: "warning",
        //       showCancelButton: true,
        //     })
        //     .then(async (result) => {
        //       if (result.isConfirmed) {
        //         await deleteDocument("tasksDetails", params.row.id).then(() => {
        //           swal.fire({
        //             title: "Successfully Deleted",
        //             text: "Please click yes to continue",
        //             icon: "success",
        //           })
        //         })
        //       } else {
        //         swal.fire("Yay!", "your data is safe", "success")
        //       }
        //     })
        // }

        // // update data in coordinator row
        // const Update = (e) => {
        //   e.stopPropagation() // don't select this row after clickin

        //   if (params.row.id) {
        //     navigate(`/admin/updateTasks?id=${params.row.id}`)
        //   }

        //   // updateToggleModal();
        // }

        const redirectTo = () => {
          navigate("/admin/view-submission")
        }

        return (
          <div className="space-x-4">
            <button
              onClick={redirectTo}
              className="cursor-pointer bg-slate-600 hover:bg-slate-800 transition-all text-white py-2 px-4 rounded-lg border-2"
            >
              view
            </button>
            <button className="cursor-pointer cursor-pointer bg-slate-900 hover:bg-slate-600 transition-all text-white py-2 px-4 rounded-lg border-2">
              Delete
            </button>
          </div>
        )
      },
    },
  ]

  return (
    <Layout
      title="Tasks Submitted"
      description="all the tasks submitted by the students"
    >
      <Table data={filteredTasks} columns={columns} loading={false} />
    </Layout>
  )
}
