import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";

import "./ResetPasswordScreen.css";

const ResetPasswordScreen = ({ match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setError("");
      }, 5000);

      return setError("Password do not match");
    }

    try {
      const { data } = await axios.put(
        `/api/auth/resetpassword/${match.params.resetToken}`,
        { password },
        config
      );

      console.log(data);
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="resetpassword-screen">
      <form
        onSubmit={resetPasswordHandler}
        className="resetpassword-screen_form"
      >
        <h3 className="resetpassword-screen_title">Reset Password</h3>
        {error && <span className="error-message">{error}</span>}
        {success && (
          <span className="success-message">
            {success} <Link to={"/login"}>Login</Link>
          </span>
        )}
        <div className="gorm-group">
          <label htmlFor="password">New Password:</label>
          <input
            id="password"
            type="password"
            required
            placeholder="Enter new password"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm New Password:</label>
          <input
            id="confirmpassword"
            type="password"
            required
            placeholder="Repeat new password"
            autoComplete="true"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Button type="submit" variant="contained">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordScreen;
