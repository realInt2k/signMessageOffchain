/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { Verify, VerifyInterface } from "../Verify";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_hashedMessage",
        type: "bytes32",
      },
      {
        internalType: "uint8",
        name: "_v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "_r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "_s",
        type: "bytes32",
      },
    ],
    name: "VerifyMessage",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506103bc806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063659934c114610030575b600080fd5b61004a6004803603810190610045919061019d565b610060565b6040516100579190610245565b60405180910390f35b6000806040518060400160405280601c81526020017f19457468657265756d205369676e6564204d6573736167653a0a3332000000008152509050600081876040516020016100b09291906102fb565b6040516020818303038152906040528051906020012090506000600182888888604051600081526020016040526040516100ed9493929190610341565b6020604051602081039080840390855afa15801561010f573d6000803e3d6000fd5b505050602060405103519050809350505050949350505050565b600080fd5b6000819050919050565b6101418161012e565b811461014c57600080fd5b50565b60008135905061015e81610138565b92915050565b600060ff82169050919050565b61017a81610164565b811461018557600080fd5b50565b60008135905061019781610171565b92915050565b600080600080608085870312156101b7576101b6610129565b5b60006101c58782880161014f565b94505060206101d687828801610188565b93505060406101e78782880161014f565b92505060606101f88782880161014f565b91505092959194509250565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061022f82610204565b9050919050565b61023f81610224565b82525050565b600060208201905061025a6000830184610236565b92915050565b600081519050919050565b600081905092915050565b60005b83811015610294578082015181840152602081019050610279565b838111156102a3576000848401525b50505050565b60006102b482610260565b6102be818561026b565b93506102ce818560208601610276565b80840191505092915050565b6000819050919050565b6102f56102f08261012e565b6102da565b82525050565b600061030782856102a9565b915061031382846102e4565b6020820191508190509392505050565b61032c8161012e565b82525050565b61033b81610164565b82525050565b60006080820190506103566000830187610323565b6103636020830186610332565b6103706040830185610323565b61037d6060830184610323565b9594505050505056fea2646970667358221220a923c4b8261551ec4a380d7a3d01467f6c0c96346304e42b5e407cc735aa1ab964736f6c634300080d0033";

type VerifyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VerifyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Verify__factory extends ContractFactory {
  constructor(...args: VerifyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Verify> {
    return super.deploy(overrides || {}) as Promise<Verify>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Verify {
    return super.attach(address) as Verify;
  }
  override connect(signer: Signer): Verify__factory {
    return super.connect(signer) as Verify__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VerifyInterface {
    return new utils.Interface(_abi) as VerifyInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Verify {
    return new Contract(address, _abi, signerOrProvider) as Verify;
  }
}