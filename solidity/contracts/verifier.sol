// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Verifier {

    mapping(address => bool) existComputer;
    address[] public signedComputers;

    event errorNoSigner (bytes32, uint8 , bytes32 , bytes32 );
    event errorWrongAddress (address);

    constructor(address[] memory _signedComputers) {
        signedComputers = _signedComputers;
        for(uint256 i = 0; i < signedComputers.length; ++i) {
            existComputer[signedComputers[i]] = true;
        }
    }

    function executeTransactions(
        address[] memory contractAddrArray,
        bytes[] memory txArray
    ) public {
        for (uint256 i = 0; i < txArray.length; ++i) {
            contractAddrArray[i].call(txArray[i]);
        }
    }

    function Message(bytes32 _hashedMessage, uint8 _v, bytes32 _r, bytes32 _s) public returns (address) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, _hashedMessage));
        address signer = ecrecover(prefixedHashMessage, _v, _r, _s);
        return signer;
    }

    function hello(bytes memory txBatchData) public pure returns (bytes memory) {
        return txBatchData;
    }


    function Verify(bytes32 txBatchData, uint8[] memory _v, bytes32[] memory _r, bytes32[] memory _s) public view returns (bool) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, txBatchData));
        for(uint256 i = 0; i < _v.length; ++i) {
            address signer = ecrecover(prefixedHashMessage, _v[i], _r[i], _s[i]);
            if(!existComputer[signer]) {
                return false;
            }
        }
        // then it sends to klaytn (but this is a demo)
        return true;
    }

    function reVerify (bytes32 txBatchData, uint8[] memory _v, bytes32[] memory _r, bytes32[] memory _s) public {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, txBatchData));
        for(uint256 i = 0; i < _v.length; ++i) {
            address signer = ecrecover(prefixedHashMessage, _v[i], _r[i], _s[i]);
            if(!existComputer[signer]) {
                emit errorNoSigner(txBatchData, _v[i], _r[i], _s[i]);
                emit errorWrongAddress(signer);
            }
        }
    }
}