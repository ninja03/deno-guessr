import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>DenoGuessr - Test Your Geography Skills</title>
      </Head>
      <div class="min-h-screen bg-gradient-to-b from-green-500 to-green-700 flex flex-col">
        <header class="bg-green-800 text-white p-4 shadow-md">
          <div class="container mx-auto">
            <h1 class="text-3xl font-bold">DenoGuessr</h1>
          </div>
        </header>

        <main class="container mx-auto flex-grow flex flex-col items-center justify-center px-4 py-16 text-white">
          <h2 class="text-5xl font-bold mb-8 text-center">
            Test Your Geography Knowledge
          </h2>
          <p class="text-xl mb-12 max-w-2xl text-center">
            Explore the world, see amazing locations, and guess where they are on
            the map. How well do you know our planet?
          </p>
          
          <a
            href="/game"
            class="bg-white text-green-700 hover:bg-green-100 transition-colors px-8 py-4 rounded-full text-xl font-bold shadow-lg"
          >
            Start Playing
          </a>
        </main>

        <footer class="bg-green-800 text-white p-6">
          <div class="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} DenoGuessr - A GeoGuessr Clone</p>
            <p class="mt-2 text-sm">Built with Deno Fresh</p>
          </div>
        </footer>
      </div>
    </>
  );
}
