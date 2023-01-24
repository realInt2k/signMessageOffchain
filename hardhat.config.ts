const dotenv = require("dotenv");
import "hardhat-abi-exporter";
import { HardhatUserConfig, task } from "hardhat/config";
import "hardhat-contract-sizer";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomiclabs/hardhat-ethers";
// import '@nomiclabs/hardhat-waffle';
import * as hardhat from 'hardhat';

dotenv.config();

module.exports = {
    solidity: "0.8.13",
    defaultNetwork: "ganache",
    networks: {
      ganache: {
        url: "http://localhost:8545/",
        accounts:
          ["0x3fc1627209bee4dda790a4c02a2cd2af5ce28cbdf501023758b8dfbf662e8119"]
      }
    },
    abiExporter: [
      {
        path: "./abis",
        runOnCompile: true,
        clear: true,
        flat: true,
        spacing: 2,
        pretty: false,
      }
    ],
    paths: {
      root: "./solidity",
      sources: "./contracts",
      cache: "./cache",
      artifacts: "./artifacts"
    },
  typechain: {
    outDir: './src/typechains',
    target: 'ethers-v5',
    alwaysGenerateOverloads: true, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    externalArtifacts: ['externalArtifacts/*.json'], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
    dontOverrideCompile: false // defaults to false
  },
}