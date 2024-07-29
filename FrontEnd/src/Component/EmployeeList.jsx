



import React, { useState, useEffect } from 'react';
import './EmployeeList.css';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/employee/get');
        const data = await res.json();
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  const deleteEmployee = async (id) => {
    await fetch(`http://localhost:4000/api/employee/delete/${id}`, {
      method: 'DELETE',
    });
    setEmployees(employees.filter((employee) => employee._id !== id));
    setFilteredEmployees(filteredEmployees.filter((employee) => employee._id !== id));
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(term) ||
      employee.email.toLowerCase().includes(term) ||
      employee._id.toLowerCase().includes(term) ||
      new Date(employee.createdate).toLocaleDateString().includes(term)
    );
    setFilteredEmployees(filtered);
  };

  return (
    <div className='table-container'>
      <h1>Employee List</h1>
      <div className='table-header'>
        <div style={{ display: 'flex', gap: '40px' }}>
          <div className='total-count'>Total Count: {filteredEmployees.length}</div>
          <Link to='/employeeCreate'>
            <button className='createEmpBtn'>Create Employee</button>
          </Link>
        </div>
        <div className='search-container'>
          <span>Search</span>
          <input
            type='text'
            placeholder='Enter Search Keyword'
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Creation Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>
                {employee.image && (
                  <img
                    src={`http://localhost:4000/${employee.image}`}
                    alt={employee.name}
                    style={{ width: '40px', height: '40px' }}
                  />
                )}
              </td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course.join(', ')}</td>
              <td>{new Date(employee.createdate).toLocaleDateString()}</td>
              <td className='action-buttons'>
                <Link to={`/edit-employee/${employee._id}`}>
                  <button>Edit</button>
                </Link>
                <button
                  className='delete-button'
                  onClick={() => deleteEmployee(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;

