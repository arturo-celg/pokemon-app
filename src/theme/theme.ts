// ============================================================
// TEMA PERSONALIZADO DE MUI
// ============================================================
// MUI permite personalizar los colores, tipografías y estilos
// globales de toda la app desde un solo lugar.
// "createTheme" genera ese objeto de configuración global.
// ============================================================

import { createTheme } from '@mui/material';

// Exportamos el tema para usarlo en App.tsx con <ThemeProvider>
export const theme = createTheme({
  // "palette" define la paleta de colores de la app
  palette: {
    // "primary" es el color principal (botones, barras de navegación, etc.)
    primary: {
      main: '#EF5350', // Rojo Pokémon
    },
    // "secondary" es el color de acento (chips, detalles, etc.)
    secondary: {
      main: '#FDD835', // Amarillo Pokémon (color de Pikachu)
    },
    // "background" controla el fondo de la app
    background: {
      default: '#f5f5f5', // Gris muy claro para el fondo general
    },
  },

  // "typography" controla los estilos de texto globales
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    // Podemos personalizar cada variante de texto por separado
    h6: {
      fontWeight: 700, // Títulos en negrita
    },
  },
});
