import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Transaction = {
  id: number;
  amount: number;
  transactionType: TransactionType;
  description: string;
  date: string;
  category: string;
};

export interface TransactionsState {
  transactionsEntities: Transaction[];
}

export type TransactionType = keyof typeof transactionsType;

export const transactionsType = {
  income: "Income",
  expense: "Expense",
};

const initialState: TransactionsState = {
  transactionsEntities: [],
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      const transaction = action.payload;
      state.transactionsEntities.push(transaction);
    },
    removeTransaction: (state, action: PayloadAction<Transaction>) => {
      const findIndex = state.transactionsEntities.findIndex(
        (a) => a.id === action.payload.id
      );
      findIndex !== -1 && state.transactionsEntities.splice(findIndex, 1);
    },
    editTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactionsEntities.map((transaction) =>
        transaction.id !== action.payload.id ? transaction : action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTransaction, removeTransaction, editTransaction } =
  transactionsSlice.actions;

export default transactionsSlice.reducer;
