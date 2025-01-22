import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
      setError("Hubo un problema al cerrar sesión. Intenta nuevamente.");
    }
  };

  const menuItems = [
    { name: "Inicio", path: "/" },
    { name: "Períodos Académicos", path: "/periodos-academicos" },
    { name: "Cursos", path: "/cursos" },
    { name: "Estudiantes", path: "/estudiantes" },
  ];

  return (
    <aside className="bg-gray-800 text-white h-screen w-64 flex flex-col fixed md:relative">
      <h1 className="text-2xl font-bold text-center p-6 border-b border-gray-600">
        Sistema de Inscripción
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

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Cerrar Sesión
        </button>
        {error && <p className="text-center text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <div className="mt-auto p-4 border-t border-gray-600">
        <p className="text-sm text-gray-400 text-center">
          &copy; 2025 Hector Fuentes
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
