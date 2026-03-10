"""
Generate OG images (1200x630) for all Dr. Takaful blog posts.
Uses Pillow. Run: python generate_og_images.py
"""

import os
from PIL import Image, ImageDraw, ImageFont

# ── Config ──────────────────────────────────────────────────────────────────
OUT_DIR = os.path.join(os.path.dirname(__file__), "images", "og")
W, H = 1200, 630

# Colors
BG = "#111111"
WHITE = "#FFFFFF"
GRAY = "#888888"
LIGHT_GRAY = "#CCCCCC"
RED = "#E11D48"
RED_DARK = "#9F1239"
DARK_CARD = "#1A1A1A"

# ── Posts ────────────────────────────────────────────────────────────────────
# Format: (output_filename, category, headline, subtitle)
POSTS = [
    # HIBAH
    ("panduan-lengkap-hibah-takaful.png", "HIBAH",
     "Engineering of Legacy",
     "Kenapa RM65 Bilion Harta\nOrang Melayu Masih Beku?"),
    ("perancangan-hibah-2026.png", "HIBAH",
     "Strategi Hibah Takaful 2026",
     "Rancang Ketenangan Keluarga Anda"),
    ("harta-beku-dan-hibah-takaful.png", "HIBAH",
     "RM13 Bilion Wang Tak Dituntut",
     "Viral 2026: Harta Beku\n& Solusi Hibah Takaful"),
    ("hibah-untuk-bisnes.png", "HIBAH",
     "Hibah Untuk\nRakan Kongsi Bisnes",
     "Penyelamat Syarikat\nBila Benda Buruk Berlaku"),
    ("hibah-untuk-ibu-bapa.png", "HIBAH",
     "Hibah Untuk Ibu Bapa",
     "Hadiah Terakhir\nYang Paling Bermakna"),
    ("bolehkah-claim-hibah-jika-lumpuh.png", "HIBAH",
     "Bolehkah Claim Hibah\nJika Lumpuh?",
     "Jawapan Tepat Yang Perlu Anda Tahu"),
    ("hibah-aia-sejuta-makna-vs-legasi-beyond.png", "HIBAH",
     "Sejuta Makna\nvs Legasi Beyond",
     "Mana Sesuai Untuk Anda?"),
    ("hibah-sejuta-makna-mampu-milik.png", "HIBAH",
     "Hibah Sejuta Makna",
     "Mula Dari RM45/Bulan.\nPerlindungan RM350K+"),
    # KALKULATOR
    ("kalkulator-hibah.png", "TOOLS",
     "Smart Hibah Wizard",
     "Kira Legasi Anda Dalam 30 Saat"),
    ("kalkulator-hibah-takaful.png", "TOOLS",
     "Kira Hibah 100 Bulan",
     "Berapa Sebenarnya\nKeluarga Anda Perlukan?"),
    ("kalkulator-belanjawanku.png", "TOOLS",
     "Kalkulator Belanjawanku KWSP",
     "Kira Belanjawan\nLembah Klang Anda"),
    # MEDICAL CARD
    ("panduan-lengkap-medical-card-2026.png", "MEDICAL CARD",
     "Panduan Medical Card 2026",
     "Strategi AIA Vitality\n& Standard RM1 Juta"),
    ("panduan-lengkap-medical-card-takaful.png", "MEDICAL CARD",
     "Panduan Medical Card Takaful",
     "Semua Yang Perlu Anda Tahu\nSebelum Beli"),
    ("beza-medical-card-mediflex-vs-idaman.png", "MEDICAL CARD",
     "MediFlex vs Idaman",
     "Mana Medical Card\nYang Sesuai Untuk Anda?"),
    ("tempoh-menunggu-medical-card.png", "MEDICAL CARD",
     "Tempoh Menunggu\nMedical Card",
     "Kenapa Claim Saya Kena Reject?"),
    ("perkeso-vs-takaful-medical-card.png", "MEDICAL CARD",
     "PERKESO vs\nTakaful Medical Card",
     "Mana Satu Bayar\nBil Hospital Anda?"),
    ("company-policy-vs-personal-takaful.png", "MEDICAL CARD",
     "Polisi Syarikat\nvs Takaful Peribadi",
     "Kenapa Anda Perlukan Kedua-duanya"),
    ("kes-sebenar-medical-card.png", "MEDICAL CARD",
     "Kes Sebenar:",
     "Kenapa Medical Card\nBenar-Benar Penting"),
    # PENYAKIT KRITIKAL
    ("panduan-lengkap-penyakit-kritikal-takaful.png", "PENYAKIT KRITIKAL",
     "Panduan CI Takaful 2026",
     "Perlindungan Penyakit Kritikal:\nPanduan Lengkap"),
    ("medical-card-atau-ci-dulu.png", "PENYAKIT KRITIKAL",
     "Medical Card\nAtau CI Dulu?",
     "Mana Lebih Penting Untuk Anda?"),
    ("beza-medical-card-vs-pelan-penyakit-kritikal.png", "PENYAKIT KRITIKAL",
     "Medical Card\nvs Pelan CI",
     "Beza Yang Ramai\nOrang Salah Faham"),
    ("penyakit-kritikal-dan-humk.png", "PENYAKIT KRITIKAL",
     "Penyakit Kritikal\nvs HUMK",
     "Apa Beza & Kenapa Perlu Dua-dua?"),
    ("pelankritikal.png", "PENYAKIT KRITIKAL",
     "Pelan Penggantian Gaji",
     "Kenapa Ia Lebih Penting\nDari Medical Card?"),
    ("kos-rawatan-vs-gaji.png", "PENYAKIT KRITIKAL",
     "Kos Rawatan\nvs Gaji Hilang",
     "Mana Lebih Bahaya\nUntuk Keluarga Anda?"),
    ("socso-vs-takaful-penyakit-kritikal.png", "PENYAKIT KRITIKAL",
     "Dah Ada SOCSO,\nPerlu Lagi Takaful CI?",
     "Jawapan Yang Mengejutkan Ramai"),
    # ASAS TAKAFUL
    ("kenapa-perlu-rancang-kewangan-awal.png", "ASAS TAKAFUL",
     "Kenapa Rancang\nKewangan Awal?",
     "Keputusan Paling Penting\nDalam Hidup Anda"),
    ("perlindungan-pertama-untuk-orang-muda.png", "ASAS TAKAFUL",
     "Baru Mula Kerja?",
     "3 Perlindungan Pertama\nYang Patut Anda Ada"),
    ("simpanan-vs-takaful.png", "ASAS TAKAFUL",
     "Simpanan vs Takaful",
     "Mana Strategi Betul\nUntuk Anda?"),
    ("simpananvstakaful.png", "ASAS TAKAFUL",
     "Simpanan vs Takaful",
     "Mana Strategi Betul\nUntuk Anda?"),
    ("formula-10-peratus-pendapatan-takaful.png", "ASAS TAKAFUL",
     "Formula 10/100",
     "Seni Kejuruteraan\nKewangan Dr. Hana"),
    ("sepuluhpercentincome.png", "ASAS TAKAFUL",
     "10% Income =\n100 Bulan Tenang",
     "Formula Ringkas, Kesan Besar"),
    ("kenapa-pilih-aia-takaful.png", "ASAS TAKAFUL",
     "Kenapa Pilih AIA Takaful?",
     "6 Kelebihan Utama\nYang Perlu Anda Tahu"),
    # PINJAMAN & LAIN-LAIN
    ("panduan-lengkap-mltt-mrtt.png", "PINJAMAN",
     "Panduan MLTT / MRTT",
     "Lindungi Pinjaman Rumah Anda"),
    ("panduan-personal-accident.png", "KEMALANGAN",
     "Panduan Personal\nAccident Takaful",
     "Kenapa Perlindungan\nKemalangan Penting?"),
    ("bila-perlu-mula-takaful-anak.png", "KELUARGA",
     "Takaful Untuk Anak",
     "Perlu Mula Bila & Kenapa?"),
    ("takaful-umur-50-tahun.png", "TAKAFUL",
     "Umur 50+ Masih Boleh\nAmbil Takaful?",
     "Strategi Untuk\nGolongan Matang"),
    ("pelaburan-aia-enrich-rezeki.png", "PELABURAN",
     "Pelaburan AIA\nEnrich Rezeki",
     "Panduan A-Life Enrich Rezeki"),
    # TOOLS & FORMS
    ("analisis-keperluan.png", "TOOLS",
     "Analisis Keperluan\nTakaful Percuma",
     "Kenali Perlindungan\nYang Anda Perlukan"),
    ("borang-permohonan.png", "TOOLS",
     "Borang Permohonan\nTakaful Online",
     "Mudah, Cepat,\nTanpa Keluar Rumah"),
    ("konsultasi-percuma.png", "TOOLS",
     "Konsultasi Takaful Percuma",
     "Bincang Terus\nDengan Dr. Hana"),
    ("borang-fact-finding-medical-card.png", "TOOLS",
     "Fact Finding:\nMedical Card Takaful",
     "Bantu Kami Faham\nKeperluan Anda"),
]

