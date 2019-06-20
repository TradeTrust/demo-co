import { types, initialState } from "./constants";

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.DOCUMENT_TEMPLATE_REGISTER:
      return {
        ...state,
        templates: action.payload,
        activeTemplateTab: 0
      };
    case types.DOCUMENT_TEMPLATE_SELECT_TAB:
      return {
        ...state,
        activeTemplateTab: action.payload
      };
    default:
      return state;
  }
}
