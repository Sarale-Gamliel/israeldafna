document.getElementById('year').textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll('.problem-list, .approach, .how-grid, #contact-form');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealTargets.forEach((el) => revealObserver.observe(el));

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

    if (response.ok) {
      status.textContent = 'הפנייה נשלחה בהצלחה! נחזור אליך בקרוב.';
      status.classList.add('success');
      form.reset();
    } else {
      throw new Error('Submission failed');
    }
  } catch (err) {
    status.textContent = 'אירעה שגיאה בשליחה. אפשר ליצור קשר ישירות בטלפון או במייל.';
    status.classList.add('error');
  }
});
