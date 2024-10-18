import { createSlice } from '@reduxjs/toolkit';

export interface CardSliceState {
  cardData: Card[];
}

type Card = {
  _id: string;
  text: string;
  description: string;
  image_base64: string;
  created_by: string;
  created_date: string;
  updated_by: string;
  updated_date: string;
};
const initialState: CardSliceState = {
  cardData: [],
};
export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    saveCardData: (state, action) => {
      state.cardData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveCardData } = cardSlice.actions;

export default cardSlice.reducer;
