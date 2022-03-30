import axios from 'axios';
import { ThirdPartyActions } from './thirdPartyAction';
import { showSuccessSnackbar } from '../../snackBar/snackBar.action';

const getAdminURL = (state) => {
    return state.environnment.environmentLists.adminBaseURL;
}

export const createServiceAsync = (serviceDetails) => {
    return async (dispatch, getState) => {
        try {
            const adminBaseURL = getAdminURL(getState())
            let { _id } = getState().auth.user;
            dispatch(ThirdPartyActions.createServiceStart());
            let { data } = await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_HOST}${adminBaseURL}/createService/${_id}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: serviceDetails
            });
            if (data.responseCode === 200) {
                dispatch(ThirdPartyActions.createServiceSuccess(data.responseData));
                return dispatch(showSuccessSnackbar('success', data.responseMessage, 3000));
            }
            dispatch(ThirdPartyActions.createServiceError());
            return dispatch(showSuccessSnackbar('error', data.responseMessage, 3000));
        } catch (error) {
            dispatch(ThirdPartyActions.createServiceError());
            dispatch(showSuccessSnackbar('error', "Error while creating service.Please try again after sometime.", 3000));
        }
    }
}

export const getAllServicesAsync = () => {
    return async (dispatch, getState) => {
        try {
            const adminBaseURL = getAdminURL(getState())
            let { _id } = getState().auth.user;
            dispatch(ThirdPartyActions.getAllServicesStart());
            let { data } = await axios({
                method: 'GET',
                url: `${process.env.REACT_APP_HOST}${adminBaseURL}/getAllServices/${_id}`,
            });
            if (data.responseCode === 200) {
                dispatch(ThirdPartyActions.getAllServicesSuccess(data.responseData));
                //return dispatch(showSuccessSnackbar('success', data.responseMessage, 3000));
            }
            dispatch(ThirdPartyActions.getAllServicesError(data.responseMessage));
            //return dispatch(showSuccessSnackbar('error', data.responseMessage, 3000));
        } catch (error) {
            dispatch(ThirdPartyActions.getAllServicesError());
            dispatch(showSuccessSnackbar('error', error.message, 3000));
        }
    }
}

export const updateServiceAsync = (serviceDetails, serviceId) => {
    return async (dispatch, getState) => {
        try {
            const adminBaseURL = getAdminURL(getState())
            let { _id } = getState().auth.user;
            dispatch(ThirdPartyActions.updateServiceStart());
            let { data } = await axios({
                method: 'PUT',
                url: `${process.env.REACT_APP_HOST}${adminBaseURL}/updateService/${_id}/${serviceId}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: serviceDetails
            });
            if (data.responseCode === 200) {
                dispatch(ThirdPartyActions.updateServiceSuccess(data.responseData));
                return dispatch(showSuccessSnackbar('success', data.responseMessage, 3000));
            }
            dispatch(ThirdPartyActions.updateServiceError());
            return dispatch(showSuccessSnackbar('error', data.responseMessage, 3000));
        } catch (error) {
            dispatch(ThirdPartyActions.updateServiceError());
            dispatch(showSuccessSnackbar('error', "Error while updating service.Please try again after sometime.", 3000));
        }
    }
}

export const deleteServiceAsync = (deleteServiceId) => {
    return async (dispatch, getState) => {
        try {
            const adminBaseURL = getAdminURL(getState())
            let { _id } = getState().auth.user;
            dispatch(ThirdPartyActions.deleteServiceStart());
            let { data } = await axios({
                method: 'DELETE',
                url: `${process.env.REACT_APP_HOST}${adminBaseURL}/deleteService/${_id}/${deleteServiceId}`,
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (data.responseCode === 200) {
                dispatch(ThirdPartyActions.deleteServiceSuccess(data.responseData));
                return dispatch(showSuccessSnackbar('success', data.responseMessage, 3000));
            }
            dispatch(ThirdPartyActions.deleteServiceError());
            return dispatch(showSuccessSnackbar('error', data.responseMessage, 3000));
        } catch (error) {
            dispatch(ThirdPartyActions.deleteServiceError());
            dispatch(showSuccessSnackbar('error', "Error while deleting service.Please try again after sometime.", 3000));
        }
    }
}