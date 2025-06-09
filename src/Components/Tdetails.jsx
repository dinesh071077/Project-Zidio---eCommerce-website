
// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// function Tdetails() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [selectedSize, setSelectedSize] = useState(null);

//   const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

//   if (!state) {
//     return <div className="text-white text-center mt-10">T-shirt not found!</div>;
//   }

//   return (
//     <div className="bg-gray-900 min-h-screen text-white p-4 md:p-10">
//       <button
//         onClick={() => navigate(-1)}
//         className="text-blue-400 underline mb-6"
//       >
//         ← Back
//       </button>

//       <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
//         {/* Image Section */}
//         <div className="w-full md:w-1/2">
//           <img
//             src={state.img}
//             alt={state.name}
//             className="w-full h-[400px] md:h-[550px] object-cover rounded-xl shadow-lg"
//           />
//         </div>

//         {/* Details Section */}
//         <div className="w-full md:w-1/2 space-y-4">
//           <h1 className="text-2xl md:text-3xl font-bold">{state.name}</h1>
//           <p className="text-blue-400 text-xl">₹{state.price}</p>
//           <p className="text-gray-300">{state.description}</p>

//           {/* Size Selector */}
//           <div>
//             <p className="text-lg font-semibold mb-2">Select Size:</p>
//             <div className="flex flex-wrap gap-3">
//               {sizes.map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => setSelectedSize(size)}
//                   className={`px-4 py-2 rounded-full border text-sm font-medium 
//                     ${selectedSize === size 
//                       ? 'bg-blue-500 text-white border-blue-500' 
//                       : 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700'}
//                   `}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Add to Bag */}
//           <button
//             className={`mt-4 px-6 py-2 ${
//               selectedSize ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 cursor-not-allowed'
//             } text-white rounded-lg shadow`}
//             disabled={!selectedSize}
//           >
//             Add to Bag
//           </button>

//           {/* Product Details */}
//           <div className="mt-6 space-y-2 text-gray-300 text-sm">
//             <p>• 100% Bio Wash Cotton Pure High Quality Fabric</p>
//             <p>• Regular Fit | Crew Neck | Short Sleeves</p>
//             <p>• Machine Wash | Medium</p>
//             <p>• Package contains 1 T-shirt</p>
//             <p>• We recommend you buy a size larger</p>
//           </div>
//         </div>
//       </div>
      
//     </div>
//   );
// }

// export default Tdetails;


// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// function Tdetails() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

//   if (!state) {
//     return <div className="text-white text-center mt-10">T-shirt not found!</div>;
//   }

//   const handleAddToBag = () => {
//     setLoading(true);

//     setTimeout(() => {
//       const cartItem = {
//         ...state,
//         selectedSize,
//       };
//       const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
//       existingCart.push(cartItem);
//       localStorage.setItem("cart", JSON.stringify(existingCart));
//       setLoading(false);
//       alert("Item added to bag!");
//     }, 1500);
//   };

//   const handleBuyNow = () => {
//     if (!selectedSize) {
//       alert("Please select a size before buying.");
//       return;
//     }

//     navigate("/checkout", { state: { ...state, selectedSize } });
//   };

//   return (
//     <motion.div
//       className="bg-gray-900 min-h-screen text-white p-4 md:p-10"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <button
//         onClick={() => navigate(-1)}
//         className="text-blue-400 underline mb-6"
//       >
//         ← Back
//       </button>

//       <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
//         <div className="w-full md:w-1/2">
//           <motion.img
//             src={state.imageUrl}
//             alt={state.name}
//             className="w-full h-[400px] md:h-[550px] object-cover rounded-xl shadow-lg"
//             initial={{ scale: 0.8 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 0.5 }}
//           />
//         </div>

//         <div className="w-full md:w-1/2 space-y-4">
//           <motion.h1
//             className="text-2xl md:text-3xl font-bold"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             {state.name}
//           </motion.h1>

//           <motion.p
//             className="text-blue-400 text-xl"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             ₹{state.price}
//           </motion.p>

