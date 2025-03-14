import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { characterData } from "../../mock/characterData"; //? TEMPORARY
import { CharacterOnInventory } from "../../components/CharacterOnInventory";
import { useHandleLevelUp } from "../../hooks/useHandleLevelUp";

export const FarmingPage = () => {
  
  const navigate = useNavigate();
  const { characters } = useSelector((state) => state.inventory);
  const { handleLevelUp } = useHandleLevelUp();

  const handleClickAdd = () => {
    return navigate('/characteradder');
  }

  //TODO Level up Talents and Core Skills
  
  return (
    characters.length == 0  ?
    <div>
      <h3 className="text-center mt-3 mb-5">Welcome to zzzEzFarm, the best place to organize your ZZZ Farming</h3>
      <h4>To get started add a character...</h4>
      <button className="btn btn-primary" onClick={handleClickAdd}>Add <i className="fas fa-add mr-5"></i></button>
    </div>
    :
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", padding: "15px" }}>
        {characters.map((char) => {
            const charInfo = characterData[char.name];
            return (
            CharacterOnInventory({handleLevelUp, charInfo, char})
          );
        })}
    </div>
  )
}
