export interface Location {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description?: string;
  imageUrl: string;
  region: string;
}

// Curated list of interesting locations from around the world
export const locations: Location[] = [
  {
    id: 1,
    latitude: 35.6895,
    longitude: 139.6917,
    name: "Tokyo Tower",
    description: "Iconic lattice tower in Tokyo, Japan",
    imageUrl: "/locations/tokyo_tower.jpg",
    region: "Asia",
  },
  {
    id: 2,
    latitude: 48.8584,
    longitude: 2.2945,
    name: "Eiffel Tower",
    description: "Famous iron lattice tower on the Champ de Mars in Paris",
    imageUrl: "/locations/eiffel_tower.jpg",
    region: "Europe",
  },
  {
    id: 3,
    latitude: 40.7128,
    longitude: -74.0060,
    name: "New York City",
    description: "Bustling streets of Manhattan",
    imageUrl: "/locations/new_york.jpg",
    region: "North America",
  },
  {
    id: 4,
    latitude: -33.8568,
    longitude: 151.2153,
    name: "Sydney Opera House",
    description: "Iconic performing arts center in Sydney",
    imageUrl: "/locations/sydney_opera.jpg",
    region: "Australia",
  },
  {
    id: 5,
    latitude: -13.1631,
    longitude: -72.5450,
    name: "Machu Picchu",
    description: "15th-century Inca citadel in Peru",
    imageUrl: "/locations/machu_picchu.jpg",
    region: "South America",
  },
  {
    id: 6,
    latitude: -33.9249,
    longitude: 18.4241,
    name: "Cape Town",
    description: "Coastal city in South Africa",
    imageUrl: "/locations/cape_town.jpg",
    region: "Africa",
  },
  {
    id: 7,
    latitude: 51.5074,
    longitude: -0.1278,
    name: "London Eye",
    description: "Giant Ferris wheel on the South Bank of the River Thames",
    imageUrl: "/locations/london_eye.jpg",
    region: "Europe",
  },
  {
    id: 8,
    latitude: 25.1972,
    longitude: 55.2744,
    name: "Burj Khalifa",
    description: "Tallest building in the world located in Dubai",
    imageUrl: "/locations/burj_khalifa.jpg",
    region: "Asia",
  },
  {
    id: 9,
    latitude: 37.8199,
    longitude: -122.4783,
    name: "Golden Gate Bridge",
    description: "Suspension bridge spanning the Golden Gate strait",
    imageUrl: "/locations/golden_gate.jpg",
    region: "North America",
  },
  {
    id: 10,
    latitude: 27.1751,
    longitude: 78.0421,
    name: "Taj Mahal",
    description: "Ivory-white marble mausoleum in Agra, India",
    imageUrl: "/locations/taj_mahal.jpg",
    region: "Asia",
  },
];

// Get a random location from the database
export function getRandomLocation(): Location {
  const randomIndex = Math.floor(Math.random() * locations.length);
  return locations[randomIndex];
}

// Get multiple random locations for a game
export function getRandomLocations(count: number): Location[] {
  const shuffled = [...locations].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Calculate distance between two points on Earth (Haversine formula)
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

// Convert degrees to radians
function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Calculate score based on distance (closer = higher score)
export function calculateScore(distanceKm: number): number {
  // Max score of 5000 points when distance is 0
  // Min score of 0 points when distance is 10000km or more
  const maxDistance = 10000; // km
  const maxScore = 5000;
  
  // Linear scoring: score decreases as distance increases
  const score = Math.max(0, maxScore * (1 - distanceKm / maxDistance));
  return Math.round(score);
}
