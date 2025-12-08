import React, { useState, useEffect } from "react";
import "../css/Inicio.css";
import { IoSearch } from "react-icons/io5";
import { useCarrito } from "../context/CarritoContext"; // ✅ Ruta corregida

const Inicio = () => {
  const [busqueda, setBusqueda] = useState("");
  const [comidas, setComidas] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Contexto funcionando
  const { agregarProducto } = useCarrito();

  useEffect(() => {
    const cargarComidas = async () => {
      try {
        const res = await fetch("https://fastfeast-apiv2.onrender.com/api/v1/comidas");
        const data = await res.json();
        setComidas(data.data);
      } catch (error) {
        console.log("Error cargando comidas:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarComidas();
  }, []);

  return (
    <div className="inicio-container">

      <h1 className="titulo">Hola</h1>

      {/* Barra de Búsqueda */}
      <div className="search-container">
        <IoSearch className="search-icon" size={22} />
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar..."
          className="search-input"
        />
      </div>

      {/* Categorías */}
      <div className="categorias-container">
        {[
          { nombre: "Pizza", icono: "🍕" },
          { nombre: "Hamburguesa", icono: "🍔" },
          { nombre: "Saludable", icono: "🥗" },
          { nombre: "Alitas", icono: "🍗" },
          { nombre: "Mexicana", icono: "🌮" },
          { nombre: "Postres", icono: "🍪" },
          { nombre: "Comida rápida", icono: "🍟" },
          { nombre: "BBQ", icono: "🍖" },
          { nombre: "Asiática", icono: "🍜" },
          { nombre: "Italiana", icono: "🍝" },
        ].map((cat, index) => (
          <div className="categoria-item" key={index}>
            <span className="categoria-icon">{cat.icono}</span>
            <span className="categoria-text">{cat.nombre}</span>
          </div>
        ))}
      </div>

      {/* Productos desde la API */}
      <div className="productos-container">

        {loading && <p>Cargando productos...</p>}

        {!loading && comidas.length === 0 && (
          <p>No hay productos disponibles.</p>
        )}

        {!loading &&
          comidas.map((item) => (
            <div className="producto-card" key={item.id}>
              <img
                src={item.image_url}
                alt={item.name}
                className="producto-img"
              />

              <div className="producto-info">
                <p className="producto-precio">${item.price}</p>
                <p className="producto-titulo">{item.name}</p>

                {/* ✅ Botón funcionando */}
                <button
                  className="producto-add"
                  onClick={() => agregarProducto(item)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
      </div>

    </div>
  );
};

export default Inicio;
