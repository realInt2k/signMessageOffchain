import { selectGethState, stopProposal } from "@store/gethSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContractForComputer } from "solidity/scripts/computerTask";
import networkInfo from "solidity/networkInfo.json";

export default function useComputersHook () {
  const gethState = useSelector(selectGethState);
  const dispatch = useDispatch();

  useEffect(() => {
    const sleep = async () => {
      function snoozle(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      await snoozle(4000);
    }
    // computer 0
    let contract:any = [];
    for(let i = 0; i < 5; ++i) {
      contract[i] = getContractForComputer(
        i,
        networkInfo["ganache"]["LocalHoarder"]
      );
    }
    while(1) {
      const txCount = gethState.txCount;
      console.log(gethState.triggerProposal, txCount)
      // if (gethState.triggerProposal === true) {
      //   // propose new batch by computer 1
      //   // get last 5 transactions:
      //   let txDataBatch = [];
      //   let targetContractAddresses = [];
      //   for (
      //     let i = gethState.transactions.length - gethState.blockLimit;
      //     i < gethState.transactions.length;
      //     ++i
      //   ) {
      //     txDataBatch.push(gethState.transactions[i]);
      //   }
      //   console.log({ txDataBatch });
      //   for (let i = 0; i < gethState.blockLimit; ++i) {
      //     targetContractAddresses[i] = networkInfo["klaytn"]["TargetContract"];
      //   }
      //   const gethBlockNumber = gethState.blockCount - 1;
      //   //const proposal = await contract[0].proposeNewBatch(txDataBatch, targetContractAddresses, gethBlockNumber);
      //   //console.log("contract 0 just proposed", proposal)
      //   dispatch(stopProposal(null));
      // } else {
      // }
      sleep().catch(console.error);
    }
    return () => {
    };
  }, []);
}