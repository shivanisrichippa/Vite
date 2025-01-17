import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Import menu icon

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <ul className="list-unstyled">
          <li className="mb-3">
            <Link to="/" className="text-white d-block px-3 py-2 rounded">
              Dashboard
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/add" className="text-white d-block px-3 py-2 rounded">
              Add Product
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/list" className="text-white d-block px-3 py-2 rounded">
              Product List
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/orders" className="text-white d-block px-3 py-2 rounded">
              Orders
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/settings" className="text-white d-block px-3 py-2 rounded">
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
