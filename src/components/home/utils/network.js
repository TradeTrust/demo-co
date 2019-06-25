import { setNewWeb3, getWeb3, fetchNetwork } from "services/web3";
import { appTypes } from "components/home/reducer/constants";
import {
  getNetworkPending,
  getNetwork
} from "components/home/actions/appActions";

export const updateNetworkId = state => next => async action => {
  try {
    next(action);
    const provider = await getSelectedProvider(next, true, state);
    const network = await fetchNetwork(provider);
    const networkIdVerbose = matchNetwork(network.chainId);
    return next({
      type: appTypes.UPDATE_NETWORK_ID_SUCCESS,
      payload: {
        network: network,
        networkId: network.chainId,
        networkIdVerbose
      }
    });
  } catch (e) {
    return next({
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

export const getSelectedProvider = async (dispatch, getNew = false, store) => {
  const networkPending = await getNetworkPending(store);
  if (networkPending && !getNew) {
    // block if there's a network update pending
    await dispatch({ type: appTypes.UPDATE_NETWORK_ID_SUCCESS });
  }
  const network = await getNetwork(store);
  const provider = (await getNew) ? setNewWeb3(network) : getWeb3(); // update web3 only if requested specifically
  return provider;
};
