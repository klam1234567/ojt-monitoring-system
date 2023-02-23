import React, { useEffect, useContext } from "react"
import { StudentContext } from "context/StudentProvider"
import { useLocation } from "react-router-dom"
import { Layout, Textbox, Back } from "components"
import { Link } from "react-router-dom"

// Utils
import { objectAssign } from "Utils/ReusableSyntax"

//Higher Order Component
import { FormHOC } from "HOC"

const initialState = {
  schoolID: "",
  fullName: "",
  course: "",
  contact: 0,
  email: "",
  address: "",
}

const entity = {
  componentName: "updateStudent",
  collectionName: "studentsData",
  actionType: "UPDATE",
}

function UpdateStudents(props) {
  const params = useLocation()
  const paramsId = params.search.split("=")

  const { setStudentId, fetchSpecificStudent } = useContext(StudentContext)

  fetchSpecificStudent && objectAssign(fetchSpecificStudent, initialState)

  const onChange = (event) => {
    const { name, value } = event.target
    props.onChange(name, value)
    // setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const { schoolID, fullName, course, email, address, id } =
      props?.updateStudent

    const config = {
      schoolID,
      fullName,
      course,
      email,
      address,
    }

    props.onSubmit(config, id)

    // updateDocument("studentsData", config, paramsId[1])
  }

  const fetchStudentId = () => {
    paramsId.length > 0 && setStudentId(paramsId[1])
  }

  useEffect(() => {
    fetchStudentId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsId])

  // useEffect(() => {
  //   // paramsId[1] && setStudentId(paramsId[1])
  //   paramsId[1] && localStorage.setItem("updateId", paramsId[1])
  // }, [paramsId])

  return (
    <Layout
      title="Update Student Information"
      description="this section you can update student information"
    >
      <Back redirect="/admin/students" />
      <form className="w-full" onSubmit={(event) => onSubmit(event)}>
        <div className="flex gap-5 my-4">
          <Textbox
            type="text"
            className="w-full"
            name="schoolID"
            value={props.updateStudent?.schoolID}
            onChange={(event) => onChange(event)}
            label="School ID Number"
            disabled
          />
          <Textbox
            type="text"
            className="w-full"
            name="fullName"
            value={props.updateStudent?.fullName}
            onChange={(event) => onChange(event)}
            label="Full Name"
          />
        </div>
        <div className="flex gap-5 my-4">
          <Textbox
            type="text"
            className="w-full"
            name="course"
            value={props.updateStudent?.course}
            onChange={(event) => onChange(event)}
            label="Course"
          />
          <Textbox
            type="email"
            className="w-full"
            name="email"
            value={props.updateStudent?.email}
            onChange={(event) => onChange(event)}
            label="Email"
            disabled
          />
        </div>
        <div className="w-full">
          <Textbox
            type="text"
            className="w-full"
            name="address"
            value={props.updateStudent?.address}
            onChange={(event) => onChange(event)}
            label="Address"
          />
        </div>
        <div className="text-white flex gap-2 justify-end mt-4">
          <Link
            to="/students"
            className="bg-slate-500 rounded-lg py-2 px-4 hover:bg-slate-800 transition-all"
          >
            cancel
          </Link>
          <button
            type="submit"
            className="bg-slate-900 rounded-lg py-2 px-4 hover:bg-slate-600 transition-all"
          >
            update
          </button>
        </div>
      </form>
    </Layout>
  )
}

const CustomUpdateStudents = () => {
  const UpdateStudentHOC = FormHOC(initialState)(entity)(UpdateStudents)

  return <UpdateStudentHOC />
}

export default CustomUpdateStudents
