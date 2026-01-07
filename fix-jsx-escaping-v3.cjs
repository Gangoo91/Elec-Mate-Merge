const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all tsx files in apprentice-courses
const files = glob.sync('src/pages/apprentice-courses/**/*.tsx');

let fixedCount = 0;

files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // VERY CAREFUL REPLACEMENTS - only within string values
    // Pattern 1: Fix >NUMBER where there's content before the >
    // Match strings like: "text >200mA" or explanation: "reading >999 MΩ"
    content = content.replace(/([a-zA-Z\)])\s*>(\d)/g, '$1 &gt;$2');

    // Pattern 2: Fix <NUMBER where there's content before the <
    // Match strings like: "usually <30 degrees" or "should be <60°C"
    content = content.replace(/([a-zA-Z\)])\s*<(\d)/g, '$1 &lt;$2');

    // Pattern 3: Fix comparison operators between capital letters (common in electrical formulas)
    // Like "XL > XC" or "In > Iz"
    content = content.replace(/([A-Z][a-z]*[A-Z0-9]*)\s+>\s+([A-Z][a-z]*[A-Z0-9]*)/g, '$1 &gt; $2');
    content = content.replace(/([A-Z][a-z]*[A-Z0-9]*)\s+<\s+([A-Z][a-z]*[A-Z0-9]*)/g, '$1 &lt; $2');

    // Pattern 4: Fix specific patterns we found
    // '>200 M' or '>999 M'
    content = content.replace(/(['"]\s*)>(\d+\s*[MΩm])/g, '$1&gt;$2');

    // Prevent double-escaping
    content = content.replace(/&amp;gt;/g, '&gt;');
    content = content.replace(/&amp;lt;/g, '&lt;');

    // Safety check: if we accidentally broke JSX syntax, don't save
    const hasBrokenJSX = content.match(/"&gt;[^&]/)||content.match(/"&lt;[^&]/);
    if (hasBrokenJSX) {
        console.log(`⚠ Skipped (would break JSX): ${path.basename(filePath)}`);
        return;
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Fixed: ${path.basename(filePath)}`);
        fixedCount++;
    }
});

console.log(`\nDone! Fixed ${fixedCount} out of ${files.length} files.`);
