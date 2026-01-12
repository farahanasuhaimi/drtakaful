# Final Color Cleanup Script
# Remove all remaining non-standard colors

$files = Get-ChildItem -Path $PSScriptRoot -Filter "*.html" | Where-Object { $_.Name -notlike "index.html" -and $_.Name -notlike "blog-section.html" -and $_.Name -notlike "new-section.html" -and $_.Name -notlike "borang-*.html" -and $_.Name -notlike "analisis-*.html" -and $_.Name -notlike "konsultasi-*.html" -and $_.Name -notlike "kalkulator-*.html" }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Replace colored borders with gray
    $content = $content -replace 'border-2 border-blue-300', 'border border-gray-100'
    $content = $content -replace 'border-2 border-purple-300', 'border border-gray-100'
    $content = $content -replace 'border-2 border-green-500', 'border border-gray-100'
    $content = $content -replace 'border-l-4 border-gray-1000', 'border-l-4 border-rose-600'
    $content = $content -replace 'border-gray-1000', 'border-gray-100'
    
    # Replace colored backgrounds in tables/boxes
    $content = $content -replace 'bg-blue-600', 'bg-gray-900'
    $content = $content -replace 'bg-purple-700', 'bg-gray-900'
    $content = $content -replace 'bg-blue-800', 'bg-gray-900'
    $content = $content -replace 'bg-purple-800', 'bg-gray-900'
    $content = $content -replace 'text-blue-800', 'text-gray-900'
    $content = $content -replace 'text-purple-800', 'text-gray-900'
    $content = $content -replace 'text-purple-700', 'text-gray-900'
    $content = $content -replace 'text-blue-100', 'text-gray-100'
    $content = $content -replace 'text-purple-100', 'text-gray-100'
    $content = $content -replace 'text-indigo-100', 'text-gray-100'
    $content = $content -replace 'text-teal-100', 'text-gray-100'
    $content = $content -replace 'text-amber-100', 'text-gray-100'
    $content = $content -replace 'text-green-100', 'text-gray-100'
    
    # Replace colored text in buttons/links
    $content = $content -replace 'text-blue-600', 'text-gray-900'
    $content = $content -replace 'text-purple-600', 'text-gray-900'
    $content = $content -replace 'text-indigo-600', 'text-gray-900'
    $content = $content -replace 'text-teal-600', 'text-gray-900'
    $content = $content -replace 'text-amber-600', 'text-gray-900'
    $content = $content -replace 'text-green-600', 'text-gray-900'
    
    # Replace hover states
    $content = $content -replace 'hover:bg-blue-50', 'hover:bg-gray-50'
    $content = $content -replace 'hover:bg-purple-50', 'hover:bg-gray-50'
    $content = $content -replace 'hover:bg-indigo-50', 'hover:bg-gray-50'
    $content = $content -replace 'hover:bg-teal-50', 'hover:bg-gray-50'
    $content = $content -replace 'hover:bg-amber-50', 'hover:bg-gray-50'
    $content = $content -replace 'hover:bg-green-50', 'hover:bg-gray-50'
    
    Set-Content $file.FullName $content -NoNewline
    Write-Host "Cleaned: $($file.Name)" -ForegroundColor Green
}

Write-Host "`nFinal color cleanup complete!" -ForegroundColor Cyan
