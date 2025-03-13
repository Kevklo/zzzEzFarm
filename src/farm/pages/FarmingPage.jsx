import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { characterData } from "../../mock/characterData"; //? TEMPORARY

export const FarmingPage = () => {
  
  const navigate = useNavigate();
  const { characters } = useSelector((state) => state.inventory);

  // const { characterData } = fetch


  const handleClickAdd = () => {

    return navigate('/characteradder');
    
  }

  return (
    characters.length == 0  ?
    <div>
      <h3 className="text-center mt-3 mb-5">Welcome to zzzEzFarm, the best place to organize your ZZZ Farming</h3>
      <h4>To get started add a character...</h4>
      <button className="btn btn-primary" onClick={handleClickAdd}>Add <i className="fas fa-add mr-5"></i></button>
    </div>
    :
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", padding: "15px" }}>
        {characters.map((char, index) => {
            const charInfo = characterData[char.name]; // Buscar el personaje en CharacterData

            return (
            <div key={index} style={{ color: 'black', border: "2px solid #007bff", borderRadius: "10px", padding: "10px", width: "250px", backgroundColor: "#f8f9fa", boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)" }}>
              <h3>{char.name}</h3>
              {charInfo?.smallImg && (
                <img src={charInfo.smallImg} alt={char.name} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
              )}
              <p><strong>Level:</strong> {char.level}/{char.maxLevel}</p>
              <p><strong>Core Skill:</strong> {char.coreSkill}</p>
              <p><strong>Talents:</strong> {char.talents.join(", ")}</p>
              <button className="btn btn-primary">Set Level</button>
            </div>
          );
        })}
    </div>
  )
}