//           <motion.p
//             className="text-gray-300"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//           >
//             {state.description}
//           </motion.p>

//           <div>
//             <motion.p
//               className="text-lg font-semibold mb-2"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.6 }}
//             >
//               Select Size:
//             </motion.p>

//             <motion.div
//               className="flex flex-wrap gap-3"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.8 }}
//             >
//               {sizes.map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => setSelectedSize(size)}
//                   className={`px-4 py-2 rounded-full border text-sm font-medium 
//                     ${selectedSize === size 
//                       ? 'bg-blue-500 text-white border-blue-500' 
//                       : 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700'}`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </motion.div>
//           </div>

//           {loading ? (
//             <div className="flex justify-center items-center mt-6">
//               <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//               <span className="ml-2 text-blue-400">Adding to bag...</span>
//             </div>
//           ) : (
//             <motion.div
//               className="mt-4 flex gap-4"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 1 }}
//             >
//               <button
//                 onClick={handleAddToBag}
//                 className={`px-6 py-2 ${
//                   selectedSize ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 cursor-not-allowed'
//                 } text-white rounded-lg shadow`}
//                 disabled={!selectedSize}
//               >
//                 Add to Bag
//               </button>
//               <button
//                 onClick={handleBuyNow}
//                 className={`px-6 py-2 ${
//                   selectedSize ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 cursor-not-allowed'
//                 } text-white rounded-lg shadow`}
//                 disabled={!selectedSize}
//               >
//                 Buy Now
//               </button>
//             </motion.div>
//           )}

//           <motion.div
//             className="mt-6 space-y-2 text-gray-300 text-sm"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 1.2 }}
//           >
//             <p>• 100% Bio Wash Cotton Pure High Quality Fabric</p>
//             <p>• Regular Fit | Crew Neck | Short Sleeves</p>
//             <p>• Machine Wash | Medium</p>
//             <p>• Package contains 1 T-shirt</p>
//             <p>• We recommend you buy a size larger</p>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default Tdetails;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';

function Tdetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [tshirt, setTshirt] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSizeDetails, setSelectedSizeDetails] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchTshirt = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tshirt/${state._id}`);
        setTshirt(res.data);
      } catch (err) {
        console.error('Failed to fetch T-shirt details:', err);
      }
    };
const getCartCount = async () => {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const res = await axios.get('http://localhost:5000/api/cart', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCartCount(res.data.items.length);
  } catch (err) {
    console.error('Failed to fetch cart count:', err);
  }
};

    if (state?._id) fetchTshirt();
    getCartCount();
  }, [state]);

  const handleSizeClick = (sizeKey) => {
    setSelectedSize(sizeKey);
    setSelectedColor(null); // reset selected color
    const sizeInfo = tshirt?.sizes?.[sizeKey];
    if (sizeInfo) setSelectedSizeDetails(sizeInfo);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

 const handleAddToBag = async () => {
  if (!selectedSize || !selectedColor) {
    alert('Please select both size and color.');
    return;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login to add items to your cart.');
    navigate('/login'); // optional: redirect to login
    return;
  }

  try {
    setLoading(true);

    const response = await axios.post(
      'http://localhost:5000/api/cart/add',
      {
        productId: tshirt._id,
        selectedSize,
        selectedColor,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send token to backend
        },
      }
    );

    console.log('Cart Add Success:', response.data);
    alert('Item added to cart!');
    // Optional: update cart count if needed
    setCartCount(prev => prev + 1);
  } catch (error) {
    console.error('Add to cart failed:', error);
    if (error.response && error.response.status === 403) {
      alert('Access forbidden. Please login again.');
      localStorage.removeItem('token');
      navigate('/login'); // redirect to login
    } else {
      alert('Something went wrong while adding to cart.');
    }
  } finally {
    setLoading(false);
  }
};


  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color before buying.');
      return;
    }
   navigate('/checkout', {
  state: {
    tshirtId: tshirt._id,
    name: tshirt.name,
    price: tshirt.price,
    imageUrl: tshirt.imageUrl,
    selectedSize,
    selectedColor,
   
  },
});

  };

  if (!tshirt) {
    return <div className="text-white text-center mt-10">Loading T-shirt details...</div>;
  }

  return (
    <motion.div
      className="bg-gray-900 min-h-screen text-white p-4 md:p-10 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cart Icon */}
     {/* Cart Icon: Navigate to Cart Page */}
     <div
         className="fixed top-4 right-4 z-50 cursor-pointer"
         onClick={() => navigate('/cart')}
         title="Go to Cart"
     >
     <div className="relative">
        <FaShoppingCart className="text-white text-2xl" />
        {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
        {cartCount}
      </span>
    )}
  </div>
</div>


      <button onClick={() => navigate(-1)} className="text-blue-400 underline mb-6">
        ← Back
      </button>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <motion.img
            src={tshirt.imageUrl}
            alt={tshirt.name}
            className="w-full h-[400px] md:h-[550px] object-cover rounded-xl shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Right Details */}
        <div className="w-full md:w-1/2 space-y-4">
          <motion.h1 className="text-2xl md:text-3xl font-bold">{tshirt.name}</motion.h1>
          <motion.p className="text-blue-400 text-xl">₹{tshirt.price}</motion.p>
          <motion.p className="text-gray-300">{tshirt.description}</motion.p>

          {/* Sizes */}
          <div>
            <p className="text-lg font-semibold mb-2">Select Size:</p>
            <div className="flex flex-wrap gap-3">
              {Object.entries(tshirt.sizes || {}).map(([sizeKey]) => (
                <button
                  key={sizeKey}
                  onClick={() => handleSizeClick(sizeKey)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium 
                    ${selectedSize === sizeKey
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-gray-800 border-gray-600 text-white hover:bg-gray-700'}`}
                >
                  {sizeKey}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          {selectedSizeDetails && (
            <div className="mt-4 space-y-2 text-sm">
              <p className="font-semibold mb-2">Select Color:</p>
              <div className="flex flex-wrap gap-4">
                {selectedSizeDetails.colors.map((colorName, idx) => {
                  let status = '';
                  if (selectedSizeDetails.quantity === 0) status = 'Unavailable';
                  else if (selectedSizeDetails.quantity < 5) status = 'Few available';
                  else status = 'Available';

                  return (
                    <div
                      key={idx}
                      className={`flex flex-col items-center cursor-pointer`}
                      onClick={() => {
                        if (selectedSizeDetails.quantity > 0) handleColorClick(colorName);
                      }}
                    >
                      <div
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200`}
                        style={{
                          backgroundColor: colorName.toLowerCase(),
                          borderColor:
                            selectedColor === colorName ? 'white' : 'gray',
                          transform:
                            selectedColor === colorName ? 'scale(1.2)' : 'scale(1)',
                        }}
                        title={colorName}
                      />
                      <span className="text-gray-300 text-xs mt-1">{status}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Buttons */}
          {loading ? (
            <div className="flex justify-center items-center mt-6">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-2 text-blue-400">Adding to bag...</span>
            </div>
          ) : (
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleAddToBag}
                className={`px-6 py-2 ${selectedSize && selectedColor
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-gray-500 cursor-not-allowed'
                  } text-white rounded-lg shadow`}
                disabled={!selectedSize || !selectedColor}
              >
                Add to Bag
              </button>
              <button
                onClick={handleBuyNow}
                className={`px-6 py-2 ${selectedSize && selectedColor
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-gray-500 cursor-not-allowed'
                  } text-white rounded-lg shadow`}
                disabled={!selectedSize || !selectedColor}
              >
                Buy Now
              </button>
            </div>
          )}

          {/* Highlights */}
          <div className="mt-6 space-y-2 text-gray-300 text-sm">
            {tshirt.highlights?.map((point, index) => (
              <p key={index}>• {point}</p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Tdetails;
