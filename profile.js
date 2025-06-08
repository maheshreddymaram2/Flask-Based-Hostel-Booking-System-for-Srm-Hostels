document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('profileForm');
  const message = document.getElementById('message');

  // Load profile data
  fetch('/api/profile')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load profile');
      return res.json();
    })
    .then(data => {
      document.getElementById('name').value = data.name || '';
      document.getElementById('email').value = data.email || '';
      document.getElementById('phone').value = data.phone || '';
    })
    .catch(() => {
      message.textContent = 'Could not load profile data.';
      message.style.color = 'red';
    });

  // Handle form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    message.textContent = '';

    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
    };

    fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          message.textContent = data.message || 'Profile updated successfully.';
          message.style.color = 'green';

          // Save updated name to localStorage
          localStorage.setItem('username', payload.name);

          // Optional: redirect to dashboard after 1 second
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 1000);
        } else {
          message.textContent = data.error || 'Update failed.';
          message.style.color = 'red';
        }
      })
      .catch(() => {
        message.textContent = 'Error updating profile.';
        message.style.color = 'red';
      });
  });
});
