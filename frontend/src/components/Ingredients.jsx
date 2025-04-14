import React, { useState, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Ingredients() {
  // State to track which dropdowns are open
  const [openDropdowns, setOpenDropdowns] = useState({});
  
  // Track height of content for animations
  const contentRefs = useRef({});
  
  // Toggle dropdown open/closed state
  const toggleDropdown = (id) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Cuticle oil ingredients data
  const ingredients = [
    {
      id: 'mineral-oil',
      name: 'Mineral Oil',
      description: 'A highly purified and processed petroleum product that helps to soften, cleanse, and moisturize the skin. It helps heal injured skin by keeping small wounds moist and it reduces brittle and chipped nails.'
    },
    {
      id: 'aloe-leaf-extract',
      name: 'Aloe Leaf Extract',
      description: 'Aloe attracts and retains water in the skin. It strengthens the keratin to protect the nails and is a natural soothing agent that helps reduce inflammation and redness around the nails.'
    },
    {
      id: 'jojoba-oil',
      name: 'Jojoba Oil',
      description: 'This liquid wax extracted from the seeds of the jojoba plant mimics skin\'s natural oils allowing for faster absorption. It\'s packed with fatty acids, antioxidants, and vitamin E. The oil forms a barrier to prevent moisture loss and has natural antifungal properties.'
    },
    {
      id: 'essential-oils',
      name: 'Essential Oils',
      description: 'These natural oils provide therapeutic benefits for nail and cuticle health.',
      subtypes: [
        {
          name: 'Tea Tree',
          description: 'Can improve the appearance of fingernail discoloration with its conditioning and antiseptic properties.'
        },
        {
          name: 'Lavender',
          description: 'This relaxing oil possesses moisturizing properties that nourish dry cuticles for brittle nails prone to breakage and splitting. It helps rebuild strength and prevent further damage.'
        },
        {
          name: 'Eucalyptus',
          description: 'Keeps your nails clean and healthy. This oil works as an antifungal treatment and preventative.'
        }
      ]
    },
    {
      id: 'vitamin-c',
      name: 'Vitamin C',
      description: 'The nutrient essential for supporting collagen production. Collagen is a protein that gives shape, strength, and integrity to nails.'
    }
  ];

  // Function to set reference for content measurement
  const setContentRef = (id, element) => {
    if (element) {
      contentRefs.current[id] = element;
    }
  };

  return (
    <div className=" p-6 rounded-lg mx-auto">
      {/* Header */}
    
        <h1 className="text-5xl font-bold text-white text-center drop-shadow-lg">INGREDIENTS</h1>
        
      
      <div className="italic text-2xl font-light text-gray-700 mb-6 text-center">cuticle oil</div>
      
      <p className="text-pink-800 text-center mb-8">
        Discover the natural and effective ingredients that make our cuticle oil formula so nourishing.
        Each ingredient plays a crucial role in maintaining healthy nails and cuticles.
      </p>
      
      {/* Dropdowns */}
      <div className="space-y-4">
        {ingredients.map((ingredient) => (
          <div key={ingredient.id} className="border-2 border-pink-300 rounded-lg bg-white overflow-hidden">
            {/* Dropdown Header */}
            <button 
              onClick={() => toggleDropdown(ingredient.id)}
              className="w-full px-6 py-4 flex justify-between items-center focus:outline-none transition-colors duration-300 hover:bg-pink-50"
            >
              <h2 className="text-2xl font-semibold text-pink-500">{ingredient.name}</h2>
              <div className="transition-transform duration-300">
                {openDropdowns[ingredient.id] ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </div>
            </button>
            
            {/* Animated Dropdown Content */}
            <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out ${openDropdowns[ingredient.id] ? 'max-h-96' : 'max-h-0'}`}
            >
              <div 
                ref={(el) => setContentRef(ingredient.id, el)}
                className="px-6 pb-6 pt-2 bg-pink-50"
              >
                <p className="text-gray-700 mb-4">{ingredient.description}</p>
                
                {/* For Essential Oils with subtypes */}
                {ingredient.subtypes && (
                  <div className="mt-4 space-y-3">
                    <h3 className="font-medium text-pink-700 text-lg">Types of {ingredient.name}:</h3>
                    {ingredient.subtypes.map((subtype, index) => (
                      <div key={index} className="ml-4">
                        <h4 className="font-medium text-pink-600">{subtype.name}</h4>
                        <p className="text-gray-700">{subtype.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
     
    </div>
  );
}