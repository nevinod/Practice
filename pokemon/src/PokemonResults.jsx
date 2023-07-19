const containterStyles = {
    display: 'flex', 
    flexDirection: 'row', 
    height: '200px',
    width: '40vw',
    justifyContent: 'space-around',
    border: '1px solid gray',
    borderRadius: '10px',
    padding: '10px',
    marginTop: '30px'
}


function PokemonResults({ pokemon }) {
    if(!pokemon) return;

    return (
        <div style={containterStyles}>
            <img style={{maxHeight: '200px'}} src={pokemon.image} />
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <h2>{pokemon.name}</h2>
                <p>Number : {pokemon.number}</p>
                <p>Max HP : {pokemon.maxHP}</p>
            </div>
        </div>
    )
}

export default PokemonResults;