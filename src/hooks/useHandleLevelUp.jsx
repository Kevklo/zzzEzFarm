import { useEffect, useCallback, useState } from "react";
import Swal from "sweetalert2";
import { addExp, ascendCharacter, levelUpTalent, removeItems } from "../store/inventory/inventorySlice";
import { useDispatch, useSelector } from "react-redux";
import { itemsData } from "../mock/itemsData";
import { expPerLevel } from "../mock/levelData";
import { skillMaterialsPerLevel } from "../mock/skillLevelData";
import { characterData } from './../mock/characterData';
import { skillLevelTreshold } from "../mock/skillTresholds";
import { promotionData } from './../mock/promotionData';

const getPromotionLevel = (level) => {
  const promotionLevels = {
    10: 0, 20: 1, 30: 2, 40: 3, 50: 4
  };
  return promotionLevels[level] ?? -1;
}

export function useHandleLevelUp({character}) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.inventory);
  const [SIL_count, setSILCount] = useState(0);
  const [neededLogsToMaxLevel, setNeededLogsToMaxLevel] = useState(0)

  useEffect(() => {
    setSILCount(items["Senior_Investigator_Log"]?.amount || 0);
    character.level == 1 ? setNeededLogsToMaxLevel(Math.floor(expPerLevel[character.maxLevel - 2] / 3000))
    : setNeededLogsToMaxLevel(Math.floor((expPerLevel[character.maxLevel - 2] - expPerLevel[character.level - 2]) / 3000))

  }, [items, character]);

  

    const handleLevelUp = useCallback(() => {
    const { name } = character;
    const { img: SIL_img } = itemsData["Senior_Investigator_Log"];

    // Comprobamos si hay suficientes "Senior Investigator Logs"
    if (SIL_count <= 0) {
      Swal.fire({
        icon: "error",
        title: "No Senior Investigator Logs available!",
        text: "You need at least 1 to level up a character.",
      });
      return;
    }

    // Mostramos la ventana de confirmación con SweetAlert2
    Swal.fire({
      title: `You have ${SIL_count} Senior Investigator Logs`,
      text: "How many do you want to use?",
      input: "number",
      inputAttributes: { min: "1", max: `${Math.min(SIL_count, neededLogsToMaxLevel)}`, step: "1" },
      showCancelButton: true,
      showLoaderOnConfirm: true,
      imageUrl: SIL_img,
      imageWidth: 150,
      imageHeight: 150,
      preConfirm: (amount) => {
        const expAmount = parseInt(amount, 10) * 3000;

        if (isNaN(expAmount) || expAmount <= 0) {
          return Swal.showValidationMessage("Enter a valid number.");
        }
        if (parseInt(amount, 10) > SIL_count) {
          return Swal.showValidationMessage("Not enough Senior Investigator Logs!");
        }

        // Actualizamos los valores al confirmar
        dispatch(addExp({ expAmount, name }));
        dispatch(removeItems({ amount, name: "Senior_Investigator_Log" }));
      },
    });
  }, [SIL_count, character, dispatch, neededLogsToMaxLevel]);

  //* Function can be called at any time, so we validate everything
  const handleTalentLevelUp = useCallback((talent) => {
    
    const talentLevel = character.talents[talent];
    const canLevelUpTalent = skillLevelTreshold.some(
      ({ maxTalentLevel, levelNeeded }) => (talentLevel < maxTalentLevel && character.level >= levelNeeded)
    );
    const requiredLevel = skillLevelTreshold.find(({ levelNeeded }) => character.level < levelNeeded);
    
    const itemNeeded = skillMaterialsPerLevel[talentLevel - 1].item.replace("Attribute", characterData[character.name].attribute);
    
    const { img: itemImg } = itemsData[itemNeeded];
    const availableAmount = items[itemNeeded]?.amount || 0;

    Swal.fire({
      title: `This talent is level ${talentLevel}`,
      html: `You have ${availableAmount} ${itemNeeded}.<br>You need ${skillMaterialsPerLevel[talentLevel - 1].amount} ${itemNeeded} to level up this talent.<br>Do you want to continue?`,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      imageUrl: itemImg,
      imageWidth: 150,
      imageHeight: 150,
      preConfirm: () => {
        
        if(availableAmount < skillMaterialsPerLevel[talentLevel - 1].amount){
          return Swal.showValidationMessage("You don't have enough materials to level up this talent.");
        }
        if(!canLevelUpTalent){
          return Swal.showValidationMessage(`You need to be level ${requiredLevel.levelNeeded} to keep leveling up this talent`)
        }
        dispatch(levelUpTalent({name: character.name, talent}))
        dispatch(removeItems({ amount: skillMaterialsPerLevel[talent].amount, name: itemNeeded }))
      },
    });
  }, [dispatch, character, items]);



  //* Button already checks if the character is at max level
  const handleAscendCharacter = useCallback(() => {
    //? Auxiliar array to correctly name the items
    const altNameMapping = {Anomaly: "Controller", Attack: "Pioneer's", Defense: "Defender", Stun: "Buster", Support: "Ruler"}
    //?
    
    const { name } = character
    const promotionLevel = getPromotionLevel(character.level)
    const neededMaterials = promotionData[promotionLevel];
    let itemNeeded = neededMaterials.item;
    //! Changed because it was too long and confusing lmao itemNeeded.includes('AltNameType') ? itemNeeded = itemNeeded.replace('AltNameType', altNameMapping[character.type]) : itemNeeded = itemNeeded.replace('Type', character.type);
    if (itemNeeded.includes('AltNameType')) {
      itemNeeded = itemNeeded.replace('AltNameType', altNameMapping[characterData[name].type] || 'Unknown');
    } else {
      itemNeeded = itemNeeded.replace('Type', characterData[name].type);
    }
    const availableAmount = items[itemNeeded]?.amount || 0;
    Swal.fire({
      title: `Ascend Character`,
      html: `You have ${availableAmount} ${itemNeeded}.<br>You need ${neededMaterials.amount} ${itemNeeded} to ascend.<br>Do you want to continue?`,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        
        if(availableAmount < neededMaterials.amount){
          return Swal.showValidationMessage("You don't have enough materials to ascend.");
        }
        
        dispatch(ascendCharacter({name: character.name}))
        dispatch(removeItems({ amount: neededMaterials.amount, name: itemNeeded }))
      },
    });
  }, [dispatch, character, items]);

  return { handleLevelUp, handleTalentLevelUp, handleAscendCharacter };
};