import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Support both single product and cart (multiple products)
  const items = state?.cartItems || [state];

  if (!items || !items.length) {
    return <div className="text-white text-center mt-10">No item found!</div>;
  }

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 md:p-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-400 hover:underline mb-6"
      >
        ← Back
      </button>

      <h1 className="text-2xl mb-4 font-bold">Checkout</h1>

      {/* Shipping Address */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
        <input
          type="text"
          placeholder="Enter your address"
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
        <select className="w-full p-2 rounded bg-gray-800 text-white">
          <option value="upi">UPI</option>
          <option value="card">Credit/Debit Card</option>
          <option value="cod">Cash on Delivery</option>
        </select>
      </div>

      {/* Order Summary */}
      <div className="border-t border-gray-700 pt-4 mt-6">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
        {items.map((item, index) => (
          <div key={index} className="mb-2">
            <p>{item.name} - Size: {item.selectedSize}</p>
            <p className="text-blue-400">Price: ₹{item.price}</p>
          </div>
        ))}
        <p className="mt-4 font-bold text-xl">Total: ₹{total}</p>
      </div>

      {/* Place Order */}
      <button className="mt-6 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
        Place Order
      </button>
    </div>
  );
}

export default Checkout;

// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// function Checkout() {
//   const navigate = useNavigate();
//   const { state } = useLocation();

//   // Support both single product and cart (multiple products)
//   const items = state?.cartItems || [state];

//   const [addresses, setAddresses] = useState(
//     items.map(() => "") // one address per item
//   );

//   if (!items || !items.length) {
//     return <div className="text-white text-center mt-10">No item found!</div>;
//   }

//   const handleAddressChange = (value, index) => {
//     const updated = [...addresses];
//     updated[index] = value;
//     setAddresses(updated);
//   };

//   const total = items.reduce((sum, item) => sum + item.price, 0);

//   const handlePlaceOrder = () => {
//     const filled = addresses.every(addr => addr.trim() !== "");
//     if (!filled) {
//       alert("Please enter shipping address for all items.");
//       return;
//     }

//     const orderSummary = items.map((item, idx) => ({
//       ...item,
//       shippingAddress: addresses[idx],
//     }));

//     console.log("Order Placed:", orderSummary);
//     alert("Order placed successfully!");

//     // Optionally: Redirect to success page
//     // navigate("/order-success");
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

//       <h1 className="text-2xl mb-4 font-bold">Checkout</h1>

//       {/* Address per item */}
//       {items.map((item, index) => (
//         <div key={index} className="mb-6 border-b border-gray-700 pb-4">
//           <h2 className="text-lg font-semibold mb-1">{item.name} - Size: {item.selectedSize}</h2>
//           <p className="text-blue-400 mb-2">Price: ₹{item.price}</p>
//           <input
//             type="text"
//             placeholder="Enter shipping address"
//             value={addresses[index]}
//             onChange={(e) => handleAddressChange(e.target.value, index)}
//             className="w-full p-2 rounded bg-gray-800 text-white"
//           />
//         </div>
//       ))}

//       {/* Payment Method */}
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
//         <select className="w-full p-2 rounded bg-gray-800 text-white">
//           <option value="upi">UPI</option>
//           <option value="card">Credit/Debit Card</option>
//           <option value="cod">Cash on Delivery</option>
//         </select>
//       </div>

//       {/* Total */}
//       <p className="mt-4 font-bold text-xl">Total: ₹{total}</p>

//       {/* Place Order */}
//       <button
//         className="mt-6 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
//         onClick={handlePlaceOrder}
//       >
//         Place Order
//       </button>
//     </div>
//   );
// }

// export default Checkout;
