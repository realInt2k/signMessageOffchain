import { Paper, styled, Stack, Container, Grid } from "@mui/material";

type tagsProps = {
  tag: string[];
};

export const Tags = ({ tag }: tagsProps) => {
  return (
    <Grid container>
        {tag.map((item: string, index: number) => {
          return (
            <div key={index} style={{ color: "purple", marginRight: 10 }}>
              {item}
            </div>
          );
        })}
    </Grid>
  );
};
