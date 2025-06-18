
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const tshirts = [
//   {
//     id: 1,
//     name: 'Mens Ironman Printed T-shirt',
//     price: 599,
//     img: 'https://ik.imagekit.io/zifllo6u3/s4rfz_1200.jpg?updatedAt=1745683313039',
//     description: 'Premium  Polyester Short sleeve T-shirt .',
//   },
//   {
//     id: 2,
//     name: 'Round Neck The Avengers Thor Silhouette T-Shirt',
//     price: 1199,
//     img: 'https://ik.imagekit.io/zifllo6u3/images%20(6).jpeg?updatedAt=1745683311116',
//     description: '! ',
//   },
//   {
//     id: 3,
//     name: 'Wade & Logan - Marvel Official T-Shirt ',
//     price: 499,
//     img: 'https://ik.imagekit.io/zifllo6u3/download%20(17).jpeg?updatedAt=1745683313124',
//     description: 'Swing into style with this t-shirt.',
//   },
//   {
//     id: 4,
//     name: 'N Superhero Pure Cotton Oversized T Shirt  ',
//     price: 499,
//     img: 'https://ik.imagekit.io/zifllo6u3/download%20(16).jpeg?updatedAt=1745683310448',
//     description: 'Swing into style with this t-shirt.',
//   },

// ];

// function Marvel() {
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

// export default Marvel;

// import React, { useState, useEffect } from 'react';
// import { FaShoppingCart, FaEdit, FaSignOutAlt } from 'react-icons/fa';
// import { Typewriter } from 'react-simple-typewriter';
// import axios from 'axios';
// import '../index.css';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const tshirts = [
//   {
//     id: 1,
//     name: 'Mens Ironman Printed T-shirt',
//     price: 599,
//     img: 'https://ik.imagekit.io/zifllo6u3/s4rfz_1200.jpg?updatedAt=1745683313039',
//     description: 'Premium  Polyester Short sleeve T-shirt .',
//   },
//   {
//     id: 2,
//     name: 'Round Neck The Avengers Thor Silhouette T-Shirt',
//     price: 1199,
//     img: 'https://ik.imagekit.io/zifllo6u3/images%20(6).jpeg?updatedAt=1745683311116',
//     description: '! ',
//   },
//   {
//     id: 3,
//     name: 'Wade & Logan - Marvel Official T-Shirt ',
//     price: 499,
//     img: 'https://ik.imagekit.io/zifllo6u3/download%20(17).jpeg?updatedAt=1745683313124',
//     description: 'Swing into style with this t-shirt.',
//   },
//   {
//     id: 4,
//     name: 'N Superhero Pure Cotton Oversized T Shirt  ',
//     price: 499,
//     img: 'https://ik.imagekit.io/zifllo6u3/download%20(16).jpeg?updatedAt=1745683310448',
//     description: 'Swing into style with this t-shirt.',
//   },

// ];


// const marvelCharacters = [
//   { name: 'Iron Man', img: 'https://ik.imagekit.io/zifllo6u3/iron%20man.jpeg?updatedAt=1745042676508' },
//   { name: 'Captain America', img: 'https://ik.imagekit.io/zifllo6u3/download%20(1).jpeg?updatedAt=1745042675661' },
//   { name: 'Thor', img: 'https://ik.imagekit.io/zifllo6u3/thor.jpeg?updatedAt=1745042675231' },
//   { name: 'Black Panther', img: 'https://ik.imagekit.io/zifllo6u3/black%20panther.jpeg?updatedAt=1745042862171' },
// ];

// function Homepage() {
//    const navigate = useNavigate();
//   const [loadingId, setLoadingId] = useState(null); // Track which card is loading

//   const viewDetails = (tshirt) => {
//     setLoadingId(tshirt.id);
//     setTimeout(() => {
//       navigate(`/tshirt/${tshirt.id}`, { state: tshirt });
//     }, 1000); // 1 second buffering delay
//   };
//   const [selectedProfile, setSelectedProfile] = useState(
//     localStorage.getItem('marvelProfile') || marvelCharacters[0].img
//   );
//   const [showProfilePanel, setShowProfilePanel] = useState(false);
//   const [showAvatarOptions, setShowAvatarOptions] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   const [username, setUsername] = useState(localStorage.getItem('username') || 'Guest');
//   const [email, setEmail] = useState(localStorage.getItem('email') || 'Not Provided');

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     async function fetchUserProfile() {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) return;

//         const res = await axios.get('http://localhost:5000/api/auth/profile', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.data) {
//           setUsername(res.data.username);
//           setEmail(res.data.email);
//           localStorage.setItem('username', res.data.username);
//           localStorage.setItem('email', res.data.email);
//         }
//       } catch (error) {
//         console.error('Failed to fetch user profile:', error);
//       }
//     }
//     fetchUserProfile();
//   }, []);

//   const handleProfileSelect = (img) => {
//     setSelectedProfile(img);
//     localStorage.setItem('marvelProfile', img);
//   };

//   const toggleProfilePanel = () => {
//     setShowProfilePanel(!showProfilePanel);
//     setShowAvatarOptions(false);
//   };

//   const handleLogout = () => {
//     // Clear user-related localStorage data
//     localStorage.removeItem('token');
//     localStorage.removeItem('username');
//     localStorage.removeItem('email');
//     localStorage.removeItem('marvelProfile');
//     // Optionally redirect or reload page
//     window.location.href = '/';
//   };

//   return (
//     <div className="bg-gray-900 text-white  relative">
//       {/* Navbar */}
//       <nav className="bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <img
//             src={selectedProfile}
//             alt="Profile"
//             onClick={toggleProfilePanel}
//             className="w-10 h-10 rounded-full border-2 border-blue-400 cursor-pointer hover:scale-110 transition-transform duration-300"
//             title="Click to view profile"
//           />
//           <div className="text-2xl font-bold text-blue-400 select-none">TrendyTees</div>
//         </div>
//         {!isMobile && (
//           <ul className="hidden md:flex gap-6 text-gray-300 font-medium">
//             <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
//             <li><a href="/fullsleeve" className="hover:text-blue-400 transition">Full Sleeve</a></li>
//             <li><a href="/halfsleeve" className="hover:text-blue-400 transition">Half Sleeve</a></li>
//             <li><a href="/oversized" className="hover:text-blue-400 transition">Over Sized</a></li>
//             <li><a href="/formal" className="hover:text-blue-400 transition">Formal T-Shirt</a></li>
//             <li><a href="/sport" className="hover:text-blue-400 transition">Sports T-Shirt</a></li>
//             <li><a href="/marvel" className="hover:text-blue-400 transition">Marvel T-Shirt</a></li>
//           </ul>
//         )}
//         <div className="flex items-center gap-4">
//           <a href="/cart" aria-label="Cart">
//             <FaShoppingCart className="text-xl text-gray-300 hover:text-blue-400 cursor-pointer transition" />
//           </a>
//           <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
//             Login
//           </a>
//         </div>
//       </nav>

//       {/* Banner Section */}
//       <div className="relative w-full h-120 bg-black overflow-hidden">
//   <video
//     autoPlay
//     loop
//     muted
//     playsInline
//     className="w-full h-full object-cover opacity-60"
//   >
//     <source src="https://ik.imagekit.io/zifllo6u3/WhatsApp%20Video%202025-05-16%20at%2022.58.21_82cde34c.mp4?updatedAt=1747416541656" type="video/mp4" />
//     Your browser does not support the video tag.
//   </video>

//   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-4">
//     <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
//       <Typewriter
//         words={['Welcome to Marvel Collection!', 'Explore Cool T-shirts!', 'Feel the Power of the Character!' ,'Buy a Marvel T-shirts get a chance to meet marvel acters']}
//         loop={true}
//         cursor
//         cursorStyle="|"
//         typeSpeed={70}
//         deleteSpeed={50}
//         delaySpeed={2000}
//       />
//     </h1>
   
//   </div>
// </div>


//       {/* Sidebar/Profile Panel */}
//       <div
//         className={`fixed top-0 left-0 h-full w-72 bg-gray-800 p-6 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
//           ${showProfilePanel ? 'translate-x-0' : '-translate-x-full'}`}
//       >
//         <button
//           onClick={toggleProfilePanel}
//           className="text-gray-400 hover:text-white mb-6 block ml-auto text-xl font-semibold"
//           aria-label="Close Profile Panel"
//         >
//           ✖
//         </button>

//         <div className="text-center relative">
//           <img
//             src={selectedProfile}
//             alt="Profile Avatar"
//             className="w-28 h-28 mx-auto rounded-full border-4 border-blue-400 mb-4 shadow-lg"
//           />
//           <button
//             onClick={() => setShowAvatarOptions(!showAvatarOptions)}
//             className="text-sm text-blue-400 hover:text-white flex items-center justify-center gap-2 mx-auto mb-6 font-semibold transition"
//           >
//             <FaEdit /> Edit Avatar
//           </button>

//           {/* Username & Email Section */}
//           <div className="mb-6">
//             <h2 className="text-xl font-bold text-blue-400 mb-1 border-b border-blue-400 pb-1 select-none">
//               My Profile
//             </h2>
//             <p className="text-lg font-semibold">{username}</p>
//             <p className="text-sm text-gray-300 break-words">{email}</p>
//           </div>

//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition"
//             aria-label="Logout"
//           >
//             <div className="flex items-center justify-center gap-2">
//               <FaSignOutAlt /> Logout
//             </div>
//           </button>
//         </div>

//         {/* Avatar Selection */}
//         {showAvatarOptions && (
//           <div className="mt-8">
//             <h3 className="text-blue-400 mb-3 font-semibold text-center select-none">Choose Avatar</h3>
//             <div className="flex justify-center gap-3 flex-wrap">
//               {marvelCharacters.map((char) => (
//                 <img
//                   key={char.name}
//                   src={char.img}
//                   alt={char.name}
//                   onClick={() => handleProfileSelect(char.img)}
//                   className={`w-14 h-14 rounded-full cursor-pointer border-2
//                     ${
//                       selectedProfile === char.img
//                         ? 'border-blue-500 scale-110 shadow-lg'
//                         : 'border-gray-400 hover:scale-105'
//                     } transition-transform duration-200`}
//                   title={char.name}
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Mobile Menu (if mobile) */}
//         {isMobile && (
//           <ul className="mt-10 text-gray-300 font-medium text-center space-y-5 select-none">
//             <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
//             <li><a href="/fullsleeve" className="hover:text-blue-400 transition">Full Sleeve</a></li>
//             <li><a href="/halfsleeve" className="hover:text-blue-400 transition">Half Sleeve</a></li>
//             <li><a href="/oversized" className="hover:text-blue-400 transition">Over Sized</a></li>
//             <li><a href="/formal" className="hover:text-blue-400 transition">Formal T-Shirt</a></li>
//             <li><a href="/sport" className="hover:text-blue-400 transition">Sports T-Shirt</a></li>
//             <li><a href="/marvel" className="hover:text-blue-400 transition">Marvel T-Shirt</a></li>
//           </ul>
//         )}
//       </div>
//        <div className="bg-gray-900 text-white pt-4 px-4 min-h-screen">
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
//     </div>
//   );
// }

