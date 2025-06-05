

// import React, { useState, useEffect } from 'react';
// import { FaShoppingCart, FaEdit } from 'react-icons/fa';
// import { Typewriter } from 'react-simple-typewriter';
// import '../index.css';

// const marvelCharacters = [
//   { name: 'Iron Man', img: 'https://ik.imagekit.io/zifllo6u3/iron%20man.jpeg?updatedAt=1745042676508' },
//   { name: 'Captain America', img: 'https://ik.imagekit.io/zifllo6u3/download%20(1).jpeg?updatedAt=1745042675661' },
//   { name: 'Thor', img: 'https://ik.imagekit.io/zifllo6u3/thor.jpeg?updatedAt=1745042675231' },
//   { name: 'Black Panther', img: 'https://ik.imagekit.io/zifllo6u3/black%20panther.jpeg?updatedAt=1745042862171' },
// ];

// function Homepage() {
//   const [selectedProfile, setSelectedProfile] = useState(
//     localStorage.getItem('marvelProfile') || marvelCharacters[0].img
//   );
//   const [showProfilePanel, setShowProfilePanel] = useState(false);
//   const [showAvatarOptions, setShowAvatarOptions] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   const username = localStorage.getItem('username') || 'Guest';
//   const email = localStorage.getItem('email') || 'Not Provided';

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleProfileSelect = (img) => {
//     setSelectedProfile(img);
//     localStorage.setItem('marvelProfile', img);
//   };

//   const toggleProfilePanel = () => {
//     setShowProfilePanel(!showProfilePanel);
//     setShowAvatarOptions(false);
//   };

//   return (
//     <div className="bg-gray-900 text-white relative h-50px">
//       {/* Navbar */}
//       <nav className="bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <img
//             src={selectedProfile}
//             alt="Profile"
//             onClick={toggleProfilePanel}
//             className="w-10 h-10 rounded-full border-2 border-blue-400 cursor-pointer hover:scale-110 transition"
//           />
//           <div className="text-2xl font-bold text-blue-400">TrendyTees</div>
//         </div>
//         {!isMobile && (
//           <ul className="hidden md:flex gap-6 text-gray-300 font-medium">
//             <li><a href="/" className="hover:text-blue-400">Home</a></li>
//             <li><a href="/fullsleeve" className="hover:text-blue-400">Full Sleeve</a></li>
//             <li><a href="/halfsleeve" className="hover:text-blue-400">Half Sleeve</a></li>
//             <li><a href="/oversized" className="hover:text-blue-400">Over Sized</a></li>
//             <li><a href="/formal" className="hover:text-blue-400">Formal T-Shirt</a></li>
//             <li><a href="/sport" className="hover:text-blue-400">Sports T-Shirt</a></li>
//             <li><a href="/marvel" className="hover:text-blue-400">Marvel T-Shirt</a></li>
//           </ul>
//         )}
//         <div className="flex items-center gap-4">
//           <a href="/cart"><FaShoppingCart className="text-xl text-gray-300 hover:text-blue-400 cursor-pointer" /></a>
//           <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
//             Login
//           </a>
//         </div>
//       </nav>

//       {/* Banner Section */}
//       <div className="relative w-full h-70 bg-black overflow-hidden">
//         <img
//           src="https://ik.imagekit.io/zifllo6u3/image-handsome-caucasian-man-with-red-messy-hair-glasses-pointing-fingers-looking-down_1258-161676.jpg?updatedAt=1745426602836"
//           alt="T-shirt Advertisement Banner"
//           className="w-full h-full object-cover opacity-60"
//         />
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">
//             <Typewriter
//               words={['Welcome to TrendyTees!', 'Explore Cool T-shirts!', 'Feel the Fashion!']}
//               loop={true}
//               cursor
//               cursorStyle="|"
//               typeSpeed={70}
//               deleteSpeed={50}
//               delaySpeed={2000}
//             />
//           </h1>
//           <p className="text-lg md:text-xl text-gray-200">Unleash Your Style. Wear What You Love.</p>
//         </div>
//       </div>

//       {/* Sidebar/Profile Panel */}
//       {showProfilePanel && (
//         <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 p-6 shadow-lg z-50 transition-all duration-300 overflow-y-auto">
//           <button onClick={toggleProfilePanel} className="text-right text-gray-400 hover:text-white mb-4 block">Close ✖</button>
//           <div className="text-center relative">
//             <img src={selectedProfile} alt="Profile Avatar" className="w-24 h-24 mx-auto rounded-full border-4 border-blue-400 mb-4" />
//             <button onClick={() => setShowAvatarOptions(!showAvatarOptions)} className="text-sm text-blue-400 hover:text-white flex items-center justify-center gap-1 mx-auto mb-2">
//               <FaEdit /> Edit
//             </button>
//             <p className="text-lg font-semibold">{username}</p>
//             <p className="text-sm text-gray-300">{email}</p>
//           </div>
//           {showAvatarOptions && (
//             <div className="mt-6">
//               <h3 className="text-blue-400 mb-2 font-semibold text-center">Choose Avatar</h3>
//               <div className="flex justify-center gap-2 flex-wrap">
//                 {marvelCharacters.map((char) => (
//                   <img
//                     key={char.name}
//                     src={char.img}
//                     alt={char.name}
//                     onClick={() => handleProfileSelect(char.img)}
//                     className={`w-12 h-12 rounded-full cursor-pointer border-2 ${selectedProfile === char.img ? 'border-blue-500' : 'border-gray-400'} hover:scale-105 transition`}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//           {isMobile && (
//             <ul className="mt-8 text-gray-300 font-medium text-center space-y-4">
//               <li><a href="/" className="hover:text-blue-400">Home</a></li>
//               <li><a href="/fullsleeve" className="hover:text-blue-400">Full Sleeve</a></li>
//               <li><a href="/halfsleeve" className="hover:text-blue-400">Half Sleeve</a></li>
//               <li><a href="/oversized" className="hover:text-blue-400">Over Sized</a></li>
//               <li><a href="/formal" className="hover:text-blue-400">Formal T-Shirt</a></li>
//               <li><a href="/sport" className="hover:text-blue-400">Sports T-Shirt</a></li>
//               <li><a href="/marvel" className="hover:text-blue-400">Marvel T-Shirt</a></li>
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Homepage;



// import React, { useState, useEffect } from 'react';
// import { FaShoppingCart, FaEdit } from 'react-icons/fa';
// import { Typewriter } from 'react-simple-typewriter';
// import axios from 'axios'; // Add axios import
// import '../index.css';

// const marvelCharacters = [
//   { name: 'Iron Man', img: 'https://ik.imagekit.io/zifllo6u3/iron%20man.jpeg?updatedAt=1745042676508' },
//   { name: 'Captain America', img: 'https://ik.imagekit.io/zifllo6u3/download%20(1).jpeg?updatedAt=1745042675661' },
//   { name: 'Thor', img: 'https://ik.imagekit.io/zifllo6u3/thor.jpeg?updatedAt=1745042675231' },
//   { name: 'Black Panther', img: 'https://ik.imagekit.io/zifllo6u3/black%20panther.jpeg?updatedAt=1745042862171' },
// ];

// function Homepage() {
//   const [selectedProfile, setSelectedProfile] = useState(
//     localStorage.getItem('marvelProfile') || marvelCharacters[0].img
//   );
//   const [showProfilePanel, setShowProfilePanel] = useState(false);
//   const [showAvatarOptions, setShowAvatarOptions] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   // Store username/email in state to update from backend
//   const [username, setUsername] = useState(localStorage.getItem('username') || 'Guest');
//   const [email, setEmail] = useState(localStorage.getItem('email') || 'Not Provided');

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Fetch user details from backend on mount (replace localStorage data if available)
//   useEffect(() => {
//     async function fetchUserProfile() {
//       try {
//         const token = localStorage.getItem('token'); // if you use auth token
//         if (!token) return; // no logged in user

//         const res = await axios.get('http://localhost:5000/api/auth/profile', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.data) {
//           setUsername(res.data.username);
//           setEmail(res.data.email);

//           // Optionally update localStorage to keep in sync
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

//   return (
//     <div className="bg-gray-900 text-white relative h-50px">
//       {/* Navbar */}
//       <nav className="bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <img
//             src={selectedProfile}
//             alt="Profile"
//             onClick={toggleProfilePanel}
//             className="w-10 h-10 rounded-full border-2 border-blue-400 cursor-pointer hover:scale-110 transition"
//           />
//           <div className="text-2xl font-bold text-blue-400">TrendyTees</div>
//         </div>
//         {!isMobile && (
//           <ul className="hidden md:flex gap-6 text-gray-300 font-medium">
//             <li><a href="/" className="hover:text-blue-400">Home</a></li>
//             <li><a href="/fullsleeve" className="hover:text-blue-400">Full Sleeve</a></li>
//             <li><a href="/halfsleeve" className="hover:text-blue-400">Half Sleeve</a></li>
//             <li><a href="/oversized" className="hover:text-blue-400">Over Sized</a></li>
//             <li><a href="/formal" className="hover:text-blue-400">Formal T-Shirt</a></li>
//             <li><a href="/sport" className="hover:text-blue-400">Sports T-Shirt</a></li>
//             <li><a href="/marvel" className="hover:text-blue-400">Marvel T-Shirt</a></li>
//           </ul>
//         )}
//         <div className="flex items-center gap-4">
//           <a href="/cart"><FaShoppingCart className="text-xl text-gray-300 hover:text-blue-400 cursor-pointer" /></a>
//           <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
//             Login
//           </a>
//         </div>
//       </nav>

//       {/* Banner Section */}
//       <div className="relative w-full h-70 bg-black overflow-hidden">
//         <img
//           src="https://ik.imagekit.io/zifllo6u3/image-handsome-caucasian-man-with-red-messy-hair-glasses-pointing-fingers-looking-down_1258-161676.jpg?updatedAt=1745426602836"
//           alt="T-shirt Advertisement Banner"
//           className="w-full h-full object-cover opacity-60"
//         />
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">
//             <Typewriter
//               words={['Welcome to TrendyTees!', 'Explore Cool T-shirts!', 'Feel the Fashion!']}
//               loop={true}
//               cursor
//               cursorStyle="|"
//               typeSpeed={70}
//               deleteSpeed={50}
//               delaySpeed={2000}
//             />
//           </h1>
//           <p className="text-lg md:text-xl text-gray-200">Unleash Your Style. Wear What You Love.</p>
//         </div>
//       </div>

//       {/* Sidebar/Profile Panel */}
//       {showProfilePanel && (
//         <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 p-6 shadow-lg z-50 transition-all duration-300 overflow-y-auto">
//           <button onClick={toggleProfilePanel} className="text-right text-gray-400 hover:text-white mb-4 block">Close ✖</button>
//           <div className="text-center relative">
//             <img src={selectedProfile} alt="Profile Avatar" className="w-24 h-24 mx-auto rounded-full border-4 border-blue-400 mb-4" />
//             <button onClick={() => setShowAvatarOptions(!showAvatarOptions)} className="text-sm text-blue-400 hover:text-white flex items-center justify-center gap-1 mx-auto mb-2">
//               <FaEdit /> Edit
//             </button>
//             <p className="text-lg font-semibold">{username}</p>
//             <p className="text-sm text-gray-300">{email}</p>
//           </div>
//           {showAvatarOptions && (
//             <div className="mt-6">
//               <h3 className="text-blue-400 mb-2 font-semibold text-center">Choose Avatar</h3>
//               <div className="flex justify-center gap-2 flex-wrap">
//                 {marvelCharacters.map((char) => (
//                   <img
//                     key={char.name}
//                     src={char.img}
//                     alt={char.name}
//                     onClick={() => handleProfileSelect(char.img)}
//                     className={`w-12 h-12 rounded-full cursor-pointer border-2 ${selectedProfile === char.img ? 'border-blue-500' : 'border-gray-400'} hover:scale-105 transition`}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}
//           {isMobile && (
//             <ul className="mt-8 text-gray-300 font-medium text-center space-y-4">
//               <li><a href="/" className="hover:text-blue-400">Home</a></li>
//               <li><a href="/fullsleeve" className="hover:text-blue-400">Full Sleeve</a></li>
//               <li><a href="/halfsleeve" className="hover:text-blue-400">Half Sleeve</a></li>
//               <li><a href="/oversized" className="hover:text-blue-400">Over Sized</a></li>
//               <li><a href="/formal" className="hover:text-blue-400">Formal T-Shirt</a></li>
//               <li><a href="/sport" className="hover:text-blue-400">Sports T-Shirt</a></li>
//               <li><a href="/marvel" className="hover:text-blue-400">Marvel T-Shirt</a></li>
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Homepage;


import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import axios from 'axios';
import '../index.css';

const marvelCharacters = [
  { name: 'Iron Man', img: 'https://ik.imagekit.io/zifllo6u3/iron%20man.jpeg?updatedAt=1745042676508' },
  { name: 'Captain America', img: 'https://ik.imagekit.io/zifllo6u3/download%20(1).jpeg?updatedAt=1745042675661' },
  { name: 'Thor', img: 'https://ik.imagekit.io/zifllo6u3/thor.jpeg?updatedAt=1745042675231' },
  { name: 'Black Panther', img: 'https://ik.imagekit.io/zifllo6u3/black%20panther.jpeg?updatedAt=1745042862171' },
];

function Homepage() {
  const [selectedProfile, setSelectedProfile] = useState(
    localStorage.getItem('marvelProfile') || marvelCharacters[0].img
  );
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [username, setUsername] = useState(localStorage.getItem('username') || 'Guest');
  const [email, setEmail] = useState(localStorage.getItem('email') || 'Not Provided');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn("No token found. User might not be logged in.");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = res.data;
      if (user) {
        setUsername(user.username || user.name);
        setEmail(user.email);

        // Optional: cache to localStorage
        localStorage.setItem("username", user.username || user.name);
        localStorage.setItem("email", user.email);
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);

      // Optional: Handle unauthorized access
      if (error.response && error.response.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.clear();
        window.location.href = "/login";
      }
    }
  };

  fetchUserProfile();
}, []);


  const handleProfileSelect = (img) => {
    setSelectedProfile(img);
    localStorage.setItem('marvelProfile', img);
  };

  const toggleProfilePanel = () => {
    setShowProfilePanel(!showProfilePanel);
    setShowAvatarOptions(false);
  };

  const handleLogout = () => {
    // Clear user-related localStorage data
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('marvelProfile');
    // Optionally redirect or reload page
    window.location.href = '/';
  };

  return (
    <div className="bg-gray-900 text-white  relative">
      {/* Navbar */}
      <nav className="bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src={selectedProfile}
            alt="Profile"
            onClick={toggleProfilePanel}
            className="w-10 h-10 rounded-full border-2 border-blue-400 cursor-pointer hover:scale-110 transition-transform duration-300"
            title="Click to view profile"
          />
          <div className="text-2xl font-bold text-blue-400 select-none">TrendyTees</div>
        </div>
        {!isMobile && (
          <ul className="hidden md:flex gap-6 text-gray-300 font-medium">
            <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
            <li><a href="/fullsleeve" className="hover:text-blue-400 transition">Full Sleeve</a></li>
            <li><a href="/halfsleeve" className="hover:text-blue-400 transition">Half Sleeve</a></li>
            <li><a href="/oversized" className="hover:text-blue-400 transition">Over Sized</a></li>
            <li><a href="/formal" className="hover:text-blue-400 transition">Formal T-Shirt</a></li>
            <li><a href="/sport" className="hover:text-blue-400 transition">Sports T-Shirt</a></li>
            <li><a href="/marvel" className="hover:text-blue-400 transition">Marvel T-Shirt</a></li>
          </ul>
        )}
        <div className="flex items-center gap-4">
          <a href="/cart" aria-label="Cart">
            <FaShoppingCart className="text-xl text-gray-300 hover:text-blue-400 cursor-pointer transition" />
          </a>
          <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Login
          </a>
        </div>
      </nav>

      {/* Banner Section */}
      <div className="relative w-full h-70 bg-black overflow-hidden">
        <img
          src="https://ik.imagekit.io/zifllo6u3/image-handsome-caucasian-man-with-red-messy-hair-glasses-pointing-fingers-looking-down_1258-161676.jpg?updatedAt=1745426602836"
          alt="T-shirt Advertisement Banner"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            <Typewriter
              words={['Welcome to TrendyTees!', 'Explore Cool T-shirts!', 'Feel the Fashion!']}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </h1>
          <p className="text-lg md:text-xl text-gray-200 drop-shadow">{`Unleash Your Style. Wear What You Love.`}</p>
        </div>
      </div>

      {/* Sidebar/Profile Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gray-800 p-6 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
          ${showProfilePanel ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button
          onClick={toggleProfilePanel}
          className="text-gray-400 hover:text-white mb-6 block ml-auto text-xl font-semibold"
          aria-label="Close Profile Panel"
        >
          ✖
        </button>

        <div className="text-center relative">
          <img
            src={selectedProfile}
            alt="Profile Avatar"
            className="w-28 h-28 mx-auto rounded-full border-4 border-blue-400 mb-4 shadow-lg"
          />
          <button
            onClick={() => setShowAvatarOptions(!showAvatarOptions)}
            className="text-sm text-blue-400 hover:text-white flex items-center justify-center gap-2 mx-auto mb-6 font-semibold transition"
          >
            <FaEdit /> Edit Avatar
          </button>

          {/* Username & Email Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-400 mb-1 border-b border-blue-400 pb-1 select-none">
              My Profile
            </h2>
            <p className="text-lg font-semibold">{username}</p>
            <p className="text-sm text-gray-300 break-words">{email}</p>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition"
            aria-label="Logout"
          >
            <div className="flex items-center justify-center gap-2">
              <FaSignOutAlt /> Logout
            </div>
          </button>
        </div>

        {/* Avatar Selection */}
        {showAvatarOptions && (
          <div className="mt-8">
            <h3 className="text-blue-400 mb-3 font-semibold text-center select-none">Choose Avatar</h3>
            <div className="flex justify-center gap-3 flex-wrap">
              {marvelCharacters.map((char) => (
                <img
                  key={char.name}
                  src={char.img}
                  alt={char.name}
                  onClick={() => handleProfileSelect(char.img)}
                  className={`w-14 h-14 rounded-full cursor-pointer border-2
                    ${
                      selectedProfile === char.img
                        ? 'border-blue-500 scale-110 shadow-lg'
                        : 'border-gray-400 hover:scale-105'
                    } transition-transform duration-200`}
                  title={char.name}
                />
              ))}
            </div>
          </div>
        )}

        {/* Mobile Menu (if mobile) */}
        {isMobile && (
          <ul className="mt-10 text-gray-300 font-medium text-center space-y-5 select-none">
            <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
            <li><a href="/fullsleeve" className="hover:text-blue-400 transition">Full Sleeve</a></li>
            <li><a href="/halfsleeve" className="hover:text-blue-400 transition">Half Sleeve</a></li>
            <li><a href="/oversized" className="hover:text-blue-400 transition">Over Sized</a></li>
            <li><a href="/formal" className="hover:text-blue-400 transition">Formal T-Shirt</a></li>
            <li><a href="/sport" className="hover:text-blue-400 transition">Sports T-Shirt</a></li>
            <li><a href="/marvel" className="hover:text-blue-400 transition">Marvel T-Shirt</a></li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Homepage;
