/* ===========================
   DASHBOARD — Drive Legal AI
   =========================== */

const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
  window.location.href = 'index.html';
}

/* Welcome message */
document.getElementById('welcomeMsg').textContent = `Welcome, ${currentUser.name}`;

/* Points */
updatePointsDisplay(currentUser.points);

/* Profile panel */
const profileEl = document.getElementById('profileInfo');
profileEl.innerHTML = `
  <div class="user-info-row"><span class="label">📞 Phone</span><span>${currentUser.phone}</span></div>
  <div class="user-info-row"><span class="label">🪪 Licence</span><span>${currentUser.license}</span></div>
  <div class="user-info-row"><span class="label">🚘 Vehicle</span><span>${currentUser.vehicle}</span></div>
  <div class="user-info-row"><span class="label">🏍 Model</span><span>${currentUser.model}</span></div>
`;

/* GPS */
const gpsEl = document.getElementById('gps');

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude.toFixed(5);
      const lng = pos.coords.longitude.toFixed(5);
      const locText = `Lat: ${lat} / Lon: ${lng}`;
      gpsEl.innerHTML = `<span>📡</span><span>${locText}</span>`;
      currentUser.location = locText;
      persistUser();
    },
    () => {
      gpsEl.innerHTML = '<span>🚫</span><span>Location access denied by browser</span>';
    }
  );
} else {
  gpsEl.innerHTML = '<span>⚠️</span><span>Geolocation not supported on this device</span>';
}

/* ===========================
   AI DETECTION
   =========================== */
const violations = [
  {
    text: 'Helmet Detected',
    icon: '✅',
    fine: 0,
    points: 100,
    type: 'ok',
    detail: 'Rider is wearing a compliant BIS-certified helmet. No action required.'
  },
  {
    text: 'No Helmet Detected',
    icon: '❌',
    fine: 1000,
    points: 80,
    type: 'warn',
    detail: 'Rider and/or pillion is not wearing a helmet — violation of MV Act Sec. 129.'
  },
  {
    text: 'Triple Riding Detected',
    icon: '❌',
    fine: 2000,
    points: 70,
    type: 'warn',
    detail: 'Three persons detected on a two-wheeler — violation of MV Act Sec. 128.'
  },
  {
    text: 'Over-Speeding Detected',
    icon: '❌',
    fine: 1500,
    points: 60,
    type: 'warn',
    detail: 'Vehicle exceeded the permissible speed limit for this zone — MV Act Sec. 183.'
  }
];

function runAI() {
  const outputEl = document.getElementById('output');

  outputEl.classList.remove('has-result');
  outputEl.innerHTML = `
    <span style="font-size:28px;animation:spin 0.8s linear infinite;display:inline-block;">⚙️</span>
    <span style="margin-top:10px;font-size:15px;color:var(--muted);">Analysing camera feed…</span>
  `;

  // Add spin keyframe dynamically once
  if (!document.getElementById('spinStyle')) {
    const s = document.createElement('style');
    s.id = 'spinStyle';
    s.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
    document.head.appendChild(s);
  }

  setTimeout(() => {
    const result = violations[Math.floor(Math.random() * violations.length)];

    outputEl.classList.add('has-result');
    outputEl.innerHTML = `
      <div style="font-size:40px;margin-bottom:8px;">${result.icon}</div>
      <div class="${result.type === 'ok' ? 'violation-ok' : 'violation-warn'}"
           style="font-family:var(--font-head);font-size:24px;font-weight:700;letter-spacing:0.5px;">
        ${result.text}
      </div>
      <div style="font-size:13px;color:var(--muted);margin-top:8px;max-width:340px;text-align:center;line-height:1.6;">
        ${result.detail}
      </div>
      ${result.fine > 0
        ? `<div class="fine-pill">Fine Imposed: ₹${result.fine.toLocaleString('en-IN')}</div>`
        : `<div class="fine-pill" style="background:rgba(34,197,94,0.12);border-color:rgba(34,197,94,0.30);color:var(--green);">No Fine — Safe Driver 🎉</div>`
      }
    `;

    currentUser.violation = result.text;
    currentUser.fine      = result.fine;
    currentUser.points    = result.points;

    updatePointsDisplay(result.points);
    persistUser();

    showToast(
      result.type === 'ok'
        ? '✅ All clear — safe driving detected!'
        : `⚠️ Violation flagged — ₹${result.fine.toLocaleString('en-IN')} fine applied.`,
      result.type === 'ok' ? 'success' : 'error'
    );
  }, 1800);
}

/* ===========================
   HELPERS
   =========================== */
function updatePointsDisplay(pts) {
  document.getElementById('points').textContent = pts;
  const bar = document.getElementById('pointsBar');
  if (bar) {
    bar.style.width = pts + '%';
    bar.style.background = pts >= 90
      ? 'linear-gradient(90deg,#22c55e,#4ade80)'
      : pts >= 70
        ? 'linear-gradient(90deg,#f59e0b,#fcd34d)'
        : 'linear-gradient(90deg,#ef4444,#f87171)';
  }
}

function persistUser() {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users = users.map(u => u.id === currentUser.id ? currentUser : u);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

function showToast(msg, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  toast.style.cssText = `
    position:fixed;bottom:30px;right:30px;z-index:9999;
    background:${type === 'error' ? '#7f1d1d' : '#14532d'};
    border:1px solid ${type === 'error' ? '#ef4444' : '#22c55e'};
    color:#fff;padding:14px 22px;border-radius:12px;
    font-size:14px;font-weight:600;font-family:'Space Grotesk',sans-serif;
    box-shadow:0 8px 28px rgba(0,0,0,0.5);
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}
