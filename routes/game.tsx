import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getRandomLocations, Location } from "../utils/locations.ts";
import GameController from "../islands/GameController.tsx";

interface GameProps {
  initialLocation: Location;
  totalRounds: number;
  allLocations: Location[];
}

// Server-side handler to initialize the game
export const handler: Handlers<GameProps> = {
  GET(req, ctx) {
    const totalRounds = 5;
    const allLocations = getRandomLocations(totalRounds);
    
    return ctx.render({
      initialLocation: allLocations[0],
      totalRounds: totalRounds,
      allLocations: allLocations,
    });
  },
};

export default function Game({ data }: PageProps<GameProps>) {
  return (
    <>
      <Head>
        <title>Denoくんのジオゲッサー</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </Head>
      <div class="min-h-screen bg-gray-100 flex flex-col">
        <header class="bg-green-800 text-white p-4 shadow-md">
          <div class="container mx-auto flex items-center gap-3">
            <img src="/deno_matrix.png" alt="Deno Logo" class="w-10 h-10" />
            <h1 class="text-3xl font-bold">Denoくんのジオゲッサー</h1>
          </div>
        </header>
        <GameController
          initialLocation={data.initialLocation}
          totalRounds={data.totalRounds}
          allLocations={data.allLocations}
        />
        
        <footer class="bg-green-700 text-white p-4 mt-auto">
          <div class="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Denoくんのジオゲッサー</p>
          </div>
        </footer>
      </div>
    </>
  );
}
