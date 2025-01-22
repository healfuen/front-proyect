import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PeriodosAcademicos from "./pages/PeriodosAcademicos";
import FormularioPeriodo from "./pages/FormularioPeriodo";
import Cursos from "./pages/Cursos";
import FormularioCurso from "./pages/FormularioCurso";
import Estudiantes from "./pages/Estudiantes";
import FormularioEstudiante from "./pages/FormularioEstudiante";
import CursosDisponibles from "./pages/CursosDisponibles";
import CursosInscritos from "./pages/CursosInscritos";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./pages/Register";
import "./index.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/periodos-academicos" element={<PeriodosAcademicos />} />
              <Route path="/crear-periodo" element={<FormularioPeriodo />} />
              <Route path="/editar-periodo/:id" element={<FormularioPeriodo />} />
              <Route path="/cursos" element={<Cursos />} />
              <Route path="/crear-curso" element={<FormularioCurso />} />
              <Route path="/editar-curso/:id" element={<FormularioCurso />} />
              <Route path="/estudiantes" element={<Estudiantes />} />
              <Route path="/crear-estudiante" element={<FormularioEstudiante />} />
              <Route path="/editar-estudiante/:id" element={<FormularioEstudiante />} />
              <Route path="/cursos-disponibles/:estudianteId" element={<CursosDisponibles />} />
              <Route path="/cursos-inscritos/:estudianteId" element={<CursosInscritos />} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
      </Routes>
    </Router>
  );
};

export default App;
