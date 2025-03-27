import { useMemo } from "react";
import { TalentsDisplay } from "./TalentsDisplay";
import { FaCheckSquare, FaEdit, FaRegSquare } from "react-icons/fa";
import { MaterialsLeft } from "./MaterialsLeft";
import { AiOutlineDelete } from "react-icons/ai";

export const CharacterOnInventory = ({handleLevelUp, handleAscendCharacter, handleTalentLevelUp, handleCoreSkillLevelUp, charInfo, char, handleOnDelete}) => {

  const disable = useMemo(() => char.level >= char.maxLevel, [char.level, char.maxLevel]);

  return (
    <div key={char.name} className="character-on-inventory">
      <div className={`${charInfo?.attribute.toLowerCase()}-card-header`}>
        <h3>{char.name}</h3>
      </div>
        <div className="d-flex flex-col justify-content-end align-items-center gap-3 mr-5 mb-4">
          <button className="btn btn-secondary" style={{ marginRight: '8px' }}>
            <FaEdit /> Edit
          </button>
          <button className="btn btn-danger" style={{ marginRight: '8px' }} onClick={() => handleOnDelete(char.name)}>
            <AiOutlineDelete /> Delete
          </button>
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
              {char.desiredLevel > char.level ? <FaRegSquare color="orange"/> : <FaCheckSquare color="orange"/>}
            </div>
            <div>
              <p><strong>Core Skill:</strong> {char.coreSkill}</p>
              <p><strong>Desired Core Skill:</strong> {char.desiredCoreSkill}</p>          
              <button disabled={ char.coreSkill >= 6} className="btn btn-info" onClick={ handleCoreSkillLevelUp }>Level up</button>
              {char.desiredCoreSkill > char.coreSkill ? <FaRegSquare color="orange"/> : <FaCheckSquare color="orange"/>}
            </div>
          </div>
    
          {/* Talents Display */}
          <p><strong>Talents:</strong></p>
          <TalentsDisplay talents={ char.talents } desiredTalents={ char.desiredTalents } handleTalentLevelUp={ handleTalentLevelUp }/>
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