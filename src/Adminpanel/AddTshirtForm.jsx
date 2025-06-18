
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const defaultTshirt = {
  name: '',
  details: '',
  price: '',
  image: '',
  type: '',
  sizes: {
    S: '',
    M: '',
    L: '',
    XL: '',
  },
  colors: {
    S: [],
    M: [],
    L: [],
    XL: [],
  },
  tempColorInput: {
    S: '',
    M: '',
    L: '',
    XL: '',
  },
};

const AddTshirtForm = () => {
  const [products, setProducts] = useState([defaultTshirt]);
  const navigate = useNavigate();

  const handleChange = (index, e) => {
    const updated = [...products];
    updated[index][e.target.name] = e.target.value;
    setProducts(updated);
  };

  const handleSizeChange = (index, e, size) => {
    const updated = [...products];
    updated[index].sizes[size] = e.target.value;
    setProducts(updated);
  };

  const handleColorInputChange = (index, e, size) => {
    const updated = [...products];
    updated[index].tempColorInput[size] = e.target.value;
    setProducts(updated);
  };

  const handleAddColor = (index, size) => {
    const updated = [...products];
    const color = updated[index].tempColorInput[size].trim();
    if (color && !updated[index].colors[size].includes(color)) {
      updated[index].colors[size].push(color);
      updated[index].tempColorInput[size] = '';
      setProducts(updated);
    }
  };

  const handleRemoveColor = (index, size, colorIndex) => {
    const updated = [...products];
    updated[index].colors[size].splice(colorIndex, 1);
    setProducts(updated);
  };

  const handleAddMore = () => {
    if (products.length < 5) {
      setProducts([...products, JSON.parse(JSON.stringify(defaultTshirt))]);
    } else {
      alert('You can only add up to 5 T-shirts at once.');
    }
  };

  const handleRemove = (removeIndex) => {
    const updated = products.filter((_, index) => index !== removeIndex);
    setProducts(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = products.map((product) => {
      const highlights = product.details
        .split('\n')
        .map((line) => line.replace(/^•\s*/, '').trim())
        .filter(Boolean);

      const sizes = {};
      ['S', 'M', 'L', 'XL'].forEach((size) => {
        const quantity = Number(product.sizes[size]) || 0;
        const colors = product.colors[size] || [];
        if (quantity > 0 || colors.length > 0) {
          sizes[size] = { quantity, colors };
        }
      });

      return {
        name: product.name,
        price: Number(product.price),
        tshirtType: product.type,
        sizes,
        imageUrl: product.image,
        highlights,
      };
    });

    const finalPayload = payload.length === 1 ? payload[0] : payload;

    try {
      const response = await fetch(' https://project-zidio-ecommerce-website-backend.onrender.com/api/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalPayload),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'T-shirts added successfully!');
        navigate('/admin');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Submit Error:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white p-6 shadow">
      <button
        onClick={() => navigate('/admin')}
        className="flex items-center gap-2 text-sm mb-6 text-blue-400 hover:underline"
      >
        <FaArrowLeft />
        Back
      </button>

      <h3 className="text-lg font-semibold mb-4">Add 1 to 5 New T-Shirts</h3>

      <form onSubmit={handleSubmit} className="space-y-10">
        {products.map((product, index) => (
          <div key={index} className="border border-gray-700 p-4 rounded space-y-4 relative">
            <div className="flex justify-between items-center">
              <h4 className="text-md font-bold">T-Shirt {index + 1}</h4>
              {products.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-red-500 hover:text-red-700 text-xl font-bold"
                >
                  ×
                </button>
              )}
            </div>

            <input
              type="text"
              name="name"
              value={product.name}
              onChange={(e) => handleChange(index, e)}
              placeholder="T-Shirt Name"
              required
              className="w-full px-3 py-2 border rounded bg-gray-800 text-white border-gray-700"
            />

            <textarea
              name="details"
              value={product.details}
              onChange={(e) => handleChange(index, e)}
              rows="3"
              placeholder="• 100% cotton\n• Comfortable fit"
              required
              className="w-full px-3 py-2 border rounded bg-gray-800 text-white border-gray-700"
            />

            <input
              type="number"
              name="price"
              value={product.price}
              onChange={(e) => handleChange(index, e)}
              placeholder="Price (₹)"
              required
              className="w-full px-3 py-2 border rounded bg-gray-800 text-white border-gray-700"
            />

            <input
              type="text"
              name="image"
              value={product.image}
              onChange={(e) => handleChange(index, e)}
              placeholder="Image URL"
              required
              className="w-full px-3 py-2 border rounded bg-gray-800 text-white border-gray-700"
            />

            <select
              name="type"
              value={product.type}
              onChange={(e) => handleChange(index, e)}
              className="w-full px-3 py-2 border rounded bg-gray-800 text-white border-gray-700"
              required
            >
              <option value="">-- Select Type --</option>
              <option value="Full Sleeve">Full Sleeve</option>
              <option value="Half Sleeve">Half Sleeve</option>
              <option value="Over Sized">Over Sized</option>
              <option value="Formal T-Shirt">Formal T-Shirt</option>
              <option value="Sports T-Shirt">Sports T-Shirt</option>
              <option value="Marvel T-Shirt">Marvel T-Shirt</option>
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <div key={size}>
                  <label className="text-sm">{size} Stock</label>
                  <input
                    type="number"
                    min="0"
                    value={product.sizes[size]}
                    onChange={(e) => handleSizeChange(index, e, size)}
                    placeholder="Quantity"
                    className="w-full px-2 py-1 mb-1 border rounded bg-gray-800 text-white border-gray-700"
                  />
                  <div className="flex gap-1">
                    <input
                      type="text"
                      value={product.tempColorInput[size]}
                      onChange={(e) => handleColorInputChange(index, e, size)}
                      placeholder="Add Color"
                      className="flex-1 px-2 py-1 border rounded bg-gray-800 text-white border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddColor(index, size)}
                      className="bg-green-600 px-2 text-sm rounded"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.colors[size].map((color, colorIdx) => (
                      <span
                        key={colorIdx}
                        className="bg-blue-700 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
                      >
                        {color}
                        <button
                          type="button"
                          onClick={() => handleRemoveColor(index, size, colorIdx)}
                          className="text-white ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddMore}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          + Add Another T-Shirt
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-4"
        >
          Submit All T-Shirts
        </button>
      </form>
    </div>
  );
};

export default AddTshirtForm;
