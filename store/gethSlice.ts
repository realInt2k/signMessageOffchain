import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
// Type for our state
export interface GethState {
  txCount: number;
  blockCount: number;
  transactions: string[];
  blockLimit: number;
  triggerProposal: boolean;
  triggerEvilMode: boolean;
  logs: string[];
}

// Initial state
const initialState: GethState = {
  txCount: 0,
  blockCount: 0,
  transactions: [],
  blockLimit: 5,
  triggerProposal: false,
  triggerEvilMode: false,
  logs: [],
};

// Actual Slice
export const GethSlice = createSlice({
  name: "geth",
  initialState,
  reducers: {
    resetGethState(state, action) {
      state.txCount = initialState.txCount;
      state.blockCount = initialState.blockCount;
      state.transactions = initialState.transactions;
      state.blockLimit = 5;
      state.triggerEvilMode = false;
      state.logs = [];
    },
    // Action to set the authentication status
    increaseGethState(
      state,
      action: {
        payload: string
      }
    ) {
      state.txCount = state.txCount + 1;
      state.transactions.push(action.payload);
      if(state.txCount === state.blockLimit) {
        state.blockCount += 1;
        state.txCount = 0;
        state.triggerProposal = true;
      }
    },
    stopProposal(
      state,
      action
    ) {
      state.triggerProposal = false;
    },
    setEvilMode(
      state,
      action:{payload:boolean}
    ) {
      state.triggerEvilMode = action.payload;
    },
    addGethLog(
      state,
      action:{payload:string}
    ) {
      state.logs.push(action.payload);
    }
  },
});

export const { addGethLog, setEvilMode, increaseGethState, resetGethState, stopProposal } = GethSlice.actions;

export const selectGethState = (state: AppState) => {
  return { ...state.geth };
};

export default GethSlice.reducer;
