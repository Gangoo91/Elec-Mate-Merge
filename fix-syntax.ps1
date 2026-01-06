$path = "C:\Users\andre\Projects\Elec-Mate2.0\src\pages\upskilling"
$count = 0
Get-ChildItem -Path $path -Filter "*.tsx" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    # Pattern: }]\n\nexport default -> };\n\nexport default
    if ($content -match '  \}\r?\n\];\r?\n\r?\nexport default') {
        $replacement = "};" + [Environment]::NewLine + [Environment]::NewLine + "export default"
        $newContent = $content -replace '  \}\r?\n\];\r?\n\r?\nexport default', $replacement
        Set-Content -Path $_.FullName -Value $newContent -NoNewline
        Write-Output "Fixed: $($_.Name)"
        $count++
    }
}
Write-Output "Total fixed: $count files"
