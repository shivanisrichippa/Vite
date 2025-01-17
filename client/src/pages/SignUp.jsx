



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        id: '',
        year: '',
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [token, setToken] = useState(localStorage.getItem('authToken')); // Initialize with localStorage
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        Object.keys(formData).forEach((key) => form.append(key, formData[key]));
        if (image) form.append('image', image);

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/sign-up`, form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (data.success) {
                localStorage.setItem('authToken', data.token);
                setToken(data.token); // Update state
                toast.success('Signup successful!');
                navigate('/'); // Redirect to home page
            } else {
                toast.error(data.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            toast.error('Signup failed. Please try again.');
        }
    };

    useEffect(() => {
        if (token) {
            navigate('/');
            toast.success('Already Signup successful!');
             // Redirect to home if logged in
        }
    }, [token, navigate]);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input type="text" name="name" className="form-control" required onChange={handleChange} />
                        </div>
                        <div className="form-group mb-3">
                            <label>Email</label>
                            <input type="email" name="email" className="form-control" required onChange={handleChange} />
                        </div>
                        <div className="form-group mb-3">
                            <label>Password</label>
                            <input type="password" name="password" className="form-control" required onChange={handleChange} />
                        </div>
                        <div className="form-group mb-3">
                            <label>Address</label>
                            <textarea name="address" className="form-control" rows="3" required onChange={handleChange}></textarea>
                        </div>
                        <div className="form-group mb-3">
                            <label>ID Number</label>
                            <input type="text" name="id" className="form-control" required onChange={handleChange} />
                        </div>
                        <div className="form-group mb-3">
                            <label>Year</label>
                            <input type="text" name="year" className="form-control" required onChange={handleChange} />
                        </div>
                        <div className="form-group mb-3">
                            <label>Upload College ID Card</label>
                            <input type="file" className="form-control" required onChange={handleFileChange} />
                            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-3" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
                        </div>
                        <button type="submit" className="btn btn-warning mt-3 w-100">Sign Up</button>
                    </form>
                    <p className="text-center mt-3">
                        Already have an account? <a href="/login">Login here</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
