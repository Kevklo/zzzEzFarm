import { useEffect, useCallback, useState } from "react";
import Swal from "sweetalert2";
import { addExp, levelUpTalent, removeItems } from "../store/inventory/inventorySlice";
import { useDispatch, useSelector } from "react-redux";
import { itemsData } from "../mock/itemsData";
import { expPerLevel } from "../mock/levelData";
import { skillMaterialsPerLevel } from "../mock/skillLevelData";
import { characterData } from './../mock/characterData';

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
    const { name } = character.name
    const { img: SIL_img } = itemsData["Senior_Investigator_Log"];

    if (SIL_count <= 0) {
      Swal.fire({
        icon: "error",
        title: "No Senior Investigator Logs available!",
        text: "You need at least 1 to level up a character.",
      });
      return;
    }

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

        dispatch(addExp({ expAmount, name }));
        dispatch(removeItems({ amount, name: "Senior_Investigator_Log" }))
      },
    });
  }, [SIL_count, dispatch]);

  const handleTalentLevelUp = useCallback((talent) => {
    
    const talentLevel = character.talents[talent];
    const itemNeeded = skillMaterialsPerLevel[talentLevel - 1].item.replace("Attribute", characterData[character.name].attribute);
    console.log(itemNeeded);
    
    const { img: itemImg } = itemsData[itemNeeded];

    Swal.fire({
      title: `This talent is level ${talentLevel}`,
      html: `You need ${skillMaterialsPerLevel[talentLevel - 1].amount} ${itemNeeded} to level up this talent.<br>Do you want to continue?`,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      imageUrl: itemImg,
      imageWidth: 150,
      imageHeight: 150,
      preConfirm: () => {
        const availableAmount = items[itemNeeded]?.amount || 0;
        if(availableAmount < skillMaterialsPerLevel[talent].amount){
          return Swal.showValidationMessage("You don't have enough materials to level up this talent.");
        }
        dispatch(levelUpTalent({name: character.name, talent}))
        dispatch(removeItems({ amount: skillMaterialsPerLevel[talent].amount, name: itemNeeded }))
      },
    });
  }, [dispatch, character, items]);

  return { handleLevelUp, handleTalentLevelUp };
};