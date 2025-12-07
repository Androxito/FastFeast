import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import InicioSesion from "./pages/InicioSesion";
import Programs from "./pages/Programs";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Inicio from "./pages/Inicio";
import Carrito from "./pages/Carrito";
import RegistroComerciante from "./pages/RegistroComerciante";
import RegistroUsuario from "./pages/RegistroUsuario";
import RegistroEstudiante from "./pages/RegistroEstudiante";
function AppLayout() {
  const location = useLocation();

  // Rutas donde NO quiero mostrar el Navbar
   // Rutas donde NO quiero mostrar el Navbar
  const hideNavbarRoutes = ["/inicio-sesion", "/registro-comerciante", 
    "/registro-usuario", "/registro-estudiante"
  ];
  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <main className="w-full min-h-screen bg-neutral-50 text-neutral-600">
        <Routes>
          <Route path="/Inicio" element={<Inicio/>} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/registro-comerciante" element={<RegistroComerciante />} />
            <Route path="/registro-estudiante" element={<RegistroEstudiante />} />
          {/* Página sin Navbar */}
          <Route path="/inicio-sesion" element={<InicioSesion />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
