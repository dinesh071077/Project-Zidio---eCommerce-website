
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Marvel() {
  const navigate = useNavigate();
  const [tshirts, setTshirts] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // For buffering
  const [isLoading, setIsLoading] = useState(true); // Initial loading

  useEffect(() => {
    const fetchTshirts = async () => {
      try {
        const res = await fetch(' https://project-zidio-ecommerce-website-backend.onrender.com/api/tshirt/type/Marvel T-Shirt');
        const data = await res.json();
        setTshirts(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching sport t-shirts:', err);
      }
    };

    fetchTshirts();
  }, []);

  const viewDetails = (tshirt) => {
    setLoadingId(tshirt._id);
    setTimeout(() => {
      navigate(`/tshirt/${tshirt._id}`, { state: tshirt });
    }, 1000);
  };

  return (
    <div className="bg-gray-900 text-white pt-4 px-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Marvel Collection</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {tshirts.map((shirt) => (
            <motion.div
              key={shirt._id}
              className="bg-gray-800 p-4 rounded-xl shadow-md cursor-pointer relative"
              onClick={() => viewDetails(shirt)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {loadingId === shirt._id ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-80 rounded-xl">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                  <span className="text-sm text-blue-400">Loading...</span>
                </div>
              ) : (
                <>
                  <img
                    src={shirt.imageUrl}
                    alt={shirt.name}
                    className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-lg font-semibold">{shirt.name}</h2>
                  <p className="text-blue-400 text-md">₹{shirt.price}</p>
                </>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Marvel;

