// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Cart() {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);

//   // Load cart items from localStorage when the component mounts
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
//     setCartItems(storedCart);
//   }, []);

//   const handleRemoveFromCart = (index) => {
//     const updatedCart = cartItems.filter((item, i) => i !== index);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//     setCartItems(updatedCart);
//   };

//   const handleCheckout = () => {
//     if (cartItems.length === 0) {
//       alert("Your cart is empty.");
//       return;
//     }
//     navigate("/checkout", { state: { cartItems } });
//   };

//   return (
//     <div className="bg-gray-900 min-h-screen text-white p-4 md:p-10">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="text-blue-400 hover:underline mb-6"
//       >
//         ← Back
//       </button>

//       <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

//       {cartItems.length === 0 ? (
//         <div className="text-center text-gray-400">Your cart is empty!</div>
//       ) : (
//         <div className="space-y-4">
//           {cartItems.map((item, index) => (
//             <div key={index} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
//               <div className="flex items-center gap-4">
//                 <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
//                 <div>
//                   <h2 className="font-semibold">{item.name}</h2>
//                   <p className="text-blue-400">₹{item.price}</p>
//                   <p className="text-gray-300">Size: {item.selectedSize}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => handleRemoveFromCart(index)}
//                 className="text-red-500 hover:text-red-600"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {cartItems.length > 0 && (
//         <div className="mt-6 flex justify-between items-center">
//           <p className="text-lg font-semibold">
//             Total: ₹{cartItems.reduce((acc, item) => acc + item.price, 0)}
//           </p>
//           <button
//             onClick={handleCheckout}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cart;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // from login
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    if (userId) {
      const storedCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      setCartItems(storedCart);
    }
  }, [userId]);

  // Remove item from cart
  const handleRemoveFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    navigate("/checkout", { state: { cartItems } });
  };

  if (!userId) {
    return (
      <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center">
        <h2 className="text-xl mb-4">Please log in to view your cart.</h2>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 md:p-10">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-400 hover:underline mb-6"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-400">Your cart is empty!</div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-800 p-4 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/100?text=No+Image";
                  }}
                />
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-blue-400">₹{item.price}</p>
                  <p className="text-gray-300">Size: {item.selectedSize}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveFromCart(index)}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-6 flex justify-between items-center">
          <p className="text-lg font-semibold">
            Total: ₹{cartItems.reduce((acc, item) => acc + item.price, 0)}
          </p>
          <button
            onClick={handleCheckout}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
