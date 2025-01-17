

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogOut = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear all necessary data from localStorage
        localStorage.clear(); // Removes all keys from localStorage

        // Display a success message
        toast.success('Logged out successfully!');

        // Redirect to the login page
        navigate('/login');
    }, [navigate]);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4 text-center">
                    <h2 className="mb-4">Logging Out...</h2>
                    <p>You are being redirected to the login page.</p>
                </div>
            </div>
        </div>
    );
};

export default LogOut;
