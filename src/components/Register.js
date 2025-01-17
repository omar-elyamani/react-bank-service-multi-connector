import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import login from "../assets/login.png";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger mt-2" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger mt-2" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger mt-2" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger mt-2" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, password, email).then(
        (response) => {
          setMessage(response.data);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-95 bg-white">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%", backgroundColor: "white" }}>
        <div className="text-center mb-4">
          <img
            src={login}
            alt="Register"
            className="rounded-circle"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
        <h3 className="text-center mb-4">Create your account!</h3>
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <>
              <div className="form-group mb-1">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                  placeholder="Enter your username"
                />
              </div>
              <div className="form-group mb-1">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group mb-1">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                  placeholder="Enter your password"
                />
              </div>
              <div className="text-center" style={{ marginTop: "30px" }}>
                <button className="btn btn-primary w-100" style={{ padding: "10px" }}>
                  Sign Up
                </button>
              </div>
            </>
          )}
          {message && (
            <div className="alert mt-3" role="alert">
              <div
                className={`alert ${
                  successful ? "alert-success" : "alert-danger"
                }`}
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        <h6 className="text-center mt-4">
          Already have an account? <a href="/login">Log in</a>
        </h6>
      </div>
    </div>
  );
};

export default Register;