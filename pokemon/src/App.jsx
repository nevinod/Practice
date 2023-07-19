import { useState } from 'react'
import useFetchPokemon from './useFetchPokemon';
import PokemonResults from './PokemonResults';
import './App.css'

function App() {
  const [input, setInput] = useState("");
  const [searchString, setSearchString] = useState("");
  const { pokemon, loading, error } = useFetchPokemon(searchString);

  function handleSubmit(e) {
    e.preventDefault();
    setSearchString(input);
  }

  return (
    <>
      <h2>
        Search for a pokemon
      </h2>

      <form onSubmit={handleSubmit}>
        <input value={input} onChange={(e) => setInput(e.currentTarget.value)} />
        <button type="submit" style={{marginLeft: '5px'}}>Submit</button>
      </form>
      
      {loading && <h4>Searching...</h4>}
      {searchString && !loading && !pokemon.pokemon && <h4>No pokemon found</h4>}
      {error && <h4>{error}</h4>}

      <PokemonResults pokemon={pokemon.pokemon} />
    </>
  )
}

export default App
