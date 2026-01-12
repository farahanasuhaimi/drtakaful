# Blog Color Standardization Script
# This script standardizes colors across all blog HTML files

$files = @(
    "medical-card-atau-ci-dulu.html",
    "formula-10-peratus-pendapatan-takaful.html",
    "company-policy-vs-personal-takaful.html",
    "beza-medical-card-mediflex-vs-idaman.html",
    "bolehkah-claim-hibah-jika-lumpuh.html",
    "harta-beku-dan-hibah-takaful.html",
    "hibah-aia-sejuta-makna-vs-legasi-beyond.html",
    "hibah-untuk-bisnes.html",
    "hibah-untuk-ibu-bapa.html",
    "kalkulator-hibah-takaful.html",
    "kenapa-perlu-rancang-kewangan-awal.html",
    "kenapa-pilih-aia-takaful.html",
    "kos-rawatan-vs-gaji.html",
    "panduan-lengkap-medical-card-takaful.html",
    "panduan-lengkap-mltt-mrtt.html",
    "panduan-lengkap-penyakit-kritikal-takaful.html",
    "panduan-personal-accident.html",
    "pelaburan-aia-enrich-rezeki.html",
    "penyakit-kritikal-dan-humk.html",
    "perkeso-vs-takaful-medical-card.html",
    "perlindungan-pertama-untuk-orang-muda.html",
    "sepuluhpercentincome.html",
    "socso-vs-takaful-penyakit-kritikal.html",
    "takaful-umur-50-tahun.html",
    "tempoh-menunggu-medical-card.html"
)

$replacements = @{
    # Blue to Gray/Rose replacements
    "bg-blue-50" = "bg-gray-50"
    "bg-blue-100" = "bg-gray-100"
    "text-blue-600" = "text-gray-600"
    "text-blue-700" = "text-gray-700"
    "border-blue-100" = "border-gray-100"
    "border-blue-50" = "border-gray-50"
    
    # Red to Rose replacements
    "bg-red-50" = "bg-rose-50"
    "bg-red-100" = "bg-rose-50"
    "border-red-50" = "border-gray-100"
    "border-red-100" = "border-gray-100"
    "text-red-600" = "text-rose-600"
}

foreach ($file in $files) {
    $filePath = Join-Path $PSScriptRoot $file
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        
        foreach ($key in $replacements.Keys) {
            $content = $content -replace $key, $replacements[$key]
        }
        
        Set-Content $filePath $content -NoNewline
        Write-Host "Updated: $file" -ForegroundColor Green
    } else {
        Write-Host "File not found: $file" -ForegroundColor Yellow
    }
}

Write-Host "`nColor standardization complete!" -ForegroundColor Cyan
