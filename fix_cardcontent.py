import os
import re

def fix_cardcontent_tags(directory):
    count = 0
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Fix </div></Card> to </CardContent></Card>
                new_content = re.sub(r'</div>\s*</Card>', '</CardContent></Card>', content)

                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Fixed: {filepath}")
                    count += 1

    return count

# Fix upskilling pages
upskilling_count = fix_cardcontent_tags('src/pages/upskilling')
print(f"\nFixed {upskilling_count} files in upskilling")

# Fix apprentice-courses pages
apprentice_count = fix_cardcontent_tags('src/pages/apprentice-courses')
print(f"Fixed {apprentice_count} files in apprentice-courses")

# Fix any other pages
pages_count = fix_cardcontent_tags('src/pages')
print(f"Fixed {pages_count} files in pages total")
