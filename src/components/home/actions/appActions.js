import { setNewWeb3, getWeb3, fetchNetwork } from "services/web3";
import { appTypes } from "components/home/reducer/constants";

export const updateNetworkId = async (dispatch, store) => {
  try {
    const provider = await getSelectedWeb3(dispatch, true, store);
    const network = await fetchNetwork(provider);
    const networkIdVerbose = matchNetwork(network.chainId);
    return dispatch({
      type: appTypes.UPDATE_NETWORK_ID_SUCCESS,
      payload: {
        network: network,
        networkId: network.chainId,
        networkIdVerbose
      }
    });
  } catch (e) {
    return dispatch({
      type: appTypes.UPDATE_NETWORK_ID_FAILURE,
      payload: e
    });
  }
};

export function matchNetwork(networkId) {
  const networkIdVerbose = {
    1: "Homestead",
    2: "Morden",
    3: "Ropsten",
    4: "Rinkeby",
    42: "Kovan"
  };
  return networkIdVerbose[networkId] || `Custom Network: ${networkId}`;
}

export const getSelectedWeb3 = async (dispatch, getNew = false, store) => {
  const networkPending = await getNetworkPending(store);
  if (networkPending && !getNew) {
    // block if there's a network update pending
    await dispatch({ type: appTypes.UPDATE_NETWORK_ID_SUCCESS });
  }
  const network = await getNetwork(store);
  const web3 = (await getNew) ? setNewWeb3(network) : getWeb3(); // update web3 only if requested specifically
  return web3;
};

export function foundNewBlock(dispatch, payload) {
  return dispatch({
    type: appTypes.NEW_BLOCK,
    payload
  });
}

export function announceMinedTransaction(dispatch, payload) {
  return dispatch({
    type: appTypes.TRANSACTION_MINED,
    payload
  });
}

export function removeTxFromPollingList(dispatch, payload) {
  return dispatch({
    type: appTypes.TX_POLLING_REMOVE,
    payload
  });
}

// Selectors
export function getNetwork(store) {
  return store.application.network;
}

export function getNetworkPending(store) {
  return store.application.networkUpdatePending;
}

export function getCustomRpc(store) {
  return store.application.customRpc;
}

export function getNetworkId(store) {
  return store.application.networkId;
}

export function getTxPollingList(store) {
  return store.application.txPollingList;
}

export function getNetworkPollingTask(store) {
  return store.application.networkPollingTask;
}

export function getCurrentBlockNumber(store) {
  return store.application.currentBlockNumber;
}

export function getTransactionReceipt(store, txHash) {
  if (store.application.minedTransactions[txHash]) {
    return store.application.minedTransactions[txHash];
  }
  return undefined;
}
