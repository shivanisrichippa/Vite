// import jwt from 'jsonwebtoken'
// const authUser=async(req,res,next)=>{
//     const {token}=req.headers;

//     if(!token){
//         return res.json({success:false,message:"Not authorized login again"})
//     }
//     try {
//         const token_decode=jwt.verify(token,process.env.JWT_SECRET)
//         req.body.userId=token_decode.id
//         next();
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:error.message})

        
//     }


// }
// export default authUser;


/////for any other auth user uncomment below 

// import jwt from "jsonwebtoken";

// const authUser = async (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//         return res.status(401).json({ success: false, message: "Not authorized, login again" });
//     }

//     try {
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//         req.body.userId = token_decode.id;
//         next();
//     } catch (error) {
//         console.error(error);
//         res.status(401).json({ success: false, message: "Invalid token" });
//     }
// };

// export default authUser;

import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, login again' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decodedToken.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export default authUser;
