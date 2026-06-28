function registerUser() {
  const fields = ['name', 'phone', 'license', 'vehicle', 'model'];
  const values = {};

  for (const f of fields) {
    const val = document.getElementById(f).value.trim();
    if (!val) {
      showToast(`Please fill in the ${f.charAt(0).toUpperCase() + f.slice(1)} field.`, 'error');
      document.getElementById(f).focus();
      return;
    }
    values[f] = val;
  }

  const newUser = {
    id: Date.now(),
    ...values,
    location: 'Tamil Nadu Highway',
    violation: 'No Violations',
    fine: 0,
    points: 100
  };

  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(newUser));

  showToast('Registration successful! Redirecting…', 'success');
  setTimeout(() => { window.location.href = 'dashboard.html'; }, 900);
}

function policeLogin() {
  const pName  = document.getElementById('policeName').value.trim();
  const pId    = document.getElementById('policeId').value.trim();
  const pStn   = document.getElementById('station').value.trim();

  if (!pName || !pId || !pStn) {
    showToast('Please fill in all police credentials.', 'error');
    return;
  }

  localStorage.setItem('police', JSON.stringify({ policeName: pName, policeId: pId, station: pStn }));
  showToast('Access granted. Redirecting…', 'success');
  setTimeout(() => { window.location.href = 'police-dashboard.html'; }, 900);
}

/* Toast helper */
function showToast(msg, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  toast.style.cssText = `
    position:fixed; bottom:30px; right:30px; z-index:9999;
    background:${type === 'error' ? '#7f1d1d' : '#14532d'};
    border:1px solid ${type === 'error' ? '#ef4444' : '#22c55e'};
    color:#fff; padding:14px 22px; border-radius:12px;
    font-size:14px; font-weight:600; font-family:'Space Grotesk',sans-serif;
    box-shadow:0 8px 28px rgba(0,0,0,0.5);
    animation: slideIn 0.3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
