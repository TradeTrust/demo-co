import { get } from "lodash";
import { certificateData } from "@govtechsg/tradetrust-schema";
import constants from "./actionConstants";

export const initialState = {
  doc: null,
  docModified: null,
  renderType: null,
  templates: null,
  activeTemplateTab: 0
};

const {
  UPDATE_DOCUMENT,
  DOCUMENT_TEMPLATE_REGISTER,
  DOCUMENT_TEMPLATE_SELECT_TAB
} = constants;

// Action Creators
export function updateDocument(dispatch, payload) {
  return dispatch({
    type: UPDATE_DOCUMENT,
    payload
  });
}

export function getDocument(store) {
  return store.renderer.docModified;
}

export function getRenderType(store) {
  return store.renderer.renderType;
}

export function getTemplates(store) {
  return store.renderer.templates;
}

export function registerTemplates(dispatch, payload) {
  return dispatch({
    type: DOCUMENT_TEMPLATE_REGISTER,
    payload
  });
}

export function selectTemplateTab(dispatch, payload) {
  return dispatch({
    type: DOCUMENT_TEMPLATE_SELECT_TAB,
    payload
  });
}

export function getActiveTemplateTab(store) {
  return store.renderer.activeTemplateTab;
}

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DOCUMENT:
      return {
        ...initialState,
        doc: action.payload,
        docModified: action.payload,
        renderType: get(certificateData(action.payload), "$template")
      };
    case DOCUMENT_TEMPLATE_REGISTER:
      return {
        ...state,
        templates: action.payload,
        activeTemplateTab: 0
      };
    case DOCUMENT_TEMPLATE_SELECT_TAB:
      return {
        ...state,
        activeTemplateTab: action.payload
      };
    default:
      return state;
  }
}
