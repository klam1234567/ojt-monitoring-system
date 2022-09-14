import React from "react";
import { Sidebar } from "components";

export default function Layout({ children }) {
  return (
    <div className="flex justif">
      <Sidebar />
      <div className="max-w-4xl m-auto w-full h-screen">{children}</div>
    </div>
  );
}
