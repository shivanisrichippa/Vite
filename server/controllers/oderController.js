
// // import orderModel from "../models/orderModel.js";


// // // //placing order by COT method
// // // const placeOrder=async(req,res)=>{
// // //     try {
// // //         const {userId,items,amount,address}=req.body;
// // //         const orderData=
// // //         {
// // //             userId,
// // //             items,
// // //             amount,
// // //             address,
// // //             PaymentMethod:"COD",
// // //             payment:false,
// // //             date:Date.now()
// // //         }
// // //         const newOrder=new orderModel(orderData);
// // //         await newOrder.save();
// // //         await userModel.findByIdAndUpdate(userId,{cartData:{}})
// // //         res.json({success:true,message:"Order placed"});
        

        
// // //     } catch (error) {
// // //         console.log(error);
// // //         res.json({success:false,message:error.message})
        
// // //     }

// // // }

// // // //placing orders using stripe Method
// // // const placeOrderStripe =async(req,res)=>{

// // // }

// // // //placing orders using razorpay
// // // const placeOrderRazorpay=async(req,res)=>{
    
// // // }

// // // //all orders data fro admin
// // // const allOrders=async(req,res)=>{

// // // }

// // // //User order data for frontend
// // // const userOrders=async(req,res)=>{

// // // }
// // // //update order status from admin panel 
// // // const updateStatus=async(req,res)=>{

// // // }

// // // export {placeOrder,placeOrderStripe, placeOrderRazorpay,allOrders,userOrders,updateStatus};



// // const placeOrder = async (req, res) => {
// //     try {
// //       const { userId, items, amount, address } = req.body;
  
// //       const orderData = {
// //         userId,
// //         items,
// //         amount,
// //         address,
// //         paymentMethod: "COD",
// //         payment: false,
// //         date: Date.now(),
// //       };
  
// //       const newOrder = new orderModel(orderData);
// //       await newOrder.save();
  
// //       // Clear user's cart
// //       await userModel.findByIdAndUpdate(userId, { cartData: {} });
  
// //       res.json({ success: true, message: "Order placed successfully" });
// //     } catch (error) {
// //       console.error("Error in placeOrder:", error);
// //       res.status(500).json({ success: false, message: "Internal Server Error" });
// //     }
// //   };
  
// // const allOrders = async (req, res) => {
// //     try {
// //       const orders = await orderModel.find();
// //       res.json({ success: true, orders });
// //     } catch (error) {
// //       console.error("Error in allOrders:", error);
// //       res.status(500).json({ success: false, message: "Internal Server Error" });
// //     }
// //   };
  
// // const userOrders = async (req, res) => {
// //     try {
// //       const { userId } = req.body;
// //       const orders = await orderModel.find({ userId });
// //       res.json({ success: true, orders });
// //     } catch (error) {
// //       console.error("Error in userOrders:", error);
// //       res.status(500).json({ success: false, message: "Internal Server Error" });
// //     }
// //   };
  
// // const updateStatus = async (req, res) => {
// //     try {
// //       const { orderId, status } = req.body;
// //       const updatedOrder = await orderModel.findByIdAndUpdate(
// //         orderId,
// //         { status },
// //         { new: true }
// //       );
  
// //       if (!updatedOrder) {
// //         return res.status(404).json({ success: false, message: "Order not found" });
// //       }
  
// //       res.json({ success: true, message: "Order status updated", order: updatedOrder });
// //     } catch (error) {
// //       console.error("Error in updateStatus:", error);
// //       res.status(500).json({ success: false, message: "Internal Server Error" });
// //     }
// //   };

// //   const placeOrderStripe=async(req,res)=>{
// //   }

// //   const placeOrderRazorpay=async(req,res)=>{

// //   }



// //   export {placeOrder,placeOrderStripe, placeOrderRazorpay,allOrders,userOrders,updateStatus};









// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js"; // Make sure to import the userModel
// import axios from 'axios';

// // Place order using COD (Cash on Delivery) method
// const placeOrder = async (req, res) => {
//   try {
//     const { userId, items, amount, address, paymentMethod } = req.body;

