document.getElementById('year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = 'שולח...';
  status.className = 'form-status';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error('Submission failed');
    status.textContent = 'הפנייה נשלחה בהצלחה! נחזור אליכם בקרוב.';
    status.classList.add('success');
    form.reset();
  } catch (err) {
    status.textContent = 'אירעה שגיאה בשליחה. אפשר ליצור קשר ישירות בטלפון או במייל.';
    status.classList.add('error');
  }
});
