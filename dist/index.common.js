'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var abi$1 = require('@ethersproject/abi');
var vue = require('vue');
var providers = require('@ethersproject/providers');
var ethers = require('ethers');
var contracts = require('@ethersproject/contracts');
var utils = require('ethers/lib/utils');
var CoinbaseWalletSDK = require('@coinbase/wallet-sdk');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var CoinbaseWalletSDK__default = /*#__PURE__*/_interopDefaultLegacy(CoinbaseWalletSDK);

exports.ChainId = void 0;
(function (ChainId) {
    ChainId[ChainId["Hardhat"] = 31337] = "Hardhat";
    ChainId[ChainId["Mainnet"] = 1] = "Mainnet";
    ChainId[ChainId["Ropsten"] = 3] = "Ropsten";
    ChainId[ChainId["Rinkeby"] = 4] = "Rinkeby";
    ChainId[ChainId["Goerli"] = 5] = "Goerli";
    ChainId[ChainId["Kovan"] = 42] = "Kovan";
    ChainId[ChainId["xDai"] = 100] = "xDai";
    ChainId[ChainId["Rinkarby"] = 421611] = "Rinkarby";
    ChainId[ChainId["Arbitrum"] = 42161] = "Arbitrum";
    ChainId[ChainId["Polygon"] = 137] = "Polygon";
})(exports.ChainId || (exports.ChainId = {}));
const CHAIN_NAMES = {
    [exports.ChainId.Hardhat]: 'Hardhat',
    [exports.ChainId.Mainnet]: 'Mainnet',
    [exports.ChainId.Ropsten]: 'Ropsten',
    [exports.ChainId.Kovan]: 'Kovan',
    [exports.ChainId.Rinkeby]: 'Rinkeby',
    [exports.ChainId.Goerli]: 'Goerli',
    [exports.ChainId.xDai]: 'xDai',
    [exports.ChainId.Rinkarby]: 'Rinkarby',
    [exports.ChainId.Arbitrum]: 'Arbitrum',
    [exports.ChainId.Polygon]: 'Polygon',
};
// @todo add other network details. Refer to https://chainlist.org/
const NETWORK_DETAILS = {
    [exports.ChainId.Arbitrum]: {
        chainId: '0x' + exports.ChainId.Arbitrum.toString(16),
        chainName: 'Arbitrum',
        nativeCurrency: {
            symbol: 'ETH',
            decimals: 18,
        },
        rpcUrls: ['https://arb1.arbitrum.io/rpc'],
        blockExplorerUrls: ['https://arbiscan.io'],
    },
    [exports.ChainId.Rinkarby]: {
        chainId: '0x' + exports.ChainId.Rinkarby.toString(16),
        chainName: 'RinkArby',
        nativeCurrency: {
            symbol: 'ETH',
            decimals: 18,
        },
        rpcUrls: ['https://rinkeby.arbitrum.io/rpc'],
        blockExplorerUrls: ['https://rinkeby-explorer.arbitrum.io'],
    },
    [exports.ChainId.xDai]: {
        chainId: '0x' + exports.ChainId.xDai.toString(16),
        chainName: 'xDAI',
        nativeCurrency: {
            symbol: 'xDAI',
            decimals: 18,
        },
        rpcUrls: ['https://rpc.xdaichain.com'],
        blockExplorerUrls: ['https://blockscout.com/poa/xdai'],
    },
    [exports.ChainId.Polygon]: {
        chainId: '0x' + exports.ChainId.Polygon.toString(16),
        chainName: 'Polygon Mainnet',
        nativeCurrency: {
            symbol: 'MATIC',
            decimals: 18,
        },
        rpcUrls: ['https://polygon-rpc.com/'],
        blockExplorerUrls: ['https://polygonscan.com/'],
    },
};

const MULTICALL2_ADDRESS = '0x5ba1e12693dc8f9c48aad8770482f4739beed696';

var MULTICALL2_ABI = [
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

const ERC20Interface = new abi$1.Interface(ERC20.abi);

const boardOpen = vue.ref(false);
function useBoard() {
    const open = () => {
        boardOpen.value = true;
    };
    const close = () => {
        boardOpen.value = false;
    };
    return {
        boardOpen,
        open,
        close,
    };
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

const isActivated = vue.ref(false);
const provider$1 = vue.ref(null);
const signer$1 = vue.ref(null);
const network$1 = vue.ref(null);
const address$1 = vue.ref('');
const balance$1 = vue.ref(BigInt(0));
const deactivate = () => {
    isActivated.value = false;
    provider$1.value = null;
    signer$1.value = null;
    network$1.value = null;
    address$1.value = '';
    balance$1.value = BigInt(0);
};
function activate(externalProvider) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!externalProvider)
            throw new Error('Failed to activate ethers: provider not found');
        // Test loading
        // await new Promise((resolve) => {
        //   setTimeout(() => {
        //     resolve(true)
        //   }, 2000)
        // })
        const _provider = new providers.Web3Provider(externalProvider);
        const _signer = _provider.getSigner();
        /**
         * @issue #27
         * @dev Catch error if walletConnect not connected because of invalid infura id.
         * if you provide an invalid infura id, you can still open the qrcode but can't connect to wallet.
         * WalletConnect will throw error and keep polling until timeout as follows.
         */
        let _network = null;
        let _address = '';
        let _balance = ethers.BigNumber.from(0);
        const getData = (timeout = 5000) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // setTimeout(() => {
                    //   reject('Failed to activate ethers: timeout')
                    // }, timeout)
                    _network = yield _provider.getNetwork();
                    _address = yield _signer.getAddress();
                    _balance = yield _signer.getBalance();
                    resolve([_network, _address, _balance]);
                }
                catch (err) {
                    reject(err);
                }
            }));
        };
        try {
            yield getData();
        }
        catch (err) {
            throw new Error(err);
        }
        provider$1.value = vue.markRaw(_provider);
        signer$1.value = vue.markRaw(_signer);
        network$1.value = _network;
        address$1.value = _address;
        balance$1.value = _balance.toBigInt();
        isActivated.value = true;
    });
}
function useEthers() {
    const chainId = vue.computed(() => { var _a; return (_a = network$1.value) === null || _a === void 0 ? void 0 : _a.chainId; });
    return {
        // state
        isActivated,
        provider: provider$1,
        signer: signer$1,
        network: network$1,
        address: address$1,
        balance: balance$1,
        // getters
        chainId,
        // methods
        activate,
        deactivate,
    };
}

