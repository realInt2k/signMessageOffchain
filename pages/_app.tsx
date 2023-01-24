import "../styles/globals.css";
import "../styles/animation.scss";
import type { AppProps } from "next/app";
import { persistor, wrapper } from "store/store";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableTouchRipple: false,
      },
    },
    MuiSpeedDial: {
      styleOverrides: {
        fab: {
          backgroundColor:"#bd1c9ff3"
        },
      }
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}
