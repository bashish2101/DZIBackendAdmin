import axios from "axios";
import { EmailManagementActions } from "./emailManagementAction";
import { showSuccessSnackbar } from "../../snackBar/snackBar.action";

const getAdminURL = (state) => {
  return state.environnment.environmentLists.adminBaseURL;
};

export const getAllEmailAsync = (searchBy, searchText, type) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { _id } = getState().auth.user;
      let { skip, limit } = getState().emailManagement;
      dispatch(EmailManagementActions.getAllEmailStart());
      const { data } = await axios({
        method: "Get",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/getAllTemplates/${_id}?skip=${skip}&limit=${limit}&column=${searchBy}&type=${type}&dir=&search=${searchText}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        return dispatch(
          EmailManagementActions.getAllEmailSuccess(data.responseData)
        );
      }
      dispatch(EmailManagementActions.getAllEmailError());
      return dispatch(
        showSuccessSnackbar("success", data.responseMessage, 3000)
      );
    } catch (error) {
      dispatch(EmailManagementActions.getAllEmailError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};
export const getAllEmailTemplatesAsync = () => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { _id } = getState().auth.user;
      dispatch(EmailManagementActions.getEmailTemplateStart());
      const { data } = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/getAllTemplateEntities/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        return dispatch(
          EmailManagementActions.getEmailTemplateSuccess(data.responseData)
        );
      }
      dispatch(EmailManagementActions.getEmailTemplateError());

      return dispatch(showSuccessSnackbar("error", data.responseMessage, 3000));
    } catch (error) {
      dispatch(EmailManagementActions.getEmailTemplateError());
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const addEmailAsync = (
  values,
  setSubmitting,
  resetForm,
  redirectBack
) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { _id } = getState().auth.user;
      dispatch(EmailManagementActions.addEmailStart());
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/createTemplate/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: values,
      });
      if (data.responseCode === 200) {
        dispatch(EmailManagementActions.addEmailSuccess(data.responseData));
        setSubmitting(false);
        resetForm();
        redirectBack();
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      dispatch(EmailManagementActions.addEmailError());
      setSubmitting(false);
      return dispatch(showSuccessSnackbar("error", data.responseMessage, 3000));
    } catch (error) {
      dispatch(EmailManagementActions.addEmailError(error));
      setSubmitting(false);
      resetForm();
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const updateEmailAsync = (
  values,
  setSubmitting,
  resetForm,
  redirectBack
) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { _id } = getState().auth.user;
      let { selectedEmail } = getState().emailManagement;
      dispatch(EmailManagementActions.updateEmailStart());
      const { data } = await axios({
        method: "PUT",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/updateTemplate/${_id}/${selectedEmail._id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: values,
      });
      if (data.responseCode === 200) {
        dispatch(EmailManagementActions.updateEmailSuccess(data.responseData));
        setSubmitting(false);
        resetForm();
        redirectBack();
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      dispatch(EmailManagementActions.updateEmailError());
      setSubmitting(false);
      return dispatch(showSuccessSnackbar("error", data.responseMessage, 3000));
    } catch (error) {
      dispatch(EmailManagementActions.updateEmailError(error));
      setSubmitting(false);
      resetForm();
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};

export const deleteEmailAsync = (id) => {
  return async (dispatch, getState) => {
    try {
      const adminBaseURL = getAdminURL(getState());
      let { _id } = getState().auth.user;
      dispatch(EmailManagementActions.deleteEmailStart());
      const { data } = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_HOST}${adminBaseURL}/deleteTemplate/${_id}/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        dispatch(EmailManagementActions.deleteEmailSuccess(data.responseData));
        return dispatch(
          showSuccessSnackbar("success", data.responseMessage, 3000)
        );
      }
      dispatch(EmailManagementActions.deleteEmailError());

      return dispatch(showSuccessSnackbar("error", data.responseMessage, 3000));
    } catch (error) {
      dispatch(EmailManagementActions.deleteEmailError(error));
      dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
    }
  };
};
