import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Table } from "react-bootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import { UserManagementActions } from "../../redux";
import BasicPagination from "../../../pagination/BasicPagination";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import SVG from "react-inlinesvg";
import { deleteUserAsync } from "../../redux";

const UserManagementTable = ({ onUserDetailsClick }) => {
  const [DeleteModal, setDeleteModal] = useState(false);
  const deleteClose = () => setDeleteModal(false);
  const deleteShow = () => setDeleteModal(true);

  const [selectedID, setSelectedID] = useState();

  const dispatch = useDispatch();

  const { isLoading, userList, skip, limit, dir, searchBy } = useSelector(
    (state) => state.userManagement,
    shallowEqual
  );

  const onDeleteClick = (id) => {
    setSelectedID(id);
    deleteShow();
  };

  const onDeactiveClick = () => {
    dispatch(deleteUserAsync(selectedID._id));
    setSelectedID({});
    deleteClose();
  };

  const onActivateClick = (userLists) => {
    dispatch(deleteUserAsync(userLists._id));
  };

  const onPageChange = (currentBatch) => {
    let count = currentBatch ? currentBatch - 1 : skip;
    dispatch(UserManagementActions.setUserBatchNumber(count));
  };

  const handleSort = (column, dir) => {
    dispatch(UserManagementActions.setSort({ column, dir }));
  };

  return (
    <div className="px-6 pt-0 dash_wt_bx pb-0 ovflhddn loader-display-position">
      <div className="tblmrgn mt-0">
        <div className="mt-5">
          <div>
            <Table
              hover
              responsive
              id="myTable"
              className="mb-0 default_table with_hoverbtn mrpdng_tbl"
            >
              <thead>
                <tr>
                  <th>Sr.no</th>
                  
                  <th
                    onClick={() =>
                      handleSort(
                        "name",
                        dir === "" || dir === "dsc" ? "asc" : "dsc"
                      )
                    }
                  >
                    Name{" "}
                    {dir !== "" && searchBy === "name" && (
                      <span className="svg-icon svg-icon-sm svg-icon-primary ml-1">
                        {dir === "dsc" ? (
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/icons/Navigation/Down-2.svg"
                            )}
                          />
                        ) : (
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/icons/Navigation/Up-2.svg"
                            )}
                          />
                        )}
                      </span>
                    )}
                  </th>
                  <th>User Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Registered via</th>
                  <th>Status</th>
                  <th className="wd-120">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userList.records && userList.records.length ? (
                  userList.records.map((userLists, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <span className="f-w-500">
                            {skip * limit + (index + 1)}
                          </span>
                        </td>
                        <td>
                          <span className="f-w-500">{userLists.name}</span>
                        </td>
                        <td>{userLists.userName}</td>
                        <td>{userLists.contactNumber}</td>
                        <td>{userLists.emailId}</td>
                        <td>{userLists.registeredVia}</td>
                        {/* <td>
                          <span
                            className={`pmnt_btn ${
                              userLists.adminVerification === "REJECTED"
                                ? "label label-lg label-light-danger label-inline"
                                : "label label-lg label-light-info label-inline"
                            }`}
                          >
                            {userLists.adminVerification
                              ? userLists.adminVerification
                              : "PENDING"}
                          </span>
                        </td> */}
                        <td>
                          <span
                            className={`pmnt_btn ${userLists.status === "INACTIVE"
                                ? "label label-lg label-light-danger label-inline"
                                : "label label-lg label-light-success label-inline"
                              }`}
                          >
                            {userLists.status}
                          </span>
                        </td>
                        <td>
                          {/* <a
                            title="Edit"
                            className="btn btn-icon btn-light btn-hover-primary btn-sm mr-3"
                            onClick={() => onUserDetailsClick(userLists)}
                          >
                            <span className="svg-icon svg-icon-md svg-icon-primary">
                              <SVG
                                src={toAbsoluteUrl(
                                  "/media/svg/icons/Communication/Write.svg"
                                )}
                              />
                            </span>
                          </a> */}
                          {userLists.status === "ACTIVE" ? (
                            <a
                              title="Delete"
                              className="btn btn-icon btn-light btn-hover-danger btn-sm"
                              onClick={() => onDeleteClick(userLists)}
                            >
                              <span className="svg-icon svg-icon-md svg-icon-danger">
                                <SVG
                                  src={toAbsoluteUrl(
                                    "/media/svg/icons/General/Trash.svg"
                                  )}
                                />
                              </span>
                            </a>
                          ) : (
                            <a
                              title="Delete"
                              className="btn btn-icon btn-light btn-hover-danger btn-sm"
                              onClick={() => onActivateClick(userLists)}
                            >
                              <span className="svg-icon svg-icon-md svg-icon-danger">
                                <SVG
                                  src={toAbsoluteUrl(
                                    "/media/svg/icons/Text/Undo.svg"
                                  )}
                                />
                              </span>
                            </a>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center">
                      No Record Found
                    </td>
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
                  totalRecords={userList.recordsTotal}
                  limit={limit}
                  batch={skip + 1}
                  onBatchChange={onPageChange}
                />
              </div>
              <div className="col-md-4 mb-5 fn_s_16 f-w-400 text-right">
                Displaying {skip * limit + 1} - {skip * limit + limit} of{" "}
                {userList.recordsTotal} Records
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        show={DeleteModal}
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
              Are you sure want to delete?
            </p>
            <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0">
              <div className="form-group mr-5 mb-1 mt-2">
                <button
                  className="btn_new btn-sm"
                  type="button"
                  onClick={deleteClose}
                >
                  Close
                </button>
              </div>
              <div className="form-group mr-5 mb-1 mt-2">
                <button
                  className="btn_new btn-sm"
                  type="button"
                  onClick={onDeactiveClick}
                >
                  Yes, Deactivate
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserManagementTable;
