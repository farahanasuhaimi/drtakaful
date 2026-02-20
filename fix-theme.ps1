# fix-theme.ps1 — Re-theme compliance fixes for blog posts

function Fix-File {
    param($path, [scriptblock]$fixes)
    $c = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    $c = & $fixes $c
    [System.IO.File]::WriteAllText($path, $c, [System.Text.Encoding]::UTF8)
    Write-Host "Done: $([System.IO.Path]::GetFileName($path))"
}

# ============================================================
# FILE 1: hibah-sejuta-makna-mampu-milik.html
# ============================================================
Fix-File "d:\Kerja\Codes\drtakaful\hibah-sejuta-makna-mampu-milik.html" {
    param($c)
    # H2 headings: rose-700 → gray-900, semibold → black
    $c = $c.Replace('class="text-2xl font-semibold text-rose-700 mt-8 mb-4"', 'class="text-2xl font-black text-gray-900 mt-8 mb-4"')
    $c = $c.Replace('class="text-2xl font-semibold text-rose-700 mt-12 mb-4"', 'class="text-2xl font-black text-gray-900 mt-12 mb-4"')
    # Sub-heading labels
    $c = $c.Replace('font-semibold text-rose-800 mb-2', 'font-semibold text-gray-900 mb-2')
    $c = $c.Replace('font-semibold text-green-800 mb-2', 'font-semibold text-gray-900 mb-2')
    $c = $c.Replace('font-semibold text-rose-700 mb-2', 'font-semibold text-gray-900 mb-2')
    # Border colors in feature cards
    $c = $c.Replace('border-l-4 border-rose-600 p-6 rounded-r-xl shadow-sm', 'border-l-4 border-gray-900 p-6 rounded-r-xl shadow-sm')
    $c = $c.Replace('bg-white rounded-xl p-6 border-l-4 border-rose-500', 'bg-white rounded-xl p-6 border-l-4 border-gray-500')
    # Phase step badges
    $c = $c.Replace('bg-rose-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm', 'bg-gray-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm')
    $c = $c.Replace('bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm', 'bg-gray-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm')
    # Phase plan container
    $c = $c.Replace('bg-gradient-to-br from-rose-50 to-white rounded-2xl p-8 my-8 border border-rose-100', 'bg-white rounded-2xl p-8 my-8 border border-gray-100')
    $c = $c.Replace('bg-white rounded-xl p-6 border-l-4 border-rose-600', 'bg-white rounded-xl p-6 border-l-4 border-gray-900')
    # Minor yellow callout (bg-yellow-50)
    $c = $c.Replace('mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4', 'mt-6 bg-gray-50 border border-gray-100 rounded-xl p-4')
    # Add external CSS after tailwind CDN (if not already present)
    if ($c -notmatch 'src/global\.css') {
        $c = $c.Replace('<script src="https://cdn.tailwindcss.com"></script>', '<script src="https://cdn.tailwindcss.com"></script>' + "`r`n" + '    <script src="src/tailwind-config.js"></script>' + "`r`n" + '    <link rel="stylesheet" href="src/global.css">')
    }
    $c
}

