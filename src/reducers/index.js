import { combineReducers } from "redux";

import {
  appReducer as application,
  documentReducer as document
} from "components/home/reducer";
import renderer from "components/renderer/reducer";

export default combineReducers({
  document,
  application,
  renderer
});
