const form = document.getElementById('feedbackForm');
const responseMsg = document.getElementById('responseMsg');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  responseMsg.textContent = `Thank you for your feedback, ${name}! 🌿`;
  form.reset();
});

