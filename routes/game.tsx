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
      <div class="min-h-screen bg-gradient-to-b from-blue-900 to-black flex flex-col">
        <header class="bg-gray-900 text-white p-4 shadow-md">
          <div class="container mx-auto flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img src="/deno_matrix.png" alt="Deno Logo" class="w-10 h-10" />
              <h1 class="text-3xl font-bold night-title-glow">Denoくんのジオゲッサー</h1>
            </div>
            <a 
              href="https://github.com/ninja03/deno-guessr" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="flex items-center gap-2 text-white hover:text-blue-300 transition-colors"
              title="GitHub Repository"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span class="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </header>
        <GameController
          initialLocation={data.initialLocation}
          totalRounds={data.totalRounds}
          allLocations={data.allLocations}
        />
        
        <footer class="bg-gray-900 text-white p-4 mt-auto">
          <div class="container mx-auto text-center">
            <p class="night-text-glow">&copy; {new Date().getFullYear()} Denoくんのジオゲッサー</p>
            <a 
              href="https://github.com/ninja03/deno-guessr" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-flex items-center gap-2 mt-3 text-blue-300 hover:text-blue-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub リポジトリ
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
