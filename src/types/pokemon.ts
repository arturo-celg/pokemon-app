// ============================================================
// TIPOS DE TYPESCRIPT (Interfaces)
// ============================================================
// En TypeScript, una "interface" es como un contrato que define
// la forma/estructura que debe tener un objeto.
// Básicamente le dices a TS: "este objeto SIEMPRE tendrá estas propiedades"
// Si intentas usar una propiedad que no está definida aquí, TS te avisará con un error.
// ============================================================

// -----------------------------------------
// Interface principal: Pokemon
// Describe toda la info que nos devuelve la PokéAPI sobre un Pokémon
// -----------------------------------------
export interface Pokemon {
  id: number;       // El número del Pokémon en la Pokédex (ej: 1 = Bulbasaur)
  name: string;     // Nombre del Pokémon (ej: "bulbasaur")
  
  // "sprites" son las imágenes del Pokémon
  // El objeto está anidado (un objeto dentro de otro)
  sprites: {
    front_default: string; // URL de la imagen pequeña de frente
    other: {
      // La imagen de arte oficial (más grande y bonita)
      'official-artwork': {
        front_default: string; // URL de la imagen oficial
      };
    };
  };

  // "types" es un ARRAY (lista) de tipos del Pokémon
  // Cada Pokémon puede tener 1 o 2 tipos (ej: fuego, agua, planta...)
  // El [] al final indica que es una lista/array de ese objeto
  types: {
    slot: number;   // Posición del tipo (1 = tipo principal, 2 = secundario)
    type: {
      name: string; // Nombre del tipo (ej: "fire", "water", "grass")
      url: string;  // URL con más info del tipo
    };
  }[];

  // "stats" es un array con las estadísticas del Pokémon
  // (HP, ataque, defensa, velocidad, etc.)
  stats: {
    base_stat: number; // Valor de la estadística (ej: 45)
    stat: {
      name: string;    // Nombre de la estadística (ej: "hp", "attack")
    };
  }[];

  height: number; // Altura del Pokémon (en decímetros)
  weight: number; // Peso del Pokémon (en hectogramos)
}

// -----------------------------------------
// Interface: PokemonListResponse
// Describe la respuesta que nos da la API cuando pedimos la LISTA de Pokémon
// -----------------------------------------
export interface PokemonListResponse {
  count: number;          // Total de Pokémon que existen en la API
  next: string | null;    // URL para ir a la siguiente página (null si no hay más)
  previous: string | null; // URL para ir a la página anterior (null si estamos en la primera)
  
  // Lista básica de Pokémon (solo nombre y URL, sin detalles)
  // Para ver los detalles hay que hacer otra llamada con la URL de cada uno
  results: {
    name: string; // Nombre del Pokémon (ej: "bulbasaur")
    url: string;  // URL para obtener los detalles completos de ese Pokémon
  }[];
}
