import { ethers } from "ethers";
import ganacheAccounts from "../ganacheAccounts.json";
import { getProvider } from "./deploy";
import store from "store/store";

import abi from "../abis/AllContractsABI.json";
import networkInfo from "solidity/networkInfo.json";
import { addGethLog, stopProposal } from "@store/gethSlice";
import Web3 from "web3";
import { turnOff } from "@store/localComputersSlice";

export const getComputerPrivateKey = (computerId: number) => {
  return Object.values(ganacheAccounts["private_keys"])[computerId];
};

export const getComputerAddress = (computerId: number) => {
  return Object.keys(ganacheAccounts["private_keys"])[computerId];
};

export const getContractForComputer = (
  computerId: number,
  contractAddress: string
) => {
  // console.log(getComputerPrivateKey(computerId), getProvider("ganache"));
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );
  const signer = new ethers.Wallet(getComputerPrivateKey(computerId), provider);
  const contract = new ethers.Contract(contractAddress, abi, signer);
  return contract;
};

type ComputerRunningStateType = {
  [key: number]: boolean;
};

const InitialComputerRunningState = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
};

let computerRunningState: ComputerRunningStateType =
  InitialComputerRunningState;
let txDataBatch: string[];
let blockLimit: number = 0;
let gethBlockCount = 0;
let gethTxCount = 0;
let triggerProposal: boolean = false;
let evilMode = false;

export const subscribeStoreForComputers = () => {
  handleStoreChangeForComputers(); // constructor;

  function handleStoreChangeForComputers() {
    const state = store.getState();
    txDataBatch = state.geth.transactions;
    blockLimit = state.geth.blockLimit;
    gethBlockCount = state.geth.blockCount;
    gethTxCount = state.geth.txCount;
    triggerProposal = state.geth.triggerProposal;
    evilMode = state.geth.triggerEvilMode;
    for (let i = 0; i < state.localComputer.isRunning.length; ++i) {
      if (
        computerRunningState[i] === false &&
        state.localComputer.isRunning[i] === true
      ) {
        computerRunningState[i] = true;
        doComputerThing(i, networkInfo["ganache"]["LocalHoarder"]);
      } else {
        computerRunningState[i] = state.localComputer.isRunning[i];
      }
    }
  }

  return store.subscribe(handleStoreChangeForComputers);
};

