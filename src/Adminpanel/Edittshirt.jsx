// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const Edittshirt = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [tshirt, setTshirt] = useState({
//     name: '',
//     price: '',
//     tshirtType: '',
//     imageUrl: ''
//   });

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/put/${id}`)
//       .then((res) => res.json())
//       .then((data) => setTshirt(data))
//       .catch((err) => console.error("Fetch error:", err));
//   }, [id]);

//   const handleChange = (e) => {
//     setTshirt({ ...tshirt, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/put/update/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(tshirt)
//       });

//       const result = await res.json();

//       if (res.ok) {
//         alert('T-shirt updated successfully!');
//         navigate('/update');
//       } else {
//         alert('Update failed: ' + result.message);
//       }
//     } catch (err) {
//       console.error('Update error:', err);
//       alert('Something went wrong.');
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-900 min-h-screen text-white">
//       <h2 className="text-xl font-bold mb-4">Edit T-Shirt</h2>
//       <div className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="T-shirt Name"
//           value={tshirt.name}
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-gray-800 border border-gray-600"
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={tshirt.price}
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-gray-800 border border-gray-600"
//         />
//         <input
//           type="text"
//           name="tshirtType"
//           placeholder="Type (Half Sleeve / Full Sleeve / etc)"
//           value={tshirt.tshirtType}
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-gray-800 border border-gray-600"
//         />
//         <input
//           type="text"
//           name="imageUrl"
//           placeholder="Image URL"
//           value={tshirt.imageUrl}
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-gray-800 border border-gray-600"
//         />
//         <button
//           onClick={handleUpdate}
//           className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
//         >
//           Update T-Shirt
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Edittshirt;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const EditTshirt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tshirt, setTshirt] = useState(null);
  const [tempColorInput, setTempColorInput] = useState({ S: '', M: '', L: '', XL: '' });

  useEffect(() => {
    const fetchTshirt = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/put/single/${id}`);
        const data = await res.json();
        if (res.ok) {
          setTshirt(data);
        } else {
          alert('Failed to fetch T-shirt');
        }
      } catch (err) {
        console.error('Fetch Error:', err);
        alert('Error loading T-shirt');
      }
    };
    fetchTshirt();
  }, [id]);

  const handleChange = (e) => {
    setTshirt({ ...tshirt, [e.target.name]: e.target.value });
  };

  const handleSizeChange = (e, size) => {
    setTshirt({
      ...tshirt,
      sizes: {
        ...tshirt.sizes,
        [size]: {
          ...tshirt.sizes[size],
          quantity: e.target.value,
        },
      },
    });
  };

  const handleColorInputChange = (e, size) => {
    setTempColorInput({ ...tempColorInput, [size]: e.target.value });
  };

  const handleAddColor = (size) => {
    const color = tempColorInput[size].trim();
    if (color && !tshirt.sizes[size].colors.includes(color)) {
      const updatedColors = [...tshirt.sizes[size].colors, color];
      setTshirt({
        ...tshirt,
        sizes: {
          ...tshirt.sizes,
          [size]: {
            ...tshirt.sizes[size],
            colors: updatedColors,
          },
        },
      });
      setTempColorInput({ ...tempColorInput, [size]: '' });
    }
  };

  const handleRemoveColor = (size, colorIndex) => {
    const updatedColors = [...tshirt.sizes[size].colors];
    updatedColors.splice(colorIndex, 1);
    setTshirt({
      ...tshirt,
      sizes: {
        ...tshirt.sizes,
        [size]: {
          ...tshirt.sizes[size],
          colors: updatedColors,
        },
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const highlights = tshirt.highlights?.length
      ? tshirt.highlights
      : tshirt.details
          ?.split('\n')
          .map((line) => line.replace(/^•\s*/, '').trim())
          .filter(Boolean);

    const finalPayload = {
      name: tshirt.name,
      price: Number(tshirt.price),
      tshirtType: tshirt.tshirtType,
      imageUrl: tshirt.imageUrl,
      highlights,
      sizes: tshirt.sizes,
    };

    try {
      const res = await fetch(`http://localhost:5000/api/put/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalPayload),
      });

      const result = await res.json();

      if (res.ok) {
        alert(result.message || 'T-shirt updated successfully');
        navigate('/update'); // Back to update list
      } else {
        alert('Update failed: ' + result.message);
      }
    } catch (error) {
      console.error('Update Error:', error);
      alert('Something went wrong while updating.');
    }
  };

  if (!tshirt) {
    return <div className="p-6 text-white bg-gray-900 min-h-screen">Loading T-shirt details...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white p-6 shadow">
      <button
        onClick={() => navigate('/update')}
        className="flex items-center gap-2 text-sm mb-6 text-blue-400 hover:underline"
      >
        <FaArrowLeft />
        Back
      </button>

      <h3 className="text-lg font-semibold mb-4">Edit T-Shirt</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="name"
          value={tshirt.name}
          onChange={handleChange}
          placeholder="T-Shirt Name"
          required
          className="w-full px-3 py-2 border rounded bg-gray-800 text-white border-gray-700"
        />

        <textarea
          name="details"
          value={tshirt.highlights?.join('\n') || ''}
          onChange={(e) =>
            setTshirt({ ...tshirt, highlights: e.target.value.split('\n') })
          }
          rows="3"
          placeholder="• 100% cotton\n• Comfortable fit"
          required
          className="w-full px-3 py-2 border rounded bg-gray-800 text-white border-gray-700"
        />

        <input
          type="number"
          name="price"
          value={tshirt.price}
          onChange={handleChange}
          placeholder="Price (₹)"
          required
          className="w-full px-3 py-2 border rounded bg-gray-800 text-white border-gray-700"
        />

        <input
          type="text"
          name="imageUrl"
          value={tshirt.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          required
          className="w-full px-3 py-2 border rounded bg-gray-800 text-white border-gray-700"
        />

        <select
          name="tshirtType"
          value={tshirt.tshirtType}
          onChange={handleChange}
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
                value={tshirt.sizes?.[size]?.quantity || ''}
                onChange={(e) => handleSizeChange(e, size)}
                placeholder="Quantity"
                className="w-full px-2 py-1 mb-1 border rounded bg-gray-800 text-white border-gray-700"
              />
              <div className="flex gap-1">
                <input
                  type="text"
                  value={tempColorInput[size]}
                  onChange={(e) => handleColorInputChange(e, size)}
                  placeholder="Add Color"
                  className="flex-1 px-2 py-1 border rounded bg-gray-800 text-white border-gray-700"
                />
                <button
                  type="button"
                  onClick={() => handleAddColor(size)}
                  className="bg-green-600 px-2 text-sm rounded"
                >
                  +
                </button>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {tshirt.sizes?.[size]?.colors?.map((color, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-700 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
                  >
                    {color}
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(size, idx)}
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

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-4"
        >
          Update T-Shirt
        </button>
      </form>
    </div>
  );
};

export default EditTshirt;
