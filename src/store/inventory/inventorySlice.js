import { createSlice } from '@reduxjs/toolkit'

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState: {
      characters: [], // name: Burnice, level: 1, coreSkill: 0, talents:[1, 1, 1, 1, 1]
      items: [] //name: material, amount: 1,
    },
    reducers: {
      addCharacter: (state, action ) =>  {
        state.characters.push({name: action.payload.name, level: 1, coreSkill: 0, talents:[1, 1, 1, 1, 1]});
      },

      addItem: (state, action) => {
        state.items.push({name: action.payload.name, amount: action.payload.amount});
      },

  }})

export const { addCharacter, addItem } = inventorySlice.actions;