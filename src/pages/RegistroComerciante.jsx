import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MapaSelector from "../components/MapaSelector";
import "../css/RegistroComerciante.css";

const RegistroComerciante = () => {
  const navigate = useNavigate();

  // STEP CONTROLLER
  const [step, setStep] = useState(1);

  // Datos del usuario (Paso 1)
  const [userForm, setUserForm] = useState({
    email: "",
    password_hash: "",
    user_type: "merchant",
  });

  // Datos del comerciante (Paso 2)
  const [merchantForm, setMerchantForm] = useState({
    owner_id: "",
    name: "",
    description: "",
    logo_url: "",
    location_latitude: "",
    location_longitude: "",
    address: "",
    opening_time: "",
    closing_time: "",
    is_validated: false,
  });

  // MANEJO DE INPUTS ------------------------
  const handleUserChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleMerchantChange = (e) => {
    setMerchantForm({ ...merchantForm, [e.target.name]: e.target.value });
  };

  const handleLocationSelect = (lat, lng) => {
    setMerchantForm({
      ...merchantForm,
      location_latitude: lat.toString(),
      location_longitude: lng.toString(),
    });
  };

  const convertToFullTime = (t) => t + ":00";

  // STEP 1: CREAR USUARIO ---------------------
  const handleUserSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://fastfeast-apiv2.onrender.com/api/v1/usuarios",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userForm.email,
            password_hash: userForm.password_hash, // el backend lo hashea
            user_type: "merchant",
          }),
        }
      );

      const data = await res.json();
      console.log("DATA DEL USUARIO:", data);

      if (!res.ok) {
        alert("Error creando usuario: " + JSON.stringify(data));
        return;
      }

      alert("Usuario creado correctamente ✔");

      // Guardar owner_id REAL
      setMerchantForm((prev) => ({
        ...prev,
        owner_id: data.data.id,  // ✔ CORREGIDO
      }));

      setStep(2);

    } catch (error) {
      console.error(error);
      alert("Error al registrar usuario.");
    }
  };

  // STEP 2: CREAR COMERCIANTE -----------------
  const handleMerchantSubmit = async (e) => {
    e.preventDefault();

    if (!merchantForm.location_latitude || !merchantForm.location_longitude) {
      return alert("Debes seleccionar una ubicación en el mapa 🗺️");
    }

    const fixedForm = {
      ...merchantForm,
      opening_time: convertToFullTime(merchantForm.opening_time),
      closing_time: convertToFullTime(merchantForm.closing_time),
    };

    try {
      const res = await fetch(
        "https://fastfeast-apiv2.onrender.com/api/v1/comerciantes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fixedForm),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert("Error creando comerciante: " + JSON.stringify(data));
        return;
      }

      alert("Comerciante creado correctamente ✔");
      navigate("/inicio-sesion");

    } catch (error) {
      console.error(error);
      alert("Error al registrar comerciante.");
    }
  };

  // UI ------------------------------
  return (
    <div className="registro-container fade-in">

      <button className="btn-regresar" onClick={() => navigate("/inicio-sesion")}>
        ⬅ Regresar
      </button>

      {/* ====================== STEP 1 ====================== */}
      {step === 1 && (
        <>
          <h2 className="registro-title">Crear Cuenta de Comerciante</h2>

          <form className="registro-form" onSubmit={handleUserSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              onChange={handleUserChange}
              required
            />

            <input
              type="password"
              name="password_hash"
              placeholder="Contraseña"
              onChange={handleUserChange}
              required
            />

            <button type="submit" className="btn-submit">
              Continuar ➜
            </button>
          </form>
        </>
      )}

      {/* ====================== STEP 2 ====================== */}
      {step === 2 && (
        <>
          <h2 className="registro-title">Datos del Negocio</h2>

          <form className="registro-form" onSubmit={handleMerchantSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nombre del negocio"
              onChange={handleMerchantChange}
              required
            />

            <textarea
              name="description"
              placeholder="Descripción"
              onChange={handleMerchantChange}
            />

            <input
              type="text"
              name="logo_url"
              placeholder="Logo URL"
              onChange={handleMerchantChange}
            />

            <label>Seleccionar ubicación en el mapa</label>
            <MapaSelector onSelect={handleLocationSelect} />

            <input
              type="text"
              name="address"
              placeholder="Dirección"
              onChange={handleMerchantChange}
            />

            <label>Horario de apertura</label>
            <input
              type="time"
              name="opening_time"
              onChange={handleMerchantChange}
              required
            />

            <label>Horario de cierre</label>
            <input
              type="time"
              name="closing_time"
              onChange={handleMerchantChange}
              required
            />

            <button type="submit" className="btn-submit">
              Registrar Comerciante ✔
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default RegistroComerciante;
