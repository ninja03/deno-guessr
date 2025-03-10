import { useEffect, useRef, useState } from "preact/hooks";
import { calculateDistance, calculateScore } from "../utils/locations.ts";

// Type for map coordinates
interface Coordinates {
  lat: number;
  lng: number;
}

// Props for the MapGuess component
export interface MapGuessProps {
  onGuessSubmit: (lat: number, lng: number) => void;
  actualLocation: Coordinates;
  showResults: boolean;
  guessCoordinates: Coordinates;
}

export default function MapGuess({
  onGuessSubmit,
  actualLocation,
  showResults,
  guessCoordinates,
}: MapGuessProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [marker, setMarker] = useState<any>(null);
  const [map, setMap] = useState<any>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [score, setScore] = useState<number | null>(null);

  // Initialize the map
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Skip if already initialized
    if (map) return;

    // Import Leaflet dynamically (client-side only)
    import("leaflet").then((L) => {
      if (!mapRef.current) return;
      
      // Create the map centered at a default position
      const mapInstance = L.map(mapRef.current).setView([20, 0], 2);

      // Add dark tile layer (CartoDB Dark Matter)
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(mapInstance);
      
      // Create custom pin icon
      const customPinIcon = L.icon({
        iconUrl: "/pin.webp",
        iconSize: [64, 64], // Size of the icon
        iconAnchor: [32, 64], // Point of the icon which corresponds to marker's location
        popupAnchor: [0, -64] // Point from which popups should open relative to the iconAnchor
      });

      // Setup click handler to place a marker
      let currentMarker: any = null;
      
      mapInstance.on("click", (e: any) => {
        const { lat, lng } = e.latlng;
        
        // Remove previous marker if it exists
        if (currentMarker) {
          mapInstance.removeLayer(currentMarker);
        }
        
        // Add a new marker with custom pin icon
        currentMarker = L.marker([lat, lng], { icon: customPinIcon }).addTo(mapInstance);
        setMarker(currentMarker);
        
        // Update button to show it's ready to submit
        const submitBtn = document.getElementById("submit-guess");
        if (submitBtn) {
          submitBtn.removeAttribute("disabled");
          submitBtn.classList.remove("bg-gray-600");
          submitBtn.classList.add("bg-blue-700", "hover:bg-blue-600");
        }
      });
      
      setMap(mapInstance);
    });
    
    // Cleanup
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [mapRef.current]);

  // Handle showing results when the showResults prop changes
  useEffect(() => {
    if (!map || !showResults) return;

    import("leaflet").then((L) => {
      // Calculate and display distance and score
      const calculatedDistance = calculateDistance(
        guessCoordinates.lat,
        guessCoordinates.lng,
        actualLocation.lat,
        actualLocation.lng
      );
      
      setDistance(calculatedDistance);
      setScore(calculateScore(calculatedDistance));
      
      // Update the UI elements
      const distanceEl = document.getElementById("distance");
      const scoreEl = document.getElementById("round-score");
      
      if (distanceEl) {
        distanceEl.textContent = calculatedDistance.toFixed(1);
      }
      
      if (scoreEl) {
        const roundScore = calculateScore(calculatedDistance);
        scoreEl.textContent = roundScore.toString();
      }
      
      // Add marker for actual location with enhanced visibility for night theme
      const correctMarker = L.marker([actualLocation.lat, actualLocation.lng], {
        icon: L.divIcon({
          className: "correct-location-marker",
          html: '<div style="background-color: #64B5F6; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(135, 206, 250, 0.8);"></div>',
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        }),
      }).addTo(map);
      
      // Draw a line between guess and actual location with enhanced visibility
      const line = L.polyline(
        [
          [guessCoordinates.lat, guessCoordinates.lng],
          [actualLocation.lat, actualLocation.lng],
        ],
        { color: "#64B5F6", weight: 3, opacity: 0.8, dashArray: "10, 10" }
      ).addTo(map);
      
      // Fit the map to show both markers
      const bounds = L.latLngBounds(
        [guessCoordinates.lat, guessCoordinates.lng],
        [actualLocation.lat, actualLocation.lng]
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    });
  }, [showResults, map, actualLocation, guessCoordinates]);

  const handleSubmitGuess = () => {
    if (marker) {
      const position = marker.getLatLng();
      onGuessSubmit(position.lat, position.lng);
    }
  };

  return (
    <div class="h-full flex flex-col">
      <div ref={mapRef} class="flex-1"></div>
      <div class="p-4 bg-gray-900 text-white border-t border-gray-700">
        {!showResults ? (
          <button
            id="submit-guess"
            onClick={handleSubmitGuess}
            disabled={!marker}
            class={`w-full py-2 px-4 rounded-md text-white transition-colors ${
              marker
                ? "bg-blue-700 hover:bg-blue-600"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            推測する
          </button>
        ) : (
          <div class="text-center text-sm">
            {distance !== null && (
              <p>
                <span class="font-semibold">距離:</span> {distance.toFixed(1)} km
              </p>
            )}
            {score !== null && (
              <p>
                <span class="font-semibold">スコア:</span> {score} ポイント
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
