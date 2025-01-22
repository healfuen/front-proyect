import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  inscritos: number;
}

const CursosDisponibles: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { estudianteId } = useParams<{ estudianteId: string }>();

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get(`cursos/cursos-disponibles/${estudianteId}`);
        setCursos(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los cursos disponibles");
        setLoading(false);
      }
    };

    fetchCursos();
  }, [estudianteId]);

  const handleInscribirse = async (cursoId: number) => {
    try {
      await axios.post("/inscripciones", { curso_id: cursoId, estudiante_id: estudianteId });
      alert("Inscripción realizada con éxito");
      setCursos((prevCursos) =>
        prevCursos.filter((curso) => curso.id !== cursoId)
      );
    } catch (err: any) {
      alert(err.response?.data?.message || "Error al inscribirse");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">
        Cursos Disponibles
      </h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Código</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Docente</th>
            <th className="border border-gray-300 px-4 py-2">Día</th>
            <th className="border border-gray-300 px-4 py-2">Hora Inicio</th>
            <th className="border border-gray-300 px-4 py-2">Hora Fin</th>
            <th className="border border-gray-300 px-4 py-2">Cupo</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso.id}>
              <td className="border border-gray-300 px-4 py-2">{curso.codigo}</td>
              <td className="border border-gray-300 px-4 py-2">{curso.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{curso.docente}</td>
              <td className="border border-gray-300 px-4 py-2">{curso.dia}</td>
              <td className="border border-gray-300 px-4 py-2">{curso.hora_inicio}</td>
              <td className="border border-gray-300 px-4 py-2">{curso.hora_fin}</td>
              <td className="border border-gray-300 px-4 py-2">
                {curso.inscritos}/{curso.cupo}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleInscribirse(curso.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Inscribirse
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CursosDisponibles;
