// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import { backendUrl } from '../App';
// import { ShopContext } from '../context/ShopContext';



// const Login = () => {

//     const {token,setToken}=useContext(ShopContext);
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.post(`${backendUrl}/api/user/login`, formData);

//             if (data.success) {
//                 // Store token in localStorage and navigate to the home page
//                 localStorage.setItem('authToken', data.token);
               
//                 //extra
//                 toast.success('Login successful!');
//                 navigate('/');  // Redirect to home page
//             } else {
//                 toast.error(data.message || 'Login failed. Please try again.');
//             }
//         } catch (error) {
//             console.error('Login error:', error);
//             toast.error('Login failed. Please try again.');
//         }
//     };

   

//     return (
//         <div className="container mt-5">
//             <div className="row justify-content-center">
//                 <div className="col-md-6 col-lg-4">
//                     <h2 className="text-center mb-4">Login</h2>
//                     <form onSubmit={handleSubmit}>
//                         <div className="form-group mb-3">
//                             <label>Email</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 className="form-control"
//                                 required
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <div className="form-group mb-3">
//                             <label>Password</label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 className="form-control"
//                                 required
//                                 onChange={handleChange}
//                             />
//                         </div>
//                         <button type="submit" className="btn btn-warning mt-3 w-100">Login</button>
//                     </form>
//                     <p className="text-center mt-3">
//                         Don't have an account? <a href="/signup">Sign up here</a>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;




import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backendUrl } from '../App';
import axios from 'axios';

const Login = () => {
  const { token, setToken } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  // Redirect to home if the user is already logged in
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/login`, formData);
      if (data.success) {
        localStorage.setItem('authToken', data.token); // Store token in localStorage
        setToken(data.token); // Set token in context
        toast.success('Login successful!');
        navigate('/'); // Redirect to home page
      } else {
        toast.error(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-warning mt-3 w-100">Login</button>
          </form>
          <p className="text-center mt-3">
            Don't have an account? <a href="/signup">Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
