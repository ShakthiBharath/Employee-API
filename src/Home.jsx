import React, { useState } from "react";
import { FaBars, FaUserCircle, FaHome, FaPlus, FaEdit, FaTrash, FaSearch, FaUsers, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Home.css";



function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [manageUsersOpen, setManageUsersOpen] = useState(false);
  const [logOutOpen, setLogOutOpen] = useState(false);
  const username = "John Doe"; // Replace with actual user data

  return (
    <div className="home-container">
      {/* Top Bar */}
      <div className="top-bar">
        <FaBars className="menu-icon" onClick={() => setMenuOpen(true)} />
        <h2>Welcome, {username}!</h2>
        <li>
                <button className="user-icon" onClick={() => setLogOutOpen((prev) => !prev)}>
                 <FaUserCircle/>
                </button>
                {logOutOpen && (
                  <ul className="dropdown-menu" style={{ listStyle: "none", paddingLeft: 0 }}>
                    <li><Link to="/"> Log Out</Link></li>
                  </ul>
                  )}
              </li>
        
      </div>

      {/* Sidebar Menu */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <FaTimes className="close-icon" onClick={() => setMenuOpen(false)} />
        <ul>
            <li><Link to="/home"><FaHome /> Home</Link></li>
            <li><Link to="/search"><FaSearch /> Search</Link></li>
            <li>
                <button className="dropdown" onClick={() => setManageUsersOpen((prev) => !prev)}>
                  Manage Users
                </button>
                {manageUsersOpen && (
                  <ul className="dropdown-menu" style={{ listStyle: "none", paddingLeft: 0 }}>
                    <li><Link to="/add-user"><FaPlus /> Add User</Link></li>
                    <li><Link to="/edit-user"><FaEdit /> Edit User</Link></li>
                    <li><Link to="/delete-user"><FaTrash /> Delete User</Link></li>
                  </ul>
                )}
              </li>

        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        <h1>Welcome to Your Dashboard</h1>
        <p>Use the menu to navigate through the application.</p>
      </div>

      
    </div>
  );
}

export default Home;