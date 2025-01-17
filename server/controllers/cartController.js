// import userModel from "../models/userModel.js";


// //add products to user cart
// const addToCart=async(req,res)=>{
//     try {
//         const{userId,itemId}=req.body;
//         const userData=await userModel.findById(userId)
//         const cartData=await userData.cartData;

//         if(cartData[itemId]){
//             if(cartData[itemId]){
//                 cartData[itemId]+=1

//             }
//             else{
//                 cartData[itemId]=1
//             }
//         }else{
//             cartData[itemId]={}


//         }
//         await userModel.findByIdAndUpdate(userId,{cartData})
//         res.json({success:true,message:"Added to cart"})
        
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:error.message})
        
//     }

// }

// //update user cart
// const updateCart=async(req,res)=>{

//     try {
//         const {userId,itemId,quantity}=req.body;
//         const userData=await userModel.findById(userId)
//         const cartData=await userData.cartData;
//         cartData[itemId]=quantity


//         await userModel.findByIdAndUpdate(userId,{cartData})
//         res.json({success:true,message:"Cart updated"})


        
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:error.message})
        
//     }

// }

// //get user cart data
// const getUserCart=async(req,res)=>{

//     try {
//         const{userId}=req.body;
//         const userData=await userModel.findById(userId)
//         let cartData=await userData.cartData;

//         res.json({success:true,cartData})

        
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:error.message})
        
//     }

// }

// export {addToCart,updateCart,getUserCart};


// import userModel from "../models/userModel.js";

// // Add products to the user's cart
// const addToCart = async (req, res) => {
//   try {
//     const { userId, itemId } = req.body;

//     // Fetch the user by ID
//     const user = await userModel.findById(userId);
//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     // Update cart data
//     const cartData = user.cartData || {};
//     cartData[itemId] = (cartData[itemId] || 0) + 1;

//     // Save the updated cart data
//     await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
//     res.json({ success: true, message: "Product added to cart" });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: "Failed to add product to cart" });
//   }
// };

// // Update cart item quantity
// const updateCart = async (req, res) => {
//   try {
//     const { userId, itemId, quantity } = req.body;

//     if (quantity <= 0) {
//       return res.json({ success: false, message: "Quantity must be greater than zero" });
//     }

//     const user = await userModel.findById(userId);
//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     const cartData = user.cartData || {};
//     cartData[itemId] = quantity;

//     await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
//     res.json({ success: true, message: "Cart updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: "Failed to update cart" });
//   }
// };

// // Remove item from the user's cart
// const removeFromCart = async (req, res) => {
//   try {
//     const { userId, itemId } = req.body;

//     const user = await userModel.findById(userId);
//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     const cartData = user.cartData || {};
//     delete cartData[itemId];

//     await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
//     res.json({ success: true, message: "Item removed from cart" });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: "Failed to remove item from cart" });
//   }
// };

// // Get user's cart data
// const getUserCart = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     const user = await userModel.findById(userId);
//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     const cartData = user.cartData || {};
//     res.json({ success: true, cartData });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: "Failed to fetch cart data" });
//   }
// };

// export { addToCart, updateCart, removeFromCart, getUserCart };










// import userModel from "../models/userModel.js";

// // Add products to user cart

// const addToCart = async (req, res) => {
//   try {
//       const { userId, itemId } = req.body;
//       const user = await userModel.findById(userId);

//       if (!user) {
//           return res.status(404).json({ success: false, message: "User not found" });
//       }

//       let cartData = user.cartData || {};

//       if (cartData[itemId]) {
//           cartData[itemId] += 1;
//       } else {
//           cartData[itemId] = 1;
//       }

//       user.cartData = cartData;
//       await user.save();

//       res.json({ success: true, message: "Added to cart", cartData });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, message: error.message });
//   }
// };


// // Update user cart
// const updateCart = async (req, res) => {
//     try {
//         const { userId, itemId, quantity } = req.body;
//         const userData = await userModel.findById(userId);
//         let  cartData = await userData.cartData ;

//         // if (quantity > 0) {
//         //     cartData[itemId] = quantity;
//         // } else {
//         //     delete cartData[itemId];
//         // }

//         cartData[itemId]=quantity;

//         await userModel.findByIdAndUpdate(userId, { cartData });
//         res.json({ success: true, message: "Cart updated" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Get user cart data
// const getUserCart = async (req, res) => {
//     try {
//         const { userId } = req.body;
//         const userData = await userModel.findById(userId);
//         let cartData = await userData.cartData;

//         res.json({ success: true, cartData });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// export { addToCart, updateCart, getUserCart };


// import userModel from "../models/userModel.js";

// // Add product to cart
// export const addToCart = async (req, res) => {
//     try {
//         const { userId, itemId } = req.body;
//         const userData = await userModel.findById(userId);
        
//         if (!userData) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         let cartData = userData.cartData || {};

//         if (cartData[itemId]) {
//             cartData[itemId] += 1;
//         } else {
//             cartData[itemId] = 1;
//         }

