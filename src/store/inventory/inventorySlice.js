import { createSlice } from '@reduxjs/toolkit'

const expPerLevel = [50, 200, 450, 850, 1450, 2250, 3250, 4500, 6000, 7800, 9735, 11800, 14000, 16335, 18800, 21400, 24135, 27000, 30000,
  34680, 39655, 44920, 50480, 56335, 62480, 68920, 75655, 82680, 90000,
  100800, 112200, 124200, 136800, 150000, 163800, 178200, 193200, 208800, 225000,
  242100, 260400, 279900, 300600, 322500, 345600, 369900, 395400, 422100, 450000,
  484200, 520800, 559800, 601200, 645000, 691200, 739800, 790800, 844200, 900000 ];

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
        state.characters.push({name: action.payload.name, level: 1, coreSkill: 0, talents:[1, 1, 1, 1, 1], ascencion: 1, maxLevel: 20, exp: 0});
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
          character.exp = expPerLevel[character.level - 2];
        }
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
      }

  }})

export const { addCharacter, addItem, addExp, removeItems } = inventorySlice.actions;