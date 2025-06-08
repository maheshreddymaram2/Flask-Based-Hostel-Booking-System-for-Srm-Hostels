document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const password = signupForm.password.value;
      const confirmPassword = signupForm.confirmPassword.value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      alert("Account created successfully!");
      // Add actual server logic here
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Logged in successfully!");
      // Add actual server login logic here
    });
  }
});

