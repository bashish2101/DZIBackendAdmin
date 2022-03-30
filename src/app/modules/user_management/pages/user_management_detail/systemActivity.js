import React, { useState, useMemo, useEffect } from "react";
import { Table, Modal } from "react-bootstrap";
import {
  removeAllActivitiesAsync,
  removeActivityAsync,
  getAllUserActivitiesAsync,
} from "../../redux/userManagementApi";
import { UserManagementActions } from "../../redux";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BasicPagination from "../../../pagination/BasicPagination";
import CircularProgress from "@material-ui/core/CircularProgress";

const SystemActivity = (props) => {
  const {
    selectedUser,
    refreshActivities,
    activityList,
    activitySkip,
    activityLimit,
    isLoading,
  } = useSelector((state) => state.userManagement, shallowEqual);
  const dispatch = useDispatch();

  const onPageChange = (currentBatch) => {
    let count = currentBatch ? currentBatch - 1 : activitySkip;
    dispatch(UserManagementActions.setActivitiesBatchNumber(count));
  };

  const [selectedActivityId, setselectedActivityId] = useState();

  const [filterActivity, setFilterActivity] = useState("");

  const [DeleteActivity, setDeleteActivity] = useState(false);
  const deleteClose = () => setDeleteActivity(false);
  const deleteShow = () => setDeleteActivity(true);

  const [DeleteAllActivity, setDeleteAllActivity] = useState(false);
  const deleteAllClose = () => setDeleteAllActivity(false);
  const deleteAllShow = () => setDeleteAllActivity(true);

  useEffect(() => {
    if (refreshActivities && selectedUser) {
      dispatch(getAllUserActivitiesAsync(selectedUser._id));
    }
  }, [refreshActivities]);

  const onRemoveClick = (id) => {
    setselectedActivityId(id);
    deleteShow();
  };
  const onRemoveActivity = () => {
    dispatch(removeActivityAsync(selectedUser._id, selectedActivityId));
    deleteClose();
  };

  const onRemoveAllActivity = () => {
    dispatch(removeAllActivitiesAsync(selectedUser._id));
    deleteAllClose();
  };

  // let filterActivites = useMemo(
  //   () =>
  //     activityList &&
  //     activityList.loginActivity &&
  //     activityList.loginActivity.filter((activity) => {
  //       if (filterActivity === "") {
  //         return true;
  //       }
  //       if (filterActivity === "ACTIVE" && filterActivity === activity.status) {
  //         return true;
  //       }
  //       if (
  //         filterActivity === "INACTIVE" &&
  //         filterActivity === activity.status
  //       ) {
  //         return true;
  //       }
  //       return false;
  //     }),
  //   [activityList.loginActivity, filterActivity]
  // );

  return (
    <>
      <div className="row">
        <div className="col-md-12 d-flex justify-content-end db_1400">
          <button
            type="button"
            className="actn_btn rmv_btn rmv_btn_drk active my-3"
            onClick={() => deleteAllShow()}
            style={{ alignContent: "right" }}
          >
            Remove all activities
          </button>
        </div>

        <div className="col-md-12">
          <div className="ovflhddn">
            <div className="tblmrgn mt-0">
              <Table
                hover
                responsive
                className="mb-0 default_table with_hoverbtn mrpdng_tbl"
              >
                <thead>
                  <tr>
                    <th>Sr.no</th>
                    <th className="wd-120">Login time</th>
                    <th className="wd-120">Logout time</th>
                    <th>Device</th>
                    <th>Browser</th>
                    <th>IP Address</th>
                    <th>Country</th>
                    <th>State</th>
                    <th className="wd-120">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {activityList &&
                  activityList.records &&
                  activityList.records.length ? (
                    activityList.records.map((List, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <span className="f-w-500">
                              {activitySkip * activityLimit + (index + 1)}
                            </span>
                          </td>
                          <td>
                            <span className="fn_s_14">
                              {new Date(List.date).toLocaleString()}
                            </span>
                          </td>
                          <td>
                            {List.isLoggedOut && List.loggedOutAt ? (
                              <span className="fn_s_14">
                                {new Date(List.loggedOutAt).toLocaleString()}
                              </span>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td>
                            <span className="f-w-500">{List.device}</span>
                          </td>
                          <td>{List.browser}</td>
                          <td>{List.ipaddress}</td>
                          <td>{List.country}</td>
                          <td>{List.state}</td>

                          <td>
                            <button
                              className="actn_btn rmv_btn rmv_btn_drk active"
                              onClick={() => onRemoveClick(List._id)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={8}>No Record Found</td>
                    </tr>
                  )}
                  {isLoading && (
                    <tr>
                      <td colSpan={8} className="text-center p-0 border-0">
                        <div className="basic-verification-loader text-center">
                          <CircularProgress />
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
            {!isLoading && (
              <div className="row d-flex align-items-center mr-5 ml-5 mt-4">
                <div className="col-md-8 text-right mb-5 aspgntn">
                  <BasicPagination
                    totalRecords={activityList.recordsTotal}
                    limit={activityLimit}
                    batch={activitySkip + 1}
                    onBatchChange={onPageChange}
                  />
                </div>
                <div className="col-md-4 mb-5 fn_s_16 f-w-400 text-right">
                  Displaying {activitySkip * activityLimit + 1} -{" "}
                  {activitySkip * activityLimit + activityLimit} of{" "}
                  {activityList.recordsTotal} Records
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        show={DeleteActivity}
        onHide={deleteClose}
        centered
        className="def_modal delete_modal"
      >
        <Modal.Header>
          <Modal.Title className="fn_s_18 color_blk f-w-700">Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form def_form frmwtpddng">
            <p className="fn_s_18 f-w-400 text-center mb-10">
              Are you sure want to remove this activity?
            </p>
            <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0">
              <button
                type="button"
                className="btn btn-def btn_pdng mr-3"
                onClick={deleteClose}
              >
                Keep
              </button>
              <button
                type="button"
                className="btn btn-delete btn_pdng"
                onClick={onRemoveActivity}
              >
                Yes, Remove
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal
        show={DeleteAllActivity}
        onHide={deleteAllClose}
        centered
        className="def_modal delete_modal"
      >
        <Modal.Header>
          <Modal.Title className="fn_s_18 color_blk f-w-700">Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form def_form frmwtpddng">
            <p className="fn_s_18 f-w-400 text-center mb-10">
              Are you sure want to remove all the activities?
            </p>
            <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0">
              <button
                type="button"
                className="btn btn-def btn_pdng mr-3"
                onClick={deleteAllClose}
              >
                Keep
              </button>
              <button
                type="button"
                className="btn btn-delete btn_pdng"
                onClick={onRemoveAllActivity}
              >
                Yes, Remove
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SystemActivity;
