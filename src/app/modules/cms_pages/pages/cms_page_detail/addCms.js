import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCMSAsync, updateCMSAsync } from "../../redux/cmsApi";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import CustomEditor from "../../../CustomEditor/CustomEditor";


const AddCMS = ({ selectedCMS, isLoading, reDirect }) => {

  const dispatch = useDispatch();

  const AddCMSFormSchema = () =>
    Yup.object().shape({
      CMSName: Yup.string()
        .trim()
        .min(3, "Minimum 2 characters")
        .max(50, "Maximum 50 characters")
        .required("CMS Name is required"),
      CMSPageDetails: Yup.string()
        .trim()
        .min(3, "Minimum 2 characters")
        .required("CMS Page Details is required"),
    });

  const formik = useFormik({
    initialValues: {
      CMSName: selectedCMS.CMSName || "",
      CMSPageDetails: selectedCMS.CMSPageDetails || "",
    },
    enableReinitialize: true,
    validationSchema: AddCMSFormSchema,
    onSubmit: (values) => {
      if (!selectedCMS.CMSName) {
        return dispatch(createCMSAsync(values));
      }
      if (selectedCMS.CMSName) {
        return dispatch(updateCMSAsync(selectedCMS._id, values));
      }
    },
  });

  const config = {
    allowedContent: true
  }

  if (reDirect) {
    return <Redirect to="/cms-pages" />;
  }

  return (
    <>
      <div className="tblmrgn mt-0 lwpddng cstm_pddng">
        <div className="row justify-content-center">
          <div className="col-xl-8 ">
            <form
              className="form def_form frmwtpddng"
              onSubmit={formik.handleSubmit}
            >
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    {selectedCMS.CMSName ? (
                      <label className="form-label">Edit CMS</label>
                    ) : (
                        <label className="form-label">Add CMS</label>
                      )}
                    <input
                      placeholder="CMS Name"
                      type="text"
                      className={`form-control`}
                      {...formik.getFieldProps("CMSName")}
                      name="CMSName"
                      disabled={selectedCMS.CMSName ? true : false}
                    />
                    {formik.touched.CMSName && formik.errors.CMSName ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.CMSName}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">CMS Page Details</label>
                <CustomEditor
                  data={formik.values.CMSPageDetails}
                  className={
                    formik.errors.CMSPageDetails &&
                      formik.touched.CMSPageDetails
                      ? "form-control re_inputRouded is-invalid"
                      : "form-control re_inputRouded"
                  }
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    formik.setFieldTouched("CMSPageDetails", true);
                    formik.setFieldValue("CMSPageDetails", data);
                  }}
                />
                {/* <CKEditor
                  config={config}
                  initData={renderHTML(formik.values.CMSPageDetails)}
                  className={
                    formik.errors.CMSPageDetails &&
                      formik.touched.CMSPageDetails
                      ? "form-control re_inputRouded is-invalid"
                      : "form-control re_inputRouded"
                  }
                  onChange={(event) => {
                    const data = event.editor.getData();
                    formik.setFieldTouched("CMSPageDetails", true);
                    formik.setFieldValue("CMSPageDetails", data);
                  }}

                /> */}
                {formik.touched.CMSPageDetails &&
                  formik.errors.CMSPageDetails ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.CMSPageDetails}
                      </div>
                    </div>
                  ) : null}
              </div>
              <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0 mt-4">
                <div className="form-group mr-5 mb-1 mt-2">
                  <Link className="btn btn-outline-blue" to="/cms-pages">
                    Close
                  </Link>
                </div>
                <div className="form-group mr-5 mb-1 mt-2">
                  <button
                    type="submit"
                    className="btn btn-blue spinnerBtn"
                    disabled={isLoading}
                  >
                    <span>{selectedCMS.CMSName ? "Update" : "Add"}</span>
                    {isLoading && (
                      <div className="ml-3 basic-verification-loader text-center">
                        <CircularProgress />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddCMS;
