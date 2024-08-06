import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="signup template d-flex justify-content-center align-items-center vh-100 text-white">
      <div className="form_container p-5 rounded">
        <form>
          <h3 className="text-center mb-5">Sign Up</h3>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email Id</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Your Password"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="checkbox"
              className="custom-control custom-checkbox"
              id="check"
            />
            <label htmlFor="check" className="custom-input-label ms-2">
              Remember Me
            </label>
          </div>
          <div className="d-grid">
            <button className="btn btn-primary">Sign Up</button>
          </div>
          <p className="text-end mt-2">
           Already Registered
            <Link to="/" className="ms-2">
             Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
