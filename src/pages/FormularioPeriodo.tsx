import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const FormularioPeriodo: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtenemos el ID desde la URL (si existe)
  const navigate = useNavigate();

  const [nombre, setNombre] = useState<string>("");
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFin, setFechaFin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos si estamos editando
  useEffect(() => {
    if (id) {
      const fetchPeriodo = async () => {
        try {
          const response = await axios.get(`/periodos/${id}`);
          const periodo = response.data.data;
          setNombre(periodo.nombre);
          setFechaInicio(periodo.fecha_inicio);
          setFechaFin(periodo.fecha_fin);
        } catch (err) {
          setError("Error al cargar los datos del período");
        } finally {
          setLoading(false);
        }
      };

      fetchPeriodo();
    } else {
      setLoading(false); // No estamos editando, no hay datos que cargar
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        // Editar período
        await axios.put(`/periodos/${id}`, {
          nombre,
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
        });
        alert("Período actualizado con éxito");
      } else {
        // Crear nuevo período
        await axios.post("/periodos", {
          nombre,
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
        });
        alert("Período creado con éxito");
      }
      navigate("/periodos-academicos"); // Redirigir después de guardar
    } catch (error) {
      setError("Error al guardar los cambios");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-700 mb-4">
        {id ? "Editar Período Académico" : "Crear Período Académico"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Fecha Inicio:</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Fecha Fin:</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {id ? "Guardar Cambios" : "Crear"}
        </button>
      </form>
    </div>
  );
};

export default FormularioPeriodo;
