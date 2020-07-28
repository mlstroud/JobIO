import manageApplicationReducer from "./manage-application-reducer";
import searchReducer from "./searching-reducer";
import { firestoreReducer } from "redux-firestore";
import { combineReducers } from "redux";
import viewApplicationsReducer from "./view-applications-reducer";
import selectedApplicationReducer from "./selected-application-reducer";
import userReducer from "./user-reducer";

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  isSearching: searchReducer,
  isEditing: manageApplicationReducer,
  selectedApplication: selectedApplicationReducer,
  viewingApplications: viewApplicationsReducer,
  currentUser: userReducer
});

export default rootReducer;