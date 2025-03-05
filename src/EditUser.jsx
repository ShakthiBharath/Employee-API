import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ManageUsers.css";
import { useEffect } from "react";
import axios from "axios";

// function EditUser() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [hireDate, setHireDate]=useState("");
//   const [jobTitle, setJobTitle]= useState("");
//   const [departmentId, setDepartmentId] = useState("");
//   const [department, setDepartment] = useState("");
//   const [salary, setSalary]= useState("");
  
//   const navigate = useNavigate();
  
  function EditUser(){
    const { employeeId }= useParams();
    const navigate = useNavigate();
    const [user, setUser]= useState({
      firstName:"",
      lastName:"",
      email:"",
      phoneNumber:"",
      hireDate:"",
      jobTitle:"",
      departmentId:"",
      department:"",
      salary:"",
    });

    useEffect(()=>{
      if (employeeId){
        axios.get(`http://localhost:5097/api/Employee/${employeeId}`).then((response)=>{
          setUser(response.data);
        })
        .catch((error)=>{
          console.error("Error Occured:", error);
        });

      }
      
    }, [employeeId]);

    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setUser((prevUser) => ({
        ...prevUser,
        [name]: name === "departmentId" || name === "salary" ? Number(value) : value, // Convert numbers
      }));
    };

    const handleSubmit =(e) =>{
      e.preventDefault();
      axios.put(`http://localhost:5097/api/Employee/${employeeId}`,user).then(() => {
        alert("User updated Successfully");
        navigate("/home");
      }
    ).catch((error) =>{
      console.error("Error Occured:", error);
    });
    };

  // const handleEditUser = (e) => {
  //   e.preventDefault();
  //   console.log("User Edited:", { userId, newEmail });
  // };

  return (
    <div className="manage-users-container">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <label>FirstName:</label>
        <input type="text" name="firstName" placeholder="FirstName" value={user.firstName} onChange={handleChange} required />
        <label>LastName:</label>
        <input type="text" name="lastName" placeholder="LastName" value={user.lastName} onChange={handleChange} required />
        <label>Email:</label>
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
        <label>PhoneNumber:</label>
        <input type="tel" name="phoneNumber" placeholder="PhoneNumber" value={user.phoneNumber} onChange={handleChange} required />
        <label>HireDate:</label>
        <input type="date" name="hireDate" placeholder="HireDate" value={user.hireDate} onChange={handleChange} required />
        <label>JobTitle:</label>
        <input type="text" name="jobTitle" placeholder="JobTitle" value={user.jobTitle} onChange={handleChange} required />
        <label>DepartmentId:</label>
        <input type="number" min="1" max="100" name="departmentId" placeholder="DepartmentId" value={user.departmentId} onChange={handleChange} required />
        <label>Department:</label>
        <input type="text" name="department" placeholder="Department" value={user.department} onChange={handleChange} required />
        <label>Salary:</label>
        <input type="number" min="1" max="10000000" name="salary" placeholder="Salary" value={user.salary} onChange={handleChange} required />
        <button type="submit">Edit User</button>
      </form>
    </div>
  );
}

export default EditUser;
