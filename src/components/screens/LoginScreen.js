import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./LoginScreen.css";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  // register handler
  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: { "Content-Type": "application/json" },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);

      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen_form">
        <h3 className="login-screen_title">Login</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            required
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password:<Link className="login-screen_forgotpasssword" to="/forgotpassword" tabIndex={4}>Forgot Password</Link>
          </label>
          <input
            id="password"
            type="password"
            required
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            tabIndex={2}
          />
        </div>
        <Button type="submit" variant="contained" tabIndex={3}>
          Login
        </Button>
        ;
        <span className="login-screen_subtext">
          You dont have an account?<Link to="/register">Signup</Link>{" "}
        </span>
      </form>
    </div>
  );
};

export default LoginScreen;
