import { JSX } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { GOOGLE_MAPS_API_KEY, STREET_VIEW_CONFIG } from "../utils/config.ts";

interface LocationPlaceholderProps {
  locationId: string;
  name: string;
  className?: string;
  latitude?: number;
  longitude?: number;
}

declare global {
  interface Window {
    google: any;
    initGoogleMaps: () => void;
    initStreetView: (id: string, lat: number, lng: number) => void;
  }
}

export function LocationPlaceholder(props: LocationPlaceholderProps) {
  const streetViewRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Skip if no coordinates provided or during SSR
    if (!props.latitude || !props.longitude || typeof window === "undefined") return;
    
    // Initialize Google Maps API if not already loaded
    if (!window.google) {
      // Create the script element
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initGoogleMaps`;
      script.async = true;
      script.defer = true;
      
      // Define the callback function
      window.initGoogleMaps = () => {
        // Initialize Street View for all locations on the page
        const containers = document.querySelectorAll("[data-streetview-id]");
        containers.forEach((container) => {
          const id = container.getAttribute("data-streetview-id") || "";
          const lat = parseFloat(container.getAttribute("data-lat") || "0");
          const lng = parseFloat(container.getAttribute("data-lng") || "0");
          
          initStreetViewForElement(id, lat, lng);
        });
      };
      
      // Initialize Street View for a specific element
      window.initStreetView = (id, lat, lng) => {
        initStreetViewForElement(id, lat, lng);
      };
      
      // Add the script to the document
      document.head.appendChild(script);
    } else if (streetViewRef.current) {
      // If Google Maps API is already loaded, initialize Street View directly
      initStreetViewForElement(
        `streetview-${props.locationId}`,
        props.latitude,
        props.longitude
      );
    }
    
    // Function to initialize Street View for a specific element
    function initStreetViewForElement(id: string, lat: number, lng: number) {
      const container = document.getElementById(id);
      if (!container) return;
      
      // Check if Street View is available at this location
      const streetViewService = new window.google.maps.StreetViewService();
      
      streetViewService.getPanorama(
        { location: { lat, lng }, radius: 50 },
        (data: any, status: string) => {
          if (status === "OK") {
            // Street View data is available, create the panorama
            const panorama = new window.google.maps.StreetViewPanorama(container, {
              position: { lat, lng },
              ...STREET_VIEW_CONFIG
            });
          } else {
            // No Street View data available, show a fallback message
            container.innerHTML = `
              <div class="flex items-center justify-center w-full h-full bg-gray-200 text-gray-600 p-4 text-center">
                <div>
                  <div class="text-xl font-semibold mb-3">${props.name}</div>
                  <p>このロケーションでのストリートビューデータは利用できません。</p>
                  <p class="text-sm mt-2">緯度: ${lat.toFixed(4)}, 経度: ${lng.toFixed(4)}</p>
                </div>
              </div>
            `;
          }
        }
      );
    }
  }, [props.latitude, props.longitude, streetViewRef.current]);
  
  return (
    <div
      class={`location-placeholder w-full h-full relative ${props.className ?? ""}`}
      data-location={props.locationId}
    >
      {/* Street View Container */}
      <div 
        id={`streetview-${props.locationId}`}
        data-streetview-id={`streetview-${props.locationId}`}
        data-lat={props.latitude}
        data-lng={props.longitude}
        class="w-full h-full"
        ref={streetViewRef}
      >
        {/* Initial loading state */}
        <div class="flex items-center justify-center w-full h-full bg-gray-100">
          <div class="text-gray-500">
            <svg class="animate-spin h-10 w-10 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <div>ストリートビューを読み込み中...</div>
          </div>
        </div>
      </div>
      
      {/* Location name overlay - this will remain visible even during loading */}
      <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 z-10">
        <div class="text-xl font-semibold">{props.name}</div>
      </div>
    </div>
  );
}
