import os, re, glob

site_dir = r'd:\Kerja\Codes\drtakaful'
issues = []
for html_file in glob.glob(os.path.join(site_dir, '*.html')):
    with open(html_file, encoding='utf-8', errors='replace') as f:
        content = f.read()
    m = re.search(r'property="og:image"\s+content="([^"]+)"', content)
    if not m:
        m = re.search(r'content="([^"]+)"\s+property="og:image"', content)
    fname = os.path.basename(html_file)
    if m:
        print(f'{fname}: {m.group(1)}')
    else:
        issues.append(fname)

if issues:
    print(f'\n--- {len(issues)} files MISSING og:image ---')
    for i in issues:
        print(f'  {i}')
else:
    print('\nAll HTML files have og:image tags.')
