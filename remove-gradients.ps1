# Enhanced Blog Color Standardization Script
# This script removes gradients and standardizes all colors

$files = Get-ChildItem -Path $PSScriptRoot -Filter "*.html" | Where-Object { $_.Name -notlike "index.html" -and $_.Name -notlike "blog-section.html" -and $_.Name -notlike "new-section.html" -and $_.Name -notlike "borang-*.html" -and $_.Name -notlike "analisis-*.html" -and $_.Name -notlike "konsultasi-*.html" -and $_.Name -notlike "kalkulator-*.html" }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Replace all gradient backgrounds with solid colors
    $content = $content -replace 'bg-gradient-to-br from-rose-600 to-rose-700', 'bg-rose-600'
    $content = $content -replace 'bg-gradient-to-r from-rose-600 to-rose-700', 'bg-rose-600'
    $content = $content -replace 'bg-gradient-to-br from-rose-50 to-white', 'bg-white'
    $content = $content -replace 'bg-gradient-to-br from-rose-50 to-rose-100', 'bg-rose-50'
    $content = $content -replace 'bg-gradient-to-br from-rose-100 to-rose-50', 'bg-rose-50'
    $content = $content -replace 'bg-gradient-to-br from-rose-50 to-blue-50', 'bg-gray-50'
    $content = $content -replace 'bg-gradient-to-br from-gray-50 to-white', 'bg-white'
    
    # Replace all blue/purple/green/amber gradients with gray-900 or white
    $content = $content -replace 'bg-gradient-to-r from-blue-500 to-indigo-600', 'bg-gray-900'
    $content = $content -replace 'bg-gradient-to-r from-purple-500 to-pink-600', 'bg-gray-900'
    $content = $content -replace 'bg-gradient-to-r from-green-500 to-teal-600', 'bg-gray-900'
    $content = $content -replace 'bg-gradient-to-r from-amber-500 to-orange-600', 'bg-gray-900'
    $content = $content -replace 'bg-gradient-to-r from-red-500 to-rose-600', 'bg-rose-600'
    $content = $content -replace 'bg-gradient-to-r from-indigo-500 to-purple-600', 'bg-gray-900'
    $content = $content -replace 'bg-gradient-to-r from-teal-500 to-green-600', 'bg-gray-900'
    $content = $content -replace 'bg-gradient-to-r from-rose-500 to-pink-600', 'bg-rose-600'
    
    # Replace colored borders with standard ones
    $content = $content -replace 'border-2 border-rose-200', 'border border-gray-100'
    $content = $content -replace 'border-2 border-rose-300', 'border border-gray-100'
    $content = $content -replace 'border-2 border-blue-200', 'border border-gray-100'
    $content = $content -replace 'border-2 border-purple-200', 'border border-gray-100'
    $content = $content -replace 'border-2 border-amber-300', 'border border-gray-100'
    $content = $content -replace 'border-2 border-gray-200', 'border border-gray-100'
    
    # Replace bg-rose-900 with bg-gray-900
    $content = $content -replace 'hover:bg-rose-900', 'hover:bg-rose-600'
    
    # Replace any remaining blue/purple/amber backgrounds
    $content = $content -replace 'from-blue-50 to-white', 'bg-white'
    $content = $content -replace 'from-purple-50 to-white', 'bg-white'
    $content = $content -replace 'from-amber-50 to-white', 'bg-white'
    $content = $content -replace 'bg-gradient-to-br from-blue-50 to-white', 'bg-white'
    $content = $content -replace 'bg-gradient-to-br from-purple-50 to-white', 'bg-white'
    $content = $content -replace 'bg-gradient-to-br from-amber-50 to-white', 'bg-white'
    
    Set-Content $file.FullName $content -NoNewline
    Write-Host "Updated: $($file.Name)" -ForegroundColor Green
}

Write-Host "`nGradient removal and color standardization complete!" -ForegroundColor Cyan
