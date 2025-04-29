//*Receives a character and items and returns an array with every material 'left' to get to 
//*that character's desired levels. Each material has a name and an amount.
//*a material left consideres the total amount needed - the amount of that material on the inventory
//*0 is a possible amount

import { coreSkillData } from "../data/coreSkillData";
import { expPerLevel } from "../data/levelData";
import { skillMaterialsPerLevel } from "../data/skillLevelData";
import { promotionData } from './../data/promotionData';
import { useSelector } from "react-redux";


const altNameMapping = {
  Anomaly: "Controller",
  Attack: "Pioneer's",
  Defense: "Defender",
  Stun: "Buster",
  Support: "Ruler",
};

export const materialsNeeded = ({ char, items }) => {

  const characterData = useSelector((store) => store.apiData.characters);
  
  let totalDenny = 0;
  const { desiredLevel, talents, desiredTalents, exp, maxLevel, coreSkill, desiredCoreSkill } = char;
  let res = [];
  
  const logsOwned = items["Senior_Investigator_Log"]?.amount || 0;
  const neededLogs = {
    name: "Senior_Investigator_Log",
    amount: Math.max(Math.ceil(((expPerLevel[desiredLevel - 1] - exp) / 3000) - logsOwned), 0),
  };
  res.push(neededLogs);

  //* Talent materials calculation

  let talentMaterials = {};

  talents.forEach((talentLevel, index) => {
    const desiredTalentLevel = desiredTalents[index];
    for (let lvl = talentLevel; lvl < desiredTalentLevel; lvl++) {
      const material = skillMaterialsPerLevel[lvl - 1]?.item.replace("Attribute", characterData[char.name].attribute);
      const amount = skillMaterialsPerLevel[lvl - 1]?.amount;
      totalDenny += skillMaterialsPerLevel[lvl -1 ]?.denny;
      if (material) {
        talentMaterials[material] = (talentMaterials[material] || 0) + amount;
      }
    }
    if(desiredTalentLevel == 12 && talentLevel < 12){
      talentMaterials['Hamster_Cage_Pass'] = (talentMaterials['Hamster_Cage_Pass'] || 0) + 1;
    } 
  });

  if(!talentMaterials['Hamster_Cage_Pass']){
    talentMaterials['Hamster_Cage_Pass'] = 0;
  }
  skillMaterialsPerLevel.forEach(({ item }) => {
    if (!talentMaterials[item]) {
      talentMaterials[item] = 0;
    }
  });

const formattedTalentMaterials = Object.entries(talentMaterials).map(([material, totalNeeded]) => {
  let formattedMaterial = material;
  formattedMaterial = formattedMaterial.replace("Attribute", characterData[char.name].attribute);
  const owned = items[formattedMaterial]?.amount || 0;
  const needed = Math.max(Math.floor(totalNeeded - owned), 0);

  return { name: formattedMaterial, amount: needed };
});

const uniqueMaterials = formattedTalentMaterials.reduce((acc, { name, amount }) => {
  if (acc[name]) {
    acc[name].amount += amount;
  } else {
    acc[name] = { name, amount };
  }
  return acc;
}, {});


const finalMaterials = Object.values(uniqueMaterials);

finalMaterials.forEach(({ name, amount }) => {
  res.push({ name, amount });
});

  //*Prom Materials calculation 
  let neededProm = {};
  const promotionsNeeded = Math.max(((Math.ceil((desiredLevel) / 10) * 10)  - maxLevel) / 10, 0);
  const startIndex = maxLevel/10 - 1;
  const requiredPromotionMaterials = promotionData.slice(startIndex, startIndex + promotionsNeeded);

  requiredPromotionMaterials.forEach(({ item, amount, denny }) => {
    let formattedItem;
    if(item.includes("AltNameType")){
      formattedItem = item.replace("AltNameType", altNameMapping[characterData[char.name].type]);
    } else {
      formattedItem = item.replace("Type", characterData[char.name].type);
    }
    if (!neededProm[formattedItem]) {
      neededProm[formattedItem] = 0;
    }
    totalDenny += denny;
    neededProm[formattedItem] += amount;
  });
  
  promotionData.forEach(({ item }) => {
    let formattedItem;
    if (item.includes("AltNameType")) {
      formattedItem = item.replace("AltNameType", altNameMapping[characterData[char.name].type]);
    } else {
      formattedItem = item.replace("Type", characterData[char.name].type);
    }
    if (!neededProm[formattedItem]) {
      neededProm[formattedItem] = 0;
    }
  });

  Object.entries(neededProm).forEach(([name, totalNeeded]) => {
    const owned = items[name]?.amount || 0;
    const needed = Math.max(Math.floor(totalNeeded - owned), 0);

    res.push({ name, amount: needed });
  });
  
  //* Core Skill Materials Calculation:

  let neededCore = {};
  const bossMat = characterData[char.name].coreSkillMaterials.bossMat;
  const weeklyMat = characterData[char.name].coreSkillMaterials.weeklyMat;
  let bossAmount = 0;
  let weeklyAmount = 0;
  for(let i = coreSkill; i < desiredCoreSkill; i++){
    weeklyAmount += coreSkillData[i].weeklyMat;
    bossAmount += coreSkillData[i].bossMat;
    totalDenny += coreSkillData[i].denny;
  }

  bossAmount -= items[bossMat]?.amount || 0;
  weeklyAmount -= items[weeklyMat]?.amount || 0;
  bossAmount = Math.max(bossAmount, 0);
  weeklyAmount = Math.max(weeklyAmount, 0);
  neededCore[bossMat] = {name: bossMat, amount: bossAmount};
  neededCore[weeklyMat] = {name: weeklyMat, amount: weeklyAmount};

  Object.values(neededCore).forEach((mat) => {
    res.push({name: mat.name, amount: mat.amount})
  });

  const ownedDenny = items['Denny']?.amount || 0;
  totalDenny = Math.max(totalDenny - ownedDenny, 0);
  res.push({ name: 'Denny', amount: totalDenny});

  return res;
};