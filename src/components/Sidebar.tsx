import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  const menuItems = [
    { name: "Inicio", path: "/" },
    { name: "Períodos Académicos", path: "/periodos-academicos" },
    { name: "Cursos", path: "/cursos" },
    { name: "Contacto", path: "/contact" },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <h1 className="text-2xl font-bold text-center p-6 border-b border-gray-600">
        Mi Aplicación
      </h1>

      <nav className="flex-1">
        <ul className="space-y-4 p-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block py-2 px-4 rounded ${
                    isActive
                      ? "bg-blue-500 font-bold"
                      : "hover:bg-gray-700 hover:font-semibold"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-600">
        <p className="text-sm text-gray-400 text-center">
          &copy; 2025 Mi Aplicación
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