// export default Homepage;


// import React, { useState, useEffect } from 'react';
// import { FaShoppingCart, FaEdit, FaSignOutAlt } from 'react-icons/fa';
// import { Typewriter } from 'react-simple-typewriter';
// import axios from 'axios';
// import '../index.css';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const marvelCharacters = [
//   { name: 'Iron Man', img: 'https://ik.imagekit.io/zifllo6u3/iron%20man.jpeg?updatedAt=1745042676508' },
//   { name: 'Captain America', img: 'https://ik.imagekit.io/zifllo6u3/download%20(1).jpeg?updatedAt=1745042675661' },
//   { name: 'Thor', img: 'https://ik.imagekit.io/zifllo6u3/thor.jpeg?updatedAt=1745042675231' },
//   { name: 'Black Panther', img: 'https://ik.imagekit.io/zifllo6u3/black%20panther.jpeg?updatedAt=1745042862171' },
// ];

// function Homepage() {
//   const navigate = useNavigate();
//   const [loadingId, setLoadingId] = useState(null); // Track which card is loading
//   const [tshirts, setTshirts] = useState([]);
//   const [loadingTshirts, setLoadingTshirts] = useState(true);
//   const [error, setError] = useState(null);

//   const viewDetails = (tshirt) => {
//     setLoadingId(tshirt.id);
//     setTimeout(() => {
//       navigate(`/tshirt/${tshirt.id}`, { state: tshirt });
//     }, 1000); // 1 second buffering delay
//   };

