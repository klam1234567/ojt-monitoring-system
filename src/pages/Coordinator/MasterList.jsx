import React, { Fragment, useContext, useState } from "react"
import { MenuItem } from "@mui/material"
import { TabPanel } from "@mui/lab"
import { Layout, Tabs, Textbox, SelectMenu, Table } from "components"

import { EnrollmentContext } from "context/EnrollmentProvider"
import { RegisteredStudentContext } from "context/RegisteredStudentProvider"
import { saveDoc, deleteDocument } from "config/firebase"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "context/auth"
import { filterByUUID, eliminateDuplicates } from "Utils/ReusableSyntax"
import swal from "sweetalert2"

const initialState = {
  studName: "",
  schoolID: "",
  course: "",
  contact: "",
  section: "",
  schoolYear: "",
  organization: "",
  email: "",
  address: "",
}

export default function MasterList() {
  const [
    {
      studName,
      schoolID,
      course,
      contact,
      section,
      schoolYear,
      organization,
      email,
      address,
    },
    setState,
  ] = useState(initialState)

  const { fetchEnrollment } = useContext(EnrollmentContext)
  const { fetchRegisteredStudent } = useContext(RegisteredStudentContext)
  const context = useContext(AuthContext)

  const filteredData = filterByUUID(fetchRegisteredStudent, context.uid)
  const sectionList = fetchEnrollment.map((type) => type.section)
  const filteredSectionList = eliminateDuplicates(sectionList)

  const navigate = useNavigate()

  const fetchStudents = fetchEnrollment.filter(
    (type) => type.coordEmail === context.email
  )

  const clearState = () => {
    setState(initialState)
  }

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
        studName,
        schoolID,
        course,
        contact,
        section,
        schoolYear,
        organization,
        studentEmail: email,
        address,
      }

      const response = await swal.fire({
        title: "Opps!",
        text: "would you like to save this file?",
        icon: "question",
        showCancelButton: true,
      })

      if (response.isConfirmed) {
        config &&
          saveDoc(config, "registeredStudentsInfo").then(() => {
            swal.fire({
              title: "Successfully Created",
              text: "please click the okay button to continue",
              icon: "success",
            })
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
      field: "schoolID",
      headerName: "School ID",
      width: 200,
    },
    {
      field: "course",
      headerName: "Course",
      type: "string",
      width: 150,
    },
    {
      field: "contact",
      headerName: "Contact",
      width: 200,
    },
    {
      field: "schoolYear",
      headerName: "School Year",
      width: 200,
      // description: "This column has a value getter and is not sortable.",
      // sortable: false,
      // width: 160,
      // valueGetter: (params) =>
      //   `${params.row.contact || ""} ${params.row coordinatorName || ""}`,
    },
    {
      field: "organization",
      headerName: "Organization",
      width: 200,
      // description: "This column has a value getter and is not sortable.",
      // sortable: false,
      // width: 160,
      // valueGetter: (params) =>
      //   `${params.row.contact || ""} ${params.row coordinatorName || ""}`,
    },
    {
      field: "studentEmail",
      headerName: "Student Email",
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
                await deleteDocument(
                  "registeredStudentsInfo",
                  params.row.id
                ).then(() => {
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
            navigate(`/admin/updateMasterList?id=${params.row.id}`)
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

  const tabName = ["Student List", "Add New"]

  const add_new_trainee = (
    <Fragment>
      <h1 className="font-bold text-2xl mb-4">Add new student</h1>
      <form onSubmit={(event) => onSubmit(event)}>
        <div className="flex gap-4">
          <SelectMenu
            name="studName"
            value={studName}
            onChange={(event) => onChange(event)}
            title="Students Name"
          >
            {fetchStudents.map((type, index) => (
              <MenuItem key={index} value={type.studName}>
                {type.studName}
              </MenuItem>
            ))}
          </SelectMenu>
          <Textbox
            type="text"
            className="w-full"
            value={schoolID}
            onChange={(event) => onChange(event)}
            name="schoolID"
            label="School ID Number"
          />
        </div>
        <div className="flex gap-4 my-4">
          <Textbox
            type="text"
            className="w-full"
            value={course}
            onChange={(event) => onChange(event)}
            name="course"
            label="Course"
          />
          <Textbox
            type="number"
            className="w-full"
            value={contact}
            onChange={(event) => onChange(event)}
            name="contact"
            label="Contact"
          />
          <SelectMenu
            name="section"
            value={section}
            onChange={(event) => onChange(event)}
            title="Section"
          >
            {filteredSectionList.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </SelectMenu>
        </div>
        <div className="flex gap-4 mb-4">
          <SelectMenu
            name="schoolYear"
            value={schoolYear}
            onChange={(event) => onChange(event)}
            title="School Year"
          >
            {fetchStudents.map((type, index) => (
              <MenuItem key={index} value={type.schoolYear}>
                {type.schoolYear}
              </MenuItem>
            ))}
          </SelectMenu>
          <SelectMenu
            name="organization"
            value={organization}
            onChange={(event) => onChange(event)}
            title="Organization"
          >
            {fetchStudents.map((type, index) => (
              <MenuItem key={index} value={type.orgsName}>
                {type.orgsName}
              </MenuItem>
            ))}
          </SelectMenu>
          <Textbox
            type="email"
            className="w-full"
            value={email}
            onChange={(event) => onChange(event)}
            name="email"
            label="Email"
          />
        </div>
        <div className="w-full">
          <Textbox
            type="text"
            className="w-full"
            value={address}
            onChange={(event) => onChange(event)}
            name="address"
            label="Address"
          />
        </div>
        <div className="text-white flex gap-2 justify-end mt-4">
          <button
            type="button"
            className="bg-slate-500 rounded-lg py-2 px-4 hover:bg-slate-800 transition-all"
            onClick={clearState}
          >
            cancel
          </button>
          <button
            type="submit"
            className="bg-slate-900 rounded-lg py-2 px-4 hover:bg-slate-600 transition-all"
          >
            Save trainee
          </button>
        </div>
      </form>
    </Fragment>
  )

  return (
    <Layout title="Master List" description="all the student lists are here">
      <Tabs tabName={tabName}>
        <TabPanel value="1">
          <Table data={filteredData} columns={columns} loading={false} />
        </TabPanel>
        <TabPanel value="2">{add_new_trainee}</TabPanel>
      </Tabs>
    </Layout>
  )
}
