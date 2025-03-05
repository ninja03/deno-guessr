import { useEffect } from "preact/hooks";

export default function Rain() {
  useEffect(() => {
    // Create rain container if it doesn't exist
    let rainContainer = document.querySelector('.rain-container');
    if (!rainContainer) {
      rainContainer = document.createElement('div');
      rainContainer.className = 'rain-container';
      document.body.appendChild(rainContainer);
    }

    // Number of raindrops
    const numDrops = 150;
    
    // Create raindrops
    for (let i = 0; i < numDrops; i++) {
      const drop = document.createElement('div');
      drop.className = 'rain-drop';
      
      // Randomize position, animation duration, and delay
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 1 + 0.5; // 0.5 to 1.5 seconds
      const delay = Math.random() * 2; // 0 to 2 seconds delay
      const opacity = Math.random() * 0.4 + 0.3; // 0.3 to 0.7 opacity
      
      drop.style.left = `${left}%`;
      drop.style.animationDuration = `${animationDuration}s`;
      drop.style.animationDelay = `${delay}s`;
      drop.style.opacity = opacity.toString();
      
      rainContainer.appendChild(drop);
    }

    // Cleanup function
    return () => {
      if (rainContainer && rainContainer.parentNode) {
        rainContainer.parentNode.removeChild(rainContainer);
      }
    };
  }, []);

  return null; // Component doesn't render any visual elements directly
}
