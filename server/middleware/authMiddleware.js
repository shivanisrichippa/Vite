// // import jwt from 'jsonwebtoken';
// // import userModel from '../models/userModel.js';

// // const authMiddleware = async (req, res, next) => {
// //     const authHeader = req.headers.authorization; // Extract the authorization header
// //     if (!authHeader || !authHeader.startsWith('Bearer ')) {
// //         return res.status(401).json({ success: false, message: "No token provided" });
// //     }

// //     const token = authHeader.split(' ')[1]; // Extract the token part after 'Bearer'
    
// //     try {
// //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //         const user = await userModel.findById(decoded.id);
// //         if (!user) {
// //             return res.status(401).json({ success: false, message: "User not found" });
// //         }

// //         req.user = user;  // Attach the user to the request object
// //         next();  // Proceed to the next middleware or route handler
// //     } catch (error) {
// //         return res.status(401).json({ success: false, message: "Invalid token" });
// //     }
// // };

// // export default authMiddleware;

// // import jwt from 'jsonwebtoken';
// // import userModel from '../models/userModel.js';

// // const authMiddleware = async (req, res, next) => {
// //     const authHeader = req.headers.authorization;
// //     if (!authHeader || !authHeader.startsWith('Bearer ')) {
// //         return res.status(401).json({ success: false, message: "No token provided" });
// //     }

// //     const token = authHeader.split(' ')[1];
// //     try {
// //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //         const user = await userModel.findById(decoded.id);
// //         if (!user) {
// //             return res.status(401).json({ success: false, message: "User not found" });
// //         }

// //         req.user = user;
// //         next();
// //     } catch (error) {
// //         return res.status(401).json({ success: false, message: "Invalid token" });
// //     }
// // };

// // export default authMiddleware;

// import jwt from 'jsonwebtoken';
// import User from '../models/userModel.js'; // Assume you have a user model

// export const isAuthenticated = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = await User.findById(decoded.id);
//         next();
//     } catch (error) {
//         res.status(401).json({ success: false, message: 'Unauthorized' });
//     }
// };

// export const isAdmin = (req, res, next) => {
//     if (req.user.role !== 'admin') {
//         return res.status(403).json({ success: false, message: 'Admin access required' });
//     }
//     next();
// };




// import jwt from 'jsonwebtoken';
// import User from '../models/userModel.js';

// export const isAuthenticated = async (req, res, next) => {
//     // try {
//         // Extract token from Authorization header
//         const token = req.headers.authorization;
//         console.log(token);

//     //     if (!token) {
//     //         return res.status(401).json({ success: false, message: 'No token provided' });
//     //     }

//     //     // Verify token
//     //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     //     // Find user by ID in decoded token
//     //     const user = await User.findById(decoded.id);

//     //     if (!user) {
//     //         return res.status(401).json({ success: false, message: 'User not found in the database' });
//     //     }

//     //     req.user = user; // Attach user to request object
//     //     next();
//     // } catch (err) {
//     //     if (err.name === 'TokenExpiredError') {
//     //         return res.status(401).json({ success: false, message: 'Token expired' });
//     //     }
//     //     console.error("JWT Verification Error:", err);
//     //     res.status(401).json({ success: false, message: 'Invalid token' });
//     // }
// };
// export const isAdmin = (req, res, next) => {
//     if (req.user?.email !== process.env.ADMIN_EMAIL) {
//         return res.status(403).json({ success: false, message: 'Admin access required' });
//     }
//     next();
// };

// import jwt from 'jsonwebtoken';
// import User from '../models/userModel.js';

// export const isAuthenticated = async (req, res, next) => {
//     try {
//         // Extract token from Authorization header
//         const token = req.headers.authorization; // Extract token from "Bearer <token>"

//         if (!token) {
//             return res.status(401).json({ success: false, message: 'Token not provided' });
//         }

//         // Verify the token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // Find user by ID in decoded token
//         const user = await User.findById(decoded.id);

//         if (!user) {
//             return res.status(401).json({ success: false, message: 'User not found in the database' });
//         }

//         req.user = user; // Attach user to the request object
//         next(); // Continue to the next middleware or route handler
//     } catch (err) {
//         if (err.name === 'TokenExpiredError') {
//             return res.status(401).json({ success: false, message: 'Token expired' });
//         }

//         console.error('JWT Verification Error:', err);
//         return res.status(401).json({ success: false, message: 'Invalid token' });
//     }
// };
// export const isAdmin = (req, res, next) => {
//         if (req.user?.email !== process.env.ADMIN_EMAIL) {
//             return res.status(403).json({ success: false, message: 'Admin access required' });
//         }
//         next();
//     };


import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'; // This is not strictly necessary now, but can be useful for logging purposes.

export const isAuthenticated = async (req, res, next) => {
    try {
        // Extract token from Authorization header (format: "Bearer <token>")
        const token = req.headers.token; // Extract the token from "Bearer <token>"
        console.log(token);

        if (!token) {
            return res.status(401).json({ success: false, message: 'Token not provided' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded token to request object
        req.user = decoded; // No need to fetch user from DB as you’re just checking the role directly

        next(); // Continue to the next middleware or route handler
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired' });
        }

        console.error('JWT Verification Error:', err);
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin' || req.user?.email !== process.env.ADMIN_EMAIL) {
        return res.status(403).json({ success: false, message: 'Admin access required' });
    }
    
    next(); // Allow access if the user is an admin
};
