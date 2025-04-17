import React from "react";
import { NavLink } from "react-router-dom";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { assets } from "../assets/assets";  

const Footer = () => {
  return (
    <footer className="w-full footer-gradient text-white py-12" style={{ fontFamily: 'PTSerif-Regular' }}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 items-center">
        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-lg">
            <li>
              <NavLink to="/about" className="hover:underline">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className="hover:underline">
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/pressons" className="hover:underline">
                Press-Ons
              </NavLink>
            </li>
            <li>
              <NavLink to="/CuticleOil" className="hover:underline">
                Cuticle Oil
              </NavLink>
            </li>
            <li>
              <NavLink to="/booking" className="hover:underline">
                Booking
              </NavLink>
            </li>
            <li>
              <NavLink to="/lookbook" className="hover:underline">
                Look Book
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:underline">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <p className="text-lg mb-2">Any Questions?</p>
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <div className="flex justify-center gap-6 text-4xl">
            <a href="https://www.instagram.com/nailsbyanam_/" aria-label="Instagram" >
              <FaInstagram />
            </a>
            <a href="https://www.tiktok.com/@nailsbyanam_" aria-label="TikTok" >
              <FaTiktok />
            </a>
            <a href="mailto:nailsbyanam@gmail.com" aria-label="Gmail" >
              <SiGmail />
            </a>
          </div>
        </div>

        {/* Logo & Name */}
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 mb-4">
            <img
              src={assets.Character_Logo} // replace with actual image path
              alt="Nails by Anam logo"
              className="object-contain w-full h-full"
            />
          </div>
          <h1 className="text-5xl font-extrabold glow text-center" style={{ fontFamily: "BebasNeue-Regular" }}>
            NAILS BY ANAM
          </h1>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 text-center text-sm text-gray-300">
        Copyright © {new Date().getFullYear()} Nails by Anam. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
