import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ManageUsers.css";
import axios from "axios";
import { useEffect } from "react";

function DeleteUser() {
  const {employeeId} = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(()=>{
    console.log("employeeId:", employeeId);
    if (!employeeId) {
      setError("Please provide a valid Employee ID.");
      setLoading(false);
      return; // Stop execution if employeeId is empty
    }

    axios.get(`http://localhost:5097/api/Employee/${employeeId}`).then((response)=>{
      setUser(response.data);
      setLoading(false);
    })
    
    .catch((error)=>{
      console.error("Error fetching value",error);
      setError("user not found");
      setLoading(false);
      
    });
  },[employeeId]);
  

  const handleDelete = async () => {
    if (!employeeId) {
      alert("Please enter a valid Employee ID.");
      return;
    }
  
    try {
      const response = await axios.delete(`http://localhost:5097/api/Employee/${employeeId}`);
  
      if (response.status === 200) {
        alert("User deleted successfully");
        navigate("/home"); 
      } else {
        alert("Unexpected response. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("User not found. Please check the Employee ID.");
      } else {
        alert("Error deleting user. Please try again.");
      }
      console.error("Delete error:", error);
    }
  };
  
  if (loading) return <p>Loading user data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="manage-users-container">
      <h2>Delete User</h2>
      <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
      <p><strong>Hire Date:</strong> {user.hiredate}</p>
      <p><strong>Job Title:</strong> {user.jobTitle}</p>
      <p><strong>Department Id:</strong>{user.departmentId}</p>
      <p><strong>Department:</strong> {user.department}</p>
      <p><strong>Salary:</strong> ${user.salary}</p>

      <button onClick={handleDelete} style={{ backgroundColor: "red", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>
        Delete User
      </button>
    </div>
  );
}

export default DeleteUser;
