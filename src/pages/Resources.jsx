import React, { useState } from "react";

const Resources = () => {
  // Valores ocultos
  const HIDDEN_VALUES = {
    merchant_id: "a09951f1-981e-4cda-ab28-58c8bda25696",
    category_id: "523dfe73-8ade-4492-a0e1-e364085a0492"
  };

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image_url: "",
    is_available: true,
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();

    const body = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      category: form.category,
      image_url: form.image_url,
      is_available: form.is_available,

      // Campos ocultos
      merchant_id: HIDDEN_VALUES.merchant_id,
      category_id: HIDDEN_VALUES.category_id
    };

    try {
      const res = await fetch(
        "https://fastfeast-apiv2.onrender.com/api/v1/comidas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMensaje("Platillo creado correctamente 🎉");
        setForm({
          name: "",
          description: "",
          price: "",
          category: "",
          image_url: "",
          is_available: true
        });
      } else {
        setMensaje("Error: " + JSON.stringify(data));
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor");
    }
  };

  return (
    <div className="flex justify-center p-4 md:p-8 mt-15">
      <div className="w-full max-w-3xl bg-white p-6 md:p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Crear Platillo
        </h1>

        {mensaje && (
          <div className="p-3 bg-blue-200 text-blue-700 rounded mb-6 text-center">
            {mensaje}
          </div>
        )}

        <form onSubmit={enviarFormulario} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Nombre */}
          <div className="flex flex-col">
            <label className="font-semibold">Nombre:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Categoría */}
          <div className="flex flex-col">
            <label className="font-semibold">Categoría:</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Descripción */}
          <div className="col-span-1 md:col-span-2 flex flex-col">
            <label className="font-semibold">Descripción:</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              rows="3"
              required
            />
          </div>

          {/* Precio */}
          <div className="flex flex-col">
            <label className="font-semibold">Precio:</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* URL de la imagen */}
          <div className="flex flex-col">
            <label className="font-semibold">URL de la imagen:</label>
            <input
              type="text"
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Disponible */}
          <div className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              name="is_available"
              checked={form.is_available}
              onChange={handleChange}
            />
            <label className="font-semibold">Disponible</label>
          </div>

          {/* Botón */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
            >
              Crear Platillo
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Resources;
