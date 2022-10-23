import React, { Fragment, useState, useContext } from "react"
import swal from "sweetalert2"
import { Plus } from "react-feather"
import { Layout, Table, AddStudentsModal } from "components"
import { useNavigate } from "react-router-dom"

// context
import { StudentContext } from "context/StudentProvider"

//firebase
import {
  registerUser,
  saveDoc,
  // deleteDocument,
  // deleteUserAuth,
} from "config/firebase"

const initialState = {
  schoolID: "",
  fullName: "",
  course: "",
  contact: 0,
  email: "",
  address: "",
  password: "",
}

export default function Students() {
  const [isToggle, setToggle] = useState(false)

  const navigate = useNavigate()

  const [
    { schoolID, fullName, course, contact, email, address, password },
    setState,
  ] = useState(initialState)

  const config = {
    schoolID,
    fullName,
    course,
    contact,
    email,
    address,
    password,
  }

  const { fetchStudent } = useContext(StudentContext)

  const clearState = () => {
    setState(initialState)
  }

  const toggleModal = () => {
    setToggle((isToggle) => !isToggle)
  }

  const onChange = (event) => {
    const { name, value } = event.target

    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      const credentials = await registerUser(email, password, "student")

      console.log(credentials)

      if (credentials) {
        const config = {
          authId: credentials.user.uid,
          email: credentials.user.email,
          schoolID,
          fullName,
          course,
          contact,
          address,
        }

        config.email &&
          config.authId &&
          saveDoc(config, "studentsData").then(() => {
            swal.fire({
              title: "Successfully Created",
              text: "please click the okay button to continue",
              icon: "success",
            })
          })
      }

      clearState()
      setToggle(false)
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
      field: "schoolID",
      headerName: "School ID Number",
      width: 200,
      renderCell: (data) => {
        return <span className="text-blue-500">{data.row?.schoolID}</span>
      },
    },
    {
      field: "fullName",
      headerName: "Full Name",
      width: 200,
    },
    {
      field: "course",
      headerName: "Course",
      type: "number",
      width: 150,
    },
    {
      field: "contact",
      headerName: "Contact",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      // description: "This column has a value getter and is not sortable.",
      // sortable: false,
      // width: 160,
      // valueGetter: (params) =>
      //   `${params.row.contact || ""} ${params.row coordinatorName || ""}`,
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
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
        //         await deleteUserAuth(params.row.authId)
        //         deleteDocument("studentsData", params.row.id).then(() => {
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

        // update data in coordinator row
        const Update = (e) => {
          e.stopPropagation() // don't select this row after clickin

          if (params.row.id) {
            navigate(`/updateStudents?id=${params.row.id}`)
          }

          // updateToggleModal();
        }

        return (
          <div className="space-x-4">
            <button
              className="cursor-pointer bg-slate-600 hover:bg-slate-800 transition-all text-white py-2 px-4 rounded-lg border-2"
              onClick={Update}
            >
              Edit
            </button>
            {/* <button
              className="cursor-pointer cursor-pointer bg-slate-900 hover:bg-slate-600 transition-all text-white py-2 px-4 rounded-lg border-2"
              onClick={Delete}
            >
              Delete
            </button> */}
          </div>
        )
      },
    },
  ]

  const addModal = (
    <AddStudentsModal
      isToggle={isToggle}
      toggleModal={toggleModal}
      config={config}
      clearState={clearState}
      onSubmit={onSubmit}
      onChange={onChange}
    />
  )

  // // loading spinner before the data comes out
  // const loading = fetchCoordinator.length <= 0;

  return (
    <Fragment>
      {addModal}
      <Layout title="Students" description="a list of student data">
        <div className="flex justify-end my-4">
          <button
            onClick={toggleModal}
            className="bg-slate-900 rounded-lg flex items-center justify-center py-1.5 px-3 gap-2 text-white hover:bg-slate-600 transition-all"
          >
            <Plus size="18" />
          </button>
        </div>
        <Table data={fetchStudent} columns={columns} loading={false} />
      </Layout>
    </Fragment>
  )
}
