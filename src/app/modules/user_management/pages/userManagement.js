import React, { useEffect, useRef } from "react";
import "bootstrap-daterangepicker/daterangepicker.css";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getAllUserAsync, UserManagementActions } from "../redux";
import UserManagementTable from "./user_management_detail/userManagementTable";
import {
  Card,
  CardHeader,
  CardHeaderToolbar,
} from "./../../../../_metronic/_partials/controls";
import { useHistory } from "react-router-dom";

export function UserManagement() {
  const dispatch = useDispatch();

  const history = useHistory();

  const searchRef = useRef();

  const { refreshUserList, searchBy, searchText, dir } = useSelector(
    (state) => state.userManagement,
    shallowEqual
  );
  useEffect(() => {
    if (refreshUserList) {
      dispatch(getAllUserAsync(searchBy, searchText, dir));
    }
  }, [refreshUserList]);

  useEffect(() => {
    dispatch(UserManagementActions.setSelectedUser(null));
    if (searchRef.current) {
      let keyPressEvent = (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          dispatch(UserManagementActions.refreshUserList());
        }
      };
      let input = searchRef.current;
      input.addEventListener("keyup", keyPressEvent);

      return () => {
        input.removeEventListener("keyup", keyPressEvent);
        dispatch(UserManagementActions.searchTextChange(""));
        input.value = "";
      };
    }
  }, []);

  const onSearchTextChange = (e) => {
    dispatch(UserManagementActions.searchTextChange(e.target.value));
  };

  const onUserDetailsClick = (user) => {
    dispatch(UserManagementActions.setSelectedUser(user));
    history.push("/user-management/user-management-detail");
  };

  return (
    <>
      <Card>
        <CardHeader title="User Management">
          <CardHeaderToolbar>
            <div className="d-flex flex-wrap ap_filter_wraper justify-content-end align-items-center">
              <form
                className="subheader_filter"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="form-row">
                  {/* <div className="form-group mr-5 mb-1 mt-2">
                    <button
                      className="btn_new btn-sm"
                      type="button"
                      onClick={() => onUserDetailsClick({})}
                    >
                      Add
                    </button>
                  </div> */}
                  <div className="form-group mr-3 mb-1">
                    <input
                      name="Search"
                      placeholder="Search. . ."
                      type="text"
                      className="form-control"
                      value={searchText}
                      onChange={onSearchTextChange}
                      ref={searchRef}
                    />
                  </div>
                </div>
              </form>
            </div>
          </CardHeaderToolbar>
        </CardHeader>
        <UserManagementTable onUserDetailsClick={onUserDetailsClick} />
      </Card>
    </>
  );
}
