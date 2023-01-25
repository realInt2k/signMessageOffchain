import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import networkInfo from 'solidity/networkInfo.json';

// Type for our state
export interface LocalComputerState {
  isAdmin: boolean[];
  isRunning: boolean[];
  contract: any;
}

// Initial state
const initialState: LocalComputerState = {
  isAdmin: [true, false, false, false, false],
  isRunning: [false, false, false, false, false],
  contract: [null, null, null, null, null],
};

// Actual Slice
export const LocalComputerSlice = createSlice({
  name: "localComputer",
  initialState,
  reducers: {
    resetLocalComputerState(state, action) {
      state.isAdmin = initialState.isAdmin;
    },
    turnOn(state, action: { payload: number }) {
      state.isRunning[action.payload] = true;
    },
    turnOff(state, action: { payload: number }) {
      state.isRunning[action.payload] = false;
    },
    // Action to set the authentication status
  },
});

export const { resetLocalComputerState, turnOn, turnOff } = LocalComputerSlice.actions;

export const selectLocalComputerState = (state: AppState) => {
  return { ...state.localComputer };
};

export default LocalComputerSlice.reducer;
