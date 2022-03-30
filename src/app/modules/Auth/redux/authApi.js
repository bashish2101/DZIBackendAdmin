import axios from "axios";
import { AuthActions } from "./authAction";
import { addUserDetails } from "./userInformation";
import { showSuccessSnackbar } from "../../snackBar/snackBar.action";

const getErrorMsg = (data) => {
  if (data.response) {
    return data.response.responseMessage || data.response.message;
  }
  if (data.error) {
    return data.error.errors[0].message;
  }
  return "Login Error.";
};

const getAdminURL = (state) => {
  return state.environnment.environmentLists.adminBaseURL;
};

export const loginAsync = (user) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(AuthActions.loginStart());
      const newUserDetails = await addUserDetails(user);
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/login`,
        data: newUserDetails,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        dispatch(AuthActions.loginSuccess(data.responseData));
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      return dispatch(AuthActions.loginError(data.responseMessage));
    } catch (error) {
      dispatch(AuthActions.loginError());
      return dispatch(
        showSuccessSnackbar("error", "Error while login in.", 3000)
      );
    }
  };
};

export const verifyLoginSecurityCodeAsync = ({ code }) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { _id } = getState().auth.user;
      dispatch(AuthActions.verifyLoginSecurityCodeStart());
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/verifySecurityCode/${_id}`,
        data: { code },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        dispatch(AuthActions.verifyLoginSecurityCodeSuccess(data.responseData));
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      dispatch(AuthActions.verifyLoginSecurityCodeError(data.responseMessage));
    } catch (error) {
      dispatch(AuthActions.verifyLoginSecurityCodeError());
      return dispatch(
        showSuccessSnackbar(
          "error",
          "Error while sending otp. Please try again later",
          3000
        )
      );
    }
  };
};

export const logoutAsync = () => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(AuthActions.logoutStart());
      let { _id, loginActivity } = getState().auth.user;
      const loginActivityID = loginActivity[loginActivity.length - 1]._id;
      const { data } = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/logout/${_id}/${loginActivityID}`,
      });
      if (data.responseCode === 200) {
        dispatch(AuthActions.logout());
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      dispatch(AuthActions.logoutError(data.responseMessage));
      return dispatch(showSuccessSnackbar("error", data.responseMessage, 3000));
    } catch (error) {
      dispatch(AuthActions.logoutError());
      return dispatch(
        showSuccessSnackbar(
          "error",
          "Error while logout. Please try again after sometime.",
          3000
        )
      );
    }
  };
};

export const forgotPasswordAsync = (emailId, redirectToLogin) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(AuthActions.forgotPasswordStart());
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/forgotPassword`,
        data: { emailId },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        dispatch(AuthActions.forgotPasswordSuccess(data.responseData));
        redirectToLogin();
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      dispatch(AuthActions.forgotPasswordError(getErrorMsg(data)));
      return dispatch(showSuccessSnackbar("error", data.responseMessage, 3000));
    } catch (error) {
      dispatch(AuthActions.forgotPasswordError());
      return dispatch(
        showSuccessSnackbar(
          "error",
          "Error while sending link to your e-mail id.",
          3000
        )
      );
    }
  };
};

export const setNewPasswordAsync = ({ resetToken, password }, redirectBack) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(AuthActions.setNewPasswordStart());
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/setNewPassword/${resetToken}`,
        data: { password },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        dispatch(AuthActions.setNewPasswordSuccess(data.responseData));
        redirectBack();
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      dispatch(AuthActions.setNewPasswordError(getErrorMsg(data)));
      return dispatch(showSuccessSnackbar("error", data.responseMessage, 3000));
    } catch (error) {
      dispatch(AuthActions.setNewPasswordError());
      return dispatch(
        showSuccessSnackbar(
          "error",
          "Error while changing password. Please try again later",
          3000
        )
      );
    }
  };
};

export const resendVerificationCodeAsync = () => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(AuthActions.resendCodeStart());
      let { emailId, _id, contactNumber } = getState().auth.user;
      const resBody = {
        emailId: emailId,
        contactNumber: contactNumber,
      };
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/resendCode/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: resBody,
      });
      if (data.responseCode === 200) {
        dispatch(AuthActions.resendCodeSuccess(data.responseData));
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      dispatch(showSuccessSnackbar("success", data.responseMessage, 3000));
      return dispatch(AuthActions.resendCodeError(data.responseMessage));
    } catch (error) {
      return dispatch(showSuccessSnackbar("error", error.message, 3000));
    }
  };
};

export const notificationListAsync = () => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      const adminBaseURL = getAdminURL(getState());
      dispatch(AuthActions.notificationListStart());
      const { data } = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/getAllNotifications/${_id}?skip=0&limit=6`,
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (data.responseCode === 200) {
        //console.log(data.responseData);
        return dispatch(
          dispatch(AuthActions.notificationListSuccess(data.responseData))
        );
      }
      return dispatch(AuthActions.notificationListError());
    } catch (error) {
      return dispatch(showSuccessSnackbar("error", error.message, 3000));
    }
  };
};