import { ethers } from 'ethers';
import hre from 'hardhat'
import '@nomiclabs/hardhat-ethers'
import Web3 from 'web3';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import * as readline from 'readline';

export type networkNameType = "ganache" | "polygonTest" | "klaytn" | "klaytnMainnet" | "polygonMainnet";

export const getProvider = (networkName: networkNameType) => {
  if(networkName==="klaytn") {
    return new ethers.providers.JsonRpcProvider("https://public-node-api.klaytnapi.com/v1/baobab");
  } else {
    return new ethers.providers.JsonRpcProvider("");
  }
}

export const getPrivateKeyForNetwork = (networkName: networkNameType) => {
  if(networkName==="klaytn") {
    return process.env.NEXT_PUBLIC_KLAYTN_BAOBAB_KEY as string;
  } else {
    return "xxx";
  }
}

export const getSigner = (networkName: networkNameType) => {
  const provider = getProvider(networkName);
  let privateKey = getPrivateKeyForNetwork(networkName);
  try {
      const signer = new ethers.Wallet(privateKey, provider);
      return signer;
  } catch (e:any) {
      console.log({
          error: "can't get signer/wallet, check networkName, privatekey (.env)",
          privateKey,
          "networkname": networkName
      });
      process.exit(0);
  }
}


async function main(networkName: networkNameType) {
  console.log('DEPLOYING TO ' + networkName);
  const wallet = getSigner(networkName);
  let Platoon: any;
  let soldier: any;
  var getContractFactory: any;

  getContractFactory = async (contractName: string) => {
    return await hre.ethers.getContractFactory(contractName, wallet);
  };
  Platoon = await getContractFactory("Verifier");
  const verifierSoldier = await Platoon.deploy();
  const verifierAddress = verifierSoldier.address;
  await verifierSoldier.deployed();
  console.log({
    deployed: verifierAddress
  })
  process.exit(0);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main("klaytn").catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
