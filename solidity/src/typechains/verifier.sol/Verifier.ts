/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface VerifierInterface extends utils.Interface {
  functions: {
    "Message(bytes32,uint8,bytes32,bytes32)": FunctionFragment;
    "Verify(bytes32,uint8[],bytes32[],bytes32[])": FunctionFragment;
    "executeTransactions(address[],bytes[])": FunctionFragment;
    "hello(bytes)": FunctionFragment;
    "reVerify(bytes32,uint8[],bytes32[],bytes32[])": FunctionFragment;
    "signedComputers(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "Message"
      | "Message(bytes32,uint8,bytes32,bytes32)"
      | "Verify"
      | "Verify(bytes32,uint8[],bytes32[],bytes32[])"
      | "executeTransactions"
      | "executeTransactions(address[],bytes[])"
      | "hello"
      | "hello(bytes)"
      | "reVerify"
      | "reVerify(bytes32,uint8[],bytes32[],bytes32[])"
      | "signedComputers"
      | "signedComputers(uint256)"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "Message",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "Message(bytes32,uint8,bytes32,bytes32)",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "Verify",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BytesLike>[],
      PromiseOrValue<BytesLike>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "Verify(bytes32,uint8[],bytes32[],bytes32[])",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BytesLike>[],
      PromiseOrValue<BytesLike>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "executeTransactions",
    values: [PromiseOrValue<string>[], PromiseOrValue<BytesLike>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "executeTransactions(address[],bytes[])",
    values: [PromiseOrValue<string>[], PromiseOrValue<BytesLike>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "hello",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "hello(bytes)",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "reVerify",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BytesLike>[],
      PromiseOrValue<BytesLike>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "reVerify(bytes32,uint8[],bytes32[],bytes32[])",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BytesLike>[],
      PromiseOrValue<BytesLike>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "signedComputers",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "signedComputers(uint256)",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "Message", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "Message(bytes32,uint8,bytes32,bytes32)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "Verify", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "Verify(bytes32,uint8[],bytes32[],bytes32[])",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeTransactions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeTransactions(address[],bytes[])",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "hello", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "hello(bytes)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "reVerify", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "reVerify(bytes32,uint8[],bytes32[],bytes32[])",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "signedComputers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "signedComputers(uint256)",
    data: BytesLike
  ): Result;

  events: {
    "errorNoSigner(bytes32,uint8,bytes32,bytes32)": EventFragment;
    "errorWrongAddress(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "errorNoSigner"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "errorNoSigner(bytes32,uint8,bytes32,bytes32)"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "errorWrongAddress"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "errorWrongAddress(address)"): EventFragment;
}

export interface errorNoSignerEventObject {
  arg0: string;
  arg1: number;
  arg2: string;
  arg3: string;
}
export type errorNoSignerEvent = TypedEvent<
  [string, number, string, string],
  errorNoSignerEventObject
>;

export type errorNoSignerEventFilter = TypedEventFilter<errorNoSignerEvent>;

export interface errorWrongAddressEventObject {
  arg0: string;
}
export type errorWrongAddressEvent = TypedEvent<
  [string],
  errorWrongAddressEventObject
>;

export type errorWrongAddressEventFilter =
  TypedEventFilter<errorWrongAddressEvent>;

export interface Verifier extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VerifierInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    Message(
      _hashedMessage: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>,
      _r: PromiseOrValue<BytesLike>,
      _s: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "Message(bytes32,uint8,bytes32,bytes32)"(
      _hashedMessage: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>,
      _r: PromiseOrValue<BytesLike>,
      _s: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    Verify(
      txBatchData: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>[],
      _r: PromiseOrValue<BytesLike>[],
      _s: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "Verify(bytes32,uint8[],bytes32[],bytes32[])"(
      txBatchData: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>[],
      _r: PromiseOrValue<BytesLike>[],
      _s: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    executeTransactions(
      contractAddrArray: PromiseOrValue<string>[],
      txArray: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "executeTransactions(address[],bytes[])"(
      contractAddrArray: PromiseOrValue<string>[],
      txArray: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    hello(
      txBatchData: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "hello(bytes)"(
      txBatchData: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    reVerify(
      txBatchData: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>[],
      _r: PromiseOrValue<BytesLike>[],
      _s: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "reVerify(bytes32,uint8[],bytes32[],bytes32[])"(
      txBatchData: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>[],
      _r: PromiseOrValue<BytesLike>[],
      _s: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    signedComputers(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    "signedComputers(uint256)"(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  Message(
    _hashedMessage: PromiseOrValue<BytesLike>,
    _v: PromiseOrValue<BigNumberish>,
    _r: PromiseOrValue<BytesLike>,
    _s: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "Message(bytes32,uint8,bytes32,bytes32)"(
    _hashedMessage: PromiseOrValue<BytesLike>,
    _v: PromiseOrValue<BigNumberish>,
    _r: PromiseOrValue<BytesLike>,
    _s: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  Verify(
    txBatchData: PromiseOrValue<BytesLike>,
    _v: PromiseOrValue<BigNumberish>[],
    _r: PromiseOrValue<BytesLike>[],
    _s: PromiseOrValue<BytesLike>[],
    overrides?: CallOverrides
  ): Promise<boolean>;

  "Verify(bytes32,uint8[],bytes32[],bytes32[])"(
    txBatchData: PromiseOrValue<BytesLike>,
    _v: PromiseOrValue<BigNumberish>[],
    _r: PromiseOrValue<BytesLike>[],
    _s: PromiseOrValue<BytesLike>[],
    overrides?: CallOverrides
  ): Promise<boolean>;

  executeTransactions(
    contractAddrArray: PromiseOrValue<string>[],
    txArray: PromiseOrValue<BytesLike>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "executeTransactions(address[],bytes[])"(
    contractAddrArray: PromiseOrValue<string>[],
    txArray: PromiseOrValue<BytesLike>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  hello(
    txBatchData: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  "hello(bytes)"(
    txBatchData: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  reVerify(
    txBatchData: PromiseOrValue<BytesLike>,
    _v: PromiseOrValue<BigNumberish>[],
    _r: PromiseOrValue<BytesLike>[],
    _s: PromiseOrValue<BytesLike>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "reVerify(bytes32,uint8[],bytes32[],bytes32[])"(
    txBatchData: PromiseOrValue<BytesLike>,
    _v: PromiseOrValue<BigNumberish>[],
    _r: PromiseOrValue<BytesLike>[],
    _s: PromiseOrValue<BytesLike>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  signedComputers(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  "signedComputers(uint256)"(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    Message(
      _hashedMessage: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>,
      _r: PromiseOrValue<BytesLike>,
      _s: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    "Message(bytes32,uint8,bytes32,bytes32)"(
      _hashedMessage: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>,
      _r: PromiseOrValue<BytesLike>,
      _s: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    Verify(
      txBatchData: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>[],
      _r: PromiseOrValue<BytesLike>[],
      _s: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<boolean>;

    "Verify(bytes32,uint8[],bytes32[],bytes32[])"(
      txBatchData: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>[],
      _r: PromiseOrValue<BytesLike>[],
      _s: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<boolean>;

    executeTransactions(
      contractAddrArray: PromiseOrValue<string>[],
      txArray: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<void>;

    "executeTransactions(address[],bytes[])"(
      contractAddrArray: PromiseOrValue<string>[],
      txArray: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<void>;

    hello(
      txBatchData: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    "hello(bytes)"(
      txBatchData: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    reVerify(
      txBatchData: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>[],
      _r: PromiseOrValue<BytesLike>[],
      _s: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<void>;

    "reVerify(bytes32,uint8[],bytes32[],bytes32[])"(
      txBatchData: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>[],
      _r: PromiseOrValue<BytesLike>[],
      _s: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<void>;

    signedComputers(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    "signedComputers(uint256)"(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "errorNoSigner(bytes32,uint8,bytes32,bytes32)"(
      arg0?: null,
      arg1?: null,
      arg2?: null,
      arg3?: null
    ): errorNoSignerEventFilter;
    errorNoSigner(
      arg0?: null,
      arg1?: null,
      arg2?: null,
      arg3?: null
    ): errorNoSignerEventFilter;

    "errorWrongAddress(address)"(arg0?: null): errorWrongAddressEventFilter;
    errorWrongAddress(arg0?: null): errorWrongAddressEventFilter;
  };

  estimateGas: {
    Message(
      _hashedMessage: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>,
      _r: PromiseOrValue<BytesLike>,
      _s: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "Message(bytes32,uint8,bytes32,bytes32)"(
      _hashedMessage: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>,
      _r: PromiseOrValue<BytesLike>,
      _s: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    Verify(
      txBatchData: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>[],
      _r: PromiseOrValue<BytesLike>[],
      _s: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "Verify(bytes32,uint8[],bytes32[],bytes32[])"(
      txBatchData: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>[],
      _r: PromiseOrValue<BytesLike>[],
      _s: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    executeTransactions(
      contractAddrArray: PromiseOrValue<string>[],
      txArray: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "executeTransactions(address[],bytes[])"(
      contractAddrArray: PromiseOrValue<string>[],
      txArray: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    hello(
      txBatchData: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "hello(bytes)"(
      txBatchData: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    reVerify(
      txBatchData: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>[],
      _r: PromiseOrValue<BytesLike>[],
      _s: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "reVerify(bytes32,uint8[],bytes32[],bytes32[])"(
      txBatchData: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>[],
      _r: PromiseOrValue<BytesLike>[],
      _s: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    signedComputers(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "signedComputers(uint256)"(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    Message(
      _hashedMessage: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>,
      _r: PromiseOrValue<BytesLike>,
      _s: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "Message(bytes32,uint8,bytes32,bytes32)"(
      _hashedMessage: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>,
      _r: PromiseOrValue<BytesLike>,
      _s: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    Verify(
      txBatchData: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>[],
      _r: PromiseOrValue<BytesLike>[],
      _s: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "Verify(bytes32,uint8[],bytes32[],bytes32[])"(
      txBatchData: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>[],
      _r: PromiseOrValue<BytesLike>[],
      _s: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    executeTransactions(
      contractAddrArray: PromiseOrValue<string>[],
      txArray: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "executeTransactions(address[],bytes[])"(
      contractAddrArray: PromiseOrValue<string>[],
      txArray: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    hello(
      txBatchData: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "hello(bytes)"(
      txBatchData: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    reVerify(
      txBatchData: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>[],
      _r: PromiseOrValue<BytesLike>[],
      _s: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "reVerify(bytes32,uint8[],bytes32[],bytes32[])"(
      txBatchData: PromiseOrValue<BytesLike>,
      _v: PromiseOrValue<BigNumberish>[],
      _r: PromiseOrValue<BytesLike>[],
      _s: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    signedComputers(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "signedComputers(uint256)"(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
