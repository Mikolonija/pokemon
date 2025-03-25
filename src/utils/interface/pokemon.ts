interface Species {
  name: string;
  url: string;
}

interface Sprites {
  front_default: string;
}

interface PokemonDetails {
  id: number;
  species: Species;
  sprites: Sprites;
  stats: { base_stat: number; stat: { name: string } }[];
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
}

export interface Pokemon {
  url: string;
  details: PokemonDetails;
}
