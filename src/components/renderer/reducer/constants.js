// Actions
export const types = {
  DOCUMENT_TEMPLATE_REGISTER: "DOCUMENT_TEMPLATE_REGISTER",
  DOCUMENT_TEMPLATE_SELECT_TAB: "DOCUMENT_TEMPLATE_SELECT_TAB"
};

export const initialState = {
  templates: null,
  activeTemplateTab: 0
};

export default types;
