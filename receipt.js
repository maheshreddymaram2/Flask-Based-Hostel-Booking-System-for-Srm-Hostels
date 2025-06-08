// document.addEventListener("DOMContentLoaded", () => {
//   const receiptDetails = document.getElementById("receiptDetails");
//   const downloadPdfBtn = document.getElementById("downloadPdfBtn");
//   const backDashboardBtn = document.getElementById("backDashboardBtn");

//   const bookingData = JSON.parse(localStorage.getItem("latestBooking"));

//   if (!bookingData) {
//     receiptDetails.innerHTML = "<p>No booking data found. Please make a booking first.</p>";
//     downloadPdfBtn.style.display = "none";
//     return;
//   }

//   // Show booking details on page
//   receiptDetails.innerHTML = `
//     <p><strong>Booking ID:</strong> ${bookingData.bookingId}</p>
//     <p><strong>Name:</strong> ${bookingData.name}</p>
//     <p><strong>Email:</strong> ${bookingData.email}</p>
//     <p><strong>Phone:</strong> ${bookingData.phone}</p>
//     <p><strong>Gender:</strong> ${bookingData.gender}</p>
//     <p><strong>Room Type:</strong> ${bookingData.roomType}</p>
//     <p><strong>Cot Preference:</strong> ${bookingData.preference}</p>
//     <p><strong>Booking Date:</strong> ${bookingData.bookingDate}</p>
//   `;

//   downloadPdfBtn.addEventListener("click", () => {
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF();

//     // Draw border rectangle
//     doc.setDrawColor("#1D4ED8"); // deeper blue border
//     doc.setLineWidth(1.8);
//     doc.rect(10, 10, 190, 270);

//     // Header background (taller and moved slightly down)
//     doc.setFillColor("#2563EB"); // bright blue
//     doc.rect(10, 10, 190, 45, "F");

//     // Header text - hostel name
//     doc.setFontSize(22);
//     doc.setTextColor("#FFFFFF");
//     doc.setFont("helvetica", "bold");
//     doc.text("SRM Hostel Booking Receipt", 105, 35, { align: "center" });

//     // Hostel address and contact below header
//     doc.setFontSize(11);
//     doc.setTextColor("#E0E7FF"); // lighter blue for subtle contrast
//     doc.setFont("helvetica", "normal");
//     doc.text("SRM Nagar, Kattankulathur, Chennai - 603203", 105, 42, { align: "center" });
//     doc.text("Email: contact@srmhostel.com | Phone: +91-9876543210", 105, 48, { align: "center" });

//     // Section title - Booking Details
//     doc.setFontSize(15);
//     doc.setTextColor("#1E40AF"); // darker blue
//     doc.setFont("helvetica", "bold");
//     doc.text("Booking Details", 20, 65);

//     // Print booking info with labels in a teal-ish color and values in dark gray
//     doc.setFontSize(12);
//     let y = 75;
//     for (const [key, value] of Object.entries(bookingData)) {
//       // Format key nicely
//       const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1");

//       // Label in teal blue
//       doc.setTextColor("#0D9488");
//       doc.setFont("helvetica", "bold");
//       doc.text(`${label}:`, 20, y);

//       // Value in dark gray, offset a bit right
//       doc.setTextColor("#111111");
//       doc.setFont("helvetica", "normal");
//       doc.text(`${value}`, 70, y);

//       y += 10;
//     }

//     // Footer thank you message (above bottom border)
//     doc.setFontSize(11);
//     doc.setTextColor("#475569"); // muted gray-blue
//     doc.text(
//       "Thank you for choosing SRM Hostel. We look forward to your stay!",
//       105,
//       285,
//       { align: "center" }
//     );

//     // Save PDF
//     doc.save(`BookingReceipt_${bookingData.bookingId}.pdf`);
//   });

//   backDashboardBtn.addEventListener("click", () => {
//     window.location.href = "/dashboard";
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const receiptDetails = document.getElementById("receiptDetails");
//   const downloadPdfBtn = document.getElementById("downloadPdfBtn");
//   const backDashboardBtn = document.getElementById("backDashboardBtn");

//   const bookingData = JSON.parse(localStorage.getItem("latestBooking"));

//   if (!bookingData) {
//     receiptDetails.innerHTML = "<p>No booking data found. Please make a booking first.</p>";
//     downloadPdfBtn.style.display = "none";
//     return;
//   }

//   // Submit to server only if not already done
//   if (!bookingData.submittedToServer) {
//     fetch('/submit_booking', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(bookingData)
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Booking saved to server:', data);
//         bookingData.submittedToServer = true;
//         localStorage.setItem('latestBooking', JSON.stringify(bookingData));
//       })
//       .catch(error => {
//         console.error('Error saving booking:', error);
//       });
//   }