# ── Font helpers ──────────────────────────────────────────────────────────────
def get_font(size, bold=False):
    """Try to load a system font, fall back to default."""
    candidates_bold = [
        "C:/Windows/Fonts/arialbd.ttf",
        "C:/Windows/Fonts/calibrib.ttf",
        "C:/Windows/Fonts/segoeuib.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
    ]
    candidates_regular = [
        "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/calibri.ttf",
        "C:/Windows/Fonts/segoeui.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    candidates = candidates_bold if bold else candidates_regular
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()


def draw_text_multiline(draw, text, x, y, font, fill, line_gap=10):
    """Draw multiline text (split on \\n), return final y."""
    lines = text.split("\n")
    cur_y = y
    for line in lines:
        draw.text((x, cur_y), line, font=font, fill=fill)
        bbox = font.getbbox(line)
        line_h = bbox[3] - bbox[1]
        cur_y += line_h + line_gap
    return cur_y


def get_text_width(font, text):
    bbox = font.getbbox(text)
    return bbox[2] - bbox[0]


def get_text_height(font, text):
    bbox = font.getbbox(text)
    return bbox[3] - bbox[1]


# ── Drawing ──────────────────────────────────────────────────────────────────
def make_og(filename, category, headline, subtitle):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    # ── Subtle background texture: faint grid lines ──
    for x in range(0, W, 60):
        d.line([(x, 0), (x, H)], fill="#1A1A1A", width=1)
    for y in range(0, H, 60):
        d.line([(0, y), (W, y)], fill="#1A1A1A", width=1)

    # ── Left red accent bar ──
    d.rectangle([(60, 80), (66, H - 80)], fill=RED_DARK)

    # ── Logo top-left ──────────────────────────────────────────────────────
    logo_x, logo_y = 92, 60
    f_logo = get_font(22, bold=True)
    d.text((logo_x, logo_y), "DR.", font=f_logo, fill=WHITE)
    dr_w = get_text_width(f_logo, "DR.")
    d.text((logo_x + dr_w, logo_y), "TAKAFUL", font=f_logo, fill=RED)

    # ── Category badge top-right ──────────────────────────────────────────
    f_badge = get_font(16, bold=True)
    badge_text = category
    bw = get_text_width(f_badge, badge_text) + 24
    bh = 32
    bx = W - bw - 60
    by = 52
    # Draw pill badge
    d.rounded_rectangle([bx, by, bx + bw, by + bh], radius=16, fill=RED)
    d.text((bx + 12, by + 6), badge_text, font=f_badge, fill=WHITE)

    # ── Headline ──────────────────────────────────────────────────────────
    f_headline = get_font(72, bold=True)
    headline_x = 92
    headline_y = 160
    final_y = draw_text_multiline(d, headline, headline_x, headline_y,
                                   f_headline, WHITE, line_gap=8)

    # ── Red accent line ────────────────────────────────────────────────────
    line_y = final_y + 20
    d.rectangle([(92, line_y), (92 + 80, line_y + 4)], fill=RED)

    # ── Subtitle ───────────────────────────────────────────────────────────
    f_sub = get_font(30, bold=False)
    draw_text_multiline(d, subtitle, 92, line_y + 28, f_sub, LIGHT_GRAY, line_gap=6)

    # ── Domain bottom-right ────────────────────────────────────────────────
    f_domain = get_font(20, bold=False)
    domain = "drtakaful.com"
    dw = get_text_width(f_domain, domain)
    d.text((W - dw - 60, H - 52), domain, font=f_domain, fill=GRAY)

    # ── Save ───────────────────────────────────────────────────────────────
    out_path = os.path.join(OUT_DIR, filename)
    img.save(out_path, "PNG", optimize=True)
    print(f"  OK  {filename}")


# ── Main ─────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    os.makedirs(OUT_DIR, exist_ok=True)
    print(f"Generating {len(POSTS)} OG images -> {OUT_DIR}\n")
    for args in POSTS:
        make_og(*args)
    print(f"\nDone! {len(POSTS)} images created.")
