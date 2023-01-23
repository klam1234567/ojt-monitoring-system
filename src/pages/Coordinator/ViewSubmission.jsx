import React, { useContext } from "react"
import { Layout } from "components"
import { useNavigate } from "react-router-dom"

//context api
import { TaskContext } from "context/TasksProvider"

export default function ViewSubmission() {
  const { fetchSubCollection } = useContext(TaskContext)
  const navigate = useNavigate()

  const redirectTo = (event, submittedId) => {
    event.preventDefault()

    if (submittedId) {
      navigate(`/admin/update-grade/${submittedId}`)
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
            key={elem.id}
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
                Course & Section: {elem.studentDetails[0]?.course}{" "}
                {elem.studentDetails[0]?.section}
              </p>
              <p className="w-20 text-gray-700 text-sm mt-2 bg-slate-500 text-slate-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-slate-200 dark:text-slate-800 mt-2">
                Score: {elem.documentDetails?.score}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
