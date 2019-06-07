import { get } from "lodash";
import { certificateData } from "@tradetrust/tradetrust-certificate";

export const initialState = {
  doc: null,
  docModified: null,
  renderType: null,
  activeTemplateTab: 0
};

// Actions
export const types = {
  UPDATE_DOCUMENT: "UPDATE_DOCUMENT",
  DOCUMENT_TEMPLATE_REGISTER: "DOCUMENT_TEMPLATE_REGISTER",
  DOCUMENT_TEMPLATE_SELECT_TAB: "DOCUMENT_TEMPLATE_SELECT_TAB"
};

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_DOCUMENT:
      return {
        ...initialState,
        doc: action.payload,
        docModified: action.payload,
        renderType: get(certificateData(action.payload), "$template")
      };
    case types.DOCUMENT_TEMPLATE_REGISTER:
      return {
        ...state,
        templates: action.payload,
        activeTemplateTab: 0
      };
    case types.CERTIFICATE_TEMPLATE_SELECT_TAB:
      return {
        ...state,
        activeTemplateTab: action.payload
      };
    default:
      return state;
  }
}

// Action Creators
export function updateDocument(payload) {
  return {
    type: types.UPDATE_DOCUMENT,
    payload
  };
}

export function getDocument(store) {
  return store.document.docModified;
}

export function getRenderType(store) {
  return store.document.renderType;
}

export function getTemplates(store) {
  return store.document.templates;
}

export function registerTemplates(payload) {
  return {
    type: types.DOCUMENT_TEMPLATE_REGISTER,
    payload
  };
}

export function selectTemplateTab(payload) {
  return {
    type: types.DOCUMENT_TEMPLATE_SELECT_TAB,
    payload
  };
}

export function getActiveTemplateTab(store) {
  return store.document.activeTemplateTab;
}
