export const ThirdPartyMap = {
    CREATE_SERVICE_START: 'CREATE_SERVICE_START',
    CREATE_SERVICE_SUCCESS: 'CREATE_SERVICE_SUCCESS',
    CREATE_SERVICE_ERROR: 'CREATE_SERVICE_ERROR',
    GET_ALL_SERVICES_START: 'GET_ALL_SERVICES_START',
    GET_ALL_SERVICES_SUCCESS: 'GET_ALL_SERVICES_SUCCESS',
    GET_ALL_SERVICES_ERROR: 'GET_ALL_SERVICES_ERROR',
    UPDATE_SERVICE_START: 'UPDATE_SERVICE_START',
    UPDATE_SERVICE_SUCCESS: 'UPDATE_SERVICE_SUCCESS',
    UPDATE_SERVICE_ERROR: 'UPDATE_SERVICE_ERROR',
    DELETE_SERVICE_START: 'DELETE_SERVICE_START',
    DELETE_SERVICE_SUCCESS: 'DELETE_SERVICE_SUCCESS',
    DELETE_SERVICE_ERROR: 'DELETE_SERVICE_ERROR',
}

export const ThirdPartyActions = {
    createServiceStart: () => ({ type: ThirdPartyMap.CREATE_SERVICE_START }),
    createServiceSuccess: (data) => ({ type: ThirdPartyMap.CREATE_SERVICE_SUCCESS, payload: data }),
    createServiceError: (errors) => ({ type: ThirdPartyMap.CREATE_SERVICE_ERROR, payload: { errors } }),

    getAllServicesStart: () => ({ type: ThirdPartyMap.GET_ALL_SERVICES_START }),
    getAllServicesSuccess: (data) => ({ type: ThirdPartyMap.GET_ALL_SERVICES_SUCCESS, payload: data }),
    getAllServicesError: (errors) => ({ type: ThirdPartyMap.GET_ALL_SERVICES_ERROR, payload: { errors } }),

    updateServiceStart: () => ({ type: ThirdPartyMap.UPDATE_SERVICE_START }),
    updateServiceSuccess: (data) => ({ type: ThirdPartyMap.UPDATE_SERVICE_SUCCESS, payload: data }),
    updateServiceError: (errors) => ({ type: ThirdPartyMap.UPDATE_SERVICE_ERROR, payload: { errors } }),

    deleteServiceStart: () => ({ type: ThirdPartyMap.DELETE_SERVICE_START }),
    deleteServiceSuccess: (data) => ({ type: ThirdPartyMap.DELETE_SERVICE_SUCCESS, payload: data }),
    deleteServiceError: (errors) => ({ type: ThirdPartyMap.DELETE_SERVICE_ERROR, payload: { errors } }),
}  