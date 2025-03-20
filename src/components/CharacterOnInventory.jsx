import { useMemo } from "react";
import { TalentsDisplay } from "./TalentsDisplay";

export const CharacterOnInventory = ({handleLevelUp, handleAscendCharacter, handleTalentLevelUp, charInfo, char}) => {

  const disable = useMemo(() => char.level >= char.maxLevel, [char.level, char.maxLevel]);

  return (
    <div key={char.name} style={{ color: 'black', border: "2px solid #007bff", borderRadius: "10px", padding: "10px", width: "350px", backgroundColor: "#f8f9fa", boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)" }}>
      <h3>{char.name}</h3>
      {charInfo?.smallImg && (
        <img src={charInfo.smallImg} alt={char.name} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
      )}
      <p><strong>Level:</strong> {char.level}/{char.maxLevel}</p>
      <p><strong>Core Skill:</strong> {char.coreSkill}</p>

      {/* Talents Display */}
      <p><strong>Talents:</strong></p>
      <TalentsDisplay talents={ char.talents } handleTalentLevelUp={ handleTalentLevelUp }/>
      <button disabled={ disable } className="btn btn-primary mb-2" onClick={ () => handleLevelUp() }>Level Up</button>
      <br />
      <button disabled={ !disable || char.maxLevel == 60 } className="btn btn-danger" onClick={ () => handleAscendCharacter() }>Ascend</button>
  </div>
  )
}