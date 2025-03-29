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
     if (!selectedCharacters.some((c) => c.name === char.name) ) {
      Swal.fire({
        title: "Enter character details",
        //* Form for both current level and desired level
        html: `
          <div class="d-flex flex-row justify-content-center">
            <input id="level" type="number" class="swal2-input" placeholder="Current Level">
            <p class="mb-auto mt-auto"> ⇒ </p>
            <input id="desired-level" type="number" class="swal2-input" placeholder="Desired Level">
          </div>
          ${["basic-attack", "dodge", "assist", "special-attack", "chain-attack", "core-skill"].map((skill) => {
            const formattedSkill = skill.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
          return `
          <div class="d-flex flex-row justify-content-center">
            <input id=${skill} type="number" class="swal2-input" placeholder="${formattedSkill}" />
            <p class="mb-auto mt-auto"> ⇒ </p>
            <input id="desired-${skill}" type="number" class="swal2-input" placeholder="Desired ${formattedSkill}"/>
          </div>
          `;
          })
          .join("")}`,
        width: "80vw",
        showCancelButton: true,
        preConfirm: () => {
          const getValue = (id) => document.getElementById(id)?.value || "1";
          const desiredLevel = getValue("desired-level");

          if(desiredLevel < 1 || desiredLevel > 60){
            Swal.showValidationMessage("Please introduce valid desired levels")
            return false;
          }
          ["basic-attack", "dodge", "assist", "special-attack", "chain-attack", "core-skill"].map((skill) => {
            const desiredSkill = getValue(`desired-${skill}`);
            if (desiredSkill < 1 || desiredSkill > 12) {
              Swal.showValidationMessage("Please introduce valid desired levels for all talents");
              return false;
            }
          });

          const characterDetails = {
            ...char,
            level: parseInt(getValue("level"), 10),
            desiredLevel: parseInt(getValue("desired-level"), 10),
            talents: [parseInt(getValue("basic-attack"), 10), parseInt(getValue("dodge"), 10), parseInt(getValue("assist"), 10), parseInt(getValue("special-attack"), 10),
              parseInt(getValue("chain-attack"), 10)
            ],
            coreSkill: parseInt(document.getElementById("core-skill")?.value || 0, 10),
            desiredTalents: [parseInt(getValue("desired-basic-attack"), 10), parseInt(getValue("desired-dodge"), 10), parseInt(getValue("desired-assist"), 10), parseInt(getValue("desired-special-attack"), 10),
              parseInt(getValue("desired-chain-attack"), 10)
            ],
            desiredCoreSkill: parseInt(document.getElementById("desired-core-skill")?.value || 0, 10),
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
      <div className="card-container">
        {Object.values(characterData).map( ( char ) => (
          <CharacterCard key={char.name} character={char} handleOnClick={ () => handleOnClick(char) } />
        ))}
      </div>
    </>
  )
}
