import { omit } from "lodash";
import { appTypes, appInitialState } from "./constants";

// Reducers
export default function reducer(state = appInitialState, action) {
  switch (action.type) {
    case appTypes.NETWORK_RESET:
      return { ...appInitialState };
    case appTypes.UPDATE_NETWORK_ID:
      return {
        ...state,
        networkId: null,
        networkIdVerbose: "",
        networkUpdatePending: true,
        currentBlockNumber: 0,
        currentBlockContents: undefined
      };
    case appTypes.UPDATE_NETWORK_ID_SUCCESS:
      return {
        ...state,
        network: action.payload.network,
        networkId: action.payload.networkId,
        networkIdVerbose: action.payload.networkIdVerbose,
        networkUpdatePending: false
      };
    case appTypes.UPDATE_NETWORK_ID_FAILURE:
      return {
        ...state,
        networkId: null,
        networkIdVerbose: "",
        networkUpdatePending: false
      };
    case appTypes.TX_POLLING_ADD:
      return {
        ...state,
        txPollingList: { ...state.txPollingList, [action.payload.txHash]: true }
      };
    case appTypes.TX_POLLING_REMOVE:
      return {
        ...state,
        txPollingList: omit(state.txPollingList, action.payload.txHash)
      };

    case appTypes.TRANSACTION_MINED:
      return {
        ...state,
        minedTransactions: {
          ...state.minedTransactions,
          [action.payload.txHash]: action.payload.txReceipt
        }
      };
    case appTypes.NEW_BLOCK:
      return {
        ...state,
        currentBlockNumber: action.payload.blockNumber,
        currentBlockContents: action.payload.blockContents
      };
    default:
      return state;
  }
}
