import React, { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Create ShopContext
export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
    const currency = "Rs."; // Currency used across the app
    const backendUrl = import.meta.env.VITE_BACKEND_URL; // Backend URL from environment variables
    const navigate = useNavigate();

    // State variables
    const [token, setToken] = useState(localStorage.getItem("authToken") || "");
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || {}); // Initialize cart from local storage
    const [loading, setLoading] = useState(false);

    // Fetch products from backend
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${backendUrl}/api/product/list/verified`);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    // Fetch user cart data
    const fetchCartData = async () => {
        if (token) {
            setLoading(true);
            try {
                const response = await axios.post(
                    `${backendUrl}/api/cart/get`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (response.data.success) {
                    const newCartItems = response.data.cartData ? structuredClone(response.data.cartData) : {};
                    setCartItems(newCartItems);
                    localStorage.setItem('cartItems', JSON.stringify(newCartItems)); // Update local storage
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch cart data");
            } finally {
                setLoading(false);
            }
        }
    };

    const addToCart = async (itemId) => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            toast.error("Please log in to add products to the cart");
            navigate("/login");
            return;
        }

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        setCartItems(cartData);
        localStorage.setItem('cartItems', JSON.stringify(cartData));

        try {
            const response = await axios.post(
                `${backendUrl}/api/cart/add`,
                { itemId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                setCartItems(structuredClone(response.data.cartData));
                toast.success("Product added to cart");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Remove product from cart
    const removeFromCart = async (itemId) => {
        const updatedCart = structuredClone(cartItems);
        delete updatedCart[itemId];
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));

        if (token) {
            try {
                const response = await axios.post(
                    `${backendUrl}/api/cart/remove`,
                    { itemId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (response.data.success) {
                    setCartItems(structuredClone(response.data.cartData));
                    toast.success("Product removed from cart");
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Error removing product from cart");
            }
        }
    };

    // Update product quantity in cart
    const updateQuantity = async (itemId, quantity) => {
        if (quantity <= 0) {
            return removeFromCart(itemId);
        }

        const updatedCart = structuredClone(cartItems);
        updatedCart[itemId] = quantity;
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));

        if (token) {
            try {
                const response = await axios.post(
                    `${backendUrl}/api/cart/update`,
                    { itemId, quantity },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (response.data.success) {
                    setCartItems(structuredClone(response.data.cartData));
                    toast.success("Cart updated successfully");
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Error updating cart");
            }
        }
    };

    // Calculate total items in the cart
    const getCartCount = () => {
        return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
    };

    // Filter products based on search
    const filteredProducts = useMemo(() => {
        return products.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, products]);

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const product = products.find((product) => product._id === itemId);
            if (product) {
                totalAmount += product.price * cartItems[itemId];
            }
        }
        return totalAmount;
    };

    // Fetch products on initial mount
    useEffect(() => {
        fetchProducts();
    }, []);

    // Fetch cart data whenever token changes
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (!token && storedToken) {
            setToken(storedToken);
            fetchCartData(storedToken);
        }
    }, [token, setToken]);

    return (
        <ShopContext.Provider
            value={{
                products: filteredProducts,
                cartItems,
                setCartItems,
                currency,
                search,
                setSearch,
                addToCart,
                removeFromCart,
                updateQuantity,
                getCartCount,
                loading,
                backendUrl,
                token,
                setToken,
                getCartAmount,
                totalAmount: getCartAmount() // Make sure to call getCartAmount here
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};





///did nit added the /place api ,,so it is hitting 500 internal error