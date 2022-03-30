import axios from "axios";
import { ProfileActions } from "./profileAction";
import { showSuccessSnackbar } from "../../snackBar/snackBar.action";

const getAdminURL = (state) => {
  return state.environnment.environmentLists.adminBaseURL;
};

const getCommonBaseURL = (state) => {
  return state.environnment.environmentLists.commonBaseURL;
};

export const updateUserProfileAsync = (user, formData, twoFAmsg) => { 
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      const commonBaseURL = getCommonBaseURL(getState());
      dispatch(ProfileActions.profileUpdateStart());
      let { _id } = getState().auth.user;
      let profilePicture;
      if (formData) {
        const { data } = await axios({
          method: "POST",
          url: `${process.env.REACT_APP_HOST}${commonBaseURL}/uploadImage`,
          data: formData,
        });
        profilePicture = data;
      }
      let finalUserDetails = user;
      if (formData && profilePicture && profilePicture.responseCode === 200) {
        finalUserDetails = {
          ...finalUserDetails,
          profilePicture: profilePicture.responseData,
        };
      }
      console.log({finalUserDetails})
      let { data } = await axios({
        method: "PUT",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/updateProfile/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: finalUserDetails,
      });
      if (data.responseCode === 200) {
        dispatch(ProfileActions.profileUpdateSuccess(data.responseData));
        if (twoFAmsg) {
          return dispatch(
            showSuccessSnackbar(
              "success",
              `2FA Login ${twoFAmsg} successfully`,
              3000
            )
          );
        }
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      dispatch(ProfileActions.profileUpdateError());
      return dispatch(showSuccessSnackbar("error", data.responseMessage, 3000));
    } catch (error) {
      dispatch(ProfileActions.profileUpdateError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while updating profile.Please try again after sometime.",
          3000
        )
      );
    }
  };
};

export const resetPasswordAsync = (password) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { _id } = getState().auth.user;
      dispatch(ProfileActions.resetPasswordStart());
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/resetPassword/${_id}`,
        data: password,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        dispatch(ProfileActions.resetPasswordSuccess(data.responseData));
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      dispatch(ProfileActions.resetPasswordError());
      return dispatch(
        showSuccessSnackbar("error", data.responseMessage, 3000)
      );
    } catch (error) {
      dispatch(ProfileActions.resetPasswordError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while reseting password.Please try again after sometime.",
          3000
        )
      );
    }
  };
};

export const changeEmailRequestAsync = (emailId) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { _id } = getState().auth.user;
      dispatch(ProfileActions.changeEmailRequestStart());
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/changeEmailRequest/${_id}`,
        data: emailId,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        dispatch(ProfileActions.changeEmailRequestSuccess(data.responseData));
        dispatch(ProfileActions.openEmailChangeModal());
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      dispatch(ProfileActions.changeEmailRequestError());
      return dispatch(showSuccessSnackbar("error", data.responseMessage, 3000));
    } catch (error) {
      dispatch(ProfileActions.changeEmailRequestError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while changing email. Please try again later",
          3000
        )
      );
    }
  };
};

export const updateEmailRequestAsync = ({ code, emailId }) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { _id } = getState().auth.user;
      dispatch(ProfileActions.updateEmailStart());
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/updateEmail/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { code, emailId },
      });
      if (data.responseCode === 200) {
        dispatch(ProfileActions.updateEmailSuccess(emailId));
        dispatch(ProfileActions.updateProfileSuccess(data.responseData));
        dispatch(ProfileActions.closeEmailChangeModal());
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      dispatch(ProfileActions.updateEmailError());
      return dispatch(showSuccessSnackbar("error", data.responseMessage, 3000));
    } catch (error) {
      dispatch(ProfileActions.updateEmailError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while updating email. Please try again later",
          3000
        )
      );
    }
  };
};

export const changeContactRequestAsync = (contactNumber) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { _id } = getState().auth.user;
      dispatch(ProfileActions.changeContactRequestStart());
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/changeContactRequest/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: contactNumber,
      });
      if (data.responseCode === 200) {
        dispatch(ProfileActions.changeContactRequestSuccess(data.responseData));
        dispatch(ProfileActions.openContactChangeModal());
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      // dispatch(showSuccessSnackbar('error', data.responseMessage, 3000));
      return dispatch(ProfileActions.changeContactRequestError());
    } catch (error) {
      dispatch(ProfileActions.changeContactRequestError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while receiving request. Please try again later",
          3000
        )
      );
    }
  };
};

export const updateContactRequestAsync = ({ code, contactNumber }) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { _id } = getState().auth.user;
      dispatch(ProfileActions.updateContactStart());
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/updateContact/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { code, contactNumber },
      });
      if (data.responseCode === 200) {
        dispatch(ProfileActions.updateContactSuccess(contactNumber));
        dispatch(ProfileActions.updateProfileSuccess(data.responseData));
        dispatch(ProfileActions.closeContactChangeModal());
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      dispatch(ProfileActions.updateContactError());
    } catch (error) {
      dispatch(ProfileActions.updateContactError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while updating contact. Please try again later",
          3000
        )
      );
    }
  };
};

export const uploadImageAsync = (image) => {
  return async (dispatch, getState) => {
    try {
      const commonBaseURL = getCommonBaseURL(getState());
      dispatch(ProfileActions.uploadImageStart());
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${commonBaseURL}/uploadImage`,
        headers: {
          "Content-type": "multipart/form-data",
        },
        data: image,
      });
      if (data.responseCode === 200) {
        dispatch(ProfileActions.uploadImageSuccess(data.responseData));
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      return dispatch(ProfileActions.uploadImageError());
    } catch (error) {
      dispatch(ProfileActions.uploadImageError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while uploading image. Please try again later",
          3000
        )
      );
    }
  };
};
