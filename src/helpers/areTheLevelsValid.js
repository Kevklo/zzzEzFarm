import { skillLevelTreshold } from "../mock/skillTresholds";

export const areTheLevelsValid = ({ level, desiredLevel, desiredTalents = [], talents = [], coreSkill }) => {
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

  return true;
};