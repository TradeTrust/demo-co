import { docTypes } from "components/home/reducer/constants";
// Action Creators
export function resetDocumentState() {
  return {
    type: docTypes.RESET_DOCUMENT
  };
}

export function updateDocument(payload) {
  return {
    type: docTypes.UPDATE_DOCUMENT,
    payload
  };
}

export function verifyDocument() {
  return {
    type: docTypes.VERIFYING_DOCUMENT
  };
}

export function updateFilteredDocument(payload) {
  return {
    type: docTypes.UPDATE_FILTERED_DOCUMENT,
    payload
  };
}

export function verifyingDocumentIssuerSuccess(payload) {
  return {
    type: docTypes.VERIFYING_DOCUMENT_ISSUER_SUCCESS,
    payload
  };
}

export function verifyingDocumenteIssuerFailure({ error, document }) {
  return {
    type: docTypes.VERIFYING_DOCUMENT_ISSUER_FAILURE,
    error,
    document
  };
}

export function verifyingDocumentRevocationSuccess() {
  return {
    type: docTypes.VERIFYING_DOCUMENT_REVOCATION_SUCCESS
  };
}

export function verifyingDocumentRevocationFailure({ error, document }) {
  return {
    type: docTypes.VERIFYING_DOCUMENT_REVOCATION_FAILURE,
    error,
    document
  };
}

export function verifyingDocumentIssuedSuccess() {
  return {
    type: docTypes.VERIFYING_DOCUMENT_ISSUED_SUCCESS
  };
}

export function verifyingDocumentIssuedFailure({ error, document }) {
  return {
    type: docTypes.VERIFYING_DOCUMENT_ISSUED_FAILURE,
    error,
    document
  };
}

export function verifyingDocumentHashSuccess() {
  return {
    type: docTypes.VERIFYING_DOCUMENT_HASH_SUCCESS
  };
}

export function verifyingDocumentHashFailure({ error, document }) {
  return {
    type: docTypes.VERIFYING_DOCUMENT_HASH_FAILURE,
    error,
    document
  };
}

export function resetDocumentObfuscation() {
  return {
    type: docTypes.DOCUMENT_OBFUSCATE_RESET
  };
}

export function updateObfuscatedDocument(payload) {
  return {
    type: docTypes.DOCUMENT_OBFUSCATE_UPDATE,
    payload
  };
}

// Selectors
export function getIssuerIdentityStatus(store) {
  const {
    issuerIdentities,
    documentIssuerVerifying,
    documentIssuerError,
    documentIssuer
  } = store.document;
  return {
    identities: issuerIdentities,
    verified: documentIssuer,
    verifying: documentIssuerVerifying,
    error: documentIssuerError
  };
}

export function getHashStatus(store) {
  const {
    documentHash,
    documentHashError,
    documentHashVerifying
  } = store.document;
  return {
    verified: documentHash,
    verifying: documentHashVerifying,
    error: documentHashError
  };
}

export function getIssuedStatus(store) {
  const {
    documentIssued,
    documentIssuedError,
    documentIssuedVerifying
  } = store.document;
  return {
    verified: documentIssued,
    verifying: documentIssuedVerifying,
    error: documentIssuedError
  };
}

export function getNotRevokedStatus(store) {
  const {
    documentNotRevoked,
    documentNotRevokedError,
    documentNotRevokedVerifying
  } = store.document;
  return {
    verified: documentNotRevoked,
    verifying: documentNotRevokedVerifying,
    error: documentNotRevokedError
  };
}

export function getDocument(store) {
  return store.document.docModified;
}

export function getVerifying(store) {
  const {
    // documentIssuerVerifying,
    documentHashVerifying,
    documentIssuedVerifying,
    documentNotRevokedVerifying
  } = store.document;
  return (
    documentHashVerifying ||
    documentIssuedVerifying ||
    documentNotRevokedVerifying
  );
}

export function getVerified(store) {
  const hash = getHashStatus(store).verified;
  const issued = getIssuedStatus(store).verified;
  const notRevoked = getNotRevokedStatus(store).verified;
  // const identity = getIssuerIdentityStatus(store).verified;

  return hash && issued && notRevoked;
}

export function getVerificationStatus(store) {
  return store.document.verificationStatus;
}
