import { useNavigate } from 'react-router-dom';
import { addCharacter } from '../../store/inventory/inventorySlice';
import { CharacterCard } from './../../components/CharacterCard';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { areTheLevelsValid } from '../../helpers/areTheLevelsValid';

export const CharacterAdder = ({characterData = []}) => {  

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { characters: selectedCharacters } = useSelector((state) => state.inventory)

  const handleOnClick = (char) => {
    if (!selectedCharacters.some((c) => c.name === char.name)) {
      Swal.fire({
        title: "Enter character details",
        html: `
          <input id="level" type="number" class="swal2-input" placeholder="Level">
          <input id="basic-attack" type="number" class="swal2-input" placeholder="Basic Attack Level">
          <input id="dodge" type="number" class="swal2-input" placeholder="Dodge Level">
          <input id="assist" type="number" class="swal2-input" placeholder="Assist Level">
          <input id="special-attack" type="number" class="swal2-input" placeholder="Special Attack Level">
          <input id="chain-attack" type="number" class="swal2-input" placeholder="Chain Attack Level">
          <input id="core-skill" type="number" class="swal2-input" placeholder="Core Skill Level">
        `,
        showCancelButton: true,
        preConfirm: () => {
          const getValue = (id) => document.getElementById(id)?.value || "1";
  
          const characterDetails = {
            ...char,
            level: parseInt(getValue("level"), 10),
            talents: [parseInt(getValue("basic-attack"), 10), parseInt(getValue("dodge"), 10), parseInt(getValue("assist"), 10), parseInt(getValue("special-attack"), 10),
              parseInt(getValue("chain-attack"), 10)
            ],
            coreSkill: parseInt(document.getElementById("core-skill")?.value || 0, 10)
          };
          if(!areTheLevelsValid(characterDetails)){
            Swal.showValidationMessage("Please introduce valid levels")
            return false;
          }
          return characterDetails;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(addCharacter(result.value));
          navigate("/");          
        }
        
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "That character is already in your inventory",
      });
    }
  };



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
