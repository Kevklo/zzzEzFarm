import { createSlice } from '@reduxjs/toolkit'
import { expPerLevel } from '../../mock/levelData';

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState: {
      //*Characters array contains characters that have a name, level, exp, coreSkill, ascencion, maxLevel
      //*and a talents array that keeps track of talent levels
      characters: [], // name: Burnice, level: 1, coreSkill: 0, talents:[1, 1, 1, 1, 1]
      //*Items object with key contains items with a name and an amount
      items: {} //name: material, amount: 1,
    },
    reducers: {
      //* Recieves a name and adds a character with that name and default stats to the inventory
      addCharacter: (state, action ) =>  {
        const {name, level, talents, coreSkill, desiredLevel, desiredTalents, desiredCoreSkill} = action.payload;
        const maxLevel = Math.ceil(level / 10) * 10;
        const exp = expPerLevel[level - 1];
        state.characters.push({name, level, coreSkill, talents, maxLevel, exp, desiredLevel, desiredTalents, desiredCoreSkill});
      },

      //* Receives a name and an amount, adds an item with that name and that amount to the inventory
      //* if the item is already on the inventory it adds the amount to the current amount of the item
      addItem: (state, action) => {
        const { name, amount } = action.payload;
        if (state.items[name]) {
          state.items[name].amount += amount;
        } else {
          state.items[name] = { name, amount };
        }
      },

      //* Receives a name and an amount, adds that amount of exp to the character with that name
      //* if the character is not on the inventory it does nothing
      addExp: (state, action) => {
        const { name, expAmount } = action.payload;
        const character = state.characters.find(c => c.name === name);
        if (!character) return;

        character.exp += expAmount;

        while (character.level < character.maxLevel &&
              character.exp >= expPerLevel[character.level - 1]) {
          character.level += 1;
        } if (character.level == character.maxLevel){
          character.exp = expPerLevel[character.level - 1];
        }
      },

      //*Receives a number and a name, levels up the talent in that position for the character
      //*with that name
      levelUpTalent: (state, action) => {
        const { name, talent } = action.payload;
        const character = state.characters.find(c => c.name === name);
        character.talents[talent]++;
      },

      //* Receives a name and an amount, and removes that amount of the item of that name, if the item
      //* is not on the inventory it does nothing, if the amount is more than the item amount in your inventory
      //* it removes the entire item
      removeItems: (state, action) => {
        const {name, amount} = action.payload;
        if(!state.items[name]) return;
        state.items[name].amount -= amount;
        if(state.items[name].amount <= 0){
          delete state.items[name];
        }
      },
      
      //* Recieves a name and ascends the character with said name, increasing its maxLevel
      ascendCharacter: (state, action) => {
        const { name } = action.payload;
        const character = state.characters.find(c => c.name === name);
        if(character.maxLevel < 60){
          character.maxLevel += 10;
        }
      }
  }})

export const { addCharacter, addItem, addExp, removeItems, levelUpTalent, ascendCharacter } = inventorySlice.actions;