//         await userModel.findByIdAndUpdate(userId, { cartData });
        
//         res.json({ success: true, message: "Product added to cart", cartData });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Get cart data for a user
// export const getUserCart = async (req, res) => {
//     try {
//         const { userId } = req.body;
//         const userData = await userModel.findById(userId);

//         if (!userData) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         const cartData = userData.cartData || {};
//         res.json({ success: true, message: "Cart data retrieved", cartData });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Update product quantity in cart
// export const updateCart = async (req, res) => {
//     try {
//         const { userId, itemId, quantity } = req.body;
//         const userData = await userModel.findById(userId);

//         if (!userData) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         let cartData = userData.cartData || {};
//         if (quantity <= 0) {
//             delete cartData[itemId]; // Remove item from cart if quantity is 0 or less
//         } else {
//             cartData[itemId] = quantity;
//         }

//         await userModel.findByIdAndUpdate(userId, { cartData });
//         res.json({ success: true, message: "Cart updated", cartData });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Remove product from cart
// export const removeFromCart = async (req, res) => {
//     try {
//         const { userId, itemId } = req.body;
//         const userData = await userModel.findById(userId);

//         if (!userData) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         let cartData = userData.cartData || {};
//         delete cartData[itemId];

//         await userModel.findByIdAndUpdate(userId, { cartData });
//         res.json({ success: true, message: "Product removed from cart", cartData });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };








import userModel from "../models/userModel.js";

// // Add product to cart
// export const addToCart = async (req, res) => {
//     try {
//         const { userId, itemId } = req.body;
//         const userData = await userModel.findById(userId);
        
//         if (!userData) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         let cartData = userData.cartData || {};

//         if (cartData[itemId]) {
//             cartData[itemId] += 1;
//         } else {
//             cartData[itemId] = 1;
//         }

//         await userModel.findByIdAndUpdate(userId, { cartData });
        
//         res.json({ success: true, message: "Product added to cart", cartData });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Get cart data for a user
// export const getUserCart = async (req, res) => {
//     try {
//         const { userId } = req.body;
//         const userData = await userModel.findById(userId);

//         if (!userData) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         const cartData = userData.cartData || {};
//         res.json({ success: true, message: "Cart data retrieved", cartData });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Update product quantity in cart
// export const updateCart = async (req, res) => {
//     try {
//         const { userId, itemId, quantity } = req.body;
//         const userData = await userModel.findById(userId);

//         if (!userData) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         let cartData = userData.cartData || {};
//         if (quantity <= 0) {
//             delete cartData[itemId]; // Remove item from cart if quantity is 0 or less
//         } else {
//             cartData[itemId] = quantity;
//         }

//         await userModel.findByIdAndUpdate(userId, { cartData });
//         res.json({ success: true, message: "Cart updated", cartData });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Remove product from cart
// export const removeFromCart = async (req, res) => {
//     try {
//         const { userId, itemId } = req.body;
//         const userData = await userModel.findById(userId);

//         if (!userData) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         let cartData = userData.cartData || {};
//         delete cartData[itemId];

//         await userModel.findByIdAndUpdate(userId, { cartData });
//         res.json({ success: true, message: "Product removed from cart", cartData });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


// --- Cart Controller Functions ---
export const addToCart = async (req, res) => {
    try {
      const { userId, itemId } = req.body;
      const userData = await userModel.findById(userId);
  
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      const cartData = userData.cartData || {};
      cartData[itemId] = (cartData[itemId] || 0) + 1;
  
      await userModel.findByIdAndUpdate(userId, { cartData });
      res.json({ success: true, message: "Product added to cart", cartData });
    } catch (error) {
      console.error("Error in addToCart:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  
  export const getUserCart = async (req, res) => {
    try {
      const { userId } = req.body;
      const userData = await userModel.findById(userId);
  
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      const cartData = userData.cartData || {};
      res.json({ success: true, message: "Cart data retrieved", cartData });
    } catch (error) {
      console.error("Error in getUserCart:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  
  export const updateCart = async (req, res) => {
    try {
      const { userId, itemId, quantity } = req.body;
      const userData = await userModel.findById(userId);
  
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      const cartData = userData.cartData || {};
      if (quantity <= 0) {
        delete cartData[itemId];
      } else {
        cartData[itemId] = quantity;
      }
  
      await userModel.findByIdAndUpdate(userId, { cartData });
      res.json({ success: true, message: "Cart updated", cartData });
    } catch (error) {
      console.error("Error in updateCart:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  
  export const removeFromCart = async (req, res) => {
    try {
      const { userId, itemId } = req.body;
      const userData = await userModel.findById(userId);
  
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      const cartData = userData.cartData || {};
      delete cartData[itemId];
  
      await userModel.findByIdAndUpdate(userId, { cartData });
      res.json({ success: true, message: "Product removed from cart", cartData });
    } catch (error) {
      console.error("Error in removeFromCart:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };