import { type PageProps } from "$fresh/server.ts";
import Rain from "../islands/Rain.tsx";
import Stars from "../islands/Stars.tsx";
import Moon from "../islands/Moon.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>deno-guessr</title>
        <link rel="stylesheet" href="/styles.css?v=2" />
        <link rel="icon" type="image/png" href="/deno_matrix.png" />
      </head>
      <body>
        <Stars />
        <Moon />
        <Rain />
        <Component />
      </body>
    </html>
  );
}
