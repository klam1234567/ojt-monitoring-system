import React, { Fragment, useState, useContext } from "react"
import swal from "sweetalert2"
import { Plus } from "react-feather"
import { Layout, Table, AddOrganization } from "components"
import { useNavigate } from "react-router-dom"

// context
import { OrganizationContext } from "context/OrganizationProvider"

//firebase
import { saveDoc, deleteDocument } from "config/firebase"

const initialState = {
  organizationName: "",
  companyBackground: "",
  contactPerson: "",
  contactNumber: 0,
  companyAddress: "",
}

export default function Organization() {
  const [isToggle, setToggle] = useState(false)

  const navigate = useNavigate()

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

  const config = {
    organizationName,
    companyBackground,
    contactPerson,
    contactNumber,
    companyAddress,
  }

  const { fetchOrganization } = useContext(OrganizationContext)

  const clearState = () => {
    setState(initialState)
  }

  const toggleModal = () => {
    setToggle((isToggle) => !isToggle)
  }

  const onChange = (event) => {
    const { name, value } = event.target

    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      const config = {
        organizationName,
        companyBackground,
        contactPerson,
        contactNumber,
        companyAddress,
      }

      config &&
        saveDoc(config, "organizationData").then(() => {
          swal.fire({
            title: "Successfully Created",
            text: "please click the okay button to continue",
            icon: "success",
          })
        })

      clearState()
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
      field: "organizationName",
      headerName: "Organization Name",
      width: 200,
    },
    {
      field: "contactPerson",
      headerName: "Contact Person",
      width: 200,
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      type: "number",
      width: 150,
    },
    {
      field: "companyAddress",
      headerName: "Company Address",
      width: 200,
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
                deleteDocument("organizationData", params.row.id).then(() => {
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
            navigate(`/updateOrganization?id=${params.row.id}`)
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

  const addModal = (
    <AddOrganization
      isToggle={isToggle}
      toggleModal={toggleModal}
      config={config}
      clearState={clearState}
      onSubmit={onSubmit}
      onChange={onChange}
    />
  )

  // // loading spinner before the data comes out
  // const loading = fetchCoordinator.length <= 0;

  return (
    <Fragment>
      {addModal}
      <Layout title="Organization" description="a list of organization data">
        <div className="flex justify-end my-4">
          <button
            onClick={toggleModal}
            className="bg-slate-900 rounded-lg flex items-center justify-center py-1.5 px-3 gap-2 text-white hover:bg-slate-600 transition-all"
          >
            <Plus size="18" />
          </button>
        </div>
        <Table data={fetchOrganization} columns={columns} loading={false} />
      </Layout>
    </Fragment>
  )
}
