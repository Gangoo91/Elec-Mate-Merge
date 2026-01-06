const fs = require('fs');
const path = require('path');

function fixReverseCardContentTags(directory) {
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

                // Check if file has </CardContent></Card> but NOT matching opening <CardContent>
                // Count opening <CardContent tags
                const openingTags = (content.match(/<CardContent[\s>]/g) || []).length;
                // Count closing </CardContent> tags
                const closingTags = (content.match(/<\/CardContent>/g) || []).length;

                // If more closing than opening, we have a problem
                if (closingTags > openingTags) {
                    const diff = closingTags - openingTags;
                    // Replace the excess </CardContent></Card> with </div></Card>
                    let replaced = 0;
                    const newContent = content.replace(/<\/CardContent><\/Card>/g, (match) => {
                        if (replaced < diff) {
                            replaced++;
                            return '</div>\n    </Card>';
                        }
                        return match;
                    });

                    if (newContent !== content) {
                        fs.writeFileSync(fullPath, newContent, 'utf8');
                        console.log(`Fixed: ${fullPath} (${diff} extra closing tags)`);
                        count++;
                    }
                }
            }
        }
    }

    processDirectory(directory);
    return count;
}

// Fix components
const componentsCount = fixReverseCardContentTags('src/components');
console.log(`\nFixed ${componentsCount} files in components`);
