import { ethers } from "ethers";
import hre from "hardhat";
import "@nomiclabs/hardhat-ethers";
import Web3 from "web3";
import * as fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();
import path from "path";
import * as readline from "readline";
import networkInfo from "../networkInfo.json";
import ganacheAccounts from "../ganacheAccounts.json";

export type networkNameType =
  | "ganache"
  | "polygonTest"
  | "klaytn"
  | "klaytnMainnet"
  | "polygonMainnet";

export const getProvider = (networkName: networkNameType) => {
  if (networkName === "klaytn") {
    return new ethers.providers.JsonRpcProvider(
      "https://public-node-api.klaytnapi.com/v1/baobab"
    );
  } else if (networkName === "ganache") {
    return new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
  } else {
    return new ethers.providers.JsonRpcProvider("");
  }
};

export const getPrivateKeyForNetwork = (networkName: networkNameType) => {
  if (networkName === "klaytn") {
    return process.env.NEXT_PUBLIC_KLAYTN_BAOBAB_KEY as string;
  } else if (networkName === "ganache") {
    return "0x09135a9671a6a05dea8d2179f675a26165da895f18f99e60db1ffcddc196eaab";
  } else {
    return "";
  }
};

export const getSigner = (networkName: networkNameType) => {
  const provider = getProvider(networkName);
  let privateKey = getPrivateKeyForNetwork(networkName);
  try {
    const signer = new ethers.Wallet(privateKey, provider);
    return signer;
  } catch (e: any) {
    console.log({
      error: "can't get signer/wallet, check networkName, privatekey (.env)",
      privateKey,
      networkname: networkName,
    });
    process.exit(0);
  }
};

async function main1(networkName: networkNameType) {
  console.log("DEPLOYING TO " + networkName);
  const wallet = getSigner(networkName);
  let Platoon: any;
  let soldier: any;
  var getContractFactory: any;

  getContractFactory = async (contractName: string) => {
    return await hre.ethers.getContractFactory(contractName, wallet);
  };
  let signedComputers:string[] = [];
  for(let i = 0; i < 5; ++i) {
    signedComputers.push(Object.keys(ganacheAccounts["private_keys"])[i]);
  }
  Platoon = await getContractFactory("LocalHoarder");
  const localHoarderSoldier = await Platoon.deploy(signedComputers);
  const localHoarderAddress = localHoarderSoldier.address;
  await localHoarderSoldier.deployed();
  console.log({
    localHoarderAddress: localHoarderAddress,
  });
  networkInfo["ganache"]["LocalHoarder"] = localHoarderAddress;

  Platoon = await getContractFactory("Verifier");
  const verifierSoldier = await Platoon.deploy(signedComputers);
  const verifierAddress = verifierSoldier.address;
  await verifierSoldier.deployed();
  console.log({
    verifierAddress,
  });
  networkInfo["ganache"]["Verifier"] = verifierAddress;

  Platoon = await getContractFactory("TargetContract");
  const targetContractSoldier = await Platoon.deploy();
  const targetContractAddress = targetContractSoldier.address;
  await targetContractSoldier.deployed();
  console.log({
    targetContractAddress,
  });

  networkInfo["ganache"]["TargetContract"] = targetContractAddress;
}

async function main(networkName: networkNameType) {
  console.log("DEPLOYING TO " + networkName);
  const wallet = getSigner(networkName);
  let Platoon: any;
  let soldier: any;
  var getContractFactory: any;

  getContractFactory = async (contractName: string) => {
    return await hre.ethers.getContractFactory(contractName, wallet);
  };

  // Platoon = await getContractFactory("LocalHoarder");
  // const localHoarderSoldier = await Platoon.deploy();
  // const localHoarderAddress = localHoarderSoldier.address;
  // await localHoarderSoldier.deployed();
  // console.log({
  //   localHoarderAddress: localHoarderAddress,
  // });
  // networkInfo["klaytn"]["LocalHoarder"] = localHoarderAddress;

  Platoon = await getContractFactory("Verifier");
  const verifierSoldier = await Platoon.deploy();
  const verifierAddress = verifierSoldier.address;
  await verifierSoldier.deployed();
  console.log({
    verifierAddress,
  });

  networkInfo["klaytn"]["Verifier"] = verifierAddress;

  Platoon = await getContractFactory("TargetContract");
  const targetContractSoldier = await Platoon.deploy();
  const targetContractAddress = targetContractSoldier.address;
  await targetContractSoldier.deployed();
  console.log({
    targetContractAddress,
  });

  networkInfo["klaytn"]["TargetContract"] = targetContractAddress;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

async function stupid() {
  // await main("klaytn");
  await main1("ganache");
  fs.writeFileSync(path.join(__dirname, "../networkInfo.json"), JSON.stringify(networkInfo, null, 2));
}

stupid();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
