

import React, { useContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import CartTotal from "./CartTotal";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import { Currency, Receipt } from "lucide-react";

const PlaceOrder = () => {
    const {
        cartItems,
        products,
        token,
        setCartItems,
        totalAmount, // Directly use the `totalAmount` from ShopContext
    } = useContext(ShopContext);

    const [orderDetails, setOrderDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        area: '',
        street: '',
        district: '',
        state: '',
        country: '',
        phone: '',
        pincode: '',
        paymentMethod: 'cod', // Default payment method
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails({ ...orderDetails, [name]: value });
    };

    const initPay = (order) => {
        console.log("Razorpay Order ID:", order.id); // Log Razorpay Order ID
        const options = {
            key: import.meta.env.VITE_RAZORPAY,
            amount: order.amount,
            currency: order.currency,
            name: "Order Payment",
            description: "Order Payment",
            order_id: order.id, // Corrected to use Razorpay order ID
            receipt: order.receipt,
            handler: async (response) => {
                console.log("Response from Razorpay:", response);  // Log the full response here
                const orderId = response.razorpay_order_id;  // Extract Razorpay order ID
                console.log("Extracted Order ID:", orderId);  // Log the extracted order ID to confirm it's correct
            
                try {
                    const verifyResponse = await axios.post(
                        `${backendUrl}/api/order/verify-payment`,
                        { paymentOrderId: orderId },  // Send orderId to the backend
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
            
                    if (verifyResponse.data.success) {
                        toast.success('Payment verified successfully! 🎉');
                        setCartItems({});
                        localStorage.removeItem('cartItems');
                        navigate('/orders');
                    } else {
                        toast.error('Payment verification failed!');
                    }
                } catch (error) {
                    console.error('Payment verification error:', error);
                    toast.error('An error occurred during payment verification.');
                }
            },
            
            prefill: {
                name: orderDetails.firstName + ' ' + orderDetails.lastName,
                email: orderDetails.email,
                contact: orderDetails.phone,
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
            address: {
                firstName: orderDetails.firstName,
                lastName: orderDetails.lastName,
                email: orderDetails.email,
                street: orderDetails.street,
                area: orderDetails.area,
                district: orderDetails.district,
                state: orderDetails.state,
                country: orderDetails.country,
                phone: orderDetails.phone,
                pincode: orderDetails.pincode,
            },
            items: Object.keys(cartItems)
                .map((itemId) => {
                    const product = products.find((product) => product._id === itemId);
                    if (product && cartItems[itemId] > 0) {
                        return {
                            ...product,
                            quantity: cartItems[itemId],
                        };
                    }
                    return null;
                })
                .filter((item) => item !== null),
            amount: totalAmount, // Use the `totalAmount` from context
            paymentMethod: orderDetails.paymentMethod,
            payment: orderDetails.paymentMethod === 'cod' ? false : true, // Adjust payment status for COD
            status: 'Order placed', // Default order status
            date: Date.now(),
        };

        try {
            let response;
            switch (orderDetails.paymentMethod) {
                case 'cod':
                    response = await axios.post(
                        `${backendUrl}/api/order/place`,
                        orderData,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    if (response.data.success) {
                        setCartItems({});
                        localStorage.removeItem('cartItems');
                        toast.success('Order placed successfully! 🎉');
                        navigate('/orders');
                    } else {
                        toast.error(response.data.message);
                    }
                    break;

                case 'razorpay':
                    response = await axios.post(
                        `${backendUrl}/api/order/razorpay`,
                        orderData,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    if (response.data.success) {
                        console.log('Razorpay Order:', response.data.order); // Log Razorpay order data
                        initPay(response.data.order); // Initiate Razorpay payment
                    } else {
                        toast.error(response.data.message);
                    }
                    break;

                case 'stripe':
                    response = await axios.post(
                        `${backendUrl}/api/order/stripe`,
                        { amount: orderData.amount },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    if (response.data.success) {
                        setCartItems({});
                        localStorage.removeItem('cartItems');
                        toast.success('Order placed successfully! 🎉');
                        window.location.href = response.data.redirectUrl;
                    } else {
                        toast.error(response.data.message);
                    }
                    break;

                default:
                    toast.error('Invalid payment method selected.');
            }
        } catch (error) {
            console.error('Order submission failed:', error);
            toast.error('An error occurred while placing your order. Please try again later.');
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Place Your Order</h2>
            <form onSubmit={handleSubmit}>
                {/* First Name and Last Name */}
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={orderDetails.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-4">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={orderDetails.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                {/* Email Address */}
                <div className="mb-4">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={orderDetails.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Address Fields */}
                <div className="mb-4">
                    <label htmlFor="street" className="form-label">Street</label>
                    <input
                        type="text"
                        className="form-control"
                        id="street"
                        name="street"
                        value={orderDetails.street}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <label htmlFor="area" className="form-label">Area</label>
                        <input
                            type="text"
                            className="form-control"
                            id="area"
                            name="area"
                            value={orderDetails.area}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-4">
                        <label htmlFor="district" className="form-label">District</label>
                        <input
                            type="text"
                            className="form-control"
                            id="district"
                            name="district"
                            value={orderDetails.district}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <label htmlFor="state" className="form-label">State</label>
                        <input
                            type="text"
                            className="form-control"
                            id="state"
                            name="state"
                            value={orderDetails.state}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-4">
                        <label htmlFor="country" className="form-label">Country</label>
                        <input
                            type="text"
                            className="form-control"
                            id="country"
                            name="country"
                            value={orderDetails.country}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                {/* Contact Info */}
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={orderDetails.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-4">
                        <label htmlFor="pincode" className="form-label">Pincode</label>
                        <input
                            type="text"
                            className="form-control"
                            id="pincode"
                            name="pincode"
                            value={orderDetails.pincode}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                {/* Payment Method */}
                <div className="mb-4">
                    <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                    <select
                        className="form-select"
                        id="paymentMethod"
                        name="paymentMethod"
                        value={orderDetails.paymentMethod}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="cod">Cash on Delivery</option>
                        <option value="razorpay">Razorpay</option>
                    </select>
                </div>

                {/* Cart Summary */}
                <CartTotal />

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100">Place Order</button>
            </form>
        </div>
    );
};

export default PlaceOrder;
