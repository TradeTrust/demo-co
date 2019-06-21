import { setNewWeb3, getWeb3, fetchNetwork } from "services/web3";
import { appTypes } from "components/home/reducer/constants";

export const updateNetworkId = async dispatch => {
  try {
    const provider = await getSelectedWeb3(true);
    const networkId = await fetchNetwork(provider);
    // const networkIdVerbose = matchNetwork(networkId);
    return dispatch({
      type: appTypes.UPDATE_NETWORK_ID_SUCCESS,
      payload: {network: networkId}
    });
  } catch (e) {
      console.error(e); // eslint-disable-line
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

export const getSelectedWeb3 = async (getNew = false) => {
  // const networkPending = yield select(getNetworkPending);
  // if (networkPending && !getNew) {
  //   // block if there's a network update pending
  //   yield take(types.UPDATE_NETWORK_ID_SUCCESS);
  // }
  // const network = yield select(getNetwork);
  const web3 = (await getNew) ? setNewWeb3({}) : getWeb3(); // update web3 only if requested specifically
  return web3;
};
