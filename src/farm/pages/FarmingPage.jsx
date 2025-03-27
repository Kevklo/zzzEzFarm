import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { deleteCharacter } from "../../store/inventory/inventorySlice";
import { CharacterWrapper } from "../../components/CharacterWrapper";

export const FarmingPage = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { characters } = useSelector((state) => state.inventory);
  
  const handleClickAdd = () => {
    return navigate('/characteradder');
  }
  const handleOnDelete = (name) => {
    dispatch(deleteCharacter({name}))
  };

  return (
    characters.length == 0  ?
    <div>
      <h3 className="text-center mt-3 mb-5">Welcome to zzzEzFarm, the best place to organize your ZZZ Farming</h3>
      <h4>To get started add a character...</h4>
      <button className="btn btn-success" onClick={handleClickAdd}>Add <i className="fas fa-add mr-5"></i></button>
    </div>
    :
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", padding: "15px" }}>
      {characters.map((char) => (
        <CharacterWrapper 
          key={char.name} 
          char={char}
          handleOnDelete={handleOnDelete}
        />
      ))}
    </div>
  )
}
