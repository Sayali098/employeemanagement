import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Component/Login";
import EmployeeList from "./Component/EmployeeList";
import CreateEmployee from "./Component/CreateEmployee";
import EditEmployee from "./Component/EditEmployee";
import Header from "./Component/Header";
import Dashboard from "./Component/Dashboard";
import "./App.css";
import SignUp from "./Component/SignUp";
import Home from "./Component/Home";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={<Dashboard user={user} onLogout={handleLogout} />}
        />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
        <Route path="/employeeList" element={<EmployeeList />} />
        <Route path="/employeeCreate" element={<CreateEmployee />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
