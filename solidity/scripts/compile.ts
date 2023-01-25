import hre from 'hardhat';
import { runCreateAllContractsABI } from './createAllContractABI';

async function main() {
  await hre.run('compile');
  await runCreateAllContractsABI();
}

main();
