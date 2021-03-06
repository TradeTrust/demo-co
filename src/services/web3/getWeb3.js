import { ethers } from "ethers";
import { NETWORK_TYPES, INFURA_PROJECT_ID } from "config";

import { getLogger } from "utils/logger";
const { error } = getLogger("services:getWeb3");

let web3Instance;

async function loadWeb3InfuraWebsocket(mainnet = true) {
  const net = mainnet ? "homestead" : "ropsten";

  return new ethers.providers.InfuraProvider(net, INFURA_PROJECT_ID);
}

async function loadWeb3Injected() {
  let { web3 } = window;
  const alreadyInjected = typeof web3 !== "undefined";

  if (!alreadyInjected) throw new Error("Metamask cannot be found");

  web3 = new ethers.providers.Web3Provider(web3.currentProvider);

  return web3;
}

async function loadWeb3CustomRpc(rpc = "http://localhost:8545") {
  return new ethers.providers.JsonRpcProvider(rpc);
}

async function loadWeb3Mock() {
  return {
    eth: {
      currentProvider: {},
      getAccounts: () => []
    }
  };
}

async function resolveWeb3(
  resolve,
  reject,
  t = NETWORK_TYPES.INJECTED,
  config
) {
  try {
    switch (t) {
      case NETWORK_TYPES.INFURA_ROPSTEN:
        web3Instance = await loadWeb3InfuraWebsocket(false);
        break;
      case NETWORK_TYPES.INFURA_MAINNET:
        web3Instance = await loadWeb3InfuraWebsocket();
        break;
      case NETWORK_TYPES.INJECTED:
        web3Instance = await loadWeb3Injected();
        break;
      case NETWORK_TYPES.CUSTOM:
        web3Instance = await loadWeb3CustomRpc(config);
        break;
      case NETWORK_TYPES.MOCK:
        web3Instance = await loadWeb3Mock();
        break;
      default:
        web3Instance = await ethers.getDefaultProvider("ropsten");
    }
    resolve(web3Instance);
  } catch (e) {
    reject(e);
  }
}

export const fetchNetwork = async provider => {
  try {
    return await provider.getNetwork();
  } catch (e) {
    error("fetch network error", e);
  }
};

export function setNewWeb3(t, config) {
  return new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    // Server-side rendering fails when trying to access window
    if (typeof window !== "undefined") {
      window.addEventListener(`load`, () => {
        resolveWeb3(resolve, reject, t, config);
      });
      // If document has loaded already, try to get Web3 immediately.
      if (document.readyState === `complete`) {
        resolveWeb3(resolve, reject, t, config);
      }
    }
  });
}

export function getWeb3(t, config) {
  if (web3Instance) {
    return new Promise(resolve => {
      resolve(web3Instance);
    });
  }
  return setNewWeb3(t, config);
}

export default getWeb3;
