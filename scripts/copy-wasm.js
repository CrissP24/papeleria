import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wasmSrc = path.join(__dirname, '..', 'node_modules', 'sql.js', 'dist', 'sql-wasm.wasm');
const wasmDest1 = path.join(__dirname, '..', 'public', 'sql-wasm.wasm');
const wasmDest2 = path.join(__dirname, '..', 'public', 'sql-wasm-browser.wasm');

try {
  // Ensure public directory exists
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Copy WASM file with both names (sql.js looks for different names in different contexts)
  fs.copyFileSync(wasmSrc, wasmDest1);
  fs.copyFileSync(wasmSrc, wasmDest2);
  console.log('✓ Copied sql-wasm.wasm to public directory');
  console.log('✓ Copied sql-wasm-browser.wasm to public directory');
} catch (err) {
  console.error('Error copying WASM files:', err.message);
  process.exit(1);
}
