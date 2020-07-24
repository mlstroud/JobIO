import manageApplicationReducer from "./manage-application-reducer";
import searchReducer from "./searching-reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  isSearching: searchReducer,
  isEditing: manageApplicationReducer
});

export default rootReducer;