const wallet = vue.reactive({
    connector: null,
    provider: null,
    error: '',
    status: 'none',
});
const callbacks = vue.reactive({
    onDisconnectCallback: null,
    onAccountsChangedCallback: null,
    onChainChangedCallback: null,
});
function useWallet(options = { useEthers: true }) {
    const clearWallet = () => {
        wallet.connector = null;
        wallet.provider = null;
        wallet.error = '';
        wallet.status = 'none';
        if (options.useEthers) {
            const { deactivate } = useEthers();
            deactivate();
        }
    };
    function reactivate() {
        return __awaiter(this, void 0, void 0, function* () {
            const { activate } = useEthers();
            wallet.status = 'loading';
            try {
                yield activate(wallet.provider);
            }
            catch (err) {
                clearWallet();
                wallet.error = err.message;
                throw new Error(err);
            }
            wallet.status = 'connected';
        });
    }
    function connectWith(connector) {
        return __awaiter(this, void 0, void 0, function* () {
            wallet.status = 'connecting';
            wallet.error = '';
            try {
                if (!connector)
                    throw new Error('Incorrect connector argument');
                const { provider } = yield connector.connect();
                wallet.connector = vue.markRaw(connector);
                wallet.provider = vue.markRaw(provider);
                if (options.useEthers) {
                    wallet.status = 'loading';
                    const { activate } = useEthers();
                    yield activate(wallet.provider);
                }
            }
            catch (err) {
                yield disconnect(); // will also clearWallet()
                wallet.error = err.message;
                throw new Error(err);
            }
            wallet.status = 'connected';
            // subscribe events
            if (wallet.connector) {
                wallet.connector.onDisconnect((...args) => {
                    var _a;
                    callbacks.onDisconnectCallback &&
                        callbacks.onDisconnectCallback(...args);
                    /**
                     * Exclude metamask to disconnect on this event
                     * @note MetaMask disconnect event would be triggered when the specific chain changed (like L2 network),
                     * so if we disconnect in this case, it would fail to reactivate ethers when chain changed
                     * because the wallet state was cleared.
                     * @todo better solution
                     */
                    if (((_a = wallet.connector) === null || _a === void 0 ? void 0 : _a.name) === 'metaMask') {
                        return;
                    }
                    disconnect();
                });
            }
            if (wallet.connector) {
                wallet.connector.onAccountsChanged((accounts) => __awaiter(this, void 0, void 0, function* () {
                    callbacks.onAccountsChangedCallback &&
                        callbacks.onAccountsChangedCallback(accounts);
                    if (options.useEthers) {
                        yield reactivate();
                    }
                }));
            }
            if (wallet.connector) {
                wallet.connector.onChainChanged((chainId) => __awaiter(this, void 0, void 0, function* () {
                    callbacks.onChainChangedCallback &&
                        callbacks.onChainChangedCallback(chainId);
                    if (options.useEthers) {
                        yield reactivate();
                    }
                }));
            }
        });
    }
    function disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (wallet.connector) {
                try {
                    yield wallet.connector.disconnect();
                }
                catch (err) {
                    clearWallet();
                    throw new Error(err);
                }
            }
            clearWallet();
        });
    }
    function onDisconnect(callback) {
        callbacks.onDisconnectCallback = callback;
    }
    function onAccountsChanged(callback) {
        callbacks.onAccountsChangedCallback = callback;
    }
    function onChainChanged(callback) {
        callbacks.onChainChangedCallback = callback;
    }
    return {
        wallet,
        connectWith,
        disconnect,
        onDisconnect,
        onAccountsChanged,
        onChainChanged,
    };
}

function useMulticall(provider) {
    const results = vue.ref([]);
    const blockNumber = vue.ref(0);
    const multicall = new contracts.Contract(MULTICALL2_ADDRESS, MULTICALL2_ABI, provider);
    function call(contractCalls) {
        return __awaiter(this, void 0, void 0, function* () {
            const calls = contractCalls.map((call) => {
                const iface = getInterface(call.interface);
                return {
                    target: call.address,
                    callData: iface.encodeFunctionData(call.method, call.args),
                };
            });
            const { blockNumber: blocNum, returnData } = yield tryBlockAndAggregate(calls);
            results.value = returnData.map((data, i) => {
                if (!data.success)
                    console.error(`Failed to call ${contractCalls[i].method}`);
                const iface = getInterface(contractCalls[i].interface);
                return iface.decodeFunctionResult(contractCalls[i].method, data.returnData);
            });
            blockNumber.value = blocNum.toNumber();
        });
    }
    function tryBlockAndAggregate(calls) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield multicall.callStatic.tryBlockAndAggregate(false, calls);
        });
    }
    return {
        multicall,
        blockNumber,
        results,
        call,
    };
}
function getInterface(contractInterface) {
    if (abi$1.Interface.isInterface(contractInterface)) {
        return contractInterface;
    }
    return new abi$1.Interface(contractInterface);
}

const { provider, signer, network, address, balance } = useEthers();
function useEthersHooks() {
    const onActivatedHook = vue.ref(null);
    const onDeactivatedHook = vue.ref(null);
    const onChangedHook = vue.ref(null);
    vue.watch(provider, (provider, oldProvider) => {
        if (!oldProvider && provider) {
            onActivatedHook.value &&
                onActivatedHook.value({
                    provider,
                    signer: signer.value,
                    network: network.value,
                    address: address.value,
                    balance: balance.value,
                });
        }
        else if (oldProvider && provider) {
            onChangedHook.value &&
                onChangedHook.value({
                    provider,
                    signer: signer.value,
                    network: network.value,
                    address: address.value,
                    balance: balance.value,
                });
        }
        else if (oldProvider && !provider) {
            onDeactivatedHook.value && onDeactivatedHook.value();
        }
    });
    const onActivated = (hook) => (onActivatedHook.value = hook);
    const onChanged = (hook) => (onChangedHook.value = hook);
    const onDeactivated = (hook) => (onDeactivatedHook.value = hook);
    return {
        onActivated,
        onDeactivated,
        onChanged,
    };
}

// Source: wagmi https://github.com/tmm/wagmi/blob/main/packages/core/src/errors.ts
/**
 * Error subclass implementing JSON RPC 2.0 errors and Ethereum RPC errors per EIP-1474.
 * @see https://eips.ethereum.org/EIPS/eip-1474
 */
class RpcError extends Error {
    constructor(
    /** Number error code */
    code, 
    /** Human-readable string */
    message, 
    /** Low-level error */
    internal, 
    /** Other useful information about error */
    data) {
        if (!Number.isInteger(code))
            throw new Error('"code" must be an integer.');
        if (!message || typeof message !== 'string')
            throw new Error('"message" must be a nonempty string.');
        super(message);
        this.code = code;
        this.data = data;
        this.internal = internal;
    }
}
/**
 * Error subclass implementing Ethereum Provider errors per EIP-1193.
 * @see https://eips.ethereum.org/EIPS/eip-1193
 */
class ProviderRpcError extends RpcError {
    /**
     * Create an Ethereum Provider JSON-RPC error.
     * `code` must be an integer in the 1000 <= 4999 range.
     */
    constructor(
    /**
     * Number error code
     * @see https://eips.ethereum.org/EIPS/eip-1193#error-standards
     */
    code, 
    /** Human-readable string */
    message, 
    /** Low-level error */
    internal, 
    /** Other useful information about error */
    data) {
        if (!(Number.isInteger(code) && code >= 1000 && code <= 4999))
            throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
        super(code, message, internal, data);
    }
}
class ConnectorNotFoundError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'ConnectorNotFoundError';
        this.message = 'Connector not found';
    }
}
class ProviderNotFoundError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'ProviderNotFoundError';
        this.message = 'Provider not found';
    }
}
class AddChainError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'AddChainError';
        this.message = 'Error adding chain';
    }
}
class SwitchChainError extends ProviderRpcError {
    constructor(error) {
        super(4902, error.message);
        this.name = 'SwitchChainError';
    }
}
class SwitchChainNotSupportedError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'SwitchChainNotSupportedError';
        this.message = 'Switch chain not supported by connector';
    }
}
class UserRejectedRequestError extends ProviderRpcError {
    constructor(error) {
        super(4001, error.message);
        this.name = 'UserRejectedRequestError';
    }
}

class Connector {
    constructor(options) {
        this.options = options;
    }
}

