// ============================================================
// MAIN.TSX - Punto de entrada de la aplicación
// ============================================================
// Este es el primer archivo que se ejecuta.
// Su único trabajo es "montar" la app de React dentro del HTML.
// Solo necesitarás modificar este archivo en casos muy específicos.
// ============================================================

// StrictMode: modo estricto de React
// En desarrollo, ejecuta cada componente DOS VECES para detectar
// posibles errores o efectos secundarios no intencionados.
// En producción (npm run build) se desactiva automáticamente.
import { StrictMode } from 'react'

// createRoot: función que conecta React con el HTML
// Le dice a React "aquí es donde vas a renderizar la app"
import { createRoot } from 'react-dom/client'

// Estilos CSS globales básicos (fondo, márgenes, etc.)
import './index.css'

// El componente principal de nuestra app
import App from './App.tsx'

// document.getElementById('root') busca el <div id="root"> en index.html
// El "!" al final le dice a TypeScript "confía en mí, este elemento existe"
// (operador de aserción non-null - le decimos a TS que no será null)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Montamos toda nuestra app aquí */}
    <App />
  </StrictMode>,
)

