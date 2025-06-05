

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const tshirts = [
//   {
//     id: 1,
//     name: 'Statement Textured Polo T-Shirt Wisdom Wine',
//     price: 599,
//     img: 'https://ik.imagekit.io/zifllo6u3/johnny_polo_wisdom_wine_(5)%20-%20Copy.webp?updatedAt=1744990894162',
//     description: 'Premium cotton Short sleeve T-shirt .',
//   },
//   {
//     id: 2,
//     name: 'Men stylish T Shirt Black milenge white with red stripe',
//     price: 549,
//     img: 'https://ik.imagekit.io/zifllo6u3/download.jpeg?updatedAt=1744990894386',
//     description: '! ',
//   },
//   {
//     id: 3,
//     name: 'Regular Fit Typographic Print Crew-Neck T-Shirt',
//     price: 499,
//     img: 'https://ik.imagekit.io/zifllo6u3/-473Wx593H-465905533-maroon-MODEL.avif?updatedAt=1744990894506',
//     description: 'Swing into style with this t-shirt.',
//   },
//   {
//     id: 4,
//     name: 'Men Round-Neck Regular Fit T-Shirt',
//     price: 499,
//     img: 'https://ik.imagekit.io/zifllo6u3/-473Wx593H-466794990-blue-MODEL.avif?updatedAt=1744999011728',
//     description: 'Swing into style with this t-shirt.',
//   },
//   {
//     id: 5,
//     name: 'Logo Mens Slim Fit T-Shirt',
//     price: 599,
//     img: 'https://ik.imagekit.io/zifllo6u3/download%20(3).jpeg?updatedAt=1745341084840',
//     description: 'Premium cotton Short sleeve T-shirt .',
//   },
//   {
//     id: 6,
//     name: 'Highlander Men Green Self Design Polo Collar Regular Fit T-Shirt',
//     price: 599,
//     img: 'https://ik.imagekit.io/zifllo6u3/HLTS006364_1.webp?updatedAt=1745341085270',
//     description: 'Premium cotton Short sleeve T-shirt .',
//   },
//   {
//     id: 7,
//     name: 'Dual Color Polo T-Shirt designed for style and functionality.',
//     price: 599,
//     img: 'https://ik.imagekit.io/zifllo6u3/download%20(2).jpeg?updatedAt=1745341084867',
//     description: 'Premium cotton Short sleeve T-shirt .',
//   },
//   {
//     id: 8,
//     name: 'Men Contrast Trim Polo Shirt',
//     price: 599,
//     img: 'https://ik.imagekit.io/zifllo6u3/images.jpeg?updatedAt=1745341084951',
//     description: 'Premium cotton Short sleeve T-shirt .',
//   },
// ];

// function Tshirts() {
//   const navigate = useNavigate();
//   const [loadingId, setLoadingId] = useState(null); // Track which card is loading

//   const viewDetails = (tshirt) => {
//     setLoadingId(tshirt.id);
//     setTimeout(() => {
//       navigate(`/tshirt/${tshirt.id}`, { state: tshirt });
//     }, 1000); // 1 second buffering delay
//   };

//   return (
//     <div className="bg-gray-900 text-white pt-4 px-4 min-h-screen">
//       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
//         {tshirts.map((shirt) => (
//           <motion.div
//             key={shirt.id}
//             className={`bg-gray-800 p-4 rounded-xl shadow-md cursor-pointer relative`}
//             onClick={() => viewDetails(shirt)}
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.3 }}
//           >
//             {loadingId === shirt.id ? (
//               <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-80 rounded-xl">
//                 <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
//                 <span className="text-sm text-blue-400">Loading...</span>
//               </div>
//             ) : (
//               <>
//                 <img
//                   src={shirt.img}
//                   alt={shirt.name}
//                   className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover rounded-lg mb-4"
//                 />
//                 <h2 className="text-lg font-semibold">{shirt.name}</h2>
//                 <p className="text-blue-400 text-md">₹{shirt.price}</p>
//               </>
//             )}
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Tshirts;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Tshirts() {
  const navigate = useNavigate();
  const [tshirts, setTshirts] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchTshirts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tshirt/all');
      const data = await response.json();
      console.log("Fetched T-shirts:", data); // 👈 Check the data shape
      setTshirts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching T-shirts:', error);
      setLoading(false);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading T-shirts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white pt-4 px-4 min-h-screen">
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
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover rounded-lg mb-4"
                />
                <h2 className="text-lg font-semibold">{shirt.name}</h2>
                <p className="text-blue-400 text-md">₹{shirt.price}</p>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Tshirts;
