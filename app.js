let D = {
    k: [], a: [], p: [], g: [], 
    s: {n: 'PT. Maju Jaya', d: 100000, j: 8, m: 15000, t: 10000, b: '08:00', u: '17:00', noWA: ''}, 
    l: ''
};

function initData() {
    let x = localStorage.getItem('wm_data');
    if (x) { D = JSON.parse(x); if (!D.g) D.g = []; } 
    else {
        D.k = [
            {id: 1, n: 'Ahmad Sudirman', nik: '320101010101', j: 'Operator', t: '081234567890', g: 120000, s: 'Aktif', a: 'Jl. Mawar No. 1'},
            {id: 2, n: 'Budi Santoso', nik: '320101010102', j: 'Supervisor', t: '081234567891', g: 150000, s: 'Aktif', a: 'Jl. Melati No. 2'}
        ];
        saveData();
    }
}

function saveData() { localStorage.setItem('wm_data', JSON.stringify(D)); }

function showPage(pId, el) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('p-' + pId).classList.add('active');
    if (el) el.classList.add('active');
    if (pId === 'home') rHome(); if (pId === 'kar') rKar(); if (pId === 'abs') rAbs();
    if (pId === 'pin') rPin(); if (pId === 'gaji') rGajiPage(); if (pId === 'set') loadSet();
}

function openModal(mId) { document.getElementById(mId).classList.add('active'); }
function closeModal(mId) { document.getElementById(mId).classList.remove('active'); }
function rHome() {
    document.getElementById('h-kar').innerText = D.k.filter(x => x.s === 'Aktif').length;
    let tgl = new Date().toISOString().split('T')[0];
    document.getElementById('h-abs').innerText = D.a.filter(x => x.tg === tgl && x.s === 'Hadir').length;
    let totPin = D.p.filter(x => x.s === 'Aktif').reduce((a, b) => a + b.si, 0);
    document.getElementById('h-pin').innerText = 'Rp ' + totPin.toLocaleString('id-ID');
    document.getElementById('tabel-home').getElementsByTagName('tbody')[0].innerHTML = D.a.slice(-5).map(x => {
        let kr = D.k.find(k => k.id === x.k) || {n: 'Unknown'};
        return `<tr><td>${kr.n}</td><td><span class="bdg ${x.s==='Hadir'?'bdg-g':'bdg-r'}">${x.s}</span></td><td>${x.jm || '-'}</td></tr>`;
    }).join('');
}

function rKar() {
    let q = document.getElementById('cariKar').value.toLowerCase();
    let f = D.k.filter(x => x.n.toLowerCase().includes(q));
    document.getElementById('tabel-kar').getElementsByTagName('tbody')[0].innerHTML = f.map(x => `<tr>
        <td>${x.n}</td><td>${x.nik}</td><td>${x.j}</td>
        <td><span class="bdg ${x.s==='Aktif'?'bdg-g':'bdg-r'}">${x.s}</span></td>
        <td><button class="btn" onclick="editKar(${x.id})"><i class="fas fa-edit"></i></button> <button class="btn btn-r" onclick="hapusKar(${x.id})"><i class="fas fa-trash"></i></button></td>
    </tr>`).join('');
}

function simpanKar() {
    let id = document.getElementById('mkId').value;
    let obj = {
        id: id ? parseInt(id) : Date.now(), n: document.getElementById('mkNama').value, nik: document.getElementById('mkNik').value,
        j: document.getElementById('mkJab').value, t: document.getElementById('mkTelp').value, g: parseInt(document.getElementById('mkGaji').value) || 0,
        s: document.getElementById('mkStatus').value, a: document.getElementById('mkAlamat').value
    };
    if (id) { D.k[D.k.findIndex(x => x.id === parseInt(id))] = obj; } else { D.k.push(obj); }
    saveData(); closeModal('mKar'); rKar(); document.getElementById('mkId').value = '';
}

function editKar(id) {
    let x = D.k.find(k => k.id === id);
    document.getElementById('mkId').value = x.id; document.getElementById('mkNama').value = x.n; document.getElementById('mkNik').value = x.nik;
    document.getElementById('mkJab').value = x.j; document.getElementById('mkTelp').value = x.t; document.getElementById('mkGaji').value = x.g;
    document.getElementById('mkStatus').value = x.s; document.getElementById('mkAlamat').value = x.a; openModal('mKar');
}

function hapusKar(id) { if(confirm('Hapus karyawan ini?')) { D.k = D.k.filter(x => x.id !== id); saveData(); rKar(); } }
function rAbs() {
    let tgl = document.getElementById('f-abs-tgl').value || new Date().toISOString().split('T')[0];
    document.getElementById('f-abs-tgl').value = tgl;
    let stat = document.getElementById('f-abs-stat').value;
    let f = D.a.filter(x => x.tg === tgl && (stat === '' || x.s === stat));
    document.getElementById('tabel-abs').getElementsByTagName('tbody')[0].innerHTML = f.map(x => {
        let kr = D.k.find(k => k.id === x.k) || {n: 'Unknown'};
        return `<tr><td>${kr.n}</td><td>${x.tg}</td><td><span class="bdg ${x.s==='Hadir'?'bdg-g':'bdg-r'}">${x.s}</span></td><td>${x.jm || '-'} - ${x.jk || '-'}</td><td><button class="btn btn-r" onclick="hapusAbs(${x.id})"><i class="fas fa-trash"></i></button></td></tr>`;
    }).join('');
}

