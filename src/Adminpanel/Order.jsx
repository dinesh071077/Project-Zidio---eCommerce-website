import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/checkout/all');
      setOrders(res.data.orders);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/checkout/${orderId}`, {
        status: newStatus
      });
      fetchOrders();
    } catch (err) {
      console.error("Status update failed:", err);
      alert("Failed to update order status.");
    }
  };

  const statusOptions = ["Pending", "Confirmed", "Shipping", "Delivered", "Cancelled"];

  return (
    <div style={{ padding: '30px', backgroundColor: '#0f172a', minHeight: '100vh', color: '#f1f5f9' }}>
     <button
  onClick={() => navigate(-1)}
  className="text-blue-400 hover:underline text-lg mb-4"
>
  ← Back
</button>


      <h1 className="text-3xl font-bold mb-6 text-blue-400">Admin Order Management</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 text-sm">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="border px-3 py-2">#</th>
                <th className="border px-3 py-2">Order ID</th>
                <th className="border px-3 py-2">User ID</th>
                <th className="border px-3 py-2">Amount</th>
                <th className="border px-3 py-2">Status</th>
                <th className="border px-3 py-2">Update Status</th>
                <th className="border px-3 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={order._id} className="hover:bg-gray-700">
                  <td className="border px-3 py-2">{idx + 1}</td>
                  <td className="border px-3 py-2">{order._id}</td>
                  <td className="border px-3 py-2">{order.userId}</td>
                  <td className="border px-3 py-2">₹{order.totalAmount}</td>
                  <td className="border px-3 py-2">
                    <span className={`px-2 py-1 rounded font-semibold text-xs 
                      ${order.status === "Pending" ? "bg-yellow-500 text-black" :
                        order.status === "Confirmed" ? "bg-blue-400 text-black" :
                        order.status === "Shipping" ? "bg-purple-500 text-white" :
                        order.status === "Delivered" ? "bg-green-500 text-black" :
                        order.status === "Cancelled" ? "bg-red-600 text-white" :
                        "bg-gray-500 text-white"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="border px-3 py-2">
                    <select
                      className="bg-gray-800 border border-gray-600 text-white rounded px-2 py-1"
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="border px-3 py-2">{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
