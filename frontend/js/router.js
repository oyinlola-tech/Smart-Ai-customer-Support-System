const sections = document.querySelectorAll('.section');
const navButtons = document.querySelectorAll('.nav-item');
const pageTitle = document.getElementById('page-title');

const titleMap = {
  dashboard: 'Dashboard',
  chat: 'AI Chat',
  sales: 'Sales Reply',
  intent: 'Intent Detection',
  product: 'Product Q&A',
  summary: 'Summarization'
  ,
  whatsapp: 'WhatsApp'
};

export const showSection = (id) => {
  sections.forEach((section) => {
    section.classList.toggle('active', section.id === id);
  });
  navButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.section === id);
  });
  pageTitle.textContent = titleMap[id] || 'Dashboard';
  const path = id === 'dashboard' ? '/' : `/${id}`;
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path);
  }
};
export const initRouter = () => {
  document.getElementById('nav').addEventListener('click', (event) => {
    const button = event.target.closest('button[data-section]');
    if (!button) return;
    showSection(button.dataset.section);
  });

  document.querySelectorAll('[data-go]').forEach((button) => {
    button.addEventListener('click', () => showSection(button.dataset.go));
  });

  window.addEventListener('popstate', () => {
    const id = window.location.pathname.replace('/', '') || 'dashboard';
    showSection(id);
  });

  const initial = window.location.pathname.replace('/', '') || 'dashboard';
  showSection(initial);
};
