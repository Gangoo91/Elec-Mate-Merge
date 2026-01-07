const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all tsx files in apprentice-courses
const files = glob.sync('src/pages/apprentice-courses/**/*.tsx');

let fixedCount = 0;
let totalChanges = 0;

files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Strategy: Match > and < only when preceded by letters/parens and followed by numbers/letters
    // This avoids matching JSX tags

    // Pattern 1: Fix patterns like '>200 MΩ', '>999', inside single or double quoted strings
    // Using negative lookbehind to avoid matching already escaped ones
    content = content.replace(/(['"]\s*[^'"]*?[a-zA-Z\)])(\s*)>(\d)/g, '$1$2&gt;$3');

    // Pattern 2: Fix '<60', '<30', etc. in strings
    content = content.replace(/(['"]\s*[^'"]*?[a-zA-Z\)])(\s*)<(\d)/g, '$1$2&lt;$3');

    // Pattern 3: Fix comparison operators between variables like 'XL > XC' or 'Ib > In'
    // Only when surrounded by alphanumeric identifiers
    content = content.replace(/([A-Z][a-z0-9]*[A-Z]*)\s+>\s+([A-Z][a-z0-9]*[A-Z]*)/g, '$1 &gt; $2');
    content = content.replace(/([A-Z][a-z0-9]*[A-Z]*)\s+<\s+([A-Z][a-z0-9]*[A-Z]*)/g, '$1 &lt; $2');

    // Pattern 4: Fix specific edge cases found in testing
    // (e.g. >200 at start of string)
    content = content.replace(/["']\s*>(\d+\s*[MmkKΩA])/g, '"&gt;$1');
    content = content.replace(/[']\s*>(\d+\s*[MmkKΩA])/g, '\'&gt;$1');

    // Prevent double-escaping
    content = content.replace(/&amp;gt;/g, '&gt;');
    content = content.replace(/&amp;lt;/g, '&lt;');

    // Don't save if we broke something obvious
    // Check for pattern like `">anything` or `"<anything` without proper escaping
    const brokenPattern1 = /">[^&]/;
    const brokenPattern2 = /"<[^&]/;
    const brokenPattern3 = /'>[^&]/;
    const brokenPattern4 = /'<[^&]/;

    if (brokenPattern1.test(content) || brokenPattern2.test(content) ||
        brokenPattern3.test(content) || brokenPattern4.test(content)) {
        console.log(`⚠ Skipped (might break JSX): ${path.basename(filePath)}`);
        return;
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        const changes = (content.match(/&gt;/g) || []).length + (content.match(/&lt;/g) || []).length;
        console.log(`✓ Fixed: ${path.basename(filePath)} (${changes} escapes)`);
        fixedCount++;
        totalChanges += changes;
    }
});

console.log(`\nDone! Fixed ${fixedCount} out of ${files.length} files with ${totalChanges} total escapes.`);