//   const [selectedProfile, setSelectedProfile] = useState(
//     localStorage.getItem('marvelProfile') || marvelCharacters[0].img
//   );
//   const [showProfilePanel, setShowProfilePanel] = useState(false);
//   const [showAvatarOptions, setShowAvatarOptions] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   const [username, setUsername] = useState(localStorage.getItem('username') || 'Guest');
//   const [email, setEmail] = useState(localStorage.getItem('email') || 'Not Provided');

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     async function fetchUserProfile() {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) return;

//         const res = await axios.get('http://localhost:5000/api/auth/profile', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.data) {
//           setUsername(res.data.username);
//           setEmail(res.data.email);
//           localStorage.setItem('username', res.data.username);
//           localStorage.setItem('email', res.data.email);
//         }
//       } catch (error) {
//         console.error('Failed to fetch user profile:', error);
//       }
//     }
//     fetchUserProfile();
//   }, []);

//   // NEW: Fetch Marvel T-shirts dynamically from backend
//   useEffect(() => {
//     async function fetchTshirts() {
//       setLoadingTshirts(true);
//       setError(null);
//       try {
//         // Adjust your backend endpoint here
//         const response = await axios.get('http://localhost:5000/api/tshirt/type/Marvel T-Shirt');
//         setTshirts(response.data); // assuming response.data is an array of tshirts
//       } catch (err) {
//         setError('Failed to load T-shirts. Please try again later.');
//       } finally {
//         setLoadingTshirts(false);
//       }
//     }
//     fetchTshirts();
//   }, []);

