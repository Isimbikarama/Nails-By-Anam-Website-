
import React from "react";

const ReferralPromotion = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 text-center space-y-3" style={{ fontFamily: "PTSerif-Regular" }}>
        <h1 className="text-2xl font-bold text-white drop-shadow-md">REFERRAL PROMO</h1>

        <p className="text-base text-gray-800">
          Refer to a friend and get <br />
          <span className="text-2xl font-bold text-black">$5</span> off your next set
        </p>

        <p className="text-xs italic text-gray-700">
          details 'bout how this's gonna work here!
        </p>

        <div className="flex justify-center mt-2">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-pink-100 flex items-center justify-center">
            {/* Replace this with the actual image if you have one */}
            <span className="text-pink-500">[Image]</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralPromotion;