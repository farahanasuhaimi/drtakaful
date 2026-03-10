# -*- coding: utf-8 -*-
"""
Inject Open Graph + Twitter Card meta tags into all Dr. Takaful blog post HTML files.
Run: python inject_og_tags.py
"""

import os
import re

BASE_URL = "https://drtakaful.com"
SITE_DIR = os.path.dirname(os.path.abspath(__file__))

# Map: html_filename -> og_image_filename (in images/og/)
# Files that share an image are mapped explicitly.
FILES = {
    "panduan-lengkap-hibah-takaful.html": "panduan-lengkap-hibah-takaful.png",
    "perancangan-hibah-2026.html": "perancangan-hibah-2026.png",
    "harta-beku-dan-hibah-takaful.html": "harta-beku-dan-hibah-takaful.png",
    "hibah-untuk-bisnes.html": "hibah-untuk-bisnes.png",
    "hibah-untuk-ibu-bapa.html": "hibah-untuk-ibu-bapa.png",
    "bolehkah-claim-hibah-jika-lumpuh.html": "bolehkah-claim-hibah-jika-lumpuh.png",
    "hibah-aia-sejuta-makna-vs-legasi-beyond.html": "hibah-aia-sejuta-makna-vs-legasi-beyond.png",
    "hibah-sejuta-makna-mampu-milik.html": "hibah-sejuta-makna-mampu-milik.png",
    "kalkulator-hibah.html": "kalkulator-hibah.png",
    "kalkulator-hibah-takaful.html": "kalkulator-hibah-takaful.png",
    "kalkulator-belanjawanku.html": "kalkulator-belanjawanku.png",
    "panduan-lengkap-medical-card-2026.html": "panduan-lengkap-medical-card-2026.png",
    "panduan-lengkap-medical-card-takaful.html": "panduan-lengkap-medical-card-takaful.png",
    "beza-medical-card-mediflex-vs-idaman.html": "beza-medical-card-mediflex-vs-idaman.png",
    "tempoh-menunggu-medical-card.html": "tempoh-menunggu-medical-card.png",
    "perkeso-vs-takaful-medical-card.html": "perkeso-vs-takaful-medical-card.png",
    "company-policy-vs-personal-takaful.html": "company-policy-vs-personal-takaful.png",
    "kes-sebenar-medical-card.html": "kes-sebenar-medical-card.png",
    "panduan-lengkap-penyakit-kritikal-takaful.html": "panduan-lengkap-penyakit-kritikal-takaful.png",
    "medical-card-atau-ci-dulu.html": "medical-card-atau-ci-dulu.png",
    "beza-medical-card-vs-pelan-penyakit-kritikal.html": "beza-medical-card-vs-pelan-penyakit-kritikal.png",
    "penyakit-kritikal-dan-humk.html": "penyakit-kritikal-dan-humk.png",
    "pelankritikal.html": "pelankritikal.png",
    "kos-rawatan-vs-gaji.html": "kos-rawatan-vs-gaji.png",
    "socso-vs-takaful-penyakit-kritikal.html": "socso-vs-takaful-penyakit-kritikal.png",
    "kenapa-perlu-rancang-kewangan-awal.html": "kenapa-perlu-rancang-kewangan-awal.png",
    "perlindungan-pertama-untuk-orang-muda.html": "perlindungan-pertama-untuk-orang-muda.png",
    "simpanan-vs-takaful.html": "simpanan-vs-takaful.png",
    "simpananvstakaful.html": "simpananvstakaful.png",
    "formula-10-peratus-pendapatan-takaful.html": "formula-10-peratus-pendapatan-takaful.png",
    "sepuluhpercentincome.html": "sepuluhpercentincome.png",
    "kenapa-pilih-aia-takaful.html": "kenapa-pilih-aia-takaful.png",
    "panduan-lengkap-mltt-mrtt.html": "panduan-lengkap-mltt-mrtt.png",
    "panduan-personal-accident.html": "panduan-personal-accident.png",
    "bila-perlu-mula-takaful-anak.html": "bila-perlu-mula-takaful-anak.png",
    "takaful-umur-50-tahun.html": "takaful-umur-50-tahun.png",
    "pelaburan-aia-enrich-rezeki.html": "pelaburan-aia-enrich-rezeki.png",
    "analisis-keperluan.html": "analisis-keperluan.png",
    "borang-permohonan.html": "borang-permohonan.png",
    "konsultasi-percuma.html": "konsultasi-percuma.png",
    "borang-fact-finding-medical-card.html": "borang-fact-finding-medical-card.png",
}


def extract_title(html):
    m = re.search(r'<title[^>]*>(.*?)</title>', html, re.IGNORECASE | re.DOTALL)
    if m:
        return m.group(1).strip()
    return "Dr. Takaful"


def extract_description(html):
    m = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\']',
                  html, re.IGNORECASE | re.DOTALL)
    if m:
        return m.group(1).strip()
    # Try alternate attribute order
    m = re.search(r'<meta[^>]+content=["\'](.*?)["\'][^>]+name=["\']description["\']',
                  html, re.IGNORECASE | re.DOTALL)
    if m:
        return m.group(1).strip()
    return ""


def make_og_block(title, description, image_url, page_url):
    desc_escaped = description.replace('"', '&quot;')
    title_escaped = title.replace('"', '&quot;')
    return f"""
  <!-- Open Graph -->
  <meta property="og:title" content="{title_escaped}">
  <meta property="og:description" content="{desc_escaped}">
  <meta property="og:image" content="{image_url}">
  <meta property="og:url" content="{page_url}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Dr. Takaful">
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{title_escaped}">
  <meta name="twitter:description" content="{desc_escaped}">
  <meta name="twitter:image" content="{image_url}">"""


def inject_og(html_file, og_image_file):
    path = os.path.join(SITE_DIR, html_file)
    if not os.path.exists(path):
        print(f"  SKIP (not found): {html_file}")
        return False

    with open(path, "r", encoding="utf-8", errors="replace") as f:
        html = f.read()

    # Skip if already has OG tags
    if 'property="og:image"' in html or "property='og:image'" in html:
        print(f"  SKIP (already has og:image): {html_file}")
        return False

    title = extract_title(html)
    description = extract_description(html)
    image_url = f"{BASE_URL}/images/og/{og_image_file}"
    page_url = f"{BASE_URL}/{html_file}"

    og_block = make_og_block(title, description, image_url, page_url)

    # Insert before </head>
    if "</head>" in html:
        html = html.replace("</head>", og_block + "\n</head>", 1)
    else:
        print(f"  WARN: no </head> found in {html_file}")
        return False

    with open(path, "w", encoding="utf-8") as f:
        f.write(html)

    print(f"  OK  {html_file}")
    return True


if __name__ == "__main__":
    print(f"Injecting OG meta tags into {len(FILES)} HTML files...\n")
    ok = 0
    for html_file, og_image in FILES.items():
        if inject_og(html_file, og_image):
            ok += 1
    print(f"\nDone! {ok}/{len(FILES)} files updated.")
