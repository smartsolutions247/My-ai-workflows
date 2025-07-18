
let templates = [];
let filteredTemplates = [];

fetch('templates.js')
  .then(res => res.text())
  .then(data => {
    templates = eval(data);
    renderCategories();
    renderTemplates(templates);
  });

function renderCategories() {
  const categories = [...new Set(templates.map(t => t.category))].sort();
  const list = document.getElementById('category-list');
  categories.forEach(cat => {
    const li = document.createElement('li');
    li.textContent = cat;
    li.onclick = () => {
      filteredTemplates = templates.filter(t => t.category === cat);
      renderTemplates(filteredTemplates);
    };
    list.appendChild(li);
  });
}

function renderTemplates(data) {
  const container = document.getElementById('templates-container');
  container.innerHTML = '';
  data.forEach(t => {
    const div = document.createElement('div');
    div.className = 'template-card';
    div.innerHTML = `
      <h3>${t.name}</h3>
      <p>${t.description}</p>
      <p><strong>Score:</strong> ${t.score} | <strong>Price:</strong> $${t.price.toFixed(2)}</p>
      <a href="${t.url}" target="_blank">Open Workflow</a>
    `;
    container.appendChild(div);
  });
}

document.getElementById('search-input').addEventListener('input', function() {
  const term = this.value.toLowerCase();
  const results = templates.filter(t =>
    t.name.toLowerCase().includes(term) || t.description.toLowerCase().includes(term)
  );
  renderTemplates(results);
});
