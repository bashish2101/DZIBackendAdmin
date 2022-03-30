import axios from "axios";
import { UserManagementActions } from "./userManagementAction";
import { showSuccessSnackbar } from "../../snackBar/snackBar.action";

const getAdminURL = (state) => {
  return state.environnment.environmentLists.adminBaseURL;
};

const getCommonBaseURL = (state) => {
  return state.environnment.environmentLists.commonBaseURL;
};

export const getAllUserAsync = (searchBy, searchText, dir) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { _id } = getState().auth.user;
      let { skip, limit } = getState().userManagement;
      dispatch(UserManagementActions.getAllUserStart());
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/getAllUsers/${_id}?skip=${skip}&limit=${limit}&column=${searchBy}&dir=${dir}&search=${searchText}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        return dispatch(
          UserManagementActions.getAllUserSuccess(data.responseData)
        );
      }
      dispatch(UserManagementActions.getAllUserError());
      return dispatch(
        showSuccessSnackbar("success", data.responseMessage, 3000)
      );
    } catch (error) {
      dispatch(UserManagementActions.getAllUserError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const createUserAsync = (userDetail) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { _id } = getState().auth.user;
      dispatch(UserManagementActions.createUserStart());
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/createUser/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: userDetail,
      });

      if (data.responseCode === 200) {
        dispatch(UserManagementActions.createUserSuccess(data.responseData));
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      dispatch(UserManagementActions.createUserError());
      return dispatch(showSuccessSnackbar("error", data.responseMessage, 3000));
    } catch (error) {
      dispatch(UserManagementActions.createUserError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while creating user. Please try again later",
          3000
        )
      );
    }
  };
};

export const updateUserAsync = (user, userID, formData) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      const commonBaseURL = getCommonBaseURL(getState());
      dispatch(UserManagementActions.updateUserStart());
      let { _id } = getState().auth.user;
      let profileResult;
      if (formData) {
        const { data } = await axios({
          method: "POST",
          url: `${process.env.REACT_APP_HOST}${commonBaseURL}/uploadImage`,
          data: formData,
        });
        profileResult = data;
      }
      let finalUserDetails = user;
      if (formData && profileResult && profileResult.responseCode === 200) {
        finalUserDetails = {
          ...finalUserDetails,
          profilePicture: profileResult.responseData,
        };
      }
      const { data } = await axios({
        method: "PUT",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/updateUser/${_id}/${userID}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: finalUserDetails,
      });
      if (data.responseCode === 200) {
        dispatch(UserManagementActions.updateUserSuccess(data.responseData));
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      dispatch(UserManagementActions.updateUserError());
      return dispatch(showSuccessSnackbar("error", data.responseMessage, 3000));
    } catch (error) {
      dispatch(UserManagementActions.updateUserError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while updating user. Please try again later",
          3000
        )
      );
    }
  };
};

export const deleteUserAsync = (userID) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      dispatch(UserManagementActions.deleteUserStart());
      let { _id } = getState().auth.user;
      const { data } = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/deleteUser/${_id}/${userID}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        dispatch(UserManagementActions.deleteUserSuccess(data.responseData));
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      dispatch(UserManagementActions.deleteUserError());
      return dispatch(showSuccessSnackbar("error", data.responseMessage, 3000));
    } catch (error) {
      dispatch(UserManagementActions.deleteUserError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while deleting user. Please try again later",
          3000
        )
      );
    }
  };
};

export const removeAllActivitiesAsync = (userId) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { _id } = getState().auth.user;
      dispatch(UserManagementActions.removeAllActivitiesStart());
      const { data } = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/removeAllActivities/${_id}/${userId}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (data.responseCode === 200) {
        dispatch(
          UserManagementActions.removeAllActivitiesSuccess(data.responseData)
        );
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      return dispatch(UserManagementActions.removeAllActivitiesError());
    } catch (error) {
      dispatch(UserManagementActions.removeAllActivitiesError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while creating user. Please try again later",
          3000
        )
      );
    }
  };
};

export const removeActivityAsync = (userId, activityId) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { _id } = getState().auth.user;
      dispatch(UserManagementActions.removeActivityStart());
      const { data } = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/removeActivity/${_id}/${userId}/${activityId}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (data.responseCode === 200) {
        dispatch(
          UserManagementActions.removeActivitySuccess(data.responseData)
        );
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      return dispatch(UserManagementActions.removeActivityError());
    } catch (error) {
      dispatch(UserManagementActions.removeActivityError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while creating user. Please try again later",
          3000
        )
      );
    }
  };
};

export const setDefaultPasswordAsync = (setDefaultPassword) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { _id } = getState().auth.user;
      dispatch(UserManagementActions.setDefaultPasswordStart());
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/setDefaultPassword/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: setDefaultPassword,
      });
      if (data.responseCode === 200) {
        dispatch(
          UserManagementActions.setDefaultPasswordSuccess(data.responseData)
        );
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      return dispatch(UserManagementActions.setDefaultPasswordError());
    } catch (error) {
      dispatch(UserManagementActions.setDefaultPasswordError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while setting default password. Please try again later",
          3000
        )
      );
    }
  };
};

export const getDefaultPasswordAsync = () => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { _id } = getState().auth.user;
      dispatch(UserManagementActions.getDefaultPasswordStart());
      const { data } = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/getDefaultPassword/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        dispatch(
          UserManagementActions.getDefaultPasswordSuccess(data.responseData)
        );
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      return dispatch(UserManagementActions.getDefaultPasswordError());
    } catch (error) {
      dispatch(UserManagementActions.getDefaultPasswordError());
      dispatch(
        showSuccessSnackbar(
          "error",
          "Error while getting default password. Please try again later",
          3000
        )
      );
    }
  };
};

export const getAllUserActivitiesAsync = (userId) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { _id } = getState().auth.user;
      let { activitySkip, activityLimit } = getState().userManagement;
      dispatch(UserManagementActions.getAllActivityStart());
      const { data } = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/getAllUserActivities/${_id}/${userId}?skip=${activitySkip}&limit=${activityLimit}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        return dispatch(
          UserManagementActions.getAllActivitySuccess(data.responseData)
        );
      }
      dispatch(UserManagementActions.getAllActivityError());
      return dispatch(
        showSuccessSnackbar("success", data.responseMessage, 3000)
      );
    } catch (error) {
      dispatch(UserManagementActions.getAllActivityError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};
