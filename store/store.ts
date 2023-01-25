import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { PageTabsSlice } from "./pageTabsSlice";
import { createWrapper } from "next-redux-wrapper";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {SnackBarSlice} from './snackBarSlice';
import {GethSlice} from './gethSlice';
import {LocalComputerSlice} from './localComputersSlice';
//That error happens because you want to create the localstorage object on the server side, so that's the reason for warning.
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducerPageTabs = persistReducer(
  persistConfig,
  PageTabsSlice.reducer
);

const persistedReducerGeth = persistReducer(
  persistConfig,
  GethSlice.reducer
);

const persistedReducerLocalComputer = persistReducer(
  persistConfig,
  LocalComputerSlice.reducer
)

const store = configureStore({
  reducer: {
    [PageTabsSlice.name]: persistedReducerPageTabs,
    [GethSlice.name]: persistedReducerGeth,
    [LocalComputerSlice.name]: persistedReducerLocalComputer,
    [SnackBarSlice.name]: SnackBarSlice.reducer,
  },
  devTools: true,
  middleware: [thunk],
});

const makeStore = () => store;

export default store;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
export const persistor = persistStore(store);
