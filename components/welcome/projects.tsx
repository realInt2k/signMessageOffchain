import { Masonry } from "@mui/lab";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addTab } from "@store/pageTabsSlice";
import Image from "next/image";
import { pink, green } from "@mui/material/colors";
import useWindowDimensions from "../../hooks/useWindowsDimensionHook";

type projectCardType = {
  index: number;
  height: number;
  imageName: string;
  projectName: string;
  projectDescription: string;
  projectTabName: string;
};

export const projectCardsStatic = [
  {
    index: 1,
    height: 150,
    imageName: "system_architecture_abstract.png",
    projectName: "Kcloud",
    projectDescription:
      "Nuclear waste management always entails issues of trust from both public and private coperations, for obvious reasons. KCLOUD is a privated blockchain method applied on Nuclear waste monitoring system, in addition with IOT devices, to improve its transparency.",
    projectTabName: "KCLOUD",
  },
  {
    index: 2,
    height: 220,
    imageName: "LLVM.png",
    projectName: "LLVM",
    projectDescription:
      "Aiding the search of plausible injection errors in programs, using LLVM Pass and Directed Fuzzer",
    projectTabName: "LLVM",
  },
  {
    index: 3,
    height: 150,
    imageName: "thanksPay.png",
    projectName: "ThanksPay",
    projectDescription:
      "ThanksPay is a new way to pay your employees, built based on the transparency of Blockchain, as an end-user application, it uses some back-end blockchain twerks for better end-users experience.",
    projectTabName: "thanksPay",
  },
  {
    index: 5,
    height: 70,
    imageName: "uirp.jpg",
    projectName: "UIRP project",
    projectDescription:
      "why spend money to buy a bike as a poor student when you can hire it. This application let students hire bikes with transactions recorded in blockchain",
    projectTabName: "uirp",
  },
  {
    index: 6,
    height: 90,
    imageName: "LM.png",
    projectName: "league maker project",
    projectDescription:
      "Imagine you want to host a competition with your followers, with prizes and so on. This is a manager-tool that uses crypto and blockchain for prize, awarding related transactions",
    projectTabName: "leagueMaker",
  },
  {
    index: 7,
    height: 150,
    imageName: "ComputerVision.png",
    projectName: "Computer Vison - Poisson image blending",
    projectDescription:
      "(using Matlab) implementing Poisson image blending algorithm to blend different smaller images to a larger images smoothl",
    projectTabName: "computerVision",
  },
  {
    index: 8,
    height: 100,
    imageName: "deepcat.png",
    projectName: "Android Gallery program",
    projectDescription:
      "categorizes images from your phone using trained model from internet, written in JAVA, using Android studio",
    projectTabName: "deepCat",
  },
  {
    index: 4,
    height: 100,
    imageName: "covid2.png",
    projectName: "Covid data representation and alalysis tool",
    projectDescription:
      "An web application using d3-JS, geoJSON, HTML and simple Javascripts to make an interactive tools that include: Google Map interactions, time-lapse plotting to analyse Covid information. https://github.com/realInt2k/covid infoVis",
    projectTabName: "covid",
  },
  {
    index: 9,
    height: 50,
    imageName: "FPT.jpg",
    projectName: "FPT software (front-end)",
    projectDescription:
      "This is where I first learned to work in an industry-level front-end, where I coded an interface for receipt handling, including image manipulation, table management",
    projectTabName: "fptSoft",
  },
];

const ProjectCard = ({
  index,
  height,
  imageName,
  projectName,
  projectDescription,
  projectTabName,
}: projectCardType) => {
  const dispath = useDispatch();
  return (
    <Card
      key={index}
      // sx={{
      //   borderColor: "#800080",
      //   borderBlockStartColor: "#CE93D8",
      //   borderLeftColor: "#CE93D8",
      // }}
      className={"foatDiv"}
      onClick={() => {
        dispath(addTab(projectTabName));
      }}
    >
      {/* <CardMedia sx={{ height: height }} image={imageName} title="" /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {projectName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {projectDescription}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button
          size="small"
          // onClick={() => {
          //   dispath(addTab(projectTabName));
          // }}
        >
          Read More
        </Button> */}
        <Button
          sx={{ color: pink[300] }}
          size="small"
          onClick={() => {
            window.open(`experiences/${projectTabName}`, "_blank");
          }}
        >
          new browser Tab
        </Button>
      </CardActions>
    </Card>
  );
};

const ProjectCardMobile = ({
  index,
  height,
  imageName,
  projectName,
  projectDescription,
  projectTabName,
}: projectCardType) => {
  const dispath = useDispatch();
  return (
    <Card
      key={index}
      className={"foatDivMobile"}
    >
      {/* <CardMedia sx={{ height: 50 }} image={imageName} title="" /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {projectName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {projectDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            dispath(addTab(projectTabName));
          }}
        >
          Read More
        </Button>
        <Button
          sx={{ color: pink[300] }}
          size="small"
          onClick={() => {
            window.open(`experiences/${projectTabName}`, "_blank");
          }}
        >
          new Tab
        </Button>
      </CardActions>
    </Card>
  );
};

interface ProjectsProps {
  mobile: boolean;
}

const getMasonryColumns = (windowsWidth: number): number => {
  if (windowsWidth > 1100) {
    return 4;
  } else if (windowsWidth > 850) {
    return 3;
  } else {
    return 2;
  }
};

export const Projects = ({ mobile }: ProjectsProps) => {
  const { width, height } = useWindowDimensions();
  if (!mobile) {
    return (
      <Masonry columns={getMasonryColumns(width)} spacing={4}>
        {projectCardsStatic.map((item: projectCardType, index: number) => {
          return ProjectCard({
            ...item,
          });
        })}
      </Masonry>
    );
  } else
    return (
      <Stack spacing={2}>
        {projectCardsStatic.map((item: projectCardType, index: number) => {
          return ProjectCardMobile({
            ...item,
          });
        })}
      </Stack>
    );
};
