import React from "react";

const About = () => {
  const comerciante = JSON.parse(localStorage.getItem("comerciante"));
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!comerciante || !usuario) {
    return <p className="text-center mt-10">No hay usuario autenticado</p>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Perfil del Comerciante</h2>

      <div className="bg-white p-4 shadow rounded-lg border">
        <p><strong>Nombre:</strong> {comerciante.name}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Descripción:</strong> {comerciante.description}</p>
        <p><strong>Dirección:</strong> {comerciante.address}</p>

        <p className="mt-2">
          <strong>Horario:</strong> {comerciante.opening_time} - {comerciante.closing_time}
        </p>

        <p>
          <strong>Validado:</strong> {comerciante.is_validated ? "Sí" : "No"}
        </p>

        <hr className="my-3" />

        <p><strong>Latitud:</strong> {comerciante.location_latitude}</p>
        <p><strong>Longitud:</strong> {comerciante.location_longitude}</p>
      </div>
    </div>
  );
};

export default About;
