import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Denoくんのジオゲッサー</title>
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

        <main class="container mx-auto flex-grow flex flex-col items-center justify-center px-4 py-16 text-white">
          <h2 class="text-5xl font-bold mb-8 text-center night-title-glow">
            あなたの地理知識をテストしよう
          </h2>
          <p class="text-xl mb-12 max-w-2xl text-center night-text-glow">
            世界を探索し、素晴らしい場所を見て、地図上でその場所を当ててみましょう。あなたはどれだけ地球を知っていますか？
          </p>
          
          <a
            href="/game"
            class="bg-blue-700 text-white hover:bg-blue-600 transition-colors px-8 py-4 rounded-full text-xl font-bold shadow-lg"
          >
            ゲームを始める
          </a>
        </main>

        <footer class="bg-gray-900 text-white p-6">
          <div class="container mx-auto text-center">
            <p class="night-text-glow">&copy; {new Date().getFullYear()} Denoくんのジオゲッサー</p>
            <p class="mt-2 text-sm night-text-glow">Deno Freshで構築</p>
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
