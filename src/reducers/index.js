import { combineReducers } from "redux";

import { appReducer as home, documentReducer as document} from "components/home/reducer";
import renderer from "components/renderer/reducer";

export default combineReducers({
  document,
  home,
  renderer
});
