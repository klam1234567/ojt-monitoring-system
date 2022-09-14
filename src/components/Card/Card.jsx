import React from "react";

export default function Card({ children, padding }) {
  return (
    <div className="flex justify-center self-center z-40">
      <div className={`${padding} bg-white mx-auto rounded-lg w-100`}>
        {children}
      </div>
    </div>
  );
}