//   // Show booking details on page
//   receiptDetails.innerHTML = `
//     <p><strong>Booking ID:</strong> ${bookingData.bookingId}</p>
//     <p><strong>Name:</strong> ${bookingData.name}</p>
//     <p><strong>Email:</strong> ${bookingData.email}</p>
//     <p><strong>Phone:</strong> ${bookingData.phone}</p>
//     <p><strong>Gender:</strong> ${bookingData.gender}</p>
//     <p><strong>Room Type:</strong> ${bookingData.roomType}</p>
//     <p><strong>Cot Preference:</strong> ${bookingData.preference}</p>
//     <p><strong>Booking Date:</strong> ${bookingData.bookingDate}</p>
//   `;

//   downloadPdfBtn.addEventListener("click", () => {
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF();

//     // Draw border rectangle
//     doc.setDrawColor("#1D4ED8");
//     doc.setLineWidth(1.8);
//     doc.rect(10, 10, 190, 270);

//     // Header
//     doc.setFillColor("#2563EB");
//     doc.rect(10, 10, 190, 45, "F");

//     doc.setFontSize(22);
//     doc.setTextColor("#FFFFFF");
//     doc.setFont("helvetica", "bold");
//     doc.text("SRM Hostel Booking Receipt", 105, 35, { align: "center" });

//     doc.setFontSize(11);
//     doc.setTextColor("#E0E7FF");
//     doc.setFont("helvetica", "normal");
//     doc.text("SRM Nagar, Kattankulathur, Chennai - 603203", 105, 42, { align: "center" });
//     doc.text("Email: contact@srmhostel.com | Phone: +91-9876543210", 105, 48, { align: "center" });

//     // Section title
//     doc.setFontSize(15);
//     doc.setTextColor("#1E40AF");
//     doc.setFont("helvetica", "bold");
//     doc.text("Booking Details", 20, 65);

//     // Booking info
//     doc.setFontSize(12);
//     let y = 75;
//     for (const [key, value] of Object.entries(bookingData)) {
//       const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1");

//       doc.setTextColor("#0D9488");
//       doc.setFont("helvetica", "bold");
//       doc.text(`${label}:`, 20, y);

//       doc.setTextColor("#111111");
//       doc.setFont("helvetica", "normal");
//       doc.text(`${value}`, 70, y);

//       y += 10;
//     }

//     // Footer message
//     doc.setFontSize(11);
//     doc.setTextColor("#475569");
//     doc.text(
//       "Thank you for choosing SRM Hostel. We look forward to your stay!",
//       105,
//       285,
//       { align: "center" }
//     );

//     doc.save(`BookingReceipt_${bookingData.bookingId}.pdf`);
//   });

//   backDashboardBtn.addEventListener("click", () => {
//     window.location.href = "/dashboard";
//   });
// });

// document.addEventListener("DOMContentLoaded", async () => {
//   const receiptDetails = document.getElementById("receiptDetails");
//   const downloadPdfBtn = document.getElementById("downloadPdfBtn");
//   const backDashboardBtn = document.getElementById("backDashboardBtn");

//   let bookingData = null;

//   try {
//     const response = await fetch('/api/bookingConfirmation');
//     const result = await response.json();

//     if (!result.success) {
//       receiptDetails.innerHTML = "<p>Error: " + result.message + "</p>";
//       downloadPdfBtn.style.display = "none";
//       return;
//     }

//     bookingData = result.details;

//     // Show booking details on page
//     receiptDetails.innerHTML = `
//       <p><strong>Booking ID:</strong> ${bookingData.id}</p>
//       <p><strong>Name:</strong> ${bookingData.name}</p>
//       <p><strong>Email:</strong> ${bookingData.email}</p>
//       <p><strong>Phone:</strong> ${bookingData.phone}</p>
//       <p><strong>Gender:</strong> ${bookingData.gender}</p>
//       <p><strong>Room Type:</strong> ${bookingData.room_type}</p>
//       <p><strong>Preference:</strong> ${bookingData.preference}</p>
//       <p><strong>Check-in:</strong> ${bookingData.check_in}</p>
//       <p><strong>Check-out:</strong> ${bookingData.check_out}</p>
//     `;

//   } catch (err) {
//     receiptDetails.innerHTML = "<p>Failed to load receipt data.</p>";
//     downloadPdfBtn.style.display = "none";
//     return;
//   }

//   downloadPdfBtn.addEventListener("click", () => {
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF();

//     doc.setDrawColor("#1D4ED8");
//     doc.setLineWidth(1.8);
//     doc.rect(10, 10, 190, 270);

//     doc.setFillColor("#2563EB");
//     doc.rect(10, 10, 190, 45, "F");

//     doc.setFontSize(22);
//     doc.setTextColor("#FFFFFF");
//     doc.setFont("helvetica", "bold");
//     doc.text("SRM Hostel Booking Receipt", 105, 35, { align: "center" });

//     doc.setFontSize(11);
//     doc.setTextColor("#E0E7FF");
//     doc.setFont("helvetica", "normal");
//     doc.text("SRM Nagar, Kattankulathur, Chennai - 603203", 105, 42, { align: "center" });
//     doc.text("Email: contact@srmhostel.com | Phone: +91-9876543210", 105, 48, { align: "center" });

