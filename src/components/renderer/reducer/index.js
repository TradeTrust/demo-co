import { types, initialState } from "./constants";

const {
  DOCUMENT_TEMPLATE_REGISTER,
  DOCUMENT_TEMPLATE_SELECT_TAB
} = types;

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
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
