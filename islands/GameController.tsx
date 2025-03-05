import { useState, useEffect } from "preact/hooks";
import { Location, calculateDistance, calculateScore } from "../utils/locations.ts";
import MapGuess from "./MapGuess.tsx";
import { LocationPlaceholder } from "../components/LocationPlaceholder.tsx";

interface GameControllerProps {
  initialLocation: Location;
  totalRounds: number;
  allLocations: Location[];
}

export default function GameController({ 
  initialLocation, 
  totalRounds,
  allLocations, 
}: GameControllerProps) {
  const [gameState, setGameState] = useState({
    currentRound: 1,
    totalRounds: totalRounds,
    currentLocation: initialLocation,
    gameOver: false,
    score: 0,
    totalScore: 0,
    guessSubmitted: false,
    guessCoordinates: { lat: 0, lng: 0 },
    showResults: false,
    distanceKm: 0,
    roundScore: 0,
  });

  const handleGuessSubmit = (lat: number, lng: number) => {
    const distanceKm = calculateDistance(
      lat,
      lng,
      gameState.currentLocation.latitude,
      gameState.currentLocation.longitude
    );
    const roundScore = calculateScore(distanceKm);

    setGameState((prev) => ({
      ...prev,
      guessSubmitted: true,
      guessCoordinates: { lat, lng },
      showResults: true,
      distanceKm,
      roundScore,
      totalScore: prev.totalScore + roundScore,
    }));
  };

  const nextRound = () => {
    if (gameState.currentRound >= gameState.totalRounds) {
      setGameState((prev) => ({
        ...prev,
        gameOver: true,
      }));
    } else {
      // Get next location from the pre-loaded array
      const nextLocation = allLocations[gameState.currentRound];
      setGameState((prev) => ({
        ...prev,
        currentRound: prev.currentRound + 1,
        currentLocation: nextLocation,
        guessSubmitted: false,
        showResults: false,
      }));
    }
  };

  return (
    <div class="min-h-full">
      <header class="bg-green-600 text-white p-4 shadow-md">
        <div class="container mx-auto flex justify-between items-center">
          <h1 class="text-2xl font-bold">DenoGuessr</h1>
          <div class="flex items-center space-x-4">
            <span class="font-semibold">
              Round: {gameState.currentRound}/{gameState.totalRounds}
            </span>
            <span class="font-semibold">
              Score: {gameState.totalScore}
            </span>
          </div>
        </div>
      </header>

      <main class="container mx-auto p-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Location Image Area */}
          <div class="bg-white rounded-lg shadow-md overflow-hidden h-96">
            {/* Using placeholder component instead of actual images for this demo */}
            <LocationPlaceholder
              locationId={gameState.currentLocation.imageUrl.split('/').pop()?.split('.')[0] || ''}
              name={gameState.currentLocation.name}
            />
          </div>

          {/* Map Area */}
          <div class="bg-white rounded-lg shadow-md h-96">
            <MapGuess
              onGuessSubmit={handleGuessSubmit}
              actualLocation={{
                lat: gameState.currentLocation.latitude,
                lng: gameState.currentLocation.longitude,
              }}
              showResults={gameState.showResults}
              guessCoordinates={gameState.guessCoordinates}
            />
          </div>
        </div>

        {/* Game Controls */}
        <div class="mt-6 flex justify-center">
          {gameState.showResults ? (
            <button
              onClick={nextRound}
              class="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              {gameState.currentRound >= gameState.totalRounds
                ? "See Final Results"
                : "Next Round"}
            </button>
          ) : null}
        </div>

        {/* Results Display (shown after guess) */}
        {gameState.showResults && (
          <div class="mt-6 bg-white rounded-lg shadow-md p-4">
            <h2 class="text-xl font-bold mb-2">Round Results</h2>
            <p>
              The location was: <strong>{gameState.currentLocation.name}</strong>
              {gameState.currentLocation.description && (
                <span> - {gameState.currentLocation.description}</span>
              )}
            </p>
            <p class="mt-2">
              Your guess was <span>{gameState.distanceKm.toFixed(1)}</span> km away.
            </p>
            <p class="mt-2">
              Points earned this round: <strong>{gameState.roundScore}</strong>
            </p>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState.gameOver && (
          <div class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
              <h2 class="text-2xl font-bold mb-4">Game Over!</h2>
              <p class="text-lg mb-2">
                Your final score: <strong>{gameState.totalScore}</strong>
              </p>
              <div class="mt-6 flex justify-center">
                <a
                  href="/"
                  class="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Play Again
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
