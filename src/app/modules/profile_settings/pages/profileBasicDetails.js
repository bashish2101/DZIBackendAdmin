import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  updateUserProfileAsync,
  changeEmailRequestAsync,
  changeContactRequestAsync,
} from "../redux/profileApi";
import ProfileEmailVerifyModal from "./profileEmailVerifyModal";
import { ProfileActions } from "../redux/profileAction";
import ProfileContactChange from "./profileContactChangeModal";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const ProfileBasicDetails = (props) => {
  const [file, setFile] = useState({ file: null, url: "" });

  const dispatch = useDispatch();

  const { profileEmailChangeModal, profileContactChangeModal } = useSelector(
    (state) => state.profile,
    shallowEqual
  );
  useEffect(() => {
    if (props && props.selectedTab !== "basic-details") {
      formik.resetForm();
    }
  }, [props && props.selectedTab]);

  const { user, isLoading } = useSelector((state) => state.auth, shallowEqual);
  
  const initialValues = {
    emailId: user.emailId || "",
    contactNumber: user.contactNumber || "",
    name: user.name || "",
    country: user.country || "",
    state: user.state || "",
    city: user.city || "",
    address: user.address || "",
    oldEmail: user.emailId || "",
    oldNumber: user.contactNumber || "",
  };

  const onCloseEmailChangeModal = () => {
    dispatch(ProfileActions.closeEmailChangeModal());
  };

  const onCloseContactChangeModal = () => {
    dispatch(ProfileActions.closeContactChangeModal());
  };

  const changeEmailRequest = () => {
    if (!formik.errors.emailId) {
      dispatch(changeEmailRequestAsync({ emailId: formik.values.emailId }));
    }
  };


  const ProfileSchema = () =>
    Yup.object().shape({
      name: Yup.string()
        .trim()
        .required("Name is required"),
      emailId: Yup.string()
        .trim()
        .email("Enter valid email")
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required("Email ID is required"),
      contactNumber: Yup.string()
        .trim()
        .matches(phoneRegExp, "Contact Number is not valid")
        .required("Contact is required"),
    });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: ProfileSchema,
    onSubmit: (values, { setErrors, resetForm }) => {
      let data = null;
      if (file && file.file) {
        data = new FormData();
        data.append("img", file.file);
      }
      if (isValidPhoneNumber(values && values.contactNumber)) {
        dispatch(updateUserProfileAsync(values, data));
        resetForm();
      } else {
        setErrors({ contactNumber: "Invalid contact number" });
      }
    },
  });

  const uploadImage = (e) => {
    setFile({
      url: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    });
  };

  const handleContactNumber = (e) => {
    formik.setFieldValue("contactNumber", e);
  };
  return (
    <>
      <div className="tblmrgn mt-0 lwpddng cstm_pddng">
        <div className="row justify-content-center">
          <div className="col-xl-5 col-md-6-as">
            <form
              className="form def_form frmwtpddng"
              onSubmit={formik.handleSubmit}
            >
              <div className="row">
                <div className="col-md-12 text-center mb-4">
                  <div
                    className="pro_img"
                    style={{
                      backgroundImage: `url(${file.url ||
                        user.profilePicture})`,
                    }}
                  >
                    {/* <Image
                      src={file.url || user.profilePicture}
                      alt="icon"
                      title="icon"
                      className=""
                      fluid
                      name="profilePicture"
                    /> */}
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      onChange={uploadImage}
                    />
                    <div className="edt_img_btn">
                      <span className="material-icons">edit</span>EDIT
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      placeholder="Name"
                      type="text"
                      className={`form-control wth_chng`}
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
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <div className="re_grpPhone position-relative">
                      <PhoneInput
                        placeholder="Enter phone number"
                        className="form-control d-flex"
                        value={formik.values && formik.values.contactNumber}
                        onChange={(e) => handleContactNumber(e)}
                        error={
                          formik.values && formik.values.contactNumber
                            ? isValidPhoneNumber(formik.values.contactNumber)
                              ? undefined
                              : "Invalid phone number"
                            : "Phone number required"
                        }
                      />
                      {formik.errors.contactNumber ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.contactNumber}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <div className="re_grpPhone position-relative">
                      <input
                        placeholder="username@company.com"
                        type="email"
                        className={`form-control wth_chng`}
                        name="emailId"
                        {...formik.getFieldProps("emailId")}
                        readOnly={true}
                      />
                      {formik.values.emailId !== formik.values.oldEmail && (
                        <button
                          className="btn_new btn-sm"
                          type="button"
                          onClick={() => changeEmailRequest()}
                        >
                          VERIFY
                        </button>
                      )}
                    </div>
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
                <button
                  type="submit"
                  disabled={Object.keys(formik.errors).length > 0}
                  className="btn btn-blue defpddng"
                >
                  <span>Update</span>
                  {isLoading && (
                    <span className="ml-3 spinner spinner-white"></span>
                  )}
                </button>
              </div>
            </form>
            <ProfileEmailVerifyModal
              profileEmailChangeModal={profileEmailChangeModal}
              onCloseEmailChangeModal={onCloseEmailChangeModal}
              emailId={formik.values.emailId}
            />
            <ProfileContactChange
              profileContactChangeModal={profileContactChangeModal}
              onCloseContactChangeModal={onCloseContactChangeModal}
              contactNumber={formik.values.contactNumber}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBasicDetails;
