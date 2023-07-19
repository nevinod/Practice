import { useState, useEffect } from 'react';
import axios from 'axios';

const GET_POKEMON = name => `
{
    pokemon(name: "${name}") {
      id
      name
      number
      image
      maxCP
      maxHP
    }
  }
`

function useFetchPokemon(name) {
    const [pokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if(!name) return;

        setLoading(true);

        axios({
            url: 'https://graphql-pokemon2.vercel.app',
            method: 'post',
            data: {
              query: GET_POKEMON(name)
            }
          })
          .then((result) => {
            setPokemon(result.data?.data)
          })
          .catch((error) => setError(error.message))
          .finally(() => setLoading(false))
    }, [name])

    return { pokemon, loading, error }
}

export default useFetchPokemon;