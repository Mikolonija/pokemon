export interface EvolutionChain {
  chain: Chain;
  species: { name: string; url: string };
  evolves_to: EvolutionChain[];
  evolution_details: EvolutionDetail[];
}

interface Chain {
  species: { name: string; url: string };
  evolves_to: EvolutionChain[];
  evolution_details: EvolutionDetail[];
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    versions: {
      'generation-v': {
        'black-white': {
          animated: {
            front_default: string;
          };
        };
      };
    };
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  species: { url: string };
}

interface EvolutionDetail {
  min_level?: number;
}
export interface StatData {
  abbr: string;
  bgColor: string;
  textColor: string;
}
export interface PokemonSpecies {
  flavor_text_entries: { language: { name: string }; flavor_text: string }[];
  evolution_chain: { url: string };
}

export interface SelectedPokemon {
  details: PokemonDetails;
  text: string;
  evolution: EvolutionChain;
}
