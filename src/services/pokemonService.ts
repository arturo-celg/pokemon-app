// ============================================================
// SERVICIO: pokemonService.ts
// ============================================================
// Un "servicio" es un archivo que agrupa todas las funciones
// que se comunican con una API externa (en este caso la PokéAPI).
// Separarlo en un archivo propio es buena práctica porque:
//   1. Mantiene el código organizado
//   2. Si cambia la API, solo editas este archivo
//   3. Los componentes no necesitan saber cómo funciona la API
// ============================================================

// "axios" es una librería para hacer llamadas HTTP (peticiones a APIs)
// Es más fácil de usar que el fetch nativo del navegador
import axios from 'axios';

// Importamos los tipos que definimos en pokemon.ts
// "import type" le dice a TypeScript que estos imports son SOLO tipos,
// no código que se ejecuta. Es obligatorio cuando se usa 'verbatimModuleSyntax'
// en el tsconfig.json (que es el caso de los proyectos Vite modernos)
import type { Pokemon, PokemonListResponse } from '../types/pokemon';

// La URL base de la PokéAPI - todos los endpoints empiezan con esto
// La definimos como constante para no repetirla en cada función
const BASE_URL = 'https://pokeapi.co/api/v2';

// ============================================================
// FUNCIÓN: getPokemonList
// ============================================================
// Obtiene una lista de Pokémon con paginación
// 
// Parámetros:
//   - limit: cuántos Pokémon traer por página (por defecto 20)
//   - offset: desde qué posición empezar (por defecto 0, es decir el primero)
//
// "async/await" es una forma moderna de manejar operaciones que tardan tiempo
// (como llamar a una API). "async" indica que la función es asíncrona,
// y "await" dice "espera aquí hasta que esto termine".
//
// ": Promise<PokemonListResponse>" indica el tipo de retorno:
// una "Promesa" que cuando se resuelve devuelve un PokemonListResponse
// ============================================================
export const getPokemonList = async (
  limit: number = 20,
  offset: number = 0
): Promise<PokemonListResponse> => {
  // axios.get hace una petición GET a la URL
  // Se parece a: fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
  const response = await axios.get(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
  
  // "response.data" contiene la respuesta de la API ya como objeto JavaScript
  // axios lo convierte automáticamente desde JSON
  return response.data;
};

// ============================================================
// FUNCIÓN: getPokemonDetail
// ============================================================
// Obtiene los detalles completos de UN Pokémon específico
//
// Parámetro:
//   - nameOrId: el nombre ("pikachu") o el número (25) del Pokémon
//     "string | number" significa que puede ser texto O número (unión de tipos)
// ============================================================
export const getPokemonDetail = async (
  nameOrId: string | number
): Promise<Pokemon> => {
  // Construimos la URL con el nombre/id del Pokémon
  // Ej: "https://pokeapi.co/api/v2/pokemon/pikachu"
  const response = await axios.get(`${BASE_URL}/pokemon/${nameOrId}`);
  return response.data;
};
