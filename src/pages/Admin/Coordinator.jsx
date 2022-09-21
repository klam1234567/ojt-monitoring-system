import React, { Fragment, useState } from "react";
import swal from "sweetalert2";
import { Plus } from "react-feather";
import { coordinatorDummyData } from "data";
import { Layout, Table, PageModal, Textbox } from "components";

//firebase
import { registerUser, saveData } from "config/firebase";

const initialState = {
  coordinatorName: "",
  contact: "",
  email: "",
  address: "",
  password: "",
};

export default function Coordinator() {
  const [isToggle, setToggle] = useState(false);
  const [{ coordinatorName, contact, email, address, password }, setState] =
    useState(initialState);

  const toggleModal = () => setToggle((isToggle) => !isToggle);

  const onChange = (event) => {
    const { name, value } = event.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => {
    setState(initialState);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const credentials = await registerUser(email, password);

      if (credentials) {
        const config = {
          email: credentials.user.email,
          coordinatorName,
          contact,
          address,
        };

        config.email &&
          saveData(config, "coordinatorData").then(() => {
            swal.fire({
              title: "Successfully Created",
              text: "please click the okay button to continue",
              icon: "success",
            });
          });
      }

      clearState();
      setToggle(false);
    } catch (error) {
      console.log(error);
    }
  };

  const Modal = (
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
  );

  return (
    <Fragment>
      {Modal}
      <Layout title="Coordinator" description="a list of coordinator data">
        <div className="flex justify-end my-4">
          <button
            onClick={toggleModal}
            className="bg-slate-900 rounded-lg flex items-center justify-center py-1.5 px-3 gap-2 text-white hover:bg-slate-600 transition-all"
          >
            <Plus size="18" />
          </button>
        </div>
        <Table data={coordinatorDummyData} />
      </Layout>
    </Fragment>
  );
}
