


import React, { useState, useEffect } from 'react';
import { FaTshirt, FaUsers, FaMoneyBillWave, FaBars, FaBoxOpen } from 'react-icons/fa';
import { MdDashboard, MdShoppingCart, MdPeople } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import axios from 'axios';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [orders, setOrders] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(' https://project-zidio-ecommerce-website-backend.onrender.com/api/admin/dashboard');
        setOrders(res.data.recentOrders);
        setTotalProducts(res.data.totalProducts);
        setTotalUsers(res.data.totalUsers);
        setTotalRevenue(res.data.totalRevenue);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      }
    };
    fetchDashboardData();
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navLinks = [
    { name: 'Dashboard', href: '/admin', icon: <MdDashboard className="text-blue-400" /> },
    { name: 'Add Product', href: '/addnewtshirt', icon: <FaBoxOpen className="text-blue-400" /> },
    { name: 'Update Product', href: '/update', icon: <FaTshirt className="text-blue-400" /> },
    { name: 'Orders', href: '/order', icon: <MdShoppingCart className="text-blue-400" /> },
    { name: 'Users', href: '/user', icon: <MdPeople className="text-blue-400" /> },
     { name: 'Customer Qeries', href: '/adminsupport', icon: <MdPeople className="text-blue-400" /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-white relative">
      {/* Mobile Topbar */}
      <div className="md:hidden flex justify-between items-center p-4 bg-gray-800 w-full fixed top-0 z-30">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button onClick={() => setMobileSidebarOpen(true)}>
          <FaBars className="text-2xl text-blue-400" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={`bg-gray-800 transition-all duration-300 hidden md:flex flex-col ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Top profile section */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <img
              src="https://ik.imagekit.io/zifllo6u3/iron%20man.jpeg?updatedAt=1745042676508"
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            {sidebarOpen && (
              <div>
                <h2 className="font-bold text-white text-lg leading-4">John David</h2>
                <span className="text-xs text-green-400">Online</span>
              </div>
            )}
          </div>
          <button onClick={toggleSidebar}>
            <FaBars className="text-2xl text-blue-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 space-y-2 px-2">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="flex items-center space-x-3 hover:text-blue-400 px-2 py-2 rounded-md transition-colors"
            >
              <span className="text-xl">{link.icon}</span>
              {sidebarOpen && <span>{link.name}</span>}
            </a>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-gray-800 p-6 space-y-4 relative">
            <button
              className="absolute top-4 right-4 text-blue-400 text-2xl"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <FaBars />
            </button>
            <div className="flex items-center space-x-3 border-b pb-3 border-gray-700">
              <CgProfile className="text-3xl" />
              <span className="text-xl font-bold">Admin</span>
            </div>
            <nav className="space-y-4 mt-4">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="flex items-center space-x-3 hover:text-blue-400"
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.name}</span>
                </a>
              ))}
            </nav>
          </div>
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setMobileSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 pt-16 md:pt-6">
        <div className="hidden md:flex justify-between items-center mb-6">
          <div className="text-2xl font-semibold">Dashboard</div>
          <div className="bg-gray-800 px-4 py-2 rounded shadow text-sm">Welcome, Admin</div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-800 p-6 rounded-xl shadow flex items-center gap-4">
            <FaTshirt className="text-4xl text-yellow-300" />
            <div>
              <p className="text-sm text-gray-300">Total Products</p>
              <h2 className="text-xl font-bold text-white">{totalProducts}</h2>
            </div>
          </div>
          <div className="bg-purple-800 p-6 rounded-xl shadow flex items-center gap-4">
            <FaUsers className="text-4xl text-pink-300" />
            <div>
              <p className="text-sm text-gray-300">Total Users</p>
              <h2 className="text-xl font-bold text-white">{totalUsers}</h2>
            </div>
          </div>
          <div className="bg-green-800 p-6 rounded-xl shadow flex items-center gap-4">
            <FaMoneyBillWave className="text-4xl text-blue-400" />
            <div>
              <p className="text-sm ttext-green-300">Revenue</p>
              <h2 className="text-xl font-bold text-white">₹{totalRevenue}</h2>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mt-10 bg-white/100 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-gray-900 border-b border-gray-600">
                <tr>
                  <th className="py-2">Order ID</th>
                  <th className="py-2">User</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={idx} className="border-b text-gray-900 border-gray-700">
                    <td className="py-2">{order._id}</td>
                    <td className="py-2">{order.userName}</td>
                    <td className="py-2">₹{order.totalAmount}</td>
                    <td
                      className={`py-2 font-semibold ${
                        order.status === 'Delivered'
                          ? 'text-green-400'
                          : order.status === 'Pending'
                          ? 'text-yellow-400'
                          : order.status === 'Cancelled'
                          ? 'text-red-400'
                          : order.status === 'Refunded'
                          ? 'text-purple-400'
                          : ''
                      }`}
                    >
                      {order.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
