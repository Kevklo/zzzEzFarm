import { useSelector } from "react-redux";
import { useHandleLevelUp } from "../hooks/useHandleLevelUp";
import { CharacterOnInventory } from "./CharacterOnInventory";

export const CharacterWrapper = ({ char, handleOnDelete }) => {

  const { handleLevelUp, handleTalentLevelUp, handleAscendCharacter, handleCoreSkillLevelUp } = 
  useHandleLevelUp({ character: char });
  
  const characterData = useSelector((store) => store.apiData.characters );
  const charInfo = characterData[char.name];

  return (
    <CharacterOnInventory
      handleLevelUp={handleLevelUp}
      handleTalentLevelUp={handleTalentLevelUp}
      handleAscendCharacter={handleAscendCharacter}
      handleCoreSkillLevelUp={handleCoreSkillLevelUp}
      charInfo={charInfo}
      char={char}
      handleOnDelete={handleOnDelete}
    />
  );
};