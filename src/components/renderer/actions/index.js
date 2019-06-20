import { types } from "components/renderer/reducer/constants";

const {
  UPDATE_DOCUMENT,
  DOCUMENT_TEMPLATE_REGISTER,
  DOCUMENT_TEMPLATE_SELECT_TAB
} = types;

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
