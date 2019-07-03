import { types, initialState } from "./constants";

// Reducers
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.DOCUMENT_TEMPLATE_REGISTER:
      return {
        ...state,
        templates: action.payload
      };
    default:
      return state;
  }
}
