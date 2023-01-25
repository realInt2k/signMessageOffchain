import path from "path";
// import fs
import * as fs from "fs";
import verifier from "../abis/Verifier.json";
import localHoarder from "../abis/LocalHoarder.json";
import TargetContract from "../abis/TargetContract.json";


// import all json 
const abis = [
  verifier,
  localHoarder,
  TargetContract,
];


const createAllContractsABI = (abis: any[]) => {
    const allContractsABI: any[] = [];
    abis.forEach((abi) => {
        abi.forEach((abiElement: any) => {
        const name = abiElement["name"];
            if (!allContractsABI.some((abiElement) => abiElement["name"] === name)) {
                allContractsABI.push(abiElement);
            } else {
            }
        });
    });

    const allContractsABIPath = path.join(__dirname, "../abis/AllContractsABI.json");
    //const allContractsABIPathForFrontEnd = path.join(__dirname, "../../../front-end/src/abis/AllContractsABI.json");
    fs.writeFileSync(allContractsABIPath, JSON.stringify(allContractsABI, null, 4));
    //fs.writeFileSync(allContractsABIPathForFrontEnd, JSON.stringify(allContractsABI, null, 4));
};

createAllContractsABI(abis);

export const runCreateAllContractsABI = () => {
    createAllContractsABI(abis);
}