export const doComputerThing = async (
  computerId: number,
  contractAddress: string
) => {
  const web3 = new Web3();
  const contract = getContractForComputer(computerId, contractAddress);
  let contractVerifier;
  if (computerId === 0) {
    contractVerifier = getContractForComputer(
      computerId,
      networkInfo["ganache"]["Verifier"]
    );
    contractVerifier.on("errorNoSigner", (...args: any) => {
      console.log("event errorNoSigner: ", { args });
    });
    contractVerifier.on("errorWrongAddress", (...args: any) => {
      console.log("event errorWrongAddress: ", { args });
    });
  }
  // contract.on("proposeNewBatchEvent", (...args:any[]) => {
  //   console.log({ proposeNewBatchEvent: args });
  // });
  while (true) {
    if (!computerRunningState[computerId]) {
      break;
    }
    if (computerId === 0) {
      if (triggerProposal) {
        let txDataBatchToBeSent: string[] = [];
        let targetContractAddresses: string[] = [];
        for (
          let i = txDataBatch.length - blockLimit;
          i < txDataBatch.length;
          ++i
        ) {
          if(evilMode)
            txDataBatchToBeSent.push(txDataBatch[0]);
          else 
            txDataBatchToBeSent.push(txDataBatch[i]);
          targetContractAddresses.push(networkInfo["klaytn"]["TargetContract"]);
        }
        if(evilMode) {
          store.dispatch(addGethLog("comp 0: I altered the txDataBatch"));
        }
        console.log({ txDataBatchToBeSent });
        const propose = await contract.proposeNewBatch(
          txDataBatchToBeSent,
          targetContractAddresses,
          gethBlockCount - 1
        );
        console.log({ propose });
        store.dispatch(stopProposal(null));
      }

      const gethBlocksToBeSend = await contract.getGethBlocksToBeSend();
      if (gethBlocksToBeSend.length > 0) {
        const decodedGethBlocksToBeSend = gethBlocksToBeSend.map((elem: any) =>
          Number(elem)
        );

        for (let i = 0; i < decodedGethBlocksToBeSend.length; ++i) {
          const gethBlock = decodedGethBlocksToBeSend[i];
          const txBatchData = await contract.getProposalTxDataFromGethBlock(
            gethBlock
          );
          const _v = await contract.getAllV(gethBlock);
          const _r = await contract.getAllR(gethBlock);
          const _s = await contract.getAllS(gethBlock);
          // NOW we send this to verifier on REAL network
          //const param = web3.eth.abi.encodeParameter("bytes", txBatchData);
          const param = Web3.utils.sha3(txBatchData);
          console.log({ txBatchData, param });
          if (contractVerifier) {
            const verify = await contractVerifier.Verify(param, _v, _r, _s);
            console.log({ verify });
            if (verify === true) {
              const sentGethBlock = await contract.sentGethBlock(gethBlock);
              store.dispatch(addGethLog(`comp 0: verified ${gethBlocksToBeSend} OK`))
              await sentGethBlock.wait();
            } else {
              const reVerify = await contractVerifier.reVerify(
                param,
                _v,
                _r,
                _s
              );
              await reVerify.wait();
              console.log("turnning comp 0 off");
              store.dispatch(turnOff(0));
              contractVerifier?.removeAllListeners();
              return;
            }
          }
          //console.log(param)
        }
      }
    }
    // send signatures to all unsigned batches (aka gethBlocks)
    const unsignedGethBlocks = await contract.getUnsignedGethBlocks(
      getComputerAddress(computerId)
    );
    for (let i = 0; i < unsignedGethBlocks.length; ++i) {
      
      let gethBlock = Number(unsignedGethBlocks[i]);

      // check if it's legit
      let txDataBatchToBeSent: string[] = [];
      let targetContractAddresses: string[] = [];
      for (let i = gethBlock * 5; i < gethBlock * 5 + 5; ++i) {
        txDataBatchToBeSent.push(txDataBatch[i]);
        targetContractAddresses.push(networkInfo["klaytn"]["TargetContract"]);
      }
      const getTxDataBatch = await contract.getTxDataBatch(
        txDataBatchToBeSent,
        targetContractAddresses
      );

      const proposalTxData = await contract.getProposalTxDataFromGethBlock(
        gethBlock
      );
      // console.log({
      //   computer: computerId,
      //   "selfCompiledTxDataBatch": getTxDataBatch,
      //   checkagainst: getTxDataBatch === proposalTxData,
      // });
      if (proposalTxData !== getTxDataBatch && computerId !== 0) {
        store.dispatch(addGethLog(`comp ${computerId}: proposed txDataBatch is not OK ❌, turning off!`));
        store.dispatch(turnOff(computerId));
        return;
      } else {
        store.dispatch(addGethLog(`comp ${computerId}: proposed txDataBatch is OK 👍`));
      }
      
      const privateKey = getComputerPrivateKey(computerId);
      const { r, s, v } = signMessage(proposalTxData, privateKey);
      try {
        const sendSignature = await contract.sendSignature(
          getComputerAddress(computerId),
          v,
          r,
          s,
          gethBlock
        );
        await sendSignature.wait();
        console.log(computerId, "signed ", gethBlock);
      } catch (e: any) {
        console.log({ e });
      }
    }

    // console.log(computerId, ":", {
    //   gethBlockCount,
    //   gethTxCount,
    //   triggerProposal,
    //   unsignedGethBlocks,
    // });
    await sleep(5000);
  }
  contract.removeAllListeners();
  if (computerId === 0) {
    contractVerifier?.removeAllListeners();
  }
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function signMessage(message: string, privateKey: string) {
  const web3 = new Web3();

  const hashedMessage = Web3.utils.sha3(message);
  // sign hashed message
  const signatureNoMetamask = web3.eth.accounts.sign(
    hashedMessage as string,
    privateKey
  );

  const signature = signatureNoMetamask.signature;

  // split signature
  const r = signature.slice(0, 66);
  const s = "0x" + signature.slice(66, 130);
  const v = parseInt(signature.slice(130, 132), 16);
  //console.log({privateKey, hashedMessage, r, s, v });
  return { r, s, v };
}
