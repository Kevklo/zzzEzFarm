import { createSlice } from '@reduxjs/toolkit'

const expPerLevel = [0, 1000, 3000, 6000, 10000];

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState: {
      characters: [], // name: Burnice, level: 1, coreSkill: 0, talents:[1, 1, 1, 1, 1]
      items: [] //name: material, amount: 1,
    },
    reducers: {
      addCharacter: (state, action ) =>  {
        state.characters.push({name: action.payload.name, level: 1, coreSkill: 0, talents:[1, 1, 1, 1, 1], ascencion: 1, maxLevel: 20});
      },

      addItem: (state, action) => {
        const { name, amount } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
  
        if (existingItem) {
          existingItem.amount += amount;
        } else {
          state.items.push({ name, amount });
        }
      },

      addExp: (state, action) => {
        const { name, expAmount } = action.payload;
        const character = state.characters.find(c => c.name === name);
        if (!character) return;

        character.exp += expAmount;

        while (character.level < maxLevel &&
              character.exp >= expPerLevel[character.level - 1]) {
          character.level += 1;
        } if (character.level == maxLevel){
          character.exp = expPerLevel[character.level - 1];
        }
      },

  }})

export const { addCharacter, addItem } = inventorySlice.actions;