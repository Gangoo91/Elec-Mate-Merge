#!/usr/bin/env python3
"""Fix unescaped apostrophes in single-quoted strings in TSX files.

Converts single-quoted strings containing apostrophes to use escaped apostrophes.
Only processes strings that are property values (after : or =).
"""
import os, re

pages_dir = 'src/pages/seo'
total_fixes = 0

for fname in sorted(os.listdir(pages_dir)):
    if not fname.endswith('.tsx'):
        continue
    fpath = os.path.join(pages_dir, fname)
    if os.path.isdir(fpath):
        continue

    content = open(fpath).read()
    original = content

    # Find single-quoted strings that contain unescaped apostrophes
    # Pattern: match 'text that has an 's or similar pattern'
    # We need to be careful not to break properly escaped strings

    # Strategy: find all single-quoted string values and check if they contain
    # an unescaped apostrophe. If so, escape it.

    def fix_single_quoted(match):
        full = match.group(0)
        prefix = match.group(1)  # The part before the opening quote
        inner = match.group(2)   # The content between quotes

        # Check if inner content has apostrophe-like patterns
        # (word's, n't, 're, 've, 'll, 'm, 'd)
        has_apostrophe = re.search(r"(?<=[a-zA-Z])'(?=[a-zA-Z])", inner)
        if has_apostrophe:
            # Escape all unescaped internal apostrophes
            fixed = re.sub(r"(?<=[a-zA-Z])'(?=[a-zA-Z])", r"\\'", inner)
            return f"{prefix}'{fixed}'"
        return full

    # Match property-value single-quoted strings: key: 'value' or key='value'
    # This is a simplified approach - we look for : 'content' or = 'content' patterns
    # where content spans potentially multiple lines
    new_content = re.sub(
        r"((?::\s*|=\s*))'((?:[^'\\]|\\.)*?(?<=[a-zA-Z])'(?=[a-zA-Z])(?:[^'\\]|\\.)*?)'",
        fix_single_quoted,
        content
    )

    if new_content != content:
        # Count fixes
        fixes = content.count("'") - new_content.count("'") + new_content.count("\\'") - content.count("\\'")
        open(fpath, 'w').write(new_content)
        print(f"Fixed: {fname} ({fixes} apostrophes escaped)")
        total_fixes += fixes

print(f"\nTotal: {total_fixes} fixes across all files")
