import { CharacterCard } from "../../components/CharacterCard";

export const CharacterGrid = ({chars = []}) => {

  const handleOnClick = () => {
    console.log('Navegando a la pagina de personaje');
  }

  return (
    <div className="card_container">
      {chars.map( ( char ) => (
        <CharacterCard key={char.name} character={char} handleOnClick={ handleOnClick } />
      ))}
    </div>
  )
}
