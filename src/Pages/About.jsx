import React from 'react';
import { Link } from 'react-router-dom';
export default function About() {
  return (
    <>
    <div className=" min-h-screen py-16 px-4">
      {/* Hero */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">About Us</h1>
        <p className="text-gray-600 text-md sm:text-lg">
          Learn more about Sahand Estate and our mission to make real estate simple, transparent, and accessible for everyone.
        </p>
      </div>

      {/* Section 1 */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 mb-20 px-4">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
          alt="Our Team"
          className="w-full md:w-1/2 h-80 object-cover rounded-lg shadow-lg"
        />
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Who We Are</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Sahand Estate is a trusted platform that connects buyers, renters, and sellers with verified real estate properties across Pakistan. 
            We aim to provide a seamless and user-friendly experience with our advanced tools and personalized service.
          </p>
        </div>
      </div>

      {/* Section 2 */}
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 px-4">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Our mission is to simplify the process of finding and managing properties. Whether you are a first-time homebuyer, a landlord, or an investor, 
            Sahand Estate provides the tools and support you need to make the best decision.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80"
          alt="Our Mission"
          className="w-full md:w-1/2 h-80 object-cover rounded-lg shadow-lg"
        />
      </div>
  
    </div>
        <footer className="bg-slate-900 text-white py-12 mt-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <h2 className="text-xl font-bold mb-4">Sahand Estate</h2>
            <p className="text-gray-300 text-sm">
              Your trusted partner in finding, renting, and selling properties with ease and confidence.
            </p>
          </div>
      
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/search" className="hover:text-white transition">Search</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
      
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Buy Property</li>
              <li>Rent Property</li>
              <li>Sell Property</li>
              <li>Consultation</li>
            </ul>
          </div>
      
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-300 text-sm">Email: info@sahandestate.com</p>
            <p className="text-gray-300 text-sm mt-1">Phone: +92 123 4567890</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      
      
      </footer>
      </>
  );
}
