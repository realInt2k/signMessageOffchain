// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract TargetContract {
    uint256[] public a;

    function append(uint256 v) public {
        a.push(v);
    }

    function change(uint256 i, uint256 v) public {
        require(i < a.length, "out of bound");
        a[i] = v;
    }

    function getA() public view returns (uint256[] memory) {
        return a;
    }
}