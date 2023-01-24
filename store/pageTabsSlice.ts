import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

// Type for our state

export interface PageTabsState {
  tabs: string[];
  length: number;
  focusTabName: string;
  focusTabIndex: number;
  scroll: number[];
  justSwitchedTabSignal: boolean;
  justSwitchedFromTab: number;
  switchTabType: number;
  // -1: undefined, 0: new Tab, 1: remove Tab, 2: stay in current Tab, 3: within current tabs // for scrolling memory
}

// Initial state
export const initialStateForTabs: PageTabsState = {
  tabs: ["welcome"],
  length: 1,
  focusTabName: "welcome",
  focusTabIndex: 0,
  scroll: [0],
  justSwitchedTabSignal: false,
  justSwitchedFromTab: -1,
  switchTabType: -1,
};

// Actual Slice
export const PageTabsSlice = createSlice({
  name: "pageTabs",
  initialState: initialStateForTabs,
  reducers: {
    resetPageTabsSlice(state, action) {
      state.tabs = initialStateForTabs.tabs;
      state.length = initialStateForTabs.length;
      state.focusTabName = initialStateForTabs.focusTabName;
      state.focusTabIndex = initialStateForTabs.focusTabIndex;
      state.scroll = initialStateForTabs.scroll;
      state.justSwitchedTabSignal = initialStateForTabs.justSwitchedTabSignal;
      state.justSwitchedFromTab = initialStateForTabs.justSwitchedFromTab;
      state.switchTabType = initialStateForTabs.switchTabType;
    },

    addTab(state, action: { payload: string }) {
      const tabName = action.payload;
      const findIndex = state.tabs.indexOf(tabName);
      if (findIndex === -1) {
        state.tabs.splice(state.length - 1, 0, tabName);
        state.scroll.splice(state.length - 1, 0, 0);
        state.focusTabIndex = state.length - 1;
        state.focusTabName = tabName;
        state.length += 1;
        state.justSwitchedTabSignal = !state.justSwitchedTabSignal;
        state.justSwitchedFromTab = state.length - 1;
        state.switchTabType = 0;
      } else {
        if (state.justSwitchedFromTab !== state.focusTabIndex) {
          state.justSwitchedFromTab = state.focusTabIndex;
          state.switchTabType = 3;
        } else {
          state.justSwitchedFromTab = -1;
          state.switchTabType = 2;
        }
        state.focusTabIndex = findIndex;
        state.justSwitchedTabSignal = !state.justSwitchedTabSignal;
        state.focusTabName = tabName;
      }
    },
    removeTab(
      state,
      action: { payload: { tabName: string; tabIndex: number } }
    ) {
      const index = action.payload.tabIndex;
      state.tabs.splice(index, 1);
      state.scroll.splice(index, 1);
      state.focusTabName = state.tabs[index];
      state.focusTabIndex = index;
      state.length -= 1;
      state.justSwitchedTabSignal = !state.justSwitchedTabSignal;
      state.justSwitchedFromTab = -1;
      state.switchTabType = 1;
    },

    focusTab(
      state,
      action: { payload: { tabName: string; tabIndex: number } }
    ) {
      let index = action.payload.tabIndex;
      if (index === -1)
        index = state.tabs.indexOf(action.payload.tabName);
      if (index === -1) return;

      if (state.focusTabIndex !== index) {
        state.justSwitchedFromTab = state.focusTabIndex;
        state.switchTabType = 3;
      } else {
        state.justSwitchedFromTab = -1;
        state.switchTabType = 2;
      }
      state.focusTabName = action.payload.tabName;
      state.focusTabIndex = index;
      state.justSwitchedTabSignal = !state.justSwitchedTabSignal;
    },

    setTabScroll(
      state,
      action: { payload: { tabIndex: number; scroll: number } }
    ) {
      const index = action.payload.tabIndex;
      state.scroll[index] = action.payload.scroll;
    },
  },
});

export const { addTab, removeTab, focusTab, resetPageTabsSlice, setTabScroll } =
  PageTabsSlice.actions;

export const selectPageTabsState = (state: AppState) => {
  return {
    ...state.pageTabs,
  };
};

export default PageTabsSlice.reducer;
