# PowerShell script to fix JSX escaping issues in apprentice-courses files
# Fixes unescaped > and < characters in JSX text content ONLY
# Does NOT modify JSX tags, attributes, or code

$files = Get-ChildItem -Path "src/pages/apprentice-courses" -Filter "*.tsx" -Recurse
$fixedCount = 0

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)"

    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content

    # SAFE PATTERNS - only match text inside string literals or between tags

    # Pattern 1: Fix >NUMBER patterns in strings (e.g., ">200mA", ">999 MΩ")
    # Only in quoted strings to be safe
    $content = $content -replace '": "([^"]*?)>(\d)', '": "$1&gt;$2'
    $content = $content -replace '(answer|explanation|method|whenRequired|purpose|description): "([^"]*?)>(\d)', '$1: "$2&gt;$3'

    # Pattern 2: Fix <NUMBER patterns in strings (e.g., "<60°C", "<30 degrees")
    $content = $content -replace '": "([^"]*?)<(\d)', '": "$1&lt;$2'
    $content = $content -replace '(answer|explanation|method|whenRequired|purpose|description): "([^"]*?)<(\d)', '$1: "$2&lt;$3'

    # Pattern 3: Fix comparison operators in strings (e.g., "XL > XC", "In > Iz")
    # But be very careful not to match JSX
    $content = $content -replace '(: ".*?)([A-Za-z0-9_]+)\s+>\s+([A-Za-z0-9_]+)(.*?")', '$1$2 &gt; $3$4'
    $content = $content -replace '(: ".*?)([A-Za-z0-9_]+)\s+<\s+([A-Za-z0-9_]+)(.*?")', '$1$2 &lt; $3$4'

    # Pattern 4: Fix multiple > in explanatory text within strings
    # Match patterns like ") > Why? Overcurrent > Why?"
    $content = $content -replace '(\w|\))\s+>\s+(Why\?|What\?|How\?|When\?|Where\?)', '$1 &gt; $2'

    # Pattern 5: Fix ≤ and ≥ symbols followed by numbers that might need escaping
    # These are actually fine in JSX, but let's be consistent
    # Actually, leave these as they are special Unicode characters

    # Prevent double-escaping
    $content = $content -replace '&amp;gt;', '&gt;'
    $content = $content -replace '&amp;lt;', '&lt;'

    # Only write if content changed
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "  Fixed JSX escaping issues" -ForegroundColor Green
        $fixedCount++
    } else {
        Write-Host "  No changes needed" -ForegroundColor Gray
    }
}

$totalCount = $files.Count
Write-Host ""
Write-Host "Done! Processed $totalCount files, fixed $fixedCount files." -ForegroundColor Cyan
