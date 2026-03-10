# -*- coding: utf-8 -*-
"""
Replace stale/generic og:image URLs with correct per-post image URLs.
Run: python fix_og_image_urls.py
"""

import os
import re

BASE_URL = "https://drtakaful.com"
SITE_DIR = os.path.dirname(os.path.abspath(__file__))

# All HTML files that need correct og:image pointing to images/og/<htmlname>.png
FILES = [
    "beza-medical-card-mediflex-vs-idaman.html",
    "beza-medical-card-vs-pelan-penyakit-kritikal.html",
    "bolehkah-claim-hibah-jika-lumpuh.html",
    "harta-beku-dan-hibah-takaful.html",
    "hibah-aia-sejuta-makna-vs-legasi-beyond.html",
    "hibah-sejuta-makna-mampu-milik.html",
    "hibah-untuk-bisnes.html",
    "hibah-untuk-ibu-bapa.html",
    "kalkulator-hibah-takaful.html",
    "kenapa-perlu-rancang-kewangan-awal.html",
    "kenapa-pilih-aia-takaful.html",
    "kes-sebenar-medical-card.html",
    "panduan-lengkap-medical-card-2026.html",
    "panduan-lengkap-medical-card-takaful.html",
    "panduan-lengkap-mltt-mrtt.html",
    "panduan-lengkap-penyakit-kritikal-takaful.html",
    "panduan-personal-accident.html",
    "pelaburan-aia-enrich-rezeki.html",
    "pelankritikal.html",
    "penyakit-kritikal-dan-humk.html",
    "perancangan-hibah-2026.html",
    "perkeso-vs-takaful-medical-card.html",
    "perlindungan-pertama-untuk-orang-muda.html",
    "simpanan-vs-takaful.html",
    "socso-vs-takaful-penyakit-kritikal.html",
    "takaful-umur-50-tahun.html",
    "tempoh-menunggu-medical-card.html",
]


def fix_og_image(html_file):
    base = os.path.splitext(html_file)[0]  # e.g. panduan-lengkap-hibah-takaful
    new_image_url = f"{BASE_URL}/images/og/{base}.png"

    path = os.path.join(SITE_DIR, html_file)
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        html = f.read()

    # Replace any og:image content= value (handles both attribute orders)
    # Pattern 1: property="og:image" content="..."
    new_html, n1 = re.subn(
        r'(property="og:image"\s+content=")([^"]+)(")',
        lambda m: m.group(1) + new_image_url + m.group(3),
        html
    )
    # Pattern 2: content="..." property="og:image"
    new_html, n2 = re.subn(
        r'(content=")([^"]+)("\s+property="og:image")',
        lambda m: m.group(1) + new_image_url + m.group(3),
        new_html
    )
    # Also fix twitter:image if present
    new_html, n3 = re.subn(
        r'(name="twitter:image"\s+content=")([^"]+)(")',
        lambda m: m.group(1) + new_image_url + m.group(3),
        new_html
    )
    new_html, n4 = re.subn(
        r'(content=")([^"]+)("\s+name="twitter:image")',
        lambda m: m.group(1) + new_image_url + m.group(3),
        new_html
    )

    total = n1 + n2 + n3 + n4
    if total > 0:
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_html)
        print(f"  FIXED ({total} replacements): {html_file}")
        print(f"         -> {new_image_url}")
    else:
        print(f"  WARN: no og:image found in {html_file}")


if __name__ == "__main__":
    print(f"Fixing og:image URLs in {len(FILES)} files...\n")
    for html_file in FILES:
        fix_og_image(html_file)
    print("\nDone!")
