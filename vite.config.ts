import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Fuerza a Vite a usar UNA SOLA copia de React en todo el proyecto.
    // Sin esto, MUI puede traer su propio React y causar el error
    // "Invalid hook call" (dos copias de React en conflicto).
    dedupe: ['react', 'react-dom'],
  },
})
