// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("bookingForm");
//   const confirmation = document.getElementById("confirmation");
//   const bookingIdDisplay = document.getElementById("bookingIdDisplay");

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     // Check validity via HTML5 validation API
//     if (!form.checkValidity()) {
//       form.reportValidity();
//       return;
//     }

//     // Collect form data
//     const formData = new FormData(form);
//     const bookingData = Object.fromEntries(formData.entries());

//     // Generate booking ID (e.g., BK + timestamp + random number)
//     const bookingId = 'BK' + Date.now() + Math.floor(Math.random() * 900 + 100);
//     bookingData.bookingId = bookingId;

//     // Add booking date/time
//     bookingData.bookingDate = new Date().toLocaleString();

//     // Save booking data to localStorage
//     localStorage.setItem('latestBooking', JSON.stringify(bookingData));

//     // Hide form, show confirmation
//     form.classList.add("hidden");
//     bookingIdDisplay.textContent = `Your Booking ID: ${bookingId}`;
//     confirmation.classList.remove("hidden");

//     // Redirect to receipt.html after 3 seconds
//     setTimeout(() => {
//       window.location.href = "receipt.html";
//     }, 3000);
//   });
// });
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  const confirmation = document.getElementById("confirmation");
  const bookingIdDisplay = document.getElementById("bookingIdDisplay");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Collect form data
    const formData = new FormData(form);
    const bookingData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        throw new Error('Booking failed. Please try again.');
      }

      const data = await response.json();
      // Assuming backend returns { success: true, bookingId: "BK123456" }

      form.classList.add("hidden");
      bookingIdDisplay.textContent = `Your Booking ID: ${data.bookingId}`;
      confirmation.classList.remove("hidden");

      setTimeout(() => {
        window.location.href = "receipt.html";
      }, 3000);
    } catch (error) {
      alert(error.message);
    }
  });
});
