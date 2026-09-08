// ALTERE AQUI: código do país + DDD + número, usando somente algarismos.
// Exemplo para Sorocaba: 5515999999999
const WHATSAPP_NUMBER = '5515999999999';

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');

function closeMenu() {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}

menuButton.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const defaultMessage = 'Olá, MSE Marmoraria! Gostaria de solicitar um orçamento.';
document.querySelectorAll('.whatsapp-link').forEach((link) => {
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultMessage)}`;
});

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#quote-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = `Olá, MSE Marmoraria! Gostaria de solicitar um orçamento.\n\nNome: ${data.get('nome')}\nTelefone: ${data.get('telefone')}\nProjeto: ${data.get('projeto')}\nMensagem: ${data.get('mensagem') || 'A combinar'}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});
