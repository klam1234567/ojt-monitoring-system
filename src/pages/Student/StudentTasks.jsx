import React, { useContext, useState, useRef } from "react"
import { Layout, Table, PageModal } from "components"
import {
  Months,
  filterByStudentUUID,
  filterByStudentUUIDs,
  filteredByCompany,
  MyDateString,
  isCheckSubmittedTasks,
} from "Utils/ReusableSyntax"
import { Edit2, UploadCloud } from "react-feather"
import swal from "sweetalert2"
import { app } from "config/firebase"
import CircularProgress from "@mui/material/CircularProgress"

//context api
import { TaskContext } from "context/TasksProvider"
import { EnrollmentContext } from "context/EnrollmentProvider"
import { AuthContext } from "context/auth"

export default function StudentTasks() {
  // const submittedDocument = JSON.parse(localStorage.getItem("documents"))
  const { fetchTasks, fetchSubCollection } = useContext(TaskContext)
  const { fetchEnrollment } = useContext(EnrollmentContext)
  const context = useContext(AuthContext)

  const inputRef = useRef(null)

  //state
  const [isToggle, setToggle] = useState({
    toggle: false,
    id: "",
    taskName: "",
    submitted: false,
  })
  const [file, setFile] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const filteredDocuments = filterByStudentUUIDs(
    fetchSubCollection,
    context.uid
  )

  const filteredByUID = filterByStudentUUID(fetchEnrollment, context.uid)

  const studentTasks = filteredByCompany(fetchTasks, filteredByUID[0]?.orgsName)

  // const filteredStudentTasks = newSetOfStudentTasks(
  //   studentTasks,
  //   filteredDocuments
  // )

  const toggleModal = (id, taskName) => {
    if (id) {
      const isCheckTaskName = isCheckSubmittedTasks(filteredDocuments, taskName)
      setToggle({ toggle: true, id, taskName, submitted: isCheckTaskName })
    }
  }

  const closeModal = () => {
    setToggle({ toggle: false, id: "", taskName: "", submitted: false })
  }

  const onChange = (event) => {
    const { files } = event.target

    if (files.length > 0) {
      setFile(files[0])
    }
  }

  const removeFile = () => {
    if (inputRef.current) {
      inputRef.current.value = null
      setFile(null)
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      if (file === null) {
        swal.fire({
          title: "Warning!!",
          text: "there is no containing file, please try again",
          icon: "warning",
        })

        return
      }

      const userDetails = JSON.parse(localStorage.getItem("user_details"))

      setLoading(true)

      const storageRef = app.storage().ref()
      const fileRef = storageRef.child(`submitted_documents/${file.name}`)
      await fileRef.put(file)
      await fileRef
        .getDownloadURL()
        .then(async (fileUrl) => {
          if (fileUrl) {
            const response = await app
              .firestore()
              .collection("tasksDetails")
              .doc(isToggle.id)
              .collection("submittedDocuments")
              .add({
                documentid: isToggle.id,
                ...userDetails?.studentInfo[0],
                documentDetails: {
                  taskName: isToggle.taskName,
                  fileUrl,
                  fileName: file.name,
                  status: "submitted",
                  remarks: "done",
                  score: 0,
                  dateSubmission: MyDateString,
                  comments: "",
                },
              })

            setToggle({ toggle: false, id: "", taskName: "", submitted: false })

            if (response) {
              swal
                .fire({
                  title: "Succesfully",
                  text: "Succesfully submitted task",
                  icon: "success",
                })
                .then((response) => {
                  setLoading(false)
                  if (response.isConfirmed) {
                    window.location.reload()
                  }
                })
            }
          }
        })
        .catch((error) => {
          console.log(error.message)
        })
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
        return <span className="text-blue-500">{data.row?.id}</span>
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
      field: "deadlineStatus",
      headerName: "Status",
      width: 200,
      renderCell: (data) => {
        const status = data.row.deadlineStatus
        return (
          <span
            className={`${
              status === "active"
                ? "bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded white:bg-green-200 white:text-green-900"
                : "bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded white:bg-red-200 white:text-red-900"
            }`}
          >
            {status}
          </span>
        )
      },
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
        } ${MyDate.getDate()} ${MyDate.getFullYear()}`

        return (
          <span className="bg-slate-800 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded white:bg-slate-200 mt-2">
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
        const deadlineDate = new Date(params.row?.deadline)
        const dateToday = new Date(MyDateString)
        const isCheckDeadline = dateToday >= deadlineDate
        const isCheckSubmit =
          isCheckDeadline ||
          isCheckSubmittedTasks(filteredDocuments, params.row.taskName)

        return (
          <div className="space-x-4">
            <button
              onClick={() => toggleModal(params.row?.id, params.row?.taskName)}
              disabled={isCheckSubmit}
              className={` ${
                isCheckSubmit ? "bg-slate-500" : "bg-slate-900"
              } cursor-pointer cursor-pointer hover:bg-slate-600 transition-all text-white py-2 px-4 rounded-lg border-2`}
            >
              {isCheckSubmit ? (
                "submitted"
              ) : (
                <span className="flex items-center gap-2 ">
                  <Edit2 size="15" /> comply
                </span>
              )}
            </button>
          </div>
        )
      },
    },
  ]

  const complyModal = (
    <PageModal open={isToggle.toggle} isClose={closeModal}>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : !isToggle.submitted ? (
        <form>
          <div className="flex items-center justify-center w-full mt-6">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 white:hover:bg-bray-800 white:bg-gray-700 hover:bg-gray-100 white:border-gray-600 white:hover:border-gray-500 white:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="text-gray-500 mb-3" size="40" />
                <p className="mb-2 text-sm text-gray-500 white:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 white:text-gray-400">
                  PDf or DOCX
                </p>
              </div>
              <input
                ref={inputRef}
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(event) => onChange(event)}
                required
              />
            </label>
          </div>
          {file !== null && (
            <div className="flex items-center justify-between mt-4 bg-slate-500 text-slate-800 text-sm font-semibold mr-2 px-3 py-2 rounded dark:bg-slate-200 dark:text-slate-800 mt-2">
              {file.name}
              {/* <Trash2
                onClick={removeFile}
                className="text-slate-900 hover:text-slate-500 transition-all cursor-pointer"
              /> */}
            </div>
          )}
          <div className="flex gap-2 justify-end mt-4">
            <button
              onClick={removeFile}
              type="button"
              className="bg-slate-500 rounded-lg py-2 px-4 hover:bg-slate-800 transition-all text-white"
            >
              cancel
            </button>
            <button
              onClick={(event) => onSubmit(event)}
              type="button"
              className="bg-slate-900 rounded-lg py-2 px-4 hover:bg-slate-600 transition-all text-white"
            >
              Upload file
            </button>
          </div>
        </form>
      ) : (
        <div>you are already submitted a document</div>
      )}
    </PageModal>
  )

  return (
    <Layout
      title="Student Tasks List"
      description="a list of tasks given to a student"
    >
      {complyModal}
      <Table data={studentTasks} columns={columns} loading={false} />
    </Layout>
  )
}
