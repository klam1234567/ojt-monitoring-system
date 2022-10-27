import React, { useContext, useState } from "react"
import { MenuItem } from "@mui/material"
import { TabPanel } from "@mui/lab"
import { Layout, Tabs, Textbox, SelectMenu } from "components"

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

  return (
    <Layout title="Enrollment Module" description="a list of enrollment module">
      <Tabs>
        <TabPanel value="1">Module List</TabPanel>
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
