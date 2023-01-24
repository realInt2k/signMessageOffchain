import { Box, Container, Toolbar, Typography } from "@mui/material";
import Welcome from "@components/welcome";
import { useSelector } from "react-redux";
import { PageTabsState, selectPageTabsState } from "store/pageTabsSlice";

export const TabViewer = () => {
  const tabState: PageTabsState = useSelector(selectPageTabsState);
  const render = (focusTabName: string) => {
    if (focusTabName === "welcome") return <Welcome />;
    else
      return (
        <Container>
          <Toolbar />
          <Typography>not defined</Typography>
        </Container>
      );
  };
  return render(tabState.focusTabName);
};
