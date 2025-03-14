import { useMemo } from "react";

export const CharacterOnInventory = ({handleLevelUp, charInfo, char}) => {

  const disable = useMemo(() => char.level >= char.maxLevel, [char.level, char.maxLevel]);

  return (
    <div key={char.name} style={{ color: 'black', border: "2px solid #007bff", borderRadius: "10px", padding: "10px", width: "250px", backgroundColor: "#f8f9fa", boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)" }}>
      <h3>{char.name}</h3>
      {charInfo?.smallImg && (
        <img src={charInfo.smallImg} alt={char.name} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
      )}
      <p><strong>Level:</strong> {char.level}/{char.maxLevel}</p>
      <p><strong>Core Skill:</strong> {char.coreSkill}</p>
      <p><strong>Talents:</strong> {char.talents.join(", ")}</p>
      <button disabled={ disable } className="btn btn-primary" onClick={ () => handleLevelUp(char.name) }>Level Up</button>
  </div>
  )
}