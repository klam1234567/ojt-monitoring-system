import React from "react";
import { ChevronLeft } from "react-feather";
import { Link } from "react-router-dom";

export default function Back({ redirect }) {
  return (
    <Link to={redirect} className="flex items-center gap-2 mb-8">
      <ChevronLeft />
      <span className="text-md font-bold">Back</span>
    </Link>
  );
}
