// document.addEventListener('DOMContentLoaded', () => {
//   const chatForm = document.getElementById('chatForm');
//   const chatInput = document.getElementById('chatInput');
//   const chatMessages = document.getElementById('chatMessages');
//   const viewSlotsBtn = document.getElementById('viewSlotsBtn');
//   const cancelBookingBtn = document.getElementById('cancelBookingBtn');
//   const logoutBtn = document.getElementById('logoutBtn');
//   const updateProfileBtn = document.getElementById('updateProfileBtn');
//   const toggleChatbotBtn = document.getElementById('toggleChatbotBtn');
//   const closeChatbotBtn = document.getElementById('closeChatbotBtn');

//   const slotsSection = document.getElementById('slots');
//   const cancelSection = document.getElementById('cancel');
//   const chatbotSection = document.getElementById('chatbotSection');

//   const cancelForm = document.getElementById('cancelForm');
//   const cancelMessage = document.getElementById('cancelMessage');
//   const slotsInfo = document.getElementById('slots-info');

//   function showSection(section) {
//     [slotsSection, cancelSection].forEach(sec => sec.classList.add('hidden'));
//     if (section) section.classList.remove('hidden');
//   }

//   // View slots
//   viewSlotsBtn.addEventListener('click', async () => {
//     showSection(slotsSection);
//     slotsInfo.textContent = "Loading...";
//     try {
//       const res = await fetch('/api/slots');
//       const data = await res.json();
//       if (res.ok) {
//         slotsInfo.textContent = `Available Slots: ${data.slots}`;
//       } else {
//         slotsInfo.textContent = `Error: ${data.error || "Unable to load slots"}`;
//       }
//     } catch (err) {
//       slotsInfo.textContent = "Failed to load slots.";
//     }
//   });

//   // Cancel booking
//   cancelBookingBtn.addEventListener('click', () => {
//     showSection(cancelSection);
//     cancelMessage.textContent = '';
//   });

//   cancelForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const bookingId = document.getElementById('bookingId').value;
//     try {
//       const res = await fetch(`/api/cancelBooking/${bookingId}`, {
//         method: 'DELETE'
//       });
//       const data = await res.json();
//       if (data.success) {
//         cancelMessage.textContent = "Booking cancelled successfully!";
//         cancelMessage.style.color = "green";
//       } else {
//         cancelMessage.textContent = data.message || "Cancellation failed.";
//         cancelMessage.style.color = "red";
//       }
//     } catch (err) {
//       cancelMessage.textContent = "Error cancelling booking.";
//       cancelMessage.style.color = "red";
//     }
//   });

//   // Logout
//   logoutBtn.addEventListener('click', async () => {
//     window.location.href = "/logout";
//   });

//   // Update profile (placeholder)
//   updateProfileBtn.addEventListener('click', () => {
//     window.location.href="profile.html"
//   });

//   // Chatbot UI toggle
//   toggleChatbotBtn.addEventListener('click', () => {
//     chatbotSection.classList.remove('hidden');
//   });

//   closeChatbotBtn.addEventListener('click', () => {
//     chatbotSection.classList.add('hidden');
//   });

//   // Chatbot logic
//   chatForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const input = chatInput.value.trim();
//     if (!input) return;

//     addMessage(input, 'user');
//     const response = getBotResponse(input);
//     addMessage(response, 'bot');
//     chatInput.value = '';
//   });

//   function addMessage(message, sender) {
//     const msgDiv = document.createElement('div');
//     msgDiv.classList.add('chat-message', sender);
//     msgDiv.textContent = message;
//     chatMessages.appendChild(msgDiv);
//     chatMessages.scrollTop = chatMessages.scrollHeight;
//   }

//   function getBotResponse(input) {
//     const lower = input.toLowerCase();

//     if (lower.includes("book")) return "To book a hostel room, go to 'Book Hostel' and fill the form.";
//     if (lower.includes("slot")) return "Click 'View Slots Left' to see available rooms.";
//     if (lower.includes("cancel")) return "Use the 'Cancel Booking' section and enter your Booking ID.";
//     if (lower.includes("receipt")) return "Go to 'Download Receipt' to get your booking receipt.";
//     if (lower.includes("profile")) return "Click 'Update Profile' to update your details.";
//     if (lower.includes("check-in")) return "Check-in starts at 2 PM. Checkout is before 11 AM.";
//     if (lower.includes("wifi") || lower.includes("internet")) return "Wi-Fi is available in all hostel rooms.";
//     if (lower.includes("payment")) return "We accept UPI, cards, and net banking.";
//     if (lower.includes("refund")) return "Refunds are available for cancellations 24 hours in advance.";
//     if (lower.includes("help")) return "For help, email hostel.support@srm.com.";
//     return "I'm here to assist! Try asking about bookings, slots, or receipts.";
//   }
// });

