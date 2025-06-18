

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

const bannerImages = [
  'https://ik.imagekit.io/zifllo6u3/309519-3840x2160-desktop-4k-spider-man-wallpaper-image.jpg?updatedAt=1750235383528',
  'https://ik.imagekit.io/zifllo6u3/54552-3840x2160-desktop-4k-marvel-heroes-wallpaper-photo.jpg?updatedAt=1750235471143',
  'https://ik.imagekit.io/zifllo6u3/486981-3840x2160-desktop-4k-tony-stark-iron-man-wallpaper.jpg?updatedAt=1750235884609',
  'https://ik.imagekit.io/zifllo6u3/119027-3840x2160-desktop-4k-avengers-wallpaper.jpg?updatedAt=1750237119999',
  'https://ik.imagekit.io/zifllo6u3/wakanda%20king_dQOLlnxp4?updatedAt=1750239396603',
  'https://ik.imagekit.io/zifllo6u3/119867-3840x2160-desktop-4k-avengers-background.jpg?updatedAt=1750237201736',
  'https://ik.imagekit.io/zifllo6u3/309451-3840x2160-desktop-4k-spider-man-background-image.jpg?updatedAt=1750238808515',
  'https://ik.imagekit.io/zifllo6u3/thor_zfn5PYea8R?updatedAt=1750239095210',
  'https://ik.imagekit.io/zifllo6u3/170945-3840x2160-desktop-4k-venom-wallpaper-image.jpg?updatedAt=1750239222602',
];



function Homepage() {
   const [currentImage, setCurrentImage] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState(
    localStorage.getItem('marvelProfile') || marvelCharacters[0].img
  );
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showProfileDetails, setShowProfileDetails] = useState(true);

  const [username, setUsername] = useState(localStorage.getItem('username') || 'Guest');
  const [email, setEmail] = useState(localStorage.getItem('email') || 'Not Provided');

  const [cartCount, setCartCount] = useState(0);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get(" https://project-zidio-ecommerce-website-backend.onrender.com/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = res.data;
        if (user) {
          setUsername(user.username || user.name);
          setEmail(user.email);
          localStorage.setItem("username", user.username || user.name);
          localStorage.setItem("email", user.email);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        if (error.response && error.response.status === 401) {
          alert("Session expired. Please login again.");
          localStorage.clear();
          window.location.href = "/login";
        }
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchCartCount = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get(' https://project-zidio-ecommerce-website-backend.onrender.com/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartCount(res.data.items?.length || 0);
      } catch (err) {
        console.error("Failed to fetch cart count", err);
      }
    };

    fetchCartCount();
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
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('marvelProfile');
    window.location.href = '/';
  };

  return (
    
    <div className="bg-gray-900 text-white relative">
      {/* Navbar */}
      <nav className="bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center">
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
          <div className="relative">
            <a href="/cart" aria-label="Cart">
              <FaShoppingCart className="text-xl text-gray-300 hover:text-blue-400 cursor-pointer transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </a>
          </div>
          <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Login
          </a>
        </div>
      </nav>

      {/* Banner Section */}
    <div className="relative w-full h-68 sm:h-94 overflow-hidden bg-black">

      {bannerImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Banner ${index}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            currentImage === index ? 'opacity-60 z-20' : 'opacity-0 z-10'
          }`}
        />
      ))}

      {/* Text Overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-4 z-30">
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
        <p className="text-lg md:text-xl text-gray-200 drop-shadow">
          Unleash Your Style. Wear What You Love.
        </p>
      </div>
    </div>
      {/* Sidebar/Profile Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gray-800 p-6 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
          ${showProfilePanel ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}
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

          <div className="mb-4">
            <h2
              onClick={() => setShowProfileDetails(!showProfileDetails)}
              className="text-xl font-bold text-blue-400 mb-1 border-b border-blue-400 pb-1 select-none cursor-pointer"
            >
              My Profile
            </h2>
            {showProfileDetails && (
              <>
                <p className="text-lg font-semibold">{username}</p>
                <p className="text-sm text-gray-300 break-words">{email}</p>
              </>
            )}
          </div>

          <button
            onClick={() => {
              toggleProfilePanel();
              window.location.href = '/myorder';
            }}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg mb-4 font-medium transition"
          >
            My Orders
          </button>

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
