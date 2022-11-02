import React, { useState, useContext } from "react"
import { AuthContext } from "context/auth"
import { signInWithEmailAndPassword, auth } from "config/firebase"
import { Card } from "components"
import { Navigate } from "react-router-dom"
import swal from "sweetalert2"

const initialState = {
  email: "",
  password: "",
}

export default function Login() {
  const [{ email, password }, setState] = useState(initialState)

  const context = useContext(AuthContext)

  const onChange = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    const response = await signInWithEmailAndPassword(auth, email, password)

    if (response) {
      swal.fire({
        title: "Success!",
        text: "successfully login click okay to continue",
        icon: "success",
      })
    }
  }

  if (context) {
    return <Navigate to="/admin" />
  }

  return (
    <section className="flex h-screen">
      <div className="m-auto">
        <div
          className="bg-no-repeat bg-cover bg-center relative w-screen"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/6476258/pexels-photo-6476258.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
          }}
        >
          <div className="absolute bg-gradient-to-b from-gray-800 to-gray-800 opacity-75 inset-0 z-0"></div>
          <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
            <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
              <div className="self-start hidden lg:flex flex-col  text-white">
                <h1 className="mb-3 font-bold text-5xl">Hi! Welcome Back </h1>
                <p className="pr-3">
                  This system will easily tracks all interns task and
                  informations, by using of this website it will be easily to
                  handle all of the interns profile
                </p>
              </div>
            </div>
            <Card
              padding="p-12"
              additionalStyle="flex justify-center self-center z-40"
            >
              <div className="mb-4">
                <h3 className="font-semibold text-2xl text-gray-800">
                  Sign In{" "}
                </h3>
                <p className="text-gray-500">Please sign in to your account.</p>
              </div>
              <form className="space-y-8" onSubmit={(event) => onSubmit(event)}>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 tracking-wide">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                      value={email}
                      name="email"
                      onChange={(event) => onChange(event)}
                      placeholder="mail@gmail.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                      Password
                    </label>
                    <input
                      type="password"
                      className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                      value={password}
                      name="password"
                      onChange={(event) => onChange(event)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>
                {/* <div className="flex items-center justify-end">
                <div className="text-sm">
                  <span className="text-green-400 hover:text-green-500 hover:underline cursor-pointer">
                    Forgot your password?
                  </span>
                </div>
              </div> */}
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-gray-400  hover:bg-gray-500 text-gray-100 py-2 rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Sign in
                  </button>
                </div>
              </form>
              <div className="pt-5 text-center text-gray-400 text-md">
                {/* <span>
                  Don't have an account ?
                  <span className="text-green hover:text-gray-500 ml-1 cursor-pointer hover:underline">
                    Sign In
                  </span>
                </span> */}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
