import React, { useState, useEffect, useContext } from "react"
import { CoordinatorContext } from "context/CoordinatorProvider"
import { Layout, Textbox, Back } from "components"
import { updateDocument } from "config/firebase"
import { Link, useLocation } from "react-router-dom"

// Utils
import { objectAssign } from "Utils/ReusableSyntax"

const initialState = {
  authId: "",
  coordinatorName: "",
  contact: "",
  email: "",
  address: "",
}

export default function UpdateCoordinator() {
  const params = useLocation()
  const paramsId = params.search.split("=")

  const { setcoordinatorId, fetchSpecificCoord } =
    useContext(CoordinatorContext)

  fetchSpecificCoord && objectAssign(fetchSpecificCoord, initialState)

  const [{ authId, coordinatorName, contact, email, address }, setState] =
    useState(initialState)

  const onChange = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const config = {
      authId,
      coordinatorName,
      contact,
      email,
      address,
    }

    updateDocument("coordinatorData", config, paramsId[1])
  }

  useEffect(() => {
    paramsId[1] && setcoordinatorId(paramsId[1])
  }, [paramsId])

  return (
    <Layout
      title="Update Coordinator"
      description="this section you can update coordinator information"
    >
      <Back redirect="/admin/coordinator" />
      <form className="w-full" onSubmit={(event) => onSubmit(event)}>
        <div className="flex gap-5 my-4">
          <Textbox
            type="text"
            className="w-full"
            name="coordinatorName"
            value={coordinatorName}
            onChange={(event) => onChange(event)}
            label="Coordinate Name"
          />
          <Textbox
            type="number"
            className="w-full"
            name="contact"
            value={contact}
            onChange={(event) => onChange(event)}
            label="Contact"
          />
        </div>
        <div className="flex gap-5 my-4">
          <Textbox
            type="email"
            disabled
            className="w-full"
            name="email"
            value={email}
            onChange={(event) => onChange(event)}
            label="Email"
          />
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
