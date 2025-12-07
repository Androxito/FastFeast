import React from "react";
import { useCarrito } from "../context/CarritoContext";
import "../css/carrito.css";

const Carrito = () => {
  const {
    carrito,
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto,
    total,
  } = useCarrito();

  return (
    <div className="carrito-page">   {/* 👈 YA TIENE ESPACIO BAJO EL NAVBAR */}

      <div className="carrito-container animate-slideUp">

        <h1 className="carrito-title">Tu Pedido 🛒</h1>

        {carrito.length === 0 ? (
          <p className="carrito-vacio">Tu carrito está vacío.</p>
        ) : (
          <div className="carrito-lista">
            {carrito.map((item) => (
              <div className="carrito-item animate-fadeIn" key={item.id}>
                
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="carrito-img"
                />

                <div className="carrito-info">
                  <p className="carrito-nombre">{item.name}</p>
                  <p className="carrito-precio">${item.price}</p>

                  <div className="carrito-controles">
                    <button
                      className="btn-control"
                      onClick={() => disminuirCantidad(item.id)}
                    >
                      -
                    </button>

                    <span className="cantidad">{item.cantidad}</span>

                    <button
                      className="btn-control"
                      onClick={() => aumentarCantidad(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="carrito-eliminar"
                  onClick={() => eliminarProducto(item.id)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}

        {carrito.length > 0 && (
          <div className="carrito-bottom animate-fadeIn">
            <p className="carrito-total">
              Total a pagar: <strong>${total}</strong>
            </p>

            <button className="btn-pagar">
              Pagar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrito;
