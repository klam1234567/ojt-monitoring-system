import React, { useContext } from "react"
import { Layout } from "components"
import { useNavigate } from "react-router-dom"

//context api
import { TaskContext } from "context/TasksProvider"

export default function ViewSubmission() {
  const { fetchSubCollection } = useContext(TaskContext)
  const navigate = useNavigate()

  const redirectTo = (event, id) => {
    event.preventDefault()

    if (id) {
      navigate(`/admin/update-grade?id=${id}`)
    }
  }

  return (
    <Layout
      title="Students who Submitted"
      description="all the submitted tasks by the students"
    >
      <div className="grid grid-cols-3 gap-2">
        {fetchSubCollection.map((elem) => (
          <div
            onClick={(event) => redirectTo(event, elem.id)}
            className="max-w-xl bg-white border border-gray-200 rounded-lg shadow-md white:bg-gray-800 white:border-gray-700 cursor-pointer transition-all transform hover:-translate-y-2"
          >
            <div>
              <img
                className="rounded-t-lg w-full h-56 object-cover"
                src="/images/student_card_background.jpg"
                alt=""
              />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 white:text-white">
                  {elem.fullName}
                </h5>
              </div>
              <p className="text-gray-700 text-sm">
                Submitted Date: January 05, 2023
              </p>
              <p className="text-gray-700 text-sm mt-2">
                Course & Section: {elem.course} {elem.section}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
