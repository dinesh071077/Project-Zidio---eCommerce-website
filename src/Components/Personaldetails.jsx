import React, { useState, useEffect } from 'react';

const Personaldetails = ({ user }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(' https://project-zidio-ecommerce-website-backend.onrender.com/api/user/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        alert('Profile updated successfully');
      } else {
        alert('Failed: ' + result.message);
      }
    } catch (err) {
      console.error(err);
      alert('Error updating profile');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md p-4 bg-gray-800 text-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Personal Details</h2>

      <div className="mb-3">
        <label className="block mb-1">Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 rounded bg-gray-700" />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} disabled className="w-full p-2 rounded bg-gray-600 cursor-not-allowed" />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Phone Number:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 rounded bg-gray-700" />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Address:</label>
        <textarea name="address" value={formData.address} onChange={handleChange} className="w-full p-2 rounded bg-gray-700" />
      </div>

      <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Update</button>
    </form>
  );
};

export default Personaldetails;
