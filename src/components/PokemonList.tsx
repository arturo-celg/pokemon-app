// ============================================================
// COMPONENTE: PokemonList.tsx
// ============================================================
// Este es el componente más complejo de la app.
// Se encarga de:
//   1. Pedir la lista de Pokémon a la API (o buscar uno)
//   2. Guardar los datos en el estado local
//   3. Mostrar un spinner mientras carga
//   4. Mostrar las tarjetas de Pokémon en un Grid
//   5. Manejar la paginación
// ============================================================

// "useEffect" y "useState" son "Hooks" de React
// - useState: guarda datos que pueden cambiar (el "estado" del componente)
//   cuando el estado cambia, React vuelve a renderizar el componente
// - useEffect: ejecuta código cuando algo cambia (ej: al cargar la página)
import { useEffect, useState } from 'react';

import {
  Grid,             // Sistema de cuadrícula para organizar las tarjetas
  CircularProgress, // Spinner de carga circular
  Box,              // Contenedor flexible
  Pagination,       // Componente de paginación (1, 2, 3...)
  Typography,       // Texto con estilos
  Alert,            // Caja de alerta/error
} from '@mui/material';

// Importamos las funciones del servicio que creamos
import { getPokemonDetail, getPokemonList } from '../services/pokemonService';
import type { Pokemon } from '../types/pokemon';
import PokemonCard from './PokemonCard';

// ============================================================
// PROPS del componente
// ============================================================
interface PokemonListProps {
  searchQuery: string; // El texto que escribe el usuario en el buscador
}

// Cuántos Pokémon mostrar por página
const ITEMS_PER_PAGE = 20;

const PokemonList = ({ searchQuery }: PokemonListProps) => {

  // ============================================================
  // ESTADO LOCAL con useState
  // ============================================================
  // useState<Tipo>(valorInicial) retorna [valor, función para cambiar el valor]
  // Cuando llamas a la función "set...", React re-renderiza el componente

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);    // Lista de Pokémon a mostrar
  const [loading, setLoading] = useState<boolean>(true);       // ¿Estamos cargando?
  const [error, setError] = useState<string | null>(null);     // Mensaje de error (o null si no hay)
  const [page, setPage] = useState<number>(1);                 // Página actual
  const [totalPages, setTotalPages] = useState<number>(0);     // Total de páginas

  // ============================================================
  // useEffect - El "motor" del componente
  // ============================================================
  // useEffect(función, [dependencias])
  // Se ejecuta cuando el componente monta (aparece en pantalla)
  // Y TAMBIÉN cada vez que cambia algo de la lista de dependencias
  //
  // Aquí se ejecuta cuando cambia "page" o "searchQuery"
  // ============================================================
  useEffect(() => {
    // Si hay texto en el buscador, buscamos ese Pokémon específico
    if (searchQuery.trim() !== '') {
      searchPokemon(searchQuery);
    } else {
      // Si no hay búsqueda, cargamos la lista normal con paginación
      fetchPokemons();
    }
  }, [page, searchQuery]); // <- Array de dependencias

  // ============================================================
  // FUNCIÓN: fetchPokemons
  // Carga la lista paginada de Pokémon
  // ============================================================
  const fetchPokemons = async () => {
    setLoading(true);  // Activamos el spinner
    setError(null);    // Limpiamos errores previos
    try {
      // Calculamos el "offset" (desde qué posición empezar)
      // Página 1 → offset 0 (del 1 al 20)
      // Página 2 → offset 20 (del 21 al 40)
      const offset = (page - 1) * ITEMS_PER_PAGE;

      // Primero traemos la lista básica (solo nombres y URLs)
      const data = await getPokemonList(ITEMS_PER_PAGE, offset);

      // Calculamos el total de páginas dividiendo el total entre los items por página
      // Math.ceil redondea hacia arriba (ej: 5.3 → 6)
      setTotalPages(Math.ceil(data.count / ITEMS_PER_PAGE));

      // Ahora traemos los detalles de CADA Pokémon en paralelo
      // Promise.all ejecuta todas las peticiones al mismo tiempo (más rápido)
      // en lugar de hacerlas una por una
      const details = await Promise.all(
        data.results.map((p) => getPokemonDetail(p.name))
      );

      setPokemons(details); // Guardamos los detalles en el estado
    } catch (err) {
      setError('Error al cargar los Pokémon. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      // "finally" se ejecuta SIEMPRE, haya error o no
      setLoading(false); // Desactivamos el spinner
    }
  };

  // ============================================================
  // FUNCIÓN: searchPokemon
  // Busca un Pokémon específico por nombre o número
  // ============================================================
  const searchPokemon = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      // Convertimos a minúsculas porque la API es case-sensitive
      const pokemon = await getPokemonDetail(query.toLowerCase().trim());
      setPokemons([pokemon]); // Lo metemos en un array porque el estado es un array
      setTotalPages(1);       // Solo hay 1 resultado, así que 1 "página"
    } catch {
      // Si no encontró el Pokémon, la API devuelve un error 404
      setPokemons([]);  // Vaciamos la lista
      setError(`No se encontró ningún Pokémon llamado "${query}"`);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // RENDERIZADO CONDICIONAL
  // ============================================================
  // React devuelve JSX distinto según el estado actual

  // Si está cargando, mostramos el spinner centrado
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress color="primary" size={60} />
      </Box>
    );
  }

  // Si hay un error, mostramos el mensaje de error
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, px: 2 }}>
        <Alert severity="error" sx={{ maxWidth: 500, width: '100%' }}>
          {error}
        </Alert>
      </Box>
    );
  }

  // Si no hay resultados (no debería pasar pero por si acaso)
  if (pokemons.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No se encontraron Pokémon
        </Typography>
      </Box>
    );
  }

  // ============================================================
  // RENDERIZADO PRINCIPAL
  // ============================================================
  return (
    <Box sx={{ px: { xs: 2, md: 4 }, pb: 4 }}>
      {/* Grid es el sistema de cuadrícula de MUI */}
      {/* En MUI v6, ya no se usa el prop "item" en los hijos */}
      {/* Cada Grid hijo dentro de un container es automáticamente un item */}
      <Grid container spacing={3} justifyContent="center">
        {/* Iteramos sobre el array de pokemons y renderizamos una Card por cada uno */}
        {pokemons.map((pokemon) => (
          // "key" SIEMPRE es necesario al hacer .map() en React para optimizar renders
          <Grid key={pokemon.id}>
            <PokemonCard pokemon={pokemon} />
          </Grid>
        ))}
      </Grid>

      {/* La paginación solo se muestra cuando NO estamos buscando */}
      {/* Si searchQuery está vacío, mostramos la paginación */}
      {!searchQuery && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}  // Total de páginas
            page={page}         // Página actual
            // onChange se llama cuando el usuario hace click en un número
            // "_" es el evento (que no necesitamos), "value" es la página elegida
            onChange={(_, value) => {
              setPage(value);
              // Hacemos scroll al inicio cuando cambia la página
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            color="primary"
            size="large"
            showFirstButton // Botones de ir a primera/última página
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
};

export default PokemonList;
