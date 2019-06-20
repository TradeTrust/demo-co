import {types, initialState} from "./constants";
const { UPDATE_NETWORK } = types;

export default function HomeReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NETWORK:
      return { ...state, network: action.networkId };
    default:
      return state;
  }
}