//   const handleProfileSelect = (img) => {
//     setSelectedProfile(img);
//     localStorage.setItem('marvelProfile', img);
//   };

//   const toggleProfilePanel = () => {
//     setShowProfilePanel(!showProfilePanel);
//     setShowAvatarOptions(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('username');
//     localStorage.removeItem('email');
//     localStorage.removeItem('marvelProfile');
//     window.location.href = '/';
//   };

//   return (
//     <div className="bg-gray-900 text-white  relative">
//       {/* Navbar */}
//       <nav className="bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <img
//             src={selectedProfile}
//             alt="Profile"
//             onClick={toggleProfilePanel}
//             className="w-10 h-10 rounded-full border-2 border-blue-400 cursor-pointer hover:scale-110 transition-transform duration-300"
//             title="Click to view profile"
//           />
//           <div className="text-2xl font-bold text-blue-400 select-none">TrendyTees</div>
//         </div>
//         {!isMobile && (
//           <ul className="hidden md:flex gap-6 text-gray-300 font-medium">
//             <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
//             <li><a href="/fullsleeve" className="hover:text-blue-400 transition">Full Sleeve</a></li>
//             <li><a href="/halfsleeve" className="hover:text-blue-400 transition">Half Sleeve</a></li>
//             <li><a href="/oversized" className="hover:text-blue-400 transition">Over Sized</a></li>
//             <li><a href="/formal" className="hover:text-blue-400 transition">Formal T-Shirt</a></li>
//             <li><a href="/sport" className="hover:text-blue-400 transition">Sports T-Shirt</a></li>
//             <li><a href="/marvel" className="hover:text-blue-400 transition">Marvel T-Shirt</a></li>
//           </ul>
//         )}
//         <div className="flex items-center gap-4">
//           <a href="/cart" aria-label="Cart">
//             <FaShoppingCart className="text-xl text-gray-300 hover:text-blue-400 cursor-pointer transition" />
//           </a>
//           <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
//             Login
//           </a>
//         </div>
//       </nav>

