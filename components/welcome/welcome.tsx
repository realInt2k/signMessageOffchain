import { NextPage } from "next";
import {
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { TabViewerTemplate } from "@components/tabViewer/TabViewerTemplate";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import * as React from "react";
import { Divider } from "@mui/material";
import { Block50 } from "../Item/block50";
import {
  getContractForComputer,
  doComputerThing,
  subscribeStoreForComputers,
} from "solidity/scripts/computerTask";
import { useSelector, useDispatch } from "react-redux";
import {
  resetGethState,
  selectGethState,
  increaseGethState,
  stopProposal,
  setEvilMode,
} from "store/gethSlice";

import networkInfo from "solidity/networkInfo.json";
import useComputersHook from "@hooks/useComputersHook";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import {
  selectLocalComputerState,
  turnOff,
  turnOn,
} from "store/localComputersSlice";
import { useEffect, useState } from "react";

export const Welcome: NextPage = () => {
  const inputRefs = React.useRef<any[]>([]);
  const gethState = useSelector(selectGethState);
  const computerState = useSelector(selectLocalComputerState);
  const [array, setArray] = useState<number[]>([]);
  const [toggle, setToggle] = useState<boolean>(true);
  useEffect(() => {
    const unsub = subscribeStoreForComputers();
    const contract = getContractForComputer(
      0,
      networkInfo["ganache"]["TargetContract"]
    );
    contract.getA().then((a: any) => {
      const decodedA = a.map((elem: any) => {
        return Number(elem);
      });
      setArray(decodedA);
    });
    return () => {
      unsub();
    };
  }, []);
  const dispatch = useDispatch();
  const triggerEvilModeButtonText = gethState.triggerEvilMode
    ? "hacker"
    : "law-abiding";
  return (
    <TabViewerTemplate header="Test Multisig">
      <Grid container>
        <Grid item xs={6}>
          <Button
            sx={{ color: "" }}
            onClick={() => {
              for (let i = 0; i < 5; ++i) {
                toggle ? dispatch(turnOn(i)) : dispatch(turnOff(i));
              }
              setToggle(!toggle);
            }}
          >
            <PowerSettingsNewIcon />
            <span style={{ paddingLeft: 10 }}>
              toggle all to {toggle ? "ON" : "OFF"}
            </span>
          </Button>
          <Button
            onClick={() => {
              dispatch(setEvilMode(!gethState.triggerEvilMode));
            }}
          >
            <div>
              Mode:{" "}
              {!gethState.triggerEvilMode ? (
                <span style={{ color: "lime" }}>
                  {triggerEvilModeButtonText} 😇
                </span>
              ) : (
                <span style={{ color: "red" }}>
                  {triggerEvilModeButtonText} 😈
                </span>
              )}
            </div>
          </Button>
          <Block50 height={10} />
          <Stack spacing={3}>
            {[0, 1, 2, 3, 4].map((elem, index) => {
              const color = !computerState.isRunning[elem] ? "darkred" : "lime";
              return (
                <Grid key={index} sx={{ backgroundColor: { color } }}>
                  🖥️ Computer {elem}
                  <Block50 height={12} />
                  <div id="append">
                    <TextField
                      key={Math.random()}
                      inputRef={(el: any) => (inputRefs.current[index] = el)}
                      defaultValue={`${elem}`}
                      id="outlined-basic"
                      label="value"
                      variant="outlined"
                    />
                    <Button
                      disabled={!computerState.isRunning[elem] ? true : false}
                      onClick={async () => {
                        const newValue = inputRefs.current[index].value;
                        const contract = getContractForComputer(
                          elem,
                          networkInfo["ganache"]["TargetContract"]
                        );
                        const append = await contract.append(newValue);
                        const a = await contract.getA();
                        // console.log({ a, append });
                        const decodedA = a.map((elem: any) => {
                          return Number(elem);
                        });
                        setArray(decodedA);
                        dispatch(increaseGethState(append.data));
                      }}
                    >
                      {" "}
                      append{" "}
                    </Button>
                  </div>
                  <Block50 height={3} />
                  <div id="changeVal">
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <TextField
                          key={Math.random()}
                          inputRef={(el: any) =>
                            (inputRefs.current[index + 5] = el)
                          }
                          defaultValue={`${elem + 5}`}
                          id="outlined-basic"
                          label="position"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          key={Math.random()}
                          inputRef={(el: any) =>
                            (inputRefs.current[index + 10] = el)
                          }
                          defaultValue={`${elem + 10}`}
                          id="outlined-basic"
                          label="value"
                          variant="outlined"
                          style={{
                            float: "left",
                            display: "inline",
                            width: "%49%",
                          }}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Button
                          disabled={
                            !computerState.isRunning[elem] ? true : false
                          }
                          onClick={() => {
                            const position = inputRefs.current[index + 5].value;
                            const value = inputRefs.current[index + 10].value;
                            // dispatch(increaseGethState("asdasdsadsadasda"));
                          }}
                        >
                          {" "}
                          change value at index{" "}
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                  <Block50 height={3} />
                  <Stack direction={"row"}>
                    <IconButton
                      onClick={() => {
                        !computerState.isRunning[elem]
                          ? dispatch(turnOn(elem))
                          : dispatch(turnOff(elem));
                      }}
                    >
                      <PowerSettingsNewIcon />
                    </IconButton>
                    <div>
                      <Typography variant={"h3"}> , </Typography>
                    </div>
                  </Stack>
                </Grid>
              );
            })}
          </Stack>
        </Grid>
        <Grid item xs={6} justifyContent={"center"}>
          <Typography variant={"h3"}> LOG </Typography>
          <Stack>
            <Stack direction={"row"}>
              <Stack>
                <Stack direction="row" spacing={2}>
                  <Typography variant={"h6"}> geth txCount: </Typography>
                  <Typography variant={"h6"} sx={{ color: "yellow" }}>
                    {gethState.txCount}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography variant={"h6"}> geth blockCount: </Typography>
                  <Typography variant={"h6"} sx={{ color: "yellow" }}>
                    {gethState.blockCount}
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction={"row"} spacing={1}>
                <Typography variant={"h6"}> Array: </Typography>
                <Stack direction={"row"} spacing={0.3}>
                  {array.map((elem, index) => {
                    return (
                      <Typography
                        sx={{ color: "yellow" }}
                        variant={"h6"}
                        key={index}
                      >
                        {elem}
                      </Typography>
                    );
                  })}
                </Stack>
              </Stack>
            </Stack>
            <Stack spacing={2}>
              <Typography variant={"h6"}> geth transactions data: </Typography>
              <Stack>
                {gethState.transactions.map((elem, index) => {
                  return (
                    <li key={index}>
                      {index}: {gethState.transactions[index]}
                    </li>
                  );
                })}
              </Stack>
            </Stack>
            <Block50 height={10} />
            <Stack spacing={2}>
              <Typography variant={"h6"}> messages: </Typography>
              <Stack>
                {gethState.logs.map((elem, index) => {
                  return (
                    <li key={index}>
                      {gethState.logs[index]}
                    </li>
                  );
                })}
              </Stack>
            </Stack>

            <Divider />
            <Button
              sx={{ color: "red" }}
              onClick={() => {
                dispatch(resetGethState(null));
              }}
            >
              {" "}
              reset geth state{" "}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </TabViewerTemplate>
  );
};
