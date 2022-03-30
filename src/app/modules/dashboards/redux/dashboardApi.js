
import axios from 'axios';
import { DashboardActions } from './dashboardAction';
import { showSuccessSnackbar } from "../../snackBar/snackBar.action";

const getAdminURL = (state) => {
    return state.environnment.environmentLists.adminBaseURL;
}

export const getTotalUserCountAsync = () => {
    return async (dispatch, getState) => {
        try {
            const adminBaseURL = getAdminURL(getState())
            dispatch(DashboardActions.getUserCountStart());
            let { _id } = getState().auth.user;
            const { data } = await axios({
                method: 'GET',
                url: `${process.env.REACT_APP_HOST}${adminBaseURL}/countForDashboard/${_id}`,
            });
            if (data.responseCode === 200) {
                return dispatch(DashboardActions.getUserCountSuccess(data.responseData));
            }
            return dispatch(DashboardActions.getUserCountError());
        } catch (error) {
            dispatch(DashboardActions.getUserCountError());
            return dispatch(showSuccessSnackbar("error", "Error while fetching data", 3000));
        }
    }
}