//       {/* Banner Section */}
//       <div className="relative w-full h-120 bg-black overflow-hidden">
//         <video
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="w-full h-full object-cover opacity-60"
//         >
//           <source src="https://ik.imagekit.io/zifllo6u3/WhatsApp%20Video%202025-05-16%20at%2022.58.21_82cde34c.mp4?updatedAt=1747416541656" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>

//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-4">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
//             <Typewriter
//               words={['Welcome to Marvel Collection!', 'Explore Cool T-shirts!', 'Feel the Power of the Character!' ,'Buy a Marvel T-shirts get a chance to meet marvel acters']}
//               loop={true}
//               cursor
//               cursorStyle="|"
//               typeSpeed={70}
//               deleteSpeed={50}
//               delaySpeed={2000}
//             />
//           </h1>
//         </div>
//       </div>

//       {/* Sidebar/Profile Panel */}
//       <div
//         className={`fixed top-0 left-0 h-full w-72 bg-gray-800 p-6 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
//           ${showProfilePanel ? 'translate-x-0' : '-translate-x-full'}`}
//       >
//         <button
//           onClick={toggleProfilePanel}
//           className="text-gray-400 hover:text-white mb-6 block ml-auto text-xl font-semibold"
//           aria-label="Close Profile Panel"
//         >
//           ✖
//         </button>

//         <div className="text-center relative">
//           <img
//             src={selectedProfile}
//             alt="Profile Avatar"
//             className="w-28 h-28 mx-auto rounded-full border-4 border-blue-400 mb-4 shadow-lg"
//           />
//           <button
//             onClick={() => setShowAvatarOptions(!showAvatarOptions)}
//             className="text-sm text-blue-400 hover:text-white flex items-center justify-center gap-2 mx-auto mb-6 font-semibold transition"
//           >
//             <FaEdit /> Edit Avatar
//           </button>

//           {/* Username & Email Section */}
//           <div className="mb-6">
//             <h2 className="text-xl font-bold text-blue-400 mb-1 border-b border-blue-400 pb-1 select-none">
//               My Profile
//             </h2>
//             <p className="text-lg font-semibold">{username}</p>
//             <p className="text-sm text-gray-300 break-words">{email}</p>
//           </div>

//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition"
//             aria-label="Logout"
//           >
//             <div className="flex items-center justify-center gap-2">
//               <FaSignOutAlt /> Logout
//             </div>
//           </button>
//         </div>

//         {/* Avatar Selection */}
//         {showAvatarOptions && (
//           <div className="mt-8">
//             <h3 className="text-blue-400 font-semibold mb-2 select-none">Select Avatar</h3>
//             <div className="grid grid-cols-2 gap-4">
//               {marvelCharacters.map((char) => (
//                 <img
//                   key={char.name}
//                   src={char.img}
//                   alt={char.name}
//                   className={`cursor-pointer rounded-full border-4 transition-transform duration-300 ease-in-out
//                     ${selectedProfile === char.img ? 'border-blue-400 scale-110' : 'border-transparent hover:scale-105'}`}
//                   onClick={() => handleProfileSelect(char.img)}
//                   title={char.name}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Main Content - T-shirts Grid */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h2 className="text-3xl font-bold text-blue-400 mb-6 select-none ">Marvel T-shirts Collection</h2>

