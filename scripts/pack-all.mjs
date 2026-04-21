// scripts/pack-all.mjs
//
// Usage from repo root:
//   yarn pack:exportable            (just pack — assumes lib/ and lib-es/ exist)
//   yarn build+pack:exportable      (build:lib first, then pack)
//
// ---------------------------------------------------------------------------
// Manual equivalent (no script) — run from repo root in PowerShell:
//
//   New-Item -ItemType Directory -Force -Path .\exportable-packages | Out-Null
//
//   yarn workspace @react-page/editor              pack --out ./exportable-packages/react-page-editor-0.0.0.tgz
//   yarn workspace @react-page/plugins-background  pack --out ./exportable-packages/react-page-plugins-background-0.0.0.tgz
//   yarn workspace @react-page/plugins-divider     pack --out ./exportable-packages/react-page-plugins-divider-0.0.0.tgz
//   yarn workspace @react-page/plugins-html5-video pack --out ./exportable-packages/react-page-plugins-html5-video-0.0.0.tgz
//   yarn workspace @react-page/plugins-image       pack --out ./exportable-packages/react-page-plugins-image-0.0.0.tgz
//   yarn workspace @react-page/plugins-slate       pack --out ./exportable-packages/react-page-plugins-slate-0.0.0.tgz
//   yarn workspace @react-page/plugins-spacer      pack --out ./exportable-packages/react-page-plugins-spacer-0.0.0.tgz
//   yarn workspace @react-page/plugins-video       pack --out ./exportable-packages/react-page-plugins-video-0.0.0.tgz
//
// The `--out` flag is REQUIRED. Without it, Yarn 4 writes `package.tgz`
// which is not the filename the demo expects.
//
// Cache-bust before re-installing in the demo (otherwise npm reuses stale
// integrity hashes from package-lock.json and may fail or silently stay stale):
//
//   Remove-Item -Recurse -Force react18-demo-js-exportable\node_modules\@react-page -ErrorAction SilentlyContinue
//   Remove-Item -Force react18-demo-js-exportable\package-lock.json -ErrorAction SilentlyContinue
//
// Then install + run in the demo:
//
//   cd react18-demo-js-exportable
//   npm install
//   npm run dev
//
// Single-package iteration (only rebuild/repack what changed):
//
//   yarn workspace @react-page/plugins-spacer pack --out ./exportable-packages/react-page-plugins-spacer-0.0.0.tgz
//   Remove-Item -Recurse -Force react18-demo-js-exportable\node_modules\@react-page\plugins-spacer -ErrorAction SilentlyContinue
//   Remove-Item -Force react18-demo-js-exportable\package-lock.json -ErrorAction SilentlyContinue
//   cd react18-demo-js-exportable; npm install
//
// NOTE: The demo consumes tarballs with npm, not yarn. Yarn 4 Berry can't
// resolve `file:*.tgz` deps from nested dirs (inherits the monorepo's yarnrc
// and treats the demo as a phantom workspace). Client mandate is on packing
// only, so this split is intentional.
// ---------------------------------------------------------------------------
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = join(ROOT, 'exportable-packages');
const DEMO_DIR = join(ROOT, 'react18-demo-js-exportable');
const DEMO_SCOPE_NM = join(DEMO_DIR, 'node_modules', '@react-page');
const DEMO_LOCK = join(DEMO_DIR, 'package-lock.json');

const PACKAGES = [
  ['@react-page/editor',              'packages/editor'],
  ['@react-page/plugins-background',  'packages/plugins/layout/background'],
  ['@react-page/plugins-divider',     'packages/plugins/content/divider'],
  ['@react-page/plugins-html5-video', 'packages/plugins/content/html5-video'],
  ['@react-page/plugins-image',       'packages/plugins/content/image'],
  ['@react-page/plugins-slate',       'packages/plugins/content/slate'],
  ['@react-page/plugins-spacer',      'packages/plugins/content/spacer'],
  ['@react-page/plugins-video',       'packages/plugins/content/video'],
];

const slug = (name) => name.replace(/^@/, '').replace('/', '-');

const assertBuilt = (pkgDir) => {
  for (const d of [join(pkgDir, 'lib'), join(pkgDir, 'lib-es')]) {
    if (!existsSync(d) || !statSync(d).isDirectory()) {
      throw new Error(
        `Missing build output: ${d}\nRun 'yarn build:lib' at repo root first.`
      );
    }
  }
};

const run = (cmd, args, opts = {}) => {
  console.log(`> ${cmd} ${args.join(' ')}`);
  execFileSync(cmd, args, { stdio: 'inherit', shell: true, ...opts });
};

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

// Cache-bust: the demo is installed with npm (client mandates yarn only for
// packing, not consumption). npm pins tarballs in package-lock.json by
// integrity hash — stale locks + freshly re-packed tarballs = hash mismatch
// errors. Clear both the installed copies and the lockfile so `npm install`
// re-resolves against the current tarballs.
if (existsSync(DEMO_SCOPE_NM)) {
  console.log(`Clearing ${DEMO_SCOPE_NM}`);
  rmSync(DEMO_SCOPE_NM, { recursive: true, force: true });
}
if (existsSync(DEMO_LOCK)) {
  console.log(`Removing stale ${DEMO_LOCK}`);
  rmSync(DEMO_LOCK, { force: true });
}

for (const [name, relPath] of PACKAGES) {
  const pkgDir = join(ROOT, relPath);
  assertBuilt(pkgDir);

  const outFile = join(OUT_DIR, `${slug(name)}-0.0.0.tgz`);
  console.log(`\n=== Packing ${name} -> ${outFile} ===`);

  run('yarn', ['pack', '--out', outFile], { cwd: pkgDir });
}

console.log('\nDone. Tarballs in', OUT_DIR);
