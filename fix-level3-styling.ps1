$dir = "C:\Users\andre\Projects\Elec-Mate2.0\src\pages\apprentice-courses"
$files = Get-ChildItem -Path $dir -Filter "Level3Module*.tsx" | Where-Object { $_.Name -notlike "*_*" }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # Fix padding: px-6 py-12 -> px-4 sm:px-6 py-12
    $newContent = $content -replace 'max-w-7xl mx-auto px-6 py-12', 'max-w-7xl mx-auto px-4 sm:px-6 py-12'

    # Fix h1 classes: text-2xl md:text-xl sm:text-2xl md:text-3xl -> text-2xl sm:text-3xl md:text-4xl
    $newContent = $newContent -replace 'text-2xl md:text-xl sm:text-2xl md:text-3xl', 'text-2xl sm:text-3xl md:text-4xl'

    if ($content -ne $newContent) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Output "Fixed: $($file.Name)"
    }
}

Write-Output "Done!"
