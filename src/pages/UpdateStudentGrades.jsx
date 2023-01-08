import React, { useContext } from "react"
import { Layout } from "components"
import { useLocation } from "react-router-dom"
import { filteredByIDSubmittedTask } from "Utils/ReusableSyntax"
import { Textbox } from "components"

//context api
import { TaskContext } from "context/TasksProvider"

export default function UpdateStudentGrades() {
  const { fetchSubCollection } = useContext(TaskContext)
  const params = useLocation()
  const paramsId = params.search.split("=")

  const filteredData = filteredByIDSubmittedTask(
    fetchSubCollection,
    paramsId[1]
  )

  console.log(filteredData)

  return (
    <Layout
      title="Update student grade"
      description="coordinator can upgrade student grade"
    >
      <div className="flex gap-3">
        <div className="flex-1">
          <object
            data={filteredData[0].documentDetails?.fileUrl}
            type="application/pdf"
            className="h-screen w-full"
          >
            <p>
              Alternative text - include a link{" "}
              <a href={filteredData[0].documentDetails?.fileUrl}>to the PDF!</a>
            </p>
          </object>
        </div>
        <form className="flex-1 leading-5">
          <div>
            <aside className="mb-2">
              <label className="font-bold text-sm text-slate-500">
                School ID
              </label>
            </aside>
            <Textbox
              type="text"
              disabled={true}
              className="w-full"
              id="schoolID"
              name="schoolID"
              value={filteredData[0]?.schoolID}
            />
          </div>
          <div className="mt-3">
            <aside className="mb-2">
              <label className="font-bold text-sm text-slate-500">
                Full Name
              </label>
            </aside>
            <Textbox
              type="text"
              disabled={true}
              className="w-full"
              name="fullName"
              value={filteredData[0]?.fullName}
            />
          </div>
          <div className="mt-3">
            <aside className="mb-2">
              <label className="font-bold text-sm text-slate-500">Email</label>
            </aside>
            <Textbox
              type="email"
              disabled={true}
              className="w-full"
              name="email"
              value={filteredData[0]?.email}
            />
          </div>
          <div className="mt-3">
            <aside className="mb-2">
              <label className="font-bold text-sm text-slate-500">Course</label>
            </aside>
            <Textbox
              type="text"
              disabled={true}
              className="w-full"
              name="course"
              value={filteredData[0]?.course}
            />
          </div>
          <div className="mt-3">
            <aside className="mb-2">
              <label className="font-bold text-sm text-slate-500">
                Section
              </label>
            </aside>
            <Textbox
              type="text"
              disabled={true}
              className="w-full"
              name="section"
              value={filteredData[0]?.section}
            />
          </div>
          <div className="mt-3">
            <aside className="mb-2">
              <label className="font-bold text-sm text-slate-500">
                Remarks
              </label>
            </aside>
            <Textbox
              type="text"
              disabled={true}
              className="w-full"
              name="remarks"
              value={filteredData[0]?.remarks}
            />
          </div>
          <div className="mt-3">
            <aside className="mb-2">
              <label className="font-bold text-sm text-slate-500">Score</label>
            </aside>
            <Textbox
              type="number"
              className="w-full"
              name="score"
              value={filteredData[0]?.documentDetails?.score}
            />
          </div>
        </form>
      </div>
    </Layout>
  )
}
