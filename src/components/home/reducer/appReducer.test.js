import { appTypes, appInitialState } from "./constants";
import reducer from "./appReducer";

describe("reducers", () => {
  describe("NETWORK_RESET", () => {
    it("should reset the app state", () => {
      const action = {
        type: appTypes.NETWORK_RESET
      };
      const prevState = { foo: "bar" };

      expect(reducer(prevState, action)).toEqual(appInitialState);
    });
  });
  describe("UPDATE_NETWORK_ID", () => {
    it("should reset the network state", () => {
      const action = {
        type: appTypes.UPDATE_NETWORK_ID
      };
      const prevState = {
        networkId: 3,
        networkIdVerbose: "Ropsten",
        networkUpdatePending: false
      };

      const expectedState = {
        networkId: null,
        networkIdVerbose: "",
        networkUpdatePending: true,
        currentBlockNumber: 0,
        currentBlockContents: undefined
      };

      expect(reducer(prevState, action)).toEqual(expectedState);
    });

    it("should update the network state", () => {
      const action = {
        type: appTypes.UPDATE_NETWORK_ID_SUCCESS,
        payload: {
          network: { foo: "bar" },
          networkId: 3,
          networkIdVerbose: "Ropsten",
          networkUpdatePending: false
        }
      };
      const prevState = {
        networkId: null,
        networkIdVerbose: "",
        networkUpdatePending: true
      };

      const expectedState = {
        network: { foo: "bar" },
        networkId: 3,
        networkIdVerbose: "Ropsten",
        networkUpdatePending: false
      };

      expect(reducer(prevState, action)).toEqual(expectedState);
    });
  });
});