//     const orderData = {
//       userId,
//       items,
//       amount,
//       address,
//       paymentMethod: paymentMethod || "COD", // Default to COD if no payment method provided
//       payment: paymentMethod === "COD" ? false : true, // Set payment status based on method
//       date: Date.now(),
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     // Clear user's cart data after placing the order
//     await userModel.findByIdAndUpdate(userId, { cartData: {} });

//     res.json({ success: true, message: "Order placed successfully" });
//   } catch (error) {
//     console.error("Error in placeOrder:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// // Place order using Razorpay payment method
// const placeOrderRazorpay = async (req, res) => {
//   try {
//     const { userId, items, amount, address } = req.body;

//     // Creating the order data for Razorpay
//     const orderData = {
//       userId,
//       items,
//       amount,
//       address,
//       paymentMethod: "razorpay",
//       payment: false, // Payment status initially as false
//       date: Date.now(),
//     };

//     // Create a new order in the database
//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     // Call Razorpay API to create an order
//     const razorpayOrder = await axios.post('https://api.razorpay.com/v1/orders', {
//       amount: amount * 100, // Razorpay expects the amount in paise (1 INR = 100 paise)
//       currency: 'INR',
//       receipt: newOrder._id.toString(),
//     }, {
//       auth: {
//         username: process.env.RAZORPAY_KEY_ID, // Your Razorpay key ID
//         password: process.env.RAZORPAY_KEY_SECRET, // Your Razorpay key secret
//       }
//     });

//     // Save the Razorpay order ID in the database
//     newOrder.paymentOrderId = razorpayOrder.data.id;
//     await newOrder.save();

//     res.json({
//       success: true,
//       orderId: razorpayOrder.data.id,
//       message: "Order placed successfully with Razorpay",
//     });
//   } catch (error) {
//     console.error("Error in placeOrderRazorpay:", error);
//     res.status(500).json({ success: false, message: "Failed to place order with Razorpay" });
//   }
// };

// // Place order using Stripe payment method
// const placeOrderStripe = async (req, res) => {
//   try {
//     const { userId, items, amount, address } = req.body;

//     // Create the order data for Stripe
//     const orderData = {
//       userId,
//       items,
//       amount,
//       address,
//       paymentMethod: "stripe",
//       payment: false, // Payment status initially false
//       date: Date.now(),
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     // Create a payment session using Stripe
//     const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: items.map(item => ({
//         price_data: {
//           currency: 'inr',
//           product_data: {
//             name: item.name,
//           },
//           unit_amount: item.price * 100, // Stripe expects the amount in the smallest unit (paisa)
//         },
//         quantity: item.quantity,
//       })),
//       mode: 'payment',
//       success_url: `${process.env.FRONTEND_URL}/order-success`,
//       cancel_url: `${process.env.FRONTEND_URL}/order-fail`,
//     });

//     // Save the Stripe session ID in the order
//     newOrder.paymentSessionId = session.id;
//     await newOrder.save();

//     res.json({
//       success: true,
//       sessionId: session.id,
//       message: "Order placed successfully with Stripe",
//     });
//   } catch (error) {
//     console.error("Error in placeOrderStripe:", error);
//     res.status(500).json({ success: false, message: "Failed to place order with Stripe" });
//   }
// };

// // Fetch all orders for the admin
// const allOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find().populate("userId", "name email"); // Populate user details
//     res.json({ success: true, orders });
//   } catch (error) {
//     console.error("Error in allOrders:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// // Fetch orders of a specific user
// const userOrders = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     console.log("User ID received:", userId); // Debugging line
//     const orders = await orderModel.find({ userId }).populate("userId", "name email");
//     console.log("Fetched Orders:", orders); // Debugging line
//     res.json({ success: true, orders });
//   } catch (error) {
//     console.error("Error in userOrders:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };


// // Update the status of an order (admin)
// const updateStatus = async (req, res) => {
//   try {
//     const { orderId, status } = req.body;
//     const updatedOrder = await orderModel.findByIdAndUpdate(
//       orderId,
//       { status },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     res.json({ success: true, message: "Order status updated", order: updatedOrder });
//   } catch (error) {
//     console.error("Error in updateStatus:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };


// // Example of the cancel order route in Express.js
// app.post('/api/order/cancelorder', async (req, res) => {
//   const { orderId } = req.body;
  
//   // Logic to cancel the order
//   try {
//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ success: false, message: 'Order not found' });
//     }
    