function bukaAbsenMassal() {
    let tgl = document.getElementById('f-abs-tgl').value || new Date().toISOString().split('T')[0];
    document.getElementById('mAbsContent').innerHTML = D.k.filter(x => x.s === 'Aktif').map(x => {
        let exist = D.a.find(a => a.k === x.id && a.tg === tgl);
        return `<div style="margin-bottom:12px; border-bottom:1px solid #f1f5f9; padding-bottom:8px;">
            <p><strong>${x.n}</strong></p>
            <div class="form-row">
                <select id="ma-s-${x.id}" class="input">
                    <option ${!exist||exist.s==='Hadir'?'selected':''}>Hadir</option>
                    <option ${exist&&exist.s==='Izin'?'selected':''}>Izin</option>
                    <option ${exist&&exist.s==='Sakit'?'selected':''}>Sakit</option>
                </select>
                <input type="time" id="ma-j-${x.id}" class="input" value="${exist?exist.jm:D.s.b}">
                <select id="ma-tp-${x.id}" class="input">
                    <option value="full" ${!exist||exist.tp==='full'?'selected':''}>1.0 Hari</option>
                    <option value="half" ${exist&&exist.tp==='half'?'selected':''}>0.5 Hari</option>
                </select>
            </div>
        </div>`;
    }).join(''); openModal('mAbs');
}
function simpanAbsenMassal() {
    let tgl = document.getElementById('f-abs-tgl').value || new Date().toISOString().split('T')[0];
    D.k.filter(x => x.s === 'Aktif').forEach(x => {
        D.a = D.a.filter(a => !(a.k === x.id && a.tg === tgl));
        let tpVal = document.getElementById('ma-tp-' + x.id) ? document.getElementById('ma-tp-' + x.id).value : 'full';
        D.a.push({ 
            id: Date.now() + Math.random(), 
            k: x.id, 
            tg: tgl, 
            s: document.getElementById('ma-s-' + x.id).value, 
            jm: document.getElementById('ma-j-' + x.id).value, 
            jk: D.s.u, 
            tp: tpVal, 
            ket: '' 
        });
    }); 
    saveData(); 
    closeModal('mAbs'); 
    rAbs();
}

function hapusAbs(id) { if(confirm('Hapus log absen?')) { D.a = D.a.filter(x => x.id !== id); saveData(); rAbs(); } }

function rPin() {
    let stat = document.getElementById('f-pin-stat').value;
    let f = D.p.filter(x => stat === '' || x.s === stat);
    document.getElementById('tabel-pin').getElementsByTagName('tbody')[0].innerHTML = f.map(x => {
        let kr = D.k.find(k => k.id === x.k) || {n: 'Unknown'};
        return `<tr><td>${kr.n}</td><td>${x.t}</td><td>Rp ${x.j.toLocaleString()}</td><td>Rp ${x.si.toLocaleString()}</td><td><span class="bdg ${x.s==='Aktif'?'bdg-o':'bdg-g'}">${x.s}</span></td><td>${x.s==='Aktif'?`<button class="btn btn-s" onclick="lunasPin(${x.id})">Lunas</button>`:'-'}</td></tr>`;
    }).join('');
}

function bukaModalPinjam() {
    document.getElementById('mpKar').innerHTML = D.k.filter(x => x.s === 'Aktif').map(x => `<option value="${x.id}">${x.n}</option>`).join('');
    document.getElementById('mpTgl').value = new Date().toISOString().split('T')[0]; openModal('mPin');
}

function simpanPin() {
    D.p.push({ id: Date.now(), k: parseInt(document.getElementById('mpKar').value), t: document.getElementById('mpTgl').value, j: parseInt(document.getElementById('mpJml').value) || 0, si: parseInt(document.getElementById('mpJml').value) || 0, c: parseInt(document.getElementById('mpCicil').value) || 0, s: 'Aktif' });
    saveData(); closeModal('mPin'); rPin();
}

function lunasPin(id) { let x = D.p.find(p => p.id === id); if(x) { x.si = 0; x.s = 'Lunas'; saveData(); rPin(); } }
function rGajiPage() {
    document.getElementById('gaji-kar').innerHTML = D.k.filter(x => x.s === 'Aktif').map(x => `<option value="${x.id}">${x.n}</option>`).join('');
    document.getElementById('gaji-bulan').value = new Date().toISOString().slice(0, 7);
    document.getElementById('f-rekap-bln').value = new Date().toISOString().slice(0, 7); hitungGaji(); rRekap();
}

