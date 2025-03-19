import { useNavigate } from 'react-router-dom';
import { addCharacter } from '../../store/inventory/inventorySlice';
import { CharacterCard } from './../../components/CharacterCard';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

export const CharacterAdder = ({characterData = []}) => {  

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { characters: selectedCharacters } = useSelector((state) => state.inventory)

  const handleOnClick = (char) => {
    if (!selectedCharacters.some((c) => c.name === char.name)) {
      dispatch(addCharacter(char));
      navigate('/');
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "That character is already on your inventory",
      });
      
    }    
  }



  return (
    <>
      <h4>Select the character you want to add</h4>
      <div className="card_container">
        {Object.values(characterData).map( ( char ) => (
          <CharacterCard key={char.name} character={char} handleOnClick={ () => handleOnClick(char) } />
        ))}
      </div>
    </>
  )
}
