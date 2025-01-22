import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

interface CursoInscrito {
  id: number;
  codigo: string;
  nombre: string;
  docente: string;
  aula: string;
  dia: string;
  hora_inicio: string;
  hora_fin: string;
}

const CursosInscritos: React.FC = () => {
  const [cursos, setCursos] = useState<CursoInscrito[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { estudianteId } = useParams<{ estudianteId: string }>();

  useEffect(() => {
    const fetchCursosInscritos = async () => {
      try {
        const response = await axios.get(`/estudiantes/${estudianteId}/cursos-inscritos`);
        setCursos(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los cursos inscritos");
        setLoading(false);
      }
    };

    fetchCursosInscritos();
  }, [estudianteId]);

  const handlePreview = () => {
    const url = `http://127.0.0.1:8000/api/inscripciones/reportePorEstudiante/${estudianteId}`;
    window.open(url, "_blank");
  };

  if (loading) return <p className="text-center text-gray-500">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-700">
                Mis Cursos Inscritos
            </h1>
            <button onClick={handlePreview} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Ver Reporte PDF
            </button>
        </div>
      
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Código</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Docente</th>
            <th className="border border-gray-300 px-4 py-2">Día</th>
            <th className="border border-gray-300 px-4 py-2">Horario</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso.id}>
              <td className="border border-gray-300 px-4 py-2">{curso.codigo}</td>
              <td className="border border-gray-300 px-4 py-2">{curso.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{curso.docente}</td>
              <td className="border border-gray-300 px-4 py-2">{curso.dia}</td>
              <td className="border border-gray-300 px-4 py-2">
                {curso.hora_inicio} - {curso.hora_fin}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CursosInscritos;
