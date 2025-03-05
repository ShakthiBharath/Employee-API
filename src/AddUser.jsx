import React, { useState } from "react";
import axios from "axios";
import "./ManageUsers.css";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hireDate, setHireDate]=useState("");
  const [jobTitle, setJobTitle]= useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary]= useState("");

  const navigate = useNavigate();

  const handleAddUser = async (e) =>{
    try{
      const response= await axios.post(`http://localhost:5097/api/Employee/`,{firstName, lastName, email, phoneNumber, hireDate, jobTitle, departmentId, department, salary});
      if (response.status===201){
        setMessage("User Added Successfully!");
        setTimeOut(()=> navigate("/home"), 2000);
      }
    } catch (error){
      setMessage("Error while adding user!");
      console.error("Error:", error);
    }
  };


  // const handleAddUser = (e) => {
  //   e.preventDefault();
  //   console.log("User Added:", { name, email });
  // };

  return (
    <div className="manage-users-container">
      <h2>Add User</h2>
      <form onSubmit={handleAddUser}>
        <input type="text" placeholder="FirstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <input type="text" placeholder="LastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="tel" placeholder="PhoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        <input type="date" placeholder="HireDate" value={hireDate} onChange={(e) => setHireDate(e.target.value)} required />
        <input type="text" placeholder="JobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
        <input type="number" min="1" max="100" placeholder="DepartmentId" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} required />
        <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} required />
        <input type="number" min="1" max="10000000" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} required />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default AddUser;
