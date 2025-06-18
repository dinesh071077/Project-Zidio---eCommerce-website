

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css';

function MyOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userToken = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(' https://project-zidio-ecommerce-website-backend.onrender.com/api/checkout/my-orders', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setOrders(res.data.orders);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userToken]);

  const handleCancel = async (orderId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    try {
      await axios.put(` https://project-zidio-ecommerce-website-backend.onrender.com/api/orders/${orderId}/cancel`, {}, {
        headers: { Authorization: `Bearer ${userToken}` }
      });

      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );
    } catch (err) {
      console.error("Cancel failed:", err);
      alert("Failed to cancel the order.");
    }
  };

  return (
    <div className="my-orders-page" style={{ padding: '20px', color: 'white', backgroundColor: '#0f172a', minHeight: '100vh' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#60a5fa', fontSize: '16px', marginBottom: '20px' }}>
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {loading ? (
        <p>Loading your orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card" style={{ border: '1px solid #374151', padding: '15px', marginBottom: '20px', borderRadius: '10px', backgroundColor: '#1e293b' }}>
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg font-semibold text-blue-400">Order #{index + 1}</p>
              <span className={`px-3 py-1 text-sm rounded-full font-semibold 
                ${order.status === "Pending" ? "bg-yellow-500 text-black" :
                  order.status === "Delivered" ? "bg-green-500 text-black" :
                  order.status === "Cancelled" ? "bg-red-500 text-white" :
                  "bg-gray-600"}`}>
                {order.status}
              </span>
            </div>

            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
            <p><strong>Payment ID:</strong> {order.paymentId}</p>
            <p><strong>Method:</strong> {order.paymentMethod}</p>
            <p><strong>Shipping:</strong> {order.shippingAddress}</p>
            <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>

            <div style={{ marginTop: '10px' }}>
              <strong>Items:</strong>
              <ul className="list-disc pl-5">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} | Size: {item.size} | Color: {item.color} | Qty: {item.quantity} | ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md transition"
                onClick={() => alert('Tracking feature coming soon!')}
              >
                Track Order
              </button>

              {order.status !== "Delivered" && order.status !== "Cancelled" && (
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md transition"
                  onClick={() => handleCancel(order._id)}
                >
                  Cancel Order
                </button>
              )}

              {order.status === "Cancelled" && (
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md transition">
                  Request Refund
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
