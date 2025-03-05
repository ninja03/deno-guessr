import { useEffect } from "preact/hooks";

export default function Moon() {
  useEffect(() => {
    // Create moon element if it doesn't exist
    let moon = document.querySelector('.moon');
    if (!moon) {
      moon = document.createElement('div');
      moon.className = 'moon';
      document.body.appendChild(moon);
    }

    // Cleanup function
    return () => {
      if (moon && moon.parentNode) {
        moon.parentNode.removeChild(moon);
      }
    };
  }, []);

  return null; // Component doesn't render any visual elements directly
}
