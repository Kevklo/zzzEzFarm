import { useNavigate } from 'react-router-dom';
import { addCharacter } from '../../store/inventory/inventorySlice';
import { CharacterCard } from './../../components/CharacterCard';
import { useDispatch } from 'react-redux';


export const CharacterAdder = ({chars = []}) => {  

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleOnClick = (char) => {
    console.log('personaje añadido');
    dispatch(addCharacter(char));
    navigate('/');
  }

  return (
    <>
      <h4>Select the character you want to add</h4>
      <div className="card_container">
        {Object.values(chars).map( ( char ) => (
          <CharacterCard key={char.name} character={char} handleOnClick={ () => handleOnClick(char) } />
        ))}
      </div>
    </>
  )
}
