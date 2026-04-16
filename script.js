/* ============================================
   eAduan Terengganu - Application Logic
   Mock data, charts, view navigation, forms
   ============================================ */

// ============ MOCK DATA ============
const DISTRICTS = [
    { id: 'kuala-terengganu', name: 'Kuala Terengganu', agency: 'MBKT' },
    { id: 'kemaman', name: 'Kemaman', agency: 'MPK' },
    { id: 'dungun', name: 'Dungun', agency: 'MPD' },
    { id: 'marang', name: 'Marang', agency: 'MDM' },
    { id: 'hulu-terengganu', name: 'Hulu Terengganu', agency: 'MDHT' },
    { id: 'setiu', name: 'Setiu', agency: 'MDS' },
    { id: 'besut', name: 'Besut', agency: 'MDB' }
];

const CATEGORIES = [
    { id: 'infra', name: 'Jalan & Infrastruktur', icon: 'construction' },
    { id: 'water', name: 'Bekalan Air', icon: 'water_drop' },
    { id: 'electric', name: 'Bekalan Elektrik', icon: 'bolt' },
    { id: 'housing', name: 'Perumahan', icon: 'house' },
    { id: 'environment', name: 'Alam Sekitar', icon: 'eco' },
    { id: 'safety', name: 'Keselamatan Awam', icon: 'security' },
    { id: 'cleanliness', name: 'Kebersihan', icon: 'cleaning_services' },
    { id: 'flood', name: 'Banjir', icon: 'flood' }
];

const STATUSES = ['new', 'assigned', 'in-progress', 'resolved', 'escalated'];
const STATUS_LABELS = {
    'new': 'Baru',
    'assigned': 'Ditugaskan',
    'in-progress': 'Dalam Tindakan',
    'resolved': 'Selesai',
    'escalated': 'Dieskalaikan'
};

const PRIORITIES = ['low', 'medium', 'high', 'critical'];
const PRIORITY_LABELS = {
    'low': 'Rendah',
    'medium': 'Sederhana',
    'high': 'Tinggi',
    'critical': 'Kritikal'
};

const SOURCES = ['portal', 'api', 'csv', 'phone'];
const SOURCE_LABELS = {
    'portal': 'Portal',
    'api': 'API',
    'csv': 'CSV',
    'phone': 'Telefon'
};

const NAMES_FIRST = ['Ahmad', 'Mohd', 'Siti', 'Nurul', 'Muhammad', 'Fatimah', 'Hafiz', 'Aisyah', 'Ibrahim', 'Zainab', 'Ismail', 'Noraini', 'Razak', 'Aminah', 'Osman', 'Halimah', 'Yusof', 'Rosmah', 'Wan', 'Che'];
const NAMES_LAST = ['bin Ahmad', 'binti Hassan', 'bin Ismail', 'binti Abdullah', 'bin Omar', 'binti Yusof', 'bin Mahmud', 'binti Ali', 'bin Razak', 'binti Salleh', 'bin Jusoh', 'binti Awang', 'bin Mat', 'binti Embong', 'bin Daud'];

const COMPLAINT_TITLES = [
    'Jalan berlubang di hadapan sekolah',
    'Paip air pecah di Lorong 4',
    'Lampu jalan tidak berfungsi',
    'Sampah bertimbun di tepi sungai',
    'Banjir kilat di kawasan rendah',
    'Longkang tersumbat menyebabkan banjir',
    'Jambatan rosak perlu pembaikan segera',
    'Bekalan air terputus selama 3 hari',
    'Pokok tumbang menghalang laluan',
    'Papan tanda rosak dan bahaya',
    'Tandas awam kotor dan tidak diselenggara',
    'Kawasan gelap tiada pencahayaan',
    'Rumah PPR bocor atap',
    'Pencemaran bunyi dari kilang',
    'Dinding retaining wall retak',
    'Playground rosak dan bahaya untuk kanak-kanak',
    'Saluran air bau busuk',
    'Jalan sempit perlu diperluaskan',
    'Kabel elektrik terdedah di tiang',
    'Sampah haram dibuang di tepi jalan'
];