function hitungGaji() {
    let id = parseInt(document.getElementById('gaji-kar').value), bln = document.getElementById('gaji-bulan').value;
    if(!id || !bln) return;
    let kr = D.k.find(x => x.id === id);
    let semuaAbsen = D.a.filter(x => x.k === id && x.tg.startsWith(bln) && x.s === 'Hadir');
    
    let hk = 0;
    semuaAbsen.forEach(x => { if(x.tp === 'half') { hk += 0.5; } else { hk += 1.0; } });
    
    let gp = hk * kr.g, tm = hk * D.s.m, tt = hk * D.s.t, pin = D.p.find(x => x.k === id && x.s === 'Aktif'), cicil = pin ? Math.min(pin.c, pin.si) : 0, tot = (gp + tm + tt) - cicil;
    document.getElementById('v-gaji-detail').innerHTML = `<div class="payroll"><h4>Slip Gaji (${bln})</h4><div class="prow"><span>Hari Kerja</span><b>${hk} Hari</b></div><div class="prow"><span>Gaji Pokok</span><b>Rp ${gp.toLocaleString()}</b></div><div class="prow"><span>Total Bersih</span><b>Rp ${tot.toLocaleString()}</b></div><button class="btn btn-s" style="margin-top:12px;width:100%" onclick="simpanGaji(${id},'${bln}',${hk},${gp},${cicil},${tot})">Simpan</button></div>`;
}

function simpanGaji(id, bln, hk, gp, cicil, tot) {
    D.g = D.g.filter(x => !(x.k === id && x.b === bln)); D.g.push({id: Date.now(), k: id, b: bln, hk: hk, gp: gp, c: cicil, t: tot});
    if (cicil > 0) { let pin = D.p.find(x => x.k === id && x.s === 'Aktif'); if (pin) { pin.si -= cicil; if (pin.si <= 0) pin.s = 'Lunas'; } }
    saveData(); rRekap(); hitungGaji(); alert('Gaji disimpan!');
}
function rRekap() {
    let bln = document.getElementById('f-rekap-bln').value;
    document.getElementById('tabel-rekap').getElementsByTagName('tbody')[0].innerHTML = D.g.filter(x => x.b === bln).map(x => {
        let kr = D.k.find(k => k.id === x.k) || {n: 'Unknown'};
        return `<tr><td>${kr.n}</td><td>${x.b}</td><td>Rp ${x.t.toLocaleString()}</td><td><button class="btn btn-r" onclick="hapusGaji(${x.id})">Hapus</button></td></tr>`;
    }).join('');
}

function hapusGaji(id) { if(confirm('Hapus?')) { D.g = D.g.filter(x => x.id !== id); saveData(); rRekap(); hitungGaji(); } }
function loadSet() { document.getElementById('setNama').value = D.s.n; document.getElementById('setMakan').value = D.s.m; document.getElementById('setTrans').value = D.s.t; document.getElementById('setBuka').value = D.s.b; document.getElementById('setNoWA').value = D.s.noWA || ''; }
function simpanSet() { D.s.n = document.getElementById('setNama').value; D.s.m = parseInt(document.getElementById('setMakan').value)||0; D.s.t = parseInt(document.getElementById('setTrans').value)||0; D.s.b = document.getElementById('setBuka').value; D.s.noWA = document.getElementById('setNoWA').value; saveData(); alert('Disimpan!'); }

function backupKeWA() {
    let noWA = document.getElementById('setNoWA').value; if(!noWA) { alert("Isi nomor WhatsApp!"); return; }
    let kodeEnkripsi = btoa(unescape(encodeURIComponent(JSON.stringify(D))));
    let urlWA = `https://api.whatsapp.com/send?phone=${noWA}&text=${encodeURIComponent('*BACKUP WORKMANAGER*\n\nSalin kode di bawah:\n\n' + kodeEnkripsi)}`;
    window.open(urlWA, '_blank');
}

function prosesRestoreWA() {
    let kodeInput = document.getElementById('txtCodeWA').value.trim(); if(!kodeInput) return;
    try {
        if(kodeInput.includes("\n\n")) { let parts = kodeInput.split("\n\n"); kodeInput = parts[parts.length - 1].trim(); }
        let res = JSON.parse(decodeURIComponent(escape(atob(kodeInput))));
        if(res.k) { D = res; saveData(); alert("Database pulih!"); location.reload(); }
    } catch(e) { alert("Kode salah/tidak utuh!"); }
}

function prosesLogout() { sessionStorage.removeItem("user_logged"); window.location.href = "login.html"; }
window.onload = function() {
    initData();
    if (sessionStorage.getItem("user_logged") !== "true") { window.location.href = "login.html"; return; }
    let level = sessionStorage.getItem("user_level");
    if (level === "Mandor") {
        document.querySelectorAll(".nav-item").forEach(item => {
            let txt = item.innerText.toLowerCase();
            if (txt.includes("karyawan") || txt.includes("gaji") || txt.includes("setting")) { item.style.display = "none"; }
        });
    }
    showPage('home');
};
