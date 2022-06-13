import { Interface, FunctionFragment, Result } from '@ethersproject/abi';
import * as vue from 'vue';
import { Ref, Plugin } from 'vue';
import { providers, Signer, EventFilter, BigNumberish, BigNumber, PopulatedTransaction, ethers } from 'ethers';
export { Signer } from 'ethers';
import { Web3Provider, ExternalProvider, Provider, Listener, JsonRpcProvider } from '@ethersproject/providers';
export { Network, Web3Provider } from '@ethersproject/providers';
import { Contract, Overrides, ContractTransaction, CallOverrides, ContractInterface } from '@ethersproject/contracts';
import { BytesLike } from '@ethersproject/bytes';
import { Signer as Signer$1 } from '@ethersproject/abstract-signer';
import { Network } from '@ethersproject/networks';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { CoinbaseWalletProvider } from '@coinbase/wallet-sdk';
import { CoinbaseWalletSDKOptions } from '@coinbase/wallet-sdk/dist/CoinbaseWalletSDK';

declare enum ChainId {
    Hardhat = 31337,
    Mainnet = 1,
    Ropsten = 3,
    Rinkeby = 4,
    Goerli = 5,
    Kovan = 42,
    xDai = 100,
    Rinkarby = 421611,
    Arbitrum = 42161,
    Polygon = 137
}
declare const CHAIN_NAMES: {
    31337: string;
    1: string;
    3: string;
    42: string;
    4: string;
    5: string;
    100: string;
    421611: string;
    42161: string;
    137: string;
};
declare const NETWORK_DETAILS: {
    42161: {
        chainId: string;
        chainName: string;
        nativeCurrency: {
            symbol: string;
            decimals: number;
        };
        rpcUrls: string[];
        blockExplorerUrls: string[];
    };
    421611: {
        chainId: string;
        chainName: string;
        nativeCurrency: {
            symbol: string;
            decimals: number;
        };
        rpcUrls: string[];
        blockExplorerUrls: string[];
    };
    100: {
        chainId: string;
        chainName: string;
        nativeCurrency: {
            symbol: string;
            decimals: number;
        };
        rpcUrls: string[];
        blockExplorerUrls: string[];
    };
    137: {
        chainId: string;
        chainName: string;
        nativeCurrency: {
            symbol: string;
            decimals: number;
        };
        rpcUrls: string[];
        blockExplorerUrls: string[];
    };
};

declare const MULTICALL2_ADDRESS = "0x5ba1e12693dc8f9c48aad8770482f4739beed696";