var _MetaMaskConnector_instances, _MetaMaskConnector_provider, _MetaMaskConnector_onDisconnectHandler, _MetaMaskConnector_onAccountsChangedHandler, _MetaMaskConnector_onChainChangedHandler, _MetaMaskConnector_removeListener, _MetaMaskConnector_normalizeChainId, _MetaMaskConnector_isUserRejectedRequestError;
class MetaMaskConnector extends Connector {
    constructor(options = {}) {
        super(options);
        _MetaMaskConnector_instances.add(this);
        this.name = 'metaMask';
        _MetaMaskConnector_provider.set(this, void 0);
        _MetaMaskConnector_onDisconnectHandler.set(this, void 0);
        _MetaMaskConnector_onAccountsChangedHandler.set(this, void 0);
        _MetaMaskConnector_onChainChangedHandler.set(this, void 0);
    }
    connect() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let provider = yield this.getProvider();
            /**
             * See PR #36 - find the single metamask provider when coinbaseWallet & metaMask are both installed
             * @link https://github.com/chnejohnson/vue-dapp/pull/36
             */
            const isMulti = (((_a = provider === null || provider === void 0 ? void 0 : provider.providers) === null || _a === void 0 ? void 0 : _a.length) || 0) > 1;
            isMulti &&
                (provider =
                    ((_b = provider === null || provider === void 0 ? void 0 : provider.providers) === null || _b === void 0 ? void 0 : _b.find((e) => e.isMetaMask)) ||
                        provider);
            __classPrivateFieldSet(this, _MetaMaskConnector_provider, provider, "f");
            const accounts = yield __classPrivateFieldGet(this, _MetaMaskConnector_provider, "f").request({
                method: 'eth_requestAccounts',
                params: [{ eth_accounts: {} }],
            });
            const account = accounts[0];
            return {
                account,
                provider,
            };
        });
    }
    getProvider() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof window !== 'undefined' && !!window.ethereum) {
                return window.ethereum;
            }
            /**
             * @see PR#29 - add deep link to MetaMask wallet on mobile device
             * @link https://github.com/chnejohnson/vue-dapp/pull/29
             */
            if (this.options.appUrl) {
                window.open(`https://metamask.app.link/dapp/${this.options.appUrl}`, '_blank');
            }
            throw new ProviderNotFoundError();
        });
    }
    /**
     * MetaMask do not support programmatic disconnect.
     * @see https://github.com/MetaMask/metamask-extension/issues/10353
     */
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _MetaMaskConnector_provider, "f"))
                throw new ProviderNotFoundError();
            __classPrivateFieldGet(this, _MetaMaskConnector_onDisconnectHandler, "f") &&
                __classPrivateFieldGet(this, _MetaMaskConnector_instances, "m", _MetaMaskConnector_removeListener).call(this, 'disconnect', __classPrivateFieldGet(this, _MetaMaskConnector_onDisconnectHandler, "f"));
            __classPrivateFieldGet(this, _MetaMaskConnector_onAccountsChangedHandler, "f") &&
                __classPrivateFieldGet(this, _MetaMaskConnector_instances, "m", _MetaMaskConnector_removeListener).call(this, 'accountsChanged', __classPrivateFieldGet(this, _MetaMaskConnector_onAccountsChangedHandler, "f"));
            __classPrivateFieldGet(this, _MetaMaskConnector_onChainChangedHandler, "f") &&
                __classPrivateFieldGet(this, _MetaMaskConnector_instances, "m", _MetaMaskConnector_removeListener).call(this, 'chainChanged', __classPrivateFieldGet(this, _MetaMaskConnector_onChainChangedHandler, "f"));
            __classPrivateFieldSet(this, _MetaMaskConnector_provider, undefined, "f");
            __classPrivateFieldSet(this, _MetaMaskConnector_onDisconnectHandler, undefined, "f");
            __classPrivateFieldSet(this, _MetaMaskConnector_onAccountsChangedHandler, undefined, "f");
            __classPrivateFieldSet(this, _MetaMaskConnector_onChainChangedHandler, undefined, "f");
        });
    }
    /**
     * @note MetaMask disconnect event would be triggered when the specific chain changed (like L2 network),
     * and will not be triggered when a user clicked disconnect in wallet...
     */
    onDisconnect(handler) {
        if (!__classPrivateFieldGet(this, _MetaMaskConnector_provider, "f"))
            throw new ProviderNotFoundError();
        if (__classPrivateFieldGet(this, _MetaMaskConnector_onDisconnectHandler, "f")) {
            __classPrivateFieldGet(this, _MetaMaskConnector_instances, "m", _MetaMaskConnector_removeListener).call(this, 'disconnect', __classPrivateFieldGet(this, _MetaMaskConnector_onDisconnectHandler, "f"));
        }
        __classPrivateFieldSet(this, _MetaMaskConnector_onDisconnectHandler, handler, "f");
        __classPrivateFieldGet(this, _MetaMaskConnector_provider, "f").on('disconnect', handler);
    }
    onAccountsChanged(handler) {
        if (!__classPrivateFieldGet(this, _MetaMaskConnector_provider, "f"))
            throw new ProviderNotFoundError();
        if (__classPrivateFieldGet(this, _MetaMaskConnector_onAccountsChangedHandler, "f")) {
            __classPrivateFieldGet(this, _MetaMaskConnector_instances, "m", _MetaMaskConnector_removeListener).call(this, 'accountsChanged', __classPrivateFieldGet(this, _MetaMaskConnector_onAccountsChangedHandler, "f"));
        }
        __classPrivateFieldSet(this, _MetaMaskConnector_onAccountsChangedHandler, handler, "f");
        __classPrivateFieldGet(this, _MetaMaskConnector_provider, "f").on('accountsChanged', handler);
    }
    onChainChanged(handler) {
        if (!__classPrivateFieldGet(this, _MetaMaskConnector_provider, "f"))
            throw new ProviderNotFoundError();
        if (__classPrivateFieldGet(this, _MetaMaskConnector_onChainChangedHandler, "f")) {
            __classPrivateFieldGet(this, _MetaMaskConnector_instances, "m", _MetaMaskConnector_removeListener).call(this, 'chainChanged', __classPrivateFieldGet(this, _MetaMaskConnector_onChainChangedHandler, "f"));
        }
        __classPrivateFieldSet(this, _MetaMaskConnector_onChainChangedHandler, handler, "f");
        __classPrivateFieldGet(this, _MetaMaskConnector_provider, "f").on('chainChanged', (chainId) => {
            const _chainId = __classPrivateFieldGet(this, _MetaMaskConnector_instances, "m", _MetaMaskConnector_normalizeChainId).call(this, chainId);
            handler(_chainId);
        });
    }
    switchChain(chainId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _MetaMaskConnector_provider, "f"))
                throw new ProviderNotFoundError();
            const id = utils.hexValue(chainId);
            try {
                yield __classPrivateFieldGet(this, _MetaMaskConnector_provider, "f").request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: id }],
                });
            }
            catch (err) {
                if (err.code === 4902) {
                    try {
                        yield this.addChain(NETWORK_DETAILS[chainId]);
                    }
                    catch (err) {
                        if (__classPrivateFieldGet(this, _MetaMaskConnector_instances, "m", _MetaMaskConnector_isUserRejectedRequestError).call(this, err)) {
                            throw new UserRejectedRequestError(err);
                        }
                        throw new AddChainError();
                    }
                }
                if (__classPrivateFieldGet(this, _MetaMaskConnector_instances, "m", _MetaMaskConnector_isUserRejectedRequestError).call(this, err)) {
                    throw new UserRejectedRequestError(err);
                }
                throw new SwitchChainError(err);
            }
        });
    }
    addChain(networkDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _MetaMaskConnector_provider, "f"))
                throw new ProviderNotFoundError();
            try {
                __classPrivateFieldGet(this, _MetaMaskConnector_provider, "f").request({
                    method: 'wallet_addEthereumChain',
                    params: [networkDetails], // notice that chainId must be in hexadecimal numbers
                });
            }
            catch (err) {
                throw new AddChainError();
            }
        });
    }
}
_MetaMaskConnector_provider = new WeakMap(), _MetaMaskConnector_onDisconnectHandler = new WeakMap(), _MetaMaskConnector_onAccountsChangedHandler = new WeakMap(), _MetaMaskConnector_onChainChangedHandler = new WeakMap(), _MetaMaskConnector_instances = new WeakSet(), _MetaMaskConnector_removeListener = function _MetaMaskConnector_removeListener(event, handler) {
    if (!__classPrivateFieldGet(this, _MetaMaskConnector_provider, "f"))
        throw new ProviderNotFoundError();
    __classPrivateFieldGet(this, _MetaMaskConnector_provider, "f").removeListener(event, handler);
}, _MetaMaskConnector_normalizeChainId = function _MetaMaskConnector_normalizeChainId(chainId) {
    if (typeof chainId === 'string')
        return Number.parseInt(chainId, chainId.trim().substring(0, 2) === '0x' ? 16 : 10);
    return chainId;
}, _MetaMaskConnector_isUserRejectedRequestError = function _MetaMaskConnector_isUserRejectedRequestError(error) {
    return /(user rejected)/i.test(error.message);
};

