import { isEmpty } from 'lodash';

type CharacterType = {
    gender: string;
    name: string;
    species: string;
    type: string;
}

interface CharacterProps {
    character: CharacterType | null;
}

function Character({ character }: CharacterProps) {
    if(isEmpty(character)) return;

    return (
        <div>
            <h3>{character.name}</h3>
            <p>Species: {character.species}</p>
            <p>Gender: {character.gender}</p>
        </div>
    )
}

export default Character;