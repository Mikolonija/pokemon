import { PokemonType } from './utils/enums/pokemon';
import { StatData } from './utils/interface/pokemon';
import { PokemonTypeDetails } from './utils/interface/pokemons';

const API_URL = 'https://pokeapi.co/api/v2';
const POKEMON_IMG_PATH =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

const MAX_OFFSET = 1025;
const PAGE_SIZE = 30;
const POKEMON_TYPE_COUNT = 18;
const POKEMON_TYPES: Record<string, PokemonTypeDetails> = {
  [PokemonType.NORMAL]: { name: 'Normal', color: '#F8F8F8', backgroundColor: '#A0A0A0' },
  [PokemonType.FIGHTING]: { name: 'Fighting', color: '#D32F2F', backgroundColor: '#F8A09E' },
  [PokemonType.FLYING]: { name: 'Flying', color: '#5F4B8B', backgroundColor: '#D0C8FF' },
  [PokemonType.POISON]: { name: 'Poison', color: '#8E24AA', backgroundColor: '#E0A8D1' },
  [PokemonType.GROUND]: { name: 'Ground', color: '#6D4C41', backgroundColor: '#F8E1A3' },
  [PokemonType.ROCK]: { name: 'Rock', color: '#6A4D3D', backgroundColor: '#E0D39E' },
  [PokemonType.BUG]: { name: 'Bug', color: '#388E3C', backgroundColor: '#C8E97F' },
  [PokemonType.GHOST]: { name: 'Ghost', color: '#512D6D', backgroundColor: '#D4A8D9' },
  [PokemonType.STEEL]: { name: 'Steel', color: '#757575', backgroundColor: '#D0D0F0' },
  [PokemonType.FIRE]: { name: 'Fire', color: '#D32F2F', backgroundColor: '#F9A087' },
  [PokemonType.WATER]: { name: 'Water', color: '#1976D2', backgroundColor: '#A0C8F8' },
  [PokemonType.GRASS]: { name: 'Grass', color: '#388E3C', backgroundColor: '#B8E58C' },
  [PokemonType.ELECTRIC]: { name: 'Electric', color: '#9E9E00', backgroundColor: '#F1E04E' },
  [PokemonType.PSYCHIC]: { name: 'Psychic', color: '#D81B60', backgroundColor: '#F8A3D2' },
  [PokemonType.ICE]: { name: 'Ice', color: '#0288D1', backgroundColor: '#D0F0F0' },
  [PokemonType.DRAGON]: { name: 'Dragon', color: '#512DA8', backgroundColor: '#D0A0F8' },
  [PokemonType.DARK]: { name: 'Dark', color: '#3E2723', backgroundColor: '#B8A7A1' },
  [PokemonType.FAIRY]: { name: 'Fairy', color: '#C2185B', backgroundColor: '#F8D0E8' },
  [PokemonType.STELLAR]: { name: 'Stellar', color: '#D32F2F', backgroundColor: '#FF8A8A' },
};
const POKEMON_STATS: Record<string, StatData> = {
  hp: { abbr: 'HP', bgColor: 'bg-red-300', textColor: 'text-red-800' },
  attack: { abbr: 'ATK', bgColor: 'bg-orange-300', textColor: 'text-orange-800' },
  defense: { abbr: 'DEF', bgColor: 'bg-blue-300', textColor: 'text-blue-800' },
  'special-attack': { abbr: 'SPA', bgColor: 'bg-lime-300', textColor: 'text-lime-800' },
  'special-defense': { abbr: 'SPD', bgColor: 'bg-purple-300', textColor: 'text-purple-800' },
  speed: { abbr: 'SPE', bgColor: 'bg-teal-300', textColor: 'text-teal-800' },
};

export {
  API_URL,
  POKEMON_TYPES,
  POKEMON_IMG_PATH,
  POKEMON_TYPE_COUNT,
  MAX_OFFSET,
  PAGE_SIZE,
  POKEMON_STATS,
};
