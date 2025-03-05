import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Denoくんのジオゲッサー</title>
      </Head>
      <div class="min-h-screen bg-gradient-to-b from-blue-900 to-black flex flex-col">
        <header class="bg-gray-900 text-white p-4 shadow-md">
          <div class="container mx-auto flex items-center gap-3">
            <img src="/deno_matrix.png" alt="Deno Logo" class="w-10 h-10" />
            <h1 class="text-3xl font-bold night-title-glow">Denoくんのジオゲッサー</h1>
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
              class="inline-block mt-3 text-blue-300 hover:text-blue-200 transition-colors"
            >
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
