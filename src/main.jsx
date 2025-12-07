import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CarritoProvider } from "./context/CarritoContext";
// src/main.jsx
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => console.log("Service Worker registrado"))
      .catch((err) => console.log("Error al registrar SW", err));
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <CarritoProvider>
    <App />
  </CarritoProvider>
  </StrictMode>,
)
