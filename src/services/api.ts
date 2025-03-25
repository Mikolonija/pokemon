import { API_URL } from '@/config';

export const fetchPokemonList = async (limit = 20, offset = 0) => {
  const response = await fetch(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`);
  const data = await response.json();
  return data.results;
};

export const fetchPokemonDetails = async (name: string) => {
  const response = await fetch(`${API_URL}/pokemon/${name}`);
  return response.json();
};
