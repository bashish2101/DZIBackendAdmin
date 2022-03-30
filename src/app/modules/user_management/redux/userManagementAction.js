export const UserManagementMap = {
  GET_ALL_USER_START: "GET_ALL_USER_START",
  GET_ALL_USER_SUCCESS: "GET_ALL_USER_SUCCESS",
  GET_ALL_USER_ERROR: "GET_ALL_USER_ERROR",
  CREATE_USER_START: "CREATE_USER_START",
  CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
  CREATE_USER_ERROR: "CREATE_USER_ERROR",
  UPDATE_USER_START: "UPDATE_USER_START",
  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
  UPDATE_USER_ERROR: "UPDATE_USER_ERROR",
  DELETE_USER_START: "DELETE_USER_START",
  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_ERROR: "DELETE_USER_ERROR",
  REMOVE_ACTIVITY_START: "REMOVE_ACTIVITY_START",
  REMOVE_ACTIVITY_SUCCESS: "REMOVE_ACTIVITY_SUCCESS",
  REMOVE_ACTIVITY_ERROR: "REMOVE_ACTIVITY_ERROR",
  REMOVE_ALL_ACTIVITIES_START: "REMOVE_ALL_ACTIVITIES_START",
  REMOVE_ALL_ACTIVITIES_SUCCESS: "REMOVE_ALL_ACTIVITIES_SUCCESS",
  REMOVE_ALL_ACTIVITIES_ERROR: "REMOVE_ALL_ACTIVITIES_ERROR",
  GET_ALL_ACTIVITY_START: "GET_ALL_ACTIVITY_START",
  GET_ALL_ACTIVITY_SUCCESS: "GET_ALL_ACTIVITY_SUCCESS",
  GET_ALL_ACTIVITY_ERROR: "GET_ALL_ACTIVITY_ERROR",
  SELECT_USER_DETAILS: "SELECT_USER_DETAILS",
  COUNTRY_FILTERS: "COUNTRY_FILTERS",
  APPLY_FILTERS: "APPLY_FILTERS",
  SEARCH_TEXT_CHANGE: "SEARCH_TEXT_CHANGE",
  REFRESH_USER_LIST: "REFRESH_USER_LIST",
  SET_USER_BATCH_NUMBER: "SET_USER_BATCH_NUMBER",
  SET_ACTIVITIES_BATCH_NUMBER: "SET_ACTIVITIES_BATCH_NUMBER",
  SET_SORT_CHANGE: "SET_SORT_CHANGE",
};

export const UserManagementActions = {
  getAllUserStart: (data) => ({
    type: UserManagementMap.GET_ALL_USER_START,
    payload: data,
  }),
  getAllUserSuccess: (data) => ({
    type: UserManagementMap.GET_ALL_USER_SUCCESS,
    payload: data,
  }),
  getAllUserError: (errors) => ({
    type: UserManagementMap.GET_ALL_USER_ERROR,
    payload: { errors },
  }),

  createUserStart: (data) => ({
    type: UserManagementMap.CREATE_USER_START,
    payload: data,
  }),
  createUserSuccess: (data) => ({
    type: UserManagementMap.CREATE_USER_SUCCESS,
    payload: data,
  }),
  createUserError: (errors) => ({
    type: UserManagementMap.CREATE_USER_ERROR,
    payload: { errors },
  }),

  updateUserStart: (data) => ({
    type: UserManagementMap.UPDATE_USER_START,
    payload: data,
  }),
  updateUserSuccess: (data) => ({
    type: UserManagementMap.UPDATE_USER_SUCCESS,
    payload: data,
  }),
  updateUserError: (errors) => ({
    type: UserManagementMap.UPDATE_USER_ERROR,
    payload: { errors },
  }),

  deleteUserStart: (data) => ({
    type: UserManagementMap.DELETE_USER_START,
    payload: data,
  }),
  deleteUserSuccess: (data) => ({
    type: UserManagementMap.DELETE_USER_SUCCESS,
    payload: data,
  }),
  deleteUserError: (errors) => ({
    type: UserManagementMap.DELETE_USER_ERROR,
    payload: { errors },
  }),

  removeActivityStart: (data) => ({
    type: UserManagementMap.REMOVE_ACTIVITY_START,
    payload: data,
  }),
  removeActivitySuccess: (data) => ({
    type: UserManagementMap.REMOVE_ACTIVITY_SUCCESS,
    payload: data,
  }),
  removeActivityError: (errors) => ({
    type: UserManagementMap.REMOVE_ACTIVITY_ERROR,
    payload: { errors },
  }),

  removeAllActivitiesStart: (data) => ({
    type: UserManagementMap.REMOVE_ALL_ACTIVITIES_START,
    payload: data,
  }),
  removeAllActivitiesSuccess: (data) => ({
    type: UserManagementMap.REMOVE_ALL_ACTIVITIES_SUCCESS,
    payload: data,
  }),
  removeAllActivitiesError: (errors) => ({
    type: UserManagementMap.REMOVE_ALL_ACTIVITIES_ERROR,
    payload: { errors },
  }),

  setSelectedUser: (data) => ({
    type: UserManagementMap.SELECT_USER_DETAILS,
    payload: data,
  }),

  countryFilters: (data) => ({
    type: UserManagementMap.COUNTRY_FILTERS,
    payload: data,
  }),
  applyFilters: (data) => ({
    type: UserManagementMap.APPLY_FILTERS,
    payload: data,
  }),
  refreshUserList: () => ({ type: UserManagementMap.REFRESH_USER_LIST }),
  searchTextChange: (data) => ({
    type: UserManagementMap.SEARCH_TEXT_CHANGE,
    payload: data,
  }),

  getAllActivityStart: (data) => ({
    type: UserManagementMap.GET_ALL_ACTIVITY_START,
    payload: data,
  }),
  getAllActivitySuccess: (data) => ({
    type: UserManagementMap.GET_ALL_ACTIVITY_SUCCESS,
    payload: data,
  }),
  getAllActivityError: (errors) => ({
    type: UserManagementMap.GET_ALL_ACTIVITY_ERROR,
    payload: { errors },
  }),

  setUserBatchNumber: (data) => ({
    type: UserManagementMap.SET_USER_BATCH_NUMBER,
    payload: data,
  }),
  setActivitiesBatchNumber: (data) => ({
    type: UserManagementMap.SET_ACTIVITIES_BATCH_NUMBER,
    payload: data,
  }),

  setSort: (data) => ({
    type: UserManagementMap.SET_SORT_CHANGE,
    payload: data,
  }),
};
