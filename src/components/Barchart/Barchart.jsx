import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Barchart() {
  const data = [
    {
      name: "Student Trainee",
      value: 4000,
    },
    {
      name: "Coordinator",
      value: 3000,
    },
    {
      name: "Organization",
      value: 2000,
    },
  ];

  return (
    <div>
      <aside className="my-8 space-y-2">
        <h1 className="font-bold text-3xl">Statistical Data</h1>
        {/* <p className="w-1/3 text-gray-400">
          this data shows how many does Student Trainee, Coordinator and
          Organization have.
        </p> */}
      </aside>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          {/* <Bar dataKey="pv" fill="#8884d8" /> */}
          <Bar dataKey="value" name="Student Trainee" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}