import React, { useContext, useState } from "react"
import { MenuItem } from "@mui/material"
import { TabPanel } from "@mui/lab"
import { useNavigate } from "react-router-dom"
import { Layout, Tabs, Textbox, SelectMenu, Table } from "components"

// context api
import { StudentContext } from "context/StudentProvider"
import { CoordinatorContext } from "context/CoordinatorProvider"
import { OrganizationContext } from "context/OrganizationProvider"
import { saveDoc } from "config/firebase"
import swal from "sweetalert2"

const initialState = {
  schoolYear: "",
  studName: "",
  coordName: "",
  orgsName: "",
}

export default function EnrollmentModule() {
  const [{ schoolYear, studName, coordName, orgsName }, setState] =
    useState(initialState)

  const navigate = useNavigate()

  const { fetchStudent } = useContext(StudentContext)
  const { fetchCoordinator } = useContext(CoordinatorContext)
  const { fetchOrganization } = useContext(OrganizationContext)

  const studentName = fetchStudent.map((type) => type.fullName)
  const coordinatorName = fetchCoordinator.map((type) => type.coordinatorName)
  const orgName = fetchOrganization.map((type) => type.organizationName)

  const onChange = (event) => {
    const { name, value } = event.target

    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const clearState = () => {
    setState(initialState)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const config = {
        schoolYear,
        studName,
        coordName,
        orgsName,
      }

      const response = await swal.fire({
        title: "Opps!",
        text: "would you like to save this file?",
        icon: "question",
        showCancelButton: true,
      })

      if (response.isConfirmed) {
        config &&
          saveDoc(config, "enrollmentModuleData").then(() => {
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
      field: "schoolYear",
      headerName: "School Year",
      width: 200,
    },
    {
      field: "orgsName",
      headerName: "Organization Name",
      type: "string",
      width: 150,
    },
    {
      field: "coordName",
      headerName: "Coordinator Name",
      width: 200,
    },
    {
      field: "studName",
      headerName: "Student Name",
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
        //         await deleteUserAuth(params.row?.authId)
        //         await deleteDocument("coordinatorData", params.row.id).then(
        //           () => {
        //             swal.fire({
        //               title: "Successfully Deleted",
        //               text: "Please click yes to continue",
        //               icon: "success",
        //             })
        //           }
        //         )
        //       } else {
        //         swal.fire("Yay!", "your data is safe", "success")
        //       }
        //     })
        // }

        // update data in coordinator row
        const Update = (e) => {
          e.stopPropagation() // don't select this row after clickin

          if (params.row.id) {
            navigate(`/updateCoordinator?id=${params.row.id}`)
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

  return (
    <Layout title="Enrollment Module" description="a list of enrollment module">
      <Tabs>
        <TabPanel value="1">
          <Table data={fetchCoordinator} columns={columns} loading={false} />
        </TabPanel>
        <TabPanel value="2">
          <form onSubmit={(event) => onSubmit(event)}>
            <div className="flex gap-4">
              <Textbox
                type="text"
                className="w-full"
                name="schoolYear"
                value={schoolYear}
                onChange={(event) => onChange(event)}
                label="School Year"
              />
              <SelectMenu
                name="studName"
                value={studName}
                onChange={(event) => onChange(event)}
                title="Students"
              >
                {studentName.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </SelectMenu>
            </div>
            <div className="flex gap-4 my-4">
              <SelectMenu
                name="coordName"
                value={coordName}
                onChange={(event) => onChange(event)}
                title="Coordinator"
              >
                {coordinatorName.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </SelectMenu>
              <SelectMenu
                name="orgsName"
                value={orgsName}
                onChange={(event) => onChange(event)}
                title="Organization"
              >
                {orgName.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </SelectMenu>
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
                Save module
              </button>
            </div>
          </form>
        </TabPanel>
      </Tabs>
    </Layout>
  )
}
