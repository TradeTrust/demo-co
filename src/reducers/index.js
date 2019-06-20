import { combineReducers } from "redux";

import home from "components/home/reducer";
import renderer from "components/renderer/reducer/document";

export default combineReducers({
  home,
  renderer
});
