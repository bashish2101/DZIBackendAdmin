import { PropertyManagementMap } from "./propertyManagementAction";

const initialState = {
  isLoading: false,
  propertyDetails: {},
  refreshpropertyDetailsList: true,
  searchBy: "",
  searchText: "",
  searchStatus: "",
  skip: 0,
  column: "",
  dir: "",
  limit: 10,
  addProperty: false,
  updateProperty: false,
  selectedProperty: {}
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PropertyManagementMap.GET_ALL_PROPERTY_DETAIL_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case PropertyManagementMap.GET_ALL_PROPERTY_DETAIL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        propertyDetails: action.payload,
        refreshpropertyDetailsList: false,
      };
    }
    case PropertyManagementMap.GET_ALL_PROPERTY_DETAIL_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshpropertyDetailsList: false,
      };
    }
    case PropertyManagementMap.SEARCH_TEXT_CHANGE: {
      return {
        ...state,
        searchText: action.payload,
      };
    }
    case PropertyManagementMap.SEARCH_STATUS_CHANGE: {
      return {
        ...state,
        searchStatus: action.payload,
        searchBy: "",
        skip: 0,
        refreshpropertyDetailsList: true,
      };
    }
    case PropertyManagementMap.SET_PROPERTY_DETAIL_BATCH_NUMBER: {
      return {
        ...state,
        skip: action.payload,
        refreshpropertyDetailsList: true,
      };
    }
    case PropertyManagementMap.REFRESH_PROPERTY_DETAILS_LIST: {
      return {
        ...state,
        skip: 0,
        refreshpropertyDetailsList: true,
      };
    }
    case PropertyManagementMap.SET_SORT_CHANGE: {
      return {
        ...state,
        searchBy: action.payload?.column,
        dir: action.payload?.dir,
        refreshpropertyDetailsList: true,
      };
    }
    case PropertyManagementMap.ADD_PROPERTY_START: {
      return {
        ...state,
        addProperty: true,
      };
    }
    case PropertyManagementMap.ADD_PROPERTY_SUCCESS: {
      return {
        ...state,
        addProperty: false,
        refreshpropertyDetailsList: true,
      };
    }
    case PropertyManagementMap.ADD_PROPERTY_ERROR: {
      return {
        ...state,
        addProperty: false,
      };
    }
    case PropertyManagementMap.UPDATE_PROPERTY_START: {
      return {
        ...state,
        updateProperty: true,
      };
    }
    case PropertyManagementMap.UPDATE_PROPERTY_SUCCESS: {
      return {
        ...state,
        updateProperty: false,
        refreshpropertyDetailsList: true,
      };
    }
    case PropertyManagementMap.UPDATE_PROPERTY_ERROR: {
      return {
        ...state,
        updateProperty: false,
      };
    }
    case PropertyManagementMap.RESET_FILTERS: {
      return {
        ...state,
        propertyDetails: {},
        searchBy: "",
        searchText: "",
        searchStatus: "",
        skip: 0,
        column: "",
        dir: "",
        limit: 10,
        refreshpropertyDetailsList: true,
      };
    }
    case PropertyManagementMap.DELETE_PROPERTY_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case PropertyManagementMap.DELETE_PROPERTY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshpropertyDetailsList: true,
      };
    }
    case PropertyManagementMap.DELETE_PROPERTY_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case PropertyManagementMap.SET_SELECTED_PROPERTY: {
      return {
        ...state,
        isLoading: false,
        selectedProperty: action.payload,
      };
    }
    default:
      return { ...state };
  }
};
