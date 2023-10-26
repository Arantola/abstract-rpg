import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Attributes, Skills } from "../models/types";
import { DB_LINK, HERO_STATIC, INITIAL_HERO_STATE } from "../models/constants";

/*
health: 3 + strength;
stamina: 10 + agility;
evasion: agility + intelligence;
*/

export const fetchHeroData = createAsyncThunk(
  "fetch-hero",
  async (thunkAPI) => {
    const response = await fetch(DB_LINK, { method: "GET" });
    const data = await response.json();
    return data;
  }
);

export const saveHeroData = createAsyncThunk(
  "save-hero",
  async (payload: any, thunkAPI) => {
    try {
      const response = await fetch(DB_LINK, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Error updating data");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const heroSlice = createSlice({
  name: "hero",
  initialState: INITIAL_HERO_STATE,
  reducers: {
    createHero(state, action) {
      return action.payload.hero;
    },
    changeName(state, action) {
      state.name = action.payload.name;
    },
    changeAttrubute(state, action) {
      const attribute: keyof Attributes = action.payload.attribute;
      const change: 1 | -1 = action.payload.change;
      const { stats, skills, attributes } = state;

      attributes[attribute] += change;

      for (const skill of HERO_STATIC.attributes[attribute]) {
        if (skills[skill as keyof Skills] > attributes[attribute]) {
          skills[skill as keyof Skills]--;
        }
      }

      if (attribute === "strength") {
        stats.health.maxValue! += change;
        if (stats.health.value === 1 && change === -1) {
          stats.health.value = 1;
        } else if (stats.health.value !== 0) {
          stats.health.value += change;
        }
      }
      if (attribute === "agility") {
        state.stats.stamina.maxValue! += change;
        state.stats.stamina.value += change;
        state.stats.evasion.value += change;
      }
      if (attribute === "intelligence") {
        state.stats.stamina.maxValue! += change;
        state.stats.stamina.value += change;
      }
    },
    trainSkill(state, action) {
      const skill: keyof Skills = action.payload.skill;
      state.skills[skill]++;
    },
    takeDamage(state) {
      state.stats.health.value--;
    },
    receiveHeal(state) {
      state.stats.health.value++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHeroData.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(saveHeroData.fulfilled, (state, action) => {
      return state;
    });
  },
});

export const heroActions = heroSlice.actions;

export default heroSlice.reducer;
