import { appTypes, appInitialState } from "./constants";

export default function HomeReducer(state = appInitialState, action) {
  switch (action.type) {
    case appTypes.NETWORK_RESET:
      return { ...appInitialState };
    case appTypes.UPDATE_NETWORK:
      return { ...state, network: action.networkId };
    default:
      return state;
  }
}
