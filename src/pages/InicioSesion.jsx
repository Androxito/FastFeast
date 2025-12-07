import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useState } from "react";

const InicioSesion = () => {
  const navigate = useNavigate();

  const [tipoUsuario, setTipoUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!tipoUsuario) {
      return alert("Selecciona si eres Comerciante o Estudiante");
    }

    try {
      const res = await fetch(
        "https://fastfeast-apiv2.onrender.com/api/v1/usuarios/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      console.log("LOGIN:", data);

      if (!res.ok) {
        return alert("❌ Error al iniciar sesión: " + data.detail);
      }

      // GUARDAR SESIÓN DEL USUARIO
      localStorage.setItem("usuario", JSON.stringify(data.data));

      // SI ES COMERCIANTE, TRAE PERFIL COMPLETO
      if (tipoUsuario === "comerciante") {
        const profileRes = await fetch(
          `https://fastfeast-apiv2.onrender.com/api/v1/comerciantes/owner/${data.data.id}`
        );

        const comerciante = await profileRes.json();
        localStorage.setItem("comerciante", JSON.stringify(comerciante.data));
      }

      navigate("/inicio"); // REDIRECCIÓN AL INICIO

    } catch (error) {
      console.error(error);
      alert("Error inesperado al iniciar sesión.");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start px-6 py-10 bg-white">
      <div className="w-full max-w-md mb-4">
        <button
          onClick={() => navigate("/inicio")}
          className="flex items-center gap-2 text-sky-600 text-lg font-medium"
        >
          <IoArrowBack size={22} />
          Regresar
        </button>
      </div>

      <h1 className="text-3xl font-bold text-neutral-800 mb-8">Iniciar Sesión</h1>

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-xl p-6 shadow-md border border-neutral-200"
      >
        <p className="text-neutral-800 font-semibold mb-3">¿Cómo deseas ingresar?</p>

        <div className="flex flex-row gap-6 mb-6">
          <label className="flex items-center gap-2 text-neutral-700 cursor-pointer">
            <input
              type="radio"
              name="tipoUsuario"
              value="comerciante"
              checked={tipoUsuario === "comerciante"}
              onChange={() => setTipoUsuario("comerciante")}
              className="accent-sky-600 w-5 h-5"
            />
            Comerciante
          </label>

          <label className="flex items-center gap-2 text-neutral-700 cursor-pointer">
            <input
              type="radio"
              name="tipoUsuario"
              value="estudiante"
              checked={tipoUsuario === "estudiante"}
              onChange={() => setTipoUsuario("estudiante")}
              className="accent-sky-600 w-5 h-5"
            />
            Estudiante
          </label>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Correo Electrónico
          </label>
          <input
            type="email"
            placeholder="ejemplo@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition"
          />
        </div>

        {/* Contraseña */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="Tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-sky-600 text-white font-medium rounded-lg text-base hover:bg-sky-700 transition"
        >
          Iniciar Sesión
        </button>

        {/* Enlace dinámico */}
        {tipoUsuario && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navigate(`/registro-${tipoUsuario}`)}
              className="text-sky-600 hover:underline text-sm"
            >
              Registrarte como {tipoUsuario}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default InicioSesion;
