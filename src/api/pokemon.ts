import { API_URL } from '@/config';

export const fetchPokemonList = async (limit = 20, offset = 0) => {
  const response = await fetch(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`);
  const data = await response.json();
  return data;
};

export const fetchPokemonTypes = async (typeId = 1) => {
  const response = await fetch(`${API_URL}/type/${typeId}`);
  const data = await response.json();
  return data;
};

export const fetchPokemon = async (id = 1) => {
  const response = await fetch(`${API_URL}/pokemon/${id}`);
  const data = await response.json();
  return data;
};

export const fetchUnknown = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
