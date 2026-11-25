#!/usr/bin/env node
/**
 * Automated Devotional Corpus Integrity Check
 * Scans all source and data files for illegal Devanagari / Latin character adjacency,
 * preventing corrupted strings, broken find-and-replace residue, or spliced code identifiers.
 */

import fs from "fs";
import path from "path";

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === "node_modules" || file === "dist" || file === ".git") continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath, fileList);
    } else if (file.endsWith(".ts") || file.endsWith(".tsx") || file.endsWith(".json")) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = walk(".");
// Matches Devanagari character directly adjacent to ASCII letter/word characters
const adjacencyRegex = /([\u0900-\u097F][a-zA-Z])|([a-zA-Z][\u0900-\u097F])/g;

let violationsCount = 0;

for (const f of allFiles) {
  const content = fs.readFileSync(f, "utf8");
  const lines = content.split("\n");
  lines.forEach((line, idx) => {
    // Exclude standard escaped characters (\n, \t, etc.)
    const sanitized = line.replace(/\\[nrtbfv]/g, "");
    if (adjacencyRegex.test(sanitized)) {
      console.error(`[CORRUPTION ERROR] ${f}:${idx + 1}: ${line.trim()}`);
      violationsCount++;
    }
  });
}

if (violationsCount > 0) {
  console.error(`\nFAILED: Found ${violationsCount} Devanagari/Latin corruptions in sacred corpus.`);
  process.exit(1);
} else {
  console.log(`PASSED: All sacred texts verified! 0 Devanagari/Latin corruptions found across ${allFiles.length} files.`);
  process.exit(0);
}