# ============================================================
# FILE 2: hibah-aia-sejuta-makna-vs-legasi-beyond.html
# ============================================================
Fix-File "d:\Kerja\Codes\drtakaful\hibah-aia-sejuta-makna-vs-legasi-beyond.html" {
    param($c)
    # H2 headings
    $c = $c.Replace('class="text-2xl font-semibold text-rose-700 mt-8 mb-4"', 'class="text-2xl font-black text-gray-900 mt-8 mb-4"')
    $c = $c.Replace('class="text-2xl font-semibold text-rose-700 mt-12 mb-4"', 'class="text-2xl font-black text-gray-900 mt-12 mb-4"')
    # Legasi Beyond plan card h3 + subtitle
    $c = $c.Replace('class="text-2xl font-bold text-rose-700 mb-2"', 'class="text-2xl font-bold text-gray-900 mb-2"')
    $c = $c.Replace('class="text-rose-700 font-semibold mb-4"', 'class="text-gray-900 font-semibold mb-4"')
    # Legasi Beyond card bg (rose-50 → white bordered)
    $c = $c.Replace('class="bg-rose-50 border border-gray-100 rounded-2xl p-6 text-center"', 'class="bg-white border-2 border-gray-900 rounded-2xl p-6 text-center"')
    # Table: rose-700 caruman td color
    $c = $c.Replace('class="p-4 text-center font-bold text-rose-700"', 'class="p-4 text-center font-bold text-gray-900"')
    # Sub-heading labels
    $c = $c.Replace('font-semibold text-rose-700 mb-2', 'font-semibold text-gray-900 mb-2')
    # Add external CSS after tailwind CDN
    if ($c -notmatch 'src/global\.css') {
        $c = $c.Replace('<script src="https://cdn.tailwindcss.com"></script>', '<script src="https://cdn.tailwindcss.com"></script>' + "`r`n" + '  <script src="src/tailwind-config.js"></script>' + "`r`n" + '  <link rel="stylesheet" href="src/global.css">')
    }
    $c
}

# ============================================================
# FILE 3: socso-vs-takaful-penyakit-kritikal.html
# ============================================================
Fix-File "d:\Kerja\Codes\drtakaful\socso-vs-takaful-penyakit-kritikal.html" {
    param($c)
    # H2 headings
    $c = $c.Replace('class="text-2xl font-semibold text-rose-700 mt-8 mb-4"', 'class="text-2xl font-black text-gray-900 mt-8 mb-4"')
    $c = $c.Replace('class="text-2xl font-semibold text-rose-700 mt-12 mb-4"', 'class="text-2xl font-black text-gray-900 mt-12 mb-4"')
    # Table header
    $c = $c.Replace('class="bg-rose-600 text-white"', 'class="bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest"')
    # Myth blocks: rose-50 rose-600 → white gray-900
    $c = $c.Replace('class="bg-rose-50 border-l-4 border-rose-600 p-6 rounded-r-xl"', 'class="bg-white border-l-4 border-gray-900 p-6 rounded-r-xl shadow-sm"')
    # Breadcrumb hover
    $c = $c.Replace('class="hover:text-rose-600"', 'class="hover:text-gray-900 transition-colors"')
    # Sub-labels
    $c = $c.Replace('font-semibold text-rose-700 mb-4 text-lg', 'font-semibold text-gray-900 mb-4 text-lg')
    $c = $c.Replace('font-semibold text-rose-700 mb-3 text-lg', 'font-semibold text-gray-900 mb-3 text-lg')
    $c = $c.Replace('class="text-3xl font-bold text-rose-700 mb-4"', 'class="text-3xl font-black text-gray-900 mb-4"')
    $c = $c.Replace('text-xl font-bold text-rose-700 mb-6 text-center', 'text-xl font-black text-gray-900 mb-6 text-center')
    $c = $c.Replace('text-center text-2xl font-bold text-rose-700 mb-2', 'text-center text-2xl font-bold text-gray-900 mb-2')
    $c = $c.Replace('font-semibold text-rose-700 mb-3', 'font-semibold text-gray-900 mb-3')
    $c = $c.Replace('text-rose-700 font-semibold', 'text-gray-900 font-semibold')
    # Rose-highlighted amounts in cost tables
    $c = $c.Replace('class="border-t pt-2 flex justify-between font-bold"><span>Total cost:</span><span class="text-rose-700">', 'class="border-t pt-2 flex justify-between font-bold"><span>Total cost:</span><span class="text-gray-900">')
    $c = $c.Replace('class="h4 font-bold text-rose-700 mb-4 text-center text-lg"', 'class="h4 font-bold text-gray-900 mb-4 text-center text-lg"')
    # Border-rose-500 cost card
    $c = $c.Replace('class="bg-white rounded-xl p-6 border-2 border-rose-500"', 'class="bg-white rounded-xl p-6 border-2 border-gray-900"')
    $c = $c.Replace('h4 class="font-bold text-rose-700 mb-4 text-center text-lg"', 'h4 class="font-bold text-gray-900 mb-4 text-center text-lg"')
    # bg-rose-100 → bg-gray-50
    $c = $c.Replace('class="bg-rose-100 rounded-lg p-4"', 'class="bg-gray-50 rounded-lg p-4"')
    $c = $c.Replace('class="bg-rose-50 rounded-lg p-4 mt-4"', 'class="bg-gray-50 rounded-lg p-4 mt-4"')
    $c = $c.Replace('class="text-xs text-rose-800 font-semibold mb-1"', 'class="text-xs text-gray-900 font-semibold mb-1"')
    $c = $c.Replace('font-semibold text-rose-800 mb-2', 'font-semibold text-gray-900 mb-2')
    $c = $c.Replace('class="text-rose-100 text-sm leading-relaxed"', 'class="text-gray-300 text-sm leading-relaxed"')
    # Target audience rose card
    $c = $c.Replace('class="bg-rose-50 rounded-xl p-6 border border-gray-100"', 'class="bg-white rounded-xl p-6 border border-gray-100"')
    # Rose strong text in FAQ
    $c = $c.Replace('class="text-rose-600">', 'class="text-gray-900">')
    # featured image: rose-50 → gray-900 dark
    $c = $c.Replace('class="aspect-[16/9] bg-rose-50 rounded-[2.5rem] border border-gray-100 flex items-center justify-center mb-16 overflow-hidden relative group"', 'class="aspect-[16/9] bg-gray-900 rounded-[2.5rem] border border-gray-800 flex items-center justify-center mb-16 overflow-hidden relative group shadow-2xl"')
    $c
}

