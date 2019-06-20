// Actions
export const types = {
  UPDATE_DOCUMENT: "UPDATE_DOCUMENT",
  DOCUMENT_TEMPLATE_REGISTER: "DOCUMENT_TEMPLATE_REGISTER",
  DOCUMENT_TEMPLATE_SELECT_TAB: "DOCUMENT_TEMPLATE_SELECT_TAB"
};

export const initialState = {
  doc: null,
  docModified: null,
  renderType: null,
  templates: null,
  activeTemplateTab: 0
};

export default types;
