import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="ml-20 mb-10 text-gray-600 text-sm">
      <ul className="flex space-x-2">
        {/* Se o usuário não estiver na página inicial, mostramos "Home" */}
        {pathnames[0] !== "pagina-inicial" && (
          <li>
            <Link to="/pagina-inicial" className="text-[#4E4C46] hover:underline">
              Pagina-inicial
            </Link>
            <span className="mx-2">/</span>
          </li>
        )}

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join(">")}`;

          return (
            <li key={to} className="flex items-center">
              {index !== 0 && <span className="mx-2">/</span>}
              <Link to={to} className="text-[#4E4C46] hover:underline capitalize">
                {value.replace("-", " ")}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};


export default Breadcrumbs;
