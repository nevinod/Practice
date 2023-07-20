import { useEffect, useState } from "react";
import axios from "axios";

const RM_QUERY = (id: string) => `
query {
    character(id: ${id}) {
        name
        species
        type
        gender
    }
}
`

function useGetCharacter(id: string | null) {
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if(!id) return;

        setLoading(true);

        axios({
            url: 'https://rickandmortyapi.com/graphql',
            method: 'post',
            data: {
              query: RM_QUERY(id)
            }
          })
          .then((result) => {
            setCharacter(result.data.data.character)
          })
          .catch((error) => {
            setError(error.message)
          })
          .finally(() => setLoading(false))
    }, [id])

    return { character, loading, error }
}

export default useGetCharacter;