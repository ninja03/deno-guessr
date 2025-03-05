// Google Maps API configuration
// Note: Replace with your own API key from Google Cloud Platform
// 1. Go to https://console.cloud.google.com/
// 2. Create a new project
// 3. Navigate to APIs & Services > Credentials
// 4. Create an API key
// 5. Enable the Maps JavaScript API and Street View API
// 6. Paste your API key below
export const GOOGLE_MAPS_API_KEY = "";

// Street View configuration
export const STREET_VIEW_CONFIG = {
  pov: { heading: 34, pitch: 10 },
  zoom: 1,
  addressControl: false,
  showRoadLabels: false,
  disableDefaultUI: true,
  motionTracking: false,
  motionTrackingControl: false,
  fullscreenControl: false,
  // Set to true to allow users to move around in Street View
  // Set to false for a static view (more like GeoGuessr)
  clickToGo: false,
  scrollwheel: false,
  panControl: false,
};
