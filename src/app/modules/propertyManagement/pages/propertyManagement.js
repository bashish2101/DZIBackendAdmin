import React, { useEffect, useRef, useState } from "react";
import PropertyManagementTable from "./propertyManagementTable";
import Select from "react-select";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  Card,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";
import { PropertyManagementActions } from "../redux";
import { getAllPropertyDetailsAsync } from "../redux";
import { Link } from "react-router-dom";
import { PropertyManagementMap } from "../redux/propertyManagementAction"


export const PropertyManagement = () => {

  const [dropDownValue, setDropDownValue] = useState({
    value: "",
    label: "All",
  });

  const dispatch = useDispatch();
  const searchPropertyRef = useRef();
  const {
    refreshpropertyDetailsList,
    searchBy,
    dir,
    searchStatus,
    searchText,
  } = useSelector((state) => state.propertyManagement, shallowEqual);
  const state = useSelector((state) => state, shallowEqual);

  const onSearchTextChange = (e) => {

    dispatch(PropertyManagementActions.searchTextChange(e.target.value));
  };
  const handleChange = (e) => {
    setDropDownValue(e);
    dispatch(PropertyManagementActions.searchStatusChange(e.value));
  };

  useEffect(() => {
    if (searchPropertyRef.current) {
      let keyPressEvent = (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          dispatch(PropertyManagementActions.refreshPropertyList());
        }
      };
      let input = searchPropertyRef.current;
      input.addEventListener("keyup", keyPressEvent);

      return () => {
        input.removeEventListener("keyup", keyPressEvent);
        dispatch(PropertyManagementActions.searchTextChange(""));
        input.value = "";
      };
    }
  }, []);

  useEffect(() => {
    if (refreshpropertyDetailsList) {
      dispatch(
        getAllPropertyDetailsAsync(searchBy, searchText, searchStatus, dir)
      );
    }
  }, [refreshpropertyDetailsList]);

  useEffect(()=> {
    return () => dispatch({ type: PropertyManagementMap.RESET_FILTERS })
  },[])
  

  const dropdownOption = [
    { value: "", label: "All" },
    {
      value: "OFFICE",
      label: "OFFICE",
    }, {
      value: "RESIDENTIAL",
      label: "RESIDENTIAL",
    }, {
      value: "HOTEL",
      label: "HOTEL",
    }, {
      value: "MUSEUM",
      label: "MUSEUM",
    }, {
      value: "SHOP",
      label: "SHOP",
    }
  ];
  return (
    <>
      <Card>
        <CardHeader title="Property Management">
          <CardHeaderToolbar>
            <div className="d-flex flex-wrap ap_filter_wraper justify-content-end align-items-center">
              <form
                className="subheader_filter"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="form-row">
                  <div className="form-group mr-5 mb-1 mt-3">
                    <Link
                      to="/add-property"
                      className="btn_new btn-sm"
                    >
                      Add
                    </Link>
                  </div>
                  <div className="form-group mr-3 mb-1">
                    <Select
                      value={dropDownValue}
                      placeholder="Select Template"
                      className={`form-control border-0 p-0 w-150px `}
                      classNamePrefix="phoSelect"
                      options={dropdownOption}
                      onChange={(e) => handleChange(e)}
                      theme={(theme) => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: "#DCF4E4",
                          primary75: "#DCF4E4",
                          primary50: "#DCF4E4",
                          primary: "#50C878",
                        },
                      })}
                    />
                  </div>
                  <div className="form-group mr-3 mb-1">
                    <input
                      name="Search"
                      placeholder="Search. . ."
                      type="text"
                      className="form-control"
                      value={searchText}
                      onChange={onSearchTextChange}
                      ref={searchPropertyRef}
                    />
                  </div>
                </div>
              </form>
            </div>
          </CardHeaderToolbar>
        </CardHeader>
        <PropertyManagementTable />
      </Card>
    </>
  );
};
