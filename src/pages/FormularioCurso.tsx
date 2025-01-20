import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";

interface Periodo {
  id: number;
  nombre: string;
}

const FormularioCurso: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [codigo, setCodigo] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [docente, setDocente] = useState<string>("");
  const [aula, setAula] = useState<string>("");
  const [dia, setDia] = useState<string>("Lunes");
  const [horaInicio, setHoraInicio] = useState<string>("08:00");
  const [horaFin, setHoraFin] = useState<string>("10:00");
  const [cupo, setCupo] = useState<number>(40);
  const [periodoId, setPeriodoId] = useState<number | null>(null);

  // Lista de periodos para el selector
  const [periodos, setPeriodos] = useState<Periodo[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos del curso si estamos en modo edición
  useEffect(() => {
    const fetchCurso = async () => {
      try {
        if (id) {
          const response = await axios.get(`/cursos/${id}`);
          const curso = response.data.data;
          setCodigo(curso.codigo);
          setNombre(curso.nombre);
          setDocente(curso.docente);
          setAula(curso.aula);
          setDia(curso.dia);
          setHoraInicio(curso.hora_inicio);
          setHoraFin(curso.hora_fin);
          setCupo(curso.cupo);
          setPeriodoId(curso.periodo_academico_id); // Asigna el período correspondiente
        }
      } catch (err) {
        setError("Error al cargar los datos del curso");
      } finally {
        setLoading(false);
      }
    };

    fetchCurso();
  }, [id]);

  // Cargar la lista de periodos
  useEffect(() => {
    const fetchPeriodos = async () => {
      try {
        const response = await axios.get("/periodos");
        setPeriodos(response.data.data); // Asume que la respuesta tiene los datos en `data`
      } catch (err) {
        setError("Error al cargar los períodos");
      }
    };

    fetchPeriodos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cursoData = {
      codigo,
      nombre,
      docente,
      aula,
      dia,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
      cupo,
      periodo_academico_id: periodoId,
    };

    try {
      if (id) {
        await axios.put(`/cursos/${id}`, cursoData);
        alert("Curso actualizado con éxito");
      } else {
        await axios.post(`/cursos`, cursoData);
        alert("Curso creado con éxito");
      }

      navigate("/cursos");
    } catch (err) {
      setError("Error al guardar los datos del curso");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        {id ? "Editar Curso" : "Crear Curso"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Código:</label>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>
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
          <label className="block text-gray-700">Docente:</label>
          <input
            type="text"
            value={docente}
            onChange={(e) => setDocente(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Aula:</label>
          <input
            type="text"
            value={aula}
            onChange={(e) => setAula(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Día:</label>
          <select
            value={dia}
            onChange={(e) => setDia(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          >
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miércoles">Miércoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Hora Inicio:</label>
          <input
            type="time"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Hora Fin:</label>
          <input
            type="time"
            value={horaFin}
            onChange={(e) => setHoraFin(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Cupo:</label>
          <input
            type="number"
            value={cupo}
            onChange={(e) => setCupo(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Período:</label>
          <select
            value={periodoId ?? ""}
            onChange={(e) => setPeriodoId(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            required
          >
            <option value="" disabled>
              Seleccione un período
            </option>
            {periodos.map((periodo) => (
              <option key={periodo.id} value={periodo.id}>
                {periodo.nombre}
              </option>
            ))}
          </select>
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

export default FormularioCurso;
