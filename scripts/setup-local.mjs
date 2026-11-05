import { copyFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
process.chdir(root);

if (!existsSync('node_modules/wrangler/bin/wrangler.js')) {
  console.error('Run pnpm install --frozen-lockfile first.');
  process.exit(1);
}

if (!existsSync('.dev.vars')) {
  copyFileSync('.dev.vars.example', '.dev.vars');
  console.log('Created the local-only dashboard configuration.');
}

const result = spawnSync(process.execPath, [
  '--import', './scripts/sites-env.mjs',
  './node_modules/wrangler/bin/wrangler.js',
  'd1', 'migrations', 'apply', 'DB', '--local',
  '--config', 'wrangler.local.json', '--persist-to', '.wrangler/state',
], { cwd: root, env: { ...process.env, CI: 'true' }, stdio: 'inherit' });
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
console.log('Ready. Run pnpm dev and open http://localhost:5173.');
