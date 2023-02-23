import { useState, Fragment } from "react"
import swal from "sweetalert2"

//Firebase functions
import {
  signInWithEmailAndPassword,
  auth,
  saveDoc,
  updateDocument,
} from "config/firebase"

const ACTIONS = {
  save: "SAVE",
  update: "UPDATE",
  DELETE: "DELETE",
}

const FormHOC = (propState) => (entity) => (WrappedComponent) => {
  const HOC = () => {
    const [state, setState] = useState({ [entity?.componentName]: propState })

    const clearState = () => {
      setState({
        [entity?.componentName]: { ...propState },
      })
    }

    const Login = async () => {
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          state.Login?.email,
          state.Login?.password
        )

        if (response) {
          const { email } = response?.user
          localStorage.setItem("email", email)

          swal.fire({
            title: "Success!",
            text: "successfully login click okay to continue",
            icon: "success",
          })
        }
      } catch (error) {
        if ((error.code = "auth/user-not-found")) {
          swal.fire({
            title: "Oops!",
            text: "this account still not registered please try again",
            icon: "warning",
          })
        }
      }
    }

    const saveData = async (data) => {
      try {
        const response = await swal.fire({
          title: "Opps!",
          text: "would you like to save this file?",
          icon: "question",
          showCancelButton: true,
        })

        if (response.isConfirmed) {
          data &&
            saveDoc(data, entity?.collectionName).then(() => {
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

    const handleSubmit = (data, id) => {
      /**
       * if the entity componentName is equal to Login return Login function
       * otherwise run with actionType
       */
      if (entity?.componentName === "Login") {
        Login()
      }

      if (entity?.actionType === ACTIONS.save) {
        saveData(data)
      }

      if (entity?.actionType === ACTIONS.update) {
        updateDocument(entity?.collectionName, data, id)
      }

      //console.log("note save data")

      //saveData(data)
    }

    const handleChange = (name, value) => {
      setState((prevState) => ({
        [entity?.componentName]: {
          ...prevState[entity?.componentName],
          [name]: value,
        },
      }))
    }

    return (
      <Fragment>
        <WrappedComponent
          {...state}
          clearState={clearState}
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      </Fragment>
    )
  }

  return HOC
}

export default FormHOC
