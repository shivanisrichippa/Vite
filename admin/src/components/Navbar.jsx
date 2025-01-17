import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Add your navbar styling

const Navbar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <header className="navbar">
      <div className="navbar-content">
        <h2>SwipeShare Admin</h2>
        <div className="navbar-right">
          <input type="text" placeholder="Search here..." className="search-bar" />
          <span className="navbar-account" onClick={handleLogout}>Logout</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