var _WalletConnectConnector_instances, _WalletConnectConnector_provider, _WalletConnectConnector_onDisconnectHandler, _WalletConnectConnector_onAccountsChangedHandler, _WalletConnectConnector_onChainChangedHandler, _WalletConnectConnector_removeListener;
class WalletConnectConnector extends Connector {
    constructor(options) {
        super(options);
        _WalletConnectConnector_instances.add(this);
        this.name = 'walletConnect';
        _WalletConnectConnector_provider.set(this, void 0);
        _WalletConnectConnector_onDisconnectHandler.set(this, void 0);
        _WalletConnectConnector_onAccountsChangedHandler.set(this, void 0);
        _WalletConnectConnector_onChainChangedHandler.set(this, void 0);
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.getProvider();
            __classPrivateFieldSet(this, _WalletConnectConnector_provider, provider, "f");
            const accounts = yield provider.enable();
            const account = utils.getAddress(accounts[0]);
            return {
                account,
                provider,
            };
        });
    }
    getProvider() {
        return __awaiter(this, void 0, void 0, function* () {
            const WalletConnectProvider = (yield Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('@walletconnect/web3-provider')); }))
                .default;
            const provider = new WalletConnectProvider(Object.assign({}, this.options));
            // fix: If user reject session, provider.enable() will be stuck and can't be resolved.
            // source code: https://github.com/WalletConnect/walletconnect-monorepo/blob/v1.0/packages/providers/web3-provider/src/index.ts
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                provider.wc.on('disconnect', (err, payload) => {
                    if (!provider.connected) {
                        console.error(err, payload);
                        reject(new UserRejectedRequestError(err));
                    }
                });
                try {
                    yield provider.enable();
                }
                catch (e) {
                    reject(new Error(e));
                    return;
                }
                resolve(provider);
            }));
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _WalletConnectConnector_provider, "f"))
                throw new ProviderNotFoundError();
            yield __classPrivateFieldGet(this, _WalletConnectConnector_provider, "f").disconnect();
            __classPrivateFieldSet(this, _WalletConnectConnector_provider, undefined, "f");
        });
    }
    onDisconnect(handler) {
        if (!__classPrivateFieldGet(this, _WalletConnectConnector_provider, "f"))
            throw new ProviderNotFoundError();
        if (__classPrivateFieldGet(this, _WalletConnectConnector_onDisconnectHandler, "f")) {
            __classPrivateFieldGet(this, _WalletConnectConnector_instances, "m", _WalletConnectConnector_removeListener).call(this, 'disconnect', __classPrivateFieldGet(this, _WalletConnectConnector_onDisconnectHandler, "f"));
        }
        __classPrivateFieldSet(this, _WalletConnectConnector_onDisconnectHandler, handler, "f");
        __classPrivateFieldGet(this, _WalletConnectConnector_provider, "f").on('disconnect', handler);
    }
    onAccountsChanged(handler) {
        if (!__classPrivateFieldGet(this, _WalletConnectConnector_provider, "f"))
            throw new ProviderNotFoundError();
        if (__classPrivateFieldGet(this, _WalletConnectConnector_onAccountsChangedHandler, "f")) {
            __classPrivateFieldGet(this, _WalletConnectConnector_instances, "m", _WalletConnectConnector_removeListener).call(this, 'accountsChanged', __classPrivateFieldGet(this, _WalletConnectConnector_onAccountsChangedHandler, "f"));
        }
        __classPrivateFieldSet(this, _WalletConnectConnector_onAccountsChangedHandler, handler, "f");
        __classPrivateFieldGet(this, _WalletConnectConnector_provider, "f").on('accountsChanged', handler);
    }
    onChainChanged(handler) {
        if (!__classPrivateFieldGet(this, _WalletConnectConnector_provider, "f"))
            throw new ProviderNotFoundError();
        if (__classPrivateFieldGet(this, _WalletConnectConnector_onChainChangedHandler, "f")) {
            __classPrivateFieldGet(this, _WalletConnectConnector_instances, "m", _WalletConnectConnector_removeListener).call(this, 'chainChanged', __classPrivateFieldGet(this, _WalletConnectConnector_onChainChangedHandler, "f"));
        }
        __classPrivateFieldSet(this, _WalletConnectConnector_onChainChangedHandler, handler, "f");
        __classPrivateFieldGet(this, _WalletConnectConnector_provider, "f").on('chainChanged', (chainId) => {
            var _a;
            if (((_a = this.options) === null || _a === void 0 ? void 0 : _a.rpc) && this.options.rpc[chainId]) {
                handler(chainId);
            }
            else {
                // TODO: what's the best way to handle this?
                this.disconnect();
                window.location.reload();
                throw new Error('chain id not supported by connector');
            }
        });
    }
    /**
     * @error Not support for WalletConnect v1.0
     */
    switchChain(chainId) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _WalletConnectConnector_provider, "f"))
                throw new ProviderNotFoundError();
            if (!((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.rpc) === null || _b === void 0 ? void 0 : _b[chainId]))
                throw new SwitchChainNotSupportedError();
            const id = utils.hexValue(chainId);
            try {
                yield __classPrivateFieldGet(this, _WalletConnectConnector_provider, "f").request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: id }],
                });
            }
            catch (error) {
                const message = typeof error === 'string' ? error : error === null || error === void 0 ? void 0 : error.message;
                if (/user rejected request/i.test(message)) {
                    throw new UserRejectedRequestError(error);
                }
                throw new SwitchChainError(error);
            }
        });
    }
}
_WalletConnectConnector_provider = new WeakMap(), _WalletConnectConnector_onDisconnectHandler = new WeakMap(), _WalletConnectConnector_onAccountsChangedHandler = new WeakMap(), _WalletConnectConnector_onChainChangedHandler = new WeakMap(), _WalletConnectConnector_instances = new WeakSet(), _WalletConnectConnector_removeListener = function _WalletConnectConnector_removeListener(event, handler) {
    if (!__classPrivateFieldGet(this, _WalletConnectConnector_provider, "f"))
        throw new ProviderNotFoundError();
    __classPrivateFieldGet(this, _WalletConnectConnector_provider, "f").removeListener(event, handler);
    // console.log('remove listener', event, handler)
};