// Generate mock complaints
function generateComplaints(count) {
    const complaints = [];
    const now = new Date();
    for (let i = 0; i < count; i++) {
        const district = DISTRICTS[Math.floor(Math.random() * DISTRICTS.length)];
        const daysAgo = Math.floor(Math.random() * 30);
        const date = new Date(now - daysAgo * 86400000);
        const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
        complaints.push({
            id: `EA-2026-${String(4000 + i).padStart(5, '0')}`,
            title: COMPLAINT_TITLES[Math.floor(Math.random() * COMPLAINT_TITLES.length)],
            name: NAMES_FIRST[Math.floor(Math.random() * NAMES_FIRST.length)] + ' ' + NAMES_LAST[Math.floor(Math.random() * NAMES_LAST.length)],
            district: district.name,
            agency: district.agency,
            category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)].name,
            categoryId: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)].id,
            status: status,
            priority: PRIORITIES[Math.floor(Math.random() * PRIORITIES.length)],
            source: SOURCES[Math.floor(Math.random() * SOURCES.length)],
            date: date.toISOString().split('T')[0],
            dateFormatted: formatDate(date)
        });
    }
    return complaints.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function formatDate(d) {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}/${d.getFullYear()}`;
}

const allComplaints = generateComplaints(200);

// Connected Systems
const connectedSystems = [
    { name: 'MBKT - Sistem Aduan Dalaman', type: 'api', status: 'online', records: 4328, lastSync: '2 min lalu', detail: 'REST API v2.1 - Majlis Bandaraya Kuala Terengganu' },
    { name: 'MPK Kemaman - eKomplain', type: 'api', status: 'online', records: 2156, lastSync: '5 min lalu', detail: 'REST API v1.4 - Majlis Perbandaran Kemaman' },
    { name: 'JKR Terengganu', type: 'api', status: 'online', records: 1823, lastSync: '12 min lalu', detail: 'REST API v3.0 - Jabatan Kerja Raya Negeri' },
    { name: 'SAJ (Bekalan Air)', type: 'api', status: 'syncing', records: 987, lastSync: 'Sedang sinkron...', detail: 'REST API v1.2 - Syarikat Air Johor (Terengganu)' },
    { name: 'TNB Terengganu', type: 'api', status: 'online', records: 1543, lastSync: '8 min lalu', detail: 'REST API v2.0 - Tenaga Nasional Berhad' },
    { name: 'MD Marang - Laporan Bulanan', type: 'csv', status: 'online', records: 1876, lastSync: '14 Apr 2026', detail: 'CSV Upload - Laporan bulanan aduan daerah' },
    { name: 'MDHT - Laporan Mingguan', type: 'csv', status: 'offline', records: 1615, lastSync: '10 Apr 2026', detail: 'CSV Upload - Laporan mingguan Hulu Terengganu' }
];

// Sync History
const syncHistory = [
    { time: '10:24 MYT', system: 'MBKT', type: 'API', records: 14, status: 'success', duration: '1.2s' },
    { time: '10:22 MYT', system: 'JKR Terengganu', type: 'API', records: 8, status: 'success', duration: '0.9s' },
    { time: '10:19 MYT', system: 'SAJ', type: 'API', records: 23, status: 'syncing', duration: '-' },
    { time: '10:15 MYT', system: 'TNB Terengganu', type: 'API', records: 5, status: 'success', duration: '0.7s' },
    { time: '10:12 MYT', system: 'MPK Kemaman', type: 'API', records: 11, status: 'success', duration: '1.1s' },
    { time: '09:00 MYT', system: 'MD Marang', type: 'CSV', records: 47, status: 'success', duration: '3.4s' },
    { time: 'Semalam', system: 'MDHT', type: 'CSV', records: 32, status: 'error', duration: '- (tamat masa)' }
];

// Agency performance data
const agencyPerf = [
    { name: 'MBKT', rate: 89, color: '#10b981' },
    { name: 'MPK Kemaman', rate: 82, color: '#10b981' },
    { name: 'MPD Dungun', rate: 76, color: '#3b82f6' },
    { name: 'MD Marang', rate: 71, color: '#3b82f6' },
    { name: 'MDHT', rate: 64, color: '#f59e0b' },
    { name: 'MD Setiu', rate: 68, color: '#f59e0b' },
    { name: 'MD Besut', rate: 73, color: '#3b82f6' }
];

// ============ NAVIGATION ============
function switchView(viewName) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    const view = document.getElementById('view-' + viewName);
    const nav = document.getElementById('nav-' + viewName);

    if (view) view.classList.add('active');
    if (nav) nav.classList.add('active');

    // Close mobile sidebar
    document.getElementById('sidebar').classList.remove('open');
}

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const viewName = item.dataset.view;
        switchView(viewName);
    });
});

// Mobile menu toggle
document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
});

// ============ POPULATE DASHBOARD ============
function populateRecentTable() {
    const tbody = document.getElementById('recentBody');
    const recent = allComplaints.slice(0, 8);
    tbody.innerHTML = recent.map(c => `
        <tr>
            <td><span style="font-family: 'JetBrains Mono', monospace; font-weight:600; color: var(--accent-cyan);">${c.id}</span></td>
            <td style="max-width: 240px; overflow: hidden; text-overflow: ellipsis;">${c.title}</td>
            <td>${c.district}</td>
            <td>${c.agency}</td>
            <td><span class="status-badge status-${c.status}">${STATUS_LABELS[c.status]}</span></td>
            <td>${c.dateFormatted}</td>
        </tr>
    `).join('');
}

function populateAgencyList() {
    const container = document.getElementById('agencyList');
    container.innerHTML = agencyPerf.map(a => `
        <div class="agency-row">
            <span class="agency-name">${a.name}</span>
            <div class="agency-bar-wrap">
                <div class="agency-bar" style="width: ${a.rate}%; background: ${a.color};"></div>
            </div>
            <span class="agency-rate" style="color: ${a.color};">${a.rate}%</span>
        </div>
    `).join('');
}

function populateIntegrationMini() {
    const container = document.getElementById('integrationMini');
    container.innerHTML = connectedSystems.map(s => `
        <div class="integ-mini-row">
            <span class="system-status-dot ${s.status}"></span>
            <span class="integ-mini-name">${s.name}</span>
            <span class="integ-mini-type">${s.type.toUpperCase()}</span>
        </div>
    `).join('');
}

// ============ POPULATE OPERATIONS ============
function populateOpsTable() {
    const tbody = document.getElementById('opsBody');
    const rows = allComplaints.slice(0, 20);
    tbody.innerHTML = rows.map(c => `
        <tr>
            <td><span style="font-family: 'JetBrains Mono', monospace; font-weight:600; color: var(--accent-cyan);">${c.id}</span></td>
            <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis;">${c.title}</td>
            <td>${c.name}</td>
            <td>${c.district}</td>
            <td>${c.category}</td>
            <td>${c.agency}</td>
            <td><span class="priority-badge-cell ${c.priority}">${PRIORITY_LABELS[c.priority]}</span></td>
            <td><span class="status-badge status-${c.status}">${STATUS_LABELS[c.status]}</span></td>
            <td><span class="source-badge source-${c.source}">${SOURCE_LABELS[c.source]}</span></td>
            <td>${c.dateFormatted}</td>
        </tr>
    `).join('');
}

// ============ POPULATE INTEGRATIONS ============
function populateSystemsList() {
    const container = document.getElementById('systemsList');
    container.innerHTML = connectedSystems.map(s => `
        <div class="system-card" data-type="${s.type}">
            <span class="system-status-dot ${s.status}"></span>
            <div class="system-info">
                <div class="system-name">${s.name}</div>
                <div class="system-detail">${s.detail}</div>
            </div>
            <span class="system-type ${s.type}">${s.type.toUpperCase()}</span>
            <div>
                <div class="system-last-sync">${s.lastSync}</div>
                <div class="system-detail">${s.records.toLocaleString()} rekod</div>
            </div>
        </div>
    `).join('');
}

function populateSyncHistory() {
    const tbody = document.getElementById('syncBody');
    tbody.innerHTML = syncHistory.map(s => {
        let statusBadge = '';
        if (s.status === 'success') statusBadge = '<span class="status-badge status-resolved">Berjaya</span>';
        else if (s.status === 'syncing') statusBadge = '<span class="status-badge status-in-progress">Sinkron</span>';
        else statusBadge = '<span class="status-badge status-escalated">Gagal</span>';

        return `
            <tr>
                <td>${s.time}</td>
                <td>${s.system}</td>
                <td><span class="source-badge source-${s.type.toLowerCase()}">${s.type}</span></td>
                <td>${s.records}</td>
                <td>${statusBadge}</td>
                <td>${s.duration}</td>
            </tr>
        `;
    }).join('');
}

// Integration tab filters
document.querySelectorAll('.card-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.card-tabs .tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.dataset.tab;
        document.querySelectorAll('.system-card').forEach(card => {
            if (tab === 'all' || card.dataset.type === tab) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ============ POPULATE ANALYTICS ============
function populateDistrictHeatmap() {
    const container = document.getElementById('districtHeatmap');
    const counts = {};
    DISTRICTS.forEach(d => { counts[d.name] = 0; });
    allComplaints.forEach(c => { if (counts[c.district] !== undefined) counts[c.district]++; });

    const maxCount = Math.max(...Object.values(counts));

    container.innerHTML = DISTRICTS.map(d => {
        const count = counts[d.name];
        const intensity = Math.max(0.15, count / maxCount);
        const bgColor = `rgba(59, 130, 246, ${intensity})`;
        return `
            <div class="heatmap-cell" style="background: ${bgColor};">
                <span class="hm-district">${d.name}</span>
                <span class="hm-count">${count}</span>
            </div>
        `;
    }).join('');
}

function populateSLAGauges() {
    const container = document.getElementById('slaGauges');
    const slaData = [
        { label: 'Respons dalam 24 jam', pct: 94, color: 'var(--accent-green)' },
        { label: 'Selesai dalam 7 hari', pct: 78, color: 'var(--accent-blue)' },
        { label: 'Eskalaikan dalam 3 hari', pct: 85, color: 'var(--accent-cyan)' },
        { label: 'Kepuasan pelanggan', pct: 71, color: 'var(--accent-amber)' }
    ];

    container.innerHTML = slaData.map(s => `
        <div class="sla-item">
            <div class="sla-label">
                <span>${s.label}</span>
                <span style="color: ${s.color};">${s.pct}%</span>
            </div>
            <div class="sla-bar-wrap">
                <div class="sla-bar" style="width: ${s.pct}%; background: ${s.color};"></div>
            </div>
        </div>
    `).join('');
}

// ============ CHARTS ============
const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
            labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } }
        }
    },
    scales: {
        x: {
            ticks: { color: '#64748b', font: { family: 'Inter', size: 10 } },
            grid: { color: 'rgba(148, 163, 184, 0.06)' }
        },
        y: {
            ticks: { color: '#64748b', font: { family: 'Inter', size: 10 } },
            grid: { color: 'rgba(148, 163, 184, 0.06)' }
        }
    }
};

function initTrendChart() {
    const ctx = document.getElementById('trendChart').getContext('2d');
    const labels = [];
    const dataIn = [];
    const dataOut = [];
    for (let i = 29; i >= 0; i--) {
        const d = new Date(Date.now() - i * 86400000);
        labels.push(`${d.getDate()}/${d.getMonth() + 1}`);
        dataIn.push(Math.floor(Math.random() * 30) + 25);
        dataOut.push(Math.floor(Math.random() * 25) + 18);
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: 'Aduan Masuk',
                    data: dataIn,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.08)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#3b82f6'
                },
                {
                    label: 'Aduan Selesai',
                    data: dataOut,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.06)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: '#10b981'
                }
            ]
        },
        options: {
            ...chartDefaults,
            interaction: { intersect: false, mode: 'index' },
            plugins: {
                ...chartDefaults.plugins,
                tooltip: {
                    backgroundColor: '#0c1221',
                    borderColor: 'rgba(148, 163, 184, 0.12)',
                    borderWidth: 1,
                    titleFont: { family: 'Inter', weight: '600' },
                    bodyFont: { family: 'Inter' },
                    padding: 10,
                    cornerRadius: 8
                }
            }
        }
    });
}

function initCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    const catCounts = {};
    CATEGORIES.forEach(c => { catCounts[c.name] = 0; });
    allComplaints.forEach(c => { if (catCounts[c.category] !== undefined) catCounts[c.category]++; });

    const colors = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#f97316'];

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(catCounts),
            datasets: [{
                data: Object.values(catCounts),
                backgroundColor: colors,
                borderColor: '#060a14',
                borderWidth: 3,
                hoverOffset: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '68%',
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: '#94a3b8',
                        font: { family: 'Inter', size: 10 },
                        padding: 10,
                        usePointStyle: true,
                        pointStyleWidth: 8,
                        boxHeight: 6
                    }
                },
                tooltip: {
                    backgroundColor: '#0c1221',
                    borderColor: 'rgba(148, 163, 184, 0.12)',
                    borderWidth: 1,
                    cornerRadius: 8
                }
            }
        }
    });
}

function initResolutionChart() {
    const ctx = document.getElementById('resolutionChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: agencyPerf.map(a => a.name),
            datasets: [{
                label: 'Purata Hari',
                data: [2.1, 2.8, 3.5, 4.1, 5.2, 4.6, 3.9],
                backgroundColor: agencyPerf.map(a => a.color + '33'),
                borderColor: agencyPerf.map(a => a.color),
                borderWidth: 1,
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            ...chartDefaults,
            plugins: {
                ...chartDefaults.plugins,
                tooltip: {
                    backgroundColor: '#0c1221',
                    borderColor: 'rgba(148, 163, 184, 0.12)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: (ctx) => `Purata: ${ctx.raw} hari`
                    }
                }
            }
        }
    });
}

function initSourceChart() {
    const ctx = document.getElementById('sourceChart').getContext('2d');
    const srcCounts = { portal: 0, api: 0, csv: 0, phone: 0 };
    allComplaints.forEach(c => { if (srcCounts[c.source] !== undefined) srcCounts[c.source]++; });

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Portal Awam', 'API Agensi', 'CSV Import', 'Telefon'],
            datasets: [{
                data: [srcCounts.portal, srcCounts.api, srcCounts.csv, srcCounts.phone],
                backgroundColor: ['#3b82f6', '#06b6d4', '#8b5cf6', '#f59e0b'],
                borderColor: '#060a14',
                borderWidth: 3,
                hoverOffset: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '68%',
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: '#94a3b8',
                        font: { family: 'Inter', size: 10 },
                        padding: 10,
                        usePointStyle: true,
                        pointStyleWidth: 8,
                        boxHeight: 6
                    }
                }
            }
        }
    });
}

function initPriorityChart() {
    const ctx = document.getElementById('priorityChart').getContext('2d');

    // Group by category and priority
    const catLabels = CATEGORIES.map(c => c.name);
    const priorityData = {};
    PRIORITIES.forEach(p => { priorityData[p] = new Array(CATEGORIES.length).fill(0); });
    allComplaints.forEach(c => {
        const catIdx = CATEGORIES.findIndex(cat => cat.name === c.category);
        if (catIdx >= 0) priorityData[c.priority][catIdx]++;
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: catLabels,
            datasets: [
                { label: 'Rendah', data: priorityData.low, backgroundColor: '#64748b88', borderRadius: 4 },
                { label: 'Sederhana', data: priorityData.medium, backgroundColor: '#f59e0b88', borderRadius: 4 },
                { label: 'Tinggi', data: priorityData.high, backgroundColor: '#f9731688', borderRadius: 4 },
                { label: 'Kritikal', data: priorityData.critical, backgroundColor: '#ef444488', borderRadius: 4 }
            ]
        },
        options: {
            ...chartDefaults,
            plugins: {
                ...chartDefaults.plugins,
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#94a3b8',
                        font: { family: 'Inter', size: 10 },
                        usePointStyle: true,
                        pointStyleWidth: 8,
                        boxHeight: 6,
                        padding: 16
                    }
                }
            },
            scales: {
                ...chartDefaults.scales,
                x: {
                    ...chartDefaults.scales.x,
                    stacked: true,
                    ticks: {
                        ...chartDefaults.scales.x.ticks,
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    ...chartDefaults.scales.y,
                    stacked: true,
                    beginAtZero: true
                }
            }
        }
    });
}

// ============ FORM HANDLING ============
document.getElementById('complaintForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = `EA-2026-04-${String(Math.floor(Math.random() * 90000) + 10000)}`;
    document.getElementById('modalId').textContent = id;
    document.getElementById('successModal').classList.add('show');
    e.target.reset();
});

function closeModal() {
    document.getElementById('successModal').classList.remove('show');
}

// Tracker
document.getElementById('trackBtn').addEventListener('click', () => {
    const trackerId = document.getElementById('trackerId').value.trim();
    const resultContainer = document.getElementById('trackerResult');

    if (!trackerId) {
        resultContainer.innerHTML = `
            <div class="tracker-placeholder">
                <span class="material-symbols-rounded">warning</span>
                <p>Sila masukkan ID aduan</p>
            </div>
        `;
        return;
    }

    // Simulate tracking result
    resultContainer.innerHTML = `
        <div style="padding: 8px 0;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                <span style="font-family: 'JetBrains Mono', monospace; font-weight: 600; color: var(--accent-cyan);">${trackerId}</span>
                <span class="status-badge status-in-progress">Dalam Tindakan</span>
            </div>
            <div class="tracker-timeline">
                <div class="tracker-step">
                    <div class="tracker-dot done">
                        <span class="material-symbols-rounded">check</span>
                    </div>
                    <div class="tracker-info">
                        <strong>Aduan Diterima</strong>
                        <span>14/04/2026 - 09:15 MYT</span>
                    </div>
                </div>
                <div class="tracker-step">
                    <div class="tracker-dot done">
                        <span class="material-symbols-rounded">check</span>
                    </div>
                    <div class="tracker-info">
                        <strong>Disahkan & Ditugaskan</strong>
                        <span>14/04/2026 - 11:30 MYT - MBKT</span>
                    </div>
                </div>
                <div class="tracker-step">
                    <div class="tracker-dot active">
                        <span class="material-symbols-rounded">pending</span>
                    </div>
                    <div class="tracker-info">
                        <strong>Dalam Tindakan</strong>
                        <span>15/04/2026 - Pasukan teknikal di lokasi</span>
                    </div>
                </div>
                <div class="tracker-step">
                    <div class="tracker-dot pending">
                        <span class="material-symbols-rounded">circle</span>
                    </div>
                    <div class="tracker-info">
                        <strong>Penyelesaian</strong>
                        <span>Menunggu</span>
                    </div>
                </div>
            </div>
        </div>
    `;
});

// CSV Export simulation
document.getElementById('exportCsvBtn').addEventListener('click', () => {
    const header = 'ID,Aduan,Pengadu,Daerah,Kategori,Agensi,Keutamaan,Status,Sumber,Tarikh\n';
    const rows = allComplaints.slice(0, 20).map(c =>
        `${c.id},"${c.title}","${c.name}",${c.district},${c.category},${c.agency},${PRIORITY_LABELS[c.priority]},${STATUS_LABELS[c.status]},${SOURCE_LABELS[c.source]},${c.date}`
    ).join('\n');

    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'eaduan-terengganu-export.csv';
    link.click();
    URL.revokeObjectURL(link.href);
});

// ============ ANIMATE NUMBERS ============
function animateCounter(element, target, duration = 1200) {
    const text = element.textContent.trim();
    const numericTarget = parseInt(target.replace(/[^0-9]/g, ''));
    if (isNaN(numericTarget)) return;

    let start = 0;
    const increment = numericTarget / (duration / 16);
    const suffix = target.replace(/[0-9,]/g, '');

    function update() {
        start += increment;
        if (start >= numericTarget) {
            element.innerHTML = target.includes(',')
                ? numericTarget.toLocaleString() + suffix
                : numericTarget + suffix;
            return;
        }
        element.innerHTML = Math.floor(start).toLocaleString() + suffix;
        requestAnimationFrame(update);
    }
    update();
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
    populateRecentTable();
    populateAgencyList();
    populateIntegrationMini();
    populateOpsTable();
    populateSystemsList();
    populateSyncHistory();
    populateDistrictHeatmap();
    populateSLAGauges();

    // Init charts
    initTrendChart();
    initCategoryChart();
    initResolutionChart();
    initSourceChart();
    initPriorityChart();

    // Animate KPI counters
    setTimeout(() => {
        animateCounter(document.getElementById('kpiTotal'), '1,247');
        animateCounter(document.getElementById('kpiPending'), '342');
        animateCounter(document.getElementById('kpiResolved'), '871');
    }, 300);
});
