import { createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = "https://zzz-api-kbvl.onrender.com";

export const fetchApiData = createAsyncThunk(
  'api/fetchData', 
  async (_, { rejectWithValue }) => {
    try {
      const [charactersRes, itemsRes] = await Promise.all([
        fetch(`${apiUrl}/characters`), 
        fetch(`${apiUrl}/items`)       
      ]);

      if (!charactersRes.ok || !itemsRes.ok) {
        throw new Error(`HTTP error! status: ${charactersRes.status || itemsRes.status}`);
      }

      const [characters, items] = await Promise.all([
        charactersRes.json(),
        itemsRes.json()
      ]);

      return {
        characters: characters.data,
        items: items.data
      };
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);