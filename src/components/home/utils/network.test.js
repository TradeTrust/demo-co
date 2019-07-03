import { updateNetworkId, getSelectedProvider } from "./network";
import { appInitialState, appTypes } from "../reducer/constants";
import { getWeb3 } from "services/web3";

describe("network", () => {
  it("should update the network successfully", async () => {
    const dispatch = jest.fn();
    const action = {
      type: appTypes.UPDATE_NETWORK_ID
    };
    const result = await updateNetworkId({ application: appInitialState })(
      dispatch
    )(action);
    expect(result).toEqual(true);
  });

  it("should set the new provder", async () => {
    const dispatch = jest.fn();
    const result = await getSelectedProvider(dispatch, false, {
      application: appInitialState
    });
    const expected = await getWeb3();
    expect(result).toEqual(expected);
  });
});