//         {loadingTshirts && (
//           <div className="flex justify-center items-center py-20 text-blue-400 font-semibold">
//             Loading T-shirts...
//           </div>
//         )}

//         {error && (
//           <div className="text-red-500 text-center py-20 font-semibold">
//             {error}
//           </div>
//         )}

//         {!loadingTshirts && !error && tshirts.length === 0 && (
//           <div className="text-gray-400 text-center py-20 font-semibold">
//             No T-shirts found.
//           </div>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {!loadingTshirts && !error && tshirts.map((tshirt) => (
//             <motion.div
//               key={tshirt._id}
//               layout
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow cursor-pointer"
//             >
//               <img
//                 src={tshirt.imageUrl}
//                 alt={tshirt.name}
//                 className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover rounded-lg mb-4"
//                 loading="lazy"
//                 onClick={() => viewDetails(tshirt)}
//               />
//               <h3 className="text-xl font-semibold mb-1 text-blue-400 select-none">{tshirt.name}</h3>
//               <p className="text-gray-300 mb-4 select-none">${tshirt.price.toFixed(2)}</p>
//               <button
//                 onClick={() => viewDetails(tshirt)}
//                 disabled={loadingId === tshirt._id}
//                 className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed`}
//               >
//                 {loadingId === tshirt._id ? 'Loading...' : 'View Details'}
//               </button>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Homepage;


// // import React, { useState, useEffect } from 'react';
// // import { FaShoppingCart, FaEdit, FaSignOutAlt } from 'react-icons/fa';
// // import { Typewriter } from 'react-simple-typewriter';
// // import axios from 'axios';
// // import '../index.css';
// // import { useNavigate } from 'react-router-dom';
// // import { motion } from 'framer-motion';

// // const marvelCharacters = [
// //   { name: 'Iron Man', img: 'https://ik.imagekit.io/zifllo6u3/iron%20man.jpeg?updatedAt=1745042676508' },
// //   { name: 'Captain America', img: 'https://ik.imagekit.io/zifllo6u3/download%20(1).jpeg?updatedAt=1745042675661' },
// //   { name: 'Thor', img: 'https://ik.imagekit.io/zifllo6u3/thor.jpeg?updatedAt=1745042675231' },
// //   { name: 'Black Panther', img: 'https://ik.imagekit.io/zifllo6u3/black%20panther.jpeg?updatedAt=1745042862171' },
// // ];

// // function Homepage() {
// //   const navigate = useNavigate();
// //   const [loadingId, setLoadingId] = useState(null);
// //   const [tshirts, setTshirts] = useState([]);
// //   const [loadingTshirts, setLoadingTshirts] = useState(true);
// //   const [error, setError] = useState(null);

// //   const [selectedProfile, setSelectedProfile] = useState(
// //     localStorage.getItem('marvelProfile') || marvelCharacters[0].img
// //   );
// //   const [showProfilePanel, setShowProfilePanel] = useState(false);
// //   const [showAvatarOptions, setShowAvatarOptions] = useState(false);
// //   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

// //   const [username, setUsername] = useState(localStorage.getItem('username') || 'Guest');
// //   const [email, setEmail] = useState(localStorage.getItem('email') || 'Not Provided');

// //   const bannerImages = [
// //     'https://ik.imagekit.io/zifllo6u3/Natasha-Romanoff-Death-Scene-in-Endgame.avif?updatedAt=1749998704052',
    
// //   ];
// //   const [currentImage, setCurrentImage] = useState(0);

// //   useEffect(() => {
// //     const handleResize = () => setIsMobile(window.innerWidth < 768);
// //     window.addEventListener('resize', handleResize);
// //     return () => window.removeEventListener('resize', handleResize);
// //   }, []);

// //   useEffect(() => {
// //     async function fetchUserProfile() {
// //       try {
// //         const token = localStorage.getItem('token');
// //         if (!token) return;

