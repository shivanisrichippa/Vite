
import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { backendUrl } from '../App'; // Ensure this path is correct

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to the dashboard if the user is already logged in
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/'); // Already logged in, redirect to dashboard
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                toast.success('Login successful!');
                navigate('/');  // Navigate to the dashboard page
            } else {
                toast.error(response.data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login Error:', error);
            toast.error('Failed to log in. Please check your credentials.');
        }
    };

    return (
        <div className="login-container">
            <ToastContainer />
            <h2 className="text-center">Admin Login</h2>
            <form id="admin-login-form" onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="admin-email">Admin Email</label>
                    <input
                        type="email"
                        id="admin-email"
                        name="email"
                        className="form-control"
                        placeholder="Enter your admin email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="admin-password">Password</label>
                    <input
                        type="password"
                        id="admin-password"
                        name="password"
                        className="form-control"
                        placeholder="Enter your password"
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3 w-100">
                    Admin Login
                </button>
            </form>
            <p className="text-center mt-3">
                Forgot your password? <a href="/admin-forgot-password">Reset it here</a>
            </p>
        </div>
    );
};

export default Login;
