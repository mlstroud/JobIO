import manageApplicationReducer from "./manage-application-reducer";
import searchReducer from "./searching-reducer";
import { firestoreReducer } from "redux-firestore";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  isSearching: searchReducer,
  isEditing: manageApplicationReducer
});

export default rootReducer;