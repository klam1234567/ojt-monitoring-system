import React from "react";
import { Users, User, Database } from "react-feather";
import { Layout, Card, Barchart } from "components";

export default function AdminDashboard() {
  const statisticalCard = [
    {
      id: 1,
      title: "Student Trainee",
      icon: <Users />,
      counter: 100,
    },
    {
      id: 2,
      title: "Coordinator",
      icon: <User />,
      counter: 100,
    },
    {
      id: 3,
      title: "Organization",
      icon: <Database />,
      counter: 100,
    },
  ];

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
                  {type.counter.toLocaleString()}.00
                </span>
              </div>
              <div className="bg-slate-900 w-12 h-12 flex rounded-full text-white items-center justify-center">
                {type.icon}
              </div>
            </aside>
          </Card>
        ))}
      </section>

      <Barchart />
    </Layout>
  );
}
