import React, { useContext } from "react"
import { StudentContext } from "context/StudentProvider"
import { CoordinatorContext } from "context/CoordinatorProvider"
import { OrganizationContext } from "context/OrganizationProvider"
import { Users, User, Database } from "react-feather"
import { Layout, Card, Barchart } from "components"

export default function AdminDashboard() {
  const { fetchStudent } = useContext(StudentContext)
  const { fetchCoordinator } = useContext(CoordinatorContext)
  const { fetchOrganization } = useContext(OrganizationContext)

  const student = fetchStudent.length
  const coordinator = fetchCoordinator.length
  const organization = fetchOrganization.length

  const statisticalCard = [
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

  return (
    <Layout
      title="Dashboard"
      description="this section you will see the summary of every data and barchart"
    >
      <section className="flex gap-5 w-full mb-6">
        {statisticalCard.map((type) => (
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
    </Layout>
  )
}
