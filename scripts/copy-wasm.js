import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wasmSrc = path.join(__dirname, '..', 'node_modules', 'sql.js', 'dist', 'sql-wasm.wasm');
const wasmDest = path.join(__dirname, '..', 'public', 'sql-wasm.wasm');

try {
  // Ensure public directory exists
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Copy WASM file
  fs.copyFileSync(wasmSrc, wasmDest);
  console.log('✓ Copied sql-wasm.wasm to public directory');
} catch (err) {
  console.error('Error copying sql-wasm.wasm:', err.message);
  process.exit(1);
}
