const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all tsx files in apprentice-courses
const files = glob.sync('src/pages/apprentice-courses/**/*.tsx');

let fixedCount = 0;

files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Fix patterns in string literals only (between quotes)
    // Pattern 1: Fix >200, >999, etc. in strings
    content = content.replace(/(["']\s*[^"']*?)>(\d)/g, '$1&gt;$2');

    // Pattern 2: Fix <60, <30, etc. in strings
    content = content.replace(/(["']\s*[^"']*?)<(\d)/g, '$1&lt;$2');

    // Pattern 3: Fix comparison operators like "XL > XC" in strings
    content = content.replace(/(["'].*?)([A-Za-z][A-Za-z0-9]*)\s+>\s+([A-Za-z][A-Za-z0-9]*)(.*?["'])/g, '$1$2 &gt; $3$4');
    content = content.replace(/(["'].*?)([A-Za-z][A-Za-z0-9]*)\s+<\s+([A-Za-z][A-Za-z0-9]*)(.*?["'])/g, '$1$2 &lt; $3$4');

    // Prevent double-escaping
    content = content.replace(/&amp;gt;/g, '&gt;');
    content = content.replace(/&amp;lt;/g, '&lt;');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Fixed: ${path.basename(filePath)}`);
        fixedCount++;
    }
});

console.log(`\nDone! Fixed ${fixedCount} out of ${files.length} files.`);
