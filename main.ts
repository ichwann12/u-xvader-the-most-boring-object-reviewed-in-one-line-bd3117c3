// The Most Boring Object, Reviewed in One Line
// Reads the single-line review from entry.txt and writes it to
// <output dir>/entry.txt. Stdlib only, no network, no wall clock.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const entry = readFileSync(join(repoRoot, "entry.txt"), "utf8").trimEnd();

// The gate allows one line of 1-200 characters: refuse to emit anything else.
if (entry.length < 1 || entry.length > 200 || entry.includes("\n")) {
  throw new Error(
    `entry.txt must be a single line of 1-200 characters, got ${entry.length}`,
  );
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ??
  process.env.MAKEFUN_BOT_DIR ??
  join(repoRoot, "output");

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
