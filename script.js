 const DOMAINS = [
    { code:"01", codename:"The Architect", name:"Best Manager", icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg>' },
    { code:"02", codename:"The Vault", name:"Finance", icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="6" width="18" height="14" rx="1"/><circle cx="12" cy="13" r="3"/><path d="M7 6V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1"/></svg>' },
    { code:"03", codename:"The Blueprint", name:"B Plan", icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 4h16v16H4z"/><path d="M4 9h16M9 9v11"/></svg>' },
    { code:"04", codename:"The Cipher", name:"Business Quiz", icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1.4 1-1.4 2.2"/><circle cx="12" cy="17" r=".6" fill="currentColor" stroke="none"/></svg>' },
    { code:"05", codename:"The Broadcast", name:"Marketing", icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 11v2a2 2 0 0 0 2 2h1l4 4V7L6 11H5a2 2 0 0 0-2 2z"/><path d="M16 8a5 5 0 0 1 0 8M19 5a9 9 0 0 1 0 14"/></svg>' },
    { code:"06", codename:"The Crew", name:"Human Resource", icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="8" r="3"/><path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1"/><circle cx="17" cy="8" r="2.4"/><path d="M17 12a5 5 0 0 1 5 5v1"/></svg>' },
    { code:"07", codename:"The Negotiator", name:"Public Relation", icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 12h.01M12 12h.01M16 12h.01"/><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' },
  ];

  const bgEffects = document.querySelector('.bg-effects');
  if (bgEffects) {
    let pointerX = 0;
    let pointerY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener('pointermove', (event) => {
      pointerX = ((event.clientX / window.innerWidth) - 0.5) * 18;
      pointerY = ((event.clientY / window.innerHeight) - 0.5) * 18;
    });

    const updateParallax = () => {
      currentX += (pointerX - currentX) * 0.06;
      currentY += (pointerY - currentY) * 0.06;
      bgEffects.style.setProperty('--mx', `${currentX}px`);
      bgEffects.style.setProperty('--my', `${currentY}px`);
      requestAnimationFrame(updateParallax);
    };

    updateParallax();
  }

  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  burgerBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    burgerBtn.classList.toggle('open', isOpen);
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burgerBtn.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', 'false');
  }));

  const roomsGrid = document.getElementById('roomsGrid');
  const domainPicker = document.getElementById('domainPicker');
  const coordCards = document.getElementById('coordCards');
  const domainInput = document.getElementById('domain');
  const coordinatorNames = ['Isha Prasad', 'Ayush Noel Beck', 'Yazhini'];

  DOMAINS.forEach((d, index) => {
    // vault board room
    if(roomsGrid) {
      const room = document.createElement('div');
      room.className = 'room';
      room.tabIndex = 0;
      room.dataset.name = d.name;
      room.innerHTML = `
        <div class="icon">${d.icon}</div>
        <div class="file-no">FILE NO. ${d.code}</div>
        <div class="codename">${d.codename}</div>
        <div class="domain-name">${d.name}</div>
      `;
      room.addEventListener('click', () => selectDomain(d.name));
      room.addEventListener('keypress', (e) => { if(e.key === 'Enter') selectDomain(d.name); });
      roomsGrid.appendChild(room);
    }

    // registration chip
    if(domainPicker) {
      const chip = document.createElement('div');
      chip.className = 'domain-chip';
      chip.textContent = d.name;
      chip.dataset.name = d.name;
      chip.addEventListener('click', () => selectDomain(d.name));
      domainPicker.appendChild(chip);
    }

    // coordinator card (only first 3 domains)
    if(coordCards && index < 3) {
      const card = document.createElement('div');
      card.className = 'coord-card';
      card.innerHTML = `
        <div class="name">${coordinatorNames[index]}</div>
        <div class="email">📧 <a href="mailto:coordinator@example.com">coordinator@example.com</a></div>
      `;
      coordCards.appendChild(card);
    }
  });

  function selectDomain(name){
    domainInput.value = name;
    document.querySelectorAll('.room').forEach(r => r.classList.toggle('active', r.dataset.name === name));
    document.querySelectorAll('.domain-chip').forEach(c => c.classList.toggle('selected', c.dataset.name === name));
    document.getElementById('register').scrollIntoView({behavior:'smooth', block:'start'});
    document.querySelector('.field:has(#domain)')?.classList.remove('invalid');
  }

  // ---------- form validation & submit ----------
  const form = document.getElementById('regForm');
  const confirmPanel = document.getElementById('confirmPanel');

  function setInvalid(fieldEl, invalid){
    fieldEl.classList.toggle('invalid', invalid);
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    let valid = true;

    const nameField = document.getElementById('fname');
    const regField = document.getElementById('regno');
    const phoneField = document.getElementById('phone');
    const emailField = document.getElementById('email');

    if(!nameField.value.trim()){ setInvalid(nameField.closest('.field'), true); valid = false; }
    else setInvalid(nameField.closest('.field'), false);

    if(!regField.value.trim()){ setInvalid(regField.closest('.field'), true); valid = false; }
    else setInvalid(regField.closest('.field'), false);

    const phoneOk = /^[6-9]\d{9}$/.test(phoneField.value.trim());
    setInvalid(phoneField.closest('.field'), !phoneOk);
    if(!phoneOk) valid = false;

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim());
    setInvalid(emailField.closest('.field'), !emailOk);
    if(!emailOk) valid = false;

    const domainOk = !!domainInput.value;
    document.getElementById('domainError').style.display = domainOk ? 'none' : 'block';
    if(!domainOk) valid = false;

    if(!valid) return;

    const agentId = 'PRB-' + Math.random().toString(36).slice(2,6).toUpperCase() + '-' + Math.floor(100+Math.random()*900);

    const entry = {
      id: agentId,
      name: nameField.value.trim(),
      regno: regField.value.trim(),
      email: emailField.value.trim(),
      phone: phoneField.value.trim(),
      domain: domainInput.value,
      time: new Date().toLocaleString()
    };

    try{
      const existing = JSON.parse(localStorage.getItem('prarambh_registrations') || '[]');
      existing.push(entry);
      localStorage.setItem('prarambh_registrations', JSON.stringify(existing));
    }catch(err){ console.warn('Could not save locally', err); }

    document.getElementById('agentId').textContent = 'AGENT ID: ' + agentId;
    const waText = encodeURIComponent(
      `PRARAMBH Registration\nName: ${entry.name}\nReg No: ${entry.regno}\nDomain: ${entry.domain}\nPhone: ${entry.phone}\nAgent ID: ${entry.id}`
    );
    document.getElementById('waLink').href = `https://wa.me/91XXXXXXXXXX?text=${waText}`;
    confirmPanel.classList.add('show');
    confirmPanel.scrollIntoView({behavior:'smooth', block:'nearest'});

    document.getElementById('downloadBtn').onclick = () => {
      const blob = new Blob([
        `PRARAMBH — Registration Confirmation\n\nAgent ID: ${entry.id}\nName: ${entry.name}\nRegistration No: ${entry.regno}\nEmail: ${entry.email}\nPhone: ${entry.phone}\nDomain: ${entry.domain}\nSubmitted: ${entry.time}\n`
      ], {type:'text/plain'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `PRARAMBH_${entry.id}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    };

    form.reset();
    domainInput.value = '';
    document.querySelectorAll('.room.active').forEach(r => r.classList.remove('active'));
    document.querySelectorAll('.domain-chip.selected').forEach(c => c.classList.remove('selected'));
  });

  // ---------- lightweight admin viewer ----------
  const adminModal = document.getElementById('adminModal');
  document.getElementById('adminLink').addEventListener('click', (e) => {
    e.preventDefault();
    const pass = prompt('Organizer passcode:');
    if(pass !== 'praramabh2026'){ if(pass !== null) alert('Incorrect passcode.'); return; }
    const data = JSON.parse(localStorage.getItem('prarambh_registrations') || '[]');
    const content = document.getElementById('adminContent');
    if(!data.length){
      content.innerHTML = '<p>No registrations recorded on this device/browser yet.</p>';
    } else {
      let rows = data.map(d => `<tr><td>${d.id}</td><td>${d.name}</td><td>${d.regno}</td><td>${d.email}</td><td>${d.phone}</td><td>${d.domain}</td><td>${d.time}</td></tr>`).join('');
      content.innerHTML = `
        <p style="margin-bottom:12px;font-size:12.5px;color:#555;">Showing entries saved on this browser only. For live, multi-device collection, connect this form to a shared backend (Google Sheets, Forms, or a database).</p>
        <table><thead><tr><th>Agent ID</th><th>Name</th><th>Reg No</th><th>Email</th><th>Phone</th><th>Domain</th><th>Time</th></tr></thead><tbody>${rows}</tbody></table>
      `;
    }
    adminModal.classList.add('show');
  });
  document.getElementById('adminCloseBtn').addEventListener('click', () => adminModal.classList.remove('show'));