// ============================================================
// COMPONENTE: SearchBar.tsx
// ============================================================
// Barra de búsqueda que permite al usuario escribir el nombre
// o número de un Pokémon para buscarlo.
// ============================================================

import { TextField, Box, InputAdornment } from '@mui/material';
// Ícono de lupa para mostrar dentro del campo de texto
import SearchIcon from '@mui/icons-material/Search';

// ============================================================
// PROPS (Propiedades del componente)
// ============================================================
// En React, los "props" son los parámetros que recibe un componente
// del componente padre. Se definen como una Interface de TypeScript.
//
// Este componente recibe:
//   - onSearch: una FUNCIÓN que se llama cada vez que el usuario escribe
//     "(value: string) => void" significa:
//       - recibe un parámetro "value" de tipo string
//       - no devuelve nada (void)
// Es una técnica llamada "callback" - el padre define qué hacer,
// el hijo solo la llama cuando ocurre el evento
// ============================================================
interface SearchBarProps {
  onSearch: (value: string) => void;
}

// Desestructuramos los props directamente en los parámetros
// Es lo mismo que: const SearchBar = (props) => { const onSearch = props.onSearch; }
const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    // Box es como un <div> con propiedades de estilo de MUI
    // sx={{ ... }} es la forma de escribir estilos inline en MUI
    // "my: 3" = margin vertical de 24px (my = margin-y = arriba y abajo)
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
      
      {/* TextField es el componente de input (campo de texto) de MUI */}
      <TextField
        label="Buscar Pokémon"     // Texto flotante que aparece como etiqueta
        variant="outlined"          // Estilo con borde alrededor
        sx={{ width: { xs: '90%', sm: '60%', md: '40%' } }} // Ancho responsivo
        // "onChange" se dispara cada vez que el usuario escribe algo
        // "e" es el evento, "e.target.value" es el texto del input
        onChange={(e) => onSearch(e.target.value)}
        // InputProps permite personalizar el interior del input
        InputProps={{
          // startAdornment pone algo al INICIO del campo (aquí la lupa)
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
