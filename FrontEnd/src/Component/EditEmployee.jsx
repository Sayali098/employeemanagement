


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditEmployee.css';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  

  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: null,
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/employee/get/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setEmployee(data);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      image: e.target.files[0],
    }));
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      course: checked
        ? [...prevEmployee.course, value]
        : prevEmployee.course.filter((course) => course !== value),
    }));
  };

  const validateForm = () => {
    if (!employee.name) {
      alert('Name is required');
      return false;
    }
    if (!employee.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email)) {
      alert('Valid email is required');
      return false;
    }
    if (!employee.mobile || isNaN(employee.mobile)) {
      alert('Valid mobile number is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('mobile', employee.mobile);
    formData.append('designation', employee.designation);
    formData.append('gender', employee.gender);
    formData.append('course', employee.course);
    if (employee.image) {
      formData.append('image', employee.image);
    }
 
    try {
    
      const res = await fetch(`http://localhost:4000/api/employee/update/${id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      navigate('/employeeList');
     alert("employee detail edited successfully")
    } catch (error) {
      console.error('Error updating employee:', error);
     
    }
  };

  return (
    <div className="edit-employee">
      <h1>Edit Employee</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={employee.name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={employee.email} onChange={handleChange} />
        </label>
        <label>
          Mobile:
          <input type="text" name="mobile" value={employee.mobile} onChange={handleChange} />
        </label>
        <label>
          Designation:
          <select name="designation" value={employee.designation} onChange={handleChange}>
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </label>
        <label>
          Gender:
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={employee.gender === 'Male'}
              onChange={handleChange}
            /> Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={employee.gender === 'Female'}
              onChange={handleChange}
            /> Female
          </label>
        </label>
        <label>
          Course:
          <label>
            <input
              type="checkbox"
              name="course"
              value="MCA"
              checked={employee.course.includes('MCA')}
              onChange={handleCourseChange}
            /> MCA
          </label>
          <label>
            <input
              type="checkbox"
              name="course"
              value="BCA"
              checked={employee.course.includes('BCA')}
              onChange={handleCourseChange}
            /> BCA
          </label>
          <label>
            <input
              type="checkbox"
              name="course"
              value="BSC"
              checked={employee.course.includes('BSC')}
              onChange={handleCourseChange}
            /> BSC
          </label>
        </label>
        <label>
          Image Upload:
          <input
            type="file"
            name="image"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
        </label>
        <button type="submit">Save Changes</button>
    
      </form>
  
     
      
    </div>
  );
};

export default EditEmployee;


