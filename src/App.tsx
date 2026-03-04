// ============================================================
// APP.TSX - Componente raíz de la aplicación
// ============================================================
// Este es el componente principal que "contiene" toda la app.
// Aquí:
//   1. Configuramos el tema global de MUI con ThemeProvider
//   2. Guardamos el estado de búsqueda
//   3. Armamos la estructura general de la página
// ============================================================

// "useState" es un Hook de React para manejar estado local
import { useState } from 'react';

// Componentes de MUI:
// - ThemeProvider: envuelve la app y aplica el tema a todos los componentes
// - CssBaseline: resetea los estilos CSS del navegador (como un normalize.css)
// - Box: contenedor flexible (como un div con superpoderes)
import { ThemeProvider, CssBaseline, Box } from '@mui/material';

// Nuestro tema personalizado con los colores de Pokémon
import { theme } from './theme/theme';

// Nuestros componentes creados
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';

// "function App()" es igual que "const App = () => {}"
// Ambas formas son válidas para definir un componente en React
function App() {
  // Estado para guardar lo que el usuario escribe en el buscador
  // Empieza vacío ('') y se actualiza cada vez que el usuario escribe
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    // ThemeProvider aplica nuestro tema a TODOS los componentes MUI dentro
    <ThemeProvider theme={theme}>
      {/* CssBaseline normaliza los estilos del navegador */}
      <CssBaseline />
      
      {/* Contenedor principal que ocupa toda la pantalla */}
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        
        {/* Barra de navegación superior */}
        <Navbar />

        {/* Barra de búsqueda */}
        {/* Le pasamos la función setSearchQuery como prop "onSearch" */}
        {/* Cuando el usuario escribe, SearchBar llama a setSearchQuery */}
        {/* Eso actualiza el estado y React re-renderiza con el nuevo valor */}
        <SearchBar onSearch={setSearchQuery} />

        {/* Lista de Pokémon */}
        {/* Le pasamos el texto de búsqueda para que filtre los resultados */}
        <PokemonList searchQuery={searchQuery} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
