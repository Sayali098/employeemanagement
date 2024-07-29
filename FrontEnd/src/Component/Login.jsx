// Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        onLogin(data);
        document.cookie = `token=${data.token}; path=/`;
        document.cookie = `username=${data.username}; path=/`;
        navigate("/dashboard");
      } else {
        alert("Invalid login details");
      }
    } catch (err) {
      console.error(err);
      alert("Error logging in");
    }
  };

  return (
    <form onSubmit={onSubmit} className="login-form">
      <h1>Login</h1>
      <div>
        <span>UserName</span>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <span>Password</span>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={onChange}
          required
        />
      </div>
      <button type="submit">Login</button>
      <div className="SignUpPage">
        <p> Dont Have an Account?</p>
        <Link to="/signup">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
    </form>
  );
};

export default Login;
