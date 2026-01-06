$files = Get-ChildItem -Path "C:\Users\andre\Projects\Elec-Mate2.0\src\pages\apprentice-courses" -Filter "Level3*.tsx"
$count = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # Apply all replacements
    $content = $content -replace 'bg-background', 'bg-[#1a1a1a]'
    $content = $content -replace 'bg-card/50', 'bg-transparent'
    $content = $content -replace 'bg-card', 'bg-transparent'
    $content = $content -replace 'text-muted-foreground', 'text-white/70'
    $content = $content -replace 'text-foreground', 'text-white'
    $content = $content -replace 'yellow-400', 'elec-yellow'
    $content = $content -replace 'yellow-500', 'elec-yellow'
    $content = $content -replace 'border-border/20', 'border-white/10'
    $content = $content -replace 'border-border', 'border-white/10'

    # Write back to file
    Set-Content -Path $file.FullName -Value $content -NoNewline
    $count++
    Write-Output "Updated: $($file.Name)"
}

Write-Output "Total files updated: $count"
