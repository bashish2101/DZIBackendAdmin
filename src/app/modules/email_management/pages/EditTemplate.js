import React from "react";
//import { CKEditor } from "ckeditor4-react";
import { Col, Row, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CircularProgress from "@material-ui/core/CircularProgress";
import { updateEmailAsync } from "../redux/emailManagementApi";
import {
  Card,
  CardHeader,
  CardBody,
} from "./../../../../_metronic/_partials/controls";
import * as Yup from "yup";
import CustomEditor from "../../CustomEditor/CustomEditor";

const EditTemplate = () => {
  const { selectedEmail, isLoading } = useSelector(
    (state) => state.emailManagement,
    shallowEqual
  );
  const history = useHistory();
  const dispatch = useDispatch();
  if (!selectedEmail) {
    return <Redirect to="/email-management" />;
  }

  const redirectBack = () => {
    history.push("/email-management");
  };
  const addEmailSchema = Yup.object().shape({
    mailName: Yup.string()
      .trim()
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined"],
        "Please enter Email name"
      )
      .required("Please enter Email name"),
    mailTitle: Yup.string()
      .trim()
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined"],
        "Please enter Email Title"
      )
      .required("Please enter Email title"),
    mailSubject: Yup.string()
      .trim()
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined"],
        "Please enter Email subject"
      )
      .required("Please enter Email subject"),
    mailBody: Yup.string()
      .trim()
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined"],
        "Please enter valid Email body"
      )
      .required("Please enter Email body"),
  });
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={selectedEmail}
        validationSchema={addEmailSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          dispatch(
            updateEmailAsync(values, setSubmitting, resetForm, redirectBack)
          );
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleBlur,
          handleChange,
          setFieldValue,
          setFieldTouched,
        }) => (
            <Row className="justify-content-center">
              <Col lg={8}>
                <Card>
                  <CardHeader title="Edit Template"></CardHeader>
                  <CardBody>
                    <Form>
                      <div className="form-group">
                        <label className="form-label">Mail Name</label>
                        <input
                          placeholder="Enter Name"
                          type="text"
                          disabled={true}
                          name="mailName"
                          className={
                            errors.mailName && touched.mailName
                              ? "form-control re_inputRouded is-invalid"
                              : "form-control re_inputRouded"
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.mailName}
                        />
                        {touched.mailName && errors.mailName ? (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">{errors.mailName}</div>
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Title</label>
                        <input
                          placeholder="Enter Title"
                          type="text"
                          name="mailTitle"
                          disabled={true}
                          className={
                            errors.mailTitle && touched.mailTitle
                              ? "form-control re_inputRouded is-invalid"
                              : "form-control re_inputRouded"
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.mailTitle}
                        />
                        {touched.mailTitle && errors.mailTitle ? (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              {errors.mailTitle}
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Subject</label>
                        <input
                          placeholder="Enter Subject"
                          type="text"
                          name="mailSubject"
                          className={
                            errors.mailSubject && touched.mailSubject
                              ? "form-control re_inputRouded is-invalid"
                              : "form-control re_inputRouded"
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.mailSubject}
                        />
                        {touched.mailSubject && errors.mailSubject ? (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              {errors.mailSubject}
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email Body</label>

                        <CustomEditor
                          data={values.mailBody}
                          className={
                            errors.mailBody && touched.mailBody
                              ? "form-control re_inputRouded is-invalid"
                              : "form-control re_inputRouded"
                          }
                          onBlur={(event, editor) => {
                            const data = editor.getData();
                            // Set field touched value
                            setFieldTouched("mailBody", true);

                            // Set field value
                            setFieldValue("mailBody", data);
                          }}
                        />

                        {/* <CKEditor
                          editor={ClassicEditor}
                          data={values.mailBody}
                          className={
                            errors.mailBody && touched.mailBody
                              ? "form-control re_inputRouded is-invalid"
                              : "form-control re_inputRouded"
                          }
                          onBlur={(event, editor) => {
                            const data = editor.getData();
                            setFieldTouched("mailBody", true);
                            setFieldValue("mailBody", data);
                          }}
                        /> */}
                        {touched.mailBody && errors.mailBody ? (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">{errors.mailBody}</div>
                          </div>
                        ) : null}
                      </div>
                      {isSubmitting ? (
                        <div className="basic-verification-loader text-center">
                          <CircularProgress />
                        </div>
                      ) : (
                          <div className="text-center">
                            <Button
                              variant="blue"
                              className="px-5 defpddng "
                              size="lg"
                              type="submit"
                            >
                              Update
                        </Button>
                          </div>
                        )}
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
      </Formik>
    </>
  );
};
export default EditTemplate;
