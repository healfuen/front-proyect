import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";

const FormularioEstudiante: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [codigo, setMatricula] = useState<string>("");

  useEffect(() => {
    if (id) {
      const fetchEstudiante = async () => {
        const response = await axios.get(`/estudiantes/${id}`);
        const estudiante = response.data.data;
        setNombre(estudiante.nombre);
        setApellido(estudiante.apellido);
        setEmail(estudiante.email);
        setMatricula(estudiante.codigo);
      };

      fetchEstudiante();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const estudianteData = {
      nombre,
      apellido,
      email,
      codigo,
    };

    try {
      if (id) {
        await axios.put(`/estudiantes/${id}`, estudianteData);
        alert("Estudiante actualizado con éxito");
      } else {
        await axios.post(`/estudiantes`, estudianteData);
        alert("Estudiante creado con éxito");
      }

      navigate("/estudiantes");
    } catch (err) {
      alert("Error al guardar los datos del estudiante");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        {id ? "Editar Estudiante" : "Crear Estudiante"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
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

export default FormularioEstudiante;
