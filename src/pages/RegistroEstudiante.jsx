import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import "../css/RegistroEstudiante.css";

const RegistroEstudiante = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
    student_id_number: "",
    full_name: "",
    profile_picture_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // --------------------
  // STEP 1 - CREAR USUARIO
  // --------------------
  // STEP 1 - CREAR USUARIO
const handleCreateUser = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(
      "https://fastfeast-apiv2.onrender.com/api/v1/usuarios",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password_hash: form.password,  // 👈 sin hash, el backend lo generará
          user_type: "student",
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert("❌ Error creando usuario: " + JSON.stringify(data));
      return;
    }

    setUserId(data.data.id);
    setStep(2);

  } catch (error) {
    console.error(error);
    alert("❌ Error creando usuario");
  }
};



  // --------------------
  // STEP 2 - CREAR ESTUDIANTE
  // --------------------
  const handleCreateStudent = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://fastfeast-apiv2.onrender.com/api/v1/estudiantes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            student_id_number: form.student_id_number,
            full_name: form.full_name,
            profile_picture_url: form.profile_picture_url,
            is_verified: false,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert("❌ Error creando estudiante: " + JSON.stringify(data));
        return;
      }

      alert("✔ Estudiante registrado correctamente");
      navigate("/inicio-sesion");

    } catch (error) {
      alert("❌ Error creando estudiante");
      console.error(error);
    }
  };

  return (
    <div className="estudiante-container fade-in">

      <button className="btn-regresar" onClick={() => navigate("/inicio-sesion")}>
        <IoArrowBack size={22} /> Regresar
      </button>

      <h2 className="estudiante-title">Registro de Estudiante</h2>

      {/* ---------------------- STEP 1 ---------------------- */}
      {step === 1 && (
        <form className="estudiante-form" onSubmit={handleCreateUser}>
          <h3 className="step-title">Paso 1: Crear usuario</h3>

          <input
            type="email"
            name="email"
            placeholder="Correo institucional"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            onChange={handleChange}
          />

          <button type="submit" className="btn-submit">
            Continuar
          </button>
        </form>
      )}

      {/* ---------------------- STEP 2 ---------------------- */}
      {step === 2 && (
        <form className="estudiante-form" onSubmit={handleCreateStudent}>
          <h3 className="step-title">Paso 2: Datos del estudiante</h3>

          <input
            type="text"
            name="student_id_number"
            placeholder="Número de estudiante"
            required
            onChange={handleChange}
          />

          <input
            type="text"
            name="full_name"
            placeholder="Nombre completo"
            required
            onChange={handleChange}
          />

          <input
            type="text"
            name="profile_picture_url"
            placeholder="URL de foto (opcional)"
            onChange={handleChange}
          />

          <button type="submit" className="btn-submit">
            Registrar Estudiante
          </button>
        </form>
      )}
    </div>
  );
};

export default RegistroEstudiante;
