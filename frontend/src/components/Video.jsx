import React, { useEffect } from 'react';

const Video = () => {
    useEffect(() => {
      // Load Instagram embed script
      const script = document.createElement('script');
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script);
      };
    }, []);
  return (
    <div className="p-6  my-20 w-full py-10 flex flex-col items-center max-w-full overflow:hidden">
     
        <h1 
          className="text-4xl md:text-5xl text-center mb-10 " 
          style={{  
           fontFamily:'Twister'
          }}
        >
          Press On's in Action!
        </h1>
        
        
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-4">
            <blockquote 
              className="instagram-media hidden md:block" 
             
              data-instgrm-permalink="https://www.instagram.com/reel/DHmxlG6N23P/"
              data-instgrm-version="14"
              style={{ margin: '1px', maxWidth: '540px', width: '99.375%' }}
            ></blockquote>

            <blockquote 
              className="instagram-media block" 
             
              data-instgrm-permalink="https://www.instagram.com/p/C0qFrr6tDCK/"
              data-instgrm-version="14"
              style={{ margin: '1px', maxWidth: '540px', width: '99.375%' }}
            ></blockquote>

            <blockquote 
              className="instagram-media hidden md:block" 
              
              data-instgrm-permalink="https://www.instagram.com/p/DHfNqwjt7GY/"
              data-instgrm-version="14"
              style={{ margin: '1px', maxWidth: '540px', width: '99.375%' }}
            ></blockquote>
          </div>
        </div>
     
    
  );
};

export default Video;