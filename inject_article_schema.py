"""
inject_article_schema.py
Injects Article JSON-LD schema and canonical tags into all article HTML files.
Run from the drtakaful/ directory: python inject_article_schema.py

Skips: index.html, borang-*.html, analisis-keperluan.html, konsultasi-percuma.html,
       kalkulator-*.html, new-section.html, blog-section.html,
       simpananvstakaful.html, sepuluhpercentincome.html
"""

import os
import re
from datetime import date

SITE_URL = "https://drtakaful.com"
AUTHOR_ID = f"{SITE_URL}/#author"
BUSINESS_ID = f"{SITE_URL}/#business"
WEBSITE_ID = f"{SITE_URL}/#website"
TODAY = date.today().isoformat()  # e.g. 2026-04-07

SKIP_FILES = {
    "index.html",
    "borang-permohonan.html",
    "borang-fact-finding-medical-card.html",
    "analisis-keperluan.html",
    "konsultasi-percuma.html",
    "kalkulator-hibah.html",
    "kalkulator-hibah-takaful.html",
    "kalkulator-belanjawanku.html",
    "new-section.html",
    "blog-section.html",
    "simpananvstakaful.html",
    "sepuluhpercentincome.html",
}

def extract_meta(html: str, name: str) -> str:
    """Extract og: or name= meta content."""
    pattern = rf'<meta\s+(?:property|name)=["\'](?:og:)?{re.escape(name)}["\']\s+content=["\'](.*?)["\']'
    m = re.search(pattern, html, re.IGNORECASE)
    return m.group(1).strip() if m else ""

def extract_title(html: str) -> str:
    m = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE | re.DOTALL)
    if m:
        # Strip site name suffix like " | Dr. Takaful"
        title = m.group(1).strip()
        title = re.sub(r'\s*\|\s*Dr\.?\s*Takaful.*$', '', title, flags=re.IGNORECASE)
        return title.strip()
    return ""

def build_schema(filename: str, title: str, description: str, url: str, image: str) -> str:
    slug = filename.replace(".html", "")
    page_url = url or f"{SITE_URL}/{filename}"
    og_image = image or f"{SITE_URL}/images/og/{slug}.png"

    # Build readable breadcrumb name from filename
    breadcrumb_name = title or slug.replace("-", " ").title()

    schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                "@id": f"{page_url}#article",
                "headline": title,
                "description": description,
                "url": page_url,
                "image": {
                    "@type": "ImageObject",
                    "url": og_image,
                    "width": 1200,
                    "height": 630
                },
                "author": {"@id": AUTHOR_ID},
                "publisher": {"@id": BUSINESS_ID},
                "datePublished": "2026-01-23",
                "dateModified": TODAY,
                "inLanguage": "ms-MY",
                "isPartOf": {"@id": WEBSITE_ID},
                "mainEntityOfPage": {"@id": page_url}
            },
            {
                "@type": "BreadcrumbList",
                "@id": f"{page_url}#breadcrumb",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Laman Utama",
                        "item": f"{SITE_URL}/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": breadcrumb_name,
                        "item": page_url
                    }
                ]
            }
        ]
    }

    import json
    return json.dumps(schema, ensure_ascii=False, indent=2)


def inject_into_file(filepath: str, filename: str) -> bool:
    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()

    # Skip if schema already injected
    if '"@type": "Article"' in html or '"Article"' in html:
        print(f"  SKIP (already has Article schema): {filename}")
        return False

    title = extract_title(html)
    description = extract_meta(html, "description")
    url = extract_meta(html, "url")  # og:url
    image = extract_meta(html, "image")  # og:image

    if not title:
        print(f"  SKIP (no title found): {filename}")
        return False

    schema_json = build_schema(filename, title, description, url, image)
    schema_block = f'\n  <!-- Article Schema -->\n  <script type="application/ld+json">\n{schema_json}\n  </script>'

    # Inject canonical if missing
    canonical_url = url or f"{SITE_URL}/{filename}"
    has_canonical = bool(re.search(r'<link\s+rel=["\']canonical["\']', html, re.IGNORECASE))
    canonical_tag = "" if has_canonical else f'\n  <link rel="canonical" href="{canonical_url}">'

    # Insert before </head>
    if "</head>" not in html:
        print(f"  SKIP (no </head>): {filename}")
        return False

    new_html = html.replace("</head>", f"{canonical_tag}{schema_block}\n</head>", 1)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_html)

    actions = []
    if canonical_tag:
        actions.append("canonical")
    actions.append("Article schema")
    print(f"  OK ({', '.join(actions)}): {filename}")
    return True


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    html_files = [f for f in os.listdir(script_dir) if f.endswith(".html") and f not in SKIP_FILES]
    html_files.sort()

    print(f"Processing {len(html_files)} article files...\n")
    updated = 0
    for filename in html_files:
        filepath = os.path.join(script_dir, filename)
        if inject_into_file(filepath, filename):
            updated += 1

    print(f"\nDone. {updated}/{len(html_files)} files updated.")


if __name__ == "__main__":
    main()
