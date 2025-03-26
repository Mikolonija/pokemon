interface PokemonNames {
  name: string;
}

export interface PokemonTypes {
  pokemon: PokemonNames;
}

export interface Pokemons {
  url: string;
  name: string;
  types: string[];
}

export interface PokemonTypeDetails {
  name: string;
  color: string;
  backgroundColor: string;
}
