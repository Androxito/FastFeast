import React, { createContext, useContext, useState, useMemo } from "react";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // ➕ Agregar producto
  const agregarProducto = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);

      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }

      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  // ➕ Aumentar cantidad
  const aumentarCantidad = (id) => {
    setCarrito((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
      )
    );
  };

  // ➖ Disminuir cantidad
  const disminuirCantidad = (id) => {
    setCarrito((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
        )
        .filter((p) => p.cantidad > 0)
    );
  };

  // 🗑 Eliminar producto
  const eliminarProducto = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  // 💰 Total a pagar (calcula automáticamente)
  const total = useMemo(() => {
    return carrito.reduce(
      (acc, item) => acc + item.price * item.cantidad,
      0
    );
  }, [carrito]);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        aumentarCantidad,
        disminuirCantidad,
        eliminarProducto,
        total,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);
