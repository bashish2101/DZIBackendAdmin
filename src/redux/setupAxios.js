import { AuthActions } from '../app/modules/Auth/redux/authAction';

export default function setupAxios(axios, store) {
    axios.interceptors.request.use(
        config => {
            const {
                auth: { authToken }
            } = store.getState();

            if (authToken) {
                config.headers.Authorization = authToken;
            }

            return config;
        },
        err => Promise.reject(err)
    );
    axios.interceptors.response.use(
        response => {
            return response
        },
        err => {
            if (err.response && err.response.status === 404) {
                store.dispatch(AuthActions.logout());
            }
            Promise.reject(err)
        }
    );
}
