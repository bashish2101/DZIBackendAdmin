import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { updateContactRequestAsync } from "../redux/profileApi";
import { resendVerificationCodeAsync } from "../../Auth/redux/authApi";

const ProfileContactChange = (props) => {
  const { showContactTimer } = useSelector(
    (state) => state.profile,
    shallowEqual
  );
  const [seconds, setSeconds] = useState(60);
  const dispatch = useDispatch();

  const {
    profileContactChangeModal,
    onCloseContactChangeModal,
    contactNumber,
  } = props;

  const changeContactRequest = (values) => {
    dispatch(updateContactRequestAsync(values));
  };

  const ContactSchema = () =>
    Yup.object().shape({
      contactNumber: Yup.string()
        .trim()
        .min(3, "Minimum 3 digits")
        .max(16, "Maximum 16 digits")
        .required("Contact Number is required "),
      code: Yup.string()
        .trim()
        .required("OTP is required "),
    });

  const initialValues = {
    contactNumber: contactNumber || "",
    code: "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: ContactSchema,
    onSubmit: (values, { resetForm }) => {
      changeContactRequest(values);
      resetForm({ values: "" });
    },
  });

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0 && showContactTimer) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const resendCode = () => {
    setSeconds(60);
    dispatch(resendVerificationCodeAsync());
  };
  const onClose = () => {
    setSeconds(60);
    onCloseContactChangeModal();
  };

  return (
    <>
      <Modal show={profileContactChangeModal} onHide={onClose} centered>
        <Modal.Header>
          <Modal.Title className="fn_s_18 color_blk f-w-700">
            Contact Verification
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="form def_form frmwtpddng"
            onSubmit={formik.handleSubmit}
          >
            <div className="col-lg-12">
              <div className="form-group">
                <label className="form-label">Contact Verification Code</label>
                <input
                  type="text"
                  name="code"
                  className={`form-control wth_chng`}
                  placeholder="OTP"
                  {...formik.getFieldProps("code")}
                />
                {formik.touched.code && formik.errors.code ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">{formik.errors.code}</div>
                  </div>
                ) : null}
              </div>
            </div>
            {seconds > 0 ? (
              <span className="f18-400 pt-4 mb-5 text-center d-flex align-items-center justify-content-center">
                Didn't get OTP? Resend in{" "}
                {seconds
                  ? "(" + (seconds < 10 ? "0" : "") + seconds + ")"
                  : null}
              </span>
            ) : (
              <div className="col-md-6 mb-5 text-center d-flex">
                <button
                  id="kt_login_signin_submit"
                  type="button"
                  disabled={seconds > 0}
                  className={`btn btn-link `}
                  onClick={resendCode}
                  style={{ marginLeft: "170px" }}
                >
                  <span>Resend</span>
                </button>
              </div>
            )}
            <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0">
              <div className="form-group mr-5 mb-1 mt-2">
                <button
                  className="btn_new btn-sm"
                  type="button"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
              <div className="form-group mr-5 mb-1 mt-2">
                <button type="submit" className="btn_new btn-sm">
                  <span>Verify</span>
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProfileContactChange;
