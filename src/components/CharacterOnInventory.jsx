import { useMemo } from "react";
import { TalentsDisplay } from "./TalentsDisplay";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { MaterialsLeft } from "./MaterialsLeft";

export const CharacterOnInventory = ({handleLevelUp, handleAscendCharacter, handleTalentLevelUp, charInfo, char}) => {

  const disable = useMemo(() => char.level >= char.maxLevel, [char.level, char.maxLevel]);

  return (
    <div key={char.name} className="character-on-inventory">
      <div className={`${charInfo?.attribute.toLowerCase()}-card-header`}>
        <h3>{char.name}</h3>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="d-flex flex-col justify-content-around align-items-center gap-3 mb-3">
            {charInfo?.smallImg && (
              <div className="p-2">
                <img src={charInfo.smallImg} alt={char.name} style={{ width: "120px", height: "120px", borderRadius: "10px" }} />
              </div>
            )}
            <div>
              <p><strong>Level:</strong> {char.level}/{char.maxLevel}</p>
              <p><strong>Desired Level:</strong> {char.desiredLevel}</p>
              {char.desiredLevel > char.level ? <FaRegSquare color="orange"/> : <FaCheckSquare color="green"/>}
            </div>
            <div>
              <p><strong>Core Skill:</strong> {char.coreSkill}</p>
              <p><strong>Desired Core Skill:</strong> {char.desiredCoreSkill}</p>          
              {char.desiredCoreSkill > char.coreSkill ? <FaRegSquare color="orange"/> : <FaCheckSquare color="green"/>}
            </div>
          </div>
    
          {/* Talents Display */}
          <p><strong>Talents:</strong></p>
          <TalentsDisplay talents={ char.talents } desiredTalents={ char.desiredTalents }handleTalentLevelUp={ handleTalentLevelUp }/>
        </div>
        <div className="col-3">
          {/* Materials Display*/}
          <p><strong>Materials left to fully upgrade:</strong></p>
          <MaterialsLeft character={ char }/>
        </div>
      </div>  
      <button disabled={ disable } className="btn btn-primary mb-2" onClick={ () => handleLevelUp() }>Level Up</button>
        <br />
      <button disabled={ !disable || char.maxLevel == 60 } className="btn btn-danger" onClick={ () => handleAscendCharacter() }>Ascend</button>
  </div>
  )
}