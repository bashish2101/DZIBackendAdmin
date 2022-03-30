import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { updateUserProfileAsync } from "../redux/profileApi";
import Switch from "@material-ui/core/Switch";

const ProfileSecurity = () => {
  const dispatch = useDispatch();

  const { user, isLoading } = useSelector((state) => state.auth, shallowEqual);

  const onChange2FA = (e) => {
    let value = e.target.checked;
    const message = value ? "enabled" : "disabled";
    dispatch(
      updateUserProfileAsync({ twoFactorAuthentication: value }, null, message)
    );
  };

  return (
    <div>
      <div className="tblmrgn mt-0 lwpddng cstm_pddng mn_height_500">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-md-4-as">
            <h4 className="fn_s_20 color_blk f-w-700 mb-10">
              2FA Login{" "}
              <Switch
                checked={user.twoFactorAuthentication}
                onChange={onChange2FA}
                value="twoFactorAuthentication"
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </h4>

            <p className="fn_s_16 color_blk f-w-400 opacity60 mb-3">
              Nam quam enim, pellentesque quis semper ut, viverra id diam. Donec
              ut mollis purus. Donec convallis auctor dolor, sit amet
              condimentum nisi tincidunt in. Proin
            </p>
            <h4 className="fn_s_20 color_blk f-w-400">
              <label className="form-label">Contact Number :- </label>{" "}
              &nbsp;&nbsp;
              {user.contactNumber}
            </h4>
            <h4 className="fn_s_20 color_blk f-w-400">
              <label className="form-label">Email ID :- </label>&nbsp;&nbsp;
              {user.emailId}
            </h4>
            <div className="d-flex">
              {/* <Form.Check
                checked={user.twoFactorAuthentication}
                type="switch"
                id="custom-switch"
                label=""
                className="cstmswtch float-centre mr-3"
                onClick={onChange2FA}
              /> */}
              {isLoading && <span className="ml-3 spinner spinner-dark"></span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSecurity;
