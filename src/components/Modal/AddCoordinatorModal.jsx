import React from "react"
import { PageModal, Textbox } from "components"

export default function AddCoordinatorModal({
  isToggle,
  toggleModal,
  config,
  onChange,
  clearState,
  onSubmit,
}) {
  const { coordinatorName, contact, email, address, password } = config

  return (
    <PageModal open={isToggle} isClose={toggleModal}>
      <h1 className="font-bold text-2xl mb-6">Coordinator Information</h1>
      <form className="w-full" onSubmit={(event) => onSubmit(event)}>
        <div className="flex gap-5 my-4">
          <Textbox
            type="text"
            className="w-full"
            name="coordinatorName"
            value={coordinatorName}
            label="Coordinate Name"
            onChange={(event) => onChange(event)}
          />
          <Textbox
            type="number"
            className="w-full"
            name="contact"
            value={contact}
            label="Contact"
            onChange={(event) => onChange(event)}
          />
        </div>
        <div className="flex gap-5 my-4">
          <Textbox
            type="email"
            className="w-full"
            name="email"
            value={email}
            label="Email"
            onChange={(event) => onChange(event)}
          />
          <Textbox
            type="text"
            className="w-full"
            name="address"
            value={address}
            label="Address"
            onChange={(event) => onChange(event)}
          />
        </div>
        <div className="w-full">
          <Textbox
            type="password"
            className="w-full"
            name="password"
            value={password}
            label="Password"
            onChange={(event) => onChange(event)}
          />
        </div>
        <div className="text-white flex gap-2 justify-end mt-4">
          <button
            onClick={clearState}
            type="button"
            className="bg-slate-500 rounded-lg py-2 px-4 hover:bg-slate-800 transition-all"
          >
            cancel
          </button>
          <button
            type="submit"
            className="bg-slate-900 rounded-lg py-2 px-4 hover:bg-slate-600 transition-all"
          >
            submit
          </button>
        </div>
      </form>
    </PageModal>
  )
}
