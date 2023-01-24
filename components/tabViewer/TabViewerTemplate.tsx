import { Block50 } from "@components/Item/block50";
import { Grid, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import { isMobile } from "react-device-detect";

export type TabViewerTemplateProps = {
  children?: React.ReactNode;
  header?: string;
};

export const TabViewerTemplate = (props: TabViewerTemplateProps) => {
  return isMobile ? (
    <Grid container spacing={1} >
      <Toolbar />
      <Grid item xs={12} sx={{marginLeft:1, marginRight:1}}>
        {props.header ? (
          isMobile ? (
            <Typography variant="h3">{props.header}</Typography>
          ) : (
            <Typography variant="h1">{props.header}</Typography>
          )
        ) : (
          ""
        )}
        <Block50 height={50} />
        {props.children}
      </Grid>
    </Grid>
  ) : (
    <Grid container spacing={1}>
      <Toolbar />
      <Grid item xs={1}></Grid>
      <Grid item xs={9}>
        {props.header ? (
          isMobile ? (
            <Typography variant="h3">{props.header}</Typography>
          ) : (
            <Typography variant="h1">{props.header}</Typography>
          )
        ) : (
          ""
        )}
        <Block50 height={50} />
        {props.children}
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};
