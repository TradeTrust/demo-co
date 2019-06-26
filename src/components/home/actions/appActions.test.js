import { updateNetwork, getNetwork, getNetworkPending, getNetworkId } from "./appActions";

describe("actions", () => {
  it("updateNetwork should generate correct action", () => {
    const fn = updateNetwork;

    const expectedAction = {
      type: "UPDATE_NETWORK_ID"
    };
    expect(fn()).toEqual(expectedAction);
  });
});

describe("selectors", () => {
  it("getNetwork should return network object", () => {
      application: {
        network: {chainId: 3, ens: "0x21nkjn3n2kn32kn"}
      }
    };
    expect(getNetwork(store)).toEqual({chainId: 3, ens: "0x21nkjn3n2kn32kn"});
  });

  it("getNetworkPending should return network pending state", () => {
    const store = {
      application: {
        networkUpdatePending: false
      }
    };
    expect(getNetworkPending(store)).toEqual(false);
  });

  it("getNetworkId should return network id", () => {
    const store = {
      application: {
        networkId: 3
      }
    };
    expect(getNetworkId(store)).toEqual(3);
  });
});
