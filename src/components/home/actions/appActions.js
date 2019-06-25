import { appTypes } from "components/home/reducer/constants";

export function updateNetwork() {
  return {
    type: appTypes.UPDATE_NETWORK_ID
  };
}

export function foundNewBlock(payload) {
  return {
    type: appTypes.NEW_BLOCK,
    payload
  };
}

export function announceMinedTransaction(payload) {
  return {
    type: appTypes.TRANSACTION_MINED,
    payload
  };
}

export function removeTxFromPollingList(payload) {
  return {
    type: appTypes.TX_POLLING_REMOVE,
    payload
  };
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
