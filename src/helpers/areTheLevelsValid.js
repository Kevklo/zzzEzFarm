import { coreSkillLevelTreshold } from "../mock/coreSkillTreshold";
import { skillLevelTreshold } from "../mock/skillTresholds";

export const areTheLevelsValid = ({ level, desiredLevel, desiredTalents = [], talents = [], coreSkill, desiredCoreSkill }) => {
  if (level > 60 || level < 1) return false;

  const getThreshold = (lvl) =>
    [...skillLevelTreshold].reverse().find(({ levelNeeded }) => lvl >= levelNeeded);

  for (const talentLevel of talents) {
    const threshold = getThreshold(level);
    if (threshold && talentLevel > threshold.maxTalentLevel) {
      return false;
    }
  }

  for (const talentLevel of desiredTalents) {
    const threshold = getThreshold(desiredLevel);
    if (threshold && talentLevel > threshold.maxTalentLevel) {
      return false;
    }
  }

  const coreTreshold = [...coreSkillLevelTreshold].reverse().find(({ levelNeeded }) => level >= levelNeeded);
  if(coreTreshold && coreSkill > coreTreshold.maxCoreLevel) {
    return false;
  }

  const desiredCoreTreshold = [...coreSkillLevelTreshold].reverse().find(({ levelNeeded }) => desiredLevel >= levelNeeded);
  if(desiredCoreTreshold && desiredCoreSkill > desiredCoreTreshold.maxCoreLevel) {
    return false;
  }

  return true;
};