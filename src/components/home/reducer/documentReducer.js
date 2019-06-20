import { docTypes, docInitialState } from "./constants";
import { get } from "lodash";
import { certificateData } from "@govtechsg/tradetrust-schema";
  // Reducers
  export default function reducer(state = docInitialState, action) {
    switch (action.type) {
      case docTypes.RESET_DOCUMENT:
        return {
          ...docInitialState
        };
        case docTypes.UPDATE_DOCUMENT:
        return {
          ...docInitialState,
          doc: action.payload,
          docModified: action.payload,
          renderType: get(certificateData(action.payload), "$template")
        };
      case docTypes.LOADING_STORE_SUCCESS:
        return {
          ...state,
          store: action.payload,
          storeError: null,
          storeLoading: false
        };
      case docTypes.LOADING_STORE_FAILURE:
        return {
          ...state,
          storeError: action.payload,
          storeLoading: false
        };
      case docTypes.VERIFYING_DOCUMENT:
        return {
          ...state,
          issuerIdentities: null,
  
          documentHash: false,
          documentIssued: false,
          documentNotRevoked: false,
          documentIssuer: false,
  
          documentHashVerifying: true,
          documentIssuedVerifying: true,
          documentNotRevokedVerifying: true,
          documentIssuerVerifying: true,
  
          documentHashError: null,
          documentIssuedError: null,
          documentNotRevokedError: null,
          documentIssuerError: null,
  
          verificationStatus: []
        };
      case docTypes.VERIFYING_DOCUMENT_HASH_SUCCESS:
        return {
          ...state,
          documentHash: true,
          documentHashError: null,
          documentHashVerifying: false,
          verificationStatus: [
            ...state.verificationStatus,
            {
              message: "Document integrity checked",
              warning: false,
              error: false
            }
          ]
        };
      case docTypes.VERIFYING_DOCUMENT_HASH_FAILURE:
        return {
          ...state,
          documentHash: false,
          documentHashError: action.payload,
          documentHashVerifying: false,
          verificationStatus: [
            ...state.verificationStatus,
            {
              message: "Certificate has been tampered",
              warning: false,
              error: true
            }
          ]
        };
      case docTypes.VERIFYING_DOCUMENT_ISSUED_SUCCESS:
        return {
          ...state,
          documentIssued: true,
          documentIssuedError: null,
          documentIssuedVerifying: false,
          verificationStatus: [
            ...state.verificationStatus,
            {
              message: "Certificate has been issued",
              warning: false,
              error: false
            }
          ]
        };
      case docTypes.VERIFYING_DOCUMENT_ISSUED_FAILURE:
        return {
          ...state,
          documentIssued: false,
          documentIssuedError: action.payload,
          documentIssuedVerifying: false,
          verificationStatus: [
            ...state.verificationStatus,
            {
              message: "Certificate is not issued",
              warning: false,
              error: true
            }
          ]
        };
      case docTypes.VERIFYING_DOCUMENT_REVOCATION_SUCCESS:
        return {
          ...state,
          documentNotRevoked: true,
          documentNotRevokedError: null,
          documentNotRevokedVerifying: false,
          verificationStatus: [
            ...state.verificationStatus,
            {
              message: "Certificate is issued",
              warning: false,
              error: false
            }
          ]
        };
      case docTypes.VERIFYING_DOCUMENT_REVOCATION_FAILURE:
        return {
          ...state,
          documentNotRevoked: false,
          documentNotRevokedError: action.payload,
          documentNotRevokedVerifying: false,
          verificationStatus: [
            ...state.verificationStatus,
            {
              message: "Certificate has been revoked",
              warning: false,
              error: true
            }
          ]
        };
      case docTypes.VERIFYING_DOCUMENT_ISSUER_FAILURE:
        return {
          ...state,
          documentIssuer: false,
          documentIssuerVerifying: false,
          documentIssuerError: action.payload,
          verificationStatus: [
            ...state.verificationStatus,
            {
              message: "Certificate issuer is registered",
              warning: false,
              error: false
            }
          ]
        };
      case docTypes.VERIFYING_DOCUMENT_ISSUER_SUCCESS:
        return {
          ...state,
          issuerIdentities: action.payload,
          documentIssuer: true,
          documentIssuerVerifying: false,
          documentIssuerError: null,
          verificationStatus: [
            ...state.verificationStatus,
            {
              message: "Unknown document issuer",
              warning: false,
              error: false
            }
          ]
        };
      case docTypes.DOCUMENT_OBFUSCATE_RESET:
        return {
          ...docInitialState,
          rawModified: state.raw
        };
      case docTypes.DOCUMENT_OBFUSCATE_UPDATE:
        return {
          ...state,
          rawModified: action.payload
        };
      default:
        return state;
    }
  }
  