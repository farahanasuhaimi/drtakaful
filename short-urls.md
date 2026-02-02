# Short URL Management Guide

## Overview

The short URL system allows you to share blog posts using clean, memorable URLs like `drtakaful.com/go/hibah` instead of long filenames.

## How It Works

1. **URL Format**: `drtakaful.com/go/[short-code]`
2. **Redirect**: `.htaccess` rewrites the URL to `redirect.php?code=[short-code]`
3. **Mapping**: `redirect.php` looks up the short code in `url-map.php`
4. **Result**: User is redirected to the full blog post URL with a 301 redirect

## Adding New Short URLs

### Step 1: Choose a Short Code

Good short codes are:
- **Memorable**: Easy to type and remember
- **Descriptive**: Related to the content
- **Short**: 2-15 characters
- **Lowercase**: Use hyphens for multiple words

Examples:
- `hibah` ✓
- `mc-ci` ✓
- `gaji` ✓
- `panduan-lengkap-hibah-takaful` ✗ (too long)

### Step 2: Add to url-map.php

Open `url-map.php` and add your mapping:

```php
return [
    // ... existing mappings ...
    
    'your-code' => 'your-blog-post.html',
];
```

### Step 3: Test Locally

```bash
# Start local PHP server
php -S localhost:8000

# Visit in browser
http://localhost:8000/go/your-code
```

## Current Short URLs

### Hibah & Legacy
- `/go/hibah` → Panduan Lengkap Hibah Takaful
- `/go/hibah-2026` → Perancangan Hibah 2026
- `/go/hibah-beku` → Harta Beku dan Hibah
- `/go/hibah-bisnes` → Hibah Untuk Bisnes
- `/go/hibah-ibu` → Hibah Untuk Ibu Bapa
- `/go/hibah-lumpuh` → Claim Hibah Jika Lumpuh
- `/go/hibah-sejuta` → Sejuta Makna vs Legasi Beyond
- `/go/kalkulator` → Kalkulator Hibah
- `/go/kalkulator-hibah` → Kalkulator Hibah Takaful

### Medical Card
- `/go/mc` → Panduan Lengkap Medical Card (2026)
- `/go/mc-2026` → Panduan Lengkap Medical Card 2026
- `/go/mc-2025` → Panduan Lengkap Medical Card 2025
- `/go/mediflex` → MediFlex vs Idaman
- `/go/mc-waiting` → Tempoh Menunggu Medical Card
- `/go/perkeso-mc` → PERKESO vs Medical Card
- `/go/company-mc` → Company Policy vs Personal

### Penyakit Kritikal (CI)
- `/go/ci` → Panduan Lengkap CI
- `/go/mc-ci` → Medical Card atau CI Dulu
- `/go/mc-vs-ci` → Beza Medical Card vs CI
- `/go/ci-tpd` → CI vs Lumpuh (TPD)
- `/go/gaji` → Pelan Penggantian Gaji
- `/go/kos-rawatan` → Kos Rawatan vs Gaji
- `/go/socso-ci` → SOCSO vs Takaful CI

### Asas Takaful
- `/go/mula-awal` → Kenapa Perlu Rancang Awal
- `/go/fresh-grad` → Perlindungan Untuk Orang Muda
- `/go/simpanan` → Simpanan vs Takaful
- `/go/formula-10` → Formula 10% Income
- `/go/kenapa-aia` → Kenapa Pilih AIA

### Pinjaman Perumahan
- `/go/mltt` → Panduan MLTT/MRTT
- `/go/mrtt` → Panduan MLTT/MRTT

### Lain-lain
- `/go/pa` → Panduan Personal Accident
- `/go/anak` → Takaful Anak
- `/go/umur-50` → Takaful Umur 50+
- `/go/pelaburan` → Pelaburan AIA Enrich Rezeki
- `/go/analisis` → Analisis Keperluan
- `/go/borang` → Borang Permohonan
- `/go/konsultasi` → Konsultasi Percuma

## Sharing on WhatsApp

### Manual Sharing
Simply copy the short URL and paste in WhatsApp:
```
https://drtakaful.com/go/hibah
```

### Pre-filled WhatsApp Message
Create a WhatsApp link with pre-filled text:
```
https://wa.me/?text=Baca%20artikel%20ini:%20https://drtakaful.com/go/hibah
```

## Troubleshooting

### Short URL Not Working

1. **Check .htaccess**: Ensure `RewriteEngine On` is enabled
2. **Check url-map.php**: Verify the short code exists
3. **Check server**: Ensure mod_rewrite is enabled (Apache)
4. **Test redirect.php directly**: Visit `redirect.php?code=hibah`

### 404 Error

- The short code doesn't exist in `url-map.php`
- Check spelling and case (all lowercase)

### Redirect Loop

- Check that the target URL in `url-map.php` is correct
- Ensure no circular redirects

## Best Practices

1. **Keep codes short**: 2-10 characters ideal
2. **Use hyphens**: For multi-word codes (e.g., `mc-ci`)
3. **Be consistent**: Use similar patterns for related content
4. **Document changes**: Update this file when adding new codes
5. **Test before sharing**: Always test new short URLs locally first

## Analytics Tracking

Short URLs are tracked by Google Analytics automatically. The redirect preserves:
- Referrer information
- UTM parameters (if added to short URL)
- User session data

To add UTM parameters to a short URL:
```
https://drtakaful.com/go/hibah?utm_source=whatsapp&utm_medium=social
```
