// Tab navigation
document.querySelectorAll('.tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.content').forEach(s => s.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.section).classList.add('active');
  });
});

// Chart configs
const charts = [
  { id: 'clusterChart', src: 'clusters.json' },
  { id: 'clusterDiagChart', src: 'cluster_diag.json' },
  { id: 'campanhaChart', src: 'campanha.json' },
  { id: 'clvChart', src: 'clv.json' },
  { id: 'regressaoChart', src: 'regressao.json' }
];

// Load charts
charts.forEach(c => {
  fetch(c.src)
    .then(res => res.json())
    .then(cfg => {
      const ctx = document.getElementById(c.id).getContext('2d');
      new Chart(ctx, cfg);
    });
});

// Table navigation
document.querySelectorAll('.tables-nav button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tables-nav button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.table-content').forEach(tc => tc.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.table + 'Table').classList.add('active');
  });
});

// Load tables
fetch('campanhas_table.json')
  .then(res => res.json())
  .then(data => buildTable('campanhasTable', data));

fetch('transacoes_table.json')
  .then(res => res.json())
  .then(data => buildTable('transacoesTable', data));

function buildTable(containerId, data) {
  const container = document.getElementById(containerId);
  if (!data.length) { container.innerText = 'Nenhum dado disponível.'; return; }
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  Object.keys(data[0]).forEach(key => {
    const th = document.createElement('th');
    th.textContent = key;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  data.forEach(row => {
    const tr = document.createElement('tr');
    Object.keys(row).forEach(key => {
      const td = document.createElement('td');
      td.textContent = row[key];
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.appendChild(table);
}