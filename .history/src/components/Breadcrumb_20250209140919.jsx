import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();

  // Quebra a URL em partes
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="text-gray-600 text-sm">
      <ul className="flex space-x-2">
        <li>
          <Link to="/" className="text-blue-500 hover:underline">
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <li key={to} className="flex items-center">
              <span className="mx-2">/</span>
              <Link to={to} className="text-blue-500 hover:underline capitalize">
                {value.replace("-", " ")}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
