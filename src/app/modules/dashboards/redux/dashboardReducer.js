import { DashboardMap } from './dashboardAction';

const initState = {
    userCountLoader: false,
    userCountData: {},
}

export function reducer(state = initState, action) {
    switch (action.type) {
        case DashboardMap.GET_USER_COUNT_START: {
            return {
                ...state,
                userCountLoader: true,
            }
        }
        case DashboardMap.GET_USER_COUNT_SUCCESS: {
            return {
                ...state,
                userCountLoader: false,
                userCountData: action.payload
            }
        }
        case DashboardMap.GET_USER_COUNT_ERROR: {
            return {
                ...state,
                userCountLoader: false,
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}