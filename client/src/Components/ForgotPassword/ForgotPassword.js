import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext";
import { Link } from "react-router-dom";
import backgroundImage from "../StartPage/Background.jpg";
import "./ForgotPassword.scss";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="App">
        <div className="appAside">
          <img src={backgroundImage} className="img"></img>
        </div>
        <div className="appForm">
          <div className="pageSwitcher"></div>
          <div className="formTitle">Password Reset</div>
          <div className="formCenter">
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <form className="formFields" onSubmit={handleSubmit}>
              <div className="formField">
                <label className="formFieldLabel" htmlFor="email">
                  E-Mail Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="formFieldInput"
                  placeholder="Enter your email"
                  name="email"
                  ref={emailRef}
                />
              </div>

              <div className="formField">
                <button
                  disabled={loading}
                  className="formFieldButton"
                  type="submit"
                >
                  Reset Password
                </button>
              </div>

              <div className="formField">
                <Link to="/login" className="formFieldLink">
                  Login
                </Link>
                <Link to="/" className="formFieldLink">
                  Create an account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
