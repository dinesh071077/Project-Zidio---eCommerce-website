

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('Please log in to view your cart.');
        navigate('/login');
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCartItems(res.data.items || []);
      } catch (err) {
        console.error('Error fetching cart:', err);
        alert('Failed to fetch cart items. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [navigate]);

  const handleRemoveFromCart = async (itemId) => {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.delete(`http://localhost:5000/api/cart/remove/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(res.data.items || []);
    } catch (err) {
      console.error('Error removing item:', err);
      alert('Failed to remove item from cart.');
    }
  };

 const handleCheckout = () => {
  if (cartItems.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  const cleanItems = cartItems.map((item) => ({
    _id: item.productId._id,
    name: item.productId.name,
    price: item.productId.price,
    selectedSize: item.selectedSize,
    selectedColor: item.selectedColor,
  }));

  navigate('/checkout', { state: { cartItems: cleanItems } });
};


  if (loading) {
    return <div className="text-white p-10">Loading cart...</div>;
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
              key={item._id}
              className="flex justify-between items-center bg-gray-800 p-4 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.productId.imageUrl}
                  alt={item.productId.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h2 className="font-semibold">{item.productId.name}</h2>
                  <p className="text-blue-400">₹{item.productId.price}</p>
                  <p className="text-gray-300">Size: {item.selectedSize}</p>
                  <p className="text-gray-300">Color: {item.selectedColor}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item._id)}
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
            Total: ₹
            {cartItems.reduce(
              (acc, item) => acc + (item.productId.price || 0),
              0
            )}
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