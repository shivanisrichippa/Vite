
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backendUrl } from "../App"; // Ensure this path is correct
import { format } from "date-fns"; // Import date-fns for formatting

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("token"); // Get the admin token from localStorage

  const fetchAllOrders = async () => {
    if (!adminToken) {
      toast.error("Unauthorized access. Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      if (response.data.success) {
        // Filter out orders that are delivered or canceled
        const filteredOrders = response.data.orders.filter(
          (order) => order.status !== "Delivered" && order.status !== "Canceled"
        );
        setOrders(filteredOrders.reverse()); // Set the filtered orders
      } else {
        setError(response.data.message || "Failed to fetch orders");
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      setError("An error occurred while fetching orders.");
      toast.error("An error occurred while fetching orders.");
      console.error("[DEBUG] Fetch Orders Error:", error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!adminToken) {
      toast.error("Unauthorized access. Please log in.");
      navigate("/login");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const response = await axios.delete(
        `${backendUrl}/api/orders/${orderId}`,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );

      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId)
        );
        toast.success("Order deleted successfully.");
      } else {
        toast.error(response.data.message || "Failed to delete the order.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the order.");
    }
  };

  // Handle Status Change
  const handleStatusChange = async (event, orderId) => {
    if (!adminToken) {
      toast.error("Unauthorized access. Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        {orderId,status:event.target.value },
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );

      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Order status updated successfully!");
      } else {
        toast.error(response.data.message || "Failed to update order status.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the order status.");
    }
  };

  useEffect(() => {
    if (adminToken) {
      fetchAllOrders();
    } else {
      console.log("[DEBUG] Admin token not found in localStorage.");
    }
  }, [adminToken]);

  return (
    <div className="container my-5">
      <ToastContainer />
      <h2 className="text-center mb-4 text-uppercase fw-bold">All Orders</h2>

      {error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order._id} className="col-12 mb-4">
              <div className="card shadow-lg rounded-3 border-0">
                <div className="card-body p-4">
                  {/* Order ID */}
                  <h5 className="card-title text-primary">Order ID: {order._id}</h5>

                  {/* Product Image */}
                  <div className="d-flex justify-content-center mb-3">
                    {order.items && order.items.length > 0
                      ? order.items.map((item, itemIndex) => (
                          <img
                            key={itemIndex}
                            src={item.image?.[0] || "/placeholder.png"}
                            alt={item.name || "Product Image"}
                            className="img-fluid rounded"
                            style={{
                              width: "180px",
                              height: "180px",
                              objectFit: "cover",
                              margin: "0 10px 10px 0",
                            }}
                          />
                        ))
                      : "No images available"}
                  </div>

                  {/* Order Details */}
                  <div className="row">
                    {/* User Details */}
                    <div className="col-md-4">
                      <p><strong>User:</strong> {order.address.firstName} {order.address.lastName}</p>
                      <p><strong>Email:</strong> {order.address.email}</p>
                      <p><strong>Phone:</strong> {order.address.phone}</p>
                    </div>

                    {/* Address Details */}
                    <div className="col-md-4">
                      <p><strong>Address:</strong></p>
                      <p>{order.address.street}, {order.address.area}</p>
                      <p>{order.address.district}, {order.address.state}</p>
                      <p>{order.address.country} - {order.address.pincode}</p>
                    </div>

                    {/* Order Summary */}
                    <div className="col-md-4">
                      <p><strong>Total Amount:</strong> Rs. {order.amount}</p>
                      <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                      <p><strong>Order Date:</strong> {order.date ? format(new Date(order.date), "MMM dd, yyyy HH:mm:ss") : "N/A"}</p>
                    </div>
                  </div>

                  {/* Order Status */}
                  <p><strong>Status:</strong></p>
                  <span
                    className={`badge ${
                      order.status === "Completed"
                        ? "bg-success"
                        : order.status === "Pending"
                        ? "bg-warning"
                        : "bg-danger"
                    }`}
                  >
                    {order.status}
                  </span>
                  <select
                    value={order.status}
                    onChange={(event) => handleStatusChange(event, order._id)}
                    className="form-select mt-2"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Canceled">Canceled</option>
                  </select>

                  {/* Actions */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
