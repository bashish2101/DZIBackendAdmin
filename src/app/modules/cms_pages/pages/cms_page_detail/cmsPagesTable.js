import React from "react";
import { Table } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import CircularProgress from "@material-ui/core/CircularProgress";
import { deleteCMSAsync } from "../../redux/cmsApi";
import { useDispatch } from "react-redux";

const CmsPagesTable = ({ cmsLists, onSelectCMS, onDeleteClick, isLoading }) => {
  const dispatch = useDispatch();

  const onActivateClick = (cmsList) => {
    dispatch(deleteCMSAsync(cmsList._id));
  };

  return (
    <>
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
                    <th>CMS Name</th>
                    <th>Status</th>
                    <th className="wd-120">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cmsLists.length
                    ? cmsLists.map((cmsList, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <span className="f-w-500">{cmsList.CMSName}</span>
                          </td>
                          <td>
                            <span
                              className={`f-w-500 ${cmsList.status === "INACTIVE"
                                  ? "label label-lg label-light-danger label-inline"
                                  : "label label-lg label-light-success label-inline"
                                }`}
                            >
                              {cmsList.status}
                            </span>
                          </td>
                          <td>
                            <a
                              title="Edit"
                              className="btn btn-icon btn-light btn-hover-primary btn-sm mr-3"
                              onClick={() => onSelectCMS(cmsList)}
                            >
                              <span className="svg-icon svg-icon-md svg-icon-primary">
                                <SVG
                                  src={toAbsoluteUrl(
                                    "/media/svg/icons/Communication/Write.svg"
                                  )}
                                />
                              </span>
                            </a>
                            {cmsList.status === "ACTIVE" ? (
                              <a
                                title="Delete"
                                className="btn btn-icon btn-light btn-hover-danger btn-sm"
                                onClick={() => onDeleteClick(cmsList)}
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
                                onClick={() => onActivateClick(cmsList)}
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
                    : null}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CmsPagesTable;
