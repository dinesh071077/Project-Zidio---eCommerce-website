
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const UpdateTshirts = () => {
  const [tshirts, setTshirts] = useState([]);
  const navigate = useNavigate();

  // Fetch all T-shirts
  const fetchTshirts = async () => {
    try {
      const res = await fetch(' https://project-zidio-ecommerce-website-backend.onrender.com/api/put/all');
      const data = await res.json();
      setTshirts(data);
    } catch (err) {
      console.error('Error fetching T-shirts:', err);
    }
  };

  useEffect(() => {
    fetchTshirts();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-tshirt/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this T-shirt?')) {
      try {
        const res = await fetch(`http://localhost:5000/api/put/delete/${id}`, {
          method: 'DELETE',
        });

        const result = await res.json();

        if (res.ok) {
          alert(result.message || 'Deleted successfully');
          fetchTshirts(); // Refresh list
        } else {
          alert('Delete failed: ' + result.message);
        }
      } catch (error) {
        console.error('Delete Error:', error);
        alert('Something went wrong during deletion.');
      }
    }
  };

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <button
        onClick={() => navigate('/admin')}
        className="flex items-center gap-2 text-sm mb-6 text-blue-400 hover:underline"
      >
        <FaArrowLeft />
        Back
      </button>

      <h2 className="text-xl font-bold mb-4">Update T-Shirts</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-gray-800 rounded-lg">
          <thead className="text-gray-400 border-b border-gray-700">
            <tr>
              <th className="py-2">Image</th>
              <th className="py-2">Name</th>
              <th className="py-2">Price</th>
              <th className="py-2">Type</th>
              <th className="py-2">Edit</th>
              <th className="py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {tshirts.map((tshirt) => (
              <tr key={tshirt._id} className="border-b border-gray-700">
                <td className="py-2">
                  <img
                    src={tshirt.imageUrl}
                    alt={tshirt.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="py-2">{tshirt.name}</td>
                <td className="py-2">₹{tshirt.price}</td>
                <td className="py-2">{tshirt.tshirtType}</td>
                <td className="py-2">
                  <button
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                    onClick={() => handleEdit(tshirt._id)}
                  >
                    Edit
                  </button>
                </td>
                <td className="py-2">
                  <button
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                    onClick={() => handleDelete(tshirt._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {tshirts.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No T-shirts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateTshirts;
