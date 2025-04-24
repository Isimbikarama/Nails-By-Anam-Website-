import React, { useEffect } from 'react'

const SocialMedia = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => {
      if (window.instgrm && window.instgrm.Embeds && typeof window.instgrm.Embeds.process === 'function') {
        window.instgrm.Embeds.process();
      }
    }
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  return (
    <div className="w-full py-12">
    
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-4">
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-xl font-medium" style={{ fontFamily: 'PTSerif-Regular' }}>Game Expo 2025</h3>
          <blockquote 
            className="instagram-media" 
            data-instgrm-permalink="https://www.instagram.com/p/DHr57ZtNv6Z/"
            data-instgrm-version="14"
          ></blockquote>
        </div>
  
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-xl font-medium" style={{ fontFamily: 'PTSerif-Regular' }}>Press-On Booth</h3>
          <blockquote 
            className="instagram-media" 
            data-instgrm-permalink="https://www.instagram.com/reel/DHmxlG6N23P/"
            data-instgrm-version="14"
          ></blockquote>
        </div>
  
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-xl font-medium" style={{ fontFamily: 'PTSerif-Regular' }}>Socratica 2025</h3>
          <blockquote 
            className="instagram-media" 
            data-instgrm-permalink="https://www.instagram.com/p/DG9sPsjtYEi/"
            data-instgrm-version="14"
          ></blockquote>
        </div>
      </div>
      <h2 className="text-4xl md:text-5xl text-center mb-8" style={{ fontFamily: 'Twister' }}>
        Follow Us On Instagram to see more!
      </h2>
    </div>
  )
}

export default SocialMedia