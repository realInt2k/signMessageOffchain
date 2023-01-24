import type { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import {
  Stack,
  Toolbar,
  Divider,
} from "@mui/material";
import TabViewer from "@components/tabViewer";
import Footer from "@components/footer";

const Index: NextPage = () => {
  return (
    <Box id="fabulous">
      <Stack>
        <Box component="main">
          <Toolbar />
          <TabViewer />
        </Box>
        <Divider />
        <Footer />
      </Stack>
    </Box>
  );
};

export default Index;