var Multicall2$1 = [
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "target",
						type: "address"
					},
					{
						internalType: "bytes",
						name: "callData",
						type: "bytes"
					}
				],
				internalType: "struct Multicall2.Call[]",
				name: "calls",
				type: "tuple[]"
			}
		],
		name: "aggregate",
		outputs: [
			{
				internalType: "uint256",
				name: "blockNumber",
				type: "uint256"
			},
			{
				internalType: "bytes[]",
				name: "returnData",
				type: "bytes[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "target",
						type: "address"
					},
					{
						internalType: "bytes",
						name: "callData",
						type: "bytes"
					}
				],
				internalType: "struct Multicall2.Call[]",
				name: "calls",
				type: "tuple[]"
			}
		],
		name: "blockAndAggregate",
		outputs: [
			{
				internalType: "uint256",
				name: "blockNumber",
				type: "uint256"
			},
			{
				internalType: "bytes32",
				name: "blockHash",
				type: "bytes32"
			},
			{
				components: [
					{
						internalType: "bool",
						name: "success",
						type: "bool"
					},
					{
						internalType: "bytes",
						name: "returnData",
						type: "bytes"
					}
				],
				internalType: "struct Multicall2.Result[]",
				name: "returnData",
				type: "tuple[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "blockNumber",
				type: "uint256"
			}
		],
		name: "getBlockHash",
		outputs: [
			{
				internalType: "bytes32",
				name: "blockHash",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getBlockNumber",
		outputs: [
			{
				internalType: "uint256",
				name: "blockNumber",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getCurrentBlockCoinbase",
		outputs: [
			{
				internalType: "address",
				name: "coinbase",
				type: "address"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getCurrentBlockDifficulty",
		outputs: [
			{
				internalType: "uint256",
				name: "difficulty",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getCurrentBlockGasLimit",
		outputs: [
			{
				internalType: "uint256",
				name: "gaslimit",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getCurrentBlockTimestamp",
		outputs: [
			{
				internalType: "uint256",
				name: "timestamp",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "addr",
				type: "address"
			}
		],
		name: "getEthBalance",
		outputs: [
			{
				internalType: "uint256",
				name: "balance",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
		],
		name: "getLastBlockHash",
		outputs: [
			{
				internalType: "bytes32",
				name: "blockHash",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bool",
				name: "requireSuccess",
				type: "bool"
			},
			{
				components: [
					{
						internalType: "address",
						name: "target",
						type: "address"
					},
					{
						internalType: "bytes",
						name: "callData",
						type: "bytes"
					}
				],
				internalType: "struct Multicall2.Call[]",
				name: "calls",
				type: "tuple[]"
			}
		],
		name: "tryAggregate",
		outputs: [
			{
				components: [
					{
						internalType: "bool",
						name: "success",
						type: "bool"
					},
					{
						internalType: "bytes",
						name: "returnData",
						type: "bytes"
					}
				],
				internalType: "struct Multicall2.Result[]",
				name: "returnData",
				type: "tuple[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "bool",
				name: "requireSuccess",
				type: "bool"
			},
			{
				components: [
					{
						internalType: "address",
						name: "target",
						type: "address"
					},
					{
						internalType: "bytes",
						name: "callData",
						type: "bytes"
					}
				],
				internalType: "struct Multicall2.Call[]",
				name: "calls",
				type: "tuple[]"
			}
		],
		name: "tryBlockAndAggregate",
		outputs: [
			{
				internalType: "uint256",
				name: "blockNumber",
				type: "uint256"
			},
			{
				internalType: "bytes32",
				name: "blockHash",
				type: "bytes32"
			},
			{
				components: [
					{
						internalType: "bool",
						name: "success",
						type: "bool"
					},
					{
						internalType: "bytes",
						name: "returnData",
						type: "bytes"
					}
				],
				internalType: "struct Multicall2.Result[]",
				name: "returnData",
				type: "tuple[]"
			}
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];

var contractName = "ERC20";
var abi = [
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "_spender",
				type: "address"
			},
			{
				name: "_value",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "_from",
				type: "address"
			},
			{
				name: "_to",
				type: "address"
			},
			{
				name: "_value",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "_owner",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				name: "balance",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				name: "_to",
				type: "address"
			},
			{
				name: "_value",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "_owner",
				type: "address"
			},
			{
				name: "_spender",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		payable: true,
		stateMutability: "payable",
		type: "fallback"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	}
];
var bytecode = "0x608060405234801561001057600080fd5b506105dd806100206000396000f3fe608060405234801561001057600080fd5b50600436106100a5576000357c01000000000000000000000000000000000000000000000000000000009004806370a082311161007857806370a0823114610166578063a457c2d71461018c578063a9059cbb146101b8578063dd62ed3e146101e4576100a5565b8063095ea7b3146100aa57806318160ddd146100ea57806323b872dd14610104578063395093511461013a575b600080fd5b6100d6600480360360408110156100c057600080fd5b50600160a060020a038135169060200135610212565b604080519115158252519081900360200190f35b6100f2610290565b60408051918252519081900360200190f35b6100d66004803603606081101561011a57600080fd5b50600160a060020a03813581169160208101359091169060400135610296565b6100d66004803603604081101561015057600080fd5b50600160a060020a03813516906020013561035f565b6100f26004803603602081101561017c57600080fd5b5035600160a060020a031661040f565b6100d6600480360360408110156101a257600080fd5b50600160a060020a03813516906020013561042a565b6100d6600480360360408110156101ce57600080fd5b50600160a060020a038135169060200135610475565b6100f2600480360360408110156101fa57600080fd5b50600160a060020a038135811691602001351661048b565b6000600160a060020a038316151561022957600080fd5b336000818152600160209081526040808320600160a060020a03881680855290835292819020869055805186815290519293927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a350600192915050565b60025490565b600160a060020a03831660009081526001602090815260408083203384529091528120546102ca908363ffffffff6104b616565b600160a060020a03851660009081526001602090815260408083203384529091529020556102f98484846104cb565b600160a060020a0384166000818152600160209081526040808320338085529083529281902054815190815290519293927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a35060019392505050565b6000600160a060020a038316151561037657600080fd5b336000908152600160209081526040808320600160a060020a03871684529091529020546103aa908363ffffffff61059816565b336000818152600160209081526040808320600160a060020a0389168085529083529281902085905580519485525191937f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929081900390910190a350600192915050565b600160a060020a031660009081526020819052604090205490565b6000600160a060020a038316151561044157600080fd5b336000908152600160209081526040808320600160a060020a03871684529091529020546103aa908363ffffffff6104b616565b60006104823384846104cb565b50600192915050565b600160a060020a03918216600090815260016020908152604080832093909416825291909152205490565b6000828211156104c557600080fd5b50900390565b600160a060020a03821615156104e057600080fd5b600160a060020a038316600090815260208190526040902054610509908263ffffffff6104b616565b600160a060020a03808516600090815260208190526040808220939093559084168152205461053e908263ffffffff61059816565b600160a060020a038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b6000828201838110156105aa57600080fd5b939250505056fea165627a7a72305820722c0187518ce2856a424bdba350d5a263c8f98fcb19cb4cc161372bc3b794c90029";
var deployedBytecode = "0x608060405234801561001057600080fd5b50600436106100a5576000357c01000000000000000000000000000000000000000000000000000000009004806370a082311161007857806370a0823114610166578063a457c2d71461018c578063a9059cbb146101b8578063dd62ed3e146101e4576100a5565b8063095ea7b3146100aa57806318160ddd146100ea57806323b872dd14610104578063395093511461013a575b600080fd5b6100d6600480360360408110156100c057600080fd5b50600160a060020a038135169060200135610212565b604080519115158252519081900360200190f35b6100f2610290565b60408051918252519081900360200190f35b6100d66004803603606081101561011a57600080fd5b50600160a060020a03813581169160208101359091169060400135610296565b6100d66004803603604081101561015057600080fd5b50600160a060020a03813516906020013561035f565b6100f26004803603602081101561017c57600080fd5b5035600160a060020a031661040f565b6100d6600480360360408110156101a257600080fd5b50600160a060020a03813516906020013561042a565b6100d6600480360360408110156101ce57600080fd5b50600160a060020a038135169060200135610475565b6100f2600480360360408110156101fa57600080fd5b50600160a060020a038135811691602001351661048b565b6000600160a060020a038316151561022957600080fd5b336000818152600160209081526040808320600160a060020a03881680855290835292819020869055805186815290519293927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a350600192915050565b60025490565b600160a060020a03831660009081526001602090815260408083203384529091528120546102ca908363ffffffff6104b616565b600160a060020a03851660009081526001602090815260408083203384529091529020556102f98484846104cb565b600160a060020a0384166000818152600160209081526040808320338085529083529281902054815190815290519293927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a35060019392505050565b6000600160a060020a038316151561037657600080fd5b336000908152600160209081526040808320600160a060020a03871684529091529020546103aa908363ffffffff61059816565b336000818152600160209081526040808320600160a060020a0389168085529083529281902085905580519485525191937f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929081900390910190a350600192915050565b600160a060020a031660009081526020819052604090205490565b6000600160a060020a038316151561044157600080fd5b336000908152600160209081526040808320600160a060020a03871684529091529020546103aa908363ffffffff6104b616565b60006104823384846104cb565b50600192915050565b600160a060020a03918216600090815260016020908152604080832093909416825291909152205490565b6000828211156104c557600080fd5b50900390565b600160a060020a03821615156104e057600080fd5b600160a060020a038316600090815260208190526040902054610509908263ffffffff6104b616565b600160a060020a03808516600090815260208190526040808220939093559084168152205461053e908263ffffffff61059816565b600160a060020a038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b6000828201838110156105aa57600080fd5b939250505056fea165627a7a72305820722c0187518ce2856a424bdba350d5a263c8f98fcb19cb4cc161372bc3b794c90029";
var compiler = {
	name: "solc",
	version: "0.5.4+commit.9549d8ff.Emscripten.clang"
};
var ERC20 = {
	contractName: contractName,
	abi: abi,
	bytecode: bytecode,
	deployedBytecode: deployedBytecode,
	compiler: compiler
};

declare const ERC20Interface: Interface;

declare function useBoard(): {
    boardOpen: vue.Ref<boolean>;
    open: () => void;
    close: () => void;
};

/**
 * Error subclass implementing JSON RPC 2.0 errors and Ethereum RPC errors per EIP-1474.
 * @see https://eips.ethereum.org/EIPS/eip-1474
 */
declare class RpcError<T = undefined> extends Error {
    readonly code: number;
    readonly data?: T;
    readonly internal?: unknown;
    constructor(
    /** Number error code */
    code: number, 
    /** Human-readable string */
    message: string, 
    /** Low-level error */
    internal?: unknown, 
    /** Other useful information about error */
    data?: T);
}
/**
 * Error subclass implementing Ethereum Provider errors per EIP-1193.
 * @see https://eips.ethereum.org/EIPS/eip-1193
 */
declare class ProviderRpcError<T = undefined> extends RpcError<T> {
    /**
     * Create an Ethereum Provider JSON-RPC error.
     * `code` must be an integer in the 1000 <= 4999 range.
     */
    constructor(
    /**
     * Number error code
     * @see https://eips.ethereum.org/EIPS/eip-1193#error-standards
     */
    code: 4001 | 4100 | 4200 | 4900 | 4901 | 4902, 
    /** Human-readable string */
    message: string, 
    /** Low-level error */
    internal?: unknown, 
    /** Other useful information about error */
    data?: T);
}
declare class ConnectorNotFoundError extends Error {
    name: string;
    message: string;
}
declare class ProviderNotFoundError extends Error {
    name: string;
    message: string;
}
declare class AddChainError extends Error {
    name: string;
    message: string;
}
declare class SwitchChainError extends ProviderRpcError {
    name: string;
    constructor(error: any);
}
declare class SwitchChainNotSupportedError extends Error {
    name: string;
    message: string;
}
declare class UserRejectedRequestError extends ProviderRpcError {
    name: string;
    constructor(error: any);
}

declare type ConnectorData<Provider = any> = {
    account: string;
    provider: Provider;
};
declare abstract class Connector<Provider = providers.ExternalProvider, Options = any> {
    abstract readonly name: string;
    readonly options: Options;
    constructor(options: Options);
    abstract connect(): Promise<Required<ConnectorData>>;
    abstract getProvider(): Promise<Provider>;
    abstract disconnect(): Promise<void>;
    abstract onDisconnect(handler: (...args: any[]) => any): void;
    abstract onAccountsChanged(handler: (accounts: string[]) => any): void;
    abstract onChainChanged(handler: (chainId: number) => any): void;
    abstract switchChain(chainId: number): Promise<void>;
}

/**
 * MetaMask
 * Docs: https://docs.metamask.io/guide/ethereum-provider.html
 * JSON RPC API: https://metamask.github.io/api-playground/api-documentation
 */
interface MetaMaskProvider extends MetaMaskEthereumProvider {
    isMetaMask: boolean;
    providers?: MetaMaskProvider[];
    isConnected: () => boolean;
    request: (request: {
        method: string;
        params?: any[] | undefined;
    }) => Promise<any>;
}
/**
 * source: @metamask/detect-provider
 * https://github.com/MetaMask/detect-provider/blob/main/src/index.ts
 */
interface MetaMaskEthereumProvider {
    isMetaMask?: boolean;
    once(eventName: string | symbol, listener: (...args: any[]) => void): this;
    on(eventName: string | symbol, listener: (...args: any[]) => void): this;
    off(eventName: string | symbol, listener: (...args: any[]) => void): this;
    addListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
    removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
    removeAllListeners(event?: string | symbol): this;
}
interface Window {
    ethereum?: MetaMaskProvider;
}
declare type MetaMaskConnectorOptions = {
    appUrl?: string;
};
declare class MetaMaskConnector extends Connector<MetaMaskProvider, MetaMaskConnectorOptions> {
    #private;
    readonly name = "metaMask";
    constructor(options?: MetaMaskConnectorOptions);
    connect(): Promise<{
        account: any;
        provider: MetaMaskProvider;
    }>;
    getProvider(): Promise<MetaMaskProvider>;
    /**
     * MetaMask do not support programmatic disconnect.
     * @see https://github.com/MetaMask/metamask-extension/issues/10353
     */
    disconnect(): Promise<void>;
    /**
     * @note MetaMask disconnect event would be triggered when the specific chain changed (like L2 network),
     * and will not be triggered when a user clicked disconnect in wallet...
     */
    onDisconnect(handler: (error: ProviderRpcError) => void): void;
    onAccountsChanged(handler: (accounts: string[]) => void): void;
    onChainChanged(handler: (chainId: number) => void): void;
    switchChain(chainId: number): Promise<void>;
    addChain(networkDetails: AddEthereumChainParameter): Promise<void>;
}
interface AddEthereumChainParameter {
    chainId: string;
    chainName: string;
    nativeCurrency: {
        name?: string;
        symbol: string;
        decimals: number;
    };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
    iconUrls?: string[];
}

/**
 * WalletConnect v1.0 \
 * Docs: https://docs.walletconnect.com/quick-start/dapps/web3-provider \
 * Test Wallet: https://test.walletconnect.org/ \
 * Source: https://github.com/WalletConnect/walletconnect-monorepo/blob/v1.0/packages/providers/web3-provider/src/index.ts
 */
interface IWalletConnectProvider extends WalletConnectProvider {
}
declare type WalletConnectOptions = ConstructorParameters<typeof WalletConnectProvider>[0];
declare class WalletConnectConnector extends Connector<WalletConnectProvider, WalletConnectOptions> {
    #private;
    readonly name = "walletConnect";
    constructor(options: WalletConnectOptions);
    connect(): Promise<{
        account: string;
        provider: WalletConnectProvider;
    }>;
    getProvider(): Promise<WalletConnectProvider>;
    disconnect(): Promise<void>;
    onDisconnect(handler: (code: number, reason: string) => void): void;
    onAccountsChanged(handler: (accounts: string[]) => void): void;
    onChainChanged(handler: (chainId: number) => void): void;
    /**
     * @error Not support for WalletConnect v1.0
     */
    switchChain(chainId: number): Promise<void>;
}

/**
 * Coinbase Wallet SDK
 * Docs: https://docs.cloud.coinbase.com/wallet-sdk/docs/
 */
interface ICoinbaseWalletProvider extends CoinbaseWalletProvider {
}
declare type CoinbaseWalletConnectorOptions = CoinbaseWalletSDKOptions & {
    jsonRpcUrl: string;
    chainId?: number;
};
declare class CoinbaseWalletConnector extends Connector<CoinbaseWalletProvider, CoinbaseWalletConnectorOptions> {
    #private;
    readonly name = "coinbaseWallet";
    constructor(options: CoinbaseWalletConnectorOptions);
    connect(): Promise<{
        account: string;
        provider: CoinbaseWalletProvider;
    }>;
    getProvider(): Promise<CoinbaseWalletProvider>;
    disconnect(): Promise<void>;
    /**
     * @note CoinbaseWallet will reload page if it disconnected by wallet app.
     * @todo experiment with the browser extension
     */
    onDisconnect(handler: () => void): void;
    onAccountsChanged(handler: (accounts: string[]) => void): void;
    onChainChanged(handler: (chainId: number) => void): void;
    /**
     * @todo: add addChain()
     */
    switchChain(chainId: number): Promise<void>;
}

declare type ConnectionStatus = 'none' | 'connecting' | 'loading' | 'connected';
declare type OnDisconnectCallback = (...args: any[]) => void;
declare type OnAccountsChangedCallback = (accounts: string[]) => void;
declare type OnChainChangedCallback = (chainId: number) => void;
declare type useWalletOptions = {
    useEthers: boolean;
};
declare function useWallet(options?: useWalletOptions): {
    wallet: {
        connector: {
            readonly name: string;
            readonly options: any;
            connect: () => Promise<Required<ConnectorData<any>>>;
            getProvider: () => Promise<providers.ExternalProvider>;
            disconnect: () => Promise<void>;
            onDisconnect: (handler: (...args: any[]) => any) => void;
            onAccountsChanged: (handler: (accounts: string[]) => any) => void;
            onChainChanged: (handler: (chainId: number) => any) => void;
            switchChain: (chainId: number) => Promise<void>;
        } | null;
        provider: {
            isMetaMask?: boolean | undefined;
            isStatus?: boolean | undefined;
            host?: string | undefined;
            path?: string | undefined;
            sendAsync?: ((request: {
                method: string;
                params?: any[] | undefined;
            }, callback: (error: any, response: any) => void) => void) | undefined;
            send?: ((request: {
                method: string;
                params?: any[] | undefined;
            }, callback: (error: any, response: any) => void) => void) | undefined;
            request?: ((request: {
                method: string;
                params?: any[] | undefined;
            }) => Promise<any>) | undefined;
        } | null;
        error: string;
        status: ConnectionStatus;
    };
    connectWith: (connector: Connector) => Promise<void>;
    disconnect: () => Promise<void>;
    onDisconnect: (callback: OnDisconnectCallback) => void;
    onAccountsChanged: (callback: OnAccountsChangedCallback) => void;
    onChainChanged: (callback: OnChainChangedCallback) => void;
};

declare function activate(externalProvider: ExternalProvider): Promise<void>;
declare function useEthers(): {
    isActivated: Ref<boolean>;
    provider: Ref<Web3Provider | null>;
    signer: Ref<Signer | null>;
    network: Ref<{
        name: string;
        chainId: number;
        ensAddress?: string | undefined;
        _defaultProvider?: ((providers: any, options?: any) => any) | undefined;
    } | null>;
    address: Ref<string>;
    balance: Ref<bigint>;
    chainId: vue.ComputedRef<number | undefined>;
    activate: typeof activate;
    deactivate: () => void;
};

/* Autogenerated file. Do not edit manually. */


interface Multicall2Interface extends ethers.utils.Interface {
  functions: {
    'aggregate(tuple[])': FunctionFragment
    'blockAndAggregate(tuple[])': FunctionFragment
    'getBlockHash(uint256)': FunctionFragment
    'getBlockNumber()': FunctionFragment
    'getCurrentBlockCoinbase()': FunctionFragment
    'getCurrentBlockDifficulty()': FunctionFragment
    'getCurrentBlockGasLimit()': FunctionFragment
    'getCurrentBlockTimestamp()': FunctionFragment
    'getEthBalance(address)': FunctionFragment
    'getLastBlockHash()': FunctionFragment
    'tryAggregate(bool,tuple[])': FunctionFragment
    'tryBlockAndAggregate(bool,tuple[])': FunctionFragment
  }

  encodeFunctionData(
    functionFragment: 'aggregate',
    values: [{ target: string; callData: BytesLike }[]],
  ): string
  encodeFunctionData(
    functionFragment: 'blockAndAggregate',
    values: [{ target: string; callData: BytesLike }[]],
  ): string
  encodeFunctionData(
    functionFragment: 'getBlockHash',
    values: [BigNumberish],
  ): string
  encodeFunctionData(
    functionFragment: 'getBlockNumber',
    values?: undefined,
  ): string
  encodeFunctionData(
    functionFragment: 'getCurrentBlockCoinbase',
    values?: undefined,
  ): string
  encodeFunctionData(
    functionFragment: 'getCurrentBlockDifficulty',
    values?: undefined,
  ): string
  encodeFunctionData(
    functionFragment: 'getCurrentBlockGasLimit',
    values?: undefined,
  ): string
  encodeFunctionData(
    functionFragment: 'getCurrentBlockTimestamp',
    values?: undefined,
  ): string
  encodeFunctionData(
    functionFragment: 'getEthBalance',
    values: [string],
  ): string
  encodeFunctionData(
    functionFragment: 'getLastBlockHash',
    values?: undefined,
  ): string
  encodeFunctionData(
    functionFragment: 'tryAggregate',
    values: [boolean, { target: string; callData: BytesLike }[]],
  ): string
  encodeFunctionData(
    functionFragment: 'tryBlockAndAggregate',
    values: [boolean, { target: string; callData: BytesLike }[]],
  ): string

  decodeFunctionResult(functionFragment: 'aggregate', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'blockAndAggregate',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'getBlockHash',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'getBlockNumber',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'getCurrentBlockCoinbase',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'getCurrentBlockDifficulty',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'getCurrentBlockGasLimit',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'getCurrentBlockTimestamp',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'getEthBalance',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'getLastBlockHash',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'tryAggregate',
    data: BytesLike,
  ): Result
  decodeFunctionResult(
    functionFragment: 'tryBlockAndAggregate',
    data: BytesLike,
  ): Result

  events: {}
}

declare class Multicall2 extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  on(event: EventFilter | string, listener: Listener): this
  once(event: EventFilter | string, listener: Listener): this
  addListener(eventName: EventFilter | string, listener: Listener): this
  removeAllListeners(eventName: EventFilter | string): this
  removeListener(eventName: any, listener: Listener): this

  interface: Multicall2Interface

  functions: {
    aggregate(
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    'aggregate(tuple[])'(
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    blockAndAggregate(
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    'blockAndAggregate(tuple[])'(
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    getBlockHash(
      blockNumber: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      blockHash: string
      0: string
    }>

    'getBlockHash(uint256)'(
      blockNumber: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<{
      blockHash: string
      0: string
    }>

    getBlockNumber(overrides?: CallOverrides): Promise<{
      blockNumber: BigNumber
      0: BigNumber
    }>

    'getBlockNumber()'(overrides?: CallOverrides): Promise<{
      blockNumber: BigNumber
      0: BigNumber
    }>

    getCurrentBlockCoinbase(overrides?: CallOverrides): Promise<{
      coinbase: string
      0: string
    }>

    'getCurrentBlockCoinbase()'(overrides?: CallOverrides): Promise<{
      coinbase: string
      0: string
    }>

    getCurrentBlockDifficulty(overrides?: CallOverrides): Promise<{
      difficulty: BigNumber
      0: BigNumber
    }>

    'getCurrentBlockDifficulty()'(overrides?: CallOverrides): Promise<{
      difficulty: BigNumber
      0: BigNumber
    }>

    getCurrentBlockGasLimit(overrides?: CallOverrides): Promise<{
      gaslimit: BigNumber
      0: BigNumber
    }>

    'getCurrentBlockGasLimit()'(overrides?: CallOverrides): Promise<{
      gaslimit: BigNumber
      0: BigNumber
    }>

    getCurrentBlockTimestamp(overrides?: CallOverrides): Promise<{
      timestamp: BigNumber
      0: BigNumber
    }>

    'getCurrentBlockTimestamp()'(overrides?: CallOverrides): Promise<{
      timestamp: BigNumber
      0: BigNumber
    }>

    getEthBalance(
      addr: string,
      overrides?: CallOverrides,
    ): Promise<{
      balance: BigNumber
      0: BigNumber
    }>

    'getEthBalance(address)'(
      addr: string,
      overrides?: CallOverrides,
    ): Promise<{
      balance: BigNumber
      0: BigNumber
    }>

    getLastBlockHash(overrides?: CallOverrides): Promise<{
      blockHash: string
      0: string
    }>

    'getLastBlockHash()'(overrides?: CallOverrides): Promise<{
      blockHash: string
      0: string
    }>

    tryAggregate(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    'tryAggregate(bool,tuple[])'(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    tryBlockAndAggregate(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<ContractTransaction>

    'tryBlockAndAggregate(bool,tuple[])'(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<ContractTransaction>
  }

  aggregate(
    calls: { target: string; callData: BytesLike }[],
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  'aggregate(tuple[])'(
    calls: { target: string; callData: BytesLike }[],
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  blockAndAggregate(
    calls: { target: string; callData: BytesLike }[],
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  'blockAndAggregate(tuple[])'(
    calls: { target: string; callData: BytesLike }[],
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  getBlockHash(
    blockNumber: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>

  'getBlockHash(uint256)'(
    blockNumber: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>

  getBlockNumber(overrides?: CallOverrides): Promise<BigNumber>

  'getBlockNumber()'(overrides?: CallOverrides): Promise<BigNumber>

  getCurrentBlockCoinbase(overrides?: CallOverrides): Promise<string>

  'getCurrentBlockCoinbase()'(overrides?: CallOverrides): Promise<string>

  getCurrentBlockDifficulty(overrides?: CallOverrides): Promise<BigNumber>

  'getCurrentBlockDifficulty()'(overrides?: CallOverrides): Promise<BigNumber>

  getCurrentBlockGasLimit(overrides?: CallOverrides): Promise<BigNumber>

  'getCurrentBlockGasLimit()'(overrides?: CallOverrides): Promise<BigNumber>

  getCurrentBlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>

  'getCurrentBlockTimestamp()'(overrides?: CallOverrides): Promise<BigNumber>

  getEthBalance(addr: string, overrides?: CallOverrides): Promise<BigNumber>

  'getEthBalance(address)'(
    addr: string,
    overrides?: CallOverrides,
  ): Promise<BigNumber>

  getLastBlockHash(overrides?: CallOverrides): Promise<string>

  'getLastBlockHash()'(overrides?: CallOverrides): Promise<string>

  tryAggregate(
    requireSuccess: boolean,
    calls: { target: string; callData: BytesLike }[],
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  'tryAggregate(bool,tuple[])'(
    requireSuccess: boolean,
    calls: { target: string; callData: BytesLike }[],
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  tryBlockAndAggregate(
    requireSuccess: boolean,
    calls: { target: string; callData: BytesLike }[],
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  'tryBlockAndAggregate(bool,tuple[])'(
    requireSuccess: boolean,
    calls: { target: string; callData: BytesLike }[],
    overrides?: Overrides,
  ): Promise<ContractTransaction>

  callStatic: {
    aggregate(
      calls: { target: string; callData: BytesLike }[],
      overrides?: CallOverrides,
    ): Promise<{
      blockNumber: BigNumber
      returnData: string[]
      0: BigNumber
      1: string[]
    }>

    'aggregate(tuple[])'(
      calls: { target: string; callData: BytesLike }[],
      overrides?: CallOverrides,
    ): Promise<{
      blockNumber: BigNumber
      returnData: string[]
      0: BigNumber
      1: string[]
    }>

    blockAndAggregate(
      calls: { target: string; callData: BytesLike }[],
      overrides?: CallOverrides,
    ): Promise<{
      blockNumber: BigNumber
      blockHash: string
      returnData: {
        success: boolean
        returnData: string
        0: boolean
        1: string
      }[]
      0: BigNumber
      1: string
      2: { success: boolean; returnData: string; 0: boolean; 1: string }[]
    }>

    'blockAndAggregate(tuple[])'(
      calls: { target: string; callData: BytesLike }[],
      overrides?: CallOverrides,
    ): Promise<{
      blockNumber: BigNumber
      blockHash: string
      returnData: {
        success: boolean
        returnData: string
        0: boolean
        1: string
      }[]
      0: BigNumber
      1: string
      2: { success: boolean; returnData: string; 0: boolean; 1: string }[]
    }>

    getBlockHash(
      blockNumber: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>

    'getBlockHash(uint256)'(
      blockNumber: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>

    getBlockNumber(overrides?: CallOverrides): Promise<BigNumber>

    'getBlockNumber()'(overrides?: CallOverrides): Promise<BigNumber>

    getCurrentBlockCoinbase(overrides?: CallOverrides): Promise<string>

    'getCurrentBlockCoinbase()'(overrides?: CallOverrides): Promise<string>

    getCurrentBlockDifficulty(overrides?: CallOverrides): Promise<BigNumber>

    'getCurrentBlockDifficulty()'(overrides?: CallOverrides): Promise<BigNumber>

    getCurrentBlockGasLimit(overrides?: CallOverrides): Promise<BigNumber>

    'getCurrentBlockGasLimit()'(overrides?: CallOverrides): Promise<BigNumber>

    getCurrentBlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>

    'getCurrentBlockTimestamp()'(overrides?: CallOverrides): Promise<BigNumber>

    getEthBalance(addr: string, overrides?: CallOverrides): Promise<BigNumber>

    'getEthBalance(address)'(
      addr: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    getLastBlockHash(overrides?: CallOverrides): Promise<string>

    'getLastBlockHash()'(overrides?: CallOverrides): Promise<string>

    tryAggregate(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: CallOverrides,
    ): Promise<
      { success: boolean; returnData: string; 0: boolean; 1: string }[]
    >

    'tryAggregate(bool,tuple[])'(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: CallOverrides,
    ): Promise<
      { success: boolean; returnData: string; 0: boolean; 1: string }[]
    >

    tryBlockAndAggregate(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: CallOverrides,
    ): Promise<{
      blockNumber: BigNumber
      blockHash: string
      returnData: {
        success: boolean
        returnData: string
        0: boolean
        1: string
      }[]
      0: BigNumber
      1: string
      2: { success: boolean; returnData: string; 0: boolean; 1: string }[]
    }>

    'tryBlockAndAggregate(bool,tuple[])'(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: CallOverrides,
    ): Promise<{
      blockNumber: BigNumber
      blockHash: string
      returnData: {
        success: boolean
        returnData: string
        0: boolean
        1: string
      }[]
      0: BigNumber
      1: string
      2: { success: boolean; returnData: string; 0: boolean; 1: string }[]
    }>
  }

  filters: {}

  estimateGas: {
    aggregate(
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<BigNumber>

    'aggregate(tuple[])'(
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<BigNumber>

    blockAndAggregate(
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<BigNumber>

    'blockAndAggregate(tuple[])'(
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<BigNumber>

    getBlockHash(
      blockNumber: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    'getBlockHash(uint256)'(
      blockNumber: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    getBlockNumber(overrides?: CallOverrides): Promise<BigNumber>

    'getBlockNumber()'(overrides?: CallOverrides): Promise<BigNumber>

    getCurrentBlockCoinbase(overrides?: CallOverrides): Promise<BigNumber>

    'getCurrentBlockCoinbase()'(overrides?: CallOverrides): Promise<BigNumber>

    getCurrentBlockDifficulty(overrides?: CallOverrides): Promise<BigNumber>

    'getCurrentBlockDifficulty()'(overrides?: CallOverrides): Promise<BigNumber>

    getCurrentBlockGasLimit(overrides?: CallOverrides): Promise<BigNumber>

    'getCurrentBlockGasLimit()'(overrides?: CallOverrides): Promise<BigNumber>

    getCurrentBlockTimestamp(overrides?: CallOverrides): Promise<BigNumber>

    'getCurrentBlockTimestamp()'(overrides?: CallOverrides): Promise<BigNumber>

    getEthBalance(addr: string, overrides?: CallOverrides): Promise<BigNumber>

    'getEthBalance(address)'(
      addr: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>

    getLastBlockHash(overrides?: CallOverrides): Promise<BigNumber>

    'getLastBlockHash()'(overrides?: CallOverrides): Promise<BigNumber>

    tryAggregate(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<BigNumber>

    'tryAggregate(bool,tuple[])'(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<BigNumber>

    tryBlockAndAggregate(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<BigNumber>

    'tryBlockAndAggregate(bool,tuple[])'(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<BigNumber>
  }

  populateTransaction: {
    aggregate(
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    'aggregate(tuple[])'(
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    blockAndAggregate(
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    'blockAndAggregate(tuple[])'(
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    getBlockHash(
      blockNumber: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    'getBlockHash(uint256)'(
      blockNumber: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    getBlockNumber(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'getBlockNumber()'(overrides?: CallOverrides): Promise<PopulatedTransaction>

    getCurrentBlockCoinbase(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    'getCurrentBlockCoinbase()'(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    getCurrentBlockDifficulty(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    'getCurrentBlockDifficulty()'(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    getCurrentBlockGasLimit(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    'getCurrentBlockGasLimit()'(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    getCurrentBlockTimestamp(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    'getCurrentBlockTimestamp()'(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    getEthBalance(
      addr: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    'getEthBalance(address)'(
      addr: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    getLastBlockHash(overrides?: CallOverrides): Promise<PopulatedTransaction>

    'getLastBlockHash()'(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>

    tryAggregate(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    'tryAggregate(bool,tuple[])'(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    tryBlockAndAggregate(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>

    'tryBlockAndAggregate(bool,tuple[])'(
      requireSuccess: boolean,
      calls: { target: string; callData: BytesLike }[],
      overrides?: Overrides,
    ): Promise<PopulatedTransaction>
  }
}

declare type ContractCall = {
    interface: ContractInterface;
    address: string;
    method: string;
    args?: any[];
};
declare function useMulticall(provider: Web3Provider | JsonRpcProvider): {
    multicall: Multicall2;
    blockNumber: vue.Ref<number>;
    results: vue.Ref<{
        [x: string]: any;
        [x: number]: any;
        readonly length: number;
        toString: () => string;
        toLocaleString: () => string;
        concat: {
            (...items: ConcatArray<any>[]): any[];
            (...items: any[]): any[];
        };
        join: (separator?: string | undefined) => string;
        slice: (start?: number | undefined, end?: number | undefined) => any[];
        indexOf: (searchElement: any, fromIndex?: number | undefined) => number;
        lastIndexOf: (searchElement: any, fromIndex?: number | undefined) => number;
        every: {
            <S extends any>(predicate: (value: any, index: number, array: readonly any[]) => value is S, thisArg?: any): this is readonly S[];
            (predicate: (value: any, index: number, array: readonly any[]) => unknown, thisArg?: any): boolean;
        };
        some: (predicate: (value: any, index: number, array: readonly any[]) => unknown, thisArg?: any) => boolean;
        forEach: (callbackfn: (value: any, index: number, array: readonly any[]) => void, thisArg?: any) => void;
        map: <U>(callbackfn: (value: any, index: number, array: readonly any[]) => U, thisArg?: any) => U[];
        filter: {
            <S_1 extends any>(predicate: (value: any, index: number, array: readonly any[]) => value is S_1, thisArg?: any): S_1[];
            (predicate: (value: any, index: number, array: readonly any[]) => unknown, thisArg?: any): any[];
        };
        reduce: {
            (callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: readonly any[]) => any): any;
            (callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: readonly any[]) => any, initialValue: any): any;
            <U_1>(callbackfn: (previousValue: U_1, currentValue: any, currentIndex: number, array: readonly any[]) => U_1, initialValue: U_1): U_1;
        };
        reduceRight: {
            (callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: readonly any[]) => any): any;
            (callbackfn: (previousValue: any, currentValue: any, currentIndex: number, array: readonly any[]) => any, initialValue: any): any;
            <U_2>(callbackfn: (previousValue: U_2, currentValue: any, currentIndex: number, array: readonly any[]) => U_2, initialValue: U_2): U_2;
        };
        find: {
            <S_2 extends any>(predicate: (this: void, value: any, index: number, obj: readonly any[]) => value is S_2, thisArg?: any): S_2 | undefined;
            (predicate: (value: any, index: number, obj: readonly any[]) => unknown, thisArg?: any): any;
        };
        findIndex: (predicate: (value: any, index: number, obj: readonly any[]) => unknown, thisArg?: any) => number;
        entries: () => IterableIterator<[number, any]>;
        keys: () => IterableIterator<number>;
        values: () => IterableIterator<any>;
        includes: (searchElement: any, fromIndex?: number | undefined) => boolean;
        flatMap: <U_3, This = undefined>(callback: (this: This, value: any, index: number, array: any[]) => U_3 | readonly U_3[], thisArg?: This | undefined) => U_3[];
        flat: <A, D extends number = 1>(this: A, depth?: D | undefined) => FlatArray<A, D>[];
        [Symbol.iterator]: () => IterableIterator<any>;
    }[]>;
    call: (contractCalls: ContractCall[]) => Promise<void>;
};

declare type EthersHooksContext = {
    provider: Web3Provider;
    signer: Signer$1;
    network: Network;
    address: string;
    balance: bigint;
};
declare type OnActivatedHook = (context: EthersHooksContext) => void;
declare type OnChangedHook = (context: EthersHooksContext) => void;
declare type OnDeactivatedHook = () => void;
declare function useEthersHooks(): {
    onActivated: (hook: OnActivatedHook) => OnActivatedHook;
    onDeactivated: (hook: OnDeactivatedHook) => OnDeactivatedHook;
    onChanged: (hook: OnChangedHook) => OnChangedHook;
};

declare function shortenAddress(address: string): string;
declare function displayEther(balance: BigNumber | bigint, fixed?: number): string;
declare function displayChainName(chainId: number): string;

declare function checkInfuraId(infuraId: string): Promise<any>;
declare function checkChainId(chainId: number): boolean;

declare const VueDapp: Plugin;

export { AddChainError, AddEthereumChainParameter, CHAIN_NAMES, ChainId, CoinbaseWalletConnector, CoinbaseWalletConnectorOptions, ConnectionStatus, Connector, ConnectorData, ConnectorNotFoundError, ContractCall, ERC20, ERC20Interface, EthersHooksContext, ICoinbaseWalletProvider, IWalletConnectProvider, Multicall2$1 as MULTICALL2_ABI, MULTICALL2_ADDRESS, MetaMaskConnector, MetaMaskConnectorOptions, MetaMaskEthereumProvider, MetaMaskProvider, NETWORK_DETAILS, OnAccountsChangedCallback, OnActivatedHook, OnChainChangedCallback, OnChangedHook, OnDeactivatedHook, OnDisconnectCallback, ProviderNotFoundError, ProviderRpcError, RpcError, SwitchChainError, SwitchChainNotSupportedError, UserRejectedRequestError, VueDapp, WalletConnectConnector, WalletConnectOptions, Window, checkChainId, checkInfuraId, displayChainName, displayEther, shortenAddress, useBoard, useEthers, useEthersHooks, useMulticall, useWallet, useWalletOptions };
