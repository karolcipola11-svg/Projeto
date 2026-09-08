const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');

menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#quote-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = `Olá, MSE Marmoraria! Meu nome é ${data.get('nome')}.\nTelefone: ${data.get('telefone')}\nProjeto: ${data.get('projeto')}\nDetalhes: ${data.get('mensagem') || 'A combinar'}`;
  try {
    await navigator.clipboard.writeText(message);
  } catch {
    window.prompt('Copie sua mensagem de orçamento:', message);
    return;
  }
  const toast = document.querySelector('#toast');
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 3200);
});
