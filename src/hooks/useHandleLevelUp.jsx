import { useEffect, useCallback, useState } from "react";
import Swal from "sweetalert2";
import { addExp, ascendCharacter, levelUpCoreSkill, levelUpTalent, removeItems } from "../store/inventory/inventorySlice";
import { useDispatch, useSelector } from "react-redux";
import { expPerLevel } from "../data/levelData";
import { skillMaterialsPerLevel } from "../data/skillLevelData";
import { skillLevelTreshold } from "../data/skillTresholds";
import { promotionData } from "../data/promotionData";
import { coreSkillData } from "../data/coreSkillData";
import { coreSkillLevelTreshold } from "../data/coreSkillTreshold";

const getPromotionLevel = (level) => {
  const promotionLevels = { 10: 0, 20: 1, 30: 2, 40: 3, 50: 4 };
  return promotionLevels[level] ?? -1;
};

export function useHandleLevelUp({ character }) {

  const { characters: characterData, items: itemsData } = useSelector((state) => state.apiData);
  const { items } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();
  
  const [SILCount, setSILCount] = useState(0);
  const [neededLogsToMaxLevel, setNeededLogsToMaxLevel] = useState(0);

  useEffect(() => {
    setSILCount(items["Senior_Investigator_Log"]?.amount || 0);
    setNeededLogsToMaxLevel(
      Math.ceil((expPerLevel[character.maxLevel - 1] - character.exp) / 3000)
    );
  }, [items, character]);

  const getItemImage = (itemName) => {
    const item = itemsData.find(item => item.name === itemName);
    return item?.imageUrl || '';
  };

  const handleLevelUp = useCallback(() => {
    const { name } = character;
    const SIL_img = getItemImage("Senior_Investigator_Log");

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
          Swal.showValidationMessage("Enter a valid number.");
          return;
        }
        if (amount > SILCount) {
          Swal.showValidationMessage("Not enough Senior Investigator Logs!");
          return;
        }
        dispatch(addExp({ expAmount, name }));
        dispatch(removeItems({ amount, name: "Senior_Investigator_Log" }));
      },
    });
  }, [SILCount, character, dispatch, neededLogsToMaxLevel, getItemImage]);

  const handleTalentLevelUp = useCallback((talent) => {
    const talentLevel = character.talents[talent];
    const currentCharacter = characterData[character.name];
    
    const canLevelUpTalent = skillLevelTreshold.some(
      ({ maxTalentLevel, levelNeeded }) => 
        talentLevel < maxTalentLevel && character.level >= levelNeeded
    );

    const levelNeededEntry = skillLevelTreshold.find(
      ({ levelNeeded }) => character.level < levelNeeded
    );

    const materialInfo = skillMaterialsPerLevel[talentLevel - 1];
    const itemNeeded = materialInfo.item.replace(
      "Attribute", 
      currentCharacter.attribute
    );

    const availableAmount = items[itemNeeded]?.amount || 0;
    const dennyAvailable = items["Denny"]?.amount || 0;
    const itemImg = getItemImage(itemNeeded);

    Swal.fire({
      title: `This talent is level ${talentLevel}`,
      html: `You have ${availableAmount} ${itemNeeded.replace(/_/g, " ")}.<br>
             You need ${materialInfo.amount} ${itemNeeded.replace(/_/g, " ")} 
             and ${materialInfo.denny} Denny to level up this talent.`,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      imageUrl: itemImg,
      imageWidth: 150,
      imageHeight: 150,
      preConfirm: () => {
        if (availableAmount < materialInfo.amount) {
          Swal.showValidationMessage("Not enough materials!");
          return;
        }
        if (dennyAvailable < materialInfo.denny) {
          Swal.showValidationMessage("Not enough Denny!");
          return;
        }
        if (!canLevelUpTalent && levelNeededEntry) {
          Swal.showValidationMessage(`Requires level ${levelNeededEntry.levelNeeded}`);
          return;
        }

        const updates = [
          levelUpTalent({ name: character.name, talent }),
          removeItems({ amount: materialInfo.amount, name: itemNeeded }),
          removeItems({ amount: materialInfo.denny, name: "Denny" })
        ];

        if (talentLevel >= 11) {
          if (!items["Hamster_Cage_Pass"]?.amount) {
            Swal.showValidationMessage("Hamster Cage Pass required!");
            return;
          }
          updates.push(removeItems({ amount: 1, name: "Hamster_Cage_Pass" }));
        }

        updates.forEach(action => dispatch(action));
      },
    });
  }, [character, items, dispatch, characterData, getItemImage]);

  const handleAscendCharacter = useCallback(() => {
    const typeMapping = {
      Anomaly: "Controller",
      Attack: "Pioneer's",
      Defense: "Defender",
      Stun: "Buster",
      Support: "Ruler",
    };

    const promotionLevel = getPromotionLevel(character.level);
    const neededMaterials = promotionData[promotionLevel];
    const dennyNeeded = neededMaterials.denny || 0;
    
    let itemNeeded = neededMaterials.item
      .replace("AltNameType", typeMapping[characterData[character.name].type] || "")
      .replace("Type", characterData[character.name].type);

    const availableAmount = items[itemNeeded]?.amount || 0;
    const dennyAvailable = items["Denny"]?.amount || 0;
    const itemImg = getItemImage(itemNeeded);

    Swal.fire({
      title: `Ascend Character`,
      html: `You have ${availableAmount} ${itemNeeded.replace(/_/g, " ")}.<br>
             You need ${neededMaterials.amount} ${itemNeeded.replace(/_/g, " ")} 
             and ${dennyNeeded} Denny to ascend.`,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      imageUrl: itemImg,
      imageWidth: 150,
      imageHeight: 150,
      preConfirm: () => {
        if (availableAmount < neededMaterials.amount) {
          Swal.showValidationMessage("Not enough materials!");
          return;
        }
        if (dennyNeeded > 0 && dennyAvailable < dennyNeeded) {
          Swal.showValidationMessage("Not enough Denny!");
          return;
        }

        dispatch(ascendCharacter({ name: character.name }));
        dispatch(removeItems({ amount: neededMaterials.amount, name: itemNeeded }));
        if (dennyNeeded > 0) {
          dispatch(removeItems({ amount: dennyNeeded, name: "Denny" }));
        }
      },
    });
  }, [character, items, dispatch, characterData, getItemImage]);

  const handleCoreSkillLevelUp = useCallback(() => {
    const { name, coreSkill: coreLevel } = character;
    const { coreSkillMaterials } = characterData[name];
    const { bossMat, weeklyMat } = coreSkillMaterials;
    const required = coreSkillData[coreLevel];

    const available = {
      bossMat: items[bossMat]?.amount || 0,
      weeklyMat: items[weeklyMat]?.amount || 0,
      denny: items["Denny"]?.amount || 0
    };

    const canLevelUp = coreSkillLevelTreshold.some(
      ({ maxCoreLevel, levelNeeded }) => 
        coreLevel < maxCoreLevel && character.level >= levelNeeded
    );

    const levelNeeded = coreSkillLevelTreshold.find(
      ({ levelNeeded }) => character.level < levelNeeded
    )?.levelNeeded;

    Swal.fire({
      title: `Core Skill level ${coreLevel}`,
      html: `
        <div class="material-display">
          <div>
            <img src="${getItemImage(bossMat)}" width="80" height="80" />
            <p>${available.bossMat}/${required.bossMat}</p>
          </div>
          <div>
            <img src="${getItemImage(weeklyMat)}" width="80" height="80" />
            <p>${available.weeklyMat}/${required.weeklyMat}</p>
          </div>
          <div>
            <img src="${getItemImage("Denny")}" width="80" height="80" />
            <p>${available.denny}/${required.denny}</p>
          </div>
        </div>
        ${!canLevelUp && levelNeeded ? 
          `<p class="warning">Requires level ${levelNeeded}</p>` : ''}
      `,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        if (!canLevelUp) {
          Swal.showValidationMessage(`Requires level ${levelNeeded}`);
          return;
        }
        if (available.bossMat < required.bossMat) {
          Swal.showValidationMessage("Not enough boss materials");
          return;
        }
        if (available.weeklyMat < required.weeklyMat) {
          Swal.showValidationMessage("Not enough weekly materials");
          return;
        }
        if (available.denny < required.denny) {
          Swal.showValidationMessage("Not enough Denny");
          return;
        }

        dispatch(levelUpCoreSkill({ name }));
        dispatch(removeItems({ amount: required.bossMat, name: bossMat }));
        dispatch(removeItems({ amount: required.weeklyMat, name: weeklyMat }));
        dispatch(removeItems({ amount: required.denny, name: "Denny" }));
      },
    });
  }, [character, items, dispatch, characterData, getItemImage]);

  return { 
    handleLevelUp, 
    handleTalentLevelUp, 
    handleAscendCharacter, 
    handleCoreSkillLevelUp 
  };
}