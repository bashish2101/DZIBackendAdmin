import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const ThirdPartySchema = () =>
  Yup.object().shape({
    type: Yup.string().required("Type is required"),
    emailId: Yup.string().when("type", {
      is: "MAIL_GATEWAY",
      then: Yup.string()
        .trim()
        .email("Enter valid email")
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required("Email ID is required"),
    }),
    password: Yup.string().when("type", {
      is: "MAIL_GATEWAY",
      then: Yup.string()
        .trim()
        .min(6, "Minimum 6 characters")
        .max(20, "Maximum 20 characters")
        .required("Password is required"),
    }),
    twilioAccountSID: Yup.string().when("type", {
      is: "SMS_GATEWAY",
      then: Yup.string()
        .trim()
        .required("Account is required"),
    }),
    twilioAuthToken: Yup.string().when("type", {
      is: "SMS_GATEWAY",
      then: Yup.string()
        .trim()
        .required("Token is required"),
    }),
    twilioContactNumber: Yup.string().when("type", {
      is: "SMS_GATEWAY",
      then: Yup.string()
        .trim()
        .required("Contact Number is required"),
    }),
    paymentClientSecret: Yup.string().when("type", {
      is: "PAYMENT_GATEWAY",
      then: Yup.string()
        .trim()
        .required("This field is required"),
    }),
  });

const AddThirdPartyService = ({
  onAddService,
  selectedService,
  onEditService,
}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const initialValues = {
    type: selectedService.type || "MAIL_GATEWAY",
    emailId: selectedService.emailId || "",
    password: selectedService.password || "",
    twilioAccountSID: selectedService.twilioAccountSID || "",
    twilioAuthToken: selectedService.twilioAuthToken || "",
    twilioContactNumber: selectedService.twilioContactNumber || "",
    paymentClientSecret: selectedService.paymentClientSecret || "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: () => ThirdPartySchema(),
    onSubmit: (values) => {
      const {
        type,
        emailId,
        password,
        twilioAccountSID,
        twilioAuthToken,
        twilioContactNumber,
        paymentClientSecret,
      } = values;
      let data = {
        type,
      };
      if (type === "MAIL_GATEWAY") {
        data = {
          ...data,
          emailId,
          password,
        };
      }
      if (type === "SMS_GATEWAY") {
        data = {
          ...data,
          twilioAccountSID,
          twilioAuthToken,
          twilioContactNumber,
        };
      }
      if (type === "PAYMENT_GATEWAY") {
        data = {
          ...data,
          paymentClientSecret,
        };
      }
      if (selectedService.type) {
        onEditService(data, selectedService._id);
      } else {
        onAddService(data);
      }
    },
  });

  return (
    <>
      <form className="form def_form frmwtpddng" onSubmit={formik.handleSubmit}>
        <div className="form-group fv-plugins-icon-container">
          <label className="form-label">Type</label>
          <select
            className="form-control wtblcar"
            name="type"
            {...formik.getFieldProps("type")}
          >
            <option value="MAIL_GATEWAY">Email Gateway</option>
            <option value="SMS_GATEWAY">SMS Gateway</option>
            <option value="PAYMENT_GATEWAY">Payment Gateway</option>
          </select>
          {formik.touched.type && formik.errors.type ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.type}</div>
            </div>
          ) : null}
        </div>
        {formik.values.type === "MAIL_GATEWAY" && (
          <>
            <div className="form-group fv-plugins-icon-container">
              <label className="form-label">Email ID</label>
              <input
                type="email"
                name="emailId"
                className="form-control"
                placeholder="username@company.com"
                {...formik.getFieldProps("emailId")}
              />
              {formik.touched.emailId && formik.errors.emailId ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.emailId}</div>
                </div>
              ) : null}
            </div>
            <div className="form-group fv-plugins-icon-container">
              <label className="form-label">Password</label>
              <div className="frpsswrd">
                <input
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  type={passwordShown ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                />
                <i
                  onClick={togglePasswordVisiblity}
                  className="far fa-eye-slash"
                ></i>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.password}</div>
                </div>
              ) : null}
            </div>
          </>
        )}
        {formik.values.type === "SMS_GATEWAY" && (
          <>
            <div className="form-group fv-plugins-icon-container">
              <label className="form-label">Twilio Account SID</label>
              <input
                type="text"
                name="twilioAccountSID"
                className="form-control"
                placeholder="Twilio Account SID"
                {...formik.getFieldProps("twilioAccountSID")}
              />
              {formik.touched.twilioAccountSID &&
              formik.errors.twilioAccountSID ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    {formik.errors.twilioAccountSID}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="form-group fv-plugins-icon-container">
              <label className="form-label">Twilio Auth Token</label>
              <input
                type="text"
                name="twilioAuthToken"
                className="form-control"
                placeholder="Twilio Auth Token"
                {...formik.getFieldProps("twilioAuthToken")}
              />
              {formik.touched.twilioAuthToken &&
              formik.errors.twilioAuthToken ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    {formik.errors.twilioAuthToken}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="form-group fv-plugins-icon-container">
              <label className="form-label">Twilio Contact Number</label>
              <input
                type="text"
                name="twilioContactNumber"
                className="form-control"
                placeholder="Twilio Contact Number"
                {...formik.getFieldProps("twilioContactNumber")}
              />
              {formik.touched.twilioContactNumber &&
              formik.errors.twilioContactNumber ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    {formik.errors.twilioContactNumber}
                  </div>
                </div>
              ) : null}
            </div>
          </>
        )}
        {formik.values.type === "PAYMENT_GATEWAY" && (
          <div className="form-group fv-plugins-icon-container">
            <label className="form-label">Payment Client Secret</label>
            <input
              type="text"
              name="paymentClientSecret"
              className="form-control"
              placeholder="Payment Client Secret"
              {...formik.getFieldProps("paymentClientSecret")}
            />
            {formik.touched.paymentClientSecret &&
            formik.errors.paymentClientSecret ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  {formik.errors.paymentClientSecret}
                </div>
              </div>
            ) : null}
          </div>
        )}
        <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0">
          <button type="submit" className="btn btn-def defpddng">
            {selectedService ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddThirdPartyService;
