import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

interface Periodo {
  id: number;
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
}

const PeriodosAcademicos: React.FC = () => {
  const [periodos, setPeriodos] = useState<Periodo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPeriodos = async () => {
      try {
        const response = await axios.get("/periodos");
        setPeriodos(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los períodos académicos");
        setLoading(false);
      }
    };

    fetchPeriodos();
  }, []);

  const handleEliminar = async (id: number) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este período?");
    if (!confirmar) return;

    try {
      await axios.delete(`/periodos/${id}`);
      setPeriodos((prevPeriodos) => prevPeriodos.filter((periodo) => periodo.id !== id));
      alert("Período eliminado con éxito");
    } catch (err) {
      setError("Error al eliminar el período académico");
    }
  };

  const handleEditar = (id: number) => {
    navigate(`/editar-periodo/${id}`);
  };

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700">Períodos Académicos</h1>
        <button
          onClick={() => navigate("/crear-periodo")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Crear Nuevo
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Fecha Inicio</th>
            <th className="border border-gray-300 px-4 py-2">Fecha Fin</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {periodos.map((periodo) => (
            <tr key={periodo.id}>
              <td className="border border-gray-300 px-4 py-2">{periodo.id}</td>
              <td className="border border-gray-300 px-4 py-2">{periodo.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{periodo.fecha_inicio}</td>
              <td className="border border-gray-300 px-4 py-2">{periodo.fecha_fin}</td>
              <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2">
                <button
                  onClick={() => handleEditar(periodo.id)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(periodo.id)}
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

export default PeriodosAcademicos;