document.addEventListener('DOMContentLoaded', () => {
  // Set username from localStorage or fallback
  const storedUsername = localStorage.getItem('username') || 'User';
  document.getElementById('userName').textContent = storedUsername;
  document.getElementById('userNameHeader').textContent = ', ' + storedUsername;

  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  const viewSlotsBtn = document.getElementById('viewSlotsBtn');
  const cancelBookingBtn = document.getElementById('cancelBookingBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const updateProfileBtn = document.getElementById('updateProfileBtn');
  const toggleChatbotBtn = document.getElementById('toggleChatbotBtn');
  const closeChatbotBtn = document.getElementById('closeChatbotBtn');

  const slotsSection = document.getElementById('slots');
  const cancelSection = document.getElementById('cancel');
  const chatbotSection = document.getElementById('chatbotSection');

  const cancelForm = document.getElementById('cancelForm');
  const cancelMessage = document.getElementById('cancelMessage');
  const slotsInfo = document.getElementById('slots-info');

  function showSection(section) {
    [slotsSection, cancelSection].forEach(sec => sec.classList.add('hidden'));
    if (section) section.classList.remove('hidden');
  }

  // View slots
  viewSlotsBtn.addEventListener('click', async () => {
    showSection(slotsSection);
    slotsInfo.textContent = "Loading...";
    try {
      const res = await fetch('/api/slots');
      const data = await res.json();
      if (res.ok) {
        slotsInfo.textContent = `Available Slots: ${data.slots}`;
      } else {
        slotsInfo.textContent = `Error: ${data.error || "Unable to load slots"}`;
      }
    } catch (err) {
      slotsInfo.textContent = "Failed to load slots.";
    }
  });

  // Cancel booking
  cancelBookingBtn.addEventListener('click', () => {
    showSection(cancelSection);
    cancelMessage.textContent = '';
  });

  cancelForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const bookingId = document.getElementById('bookingId').value;
    try {
      const res = await fetch(`/api/cancelBooking/${bookingId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        cancelMessage.textContent = "Booking cancelled successfully!";
        cancelMessage.style.color = "green";
      } else {
        cancelMessage.textContent = data.message || "Cancellation failed.";
        cancelMessage.style.color = "red";
      }
    } catch (err) {
      cancelMessage.textContent = "Error cancelling booking.";
      cancelMessage.style.color = "red";
    }
  });

  // Logout
  logoutBtn.addEventListener('click', async () => {
    window.location.href = "/logout";
  });

  // Update profile - go to profile.html page
  updateProfileBtn.addEventListener('click', () => {
    window.location.href = "profile.html";
  });

  // Chatbot UI toggle
  toggleChatbotBtn.addEventListener('click', () => {
    chatbotSection.classList.remove('hidden');
  });

  closeChatbotBtn.addEventListener('click', () => {
    chatbotSection.classList.add('hidden');
  });

  // Chatbot logic
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = chatInput.value.trim();
    if (!input) return;

    addMessage(input, 'user');
    const response = getBotResponse(input);
    addMessage(response, 'bot');
    chatInput.value = '';
  });

  function addMessage(message, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-message', sender);
    msgDiv.textContent = message;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getBotResponse(input) {
    const lower = input.toLowerCase();

    if (lower.includes("book")) return "To book a hostel room, go to 'Book Hostel' and fill the form.";
    if (lower.includes("slot")) return "Click 'View Slots Left' to see available rooms.";
    if (lower.includes("cancel")) return "Use the 'Cancel Booking' section and enter your Booking ID.";
    if (lower.includes("receipt")) return "Go to 'Download Receipt' to get your booking receipt.";
    if (lower.includes("profile")) return "Click 'Update Profile' to update your details.";
    if (lower.includes("check-in")) return "Check-in starts at 2 PM. Checkout is before 11 AM.";
    if (lower.includes("wifi") || lower.includes("internet")) return "Wi-Fi is available in all hostel rooms.";
    if (lower.includes("payment")) return "We accept UPI, cards, and net banking.";
    if (lower.includes("refund")) return "Refunds are available for cancellations 24 hours in advance.";
    if (lower.includes("help")) return "For help, email hostel.support@srm.com.";
    return "I'm here to assist! Try asking about bookings, slots, or receipts.";
  }
});


