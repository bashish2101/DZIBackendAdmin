import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { UserManagement } from "./modules/user_management";
import { DashboardPage } from "./pages/DashboardPage";
import { UserManagementDetail } from "./modules/user_management";
import { EmailManagement } from "./modules/email_management";
import { ProfileSettings } from "./modules/profile_settings";
import { ThirdPartyServices } from "./modules/third_party_services";
import AddTemplate from "./modules/email_management/pages/AddTemplate";
import { CmsPages } from "./modules/cms_pages";
import { CmsPageDetail } from "./modules/cms_pages";
import { PropertyManagement } from "./modules/propertyManagement/pages/propertyManagement";
import  AddProperty  from "./modules/propertyManagement/pages/AddProperty";
import  EditProperty  from "./modules/propertyManagement/pages/EditProperty";


export default function BasePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact from="/" to="/dashboard" />}
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <ContentRoute path="/profile-settings" component={ProfileSettings} />
        <ContentRoute
          exact
          path="/user-management"
          component={UserManagement}
        />
        <ContentRoute
          path="/user-management/user-management-detail"
          component={UserManagementDetail}
        />
        <ContentRoute
          exact
          path="/property-management"
          component={PropertyManagement}
        />
        <ContentRoute
          exact
          path="/add-property"
          component={AddProperty}
        />
         <ContentRoute
          exact
          path="/property-management/edit-property/:id"
          component={EditProperty}
        />
        <ContentRoute
          exact
          path="/email-management"
          component={EmailManagement}
        />

        <ContentRoute
          exact
          path="/email-management/add-template"
          component={AddTemplate}
        />
        <ContentRoute
          exact
          path="/email-management/edit-template/:id"
          component={AddTemplate}
        />
        <ContentRoute
          path="/third-party-services"
          component={ThirdPartyServices}
        />
        <ContentRoute exact path="/cms-pages" component={CmsPages} />
        <ContentRoute
          path="/cms-pages/cms-page-detail"
          component={CmsPageDetail}
        />
        <ContentRoute
          path="/cms-pages/cms-page-detail"
          component={CmsPageDetail}
        />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
