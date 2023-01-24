import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

type stringToBoolean = {
  [key: string]: boolean;
};
// Type for our state
export interface SnackBarState {
  open: stringToBoolean;
  reason: string;
}

// Initial state
const initialState: SnackBarState = {
  open: {},
  reason: "no reason",
};

// Actual Slice
export const SnackBarSlice = createSlice({
  name: "snackBar",
  initialState,
  reducers: {
    resetSnackBarState(state, action) {
      state.open = initialState.open;
      state.reason = initialState.reason;
    },
    // Action to set the authentication status
    setSnackBarState(
      state,
      action: { payload: { reason: string; presence: boolean } }
    ) {
      state.open = {
        ...state.open,
        [action.payload.reason]: action.payload.presence
      };
    },

    newSnackBarReason(
      state,
      action: {payload: string}
    ) {
      state.open = {
        ...state.open,
        [action.payload]: false
      };
    }

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
  },
});

export const { setSnackBarState, resetSnackBarState, newSnackBarReason } = SnackBarSlice.actions;

export const selectSnackBarState = (state: AppState) => {
  return { ...state.snackBar };
};

export default SnackBarSlice.reducer;
