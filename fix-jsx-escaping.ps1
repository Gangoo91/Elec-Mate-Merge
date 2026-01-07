# PowerShell script to fix JSX escaping issues in apprentice-courses files
# Fixes unescaped > and < characters in JSX text content

$files = Get-ChildItem -Path "src/pages/apprentice-courses" -Filter "*.tsx" -Recurse

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)"

    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content

    # Fix patterns with > followed by numbers or letters in text content
    # Pattern 1: >200mA, >999, >100, etc. (> immediately followed by number)
    $content = $content -replace '([^-=]\s+|^|"|\()>(\d)', '$1&gt;$2'

    # Pattern 2: > in text like "symptom) > Why?" - space before and after
    $content = $content -replace '(\w|\))\s+>\s+([A-Z])', '$1 &gt; $2'

    # Pattern 3: Comparison expressions in text like "XL > XC", "In > Iz"
    $content = $content -replace '([A-Za-z][A-Za-z0-9]*)\s+>\s+([A-Za-z][A-Za-z0-9]*)', '$1 &gt; $2'

    # Pattern 4: < followed by numbers like <60°C, <30, <50mm
    $content = $content -replace '([^-=]\s+|^|"|\()<(\d)', '$1&lt;$2'

    # Pattern 5: < in text with spaces like "XL < XC"
    $content = $content -replace '([A-Za-z][A-Za-z0-9]*)\s+<\s+([A-Za-z][A-Za-z0-9]*)', '$1 &lt; $2'

    # Pattern 6: Fix instances already escaped to avoid double-escaping
    $content = $content -replace '&amp;gt;', '&gt;'
    $content = $content -replace '&amp;lt;', '&lt;'

    # Only write if content changed
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "  Fixed JSX escaping issues" -ForegroundColor Green
    } else {
        Write-Host "  No changes needed" -ForegroundColor Gray
    }
}

$count = $files.Count
Write-Host ""
Write-Host "Done! Processed $count files." -ForegroundColor Cyan