var _CoinbaseWalletConnector_instances, _CoinbaseWalletConnector_provider, _CoinbaseWalletConnector_onDisconnectHandler, _CoinbaseWalletConnector_onAccountsChangedHandler, _CoinbaseWalletConnector_onChainChangedHandler, _CoinbaseWalletConnector_removeListener, _CoinbaseWalletConnector_isUserRejectedRequestError;
class CoinbaseWalletConnector extends Connector {
    constructor(options) {
        super(options);
        _CoinbaseWalletConnector_instances.add(this);
        this.name = 'coinbaseWallet';
        _CoinbaseWalletConnector_provider.set(this, void 0);
        _CoinbaseWalletConnector_onDisconnectHandler.set(this, void 0);
        _CoinbaseWalletConnector_onAccountsChangedHandler.set(this, void 0);
        _CoinbaseWalletConnector_onChainChangedHandler.set(this, void 0);
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.getProvider();
            __classPrivateFieldSet(this, _CoinbaseWalletConnector_provider, provider, "f");
            const accounts = yield provider.enable();
            const account = utils.getAddress(accounts[0]);
            return {
                account,
                provider,
            };
        });
    }
    getProvider() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = new CoinbaseWalletSDK__default["default"](this.options);
            const provider = client.makeWeb3Provider(this.options.jsonRpcUrl, this.options.chainId);
            return provider;
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _CoinbaseWalletConnector_provider, "f"))
                throw new ProviderNotFoundError();
            yield __classPrivateFieldGet(this, _CoinbaseWalletConnector_provider, "f").close();
            __classPrivateFieldSet(this, _CoinbaseWalletConnector_provider, undefined, "f");
        });
    }
    /**
     * @note CoinbaseWallet will reload page if it disconnected by wallet app.
     * @todo experiment with the browser extension
     */
    onDisconnect(handler) {
        if (!__classPrivateFieldGet(this, _CoinbaseWalletConnector_provider, "f"))
            throw new ProviderNotFoundError();
        if (__classPrivateFieldGet(this, _CoinbaseWalletConnector_onDisconnectHandler, "f")) {
            __classPrivateFieldGet(this, _CoinbaseWalletConnector_instances, "m", _CoinbaseWalletConnector_removeListener).call(this, 'disconnect', __classPrivateFieldGet(this, _CoinbaseWalletConnector_onDisconnectHandler, "f"));
        }
        __classPrivateFieldSet(this, _CoinbaseWalletConnector_onDisconnectHandler, handler, "f");
        __classPrivateFieldGet(this, _CoinbaseWalletConnector_provider, "f").on('disconnect', handler);
    }
    onAccountsChanged(handler) {
        if (!__classPrivateFieldGet(this, _CoinbaseWalletConnector_provider, "f"))
            throw new ProviderNotFoundError();
        if (__classPrivateFieldGet(this, _CoinbaseWalletConnector_onAccountsChangedHandler, "f")) {
            __classPrivateFieldGet(this, _CoinbaseWalletConnector_instances, "m", _CoinbaseWalletConnector_removeListener).call(this, 'accountsChanged', __classPrivateFieldGet(this, _CoinbaseWalletConnector_onAccountsChangedHandler, "f"));
        }
        __classPrivateFieldSet(this, _CoinbaseWalletConnector_onAccountsChangedHandler, handler, "f");
        __classPrivateFieldGet(this, _CoinbaseWalletConnector_provider, "f").on('accountsChanged', handler);
    }
    onChainChanged(handler) {
        if (!__classPrivateFieldGet(this, _CoinbaseWalletConnector_provider, "f"))
            throw new ProviderNotFoundError();
        if (__classPrivateFieldGet(this, _CoinbaseWalletConnector_onChainChangedHandler, "f")) {
            __classPrivateFieldGet(this, _CoinbaseWalletConnector_instances, "m", _CoinbaseWalletConnector_removeListener).call(this, 'chainChanged', __classPrivateFieldGet(this, _CoinbaseWalletConnector_onChainChangedHandler, "f"));
        }
        __classPrivateFieldSet(this, _CoinbaseWalletConnector_onChainChangedHandler, handler, "f");
        __classPrivateFieldGet(this, _CoinbaseWalletConnector_provider, "f").on('chainChanged', handler);
    }
    /**
     * @todo: add addChain()
     */
    switchChain(chainId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _CoinbaseWalletConnector_provider, "f"))
                throw new ProviderNotFoundError();
            const provider = __classPrivateFieldGet(this, _CoinbaseWalletConnector_provider, "f");
            const id = utils.hexValue(chainId);
            try {
                yield provider.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: id }],
                });
            }
            catch (error) {
                if (error.code === 4902) ;
                if (__classPrivateFieldGet(this, _CoinbaseWalletConnector_instances, "m", _CoinbaseWalletConnector_isUserRejectedRequestError).call(this, error)) {
                    throw new UserRejectedRequestError(error);
                }
                throw new SwitchChainError(error);
            }
        });
    }
}
_CoinbaseWalletConnector_provider = new WeakMap(), _CoinbaseWalletConnector_onDisconnectHandler = new WeakMap(), _CoinbaseWalletConnector_onAccountsChangedHandler = new WeakMap(), _CoinbaseWalletConnector_onChainChangedHandler = new WeakMap(), _CoinbaseWalletConnector_instances = new WeakSet(), _CoinbaseWalletConnector_removeListener = function _CoinbaseWalletConnector_removeListener(event, handler) {
    if (!__classPrivateFieldGet(this, _CoinbaseWalletConnector_provider, "f"))
        throw new ProviderNotFoundError();
    __classPrivateFieldGet(this, _CoinbaseWalletConnector_provider, "f").removeListener(event, handler);
    // console.log('remove listener', event, handler)
}, _CoinbaseWalletConnector_isUserRejectedRequestError = function _CoinbaseWalletConnector_isUserRejectedRequestError(error) {
    return /(user rejected)/i.test(error.message);
};

