
import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
    const { cartItems, products } = useContext(ShopContext);

    // Calculate the cart total and delivery fee
    const cartTotal = Object.keys(cartItems).reduce((sum, itemId) => {
        const product = products.find((product) => product._id === itemId);
        const quantity = cartItems[itemId];
        const price = product?.price || 0;
        return sum + price * quantity;
    }, 0);

    const shippingFee = cartTotal * 0.1; // Assuming a 10% shipping fee
    const totalAmount = cartTotal + shippingFee;

    return (
        <div className="card p-4 mt-4 shadow-sm">
            <h4 className="mb-3">Cart Summary</h4>
            {Object.keys(cartItems).length > 0 ? (
                <>
                    <p>
                        <strong>Cart Total:</strong> Rs. {cartTotal.toFixed(2)}
                    </p>
                    <p>
                        <strong>Shipping Fee (10%):</strong> Rs. {shippingFee.toFixed(2)}
                    </p>
                    <h5>
                        <strong>Total Amount:</strong> Rs. {totalAmount.toFixed(2)}
                    </h5>
                </>
            ) : (
                <p> No items in the cart. </p>
            )}
        </div>
    );
};

export default CartTotal;
