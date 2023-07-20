import React, { useState } from 'react'
import useGetCharacter from './hooks/useGetCharacter'
import Character from './components/Character';
import './App.css'

function App() {
  const [id, setId] = useState<string>("");
  const [input, setInput] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const { character, loading, error} = useGetCharacter(id);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    if(!input) return;
    if(isNaN(+input)) {
      alert("Input must be a number");
      return;
    }

    setSubmitDisabled(true);
    setId(input);
  }

  function handleRandom() {
    let randNumber = Math.floor(Math.random() * 700);
    while(randNumber.toString() === id) {
      randNumber = Math.floor(Math.random() * 700);
    }
    setInput(randNumber.toString())
    setId(randNumber.toString());
    setSubmitDisabled(true)
  }

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    let value = e.currentTarget.value;
    setInput(value);

    value !== id && value ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          value={input}
          maxLength={3} 
          onChange={handleChange}
          disabled={loading}
          style={{marginRight: '10px'}}
        />
        <button type="submit" disabled={loading || submitDisabled}>Submit</button>
      </form>
      <button 
        type="button" 
        onClick={handleRandom}
        disabled={loading}
        style={{marginTop: '15px'}}
      >
        Random Character
      </button>
      {character && <Character character={character} />}
    </>

  )
}

export default App
