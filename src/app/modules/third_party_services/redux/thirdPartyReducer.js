
import { ThirdPartyMap } from './thirdPartyAction';

const initialState = {
    isLoading: false,
    allServiceList: [],
    refreshServiceList: true, 
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ThirdPartyMap.DELETE_SERVICE_START:
        case ThirdPartyMap.UPDATE_SERVICE_START:
        case ThirdPartyMap.GET_ALL_SERVICES_START:
        case ThirdPartyMap.CREATE_SERVICE_START: {
            return {
                ...state,
                isLoading: true
            }
        }
        case ThirdPartyMap.CREATE_SERVICE_SUCCESS: {
            return {
                ...state,
                refreshServiceList: true,
            }
        }
        case ThirdPartyMap.DELETE_SERVICE_ERROR:
        case ThirdPartyMap.UPDATE_SERVICE_ERROR:
        case ThirdPartyMap.GET_ALL_SERVICES_ERROR:
        case ThirdPartyMap.CREATE_SERVICE_ERROR: {
            return {
                ...state,
                isLoading: false
            }
        }
        case ThirdPartyMap.GET_ALL_SERVICES_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                allServiceList: action.payload,
                refreshServiceList: false
            }
        }
        case ThirdPartyMap.DELETE_SERVICE_SUCCESS:
        case ThirdPartyMap.UPDATE_SERVICE_SUCCESS: {
            return {
                ...state,
                refreshServiceList: true,
            }
        }
        default: return { ...state }
    }
}   