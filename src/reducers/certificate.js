import { get } from "lodash";
import { certificateData } from "@govtechsg/tradetrust-schema";

export const initialState = {
  doc: null,
  docModified: null,
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
        doc: action.payload,
        docModified: action.payload,
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
  return store.certificate.docModified;
}

export function getTemplate(store) {
  return store.certificate.template;
}
