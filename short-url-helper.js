/**
 * Short URL Helper
 * Adds copy short link functionality to blog articles
 */

// Short URL mappings (keep in sync with url-map.php)
const shortUrlMap = {
  // Hibah & Legacy
  '/panduan-lengkap-hibah-takaful.html': 'hibah',
  '/perancangan-hibah-2026.html': 'hibah-2026',
  '/harta-beku-dan-hibah-takaful.html': 'hibah-beku',
  '/hibah-untuk-bisnes.html': 'hibah-bisnes',
  '/hibah-untuk-ibu-bapa.html': 'hibah-ibu',
  '/bolehkah-claim-hibah-jika-lumpuh.html': 'hibah-lumpuh',
  '/hibah-aia-sejuta-makna-vs-legasi-beyond.html': 'hibah-sejuta',
  '/kalkulator-hibah.html': 'kalkulator',
  '/kalkulator-hibah-takaful.html': 'kalkulator-hibah',
  
  // Medical Card
  '/panduan-lengkap-medical-card-takaful.html': 'mc',
  '/beza-medical-card-mediflex-vs-idaman.html': 'mediflex',
  '/tempoh-menunggu-medical-card.html': 'mc-waiting',
  '/perkeso-vs-takaful-medical-card.html': 'perkeso-mc',
  '/company-policy-vs-personal-takaful.html': 'company-mc',
  
  // Penyakit Kritikal (CI)
  '/panduan-lengkap-penyakit-kritikal-takaful.html': 'ci',
  '/medical-card-atau-ci-dulu.html': 'mc-ci',
  '/beza-medical-card-vs-pelan-penyakit-kritikal.html': 'mc-vs-ci',
  '/penyakit-kritikal-dan-humk.html': 'ci-tpd',
  '/pelankritikal.html': 'gaji',
  '/kos-rawatan-vs-gaji.html': 'kos-rawatan',
  '/socso-vs-takaful-penyakit-kritikal.html': 'socso-ci',
  
  // Asas Takaful
  '/kenapa-perlu-rancang-kewangan-awal.html': 'mula-awal',
  '/perlindungan-pertama-untuk-orang-muda.html': 'fresh-grad',
  '/simpanan-vs-takaful.html': 'simpanan',
  '/simpananvstakaful.html': 'simpanan-vs',
  '/formula-10-peratus-pendapatan-takaful.html': 'formula-10',
  '/sepuluhpercentincome.html': 'sepuluh-persen',
  '/kenapa-pilih-aia-takaful.html': 'kenapa-aia',
  
  // Pinjaman Perumahan
  '/panduan-lengkap-mltt-mrtt.html': 'mltt',
  
  // Lain-lain
  '/panduan-personal-accident.html': 'pa',
  '/bila-perlu-mula-takaful-anak.html': 'anak',
  '/takaful-umur-50-tahun.html': 'umur-50',
  '/pelaburan-aia-enrich-rezeki.html': 'pelaburan',
  '/analisis-keperluan.html': 'analisis',
  '/borang-permohonan.html': 'borang',
  '/konsultasi-percuma.html': 'konsultasi',
};

// Get short URL for a given full URL
function getShortUrl(fullUrl) {
  const shortCode = shortUrlMap[fullUrl];
  if (shortCode) {
    return `${window.location.origin}/go/${shortCode}`;
  }
  return null;
}

// Copy to clipboard function
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return Promise.resolve();
    } catch (err) {
      document.body.removeChild(textArea);
      return Promise.reject(err);
    }
  }
}

// Add share buttons to blog articles
function addShareButtons() {
  const articles = document.querySelectorAll('.blog-article');
  
  articles.forEach(article => {
    const href = article.getAttribute('href');
    const shortUrl = getShortUrl(href);
    
    if (shortUrl) {
      // Create share button container
      const shareContainer = document.createElement('div');
      shareContainer.className = 'mt-4 pt-4 border-t border-gray-100 flex items-center gap-2';
      
      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'flex items-center gap-1.5 text-xs text-gray-500 hover:text-rose-600 transition-colors';
      copyButton.innerHTML = `
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
        <span class="copy-text">Salin Pautan</span>
      `;
      
      copyButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        copyToClipboard(shortUrl).then(() => {
          const textSpan = copyButton.querySelector('.copy-text');
          const originalText = textSpan.textContent;
          textSpan.textContent = 'Disalin! ✓';
          copyButton.classList.add('text-green-600');
          
          setTimeout(() => {
            textSpan.textContent = originalText;
            copyButton.classList.remove('text-green-600');
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy:', err);
          alert('Gagal menyalin. Cuba lagi.');
        });
      });
      
      // Create WhatsApp share button
      const whatsappButton = document.createElement('a');
      const title = article.querySelector('h3').textContent;
      const whatsappText = encodeURIComponent(`${title}\n\n${shortUrl}`);
      whatsappButton.href = `https://wa.me/?text=${whatsappText}`;
      whatsappButton.target = '_blank';
      whatsappButton.className = 'flex items-center gap-1.5 text-xs text-gray-500 hover:text-green-600 transition-colors';
      whatsappButton.innerHTML = `
        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
        </svg>
        <span>Kongsi</span>
      `;
      
      whatsappButton.addEventListener('click', (e) => {
        e.stopPropagation();
      });
      
      shareContainer.appendChild(copyButton);
      shareContainer.appendChild(whatsappButton);
      
      // Insert before the "Baca lanjut" link
      const readMoreLink = article.querySelector('.text-rose-600.font-medium');
      if (readMoreLink) {
        article.insertBefore(shareContainer, readMoreLink);
      } else {
        article.appendChild(shareContainer);
      }
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addShareButtons);
} else {
  addShareButtons();
}
