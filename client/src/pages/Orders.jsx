import React, { useContext, useEffect, useState, useCallback } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets } from "../assets/assets";

const Orders = () => {
  const { backendUrl, token } = useContext(ShopContext);
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const loadOrderData = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        { userId: token },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success && Array.isArray(response.data.orders)) {
        const allOrdersItem = [];
        response.data.orders.forEach((order) => {
          if (Array.isArray(order.items)) {
            order.items.forEach((item) => {
              item["status"] = order.status;
              item["payment"] = order.payment;
              item["paymentMethod"] = order.paymentMethod;
              item["deliveryStatus"] = order.status || "Pending"; // Delivery status is tied to order status
              item["date"] = order.date;
              item["orderId"] = order._id;

              // Set payment status based on payment method
              if (order.paymentMethod === "razorpay" ) {
                item["paymentStatus"] = "Paid";
              } else {
                item["paymentStatus"] = "Unpaid";
              }

              allOrdersItem.push(item);
            });
          }
        });
        setOrderData(allOrdersItem.reverse());
      } else {
        setError(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching orders");
    } finally {
      setLoading(false);
    }
  }, [token, backendUrl]);

  const handleCancelOrder = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/cancel`,
        { orderId: selectedOrderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setOrderData((prevOrders) =>
          prevOrders.filter((order) => order.orderId !== selectedOrderId)
        );
        toast.success("Order canceled successfully!");
      } else {
        toast.error(response.data.message || "Failed to cancel order");
      }
    } catch (error) {
      toast.error("An error occurred while canceling the order");
    } finally {
      setShowConfirmation(false);
    }
  };

  const confirmCancelOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setSelectedOrderId(null);
  };

  useEffect(() => {
    loadOrderData();
  }, [loadOrderData]);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-uppercase fw-bold">Your Orders</h2>

      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : orderData.length === 0 ? (
        <div className="text-center">
          <img
            src={assets.exchange_icon}
            alt="No orders"
            style={{ maxWidth: "200px" }}
          />
          <p>You have no orders yet. Start shopping now!</p>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate("/product")}
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="row">
          {orderData.map((item) => (
            <div key={item._id} className="col-12 mb-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="row g-0">
                  <div className="col-4 d-flex align-items-center justify-content-center">
                    <img
                      src={item.image?.[0] || "/placeholder.png"}
                      alt={item.name || "Product Image"}
                      className="img-fluid rounded"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div className="col-8">
                    <div className="card-body">
                      <h5 className="card-title mb-2">{item.name || "Unknown Product"}</h5>
                      <p className="card-text mb-1">
                        <strong>Price:</strong> Rs. {item.price || "N/A"}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Payment Method:</strong> {item.paymentMethod || "N/A"}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Payment Status:</strong> {item.paymentStatus === "Paid" ? (
                          <span className="badge text-bg-success">Paid</span>
                        ) : (
                          <span className="badge text-bg-danger">Unpaid</span>
                        )}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Delivery Status:</strong>{" "}
                        <span
                          className={`badge text-bg-${
                            item.deliveryStatus === "Delivered"
                              ? "success"
                              : item.deliveryStatus === "Shipped"
                              ? "primary"
                              : "warning"
                          }`}
                        >
                          {item.deliveryStatus || "Pending"}
                        </span>
                      </p>
                      <p className="card-text mb-1">
                        <strong>Order Date:</strong> {new Date(item.date).toLocaleString()}
                      </p>
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-danger btn-sm w-auto mx-1"
                          onClick={() => confirmCancelOrder(item.orderId)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showConfirmation && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cancel Order</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseConfirmation}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to cancel this order?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={handleCloseConfirmation}
                >
                  No
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleCancelOrder}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