function checkInfuraId(infuraId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`https://mainnet.infura.io/v3/${infuraId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 1,
                method: 'eth_blockNumber',
                params: [],
            }),
        });
        const data = yield res.json();
        return data.result;
    });
}
function checkChainId(chainId) {
    if (chainId in exports.ChainId) {
        return true;
    }
    return false;
}

function shortenAddress(address) {
    if (utils.isAddress(address)) {
        return address.slice(0, 6) + '...' + address.slice(-4);
    }
    else {
        return '';
    }
}
function displayEther(balance, fixed = 2) {
    return (+utils.formatEther(balance)).toFixed(fixed);
}
function displayChainName(chainId) {
    if (!checkChainId(chainId)) {
        console.error('Error: Invalid chainId');
        return 'network not found';
    }
    return CHAIN_NAMES[chainId].toLowerCase();
}

const clickOutside = {
    beforeMount: (el, binding) => {
        el.clickOutsideEvent = (event) => {
            event.stopPropagation();
            if (event.target !== el && !el.contains(event.target)) {
                binding.value(event);
            }
        };
        const clickHandler = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
        setTimeout(() => {
            document.addEventListener(clickHandler, el.clickOutsideEvent);
        }, 0);
    },
    unmounted: (el) => {
        const clickOutsideEvent = el.clickOutsideEvent;
        delete el.clickOutsideEvent;
        const clickHandler = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
        document.removeEventListener(clickHandler, clickOutsideEvent);
    },
};

var script$5 = vue.defineComponent({
    emits: ['close'],
    props: {
        dark: {
            type: Boolean,
            required: false,
            default: false,
        },
        modalOpen: {
            type: Boolean,
            required: true,
        },
    },
    setup(props, { emit }) {
        const modalInnerClass = vue.ref(props.dark ? 'modal-inner--dark' : 'modal-inner');
        const closeModal = () => {
            emit('close');
        };
        // prevent page scrolling when the modal is open
        vue.watch(() => props.modalOpen, (value) => {
            if (value) {
                document.body.style.overflow = 'hidden';
            }
            else {
                document.body.style.overflow = '';
            }
        });
        return {
            modalInnerClass,
            closeModal,
        };
    },
});

const _hoisted_1$5 = {
  key: 0,
  class: "modal"
};
const _hoisted_2$5 = { class: "modal-content" };

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock(vue.Teleport, { to: "body" }, [
    vue.createVNode(vue.Transition, { name: "modal-animation" }, {
      default: vue.withCtx(() => [
        (_ctx.modalOpen)
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$5, [
              vue.createElementVNode("div", {
                class: vue.normalizeClass(_ctx.modalInnerClass)
              }, [
                vue.createElementVNode("div", _hoisted_2$5, [
                  vue.createCommentVNode(" Modal Content "),
                  vue.renderSlot(_ctx.$slots, "default")
                ])
              ], 2 /* CLASS */)
            ]))
          : vue.createCommentVNode("v-if", true)
      ]),
      _: 3 /* FORWARDED */
    })
  ]))
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$2 = "\n.modal[data-v-701ac82d] {\n  position: fixed;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  min-width: 100%;\n  height: 100%;\n  background-color: rgba(107, 114, 128, 0.7);\n  left: 0px;\n  top: 0px;\n  z-index: 50;\n}\n.modal-inner[data-v-701ac82d] {\n  display: flex;\n  background: #ffffff;\n  border-radius: 1rem;\n  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,\n    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,\n    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;\n}\n.modal-inner--dark[data-v-701ac82d] {\n  display: flex;\n  color: rgb(199, 199, 199);\n  background: #273138;\n  border-radius: 1rem;\n  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,\n    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,\n    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;\n}\n.modal-animation-enter-active[data-v-701ac82d],\n.modal-animation-leave-active[data-v-701ac82d] {\n  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);\n}\n.modal-animation-enter-from[data-v-701ac82d],\n.modal-animation-leave-to[data-v-701ac82d] {\n  opacity: 0;\n}\n";
styleInject(css_248z$2);

script$5.render = render$5;
script$5.__scopeId = "data-v-701ac82d";
script$5.__file = "src/components/Modal.vue";

const _withScopeId$1 = n => (vue.pushScopeId("data-v-04a0d67a"),n=n(),vue.popScopeId(),n);
const _hoisted_1$4 = { class: "modal" };
const _hoisted_2$4 = /*#__PURE__*/ _withScopeId$1(() => /*#__PURE__*/vue.createElementVNode("div", { class: "lds-ripple" }, [
  /*#__PURE__*/vue.createElementVNode("div"),
  /*#__PURE__*/vue.createElementVNode("div")
], -1 /* HOISTED */));
const _hoisted_3$4 = [
  _hoisted_2$4
];

function render$4(_ctx, _cache) {
  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$4, _hoisted_3$4))
}

var css_248z$1 = "\n.modal[data-v-04a0d67a] {\n  position: fixed;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  min-width: 100%;\n  height: 100%;\n  background-color: rgba(107, 114, 128, 0.7);\n  left: 0px;\n  top: 0px;\n  z-index: 50;\n}\n.lds-ripple[data-v-04a0d67a] {\n  display: inline-block;\n  position: relative;\n  width: 80px;\n  height: 80px;\n}\n.lds-ripple div[data-v-04a0d67a] {\n  position: absolute;\n  border: 4px solid #fff;\n  opacity: 1;\n  border-radius: 50%;\n  animation: lds-ripple-04a0d67a 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;\n}\n.lds-ripple div[data-v-04a0d67a]:nth-child(2) {\n  animation-delay: -0.5s;\n}\n@keyframes lds-ripple-04a0d67a {\n0% {\n    top: 36px;\n    left: 36px;\n    width: 0;\n    height: 0;\n    opacity: 0;\n}\n4.9% {\n    top: 36px;\n    left: 36px;\n    width: 0;\n    height: 0;\n    opacity: 0;\n}\n5% {\n    top: 36px;\n    left: 36px;\n    width: 0;\n    height: 0;\n    opacity: 1;\n}\n100% {\n    top: 0px;\n    left: 0px;\n    width: 72px;\n    height: 72px;\n    opacity: 0;\n}\n}\n";
styleInject(css_248z$1);

const script$4 = {};

script$4.render = render$4;
script$4.__scopeId = "data-v-04a0d67a";
script$4.__file = "src/components/Loader.vue";

const _hoisted_1$3 = {
  height: "246",
  viewBox: "0 0 400 246",
  width: "400",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$3 = /*#__PURE__*/vue.createElementVNode("path", {
  d: "m81.9180572 48.3416816c65.2149658-63.8508884 170.9493158-63.8508884 236.1642788 0l7.848727 7.6845565c3.260748 3.1925442 3.260748 8.3686816 0 11.5612272l-26.848927 26.2873374c-1.630375 1.5962734-4.273733 1.5962734-5.904108 0l-10.800779-10.5748639c-45.495589-44.5439756-119.258514-44.5439756-164.754105 0l-11.566741 11.3248068c-1.630376 1.5962721-4.273735 1.5962721-5.904108 0l-26.8489263-26.2873375c-3.2607483-3.1925456-3.2607483-8.3686829 0-11.5612272zm291.6903948 54.3649934 23.895596 23.395862c3.260732 3.19253 3.260751 8.368636.000041 11.561187l-107.746894 105.494845c-3.260726 3.192568-8.547443 3.192604-11.808214.000083-.000013-.000013-.000029-.000029-.000042-.000043l-76.472191-74.872762c-.815187-.798136-2.136867-.798136-2.952053 0-.000006.000005-.00001.00001-.000015.000014l-76.470562 74.872708c-3.260715 3.192576-8.547434 3.19263-11.808215.000116-.000019-.000018-.000039-.000037-.000059-.000058l-107.74989297-105.496247c-3.26074695-3.192544-3.26074695-8.368682 0-11.561226l23.89563947-23.395823c3.260747-3.1925446 8.5474652-3.1925446 11.8082136 0l76.4733029 74.873809c.815188.798136 2.136866.798136 2.952054 0 .000012-.000012.000023-.000023.000035-.000032l76.469471-74.873777c3.260673-3.1926181 8.547392-3.1927378 11.808214-.000267.000046.000045.000091.00009.000135.000135l76.473203 74.873909c.815186.798135 2.136866.798135 2.952053 0l76.471967-74.872433c3.260748-3.1925458 8.547465-3.1925458 11.808213 0z",
  fill: "#3b99fc"
}, null, -1 /* HOISTED */);
const _hoisted_3$3 = [
  _hoisted_2$3
];

function render$3(_ctx, _cache) {
  return (vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$3, _hoisted_3$3))
}

const script$3 = {};


script$3.render = render$3;
script$3.__file = "src/components/logos/WalletConnect.vue";

const _hoisted_1$2 = {
  height: "355",
  viewBox: "0 0 397 355",
  width: "397",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$2 = /*#__PURE__*/vue.createStaticVNode("<g fill=\"none\" fill-rule=\"evenodd\" transform=\"translate(-1 -1)\"><path d=\"m114.622644 327.195472 52.004717 13.810198v-18.05949l4.245283-4.249292h29.716982v21.246459 14.872523h-31.839624l-39.268868-16.997169z\" fill=\"#cdbdb2\"></path><path d=\"m199.528305 327.195472 50.943397 13.810198v-18.05949l4.245283-4.249292h29.716981v21.246459 14.872523h-31.839623l-39.268868-16.997169z\" fill=\"#cdbdb2\" transform=\"matrix(-1 0 0 1 483.96227 0)\"></path><path d=\"m170.872644 287.889523-4.245283 35.056657 5.306604-4.249292h55.18868l6.367925 4.249292-4.245284-35.056657-8.490565-5.311615-42.452832 1.062323z\" fill=\"#393939\"></path><path d=\"m142.216984 50.9915022 25.471698 59.4900858 11.674528 173.158643h41.391511l12.735849-173.158643 23.349056-59.4900858z\" fill=\"#f89c35\"></path><path d=\"m30.7783023 181.657226-29.71698153 86.048161 74.29245393-4.249293h47.7594343v-37.181303l-2.122641-76.487253-10.613208 8.498583z\" fill=\"#f89d35\"></path><path d=\"m87.0283032 191.218134 87.0283028 2.124646-9.551886 44.617563-41.391511-10.623229z\" fill=\"#d87c30\"></path><path d=\"m87.0283032 192.280457 36.0849058 33.994334v33.994334z\" fill=\"#ea8d3a\"></path><path d=\"m123.113209 227.337114 42.452831 10.623229 13.79717 45.679888-9.551886 5.311615-46.698115-27.620398z\" fill=\"#f89d35\"></path><path d=\"m123.113209 261.331448-8.490565 65.864024 56.25-39.305949z\" fill=\"#eb8f35\"></path><path d=\"m174.056606 193.34278 5.306604 90.297451-15.919812-46.211049z\" fill=\"#ea8e3a\"></path><path d=\"m74.2924539 262.393771 48.8207551-1.062323-8.490565 65.864024z\" fill=\"#d87c30\"></path><path d=\"m24.4103777 355.878193 90.2122663-28.682721-40.3301901-64.801701-73.23113313 5.311616z\" fill=\"#eb8f35\"></path><path d=\"m167.688682 110.481588-45.636793 38.243627-35.0235858 42.492919 87.0283028 3.186969z\" fill=\"#e8821e\"></path><path d=\"m114.622644 327.195472 56.25-39.305949-4.245283 33.994334v19.121813l-38.207548-7.43626z\" fill=\"#dfcec3\"></path><path d=\"m229.245286 327.195472 55.18868-39.305949-4.245283 33.994334v19.121813l-38.207548-7.43626z\" fill=\"#dfcec3\" transform=\"matrix(-1 0 0 1 513.679252 0)\"></path><path d=\"m132.665096 212.464593-11.674528 24.433427 41.39151-10.623229z\" fill=\"#393939\" transform=\"matrix(-1 0 0 1 283.372646 0)\"></path><path d=\"m23.349057 1.06232296 144.339625 109.41926504-24.410378-59.4900858z\" fill=\"#e88f35\"></path><path d=\"m23.349057 1.06232296-19.10377392 58.42776294 10.61320772 63.7393781-7.42924541 4.249292 10.61320771 9.560906-8.49056617 7.436261 11.67452847 10.623229-7.4292454 6.373938 16.9811323 21.246459 79.5990577-24.433428c38.915096-31.161473 58.018869-47.096318 57.311322-47.804533-.707548-.708215-48.820756-37.1813036-144.339625-109.41926504z\" fill=\"#8e5a30\"></path><g transform=\"matrix(-1 0 0 1 399.056611 0)\"><path d=\"m30.7783023 181.657226-29.71698153 86.048161 74.29245393-4.249293h47.7594343v-37.181303l-2.122641-76.487253-10.613208 8.498583z\" fill=\"#f89d35\"></path><path d=\"m87.0283032 191.218134 87.0283028 2.124646-9.551886 44.617563-41.391511-10.623229z\" fill=\"#d87c30\"></path><path d=\"m87.0283032 192.280457 36.0849058 33.994334v33.994334z\" fill=\"#ea8d3a\"></path><path d=\"m123.113209 227.337114 42.452831 10.623229 13.79717 45.679888-9.551886 5.311615-46.698115-27.620398z\" fill=\"#f89d35\"></path><path d=\"m123.113209 261.331448-8.490565 65.864024 55.18868-38.243626z\" fill=\"#eb8f35\"></path><path d=\"m174.056606 193.34278 5.306604 90.297451-15.919812-46.211049z\" fill=\"#ea8e3a\"></path><path d=\"m74.2924539 262.393771 48.8207551-1.062323-8.490565 65.864024z\" fill=\"#d87c30\"></path><path d=\"m24.4103777 355.878193 90.2122663-28.682721-40.3301901-64.801701-73.23113313 5.311616z\" fill=\"#eb8f35\"></path><path d=\"m167.688682 110.481588-45.636793 38.243627-35.0235858 42.492919 87.0283028 3.186969z\" fill=\"#e8821e\"></path><path d=\"m132.665096 212.464593-11.674528 24.433427 41.39151-10.623229z\" fill=\"#393939\" transform=\"matrix(-1 0 0 1 283.372646 0)\"></path><path d=\"m23.349057 1.06232296 144.339625 109.41926504-24.410378-59.4900858z\" fill=\"#e88f35\"></path><path d=\"m23.349057 1.06232296-19.10377392 58.42776294 10.61320772 63.7393781-7.42924541 4.249292 10.61320771 9.560906-8.49056617 7.436261 11.67452847 10.623229-7.4292454 6.373938 16.9811323 21.246459 79.5990577-24.433428c38.915096-31.161473 58.018869-47.096318 57.311322-47.804533-.707548-.708215-48.820756-37.1813036-144.339625-109.41926504z\" fill=\"#8e5a30\"></path></g></g>", 1);
const _hoisted_3$2 = [
  _hoisted_2$2
];

function render$2(_ctx, _cache) {
  return (vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$2, _hoisted_3$2))
}

const script$2 = {};


script$2.render = render$2;
script$2.__file = "src/components/logos/MetaMask.vue";

const _hoisted_1$1 = {
  width: "1024",
  height: "1024",
  viewBox: "0 0 1024 1024",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$1 = /*#__PURE__*/vue.createElementVNode("rect", {
  width: "1024",
  height: "1024",
  fill: "#0052FF"
}, null, -1 /* HOISTED */);
const _hoisted_3$1 = /*#__PURE__*/vue.createElementVNode("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M152 512C152 710.823 313.177 872 512 872C710.823 872 872 710.823 872 512C872 313.177 710.823 152 512 152C313.177 152 152 313.177 152 512ZM420 396C406.745 396 396 406.745 396 420V604C396 617.255 406.745 628 420 628H604C617.255 628 628 617.255 628 604V420C628 406.745 617.255 396 604 396H420Z",
  fill: "white"
}, null, -1 /* HOISTED */);
const _hoisted_4$1 = [
  _hoisted_2$1,
  _hoisted_3$1
];

function render$1(_ctx, _cache) {
  return (vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$1, _hoisted_4$1))
}

const script$1 = {};


script$1.render = render$1;
script$1.__file = "src/components/logos/CoinbaseWallet.vue";

var script = vue.defineComponent({
    components: {
        Modal: script$5,
        Loader: script$4,
        MetaMaskIcon: script$2,
        WalletConnectIcon: script$3,
        CoinbaseWallet: script$1,
    },
    props: {
        connectors: {
            type: Array,
            required: true,
            default: [],
        },
        dark: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    setup(props) {
        const { boardOpen, close } = useBoard();
        const { connectWith, wallet } = useWallet();
        const walletItemClass = vue.computed(() => props.dark ? 'wallet-item--dark' : 'wallet-item');
        const connectors = props.connectors;
        return {
            boardOpen,
            wallet,
            connectors,
            walletItemClass,
            connectWith,
            close,
        };
    },
});

const _withScopeId = n => (vue.pushScopeId("data-v-e1ee1034"),n=n(),vue.popScopeId(),n);
const _hoisted_1 = ["onClick"];
const _hoisted_2 = { class: "item" };
const _hoisted_3 = { key: 3 };
const _hoisted_4 = { key: 4 };
const _hoisted_5 = { key: 5 };
const _hoisted_6 = {
  key: 0,
  class: "loading-modal"
};
const _hoisted_7 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/vue.createElementVNode("p", null, "Connecting...", -1 /* HOISTED */));
const _hoisted_8 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/vue.createElementVNode("p", { class: "mt-4" }, "Approve or reject request using your wallet", -1 /* HOISTED */));
const _hoisted_9 = [
  _hoisted_7,
  _hoisted_8
];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_MetaMaskIcon = vue.resolveComponent("MetaMaskIcon");
  const _component_WalletConnectIcon = vue.resolveComponent("WalletConnectIcon");
  const _component_CoinbaseWallet = vue.resolveComponent("CoinbaseWallet");
  const _component_Modal = vue.resolveComponent("Modal");
  const _directive_click_outside = vue.resolveDirective("click-outside");

  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
    vue.createVNode(_component_Modal, {
      modalOpen: _ctx.boardOpen,
      onClose: _ctx.close,
      dark: _ctx.dark
    }, {
      default: vue.withCtx(() => [
        vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", null, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.connectors, (connector, i) => {
            return (vue.openBlock(), vue.createElementBlock("div", {
              key: connector.name
            }, [
              vue.createElementVNode("div", {
                class: vue.normalizeClass(_ctx.walletItemClass),
                onClick: $event => (_ctx.connectWith(connector) && _ctx.close())
              }, [
                vue.createElementVNode("div", _hoisted_2, [
                  (connector.name === 'metaMask')
                    ? (vue.openBlock(), vue.createBlock(_component_MetaMaskIcon, {
                        key: 0,
                        class: "logo"
                      }))
                    : vue.createCommentVNode("v-if", true),
                  (connector.name === 'walletConnect')
                    ? (vue.openBlock(), vue.createBlock(_component_WalletConnectIcon, {
                        key: 1,
                        class: "logo"
                      }))
                    : vue.createCommentVNode("v-if", true),
                  (connector.name === 'coinbaseWallet')
                    ? (vue.openBlock(), vue.createBlock(_component_CoinbaseWallet, {
                        key: 2,
                        class: "logo"
                      }))
                    : vue.createCommentVNode("v-if", true),
                  (connector.name === 'metaMask')
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3, "MeteMask"))
                    : vue.createCommentVNode("v-if", true),
                  (connector.name === 'walletConnect')
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4, "WalletConnect"))
                    : vue.createCommentVNode("v-if", true),
                  (connector.name === 'coinbaseWallet')
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5, " Coinbase Wallet "))
                    : vue.createCommentVNode("v-if", true)
                ])
              ], 10 /* CLASS, PROPS */, _hoisted_1),
              (i !== _ctx.connectors.length - 1)
                ? (vue.openBlock(), vue.createElementBlock("div", {
                    key: 0,
                    class: vue.normalizeClass(_ctx.dark ? 'line--dark' : 'line')
                  }, null, 2 /* CLASS */))
                : vue.createCommentVNode("v-if", true)
            ]))
          }), 128 /* KEYED_FRAGMENT */))
        ])), [
          [_directive_click_outside, _ctx.close]
        ])
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["modalOpen", "onClose", "dark"]),
    vue.renderSlot(_ctx.$slots, "connecting", {}, () => [
      vue.createVNode(_component_Modal, {
        modalOpen: _ctx.wallet.status === 'connecting',
        dark: _ctx.dark
      }, {
        default: vue.withCtx(() => [
          (_ctx.wallet.status === 'connecting')
            ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6, _hoisted_9))
            : vue.createCommentVNode("v-if", true)
        ]),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["modalOpen", "dark"])
    ]),
    vue.renderSlot(_ctx.$slots, "loading", {}, () => [
      vue.createVNode(_component_Modal, {
        modalOpen: _ctx.wallet.status === 'loading',
        dark: _ctx.dark
      }, null, 8 /* PROPS */, ["modalOpen", "dark"])
    ])
  ], 64 /* STABLE_FRAGMENT */))
}

var css_248z = "\n.wallet-item[data-v-e1ee1034] {\n  display: flex;\n  justify-content: center;\n  padding-top: 1rem;\n  padding-bottom: 0.6rem;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  margin: 0.5rem;\n  border-radius: 0.75rem;\n  cursor: pointer;\n}\n.wallet-item[data-v-e1ee1034]:hover {\n  background-color: rgba(236, 237, 239, 0.737);\n}\n\n/* dark mode */\n.wallet-item--dark[data-v-e1ee1034] {\n  display: flex;\n  justify-content: center;\n  padding-top: 1rem;\n  padding-bottom: 0.6rem;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  margin: 0.5rem;\n  border-radius: 0.75rem;\n  cursor: pointer;\n  color: rgb(199, 199, 199);\n}\n.wallet-item--dark[data-v-e1ee1034]:hover {\n  background-color: #101a20;\n}\n@media (min-width: 640px) {\n.wallet-item[data-v-e1ee1034] {\n    width: 24rem;\n}\n.wallet-item--dark[data-v-e1ee1034] {\n    width: 24rem;\n}\n}\n.item[data-v-e1ee1034] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.5rem;\n  line-height: 2rem;\n}\n.item[data-v-e1ee1034] > :not([hidden]) ~ :not([hidden]) {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n}\n.line[data-v-e1ee1034] {\n  border-color: #e5e7eb;\n  border-width: 0px;\n  border-bottom-width: 1px;\n  border-style: solid;\n}\n.line--dark[data-v-e1ee1034] {\n  border-color: rgba(195, 195, 195, 0.14);\n  border-width: 0px;\n  border-bottom-width: 1px;\n  border-style: solid;\n}\n.logo[data-v-e1ee1034] {\n  width: 50px;\n  height: 50px;\n}\n.wallet-disabled[data-v-e1ee1034] {\n  opacity: 0.5;\n}\n.wallet-disabled[data-v-e1ee1034]:hover {\n  background-color: rgba(255, 255, 255, 0);\n  cursor: default;\n}\n.loading-modal[data-v-e1ee1034] {\n  width: 20rem;\n  padding: 2.5rem;\n  text-align: center;\n}\n.loading-modal > p[data-v-e1ee1034]:first-child {\n  font-size: 1.25rem;\n  line-height: 1.75rem;\n}\n@media (min-width: 640px) {\n.loading-modal[data-v-e1ee1034] {\n    width: auto;\n}\n}\n";
styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-e1ee1034";
script.__file = "src/components/Board.vue";

const VueDapp = {
    install(app) {
        app.directive('click-outside', clickOutside);
        app.component('vd-board', script);
        app.component('vd-modal', script$5);
    },
};

exports.AddChainError = AddChainError;
exports.CHAIN_NAMES = CHAIN_NAMES;
exports.CoinbaseWalletConnector = CoinbaseWalletConnector;
exports.Connector = Connector;
exports.ConnectorNotFoundError = ConnectorNotFoundError;
exports.ERC20 = ERC20;
exports.ERC20Interface = ERC20Interface;
exports.MULTICALL2_ABI = MULTICALL2_ABI;
exports.MULTICALL2_ADDRESS = MULTICALL2_ADDRESS;
exports.MetaMaskConnector = MetaMaskConnector;
exports.NETWORK_DETAILS = NETWORK_DETAILS;
exports.ProviderNotFoundError = ProviderNotFoundError;
exports.ProviderRpcError = ProviderRpcError;
exports.RpcError = RpcError;
exports.SwitchChainError = SwitchChainError;
exports.SwitchChainNotSupportedError = SwitchChainNotSupportedError;
exports.UserRejectedRequestError = UserRejectedRequestError;
exports.VueDapp = VueDapp;
exports.WalletConnectConnector = WalletConnectConnector;
exports.checkChainId = checkChainId;
exports.checkInfuraId = checkInfuraId;
exports.displayChainName = displayChainName;
exports.displayEther = displayEther;
exports.shortenAddress = shortenAddress;
exports.useBoard = useBoard;
exports.useEthers = useEthers;
exports.useEthersHooks = useEthersHooks;
exports.useMulticall = useMulticall;
exports.useWallet = useWallet;
