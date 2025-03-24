import React from 'react';

const Video = () => {
  return (
    <div className="p-6  my-20 w-full py-10 flex flex-col items-center max-w-full overflow:hidden">
     
        <h1 
          className="text-4xl md:text-5xl text-center mb-10 " 
          style={{  
           fontFamily:'Twister'
          }}
        >
          Press On Nail Care Tips
        </h1>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="md:w-1/2">
            <p className="text-center  text-2xl " style={{ fontFamily:'PTSerif-Regular' }}>
              Check Out this Nails By 
              <br />
              Anam Video to take care of 
              <br />
              your press-ons!
            </p>
          </div>
          
          <div className="md:w-1/2 w-full">
            <div className="bg-gray-200 w-74 h-50 rounded-md">
              {/* Placeholder for video */}
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-500">Video Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Video;