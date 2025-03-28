import { StatData } from '@/utils/interface/pokemon';

export const POKEMON_STATS: Record<string, StatData> = {
  hp: { abbr: 'HP', bgColor: 'bg-red-300', textColor: 'text-red-800' },
  attack: { abbr: 'ATK', bgColor: 'bg-orange-300', textColor: 'text-orange-800' },
  defense: { abbr: 'DEF', bgColor: 'bg-blue-300', textColor: 'text-blue-800' },
  'special-attack': { abbr: 'SPA', bgColor: 'bg-lime-300', textColor: 'text-lime-800' },
  'special-defense': { abbr: 'SPD', bgColor: 'bg-purple-300', textColor: 'text-purple-800' },
  speed: { abbr: 'SPE', bgColor: 'bg-teal-300', textColor: 'text-teal-800' },
};
