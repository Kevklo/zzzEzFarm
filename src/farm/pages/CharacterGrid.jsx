import { useNavigate } from "react-router-dom";
import { CharacterCard } from "../../components/CharacterCard";

export const CharacterGrid = ({chars = []}) => {

  const navigate = useNavigate();

  const handleOnClick = (name) => {
    console.log('Navegando a la pagina de personaje');
    return navigate(`/characterinfopage/${name}`)
  }

  return (
    <div className="card_container">
      {Object.values(chars).map( ( char ) => (
        <CharacterCard key={char.name} character={char} handleOnClick={ () => handleOnClick(char.name) } />
      ))}
    </div>
  )
}
