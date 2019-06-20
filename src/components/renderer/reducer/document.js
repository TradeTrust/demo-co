import { get } from "lodash";
import { certificateData } from "@govtechsg/tradetrust-schema";
import {types, initialState} from "./constants";

const {
  UPDATE_DOCUMENT,
  DOCUMENT_TEMPLATE_REGISTER,
  DOCUMENT_TEMPLATE_SELECT_TAB
} = types;

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
