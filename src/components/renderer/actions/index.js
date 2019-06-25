import { types } from "components/renderer/reducer/constants";

const { DOCUMENT_TEMPLATE_REGISTER } = types;

export function getDocument(store) {
  return store.document.docModified;
}

export function getRenderType(store) {
  return store.document.renderType;
}

export function getTemplates(store) {
  return store.renderer.templates;
}

export function registerTemplates(payload) {
  return {
    type: DOCUMENT_TEMPLATE_REGISTER,
    payload
  };
}

export function getActiveTemplateTab(store) {
  return store.renderer.activeTemplateTab;
}
