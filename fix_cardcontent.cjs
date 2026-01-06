const fs = require('fs');
const path = require('path');

function fixCardContentTags(directory) {
    let count = 0;

    function processDirectory(dir) {
        const items = fs.readdirSync(dir);

        for (const item of items) {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                processDirectory(fullPath);
            } else if (item.endsWith('.tsx')) {
                let content = fs.readFileSync(fullPath, 'utf8');
                const newContent = content.replace(/<\/div>\s*<\/Card>/g, '</CardContent></Card>');

                if (newContent !== content) {
                    fs.writeFileSync(fullPath, newContent, 'utf8');
                    console.log('Fixed:', fullPath);
                    count++;
                }
            }
        }
    }

    processDirectory(directory);
    return count;
}

// Fix upskilling pages
const upskillingCount = fixCardContentTags('src/pages/upskilling');
console.log(`\nFixed ${upskillingCount} files in upskilling`);

// Fix apprentice-courses pages
const apprenticeCount = fixCardContentTags('src/pages/apprentice-courses');
console.log(`Fixed ${apprenticeCount} files in apprentice-courses`);

// Fix components
const componentsCount = fixCardContentTags('src/components');
console.log(`Fixed ${componentsCount} files in components`);
