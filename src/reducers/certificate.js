import { get } from "lodash";
import { certificateData } from "@tradetrust/tradetrust-certificate";

export const initialState = {
  cert: null,
  certModified: null,
  template: null
};

// Actions
export const types = {
  UPDATE_CERTIFICATE: "UPDATE_CERTIFICATE"
};

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_CERTIFICATE:
      return {
        ...initialState,
        cert: action.payload,
        certModified: action.payload,
        template: get(certificateData(action.payload), "$template")
      };
    default:
      return state;
  }
}

// Action Creators
export function updateCertificate(payload) {
  return {
    type: types.UPDATE_CERTIFICATE,
    payload
  };
}

export function getCertificate(store) {
  return store.certificate.certModified;
}

export function getTemplate(store) {
  return store.certificate.template;
}
