import { useState, useEffect, useTransition } from 'react';
import { fetchPokemonList, fetchPokemonTypes } from '@/services/api';
import { Pokemons, PokemonTypes } from '@/utils/interface/pokemons';
import { POKEMON_TYPE_COUNT } from '@/config';

const useFetchPokemons = (limit = 20, offset = 0) => {
  const [pokemons, setPokemons] = useState<Pokemons[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchPokemonListData = async (limit: number, offset: number) => {
    const data = await fetchPokemonList(limit, offset);
    if (!data) throw new Error('Invalid data format');
    return data.results;
  };

  const fetchPokemonType = async (typeId: number) => {
    const data = await fetchPokemonTypes(typeId);
    if (!data) throw new Error('Invalid data format');
    return data;
  };

  const addPokemonTypes = async (pokemonsList: Pokemons[]) => {
    const newPokemonsList: Pokemons[] = pokemonsList.map((p: Pokemons) => ({ ...p, types: [] }));
    for (let typeId = 1; typeId <= POKEMON_TYPE_COUNT; typeId++) {
      const pokemonNamesForType = await fetchPokemonType(typeId);
      pokemonNamesForType.pokemon.forEach((item: PokemonTypes) => {
        const foundPokemon = newPokemonsList.find((p: Pokemons) => p.name === item.pokemon.name);
        if (foundPokemon) {
          foundPokemon.types.push(pokemonNamesForType.name);
        }
      });
    }
    return newPokemonsList;
  };

  useEffect(() => {
    startTransition(async () => {
      try {
        const pokemonsData = await fetchPokemonListData(limit, offset);
        const updatedPokemons = await addPokemonTypes(pokemonsData);
        setPokemons(updatedPokemons);
      } catch (err: unknown) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      }
    });
  }, [limit, offset]);

  return { pokemons, isPending, error };
};

export default useFetchPokemons;
