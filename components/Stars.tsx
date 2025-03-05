import { useEffect } from "preact/hooks";

export default function Stars() {
  useEffect(() => {
    // Create stars container if it doesn't exist
    let starsContainer = document.querySelector('.stars-container');
    if (!starsContainer) {
      starsContainer = document.createElement('div');
      starsContainer.className = 'stars-container';
      document.body.appendChild(starsContainer);
    }

    // Number of stars
    const numStars = 200;
    
    // Create stars
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Randomize position, size, and animation
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const size = Math.random() * 2 + 1; // 1-3px
      const animationDuration = Math.random() * 3 + 2; // 2-5 seconds
      const delay = Math.random() * 5; // 0-5 seconds delay
      
      star.style.left = `${left}%`;
      star.style.top = `${top}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDuration = `${animationDuration}s`;
      star.style.animationDelay = `${delay}s`;
      
      starsContainer.appendChild(star);
    }

    // Cleanup function
    return () => {
      if (starsContainer && starsContainer.parentNode) {
        starsContainer.parentNode.removeChild(starsContainer);
      }
    };
  }, []);

  return null; // Component doesn't render any visual elements directly
}
