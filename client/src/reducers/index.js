import manageApplicationReducer from "./manage-application-reducer";
import searchReducer from "./searching-reducer";
import { firestoreReducer } from "redux-firestore";
import { combineReducers } from "redux";
import viewApplicationsReducer from "./view-applications-reducer";

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  isSearching: searchReducer,
  isEditing: manageApplicationReducer,
  viewingApplications: viewApplicationsReducer
});

export default rootReducer;