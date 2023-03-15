// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import './verifier.sol';

// each batch is indexed by GETH's block number
contract LocalHoarder {
    struct signature {
        uint8 v;
        bytes32 r;
        bytes32 s;
    }
    Verifier verifierClone;
    mapping(uint256 => bool) requiredSign;
    mapping(uint256 => uint256) curNumberOfSignature;
    mapping(uint256 => bytes) proposalTxData;
    mapping(uint256 => signature[]) public gethBlockNumberToAllSignatures;
    mapping(address => uint256[]) public computerToUnsignedGethBlocks;

    uint256 numberOfRegisteredComputer = 5;
    address[] public signedComputers;
    uint256[] public gethBlocksToBeSend;
    mapping(address => mapping(uint256 => bool)) computerSignGethBlockCheck;

    event proposeNewBatchEvent(bytes txData, uint256 gethBlockNumber);
    uint256 leader = 0;
    uint256 noReports = 0;
    event allSignatureReceived(uint256 gethBlockNumber);

    constructor(address[] memory _signedComputers) {
        signedComputers = _signedComputers;
    }

    function getLeader() public view returns(uint256) {
        return leader;
    }

    function signalAbnomality(uint256 gethBlock, uint256 compId) public {
        noReports += 1;
        if(noReports >= numberOfRegisteredComputer) {
            leader = (leader + 1) % numberOfRegisteredComputer;
            noReports = 0;
        }
    }

    function proposeNewBatch(bytes[] memory txDataBatch, address[] memory targetContractAddresses, uint256 gethBlockNumber) public returns (bytes memory)  {
        requiredSign[gethBlockNumber] = true;
        proposalTxData[gethBlockNumber] = abi.encodeWithSelector(verifierClone.executeTransactions.selector, targetContractAddresses, txDataBatch);
        for(uint256 i = 0; i < numberOfRegisteredComputer; ++i) {
            computerToUnsignedGethBlocks[signedComputers[i]].push(gethBlockNumber);
        }
        emit proposeNewBatchEvent(proposalTxData[gethBlockNumber], gethBlockNumber);
        return proposalTxData[gethBlockNumber];
    }


    function getTxDataBatch(bytes[] memory txDataBatch, address[] memory targetContractAddresses) public view returns (bytes memory)  {
        return abi.encodeWithSelector(verifierClone.executeTransactions.selector, targetContractAddresses, txDataBatch);
    }

    function getGethBlocksToBeSend() public view returns(uint256[] memory) {
        return gethBlocksToBeSend;
    }

    function sentGethBlock (uint256 gethBlock) public {
        for(uint256 i = 0; i < gethBlocksToBeSend.length; ++i) {
            if(gethBlock == gethBlocksToBeSend[i]) {
                for(uint256 j = i; j < gethBlocksToBeSend.length - 1; ++j) {
                    gethBlocksToBeSend[j] = gethBlocksToBeSend[j + 1];
                }
                gethBlocksToBeSend.pop();
                break;
            }
        }
    }

    function getAllV(uint256 gethBlockNumber) public view returns (uint8[] memory) {
        signature[] memory tmp = gethBlockNumberToAllSignatures[gethBlockNumber];
        uint8[] memory res = new uint8[](tmp.length);
        for(uint256 i = 0; i < tmp.length; ++i) {
            res[i] = tmp[i].v;
        }
        return res;
    }

    function getAllR(uint256 gethBlockNumber) public view returns (bytes32[] memory) {
        signature[] memory tmp = gethBlockNumberToAllSignatures[gethBlockNumber];
        bytes32[] memory res = new bytes32[](tmp.length);
        for(uint256 i = 0; i < tmp.length; ++i) {
            res[i] = tmp[i].r;
        }
        return res;
    }

    function getAllS(uint256 gethBlockNumber) public view returns (bytes32[] memory) {
        signature[] memory tmp = gethBlockNumberToAllSignatures[gethBlockNumber];
        bytes32[] memory res = new bytes32[](tmp.length);
        for(uint256 i = 0; i < tmp.length; ++i) {
            res[i] = tmp[i].s;
        }
        return res;
    }

    // if checkSignSignal returns TRUE
    function sendSignature(address computer, uint8 _v, bytes32 _r, bytes32 _s, uint256 gethBlockNumber) public returns(string memory) {
        if(computerSignGethBlockCheck[computer][gethBlockNumber]) {
            return "already Signed";
        }
        computerSignGethBlockCheck[computer][gethBlockNumber] = true;
        // remove this geth block/batch from this computer 
        uint256[] storage blocks = computerToUnsignedGethBlocks[computer];
        for(uint256 i = 0; i < blocks.length; ++i) {
            if(blocks[i] == gethBlockNumber) {
                uint256 index = i;
                //remove;
                for(uint256 j = index; j < blocks.length - 1; ++j) {
                    blocks[j] = blocks[j + 1];
                }
                blocks.pop();
                break;
            }
        }
        curNumberOfSignature[gethBlockNumber] += 1;
        gethBlockNumberToAllSignatures[gethBlockNumber].push(signature(_v, _r, _s));
        if(curNumberOfSignature[gethBlockNumber] == numberOfRegisteredComputer) {
            gethBlocksToBeSend.push(gethBlockNumber);
            emit allSignatureReceived(gethBlockNumber);
        }
        return "ok";
    }

    function getUnsignedGethBlocks(address computer) public view returns(uint256[] memory) {
        //uint256[] memory blocks = computerToUnsignedGethBlocks(computer);
        return computerToUnsignedGethBlocks[computer];
    }

    function getProposalTxDataFromGethBlock(uint256 gethBlock) public view returns(bytes memory) {
        return proposalTxData[gethBlock];
    }

    // TODO: register new computer
}