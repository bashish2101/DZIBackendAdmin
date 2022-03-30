import { UserManagementMap } from "./userManagementAction";

const initialState = {
  isLoading: false,
  userList: {},
  activityList: {},
  refreshUserList: true,
  refreshActivities: true,
  selectedUser: {},
  country: "",
  minDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
  maxDate: new Date(),
  searchBy: "",
  searchText: "",
  activitySkip: 0,
  activityLimit: 10,
  skip: 0,
  limit: 10,
  dir: "",
  reDirect: false,
  defaultPassword: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UserManagementMap.GET_ALL_USER_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserManagementMap.GET_ALL_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userList: action.payload,
        refreshUserList: false,
        refreshActivities: true,
      };
    }
    case UserManagementMap.GET_ALL_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshUserList: false,
      };
    }
    case UserManagementMap.CREATE_USER_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserManagementMap.CREATE_USER_SUCCESS: {
      return {
        ...state,
        refreshUserList: true,
        reDirect: true,
      };
    }
    case UserManagementMap.CREATE_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserManagementMap.UPDATE_USER_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserManagementMap.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshUserList: true,
        refreshActivities: true,
        selectedUser: {
          ...state.selectedUser,
          ...action.payload,
        },
        reDirect: true,
      };
    }
    case UserManagementMap.UPDATE_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserManagementMap.DELETE_USER_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserManagementMap.DELETE_USER_SUCCESS: {
      return {
        ...state,
        refreshUserList: true,
        selectedUser: null,
      };
    }
    case UserManagementMap.DELETE_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserManagementMap.SET_DEFAULT_PASSWORD_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserManagementMap.SET_DEFAULT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserManagementMap.SET_DEFAULT_PASSWORD_ERROR: {
      return {
        ...state,
      };
    }
    case UserManagementMap.GET_DEFAULT_PASSWORD_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserManagementMap.GET_DEFAULT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isLoading: true,
        defaultPassword: action.payload.defaultPassword,
      };
    }
    case UserManagementMap.GET_DEFAULT_PASSWORD_ERROR: {
      return {
        ...state,
      };
    }
    case UserManagementMap.REMOVE_ALL_ACTIVITIES_START: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case UserManagementMap.REMOVE_ALL_ACTIVITIES_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserManagementMap.SELECT_USER_DETAILS: {
      return {
        ...state,
        selectedUser: action.payload,
        refreshActivities: true,
        reDirect: false,
      };
    }
    case UserManagementMap.REMOVE_ACTIVITY_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserManagementMap.REMOVE_ACTIVITY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshActivities: true,
      };
    }
    case UserManagementMap.REMOVE_ACTIVITY_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserManagementMap.REMOVE_ALL_ACTIVITIES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshActivities: true,
        selectedUser: {
          ...state.selectedUser,
          ...action.payload,
        },
      };
    }
    case UserManagementMap.APPLY_FILTERS:
    case UserManagementMap.COUNTRY_FILTERS: {
      return {
        ...state,
        ...action.payload,
        refreshUserList: true,
        refreshActivities: true,
        searchText: "",
        skip: initialState.skip,
        limit: initialState.limit,
      };
    }
    case UserManagementMap.SEARCH_TEXT_CHANGE: {
      return {
        ...state,
        searchText: action.payload,
      };
    }
    case UserManagementMap.REFRESH_USER_LIST: {
      return {
        ...state,
        skip: 0,
        refreshUserList: true,
      };
    }
    case UserManagementMap.SET_USER_BATCH_NUMBER: {
      return {
        ...state,
        skip: action.payload,
        refreshUserList: true,
      };
    }

    case UserManagementMap.SET_ACTIVITIES_BATCH_NUMBER: {
      return {
        ...state,
        activitySkip: action.payload,
        refreshActivities: true,
      };
    }

    case UserManagementMap.GET_ALL_ACTIVITY_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserManagementMap.GET_ALL_ACTIVITY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        activityList: action.payload,
        refreshActivities: false,
      };
    }
    case UserManagementMap.GET_ALL_ACTIVITY_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshActivities: false,
      };
    }
    case UserManagementMap.SET_SORT_CHANGE: {
      return {
        ...state,
        searchBy: action.payload?.column,
        dir: action.payload?.dir,
        refreshUserList: true,
        refreshActivities: true,
      };
    }
    default:
      return { ...state };
  }
};