// //         const res = await axios.get('http://localhost:5000/api/auth/profile', {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });

// //         if (res.data) {
// //           setUsername(res.data.username);
// //           setEmail(res.data.email);
// //           localStorage.setItem('username', res.data.username);
// //           localStorage.setItem('email', res.data.email);
// //         }
// //       } catch (error) {
// //         console.error('Failed to fetch user profile:', error);
// //       }
// //     }
// //     fetchUserProfile();
// //   }, []);

// //   useEffect(() => {
// //     async function fetchTshirts() {
// //       setLoadingTshirts(true);
// //       setError(null);
// //       try {
// //         const response = await axios.get('http://localhost:5000/api/tshirt/type/Marvel T-Shirt');
// //         setTshirts(response.data);
// //       } catch (err) {
// //         setError('Failed to load T-shirts. Please try again later.');
// //       } finally {
// //         setLoadingTshirts(false);
// //       }
// //     }
// //     fetchTshirts();
// //   }, []);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setCurrentImage((prev) => (prev + 1) % bannerImages.length);
// //     }, 4000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const handleProfileSelect = (img) => {
// //     setSelectedProfile(img);
// //     localStorage.setItem('marvelProfile', img);
// //   };

// //   const toggleProfilePanel = () => {
// //     setShowProfilePanel(!showProfilePanel);
// //     setShowAvatarOptions(false);
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('username');
// //     localStorage.removeItem('email');
// //     localStorage.removeItem('marvelProfile');
// //     window.location.href = '/';
// //   };

// //   const viewDetails = (tshirt) => {
// //     setLoadingId(tshirt.id);
// //     setTimeout(() => {
// //       navigate(`/tshirt/${tshirt.id}`, { state: tshirt });
// //     }, 1000);
// //   };

// //   return (
// //     <div className="bg-gray-900 text-white relative">
// //       {/* Navbar */}
// //       <nav className="bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
// //         <div className="flex items-center gap-3">
// //           <img
// //             src={selectedProfile}
// //             alt="Profile"
// //             onClick={toggleProfilePanel}
// //             className="w-10 h-10 rounded-full border-2 border-blue-400 cursor-pointer hover:scale-110 transition-transform duration-300"
// //             title="Click to view profile"
// //           />
// //           <div className="text-2xl font-bold text-blue-400 select-none">TrendyTees</div>
// //         </div>
// //         {!isMobile && (
// //           <ul className="hidden md:flex gap-6 text-gray-300 font-medium">
// //             <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
// //             <li><a href="/fullsleeve" className="hover:text-blue-400 transition">Full Sleeve</a></li>
// //             <li><a href="/halfsleeve" className="hover:text-blue-400 transition">Half Sleeve</a></li>
// //             <li><a href="/oversized" className="hover:text-blue-400 transition">Over Sized</a></li>
// //             <li><a href="/formal" className="hover:text-blue-400 transition">Formal T-Shirt</a></li>
// //             <li><a href="/sport" className="hover:text-blue-400 transition">Sports T-Shirt</a></li>
// //             <li><a href="/marvel" className="hover:text-blue-400 transition">Marvel T-Shirt</a></li>
// //           </ul>
// //         )}
// //         <div className="flex items-center gap-4">
// //           <a href="/cart" aria-label="Cart">
// //             <FaShoppingCart className="text-xl text-gray-300 hover:text-blue-400 cursor-pointer transition" />
// //           </a>
// //           <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
// //             Login
// //           </a>
// //         </div>
// //       </nav>

