import React, { useState, useEffect } from "react";
import { setNewWeb3, getWeb3 } from "services/web3";

import { Store } from "store";
import {
  getNetworkPending,
  getNetwork
} from "components/home/actions/appActions";

export const useWeb3Provider = (dispatch, getNew = false) => {
  const [provider, setProvider] = useState(null);
  const { state } = React.useContext(Store);

  useEffect(() => {
    (async () => {
      const networkPending = getNetworkPending(state);
      if (networkPending && !getNew) {
        // block if there's a network update pending
        // return await dispatch({type: appTypes.UPDATE_NETWORK_ID_SUCCESS});
      }
      const network = getNetwork(state);
      if (!provider) {
        await setNewWeb3(network);
        let web3 = await getWeb3();
        setProvider(web3);
      }
    })();
  }, [getNew]);

  return provider;
};
