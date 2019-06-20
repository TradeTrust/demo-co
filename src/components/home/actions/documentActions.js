import { docTypes } from "components/home/reducer/constants";
 // Action Creators
 export function resetDocumentState(dispatch) {
    return dispatch({
      type: docTypes.RESET_DOCUMENT
    });
  }
  
export function updateDocument(dispatch, payload) {
    return dispatch({
      type: docTypes.UPDATE_DOCUMENT,
      payload
    });
  }
  
  export function verifyDocument(dispatch, payload) {
    return dispatch({
      type: docTypes.VERIFYING_DOCUMENT,
      payload
    });
  }
  
  export function updateFilteredDocument(dispatch, payload) {
    return dispatch({
      type: docTypes.UPDATE_FILTERED_DOCUMENT,
      payload
    });
  }
  
  export function verifyingDocumentIssuerSuccess(dispatch, payload) {
    return dispatch({
      type: docTypes.VERIFYING_DOCUMENT_ISSUER_SUCCESS,
      payload
    });
  }
  
  export function verifyingDocumenteIssuerFailure(dispatch, { error, document }) {
    return dispatch({
      type: docTypes.VERIFYING_DOCUMENT_ISSUER_FAILURE,
      error,
      document
    });
  }
  
  export function verifyingDocumentRevocationSuccess(dispatch) {
    return dispatch({
      type: docTypes.VERIFYING_DOCUMENT_REVOCATION_SUCCESS
    });
  }
  
  export function verifyingDocumentRevocationFailure(dispatch, { error, document }) {
    return dispatch({
      type: docTypes.VERIFYING_DOCUMENT_REVOCATION_FAILURE,
      error,
      document
    });
  }
  
  export function verifyingDocumentIssuedSuccess(dispatch) {
    return dispatch({
      type: docTypes.VERIFYING_DOCUMENT_ISSUED_SUCCESS
    });
  }
  
  export function verifyingDocumentIssuedFailure(dispatch, { error, document }) {
    return dispatch({
      type: docTypes.VERIFYING_DOCUMENT_ISSUED_FAILURE,
      error,
      document
    });
  }
  
  export function verifyingDocumentHashSuccess(dispatch) {
    return dispatch({
      type: docTypes.VERIFYING_DOCUMENT_HASH_SUCCESS
    });
  }
  
  export function verifyingDocumentHashFailure(dispatch, { error, document }) {
    return dispatch({
      type: docTypes.VERIFYING_DOCUMENT_HASH_FAILURE,
      error,
      document
    });
  }

  
  export function resetDocumentObfuscation(dispatch) {
    return dispatch({
      type: docTypes.DOCUMENT_OBFUSCATE_RESET
    });
  }
  
  export function updateObfuscatedDocument(dispatch, payload) {
    return dispatch({
      type: docTypes.DOCUMENT_OBFUSCATE_UPDATE,
      payload
    });
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
      documentIssuerVerifying,
      documentHashVerifying,
      documentIssuedVerifying,
      documentNotRevokedVerifying
    } = store.document;
    return (
      documentIssuerVerifying ||
      documentHashVerifying ||
      documentIssuedVerifying ||
      documentNotRevokedVerifying
    );
  }
  
  export function getVerified(store) {
    const hash = getHashStatus(store).verified;
    const issued = getIssuedStatus(store).verified;
    const notRevoked = getNotRevokedStatus(store).verified;
    const identity = getIssuerIdentityStatus(store).verified;
  
    return hash && issued && notRevoked && identity;
  }
  
  export function getVerificationStatus(store) {
    return store.document.verificationStatus;
  }