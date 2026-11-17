
 const palette = {
  green: '#4f8059', gold: '#d4a94d', mint: '#8fc5a0',
  blue: '#7d9eae', grid: 'rgba(70, 88, 70, .12)', text: '#7d8579'
};
Chart.defaults.font.family = "'DM Sans', sans-serif";
Chart.defaults.font.size = 14;
Chart.defaults.color = palette.text;
Chart.defaults.plugins.legend.display = false;
Chart.defaults.plugins.tooltip.backgroundColor = '#173d2d';
Chart.defaults.plugins.tooltip.padding = 10;
Chart.defaults.plugins.tooltip.cornerRadius = 5;
const baseOptions = {
  responsive: true, maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false }, border: { display: false }, ticks: { maxRotation: 0 } },
    y: { grid: { color: palette.grid }, border: { display: false }, ticks: { maxTicksLimit: 5 } }
  }
};
function lineChart(id, labels, datasets, extra={}) {
  const ctx = document.getElementById(id);
  if (!ctx || !window.Chart) return;
  new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: datasets.map(d => ({
      ...d, borderWidth: 2, tension: .35, pointRadius: 2.5,
      pointHoverRadius: 5, fill: false
    })) },
    options: { ...baseOptions, ...extra }
  });
}
lineChart('temperatureChart',
  ['00:00','04:00','08:00','12:00','16:00','20:00','24:00'],
  [{ label:'Temperature', data:[34.1,34.2,34.5,34.8,34.6,34.3,34.1], borderColor:palette.green, backgroundColor:palette.green }]
);
lineChart('weightChart',
  ['Day 1','Day 2','Day 3','Day 4','Day 5','Day 6','Day 7'],
  [{ label:'Weight', data:[28.1,28.3,28.2,28.6,28.8,28.7,29.0], borderColor:palette.gold, backgroundColor:palette.gold }]
);
lineChart('acousticChart',
  ['Day 1','Day 2','Day 3','Day 4','Day 5','Day 6','Day 7'],
  [{ label:'Acoustic index', data:[76,79,74,82,86,80,83], borderColor:palette.blue, backgroundColor:palette.blue }]
);
lineChart('environmentChart',
  ['04 Nov','05 Nov','06 Nov','07 Nov','08 Nov','09 Nov','10 Nov'],
  [
    { label:'Temperature °C', data:[28.4,29.1,29.7,30.0,29.5,29.2,29.4], borderColor:palette.gold, backgroundColor:palette.gold, yAxisID:'y' },
    { label:'Humidity %', data:[59,57,54,52,55,58,56], borderColor:palette.mint, backgroundColor:palette.mint, yAxisID:'y1' }
  ],
  { scales: {
    x:{grid:{display:false},border:{display:false},ticks:{color:'#c2d0c5'}},
    y:{position:'left',grid:{color:'rgba(255,255,255,.1)'},border:{display:false},ticks:{color:'#c2d0c5'}},
    y1:{position:'right',grid:{drawOnChartArea:false},border:{display:false},ticks:{color:'#c2d0c5'}}
  }}
);
const sugarCtx = document.getElementById('sugarChart');
if (sugarCtx && window.Chart) new Chart(sugarCtx, {
  type:'bar',
  data:{labels:['Fructose','Glucose','Sucrose','Other sugars'],datasets:[{data:[38.2,30.3,3.1,4.0],backgroundColor:[palette.green,palette.gold,palette.blue,'#b9c1b2'],borderRadius:4,maxBarThickness:34}]},
  options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},border:{display:false}},y:{grid:{color:palette.grid},border:{display:false},beginAtZero:true}}}
});

// QR code is generated only after the user enters the real, published GitHub Pages URL.
let generatedQrCanvas = null;
const urlInput = document.getElementById('siteUrl');
const qrTarget = document.getElementById('qrcode');
const qrButton = document.getElementById('makeQr');
const downloadButton = document.getElementById('downloadQr');
const qrMessage = document.getElementById('qrMessage');

qrButton?.addEventListener('click', () => {
  const value = (urlInput?.value || '').trim();
  let parsed;
  try { parsed = new URL(value); } catch { parsed = null; }
  if (!parsed || !['https:', 'http:'].includes(parsed.protocol)) {
    qrMessage.textContent = 'Enter a valid published website URL beginning with https://';
    return;
  }
  if (parsed.hostname.includes('your-username') || parsed.hostname === 'example.com') {
    qrMessage.textContent = 'Replace the placeholder with your actual GitHub Pages URL first.';
    return;
  }
  if (!window.QRCode) {
    qrMessage.textContent = 'QR library did not load. Check your internet connection and reload.';
    return;
  }
  qrTarget.innerHTML = '';
  new QRCode(qrTarget, { text: parsed.href, width: 180, height: 180, colorDark: '#173d2d', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.H });
  setTimeout(() => {
    const canvas = qrTarget.querySelector('canvas');
    const img = qrTarget.querySelector('img');
    generatedQrCanvas = canvas || null;
    if (img && !canvas) {
      const image = new Image();
      image.onload = () => {
        const c = document.createElement('canvas'); c.width=180; c.height=180;
        c.getContext('2d').drawImage(image,0,0,180,180); generatedQrCanvas=c;
      };
      image.src = img.src;
    }
    downloadButton.disabled = false;
    qrMessage.textContent = 'QR created for: ' + parsed.href;
  }, 100);
});
downloadButton?.addEventListener('click', () => {
  if (!generatedQrCanvas) { qrMessage.textContent = 'QR is still loading. Try again in a moment.'; return; }
  const a = document.createElement('a');
  a.download = 'SafeBee-SB-2026-001-QR.png';
  a.href = generatedQrCanvas.toDataURL('image/png');
  a.click();
});