//     // Cancel the order (you may want to update its status or delete it)
//     order.status = 'Cancelled';
//     await order.save();
    
//     return res.status(200).json({ success: true, message: 'Order cancelled successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error cancelling the order' });
//   }
// });


// export {
//   placeOrder,
//   placeOrderStripe,
//   placeOrderRazorpay,
//   allOrders,
//   userOrders,
//   updateStatus,
// };


















// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js"; 
// import axios from 'axios';
// import razorpay from 'razorpay';


// const razorpayInstance = new razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_EC2vykLmImyhtG",
//   key_secret: process.env.RAZORPAY_KEY_SECRET || "J6kg4yEPRpNG93aUoUHHZlsk",
// });


// const currency='INR';


// // Place order using COD (Cash on Delivery) method
// const placeOrder = async (req, res) => {
//   try {
//     const { userId, items, amount, address, paymentMethod } = req.body;

//     const orderData = {
//       userId,
//       items,
//       amount,
//       address,
//       paymentMethod: paymentMethod || "COD", 
//       payment: paymentMethod === "COD" ? false : true, 
//       date: Date.now(),
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     // Clear user's cart data after placing the order
//     await userModel.findByIdAndUpdate(userId, { cartData: {} });

//     res.json({ success: true, message: "Order placed successfully" });
//   } catch (error) {
//     console.error("Error in placeOrder:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// const placeOrderRazorpay = async (req, res) => {
//   try {
//       const { userId, items, amount, address } = req.body;

//       const orderData = {
//           userId,
//           items,
//           amount,
//           address,
//           paymentMethod: "razorpay",
//           payment: false,
//           date: Date.now(),
//       };

//       const newOrder = new orderModel(orderData);
//       await newOrder.save();

//       const options = {
//           amount: Math.round(amount * 100), // Amount in paise
//           currency: "INR",
//           receipt: newOrder._id.toString(),
//       };

//       const razorpayOrder = await razorpayInstance.orders.create(options,(error,order)=>{
//         if(error){
//           console.log(error);
//           return res.json({success:false,message:error})
//         }
//         res.json({success:true,order})
//       });
//       // if (!razorpayOrder) {
//       //     return res.status(500).json({ success: false, message: "Failed to create Razorpay order" });
//       // }

//       // Save Razorpay order ID to the database
//       // newOrder.paymentOrderId = razorpayOrder.id;
//       // await newOrder.save();

//       // res.json({
//       //     success: true,
//       //     order: razorpayOrder,
//       //     message: "Razorpay order created successfully",
//       // });
//   } catch (error) {
//       console.error("Error in placeOrderRazorpay:", error);
//       res.status(500).json({ success: false, message: "Failed to place order with Razorpay" });
//   }
// };


// // Place order using Stripe payment method
// const placeOrderStripe = async (req, res) => {
//   try {
//     const { userId, items, amount, address } = req.body;

//     const orderData = {
//       userId,
//       items,
//       amount,
//       address,
//       paymentMethod: "stripe",
//       payment: false,
//       date: Date.now(),
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: items.map(item => ({
//         price_data: {
//           currency: 'inr',
//           product_data: {
//             name: item.name,
//           },
//           unit_amount: item.price * 100,
//         },
//         quantity: item.quantity,
//       })),
//       mode: 'payment',
//       success_url: `${process.env.FRONTEND_URL}/order-success`,
//       cancel_url: `${process.env.FRONTEND_URL}/order-fail`,
//     });

//     newOrder.paymentSessionId = session.id;
//     await newOrder.save();

//     res.json({
//       success: true,
//       sessionId: session.id,
//       message: "Order placed successfully with Stripe",
//     });
//   } catch (error) {
//     console.error("Error in placeOrderStripe:", error);
//     res.status(500).json({ success: false, message: "Failed to place order with Stripe" });
//   }
// };

// // Fetch all orders for the admin


// const allOrders = async (req, res) => {
  
//   try {
//     const orders = await orderModel.find({})  // Fetch all orders
//       .populate('userId', 'firstName lastName email phone')  // Populate user details
//       .exec();
    
   
//     res.json({ success: true, orders });
//   } catch (error) {
    
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };



// // Fetch orders of a specific user
// const userOrders = async (req, res) => {
//   try {
//     const { userId } = req.body;
    
//     const orders = await orderModel.find({ userId }).populate("userId", "name email");
    
//     res.json({ success: true, orders });
//   } catch (error) {
//     console.error("Error in userOrders:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// // Update the status of an order (admin)
// const updateStatus = async (req, res) => {
//   try {
//     const { orderId, status } = req.body;
//     const updatedOrder = await orderModel.findByIdAndUpdate(
//       orderId,
//       { status }
     
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     res.json({ success: true, message: "Order status updated", order: updatedOrder });
//   } catch (error) {
//     console.error("Error in updateStatus:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };
// // Cancel an order
// const cancelOrder = async (req, res) => {
//   try {
//     const { orderId } = req.body;

//     const deletedOrder = await orderModel.findByIdAndDelete(orderId);

//     if (!deletedOrder) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     res.json({ success: true, message: "Order canceled successfully" });
//   } catch (error) {
//     console.error("Error in cancelOrder:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };

// export {
//   placeOrder,
//   placeOrderStripe,
//   placeOrderRazorpay,
//   allOrders,
//   userOrders,
//   updateStatus,
//   cancelOrder, // Export the cancelOrder function
// };


import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto"; // For signature verification

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_EC2vykLmImyhtG",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "J6kg4yEPRpNG93aUoUHHZlsk",
});

