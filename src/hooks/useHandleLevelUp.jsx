import { useEffect, useCallback, useState } from "react";
import Swal from "sweetalert2";
import { addExp, ascendCharacter, levelUpCoreSkill, levelUpTalent, removeItems } from "../store/inventory/inventorySlice";
import { useDispatch, useSelector } from "react-redux";
import { itemsData } from "../mock/itemsData";
import { expPerLevel } from "../mock/levelData";
import { skillMaterialsPerLevel } from "../mock/skillLevelData";
import { characterData } from "../mock/characterData";
import { skillLevelTreshold } from "../mock/skillTresholds";
import { promotionData } from "../mock/promotionData";
import { coreSkillData } from "../mock/coreSkillData";
import { coreSkillLevelTreshold } from "../mock/coreSkillTreshold";

const getPromotionLevel = (level) => {
  const promotionLevels = { 10: 0, 20: 1, 30: 2, 40: 3, 50: 4 };
  return promotionLevels[level] ?? -1;
};

export function useHandleLevelUp({ character }) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.inventory);
  const [SILCount, setSILCount] = useState(0);
  const [neededLogsToMaxLevel, setNeededLogsToMaxLevel] = useState(0);

  useEffect(() => {
    setSILCount(items["Senior_Investigator_Log"]?.amount || 0);
    setNeededLogsToMaxLevel(
        Math.ceil((expPerLevel[character.maxLevel - 1] - character.exp) / 3000)
      )
  }, [items, character]);

  const handleLevelUp = useCallback(() => {
    const { name } = character;
    const { img: SIL_img } = itemsData["Senior_Investigator_Log"];
    if (SILCount <= 0) {
      Swal.fire({
        icon: "error",
        title: "No Senior Investigator Logs available!",
        text: "You need at least 1 to level up a character.",
      });
      return;
    }
    Swal.fire({
      title: `You have ${SILCount} Senior Investigator Logs`,
      text: "How many do you want to use?",
      input: "number",
      inputAttributes: {
        min: "1",
        max: `${Math.min(SILCount, neededLogsToMaxLevel)}`,
        step: "1",
      },
      showCancelButton: true,
      showLoaderOnConfirm: true,
      imageUrl: SIL_img,
      imageWidth: 150,
      imageHeight: 150,
      preConfirm: (amount) => {
        const expAmount = amount * 3000;
        if (isNaN(expAmount) || expAmount <= 0) {
          return Swal.showValidationMessage("Enter a valid number.");
        }
        if ( amount > SILCount ) {
          return Swal.showValidationMessage("Not enough Senior Investigator Logs!");
        }
        dispatch(addExp({ expAmount, name }));
        dispatch(removeItems({ amount, name: "Senior_Investigator_Log" }));
      },
    });
  }, [SILCount, character, dispatch, neededLogsToMaxLevel]);

  const handleTalentLevelUp = useCallback((talent) => {
    const talentLevel = character.talents[talent];
    const canLevelUpTalent = skillLevelTreshold.some(
      ({ maxTalentLevel, levelNeeded }) => talentLevel < maxTalentLevel && character.level >= levelNeeded
    );
    const levelNeededEntry = skillLevelTreshold.find(({ levelNeeded }) => character.level < levelNeeded);
    const levelNeeded = levelNeededEntry ? levelNeededEntry.levelNeeded : null;
    const itemNeeded = skillMaterialsPerLevel[talentLevel - 1].item.replace(
      "Attribute",
      characterData[character.name].attribute
    );
    const { img: itemImg } = itemsData[itemNeeded];
    const availableAmount = items[itemNeeded]?.amount || 0;
    Swal.fire({
      title: `This talent is level ${talentLevel}`,
      html: `You have ${availableAmount} ${itemNeeded.replace(/_/g, " ")}.<br>
             You need ${skillMaterialsPerLevel[talentLevel - 1].amount} ${itemNeeded.replace(/_/g, " ")} 
             and ${skillMaterialsPerLevel[talentLevel - 1].denny} Denny to level up this talent.<br>
             Do you want to continue?`,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      imageUrl: itemImg,
      imageWidth: 150,
      imageHeight: 150,
      preConfirm: () => {
        if (availableAmount < skillMaterialsPerLevel[talentLevel - 1].amount) {
          return Swal.showValidationMessage("You don't have enough materials to level up this talent.");
        }
        if (!canLevelUpTalent) {
          return Swal.showValidationMessage(`You need to be level ${levelNeeded} to keep leveling up this talent`);
        }
        if (talentLevel < 11) {
          dispatch(levelUpTalent({ name: character.name, talent }));
          dispatch(removeItems({ amount: skillMaterialsPerLevel[talentLevel - 1].amount, name: itemNeeded }));
          dispatch(removeItems({ amount: skillMaterialsPerLevel[talentLevel - 1].denny, name: "Denny" }));
        } else {
          if (items["Hamster_Cage_Pass"]?.amount > 0) {
            dispatch(levelUpTalent({ name: character.name, talent }));
            dispatch(removeItems({ amount: skillMaterialsPerLevel[talentLevel - 1].amount, name: itemNeeded }));
            dispatch(removeItems({ amount: skillMaterialsPerLevel[talentLevel - 1].denny, name: "Denny" }));
            dispatch(removeItems({ amount: 1, name: "Hamster_Cage_Pass" }));
          } else {
            return Swal.showValidationMessage("You need a Hamster Cage Pass to level up this talent");
          }
        }
      },
    });
  }, [dispatch, character, items]);

  const handleAscendCharacter = useCallback(() => {
    const altMapping = {
      Anomaly: "Controller",
      Attack: "Pioneer's",
      Defense: "Defender",
      Stun: "Buster",
      Support: "Ruler",
    };
    const { name } = character;
    const promotionLevel = getPromotionLevel(character.level);
    const neededMaterials = promotionData[promotionLevel];
    let itemNeeded = neededMaterials.item;
    if (itemNeeded.includes("AltNameType")) {
      itemNeeded = itemNeeded.replace("AltNameType", altMapping[characterData[name].type] || "Unknown");
    } else {
      itemNeeded = itemNeeded.replace("Type", characterData[name].type);
    }
    const availableAmount = items[itemNeeded]?.amount || 0;
    Swal.fire({
      title: `Ascend Character`,
      html: `You have ${availableAmount} ${itemNeeded}.<br>
             You need ${neededMaterials.amount} ${itemNeeded} to ascend.<br>
             Do you want to continue?`,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        if (availableAmount < neededMaterials.amount) {
          return Swal.showValidationMessage("You don't have enough materials to ascend.");
        }
        dispatch(ascendCharacter({ name: character.name }));
        dispatch(removeItems({ amount: neededMaterials.amount, name: itemNeeded }));
      },
    });
  }, [dispatch, character, items]);

  const handleCoreSkillLevelUp = useCallback(() => {
    const coreLevel = character.coreSkill;
    const { name } = character;
    const { coreSkillMaterials } = characterData[name];
    const { bossMat, weeklyMat } = coreSkillMaterials;
    
    const required = coreSkillData[coreLevel];
    
    const { bossMat: bossMatNeeded, weeklyMat: weeklyMatNeeded, denny: dennyNeeded } = required;
  
    const available = {
      bossMat: items[bossMat]?.amount || 0,
      weeklyMat: items[weeklyMat]?.amount || 0,
      denny: items["Denny"]?.amount || 0
    };
  
    const canLevelUp = coreSkillLevelTreshold.some(
      ({ maxCoreLevel, levelNeeded }) => coreLevel < maxCoreLevel && character.level >= levelNeeded
    );
  
    const nextLevelReq = coreSkillLevelTreshold.find(({ levelNeeded }) => character.level < levelNeeded);
    const levelNeeded = nextLevelReq?.levelNeeded;
  
    const bossMatImg = itemsData[bossMat]?.img;
    const weeklyMatImg = itemsData[weeklyMat]?.img;
    const dennyImg = itemsData["Denny"]?.img;
  
    Swal.fire({
      title: `Core Skill level ${coreLevel}`,
      html: `
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <img src="${bossMatImg}" width="80" height="80" />
          <img src="${weeklyMatImg}" width="80" height="80" />
          <img src="${dennyImg}" width="80" height="80" />
        </div>
        <br>
        <strong>Required:</strong><br>
        ${bossMatNeeded} ${bossMat.replace(/_/g, " ")}<br>
        ${weeklyMatNeeded} ${weeklyMat.replace(/_/g, " ")}<br>
        ${dennyNeeded} Denny<br><br>
  
        <strong>Available:</strong><br>
        ${available.bossMat} ${bossMat.replace(/_/g, " ")}<br>
        ${available.weeklyMat} ${weeklyMat.replace(/_/g, " ")}<br>
        ${available.denny} Denny
      `,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        if (available.bossMat < bossMatNeeded) {
          return Swal.showValidationMessage("Not enough boss materials.");
        }
        if (available.weeklyMat < weeklyMatNeeded) {
          return Swal.showValidationMessage("Not enough weekly materials.");
        }
        if (available.denny < dennyNeeded) {
          return Swal.showValidationMessage("Not enough Denny.");
        }
        if (!canLevelUp) {
          return Swal.showValidationMessage(`You need to be at least level ${levelNeeded} to continue.`);
        }
  
        dispatch(levelUpCoreSkill({ name }));
        dispatch(removeItems({ amount: bossMatNeeded, name: bossMat }));
        dispatch(removeItems({ amount: weeklyMatNeeded, name: weeklyMat }));
        dispatch(removeItems({ amount: dennyNeeded, name: "Denny" }));
      },
    });
  
  }, [character, items, dispatch]);

  return { handleLevelUp, handleTalentLevelUp, handleAscendCharacter, handleCoreSkillLevelUp };
}