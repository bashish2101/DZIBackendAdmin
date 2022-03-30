export const DashboardMap = {
    GET_USER_COUNT_START: 'GET_USER_COUNT_START',
    GET_USER_COUNT_SUCCESS: 'GET_USER_COUNT_SUCCESS',
    GET_USER_COUNT_ERROR: 'GET_USER_COUNT_ERROR',
}

export const DashboardActions = {
    getUserCountStart: (data) => ({ type: DashboardMap.GET_USER_COUNT_START, payload: data }),
    getUserCountSuccess: (data) => ({ type: DashboardMap.GET_USER_COUNT_SUCCESS, payload: data }),
    getUserCountError: (data) => ({ type: DashboardMap.GET_USER_COUNT_ERROR, payload: data }),
}