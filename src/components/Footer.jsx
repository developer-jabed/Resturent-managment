import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-orange-100 via-white to-orange-50 border-t border-orange-200 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8 text-sm">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-orange-600 mb-2">🍽️ FoodiesHub</h2>
          <p>Your trusted restaurant management partner. Streamline operations, enhance service, and grow your business effortlessly.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-orange-500 mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="#home" className="hover:text-orange-600">Home</a></li>
            <li><a href="#menu" className="hover:text-orange-600">Menu</a></li>
            <li><a href="#services" className="hover:text-orange-600">Services</a></li>
            <li><a href="#contact" className="hover:text-orange-600">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-orange-500 mb-2">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500" />
              123 Foodie Lane, Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-500" />
              +880 1234 567 890
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-orange-500" />
              support@foodieshub.com
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-semibold text-orange-500 mb-2">Follow Us</h3>
          <div className="flex gap-4 text-orange-600">
            <a href="#" className="hover:scale-110 transition"><Facebook /></a>
            <a href="#" className="hover:scale-110 transition"><Instagram /></a>
            <a href="#" className="hover:scale-110 transition"><Twitter /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs py-4 border-t border-orange-100 text-gray-500">
        &copy; {new Date().getFullYear()} FoodiesHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
