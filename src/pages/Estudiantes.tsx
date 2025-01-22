import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

interface Estudiante {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  codigo: string;
}

const Estudiantes: React.FC = () => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const response = await axios.get("/estudiantes");
        setEstudiantes(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los estudiantes");
        setLoading(false);
      }
    };

    fetchEstudiantes();
  }, []);

  const handleEliminar = async (id: number) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este estudiante?");
    if (!confirmar) return;

    try {
      await axios.delete(`/estudiantes/${id}`);
      setEstudiantes((prevEstudiantes) =>
        prevEstudiantes.filter((estudiante) => estudiante.id !== id)
      );
      alert("Estudiante eliminado con éxito");
    } catch (err) {
      setError("Error al eliminar el estudiante");
    }
  };

  const handleEditar = (id: number) => {
    navigate(`/editar-estudiante/${id}`);
  };

  const handleCursosDisponibles = (estudianteId: number) => {
    navigate(`/cursos-disponibles/${estudianteId}`);
  };

  const handleCursosInscritos = (estudianteId: number) => {
    navigate(`/cursos-inscritos/${estudianteId}`);
  };

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700">Estudiantes</h1>
        <button
          onClick={() => navigate("/crear-estudiante")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Crear Nuevo
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Matrícula</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Apellido</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((estudiante) => (
            <tr key={estudiante.id}>
              <td className="border border-gray-300 px-4 py-2">{estudiante.codigo}</td>
              <td className="border border-gray-300 px-4 py-2">{estudiante.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{estudiante.apellido}</td>
              <td className="border border-gray-300 px-4 py-2">{estudiante.email}</td>
              <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                <button
                  onClick={() => handleCursosDisponibles(estudiante.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Ver Cursos Disponibles
                </button>
                <button
                  onClick={() => handleEditar(estudiante.id)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(estudiante.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => handleCursosInscritos(estudiante.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Cursos Inscritos
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Estudiantes;
