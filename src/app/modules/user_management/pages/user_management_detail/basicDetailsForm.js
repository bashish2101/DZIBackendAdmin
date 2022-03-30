import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import PhoneInput, {
  isValidPhoneNumber,
} from "react-phone-number-input";
import {
  updateUserAsync,
  createUserAsync,
} from "../../redux/userManagementApi";
import { Link, Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const BasicDetailsForm = ({ selectedUser, isLoading, reDirect }) => {
  const dispatch = useDispatch();

  const BasicDetailsFormSchema = () =>
    Yup.object().shape({
      emailId: Yup.string()
        .trim()
        .email("Enter valid email")
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required("Email ID is required"),
      contactNumber: Yup.string()
        .trim()
        .matches(phoneRegExp, "Please enter valid contact number.")
        .required("Please enter contact number."),
      name: Yup.string()
        .trim()
        .min(3, "Minimum 2 characters")
        .max(50, "Maximum 50 characters")
        .required("Name is required"),
    });
    

  const formik = useFormik({
    initialValues: {
      name: selectedUser.name || "",
      contactNumber: selectedUser.contactNumber || "",
      emailId: selectedUser.emailId || "",
    },
    enableReinitialize: true,
    validationSchema: BasicDetailsFormSchema,
    onSubmit: (values, { setErrors, resetForm }) => {
      if (isValidPhoneNumber(values && values.contactNumber)) {
        if (!selectedUser._id) {
          return dispatch(createUserAsync(values));
        }
        if (selectedUser._id) {
          dispatch(updateUserAsync(values, selectedUser._id));
        }
      } else {
        setErrors({ contactNumber: "Invalid contact number" });
      }
    },
  });

  const handleContactNumber = (e) => {
    formik.setFieldValue("contactNumber", e);
  };

  if (reDirect) {
    return <Redirect to="/user-management" />;
  }

  return (
    <>
      <div className="tblmrgn mt-0 lwpddng cstm_pddng">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-md-6-as">
            <form
              className="form def_form frmwtpddng"
              onSubmit={formik.handleSubmit}
            >
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      placeholder="Name"
                      type="text"
                      className={`form-control`}
                      name="name"
                      {...formik.getFieldProps("name")}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.name}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <PhoneInput
                      placeholder="Enter phone number"
                      className="form-control d-flex"
                      value={formik.values && formik.values.contactNumber}
                      onChange={(e) => handleContactNumber(e)}
                      disabled={selectedUser.contactNumber ? true : false}
                      error={
                        formik.values && formik.values.contactNumber
                          ? isValidPhoneNumber(formik.values.contactNumber)
                            ? undefined
                            : "Invalid phone number"
                          : "Phone number required"
                      }
                    />
                    {formik.touched.contactNumber &&
                    formik.errors.contactNumber ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.contactNumber}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      placeholder="username@company.com"
                      type="email"
                      className={`form-control`}
                      name="emailId"
                      {...formik.getFieldProps("emailId")}
                      disabled={selectedUser.emailId ? true : false}
                    />
                    {formik.touched.emailId && formik.errors.emailId ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.emailId}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0 mt-4">
                <div className="form-group mr-5 mb-1 mt-2">
                  <Link className="btn btn-outline-blue" to="/user-management">
                    Close
                  </Link>
                </div>
                <div className="form-group mr-5 mb-1 mt-2">
                  <button
                    type="submit"
                    className="btn btn-blue spinnerBtn"
                    disabled={isLoading}
                  >
                    <span>{selectedUser._id ? "Update" : "Add"}</span>
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
export default BasicDetailsForm;
