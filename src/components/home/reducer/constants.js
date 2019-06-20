export const appTypes = {
  UPDATE_NETWORK: "UPDATE_NETWORK",
  NETWORK_RESET: "NETWORK_RESET" // For network change
};

export const appInitialState = {
  network: null,
  networkUpdatePending: false
};

export const docInitialState = {
  doc: null,
  docModified: null,
  renderType: null,
  store: null,
  storeError: null,
  storeLoading: false,

  issuerIdentities: null,

  documentHash: false,
  documentIssued: false,
  documentNotRevoked: false,
  documentIssuer: false,

  documentHashVerifying: false,
  documentIssuedVerifying: false,
  documentNotRevokedVerifying: false,
  documentIssuerVerifying: false,

  documentHashError: null,
  documentIssuedError: null,
  documentNotRevokedError: null,
  documentIssuerError: null,

  verificationStatus: []
};

  // Actions
  export const docTypes = {
    RESET_DOCUMENT: "RESET_DOCUMENT",
  
    UPDATE_DOCUMENT: "UPDATE_DOCUMENT",
  
    LOADING_STORE_SUCCESS: "LOADING_STORE_SUCCESS",
    LOADING_STORE_FAILURE: "LOADING_STORE_FAILURE",
  
    VERIFYING_DOCUMENT: "VERIFYING_DOCUMENT",
  
    VERIFYING_DOCUMENT_HASH_SUCCESS: "VERIFYING_DOCUMENT_HASH_SUCCESS",
    VERIFYING_DOCUMENT_HASH_FAILURE: "VERIFYING_DOCUMENT_HASH_FAILURE",
  
    VERIFYING_DOCUMENT_ISSUED_SUCCESS: "VERIFYING_DOCUMENT_ISSUED_SUCCESS",
    VERIFYING_DOCUMENT_ISSUED_FAILURE: "VERIFYING_DOCUMENT_ISSUED_FAILURE",
  
    VERIFYING_DOCUMENT_REVOCATION_SUCCESS:
      "VERIFYING_DOCUMENT_REVOCATION_SUCCESS",
    VERIFYING_DOCUMENT_REVOCATION_FAILURE:
      "VERIFYING_DOCUMENT_REVOCATION_FAILURE",
  
    VERIFYING_DOCUMENT_ISSUER_SUCCESS: "VERIFYING_DOCUMENT_ISSUER_SUCCESS",
    VERIFYING_DOCUMENT_ISSUER_FAILURE: "VERIFYING_DOCUMENT_ISSUER_FAILURE",
  
    SENDING_DOCUMENT: "SENDING_DOCUMENT",
    SENDING_DOCUMENT_SUCCESS: "SENDING_DOCUMENT_SUCCESS",
    SENDING_DOCUMENT_FAILURE: "SENDING_DOCUMENT_FAILURE",
    SENDING_DOCUMENT_RESET: "SENDING_DOCUMENT_RESET",
  
    DOCUMENT_OBFUSCATE_RESET: "DOCUMENT_OBFUSCATE_RESET",
    DOCUMENT_OBFUSCATE_UPDATE: "DOCUMENT_OBFUSCATE_UPDATE",
  
    DOCUMENT_TEMPLATE_REGISTER: "DOCUMENT_TEMPLATE_REGISTER",
    DOCUMENT_TEMPLATE_SELECT_TAB: "DOCUMENT_TEMPLATE_SELECT_TAB"
  };

export default appTypes;
