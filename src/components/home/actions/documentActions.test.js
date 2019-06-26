import { resetDocumentState, getHashStatus } from "./documentActions";

describe("actions", () => {
  it("resetDocumentState should generate correct action", () => {
    const expectedAction = {
      type: "RESET_DOCUMENT"
    };
    expect(resetDocumentState()).toEqual(expectedAction);
  });
});

describe("selectors", () => {
  it("getHashStatus should return verified hash status", () => {
    const store = {
      document: {
        documentHash: "document hash is verified",
        documentHashError: false,
        documentHashVerifying: false
      }
    };
    expect(getHashStatus(store)).toEqual({
      verified: "document hash is verified",
      verifying: false,
      error: false
    });
  });
});
