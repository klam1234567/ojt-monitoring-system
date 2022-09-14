import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarList } from "data";

export default function Sidebar() {
  const query = useLocation();

  return (
    <section className="relative">
      <aside className="bg-slate-900 w-1/5 h-screen fixed shadow-lg py-12 px-4">
        <div className="flex content-center justify-center">
          <img
            src="/images/profile_avatar.jpg"
            className="rounded-full w-44 h-44 border-2 border-gray-500 object-cover"
            alt=""
          />
        </div>
        <ul className="space-y-3 mt-10">
          {sidebarList.map((type) => {
            return (
              <li key={type.id}>
                <Link
                  to={type.path}
                  className={`${
                    type.path === query.pathname
                      ? "bg-slate-800 text-white"
                      : "text-slate-600"
                  } flex items-center hover:text-white hover:bg-slate-800 cursor-pointer transition-all rounded-sm py-2`}
                >
                  <i className="mx-2 ml-3">{type.icon}</i>
                  <span className="text-sm">{type.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </section>
  );
}
