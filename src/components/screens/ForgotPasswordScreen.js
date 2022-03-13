import { useState } from "react";
import axios from "axios";
import "./ForgotPasswordScreen.css";
import { spacing } from "@mui/system";
import Button from "@mui/material/Button";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="forgotpassword-screen">
      <form
        onSubmit={forgotPasswordHandler}
        className="forgotpassword-screen_form"
      >
        <h3 className="forgotpassword_screen_title">Forgot Password</h3>
        {error && <span className="error-message">{error}</span>}
        {success && <span className="success-message">{success}</span>}
        <div className="form-group">
          <p className="forgotpassword-screen_subtext">
            Please enter the email address that you registered with. We will
            send a password reset confirmation to that address
          </p>

          <label htmlFor="email"></label>
          <input
            id="email"
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button variant="contained">Send Email</Button>;
      </form>
    </div>
  );
};

export default ForgotPasswordScreen;
