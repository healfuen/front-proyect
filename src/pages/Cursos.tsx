import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

interface Curso {
  id: number;
  codigo: string;
  nombre: string;
  docente: string;
  aula: string;
  dia: string;
  hora_inicio: string;
  hora_fin: string;
  cupo: number;
  periodo_id: number;
}

const Cursos: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get("/cursos");
        setCursos(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los cursos");
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  const handleEliminar = async (id: number) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este curso?");
    if (!confirmar) return;

    try {
      await axios.delete(`/cursos/${id}`);
      setCursos((prevCursos) => prevCursos.filter((curso) => curso.id !== id));
      alert("Curso eliminado con éxito");
    } catch (err) {
      setError("Error al eliminar el curso");
    }
  };

  const handleEditar = (id: number) => {
    navigate(`/editar-curso/${id}`);
  };

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700">Cursos</h1>
        <button
          onClick={() => navigate("/crear-curso")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Crear Nuevo
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Código</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Docente</th>
            <th className="border border-gray-300 px-4 py-2">Aula</th>
            <th className="border border-gray-300 px-4 py-2">Día</th>
            <th className="border border-gray-300 px-4 py-2">Hora Inicio</th>
            <th className="border border-gray-300 px-4 py-2">Hora Fin</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso.id}>
              <td className="border border-gray-300 px-4 py-2">{curso.codigo}</td>
              <td className="border border-gray-300 px-4 py-2">{curso.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{curso.docente}</td>
              <td className="border border-gray-300 px-4 py-2">{curso.aula}</td>
              <td className="border border-gray-300 px-4 py-2">{curso.dia}</td>
              <td className="border border-gray-300 px-4 py-2">{curso.hora_inicio}</td>
              <td className="border border-gray-300 px-4 py-2">{curso.hora_fin}</td>
              <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                <button
                  onClick={() => handleEditar(curso.id)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(curso.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cursos;
