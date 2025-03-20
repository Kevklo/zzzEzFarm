import { skillLevelTreshold } from "../mock/skillTresholds";

export const areTheLevelsValid = ({level, talents = [], coreSkill}) => {
  if(level > 60 || level < 1) return false;
  for(const talentLevel of talents){
    const threshold = skillLevelTreshold.find(({ levelNeeded }) => level < levelNeeded);
    
    if (threshold && talentLevel > threshold.maxTalentLevel) {
      return false;
    }
  }
  //Todo: Validar CoreSkill
  return true;
}
