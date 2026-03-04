// ============================================================
// COMPONENTE: PokemonCard.tsx
// ============================================================
// Tarjeta visual que muestra la información básica de un Pokémon:
// imagen, número, nombre y tipos con colores.
// ============================================================

import { Card, CardContent, CardMedia, Typography, Chip, Box } from '@mui/material';
// "import type" indica que solo importamos el tipo para TypeScript,
// no genera código JavaScript en el bundle final
import type { Pokemon } from '../types/pokemon';

// ============================================================
// COLORES POR TIPO DE POKÉMON
// ============================================================
// "Record<string, string>" es un tipo de TypeScript que significa:
// "un objeto donde TODAS las claves son string y todos los valores son string"
// Es como decir: { [key: string]: string }
//
// Esto nos permite hacer: typeColors["fire"] => "#F57C00"
// ============================================================
const typeColors: Record<string, string> = {
  fire: '#F57C00',      // Naranja fuego
  water: '#1565C0',     // Azul agua
  grass: '#2E7D32',     // Verde planta
  electric: '#F9A825',  // Amarillo eléctrico
  psychic: '#AD1457',   // Rosa psíquico
  ice: '#00838F',       // Cian hielo
  dragon: '#4527A0',    // Púrpura dragón
  dark: '#37474F',      // Gris oscuro
  fairy: '#F06292',     // Rosa hada
  normal: '#78909C',    // Gris normal
  fighting: '#BF360C',  // Rojo oscuro lucha
  flying: '#1976D2',    // Azul volador
  poison: '#6A1B9A',    // Morado veneno
  ground: '#EF6C00',    // Naranja tierra
  rock: '#4E342E',      // Marrón roca
  bug: '#558B2F',       // Verde bicho
  ghost: '#4A148C',     // Morado fantasma
  steel: '#546E7A',     // Gris acero
};

// ============================================================
// PROPS del componente PokemonCard
// ============================================================
// Recibe un objeto "pokemon" con toda la info del Pokémon
// "Pokemon" aquí es la interface que definimos en types/pokemon.ts
// ============================================================
interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    // Card es el componente "tarjeta" de MUI
    // sx define estilos inline usando el sistema de MUI
    <Card
      sx={{
        width: 180,
        textAlign: 'center',
        // "transition" crea una animación suave al hacer hover
        transition: 'transform 0.2s, box-shadow 0.2s',
        // "&:hover" es la pseudo-clase CSS de hover en MUI
        // Al pasar el mouse, la tarjeta se agranda un poco
        '&:hover': {
          transform: 'scale(1.06)',
          boxShadow: 6,       // Sombra más pronunciada
          cursor: 'pointer',  // Cambia el cursor a manito
        },
      }}
    >
      {/* CardMedia muestra la imagen del Pokémon */}
      {/* Usamos la imagen de "official-artwork" que es la más grande y bonita */}
      <CardMedia
        component="img"
        image={
          pokemon.sprites.other['official-artwork'].front_default ||
          pokemon.sprites.front_default // Fallback a imagen pequeña si no hay artwork
        }
        alt={pokemon.name}
        sx={{
          width: 140,
          height: 140,
          margin: '0 auto', // Centra la imagen horizontalmente
          pt: 1,            // Padding top (espacio arriba)
          objectFit: 'contain', // La imagen no se recorta
        }}
      />

      <CardContent sx={{ pb: '12px !important' }}>
        {/* Número del Pokémon con ceros a la izquierda: 001, 025, etc. */}
        {/* String(pokemon.id).padStart(3, '0') convierte 1 → "001" */}
        <Typography variant="caption" color="text.secondary" display="block">
          #{String(pokemon.id).padStart(3, '0')}
        </Typography>

        {/* Nombre del Pokémon */}
        {/* "textTransform: capitalize" pone la primera letra en mayúscula */}
        <Typography variant="h6" sx={{ textTransform: 'capitalize', fontSize: '1rem' }}>
          {pokemon.name}
        </Typography>

        {/* Chips de tipos del Pokémon */}
        {/* "pokemon.types.map(...)" itera sobre el array de tipos */}
        {/* y por cada tipo devuelve un Chip con su color correspondiente */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mt: 1 }}>
          {pokemon.types.map((t) => (
            <Chip
              key={t.type.name} // "key" es obligatorio en listas de React para optimizar renders
              label={t.type.name}
              size="small"
              sx={{
                // Buscamos el color en nuestro objeto typeColors
                // Si no existe el tipo, usamos gris como color por defecto
                backgroundColor: typeColors[t.type.name] || '#78909C',
                color: 'white',
                textTransform: 'capitalize',
                fontWeight: 600,
                fontSize: '0.7rem',
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
