import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
// @ts-expect-error type error without @types/node package
import process from "node:process";
// @ts-expect-error type error without @types/node package
import { rmSync } from "node:fs";
// @ts-expect-error type error without @types/node package
import { resolve } from "node:path";
import tailwindcss from '@tailwindcss/vite'
const host = process.env.TAURI_DEV_HOST;

/**
 * En el build de escritorio (`vite build --mode escritorio`, que usa `tauri build`)
 * borra `materiales/` del resultado: los PDF del Banco de Material son para docentes
 * y no deben quedar dentro del ejecutable que se instala en los equipos de los niños.
 */
function quitarMaterialesEnEscritorio(): Plugin {
  let outDir = "";
  return {
    name: "quitar-materiales-en-escritorio",
    apply: "build",
    configResolved(config) {
      outDir = config.mode === "escritorio" ? resolve(config.root, config.build.outDir) : "";
    },
    closeBundle() {
      if (outDir) rmSync(resolve(outDir, "materiales"), { recursive: true, force: true });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [
    react(),
    tailwindcss(),
    quitarMaterialesEnEscritorio(),
  ],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent Vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell Vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
