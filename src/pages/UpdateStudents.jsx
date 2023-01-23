import React, { useState, useEffect, useContext } from "react"
import { StudentContext } from "context/StudentProvider"
import { useLocation } from "react-router-dom"
import { Layout, Textbox, Back } from "components"
import { updateDocument } from "config/firebase"
import { Link } from "react-router-dom"

// Utils
import { objectAssign } from "Utils/ReusableSyntax"

const initialState = {
  schoolID: "",
  fullName: "",
  course: "",
  contact: 0,
  email: "",
  address: "",
}

export default function UpdateCoordinator() {
  const params = useLocation()
  const paramsId = params.search.split("=")

  const { setStudentId, fetchSpecificStudent } = useContext(StudentContext)

  fetchSpecificStudent && objectAssign(fetchSpecificStudent, initialState)

  const [{ schoolID, fullName, course, email, address }, setState] =
    useState(initialState)

  const onChange = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const config = {
      schoolID,
      fullName,
      course,
      email,
      address,
    }

    updateDocument("studentsData", config, paramsId[1])
  }

  useEffect(() => {
    paramsId[1] && setStudentId(paramsId[1])
  }, [paramsId]) // eslint-disable-line react-hooks/exhaustive-deps

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
            value={schoolID}
            onChange={(event) => onChange(event)}
            label="School ID Number"
            disabled
          />
          <Textbox
            type="text"
            className="w-full"
            name="fullName"
            value={fullName}
            onChange={(event) => onChange(event)}
            label="Full Name"
          />
        </div>
        <div className="flex gap-5 my-4">
          <Textbox
            type="text"
            className="w-full"
            name="course"
            value={course}
            onChange={(event) => onChange(event)}
            label="Course"
          />
          <Textbox
            type="email"
            className="w-full"
            name="email"
            value={email}
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
            value={address}
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
