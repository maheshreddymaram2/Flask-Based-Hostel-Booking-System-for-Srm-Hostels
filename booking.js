document.querySelectorAll(".select-room-btn").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".room-card");
    const roomType = card.querySelector("h2").textContent;

    // Store selected room in localStorage
    localStorage.setItem("selectedRoomType", roomType);

    // Redirect to booking form
    window.location.href = "bookingform.html";
  });
});
