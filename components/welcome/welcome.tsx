import { NextPage } from "next";
import { Button, Typography } from "@mui/material";

import { TabViewerTemplate } from "@components/tabViewer/TabViewerTemplate";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { getProvider } from "../../solidity/scripts/deploy";

export const Welcome: NextPage = () => {
  async function signMessage() {
    if (!window.ethereum) return alert("Please Install Metamask");

    const provider = await detectEthereumProvider();
    const ethereum = window.ethereum;
    const web3 = new Web3("https://public-node-api.klaytnapi.com/v1/baobab");

    // connect and get metamask account
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    // message to sign
    const message = "hello";
    console.log({ message });

    // hash message
    const hashedMessage = Web3.utils.sha3(message);
    console.log({ hashedMessage });

    // sign hashed message
    const signature = await ethereum.request({
      method: "personal_sign",
      params: [hashedMessage, accounts[0]],
    });

    const signatureNoMetamask = await web3.eth.accounts.sign(
      hashedMessage as string,
      process.env.NEXT_PUBLIC_KLAYTN_BAOBAB_KEY as string,
    );
    console.log({ signature, signatureNoMetamask });

    // split signature
    const r = signature.slice(0, 66);
    const s = "0x" + signature.slice(66, 130);
    const v = parseInt(signature.slice(130, 132), 16);
    console.log({ r, s, v });
  }

  return (
    <TabViewerTemplate header="test multisig">
      <Typography paragraph variant="h6">
        example {<span style={{ color: "yellow" }}> multi sig </span>}
      </Typography>
      <Button
        onClick={async () => {
          await signMessage();
        }}
        style={{ textTransform: "none" }}
      >
        click to test signHelloMessage
      </Button>
    </TabViewerTemplate>
  );
};
