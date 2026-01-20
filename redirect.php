<?php
/**
 * Short URL Redirect Handler
 * 
 * Handles redirection from short URLs to full blog post URLs
 * Example: /go/hibah -> /panduan-lengkap-hibah-takaful.html
 */

// Load URL mappings
$urlMap = require __DIR__ . '/url-map.php';

// Get short code from URL parameter
$shortCode = $_GET['code'] ?? '';

// Clean the short code (remove any extra slashes or special characters)
$shortCode = trim($shortCode, '/');
$shortCode = strtolower($shortCode);

// Check if short code exists in mapping
if (!empty($shortCode) && isset($urlMap[$shortCode])) {
    $targetUrl = '/' . $urlMap[$shortCode];
    
    // Preserve query parameters if any
    $queryString = $_SERVER['QUERY_STRING'] ?? '';
    // Remove the 'code' parameter from query string
    parse_str($queryString, $params);
    unset($params['code']);
    
    if (!empty($params)) {
        $targetUrl .= '?' . http_build_query($params);
    }
    
    // Perform 301 permanent redirect
    header('Location: ' . $targetUrl, true, 301);
    exit;
}

// If short code not found, show 404
header('HTTP/1.0 404 Not Found');
?>
<!DOCTYPE html>
<html lang="ms">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Halaman Tidak Dijumpai | Dr. Takaful</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="icon" href="/favicon.png" type="image/x-icon">
</head>
<body class="bg-gray-50 text-gray-800 antialiased">
    <div class="min-h-screen flex items-center justify-center px-6">
        <div class="max-w-md w-full text-center">
            <div class="mb-8">
                <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Halaman Tidak Dijumpai</h2>
                <p class="text-gray-500">
                    Maaf, pautan yang anda cari tidak wujud atau telah dipadam.
                </p>
            </div>
            
            <div class="space-y-4">
                <a href="/" 
                   class="block w-full bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-rose-600 transition-all">
                    Kembali ke Laman Utama
                </a>
                <a href="/#blog" 
                   class="block w-full bg-white text-gray-900 border border-gray-200 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-all">
                    Lihat Semua Artikel
                </a>
            </div>
            
            <div class="mt-8 text-sm text-gray-400">
                <p>Kod Pautan: <code class="bg-gray-100 px-2 py-1 rounded text-gray-600"><?php echo htmlspecialchars($shortCode); ?></code></p>
            </div>
        </div>
    </div>
</body>
</html>
