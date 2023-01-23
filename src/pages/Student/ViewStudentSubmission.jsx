import React, { useContext, useState } from "react"
import { Layout } from "components"
import { useLocation } from "react-router-dom"
import { filteredByIDSubmittedTask } from "Utils/ReusableSyntax"
import { Textbox, Back } from "components"
import { app } from "config/firebase"
import swal from "sweetalert2"

//context api
import { TaskContext } from "context/TasksProvider"

export default function ViewStudentSubmission() {
  const { fetchSubCollection } = useContext(TaskContext)
  const params = useLocation()
  const pathname = params.pathname
  const paramsId = pathname.split("/")
  const submittedDocumentsId = paramsId[3]

  const filteredData = filteredByIDSubmittedTask(
    fetchSubCollection,
    submittedDocumentsId
  )

  const [score, setScore] = useState(filteredData[0]?.documentDetails?.score)
  const [comments, setComments] = useState(
    filteredData[0]?.documentDetails?.comments
  )

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      if (score !== 0) {
        const config = {
          documentDetails: {
            ...filteredData[0]?.documentDetails,
            score: Number(score),
            comments,
          },
        }

        await app
          .firestore()
          .collection("tasksDetails")
          .doc(filteredData[0]?.documentid)
          .collection("submittedDocuments")
          .doc(submittedDocumentsId)
          .update(config)
          .then(() => {
            swal
              .fire({
                title: "Successfully",
                text: "successfully updated score",
                icon: "success",
              })
              .then((response) => {
                if (response.isConfirmed) {
                  window.location.href = "/admin/taskSubmitted"
                }
              })
          })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout
      title="Student submission details"
      description="you can see here all student submitted information"
    >
      <Back redirect="/admin/task-record" />
      <div className="flex gap-3">
        <div className="flex-1">
          <object
            data={filteredData[0]?.documentDetails?.fileUrl}
            type="application/pdf"
            className="h-screen w-full"
          >
            <p>
              Alternative text - include a link{" "}
              <a href={filteredData[0]?.documentDetails?.fileUrl}>
                to the PDF!
              </a>
            </p>
          </object>
        </div>
        <form
          className="flex-1 leading-5"
          onSubmit={(event) => onSubmit(event)}
        >
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
              value={filteredData[0]?.studentDetails[0]?.schoolID}
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
              value={filteredData[0]?.studentDetails[0]?.fullName}
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
              value={filteredData[0]?.studentDetails[0]?.email}
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
              value={filteredData[0]?.studentDetails[0]?.course}
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
              value={filteredData[0]?.studentDetails[0]?.section}
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
              value={filteredData[0]?.documentDetails?.remarks}
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
              disabled={true}
              onChange={(event) => setScore(event.target.value)}
              value={score}
            />
          </div>
          <div className="mt-3">
            <aside className="mb-2">
              <label className="font-bold text-sm text-slate-500">
                Comments
              </label>
            </aside>
            <Textbox
              type="number"
              className="w-full"
              name="comments"
              placeholder="comments"
              disabled={true}
              rows={4}
              column={4}
              multiline
              value={comments}
              onChange={(event) => setComments(event.target.value)}
            />
          </div>
          <div className="my-4 text-right">
            <button
              type="submit"
              className="bg-slate-900 rounded-lg py-2 px-4 hover:bg-slate-600 transition-all text-white"
            >
              save
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
