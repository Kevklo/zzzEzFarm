import { characterData } from "../mock/characterData";
import { skillMaterialsPerLevel } from "../mock/skillLevelData";
import { promotionData } from './../mock/promotionData';
import { coreSkillData } from './../mock/coreSkillData';

export const getTotalMaterials = (name) => {
  if (!name) return;

  const charData = characterData[name];

  const altNameMapping = {
    Anomaly: "Controller",
    Attack: "Pioneer's",
    Defense: "Defender",
    Stun: "Buster",
    Support: "Ruler",
  };

  let skillMaterials = [];
  skillMaterials.push({ name: "Denny", amount: 0 });

  for (const skill of skillMaterialsPerLevel) {
    const { item, amount, denny } = skill;

    const existingMat = skillMaterials.find(mat => mat.name === item);
    if (existingMat) {
      existingMat.amount += amount;
    } else {
      skillMaterials.push({ name: item, amount });
    }

    const dennyMat = skillMaterials.find(mat => mat.name === "Denny");
    if (dennyMat) {
      dennyMat.amount += denny;
    }
  }

  for (const mat of skillMaterials) {
    if (mat.name.includes("Attribute")) {
      mat.name = mat.name.replace("Attribute", charData.attribute);
    }
  }

  let promotionMaterials = [];
  promotionMaterials.push({ name: "Denny", amount: 0 });

  for (const prom of promotionData) {
    const { item, amount, denny } = prom;

    const existingMat = promotionMaterials.find(mat => mat.name === item);
    if (existingMat) {
      existingMat.amount += amount;
    } else {
      promotionMaterials.push({ name: item, amount });
    }

    const dennyMat = promotionMaterials.find(mat => mat.name === "Denny");
    if (dennyMat) {
      dennyMat.amount += denny;
    }
  }

  for (const mat of promotionMaterials) {
    if (mat.name.includes("AltNameType")) {
      mat.name = mat.name.replace("AltNameType", altNameMapping[charData.type]);
    } else if( mat.name.includes("Type")){
      mat.name = mat.name.replace("Type", charData.type);
    }
  }

  let coreSkillMaterials = []
  const bossMat = charData.coreSkillMaterials.bossMat;
  const weeklyMat = charData.coreSkillMaterials.weeklyMat;
  coreSkillMaterials.push({ name: "Denny", amount: 0 });
  coreSkillMaterials.push({ name: bossMat, amount: 0});
  coreSkillMaterials.push({ name: weeklyMat, amount: 0});
  
  for(const core of coreSkillData){
    coreSkillMaterials[0].amount += core.denny;
    coreSkillMaterials[1].amount += core.bossMat;
    coreSkillMaterials[2].amount += core.weeklyMat; 
  }

  return {skillMaterials, promotionMaterials, coreSkillMaterials};
};