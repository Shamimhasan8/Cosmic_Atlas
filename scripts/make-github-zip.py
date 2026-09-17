#!/usr/bin/env python3
"""
Create a clean GitHub-ready zip of the Cosmic Atlas project.

Excludes: node_modules, .next, .git, logs, sandbox tooling, build output.
Includes: all source code, config, docs, README, LICENSE, package.json, lockfile.
"""

import os
import zipfile
from pathlib import Path

PROJECT_ROOT = Path("/home/z/my-project")
OUTPUT_ZIP = Path("/home/z/my-project/download/cosmic-atlas.zip")

# Directories and files to NEVER include in the zip.
EXCLUDE_DIRS = {
    "node_modules",
    ".next",
    ".git",
    ".zscripts",
    "skills",
    "upload",
    "download",
    "mini-services",
    "examples",
    "db",
    "prisma",
    "tests",
    ".claude",
    ".z-ai-config",
    ".vercel",
    "coverage",
    "out",
    "build",
}

EXCLUDE_FILES = {
    "dev.log",
    "dev.out.log",
    "server.log",
    "npm-debug.log",
    "yarn-debug.log",
    "yarn-error.log",
    ".DS_Store",
    "Caddyfile",
    "next-env.d.ts",
    ".env",
    "prompt",
    "test",
}

EXCLUDE_SUFFIXES = {
    ".log",
    ".pem",
    ".tsbuildinfo",
}


def should_exclude(path: Path) -> bool:
    """Return True if this path should be excluded from the zip."""
    name = path.name

    if name in EXCLUDE_DIRS or name in EXCLUDE_FILES:
        return True

    for suffix in EXCLUDE_SUFFIXES:
        if name.endswith(suffix):
            return True

    return False


def main():
    if OUTPUT_ZIP.exists():
        OUTPUT_ZIP.unlink()

    included_files = []
    total_size = 0

    with zipfile.ZipFile(OUTPUT_ZIP, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
        for root, dirs, files in os.walk(PROJECT_ROOT):
            root_path = Path(root)

            # Filter out excluded directories in-place so os.walk doesn't descend into them.
            dirs[:] = [d for d in dirs if not should_exclude(root_path / d)]

            for filename in files:
                file_path = root_path / filename
                if should_exclude(file_path):
                    continue

                # Compute the archive name (relative path, with a top-level "cosmic-atlas/" folder).
                rel = file_path.relative_to(PROJECT_ROOT)
                archive_name = f"cosmic-atlas/{rel}"

                file_size = file_path.stat().st_size
                total_size += file_size
                included_files.append((str(rel), file_size))

                zf.write(file_path, archive_name)

    # Print summary
    print(f"\n{'='*60}")
    print(f"  Cosmic Atlas — GitHub-ready zip")
    print(f"{'='*60}")
    print(f"  Output:      {OUTPUT_ZIP}")
    print(f"  Zip size:    {OUTPUT_ZIP.stat().st_size / 1024:.1f} KB")
    print(f"  Files:       {len(included_files)}")
    print(f"  Uncompressed: {total_size / 1024:.1f} KB")
    print(f"{'='*60}\n")

    # Print file tree (top 40 files)
    print("  Included files:")
    for name, size in sorted(included_files)[:40]:
        print(f"    {size:>7} B  {name}")
    if len(included_files) > 40:
        print(f"    ... and {len(included_files) - 40} more")
    print()


if __name__ == "__main__":
    main()
