import { useState, useEffect, useTransition } from 'react';
import { fetchPokemonList } from '@/services/api';
import { Pokemon } from '@/utils/interface/pokemon';

const useFetchPokemon = (limit = 20, offset = 0) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, startTransition] = useTransition();

  // Fetch the Pokemon list
  const fetchPokemonListData = async (limit: number, offset: number) => {
    const data = await fetchPokemonList(limit, offset);
    if (!data) throw new Error('Invalid data format');
    return data.results;
  };

  // Fetch types based on ID (1 to 18)
  const fetchPokemonType = async (typeId: number) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${typeId}`);
      if (!response.ok) {
        throw new Error(`Error fetching type ${typeId}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('An unknown error occurred while fetching type'),
      );
      return [];
    }
  };

  const addPokemonTypes = async (pokemons: any) => {
    const newPokemons = pokemons.map((p: any) => ({ ...p, types: [] }));
    for (let typeId = 1; typeId <= 18; typeId++) {
      const pokemonNamesForType = await fetchPokemonType(typeId);
      pokemonNamesForType.pokemon.forEach((pokemon: any) => {
        const foundPokemon = newPokemons.find((p: any) => p.name === pokemon.pokemon.name);
        if (foundPokemon) {
          foundPokemon.types.push(pokemonNamesForType.name);
        }
      });
    }
    console.log(newPokemons);
    return newPokemons;
  };

  useEffect(() => {
    startTransition(async () => {
      try {
        const data = await fetchPokemonListData(limit, offset);
        const updatedPokemons = await addPokemonTypes(data);
        setPokemon(updatedPokemons);
      } catch (err: unknown) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      }
    });
  }, [limit, offset]);

  return { pokemon, isPending, error };
};

export default useFetchPokemon;