# ============================================================
# FILE 4: sepuluhpercentincome.html  (Minor fixes)
# ============================================================
Fix-File "d:\Kerja\Codes\drtakaful\sepuluhpercentincome.html" {
    param($c)
    $c = $c.Replace('class="font-semibold text-rose-700 mb-3"', 'class="font-semibold text-gray-900 mb-3"')
    $c = $c.Replace('class="bg-rose-50 rounded-lg p-4"', 'class="bg-gray-50 rounded-lg p-4"')
    # Missing tailwind cdn
    if ($c -notmatch 'cdn.tailwindcss.com') {
        $c = $c.Replace('<script src="src/tailwind-config.js">', '<script src="https://cdn.tailwindcss.com"></script>' + "`r`n" + '  <script src="src/tailwind-config.js">')
    }
    $c
}

# ============================================================
# FILE 5: perkeso-vs-takaful-medical-card.html  (bg-yellow-400)
# ============================================================
Fix-File "d:\Kerja\Codes\drtakaful\perkeso-vs-takaful-medical-card.html" {
    param($c)
    $c = $c.Replace('class="bg-yellow-400', 'class="bg-gray-900 text-white')
    $c = $c.Replace('bg-yellow-400 text-gray-800', 'bg-gray-900 text-white')
    $c = $c.Replace('bg-yellow-400 text-gray-900', 'bg-gray-900 text-white')
    $c
}

# ============================================================
# FILE 6: panduan-lengkap-medical-card-2026.html  (bg-yellow-400 checklist)
# ============================================================
Fix-File "d:\Kerja\Codes\drtakaful\panduan-lengkap-medical-card-2026.html" {
    param($c)
    $c = $c.Replace('bg-yellow-400 text-gray-900', 'bg-gray-900 text-white')
    $c = $c.Replace('class="bg-yellow-400', 'class="bg-gray-900 text-white')
    # Fix text colors inside checklist block
    $c = $c.Replace('class="flex items-center gap-4 border-t border-gray-800/10 pt-4 text-rose-800"', 'class="flex items-center gap-4 border-t border-white/10 pt-4"')
    $c = $c.Replace('class="flex items-center gap-4 border-t border-gray-800/10 pt-4"', 'class="flex items-center gap-4 border-t border-white/10 pt-4"')
    $c = $c.Replace('class="flex items-center gap-4"', 'class="flex items-center gap-4"')
    $c = $c.Replace('border-gray-800/10', 'border-white/10')
    $c
}

Write-Host "All files processed."
