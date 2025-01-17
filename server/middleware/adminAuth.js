
// import jwt from 'jsonwebtoken';

// const adminLogin = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Check if the email and password match the ones in the .env file
//         if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
//             return res.status(400).json({ success: false, message: 'Invalid credentials' });
//         }

//         // Generate a JWT token after successful login
//         const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.json({ success: true, message: 'Login successful', token });

//     } catch (error) {
//         console.error('Admin login error:', error);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// };
// export default adminLogin;

import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
  console.log("Inside adminAuth middleware");
  console.log("Authorization Header:", req.headers.authorization);

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ success: false, message: "Unauthorized access." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded successfully:", decoded);
    req.user = decoded; // Add decoded token to request for further use
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ success: false, message: "Invalid token." });
  }
};

export default adminAuth;
