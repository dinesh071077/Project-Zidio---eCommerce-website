// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// function Checkout() {
//   const navigate = useNavigate();
//   const { state } = useLocation();

//   // Support both single product and cart (multiple products)
//   const items = state?.cartItems || [state];

//   if (!items || !items.length) {
//     return <div className="text-white text-center mt-10">No item found!</div>;
//   }

//   const total = items.reduce((sum, item) => sum + item.price, 0);

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

//       {/* Shipping Address */}
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
//         <input
//           type="text"
//           placeholder="Enter your address"
//           className="w-full p-2 rounded bg-gray-800 text-white"
//         />
//       </div>

//       {/* Payment Method */}
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
//         <select className="w-full p-2 rounded bg-gray-800 text-white">
//           <option value="upi">UPI</option>
//           <option value="card">Credit/Debit Card</option>
//           <option value="cod">Cash on Delivery</option>
//         </select>
//       </div>

//       {/* Order Summary */}
//       <div className="border-t border-gray-700 pt-4 mt-6">
//         <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
//         {items.map((item, index) => (
//           <div key={index} className="mb-2">
//             <p>{item.name} - Size: {item.selectedSize}</p>
//             <p className="text-blue-400">Price: ₹{item.price}</p>
//           </div>
//         ))}
//         <p className="mt-4 font-bold text-xl">Total: ₹{total}</p>
//       </div>

//       {/* Place Order */}
//       <button className="mt-6 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
//         Place Order
//       </button>
//     </div>
//   );
// }

// export default Checkout;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const token = localStorage.getItem('token'); // Get JWT from localStorage

  const items = state?.cartItems || [state];
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

const handlePlaceOrder = async () => {
  if (!address.trim()) return alert('Please enter your shipping address.');

  const isScriptLoaded = await loadRazorpayScript();
  if (!isScriptLoaded) return alert('Razorpay SDK failed to load.');

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to login first!');
      return;
    }

    // 1. Create Order
    const { data } = await axios.post(
      'http://localhost:5000/api/checkout/create',
      { amount: total }, // amount in rupees
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const options = {
      key: 'rzp_test_QopNQ6tXDHThvf',
      amount: data.order.amount,
      currency: 'INR',
      name: 'Tee Store',
      description: 'T-shirt Purchase',
      order_id: data.order.id,
      handler: async (response) => {
        try {
          // 2. Verify Signature
          const verifyRes = await axios.post(
            'http://localhost:5000/api/checkout/verify',
            {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (verifyRes.data.success) {
            // 3. Confirm Order
            await axios.post(
              'http://localhost:5000/api/checkout/confirm',
              {
                items,
                totalAmount: total,
                paymentId: response.razorpay_payment_id,
                paymentMethod,
                shippingAddress: address,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            navigate('/myorder', { state: { items, address, total } });
          } else {
            alert('Payment verification failed.');
          }
        } catch (err) {
          console.error('Verification or confirmation error:', err);
          alert('Payment verification failed.');
        }
      },
      prefill: {
        name: 'Customer',
        email: 'customer@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#22c55e',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error('Order creation failed:', err);
    alert('Something went wrong. Please try again.');
  }
};

  if (!items || items.length === 0) {
    return <div className="text-white text-center mt-10">No item found!</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 md:p-10">
      <button onClick={() => navigate(-1)} className="text-blue-400 hover:underline mb-6">
        ← Back
      </button>

      <h1 className="text-2xl mb-4 font-bold">Checkout</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
        <input
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        >
          <option value="upi">UPI</option>
          <option value="card">Credit/Debit Card</option>
          <option value="cod">Cash on Delivery</option>
        </select>
      </div>

      <div className="border-t border-gray-700 pt-4 mt-6">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
        {items.map((item, index) => (
          <div key={index} className="mb-4 border-b border-gray-700 pb-2">
            <p className="font-semibold">{item.name}</p>
            <p>Size: {item.selectedSize}</p>
            <p>Color: {item.selectedColor}</p>
            <p className="text-blue-400">₹{item.price}</p>
          </div>
        ))}
        <p className="mt-4 font-bold text-xl">Total: ₹{total}</p>
      </div>

      <button
        className="mt-6 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
