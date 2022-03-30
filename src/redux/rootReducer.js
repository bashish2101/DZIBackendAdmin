import { combineReducers } from "redux";
import * as auth from "../app/modules/Auth/redux/authReducer";
import * as environnment from "../app/modules/GetEnvironment/getEnvironmentReducer";
import * as userManagement from "../app/modules/user_management/redux";
import * as emailManagement from "../app/modules/email_management/redux";
import * as profile from "../app/modules/profile_settings/redux";
import * as dashboard from "../app/modules/dashboards/redux";
import * as thirdParty from "../app/modules/third_party_services/redux";
import * as cms from "../app/modules/cms_pages/redux";
import snackBarReducer from "../app/modules/snackBar/snackbarReducer";
import * as propertyManagement from "../app/modules/propertyManagement/redux";

export const rootReducer = combineReducers({
  snackBar: snackBarReducer,
  environnment: environnment.reducer,
  dashboard: dashboard.reducer,
  auth: auth.reducer,
  userManagement: userManagement.reducer,
  propertyManagement: propertyManagement.reducer,
  emailManagement: emailManagement.reducer,
  profile: profile.reducer,
  thirdParty: thirdParty.reducer,
  cms: cms.reducer
});
