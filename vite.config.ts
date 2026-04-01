import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { copyFileSync } from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    {
      name: 'copy-sql-wasm',
      buildStart() {
        // Copy sql.js wasm file to public directory
        try {
          const wasmSrc = path.resolve(__dirname, 'node_modules/sql.js/dist/sql-wasm.wasm');
          const wasmDest = path.resolve(__dirname, 'public/sql-wasm.wasm');
          copyFileSync(wasmSrc, wasmDest);
          console.log('✓ Copied sql-wasm.wasm to public directory');
        } catch (err) {
          console.warn('Warning: Could not copy sql-wasm.wasm:', err);
        }
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'sql.js': ['sql.js']
        }
      }
    }
  },
  assetsInclude: ['**/*.wasm'],
}));
