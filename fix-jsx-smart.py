#!/usr/bin/env python3
"""
Smart JSX escaping fixer - only escapes > and < in string literals
"""
import os
import re
from pathlib import Path

def fix_jsx_escaping(content):
    """Fix > and < in string literals only"""
    original = content

    # Pattern 1: Fix >NUMBER in string literals (double quotes)
    # Match: "text >200" or explanation: "reading >999"
    content = re.sub(r'("(?:[^"\\]|\\.)*?)([a-zA-Z\)])(\s*)>(\d)', r'\1\2\3&gt;\4', content)

    # Pattern 2: Fix <NUMBER in string literals (double quotes)
    content = re.sub(r'("(?:[^"\\]|\\.)*?)([a-zA-Z\)])(\s*)<(\d)', r'\1\2\3&lt;\4', content)

    # Pattern 3: Fix comparison operators like "XL > XC" in strings
    content = re.sub(r'([A-Z][a-z0-9]*[A-Z0-9]*)\s+>\s+([A-Z][a-z0-9]*[A-Z0-9]*)', r'\1 &gt; \2', content)
    content = re.sub(r'([A-Z][a-z0-9]*[A-Z0-9]*)\s+<\s+([A-Z][a-z0-9]*[A-Z0-9]*)', r'\1 &lt; \2', content)

    # Pattern 4: Fix patterns at start of strings like ">200 MΩ"
    content = re.sub(r'(["\']\s*)>(\d+\s*[MmΩkKA])', r'\1&gt;\2', content)

    # Prevent double-escaping
    content = content.replace('&amp;gt;', '&gt;')
    content.replace('&amp;lt;', '&lt;')

    return content, content != original

def process_files():
    """Process all .tsx files in apprentice-courses"""
    base_dir = Path('src/pages/apprentice-courses')
    fixed_count = 0

    for tsx_file in base_dir.rglob('*.tsx'):
        try:
            with open(tsx_file, 'r', encoding='utf-8') as f:
                content = f.read()

            new_content, changed = fix_jsx_escaping(content)

            if changed:
                with open(tsx_file, 'w', encoding='utf-8', newline='') as f:
                    f.write(new_content)
                print(f'✓ Fixed: {tsx_file.name}')
                fixed_count += 1
        except Exception as e:
            print(f'✗ Error in {tsx_file.name}: {e}')

    print(f'\nDone! Fixed {fixed_count} files.')

if __name__ == '__main__':
    process_files()
