import { CharacterCard } from './../../components/CharacterCard';


export const CharacterAdder = ({chars = []}) => {  

  const handleOnClick = () => {
    console.log('personaje añadido');
  }

  return (
    <div className="card_container">
      {chars.map( ( char ) => (
        <CharacterCard key={char.name} character={char} handleOnClick={ handleOnClick } />
      ))}
    </div>
  )
}
