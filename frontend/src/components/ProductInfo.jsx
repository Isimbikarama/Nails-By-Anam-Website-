import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ProductInfo = () => {
  const [benefitsOpen, setBenefitsOpen] = useState(false);
  const [removalOpen, setRemovalOpen] = useState(false);

  const toggleBenefits = () => {
    setBenefitsOpen(!benefitsOpen);
  };

  const toggleRemoval = () => {
    setRemovalOpen(!removalOpen);
  };

  return (
    <div className="max-w-5xl mx-auto" style={{ fontFamily: 'PTSerif-Regular' }}>
<h1 className="text-5xl text-gray-900 mb-4" style={{ fontFamily: 'BebasNeue-Regular' }}>
          Press-on FAQ
        </h1>

      {/* Combined Card */}
      <div className="bg-rose-50 rounded-xl shadow-md overflow-hidden p-7 my-10">
        {/* Benefits Section */}
        <div>
          {/* Dropdown Header/Toggle */}
          <button 
            onClick={toggleBenefits}
            className="w-full px-6 py-4 flex items-center justify-between text-Black"
          >
            <h2 className="text-2xl" style={{ fontFamily: "BebasNeue-Regular" }}>
              BENEFITS OF PRESS-ON NAILS
            </h2>
            <div className={`transform transition-transform duration-300 ${benefitsOpen ? 'rotate-180' : ''}`}>
              <FaChevronDown className="text-xl" />
            </div>
          </button>

          {/* Dropdown Content with smooth height transition */}
          <div 
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              benefitsOpen ? ' opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-6">
              {/* Benefits Grid */}
              <div className="relative">
                {/* Benefits Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Personalization */}
                  <div className="rounded-3xl bg-pink-200 border-4 border-white shadow-md overflow-hidden">
                    <div className="bg-white mx-6 mt-4 mb-2 rounded-full py-1 text-center">
                      <h3 className="text-xl font-bold" style={{ fontFamily: "BebasNeue-Regular" }}>PERSONALIZATION</h3>
                    </div>
                    <div className="p-4 text-center">
                      <p>
                        You can select from a wide variety of colors, designs, and lengths to match your personal style
                      </p>
                    </div>
                  </div>

                  {/* Handmade */}
                  <div className="rounded-3xl bg-pink-200 border-4 border-white shadow-md overflow-hidden">
                    <div className="bg-white mx-6 mt-4 mb-2 rounded-full py-1 text-center">
                      <h3 className="text-xl font-bold" style={{ fontFamily: "BebasNeue-Regular" }}>HANDMADE</h3>
                    </div>
                    <div className="p-4 text-center">
                      <p>
                        Each nail set is handmade with care and attention to every little detail just for you
                      </p>
                    </div>
                  </div>

                  {/* Reusable */}
                  <div className="rounded-3xl bg-pink-200 border-4 border-white shadow-md overflow-hidden">
                    <div className="bg-white mx-6 mt-4 mb-2 rounded-full py-1 text-center">
                      <h3 className="text-xl font-bold" style={{ fontFamily: "BebasNeue-Regular" }}>REUSABLE</h3>
                    </div>
                    <div className="p-4 text-center">
                      <p>
                        With proper care, many press-on sets can be worn multiple times, so cute and cost-friendly
                      </p>
                    </div>
                  </div>

                  {/* Convenience */}
                  <div className="rounded-3xl bg-pink-200 border-4 border-white shadow-md overflow-hidden md:col-start-1 lg:col-start-auto">
                    <div className="bg-white mx-6 mt-4 mb-2 rounded-full py-1 text-center">
                      <h3 className="text-xl font-bold" style={{ fontFamily: "BebasNeue-Regular" }}>CONVENIENCE</h3>
                    </div>
                    <div className="p-4 text-center">
                      <p>
                        Applying press-ons is quick and easy, compared to a traditional manicure
                      </p>
                    </div>
                  </div>

                  {/* Nail Protection */}
                  <div className="rounded-3xl bg-pink-200 border-4 border-white shadow-md overflow-hidden">
                    <div className="bg-white mx-6 mt-4 mb-2 rounded-full py-1 text-center">
                      <h3 className="text-xl font-bold" style={{ fontFamily: "BebasNeue-Regular" }}>NAIL PROTECTION</h3>
                    </div>
                    <div className="p-4 text-center">
                      <p>
                        Press-ons can protect your natural nails from damage caused by picking or biting
                      </p>
                    </div>
                  </div>
                  
                  {/* Character Image - Only visible on larger screens */}
                  <div className="hidden lg:block relative h-full">
                    <div className="absolute bottom-0 right-0 w-full h-full">
                      <img 
                        src="/api/placeholder/200/200"
                        alt="Nail artist character" 
                        className="object-contain absolute bottom-0 right-0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Horizontal Divider */}
        <div className="border-t-2 border-pink-300 my-6"></div>
        
        {/* Removal Instructions Section */}
        <div>
          {/* Dropdown Header/Toggle */}
          <button 
            onClick={toggleRemoval}
            className="w-full px-6 py-4 flex items-center justify-between text-Black"
          >
            <h2 className="text-2xl" style={{ fontFamily: "BebasNeue-Regular" }}>
              PRESS-ON REMOVAL
            </h2>
            <div className={`transform transition-transform duration-300 ${removalOpen ? 'rotate-180' : ''}`}>
              <FaChevronDown className="text-xl" />
            </div>
          </button>

          {/* Dropdown Content with smooth height transition */}
          <div 
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              removalOpen ? ' opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-6">
              <div className="relative">
                {/* Removal Instructions */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Side - Instructions */}
                  <div className="space-y-4">
                    {/* Step 1 */}
                    <div className="rounded-3xl bg-pink-100 border-4 border-white shadow-md overflow-hidden relative p-4">
                      <h3 className="text-2xl italic absolute top-2 left-6" style={{ fontFamily: "cursive" }}>Remove</h3>
                      <div className="bg-pink-200 rounded-full py-2 px-6 mt-8">
                        <p className="text-lg">
                          Soak your fingers in <span className="font-bold">warm soapy</span> water
                        </p>
                      </div>
                    </div>
                    
                    {/* Step 2 */}
                    <div className="rounded-3xl bg-pink-100 border-4 border-white shadow-md overflow-hidden p-4">
                      <div className="bg-pink-200 rounded-full py-2 px-6">
                        <p className="text-lg">
                          Starting from the edge, <span className="font-bold">slowly</span> remove the press on with a <span className="font-bold">nail tool</span> or <span className="font-bold">cuticle stick</span>
                        </p>
                      </div>
                    </div>
                    
                    {/* Step 3 */}
                    <div className="rounded-3xl bg-pink-100 border-4 border-white shadow-md overflow-hidden p-4">
                      <div className="bg-pink-200 rounded-full py-2 px-6">
                        <p className="text-lg">
                          Use the nail tool/ cuticle stick to <span className="font-bold">remove</span> the <span className="font-bold">adhesive</span> from the press on
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Side - Images and Final Step */}
                  <div className="flex flex-col justify-between">
                    {/* Images */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex justify-center items-center">
                        <img 
                          src="/api/placeholder/150/150" 
                          alt="Soaking nails illustration" 
                          className="max-h-40"
                        />
                      </div>
                      <div className="flex justify-center items-center">
                        <img 
                          src="/api/placeholder/150/150" 
                          alt="Removing nail illustration" 
                          className="max-h-40"
                        />
                      </div>
                    </div>
                    
                    {/* Step 4 with Preserve Label */}
                    <div className="rounded-3xl bg-pink-100 border-4 border-white shadow-md overflow-hidden relative p-4 mt-4">
                      <h3 className="text-2xl italic absolute bottom-2 right-6" style={{ fontFamily: "cursive" }}>Preserve</h3>
                      <div className="bg-pink-200 rounded-full py-2 px-6">
                        <p className="text-lg">
                          Dry the nails and safely store them for <span className="font-bold">future use</span>
                        </p>
                      </div>
                      <div className="flex justify-center mt-4">
                        <img 
                          src="/api/placeholder/120/60" 
                          alt="Nail storage case illustration" 
                          className="max-h-16"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;