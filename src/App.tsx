import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PeriodosAcademicos from "./pages/PeriodosAcademicos";
import FormularioPeriodo from "./pages/FormularioPeriodo";
import Cursos from "./pages/Cursos";
import FormularioCurso from "./pages/FormularioCurso";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Home from "./pages/Home";
import "./index.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/periodos-academicos" element={<PeriodosAcademicos />} />
          <Route path="/crear-periodo" element={<FormularioPeriodo />} />
          <Route path="/editar-periodo/:id" element={<FormularioPeriodo />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/crear-curso" element={<FormularioCurso />} />
          <Route path="/editar-curso/:id" element={<FormularioCurso />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
