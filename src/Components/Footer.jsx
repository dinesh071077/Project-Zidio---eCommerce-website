import React, { useEffect, useState } from 'react';

const rotatingTexts = [
  '🚚 Super Fast Delivery on All Orders!',
  '💳 Secure Payments via UPI, Card, Wallets & More!',
  '🔄 Easy 7-Day Return Policy!',
];

const Footer = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-gray-900 text-white pt-6">
      {/* Rotating Banner */}
      <div className="bg-blue-600 py-2 text-center text-sm font-medium">
        {rotatingTexts[currentTextIndex]}
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-6 py-8 grid md:grid-cols-3 gap-8 text-sm">
        {/* About */}
        <div>
          <h4 className="font-bold mb-3">About Our Store</h4>
          <p className="text-gray-400">
            We offer stylish and affordable T-shirts with fast delivery, secure checkout, and excellent customer support.
          </p>
        </div>

        {/* Highlights */}
        <div>
          <h4 className="font-bold mb-3">Why Choose Us?</h4>
          <ul className="text-gray-400 space-y-2">
            <li>✅ Fast & Secure Checkout</li>
            <li>🚀 2-Day Delivery Available</li>
            <li>🔄 Easy Returns & Refunds</li>
            <li><a href='/support'>💬 24/7 Customer Support</a></li>
          </ul>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold mb-3">Quick Links</h4>
          <ul className="text-gray-400 space-y-2">
            <li><a href="/fullsleeve" className="hover:text-white">Fullsleeve</a></li>
            <li><a href="/halfsleeve" className="hover:text-white">Halfsleeve</a></li>
            <li><a href="/marvel" className="hover:text-white">Marvel</a></li>
            <li><a href="/sport" className="hover:text-white">sport</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 text-center py-3 text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} T-Shirt Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
