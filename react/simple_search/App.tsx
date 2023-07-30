import { useState } from 'react';
import { items } from './items';
import './App.css';

function App() {
  const [search, setSearch] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.currentTarget.value);
  }

  const filteredItems = items.filter(item => 
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <label htmlFor='input'>Search:</label>
      <input id="input" value={search} onChange={handleChange} />
      
      {filteredItems.map(item => <h4>{item}</h4>)}
    </>
  )
}

export default App;
