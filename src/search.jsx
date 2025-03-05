import React, { useState } from "react";
import "./Search.css";
import axios from "axios";

// const mockEmployees = [
//   { id: 1, name: "Alice Johnson", position: "Software Engineer" },
//   { id: 2, name: "Bob Smith", position: "Project Manager" },
//   { id: 3, name: "Charlie Brown", position: "Designer" },
// ];

function Search() {
  const [employeeId, setEmployeeId] = useState("");
  const [employee, setEmployee] = useState(null);
  const [allEmployees, setAllEmployees] = useState([]);

  

  const fetchEmployeeById= async() => {
    try {
      const response = await axios.get(`http://localhost:5097/api/Employee/${employeeId}`);
      setEmployee(response.data);
        }
    catch (error) {
      console.error("Error fetching Employee", error);
      setEmployee(null);
    }
  }

  const fetchAllEmployees= async() => {
    try {
      const response= await axios.get (`http://localhost:5097/api/Employee/`);
      setAllEmployees(response.data);
    }
    catch (error){
      console.error("Error fetching Employees:", error);
    }
  }

  // const handleSearch = () => {
  //   const foundEmployee = mockEmployees.find(emp => emp.id === parseInt(employeeId));
  //   setEmployee(foundEmployee || null);
  // };

  // const handleGetAll = () => {
  //   setAllEmployees(mockEmployees);
  // };

  return (
    <div className="search-container">
      <h2>Search Employee</h2>
      <input
        type="number"
        placeholder="Enter Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      />
      <button onClick={fetchEmployeeById}>Get Employee</button>
      <button onClick={fetchAllEmployees}>Get All Employees</button>
      
      {employee && (
        <div className="employee-details">
          <h3>Employee Details</h3>
          <p>ID: {employee.employeeId}</p>
          <p>Name: {employee.firstName}</p>
          <p>Last Name: {employee.lastName}</p>
          <p>Phone Number: {employee.phoneNumber}</p>
          <p>Job Title: {employee.jobTitle}</p>
          <p>Hire Date: {employee.hireDate}</p>
          <p>Department Id: {employee.departmentId}</p>
          <p>Department: {employee.department}</p>
          <p>Salary: ${employee.salary}</p>

        </div>
      )}
      
      {allEmployees.length > 0 && (
        <div className="all-employees">
          <h3>All Employees</h3>
          <ul>
            {allEmployees.map(emp => (
              <li key={emp.firstName}>{emp.lastName} - {emp.jobTitle}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
// import React, { useState } from "react";
// import "./Search.css";
// import axios from "axios";

// function Search() {
//   const [employeeId, setEmployeeId] = useState("");
//   const [employee, setEmployee] = useState(null);
//   const [allEmployees, setAllEmployees] = useState([]);

//   // Individual state variables for form inputs
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [hireDate, setHireDate] = useState("");
//   const [jobTitle, setJobTitle] = useState("");
//   const [departmentId, setDepartmentId] = useState("");
//   const [department, setDepartment] = useState("");
//   const [salary, setSalary] = useState("");

//   // Fetch Employee by ID
//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5097/api/Employee/${employeeId}`);
//       const data = response.data;
//       setEmployee(data);
//       setFirstName(data.firstName);
//       setLastName(data.lastName);
//       setEmail(data.email);
//       setPhoneNumber(data.phoneNumber);
//       setHireDate(data.hireDate);
//       setJobTitle(data.jobTitle);
//       setDepartmentId(data.departmentId);
//       setDepartment(data.department);
//       setSalary(data.salary);
//     } catch (error) {
//       console.error("Error fetching Employee:", error);
//       setEmployee(null);
//     }
//   };

//   // Fetch All Employees
//   const handleGetAll = async () => {
//     try {
//       const response = await axios.get("http://localhost:5097/api/Employee");
//       setAllEmployees(response.data);
//     } catch (error) {
//       console.error("Error fetching Employees:", error);
//     }
//   };

//   return (
//     <div className="search-container">
//       <h2>Search Employee</h2>
//       <input
//         type="number"
//         placeholder="Enter Employee ID"
//         value={employeeId}
//         onChange={(e) => setEmployeeId(e.target.value)}
//       />
//       <button onClick={handleSearch}>Get Employee</button>
//       <button onClick={handleGetAll}>Get All Employees</button>

//       {/* Employee Details Form */}
//       {employee && (
//         <div className="employee-details">
//           <h3>Employee Details</h3>
//           <input type="text" placeholder="FirstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
//           <input type="text" placeholder="LastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
//           <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           <input type="tel" placeholder="PhoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
//           <input type="date" placeholder="HireDate" value={hireDate} onChange={(e) => setHireDate(e.target.value)} required />
//           <input type="text" placeholder="JobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
//           <input type="number" min="1" max="100" placeholder="DepartmentId" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} required />
//           <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} required />
//           <input type="number" min="1" max="10000000" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} required />
//         </div>
//       )}

//       {/* List of All Employees */}
//       {allEmployees.length > 0 && (
//         <div className="all-employees">
//           <h3>All Employees</h3>
//           <ul>
//             {allEmployees.map(emp => (
//               <li key={emp.id}>{emp.firstName} {emp.lastName} - {emp.jobTitle}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Search;
