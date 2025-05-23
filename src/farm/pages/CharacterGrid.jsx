import { useNavigate } from "react-router-dom";
import { CharacterCard } from "../../components/CharacterCard";

export const CharacterGrid = ({characterData = []}) => {

  const navigate = useNavigate();

  const handleOnClick = (name) => {
    return navigate(`/characterinfopage/${name}`)
  }

  return (
    <div className="card-container">
      {Object.values(characterData).map( ( char ) => (
        <CharacterCard key={char.name} character={char} handleOnClick={ () => handleOnClick(char.name) } />
      ))}
    </div>
  )
}
