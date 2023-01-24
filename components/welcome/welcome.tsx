import { NextPage } from "next";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

import { ExpandMoreTwoTone, Height } from "@mui/icons-material";
import Masonry from "@mui/lab/Masonry";
import { Projects } from "./projects";
import { useEffect, useState } from "react";
import { TabViewerTemplate } from "@components/tabViewer/TabViewerTemplate";
import useWindowDimensions from "@hooks/useWindowsDimensionHook";
import { Block50 } from "@components/Item/block50";

export const Welcome: NextPage = () => {
  const { height, width } = useWindowDimensions();

  return (
    <TabViewerTemplate header="Welcome to my page 😸" >
      <Typography paragraph variant="h6">
        example {" "}
        {<span style={{ color: "yellow" }}> multi sig </span>}
      </Typography>
    </TabViewerTemplate>
  );
};