//     doc.setFontSize(15);
//     doc.setTextColor("#1E40AF");
//     doc.setFont("helvetica", "bold");
//     doc.text("Booking Details", 20, 65);

//     doc.setFontSize(12);
//     let y = 75;
//     const fields = {
//       "Booking ID": bookingData.id,
//       "Name": bookingData.name,
//       "Email": bookingData.email,
//       "Phone": bookingData.phone,
//       "Gender": bookingData.gender,
//       "Room Type": bookingData.room_type,
//       "Preference": bookingData.preference,
//       "Check-in": bookingData.check_in,
//       "Check-out": bookingData.check_out
//     };

//     for (const [label, value] of Object.entries(fields)) {
//       doc.setTextColor("#0D9488");
//       doc.setFont("helvetica", "bold");
//       doc.text(`${label}:`, 20, y);

//       doc.setTextColor("#111111");
//       doc.setFont("helvetica", "normal");
//       doc.text(`${value}`, 70, y);

//       y += 10;
//     }

//     doc.setFontSize(11);
//     doc.setTextColor("#475569");
//     doc.text(
//       "Thank you for choosing SRM Hostel. We look forward to your stay!",
//       105,
//       285,
//       { align: "center" }
//     );

//     doc.save(`BookingReceipt_${bookingData.id}.pdf`);
//   });

//   backDashboardBtn.addEventListener("click", () => {
//     window.location.href = "/dashboard";
//   });
// });


document.addEventListener("DOMContentLoaded", async () => {
  const receiptDetails = document.getElementById("receiptDetails");
  const downloadPdfBtn = document.getElementById("downloadPdfBtn");
  const backDashboardBtn = document.getElementById("backDashboardBtn");

  let bookingData = null;

  try {
    // Include credentials to send cookies (for session auth)
    const response = await fetch('/api/bookingConfirmation', { credentials: 'include' });
    const result = await response.json();

    if (!result.success) {
      receiptDetails.innerHTML = `<p>Error: ${result.message}</p>`;
      downloadPdfBtn.style.display = "none";
      return;
    }

    bookingData = result.details;

    // Show booking details on page with fields as per API response
    receiptDetails.innerHTML = `
      <p><strong>Booking ID:</strong> ${bookingData.booking_id}</p>
      <p><strong>Name:</strong> ${bookingData.name}</p>
      <p><strong>Email:</strong> ${bookingData.email}</p>
      <p><strong>Phone:</strong> ${bookingData.phone}</p>
      <p><strong>Gender:</strong> ${bookingData.gender}</p>
      <p><strong>Room Type:</strong> ${bookingData.room_type}</p>
      <p><strong>Preference:</strong> ${bookingData.preference}</p>
      <p><strong>Booking Date:</strong> ${bookingData.booking_date}</p>
    `;

  } catch (err) {
    receiptDetails.innerHTML = "<p>Failed to load receipt data.</p>";
    downloadPdfBtn.style.display = "none";
    return;
  }

  downloadPdfBtn.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setDrawColor("#1D4ED8");
    doc.setLineWidth(1.8);
    doc.rect(10, 10, 190, 270);

    doc.setFillColor("#2563EB");
    doc.rect(10, 10, 190, 45, "F");

    doc.setFontSize(22);
    doc.setTextColor("#FFFFFF");
    doc.setFont("helvetica", "bold");
    doc.text("SRM Hostel Booking Receipt", 105, 35, { align: "center" });

    doc.setFontSize(11);
    doc.setTextColor("#E0E7FF");
    doc.setFont("helvetica", "normal");
    doc.text("SRM Nagar, Kattankulathur, Chennai - 603203", 105, 42, { align: "center" });
    doc.text("Email: contact@srmhostel.com | Phone: +91-9876543210", 105, 48, { align: "center" });

    doc.setFontSize(15);
    doc.setTextColor("#1E40AF");
    doc.setFont("helvetica", "bold");
    doc.text("Booking Details", 20, 65);

    doc.setFontSize(12);
    let y = 75;
    const fields = {
      "Booking ID": bookingData.booking_id,
      "Name": bookingData.name,
      "Email": bookingData.email,
      "Phone": bookingData.phone,
      "Gender": bookingData.gender,
      "Room Type": bookingData.room_type,
      "Preference": bookingData.preference,
      "Booking Date": bookingData.booking_date
    };

    for (const [label, value] of Object.entries(fields)) {
      doc.setTextColor("#0D9488");
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, 20, y);

      doc.setTextColor("#111111");
      doc.setFont("helvetica", "normal");
      doc.text(`${value}`, 70, y);

      y += 10;
    }

    doc.setFontSize(11);
    doc.setTextColor("#475569");
    doc.text(
      "Thank you for choosing SRM Hostel. We look forward to your stay!",
      105,
      285,
      { align: "center" }
    );

    doc.save(`BookingReceipt_${bookingData.booking_id}.pdf`);
  });

  backDashboardBtn.addEventListener("click", () => {
    window.location.href = "/dashboard";
  });
});


