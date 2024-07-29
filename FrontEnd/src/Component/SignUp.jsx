import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        
        alert("user created");
        document.cookie = `token=${data.token}; path=/`;
        document.cookie = `username=${data.username}; path=/`;
      navigate('/login')
      } else {
        alert("Invalid login details");
      }
    } catch (err) {
      console.error(err);
      alert("Error logging in");
    }
  };

  return (
    <form onSubmit={onSubmit} className="signup-form">
      <h1>SignUp</h1>
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
        <span>Email</span>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={formData.email}
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
      <button type="submit">SignUp</button>
      <div className="SignUpPage">
        <p> Have an Account?</p>
        <Link to="/login">
          <span className="text-blue-700">Login</span>
        </Link>
      </div>
    </form>
  );
};

export default SignUp;
