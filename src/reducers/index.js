import { combineReducers } from "redux";

import document from "components/home/reducer/documentReducer";
import home from "components/home/reducer";
import renderer from "components/renderer/reducer";

export default combineReducers({
  document,
  home,
  renderer
});
