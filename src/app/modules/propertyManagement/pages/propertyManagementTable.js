import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import { Table, Modal } from "react-bootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";
import {
  getAllPropertyDetailsAsync,
  PropertyManagementActions,
  deletePropertyAsync
} from "../redux";
import BasicPagination from "../../pagination/BasicPagination";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";

const PropertyManagementTable = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [selectedProperty, setSelectedProperty] = useState({});
  const [DetailsModal, setDetailsModal] = useState(false);

  const [DeleteModal, setDeleteModal] = useState(false);
  const deleteClose = () => setDeleteModal(false);
  const deleteShow = () => setDeleteModal(true);

  const [selectedID, setSelectedID] = useState();

  const {
    isLoading,
    propertyDetails,
    skip,
    limit,
    dir,
    isPropertyLoading,
    searchBy,
  } = useSelector((state) => state.propertyManagement, shallowEqual);

  const DetailsClose = () => setDetailsModal(false);
  const DetailsShow = (propertyDetail) => {
    setSelectedProperty(propertyDetail);
    setDetailsModal(true);
  }

  const onPageChange = (currentBatch) => {
    let count = currentBatch ? currentBatch - 1 : skip;
    dispatch(PropertyManagementActions.setPropertyDetailBatchNumber(count));
  }

  const handleSort = (column, dir) => {
    dispatch(PropertyManagementActions.setSort({ column, dir }));
  }

  const onDeleteClick = (propertyDetails) => {
    setSelectedID(propertyDetails);
    deleteShow();
  }

  const onDeactiveClick = () => {
    dispatch(deletePropertyAsync(selectedID._id));
    setSelectedID("");
    deleteClose();
  }

  const onActivateClick = (propertyDetails) => {
    dispatch(deletePropertyAsync(propertyDetails._id));
  }

  const onEditClick = (propertyDetails) => {
    dispatch(PropertyManagementActions.setSelectedProperty(propertyDetails));
    history.push(`/property-management/edit-property/${propertyDetails?._id}`);
  };


  return (

    <div className="px-6 pt-0 dash_wt_bx pb-0 ovflhddn loader-display-position">
      <div className="tblmrgn mt-0">
        <div className="mt-5">
          <div>
            <Table
              hover
              responsive
              className="mb-0 default_table with_hoverbtn mrpdng_tbl"
            >
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th
                    onClick={() =>
                      handleSort(
                        "propertyName",
                        dir === "" || dir === "dsc" ? "asc" : "dsc"
                      )
                    }
                  >
                    Property Name{" "}
                    {dir !== "" && searchBy === "propertyName" && (
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
                  <th>Property type</th>
                  <th>Property status</th>
                  <th>NFT code</th>
                  <th>Status</th>
                  <th width="180px">Action</th>
                </tr>
              </thead>
              <tbody>
                {propertyDetails.records && propertyDetails.records.length ? (
                  propertyDetails.records.map((propertyDetail, index) => (
                    <tr key={propertyDetail._id}>
                      <td>
                        <span className="f-w-500">
                          {skip * limit + (index + 1)}
                        </span>
                      </td>
                      <td>
                        <span className="f-w-500">{propertyDetail.propertyName}</span>
                      </td>
                      <td>
                        <span className="f-w-500">
                          {propertyDetail.propertyType}
                        </span>
                      </td>
                      <td>
                        <span className="f-w-500">
                          <span>
                            {propertyDetail.propertyStatus}
                          </span>
                        </span>
                      </td>
                      <td>
                        <span className="f-w-500">
                          <span>
                            {propertyDetail.nftCode}
                          </span>
                        </span>
                      </td>
                      <td>
                        <span
                          className={`pmnt_btn ${propertyDetail.status === "INACTIVE"
                            ? "label label-lg label-light-danger label-inline"
                            : "label label-lg label-light-success label-inline"
                            }`}
                        >
                          {propertyDetail.status}
                        </span>
                      </td>
                      <td>
                        {propertyDetail.status === "ACTIVE" &&
                          <a
                            title="Edit"
                            className="btn btn-icon btn-light btn-hover-primary btn-sm mr-3"
                            onClick={() => onEditClick(propertyDetail)}
                          >
                            <span className="svg-icon svg-icon-md svg-icon-primary">
                              <SVG
                                src={toAbsoluteUrl(
                                  "/media/svg/icons/Communication/Write.svg"
                                )}
                              />
                            </span>
                          </a>}
                        <a
                          title="View"
                          className="btn btn-icon btn-light btn-hover-success btn-sm mr-3"
                          onClick={() => DetailsShow(propertyDetail)}
                        >
                          <span className="svg-icon svg-icon-md svg-icon-success">
                            <SVG
                              src={toAbsoluteUrl(
                                "/media/svg/icons/custom/eye.svg"
                              )}
                            />
                          </span>
                        </a>
                        {propertyDetail.status === "ACTIVE" ? (
                          <a
                            title="Delete"
                            className="btn btn-icon btn-light btn-hover-danger btn-sm"
                            onClick={() => onDeleteClick(propertyDetail)}
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
                            title="Active"
                            className="btn btn-icon btn-light btn-hover-danger btn-sm"
                            onClick={() => onActivateClick(propertyDetail)}
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center">
                      No Property Found
                    </td>
                  </tr>
                )}
                {isLoading && (
                  <tr>
                    <td colSpan={8} className="text-center">
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
                  totalRecords={propertyDetails.recordsTotal}
                  limit={limit}
                  batch={skip + 1}
                  onBatchChange={onPageChange}
                />
              </div>
              <div className="col-md-4 mb-5 fn_s_16 f-w-400 text-right">
                Displaying {skip * limit + 1} - {skip * limit + limit} of{" "}
                {propertyDetails.recordsTotal} Records
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        show={DetailsModal}
        onHide={DetailsClose}
        centered
        size="lg"
        className="def_modal show_close_button"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fn_s_18 color_blk f-w-700">
            Property Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form def_form frmwtpddng">
            {selectedProperty.propertyIcon &&
              <div className="symbol symbol-60 symbol-xxl-100 align-self-start align-self-xxl-center">
                <div
                  className="symbol-label p-4 d-flex align-items-center justify-content-center"
                >
                  <img
                    src={selectedProperty?.propertyIcon}
                    alt="icon"
                    className="w-100 mw-100 mh-100"
                  />{" "}
                </div>
              </div>}
            <p className="fn_s_18 f-w-400 mb-3">
              <span className="text-muted">Property name:</span>{" "}
              {selectedProperty?.propertyName}
            </p>
            <p className="fn_s_18 f-w-400 mb-3">
              <span className="text-muted">Property type:</span>{" "}
              {selectedProperty?.propertyType}
            </p>
            <p className="fn_s_18 f-w-400 mb-3">
              <span className="text-muted">Property status:</span>
              {selectedProperty?.propertyStatus}
            </p>
            {/* <p className="fn_s_18 f-w-400 mb-3">
              <span className="text-muted">Property address:</span>
              {selectedProperty?.propertyAddress}
            </p> */}
            <p className="fn_s_18 f-w-400 mb-3">
              <span className="text-muted">NFT code:</span>
              {selectedProperty?.nftCode}
            </p>
            <p className="fn_s_18 f-w-400 mb-3">
              <span className="text-muted">Base price:</span>
              {selectedProperty?.basePrice}
            </p>
            <p className="fn_s_18 f-w-400 mb-3">
              <span className="text-muted">Current bid:</span>
              {selectedProperty ? selectedProperty.currentBid : "-"}
            </p>

            {isPropertyLoading && (
              <div colSpan={8} className="text-center">
                <div className="basic-verification-loader text-center">
                  <CircularProgress />
                </div>
              </div>
            )}
          </form>
        </Modal.Body>
      </Modal>

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

export default PropertyManagementTable;
