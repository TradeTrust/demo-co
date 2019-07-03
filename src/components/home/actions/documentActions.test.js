import {
  resetDocumentState,
  updateDocument,
  verifyDocument,
  verifyingDocumentRevocationSuccess,
  getHashStatus
} from "./documentActions";

describe("actions", () => {
  it("resetDocumentState should generate correct action", () => {
    const expectedAction = {
      type: "RESET_DOCUMENT"
    };
    expect(resetDocumentState()).toEqual(expectedAction);
  });

  it("updateDocument should generate correct action", () => {
    const payload = {
      schema: "tradetrust/v1.0",
      data: {
        id: "71f10d54-d483-489b-b06f-fa2bed75ce16:string:certificate-id",
        $template: { demo: "test" },
        issuers: []
      },
      signature: {
        targetHash: "12dsd3232"
      }
    };
    const expectedAction = {
      type: "UPDATE_DOCUMENT",
      payload: payload
    };
    expect(updateDocument(payload)).toEqual(expectedAction);
  });

  it("verifyDocument should generate correct action", () => {
    const expectedAction = {
      type: "VERIFYING_DOCUMENT"
    };
    expect(verifyDocument()).toEqual(expectedAction);
  });

  it("verifyingDocumentRevocationSuccess should generate correct action", () => {
    const expectedAction = {
      type: "VERIFYING_DOCUMENT_REVOCATION_SUCCESS"
    };
    expect(verifyingDocumentRevocationSuccess()).toEqual(expectedAction);
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
