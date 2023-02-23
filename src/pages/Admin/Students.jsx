import React, { Fragment, useState, useContext } from "react"
import { Plus } from "react-feather"
import { Layout, Table, AddStudentsModal } from "components"
import { useNavigate } from "react-router-dom"

// context
import { StudentContext } from "context/StudentProvider"

//Higher Order Component
import { FormHOC } from "HOC"

const initialState = {
  schoolID: "",
  fullName: "",
  course: "",
  contact: 0,
  section: "",
  email: "",
  address: "",
  password: "",
}

const entity = {
  componentName: "students",
  userCollection: "userData",
  dataCollection: "studentsData",
  actionType: "REGISTER",
}

function Students(props) {
  const [isToggle, setToggle] = useState(false)

  const navigate = useNavigate()

  const { fetchStudent } = useContext(StudentContext)

  const toggleModal = () => {
    setToggle((isToggle) => !isToggle)
  }

  const onChange = (event) => {
    const { name, value } = event.target

    props.onChange(name, value)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const courseValidator = /^([^0-9]*)$/

    const {
      schoolID,
      fullName,
      course,
      contact,
      section,
      address,
      email,
      password,
    } = props?.students

    try {
      if (courseValidator.test(course)) {
        const config = {
          schoolID,
          fullName,
          course,
          contact,
          section,
          address,
        }

        const userData = {
          name: fullName,
          status: "student",
        }

        await props.onAuth(email, password, config, userData)
      }

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
      field: "section",
      headerName: "Section",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        // update data in coordinator row
        const Update = (e) => {
          e.stopPropagation() // don't select this row after clickin

          if (params.row.id) {
            navigate(`/admin/updateStudents?id=${params.row.id}`)
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
      config={props}
      clearState={props.clearState}
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

const CustomStudents = () => {
  const StudentsHOC = FormHOC(initialState)(entity)(Students)

  return <StudentsHOC />
}

export default CustomStudents
