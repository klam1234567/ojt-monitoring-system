import React from "react";
import { Sidebar } from "components";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-8 w-full">
        <div>
          <span className="text-3xl font-bold">Dashboard</span>
          <p className="text-gray-400 my-1 w-1/2">
            this section you will see the summary of every data and barchart
          </p>
        </div>
        <aside className="my-4 w-full">{children}</aside>
      </div>
    </div>
  );
}