// Place order using COD (Cash on Delivery) method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentMethod } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: paymentMethod || "COD",
      payment: paymentMethod === "COD" ? false : true,
      date: Date.now(),
      status: "Pending", // Default status
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Clear user's cart data after placing the order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Error in placeOrder:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Place order using Razorpay
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "razorpay",
      payment: false,
      date: Date.now(),
      status: "Pending", // Default status
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: Math.round(amount * 100), // Amount in paise
      currency: "INR",
      receipt: newOrder._id.toString(), // Use order ID as receipt
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    // Save Razorpay order ID to the database
    newOrder.paymentOrderId = razorpayOrder.id;
    await newOrder.save();

    console.log("Razorpay Order ID:", razorpayOrder.id); // Log Razorpay Order ID

    res.json({
      success: true,
      order: razorpayOrder,
      message: "Razorpay order created successfully",
    });
  } catch (error) {
    console.error("Error in placeOrderRazorpay:", error);
    res.status(500).json({ success: false, message: "Failed to create Razorpay order" });
  }
};
const verifyPayment = async (req, res) => {
  try {
    const { orderId } = req.body;  // Expect orderId from frontend
    console.log('Received Order ID:', orderId);  // Log the received orderId to debug

    // Match the orderId with the paymentOrderId in the database
    const updatedOrder = await orderModel.findOneAndUpdate(
        { paymentOrderId: orderId },  // Use orderId to find the order in the database
        { payment: true, status: "Paid" },  // Mark the order as paid
        { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    console.log("Order payment verified:", updatedOrder);  // Log the order after it's been verified

    res.json({ success: true, message: "Payment verified successfully", order: updatedOrder });
  } catch (error) {
    console.error("Error in verifyPayment:", error);
    res.status(500).json({ success: false, message: "Failed to verify payment" });
  }
};





// Place order using Stripe payment method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "stripe",
      payment: false,
      date: Date.now(),
      status: "Pending", // Default status
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/order-success`,
      cancel_url: `${process.env.FRONTEND_URL}/order-fail`,
    });

    newOrder.paymentSessionId = session.id;
    await newOrder.save();

    res.json({
      success: true,
      sessionId: session.id,
      message: "Order placed successfully with Stripe",
    });
  } catch (error) {
    console.error("Error in placeOrderStripe:", error);
    res.status(500).json({ success: false, message: "Failed to place order with Stripe" });
  }
};

// Fetch all orders for the admin
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("userId", "firstName lastName email phone"); // Populate user details

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Fetch orders of a specific user
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel
      .find({ userId })
      .populate("userId", "name email");

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error in userOrders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update the status of an order (admin)
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order status updated", order: updatedOrder });
  } catch (error) {
    console.error("Error in updateStatus:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Cancel an order
const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const deletedOrder = await orderModel.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order canceled successfully" });
  } catch (error) {
    console.error("Error in cancelOrder:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export {
  placeOrder,
  placeOrderRazorpay,
  verifyPayment,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  cancelOrder,
};
