/* ===========================
   POLICE DASHBOARD — Drive Legal AI
   =========================== */

const police = JSON.parse(localStorage.getItem('police'));
if (!police) { window.location.href = 'index.html'; }

document.getElementById('officerInfo').textContent =
  `${police.policeName}  ·  ${police.station}`;

let users = JSON.parse(localStorage.getItem('users')) || [];

/* Stats */
function refreshStats(arr) {
  const violations = arr.filter(u => u.violation !== 'No Violations' && !u.violation.includes('✅') && u.fine > 0);
  const totalFines  = arr.reduce((s, u) => s + (u.fine || 0), 0);
  const safe        = arr.filter(u => u.fine === 0);

  document.getElementById('statTotal').textContent      = arr.length;
  document.getElementById('statViolations').textContent = violations.length;
  document.getElementById('statFines').textContent      = `₹${totalFines.toLocaleString('en-IN')}`;
  document.getElementById('statSafe').textContent       = safe.length;
}

/* Render cards */
function displayUsers(arr) {
  const container = document.getElementById('userDetails');
  refreshStats(arr);

  if (!arr.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="icon">🔍</div>
        <h3>No records found</h3>
        <p>Try a different search term — name, vehicle, phone, or licence number.</p>
      </div>`;
    return;
  }

  container.innerHTML = arr.map(user => {
    const safe       = !user.violation || user.violation === 'No Violations' || user.fine === 0;
    const badgeCls   = user.points >= 90 ? 'good' : 'warn';
    const statusCls  = safe ? 'safe' : 'flagged';
    const statusText = safe ? '✅ No Violations' : `⚠️ ${user.violation}`;

    return `
    <div class="user-card">
      <div class="user-card-header">
        <div>
          <div class="vehicle-tag">${user.vehicle}</div>
          <div style="font-size:12px;color:var(--muted);margin-top:3px;">${user.model}</div>
        </div>
        <div class="points-badge ${badgeCls}">${user.points} pts</div>
      </div>

      <div class="user-info-row"><span class="label">👤 Name</span><span>${user.name}</span></div>
      <div class="user-info-row"><span class="label">📞 Phone</span><span>${user.phone}</span></div>
      <div class="user-info-row"><span class="label">🪪 Licence</span><span>${user.license}</span></div>
      <div class="user-info-row"><span class="label">📍 Location</span><span>${user.location}</span></div>
      ${user.fine > 0
        ? `<div class="user-info-row"><span class="label">💰 Fine</span><span style="color:var(--red);font-weight:700;">₹${Number(user.fine).toLocaleString('en-IN')}</span></div>`
        : ''}

      <div class="violation-status ${statusCls}">${statusText}</div>
    </div>`;
  }).join('');
}

/* Initial render */
displayUsers(users);

/* Search */
function searchUser() {
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  if (!q) { displayUsers(users); return; }

  const filtered = users.filter(u =>
    [u.name, u.phone, u.vehicle, u.license, u.location]
      .some(v => v && v.toLowerCase().includes(q))
  );

  displayUsers(filtered);
}

document.getElementById('searchInput').addEventListener('keyup', searchUser);
document.getElementById('searchInput').addEventListener('search', searchUser);

/* Logout */
function logout() {
  localStorage.removeItem('police');
  window.location.href = 'index.html';
}
