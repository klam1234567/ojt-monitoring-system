import React, { useState, useEffect, useContext } from "react"
import { OrganizationContext } from "context/OrganizationProvider"
import { useLocation } from "react-router-dom"
import { Layout, Textbox, Back } from "components"
import { updateDocument } from "config/firebase"
import { Link } from "react-router-dom"

// Utils
import { objectAssign } from "Utils/ReusableSyntax"

const initialState = {
  organizationName: "",
  companyBackground: "",
  contactPerson: "",
  contactNumber: 0,
  companyAddress: "",
}

export default function UpdateCoordinator() {
  const params = useLocation()
  const paramsId = params.search.split("=")

  const { setOrganizationId, fetchSpecificOrg } =
    useContext(OrganizationContext)

  fetchSpecificOrg && objectAssign(fetchSpecificOrg, initialState)

  const [
    {
      organizationName,
      companyBackground,
      contactPerson,
      contactNumber,
      companyAddress,
    },
    setState,
  ] = useState(initialState)

  const onChange = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const config = {
      organizationName,
      companyBackground,
      contactPerson,
      contactNumber,
      companyAddress,
    }

    updateDocument("organizationData", config, paramsId[1])
  }

  useEffect(() => {
    paramsId[1] && setOrganizationId(paramsId[1])
  }, [paramsId]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Layout
      title="Update organization"
      description="this section you can update organization information"
    >
      <Back redirect="/admin/organization" />
      <form className="w-full" onSubmit={(event) => onSubmit(event)}>
        <div className="w-full my-4">
          <Textbox
            type="text"
            className="w-full"
            name="organizationName"
            value={organizationName}
            label="Organization Name"
            onChange={(event) => onChange(event)}
          />
        </div>
        <div className="w-full my-4">
          <Textbox
            type="text"
            className="w-full"
            name="companyBackground"
            value={companyBackground}
            label="Company Background"
            multiline
            rows={4}
            maxRows={4}
            onChange={(event) => onChange(event)}
          />
        </div>
        <div className="flex gap-5 my-4">
          <Textbox
            type="text"
            className="w-full"
            name="contactPerson"
            value={contactPerson}
            label="Contact Person"
            onChange={(event) => onChange(event)}
          />
          <Textbox
            type="number"
            className="w-full"
            name="contactNumber"
            value={contactNumber}
            label="Contact Number"
            onChange={(event) => onChange(event)}
          />
        </div>
        <div className="w-full">
          <Textbox
            type="text"
            className="w-full"
            name="companyAddress"
            value={companyAddress}
            label="Company Address"
            onChange={(event) => onChange(event)}
          />
        </div>
        <div className="text-white flex gap-2 justify-end mt-4">
          <Link
            to="/coordinator"
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
