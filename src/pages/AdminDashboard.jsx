import React, { Fragment, useContext } from "react"
import { Users, User, Database, FileText, File } from "react-feather"
import { Layout, Card, Barchart } from "components"
import rolesHook from "hooks/rolesHook"

// context api
import { StudentContext } from "context/StudentProvider"
import { CoordinatorContext } from "context/CoordinatorProvider"
import { OrganizationContext } from "context/OrganizationProvider"
import { TaskContext } from "context/TasksProvider"
import { RegisteredStudentContext } from "context/RegisteredStudentProvider"

export default function AdminDashboard() {
  const { fetchStudent } = useContext(StudentContext)
  const { fetchCoordinator } = useContext(CoordinatorContext)
  const { fetchOrganization } = useContext(OrganizationContext)
  const { fetchTasks, fetchSubCollection } = useContext(TaskContext)
  const { fetchRegisteredStudent } = useContext(RegisteredStudentContext)

  const student = fetchStudent.length
  const coordinator = fetchCoordinator.length
  const organization = fetchOrganization.length
  const tasks = fetchTasks.length
  const registeredStudents = fetchRegisteredStudent.length
  const taskSubmitted = fetchSubCollection.length

  const { info } = rolesHook()

  const statisticalCardAdmin = [
    {
      id: 1,
      title: "Student Trainee",
      icon: <Users />,
      counter: student,
    },
    {
      id: 2,
      title: "Coordinator",
      icon: <User />,
      counter: coordinator,
    },
    {
      id: 3,
      title: "Organization",
      icon: <Database />,
      counter: organization,
    },
  ]

  const statisticalCardCoordinator = [
    {
      id: 1,
      title: "Student",
      icon: <Users />,
      counter: registeredStudents,
    },
    {
      id: 2,
      title: "Tasks",
      icon: <FileText />,
      counter: tasks,
    },
    {
      id: 3,
      title: "Task Submitted",
      icon: <File />,
      counter: taskSubmitted,
    },
  ]

  const admin = (
    <Fragment>
      <section className="flex gap-5 w-full mb-6">
        {statisticalCardAdmin.map((type) => (
          <Card
            key={type.id}
            padding="p-5"
            additionalStyle="shadow-sm rounded-lg border-2 w-full"
          >
            <aside className="flex items-center justify-between">
              <div className="space-y-2">
                {/**Title */}
                <h1 className="font-bold text-2xl">{type.title}</h1>
                {/**Counter */}
                <span className="text-md text-slate-400 font-bold">
                  {type.counter.toLocaleString()}
                </span>
              </div>
              <div className="bg-slate-900 w-12 h-12 flex rounded-full text-white items-center justify-center">
                {type.icon}
              </div>
            </aside>
          </Card>
        ))}
      </section>

      <Barchart
        student={student}
        coordinator={coordinator}
        organization={organization}
      />
    </Fragment>
  )

  const coordinatorDashboard = (
    <Fragment>
      <section className="flex gap-5 w-full mb-6">
        {statisticalCardCoordinator.map((type) => (
          <Card
            key={type.id}
            padding="p-5"
            additionalStyle="shadow-sm rounded-lg border-2 w-full"
          >
            <aside className="flex items-center justify-between">
              <div className="space-y-2">
                {/**Title */}
                <h1 className="font-bold text-2xl">{type.title}</h1>
                {/**Counter */}
                <span className="text-md text-slate-400 font-bold">
                  {type.counter.toLocaleString()}
                </span>
              </div>
              <div className="bg-slate-900 w-12 h-12 flex rounded-full text-white items-center justify-center">
                {type.icon}
              </div>
            </aside>
          </Card>
        ))}
      </section>
    </Fragment>
  )

  const studentDashboard = <Fragment>student dashboard</Fragment>

  return (
    <Layout
      title="Dashboard"
      description="this section you will see the summary of every data and barchart"
    >
      {info.status === "admin" && admin}
      {info.status === "coordinator" && coordinatorDashboard}
      {info.status === "student" && studentDashboard}
    </Layout>
  )
}