// //       {/* Banner Section */}
// //       <div className="relative w-full h-96 sm:h-[32rem] overflow-hidden">
// //         <div className="w-full h-full relative">
// //           <img
// //             src={bannerImages[currentImage]}
// //             alt="Marvel Banner"
// //             className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
// //           />
// //           <div className="absolute inset-0 bg-black bg-opacity-60"></div>
// //           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-4">
// //             <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
// //               <Typewriter
// //                 words={[
// //                   'Welcome to Marvel Collection!',
// //                   'Explore Cool T-shirts!',
// //                   'Feel the Power of the Character!',
// //                   'Buy a Marvel T-shirt, get a chance to meet Marvel actors!',
// //                 ]}
// //                 loop={true}
// //                 cursor
// //                 cursorStyle="|"
// //                 typeSpeed={70}
// //                 deleteSpeed={50}
// //                 delaySpeed={2000}
// //               />
// //             </h1>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Profile Panel */}
// //       {showProfilePanel && (
// //         <div className="absolute top-20 left-4 bg-gray-800 border border-blue-500 p-4 rounded-lg shadow-lg z-50">
// //           <div className="flex flex-col items-center text-white">
// //             <img
// //               src={selectedProfile}
// //               alt="Profile"
// //               className="w-20 h-20 rounded-full border-2 border-blue-400"
// //             />
// //             <h3 className="text-lg font-bold mt-2">{username}</h3>
// //             <p className="text-sm text-gray-400">{email}</p>
// //             <div className="flex mt-4 gap-3">
// //               <button onClick={() => setShowAvatarOptions(!showAvatarOptions)}>
// //                 <FaEdit className="text-blue-400 hover:text-blue-600" />
// //               </button>
// //               <button onClick={handleLogout}>
// //                 <FaSignOutAlt className="text-red-400 hover:text-red-600" />
// //               </button>
// //             </div>
// //             {showAvatarOptions && (
// //               <div className="grid grid-cols-2 gap-2 mt-4">
// //                 {marvelCharacters.map((char) => (
// //                   <img
// //                     key={char.name}
// //                     src={char.img}
// //                     alt={char.name}
// //                     className="w-12 h-12 rounded-full cursor-pointer hover:scale-110 transition"
// //                     onClick={() => handleProfileSelect(char.img)}
// //                   />
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       )}

// //       {/* T-Shirts Grid */}
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         <h2 className="text-3xl font-bold text-blue-400 mb-6 select-none ">Marvel T-shirts Collection</h2>

// //         {loadingTshirts && (
// //           <div className="flex justify-center items-center py-20 text-blue-400 font-semibold">
// //             Loading T-shirts...
// //           </div>
// //         )}

// //         {error && (
// //           <div className="text-red-500 text-center py-20 font-semibold">
// //             {error}
// //           </div>
// //         )}

// //         {!loadingTshirts && !error && tshirts.length === 0 && (
// //           <div className="text-gray-400 text-center py-20 font-semibold">
// //             No T-shirts found.
// //           </div>
// //         )}

// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //           {!loadingTshirts && !error && tshirts.map((tshirt) => (
// //             <motion.div
// //               key={tshirt._id}
// //               layout
// //               initial={{ opacity: 0, scale: 0.9 }}
// //               animate={{ opacity: 1, scale: 1 }}
// //               exit={{ opacity: 0, scale: 0.9 }}
// //               className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow cursor-pointer"
// //             >
// //               <img
// //                 src={tshirt.imageUrl}
// //                 alt={tshirt.name}
// //                 className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover rounded-lg mb-4"
// //                 loading="lazy"
// //                 onClick={() => viewDetails(tshirt)}
// //               />
// //               <h3 className="text-xl font-semibold mb-1 text-blue-400 select-none">{tshirt.name}</h3>
// //               <p className="text-gray-300 mb-4 select-none">${tshirt.price.toFixed(2)}</p>
// //               <button
// //                 onClick={() => viewDetails(tshirt)}
// //                 disabled={loadingId === tshirt._id}
// //                 className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed`}
// //               >
// //                 {loadingId === tshirt._id ? 'Loading...' : 'View Details'}
// //               </button>
// //             </motion.div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Homepage;



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
        const res = await fetch('http://localhost:5000/api/tshirt/type/Marvel T-Shirt');
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

