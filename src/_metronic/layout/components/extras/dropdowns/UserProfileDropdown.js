import React, { useMemo } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import objectPath from "object-path";
import { useHtmlClassService } from "../../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../../_helpers";
import { DropdownTopbarItemToggler } from "../../../../_partials/dropdowns";
import { logoutAsync } from "../../../../../app/modules/Auth/redux/authApi";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";

export function UserProfileDropdown() {
  const dispatch = useDispatch();

  const { user, isLoading } = useSelector((state) => state.auth, shallowEqual);

  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      light:
        objectPath.get(uiService.config, "extras.user.dropdown.style") ===
        "light",
    };
  }, [uiService]);

  const logoutClick = () => {
    dispatch(logoutAsync());
  };

  return (
    <Dropdown drop="down" alignRight>
      <Dropdown.Toggle
        as={DropdownTopbarItemToggler}
        id="dropdown-toggle-user-profile"
      >
        <div
          className={
            "btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2"
          }
        >
          <span className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">
            Hi,
          </span>{" "}
          <span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">
            {user.fullname}
          </span>
          <span className="symbol symbol-35 symbol-light-success" >
            <img alt="Pic" className="hidden" src={user.profilePicture} height="35" width="35" />
          </span>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className="p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl">
        <>
          {layoutProps.light && (
            <>
              <div className="d-flex align-items-center p-8 rounded-top">
                <div className="symbol symbol-md bg-light-primary mr-3 flex-shrink-0 aaa"></div>
                <div className="text-dark m-0 flex-grow-1 mr-3 font-size-h5">
                  Sean Stone
                </div>
                <span className="label label-light-success label-lg font-weight-bold label-inline">
                  3 messages
                </span>
              </div>
              <div className="separator separator-solid"></div>
            </>
          )}

          {!layoutProps.light && (
            <div
              className="d-flex align-items-center justify-content-between flex-wrap p-8 bgi-size-cover bgi-no-repeat rounded-top"
              style={{
                backgroundImage: `url(${toAbsoluteUrl(
                  "/media/misc/bg-1.jpg"
                )})`,
              }}
            >
              <div className="symbol bg-white-o-15 mr-3">
                <span className="symbol symbol-80 symbol-primary d-table m-auto">
                  <img alt="Pic" className="hidden" src={user.profilePicture} />
                </span>
              </div>
              <div className="text-white m-0 flex-grow-1 mr-3 font-size-h5">
                {user.fullname}
              </div>
              <span className="label label-success label-lg font-weight-bold label-inline">
                {user.emailId}
              </span>
            </div>
          )}
        </>

        <div className="navi navi-spacer-x-0 pt-5">
          <Link to="/profile-settings" className="navi-item px-8">
            <div className="navi-link">
              <div className="navi-icon mr-2">
                <i className="flaticon2-calendar-3 text-success" />
              </div>
              <div className="navi-text">
                <div className="font-weight-bold">Profile Setting</div>
                <div className="text-muted">Account settings</div>
              </div>
            </div>
          </Link>

          {/* <a className="navi-item px-8">
                        <div className="navi-link">
                            <div className="navi-icon mr-2">
                                <i className="flaticon2-mail text-warning"></i>
                            </div>
                            <div className="navi-text">
                                <div className="font-weight-bold">My Messages</div>
                                <div className="text-muted">Inbox and tasks</div>
                            </div>
                        </div>
                    </a>

                    <a className="navi-item px-8">
                        <div className="navi-link">
                            <div className="navi-icon mr-2">
                                <i className="flaticon2-rocket-1 text-danger"></i>
                            </div>
                            <div className="navi-text">
                                <div className="font-weight-bold">My Activities</div>
                                <div className="text-muted">Logs and notifications</div>
                            </div>
                        </div>
                    </a>

                    <a className="navi-item px-8">
                        <div className="navi-link">
                            <div className="navi-icon mr-2">
                                <i className="flaticon2-hourglass text-primary"></i>
                            </div>
                            <div className="navi-text">
                                <div className="font-weight-bold">My Tasks</div>
                                <div className="text-muted">latest tasks and projects</div>
                            </div>
                        </div>
                    </a> */}
          <div className="navi-separator mt-3"></div>

          <div className="navi-footer  px-8 py-5">
            <button
              className="btn btn-light-primary font-weight-bold"
              onClick={logoutClick}
              disabled={isLoading}
            >
              Sign Out
              {isLoading && (
                <span className="ml-3 spinner spinner-white"></span>
              )}
            </button>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}
