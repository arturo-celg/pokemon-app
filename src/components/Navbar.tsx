// ============================================================
// COMPONENTE: Navbar.tsx
// ============================================================
// Un componente en React es una función que devuelve HTML (JSX).
// Este componente es la barra de navegación superior de la app.
//
// "tsx" = TypeScript + JSX (JSX es la sintaxis mezcla de JS y HTML
// que usa React para describir la interfaz)
// ============================================================

// Importamos los componentes de MUI que vamos a usar:
// - AppBar: la barra superior (como el header de una página)
// - Toolbar: contenedor interno del AppBar que alinea los elementos
// - Typography: componente de texto con estilos predefinidos
// - Box: como un <div> pero con las utilidades de MUI
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

// Ícono de la pokeball de MUI Icons
// MUI tiene miles de íconos listos para usar
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

// Definimos el componente como una función (arrow function)
// No recibe props porque la Navbar no necesita datos del exterior
const Navbar = () => {
  // Todo componente de React devuelve JSX (el "HTML" del componente)
  return (
    // AppBar crea la barra superior roja (usa el color "primary" del tema)
    <AppBar position="static">
      {/* Toolbar alinea los elementos horizontalmente */}
      <Toolbar>
        {/* Ícono de pokeball con margen derecho (mr=margin-right, 2=16px) */}
        <CatchingPokemonIcon sx={{ mr: 2, transform: 'rotate(180deg)' }} />
        
        {/* Typography renderiza texto con estilos de MUI */}
        {/* variant="h6" = tamaño de título mediano */}
        {/* component="div" = renderiza como un <div> en lugar de un <h6> */}
        <Typography variant="h6" component="div">
          PokéDex
        </Typography>

        {/* Box con flexGrow=1 empuja los elementos hacia los extremos */}
        {/* Útil si quieres agregar botones a la derecha en el futuro */}
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
};

// Exportamos el componente para poder usarlo en otros archivos
export default Navbar;
