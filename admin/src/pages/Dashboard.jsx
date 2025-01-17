import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import '../App.css'
 

const Dashboard = () => {
  return (
    <div className="dashboard-container">

      <div className="main-content">
     
        <div className="dashboard-content">
          <h1>Welcome to SwipeShare Admin Dashboard</h1>
          <p>Overview of website performance, recent activity, and analytics.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
