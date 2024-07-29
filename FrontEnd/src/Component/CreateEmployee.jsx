import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateEmployee.css";

const CreateEmployee = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    image: null,
  });

  const onChange = (e) => {
    if (e.target.name === "course") {
      const courseList = formData.course.includes(e.target.value)
        ? formData.course.filter((c) => c !== e.target.value)
        : [...formData.course, e.target.value];
      setFormData({ ...formData, course: courseList });
    } else if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "course") {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const res = await fetch("http://localhost:4000/api/employee/create", {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        alert("Employee created successfully");
      } else {
        alert("Error creating employee");
      }
      navigate("/employeeList");
    } catch (err) {
      console.error(err);
      alert("Error creating employee");
    }
  };

  return (
    <form onSubmit={onSubmit} className="create-employee-form">
      <h1>Create Employee</h1>
      <div className="create-form">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Mobile No</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Designation</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={onChange}
            required
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="gender-data">
          <label>Gender</label>

          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={onChange}
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={onChange}
              required
            />
            Female
          </label>
        </div>
        <div className="course-field">
          <label>Course</label>
          <label>
            <input
              type="checkbox"
              name="course"
              value="MCA"
              checked={formData.course.includes("MCA")}
              onChange={onChange}
            />
            MCA
          </label>
          <label>
            <input
              type="checkbox"
              name="course"
              value="BCA"
              checked={formData.course.includes("BCA")}
              onChange={onChange}
            />
            BCA
          </label>
          <label>
            <input
              type="checkbox"
              name="course"
              value="BSC"
              checked={formData.course.includes("BSC")}
              onChange={onChange}
            />
            BSC
          </label>
        </div>
        <div>
          <label>Image Upload</label>
          <input
            type="file"
            name="image"
            accept="image/png, image/jpeg"
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default CreateEmployee;
