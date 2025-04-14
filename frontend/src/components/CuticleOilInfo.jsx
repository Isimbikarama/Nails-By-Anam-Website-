import React from 'react';

export default function CuticleOilInfo() {
  return (
    <div className=" p-6  max-w-7xl mx-auto" style={{ fontFamily: "PTSerif-Regular" }}>
      
      {/* Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section - Facts */}
        <div>
          <h2 className="text-3xl font-light text-pink-700 mb-4 flex items-center">
            <span className="text-4xl font-bold mr-2">3</span>
            facts about skin
          </h2>
          <div className="border-2 border-pink-300 rounded-lg p-4 bg-rose-50">
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                Your body naturally produces an oily substance called <span className="font-bold">sebum</span> (but it's <span className="font-bold">not enough</span> moisture to keep up with constant hand washing, dry air, and harsh cleansing agents)
              </li>
              <li>
                Dehydrated skin is more prone to splitting which creates microscopic openings for opportunistic bacteria, sunburn, and other UV damage.
              </li>
              <li>
                When the skin along the sidewalls of a nail is always dry and hard, it results in many painful hangnails.
              </li>
            </ol>
          </div>
        </div>
        
        {/* Right Section - Info */}
        <div>
          <h2 className="text-3xl font-light text-pink-700 mb-4">what is it?</h2>
          <div className="border-2 border-pink-300 rounded-lg p-4 mb-6 bg-rose-50">
            <p>
              Cuticle oil is a mixture of oils, vitamins, and waxes, applied <span className="font-bold">directly</span> to the cuticle. It's used to moisturize your nails, cuticles, and proximal nail fold. While lotion easily gets washed away, oil can typically last through hand washing.
            </p>
          </div>
          
          <h2 className="text-3xl font-light text-pink-700 mb-4">why does it matter?</h2>
          <div className="border-2 border-pink-300 rounded-lg p-4 bg-rose-50">
            <p>
              It's important to moisturize the proximal nail fold to keep the skin hydrated and healthy- reducing the chance of <span className="font-bold">damage</span> and <span className="font-bold">infection</span>. Use of cuticle oil can help keep the layers of keratin in your nails bonded together!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}