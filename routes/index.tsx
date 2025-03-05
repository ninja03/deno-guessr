import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Denoくんのジオゲッサー</title>
      </Head>
      <div class="min-h-screen bg-gradient-to-b from-green-500 to-green-700 flex flex-col">
        <header class="bg-green-800 text-white p-4 shadow-md">
          <div class="container mx-auto">
            <h1 class="text-3xl font-bold">Denoくんのジオゲッサー</h1>
          </div>
        </header>

        <main class="container mx-auto flex-grow flex flex-col items-center justify-center px-4 py-16 text-white">
          <h2 class="text-5xl font-bold mb-8 text-center">
            あなたの地理知識をテストしよう
          </h2>
          <p class="text-xl mb-12 max-w-2xl text-center">
            世界を探索し、素晴らしい場所を見て、地図上でその場所を当ててみましょう。あなたはどれだけ地球を知っていますか？
          </p>
          
          <a
            href="/game"
            class="bg-white text-green-700 hover:bg-green-100 transition-colors px-8 py-4 rounded-full text-xl font-bold shadow-lg"
          >
            ゲームを始める
          </a>
        </main>

        <footer class="bg-green-800 text-white p-6">
          <div class="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Denoくんのジオゲッサー</p>
            <p class="mt-2 text-sm">Deno Freshで構築</p>
            <a 
              href="https://github.com/ninja03/deno-guessr" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-block mt-3 text-white hover:text-green-200 transition-colors"
            >
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
