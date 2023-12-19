import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Symptom = {
  id: number;
  name: string;
  description: string;
  severity: number;
  date: string;
};

export interface SymptomsState {
  symptomsEntities: Symptom[];
}

const initialState: SymptomsState = {
  symptomsEntities: [],
};

export const symptomsSlice = createSlice({
  name: "symptoms",
  initialState,
  reducers: {
    addSymptom: (state, action: PayloadAction<Symptom>) => {
      const symptom = action.payload;
      state.symptomsEntities.push(symptom);
    },
    removeSymptom: (state, action: PayloadAction<Symptom>) => {
      const findIndex = state.symptomsEntities.findIndex(
        (a) => a.id === action.payload.id
      );
      findIndex !== -1 && state.symptomsEntities.splice(findIndex, 1);
    },
    editSymptom: (state, action: PayloadAction<Symptom>) => {
      state.symptomsEntities.map((symptom) =>
        symptom.id !== action.payload.id ? symptom : action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addSymptom, removeSymptom, editSymptom } = symptomsSlice.actions;

export default symptomsSlice.reducer;
