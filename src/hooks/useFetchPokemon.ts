import { useState, useEffect, useTransition } from 'react';
import { fetchPokemonList } from '@/services/api';
import { ApiResponse, Pokemon } from '@/utils/interface/pokemon';

const useFetchPokemon = (limit = 20, offset = 0) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const data: ApiResponse = await fetchPokemonList(limit, offset);
        if (data) setPokemon(data.results);
        else throw new Error('Invalid data format');
      } catch (err: unknown) {
        if (err instanceof Error) setError(err);
        else setError(new Error('An unknown error occurred'));
      }
    });
  }, [limit, offset]);

  return { pokemon, isPending, error };
};

export default useFetchPokemon;
