import React from "react";
import { SiGmail } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";

const Locations = () => {
  return (
    <div className="p-6 lg:my-10 my-5 rounded-lg text-center">
        <h2 className="text-8xl font-regular text-center mb-8" style={{ fontFamily: 'Twister' }}>
      E7 Studio
      </h2>
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        {/* Left: Address and Contact */}
        <div
          className="flex-1 text-center"
          style={{ fontFamily: "BebasNeue-Regular" }}
        >
          <h2 className="text-gray-700 text-3xl font-bold mb-2">
            200 UNIVERSITY AVE W,<br />
            WATERLOO, ON N2L 3G5
          </h2>

          <div className="flex flex-col items-center justify-center text-center space-y-2 mt-6">
            <div className="flex items-center justify-center mb-2">
              <SiGmail className="text-2xl text-gray-700 mr-2" />
              <p className="text-gray-700 text-xl font-bold">
                NAILSBYANAM@GMAIL.COM
              </p>
            </div>

            <div className="flex items-center justify-center">
              <FaInstagram className="text-2xl text-gray-700 mr-2" />
              <p className="text-gray-700 text-xl font-bold">@NAILSBYANAM_</p>
            </div>
          </div>
        </div>

        {/* Middle: Floor Plan */}
        <div className="flex-1 bg-rose-50">
          <div className="border border-rose-300 rounded-md overflow-hidden">
            <div
              className="grid grid-cols-3 grid-rows-4 h-72 w-full"
              style={{ fontFamily: "PTSerif-Regular" }}
            >
              {/* Top row */}
              <div className="border border-rose-300 flex items-center justify-center">
                1028
              </div>
              <div className="border border-rose-300 flex items-center justify-center">
                Elevators
              </div>
              <div className="border border-rose-300"></div>

              {/* Middle top row */}
              <div className="border border-rose-300"></div>
              <div className="border border-rose-300 flex items-center justify-center p-2">
                <div className="text-center">
                  <div>E7</div>
                  <div>2nd Floor</div>
                </div>
              </div>
              <div className="border border-rose-300 bg-rose-200 flex items-center justify-center">
                2462
              </div>

              {/* Middle bottom row */}
              <div className="border border-rose-300 bg-rose-200 flex items-center justify-center">
                Red Stairs
              </div>
              <div className="border border-rose-300 col-span-2"></div>

              {/* Bottom row */}
              <div className="border border-rose-300 col-span-3 bg-rose-200 flex items-center justify-center">
                E5 Entrance
              </div>
            </div>
          </div>
        </div>

        {/* Right: Map */}
        <div className="flex-1">
          <div className="rounded-full overflow-hidden border-4 border-rose-300 h-72 w-72 mx-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2895.403866167274!2d-80.5420988238327!3d43.473041371111236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf403ba0150eb%3A0xebbfa4342ecc7943!2sEngineering%207%20(E7)!5e0!3m2!1sen!2sca!4v1744553052404!5m2!1sen!2sca"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
