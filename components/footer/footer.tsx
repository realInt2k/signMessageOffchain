import { Box, Grid } from "@mui/material";
import { Block50 } from "@components/Item/block50";
import Image from 'next/image'

export const Footer = () => {
  return (
    <Grid container justifyContent="center">
      <Box>
        <Block50 height={10} />
          <Image src="/int2k.png" alt="logo" width="50" height="50"/>
        <Block50 height={10} />
      </Box>
    </Grid>
  );
};
