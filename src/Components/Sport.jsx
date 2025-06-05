
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const tshirts = [
//   {
//     id: 1,
//     name: 'Men Sports T-shirt Printing',
//     price: 599,
//     img: 'https://ik.imagekit.io/zifllo6u3/download%20(12).jpeg?updatedAt=1745593128463',
//     description: 'Premium  Polyester Short sleeve T-shirt .',
//   },
//   {
//     id: 2,
//     name: 'Round Neck Half Sleeve Reglan Printed Sports T-Shirt IN100',
//     price: 1199,
//     img: 'https://ik.imagekit.io/zifllo6u3/download%20(15).jpeg?updatedAt=1745593086588',
//     description: '! ',
//   },
//   {
//     id: 3,
//     name: 'Jrcy cricket regular Blue printed Full Sleeve T shirt jersey for Men ',
//     price: 499,
//     img: 'https://ik.imagekit.io/zifllo6u3/download%20(13).jpeg?updatedAt=1745593086422',
//     description: 'Swing into style with this t-shirt.',
//   },
//   {
//     id: 4,
//     name: 'Nylon Sports T shirt for Men ',
//     price: 499,
//     img: 'https://ik.imagekit.io/zifllo6u3/download%20(14).jpeg?updatedAt=1745593086271',
//     description: 'Swing into style with this t-shirt.',
//   },
// //   {
// //     id: 5,
// //     name: 'Logo Mens Slim Fit T-Shirt',
// //     price: 599,
// //     img: 'https://ik.imagekit.io/zifllo6u3/download%20(3).jpeg?updatedAt=1745341084840',
// //     description: 'Premium cotton Short sleeve T-shirt .',
// //   },
// //   {
// //     id: 6,
// //     name: 'Highlander Men Green Self Design Polo Collar Regular Fit T-Shirt',
// //     price: 599,
// //     img: 'https://ik.imagekit.io/zifllo6u3/HLTS006364_1.webp?updatedAt=1745341085270',
// //     description: 'Premium cotton Short sleeve T-shirt .',
// //   },
// //   {
// //     id: 7,
// //     name: 'Dual Color Polo T-Shirt designed for style and functionality.',
// //     price: 599,
// //     img: 'https://ik.imagekit.io/zifllo6u3/download%20(2).jpeg?updatedAt=1745341084867',
// //     description: 'Premium cotton Short sleeve T-shirt .',
// //   },
// //   {
// //     id: 8,
// //     name: 'Men Contrast Trim Polo Shirt',
// //     price: 599,
// //     img: 'https://ik.imagekit.io/zifllo6u3/images.jpeg?updatedAt=1745341084951',
// //     description: 'Premium cotton Short sleeve T-shirt .',
// //   },
// ];

// function Sport() {
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

// export default Sport;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Sport() {
  const navigate = useNavigate();
  const [tshirts, setTshirts] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // For buffering
  const [isLoading, setIsLoading] = useState(true); // Initial loading

  useEffect(() => {
    const fetchTshirts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/tshirt/type/Sports T-Shirt');
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
      <h2 className="text-2xl font-bold mb-6">Sport T-Shirts</h2>
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

export default Sport;

