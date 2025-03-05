import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Create a CSS file for styling

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "user@example.com" && password === "password") {
        navigate("/Home"); // Redirect to Home after login
      } else {
        alert("Invalid login. Try again!");
      }
    // console.log("Email:", email);
    // console.log("Password:", password);
    // navigate("/home"); // Redirect to Home after login
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="#">Sign up</a></p>
    </div>
  );
}

export default Login;
