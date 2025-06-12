# 🏨 SRM Hostel Booking System (Flask)

![Flask](https://img.shields.io/badge/Flask-Python-000000?style=for-the-badge&logo=flask)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql)
![Render](https://img.shields.io/badge/Hosted%20on-Render-46a2f1?style=for-the-badge&logo=render)
![Responsive](https://img.shields.io/badge/Mobile%20Responsive-Yes-brightgreen?style=for-the-badge)

---

## 📌 Overview

*SRM Hostel Booking System* is a full-stack responsive web application developed using *Flask*, aimed at simplifying hostel room reservations for SRM University students. It includes user authentication, booking management, real-time PDF receipt generation, a chatbot assistant, and more.

---

## 🚀 Features

- 🔐 *Login/Signup* with email, password, phone number
- 📋 *Dashboard* with key options:
  - ✅ Book Hostel (AC & non-AC options + cot preference)
  - ❌ Cancel Booking (via unique Booking ID)
  - 👀 View Slots Left (static, 100 slots displayed)
  - 📥 Download Receipt (PDF format)
  - 🙍 View/Update Profile
  - 💬 JavaScript Chatbot for help
  - 🚪 Logout functionality

- 🧾 *Booking Flow*:
  - Room type & cot preference selection
  - Fill booking form → shows Booking ID
  - Auto-redirects to receipt page
  - Receipt can be downloaded as PDF using receipt.js

- 📱 *Responsive design* (Web, Tablet, Mobile)
- ☁ Hosted on [Render](https://render.com/)
- 🗃 Cloud database via FreeMySQLHosting (with phpMyAdmin)

---

## 🌐 Live Demo

🔗 [Visit the App](https://srm-hostel-booking-system-flask.onrender.com)

---

## ⚙ Tech Stack

- *Backend*: Python (Flask)
- *Frontend*: HTML, CSS, JavaScript
- *Database*: MySQL (phpMyAdmin via FreeMySQLHosting)
- *Hosting*: Render
- *PDF Export*: JavaScript-based

---

## 🛠 Server Optimization

- ⏰ [cron-job.org](https://cron-job.org) — wakes the server every 2 minutes to avoid sleep downtime
- 📶 [UptimeRobot](https://uptimerobot.com) — monitors uptime every 5 minutes

---

## 📸 Screenshots

> Screenshots stored in screenshots/ folder

| Page | Screenshot |
|------|------------|
| 🏠 Index Page | ![Index](screenshots/index.png) |
| 🔐 Login Page | ![Login](screenshots/login.png) |
| 📝 Signup Page | ![Signup](screenshots/signup.png) |
| 🧭 Dashboard | ![Dashboard](screenshots/dashboard.png) |
| ❌ Cancel Booking | ![Cancel Booking](screenshots/cancel_booking.png) |
| 🙍 Profile Page | ![Profile](screenshots/profile.png) |
| 💬 Chatbot Help | ![Chatbot](screenshots/chatbot.png) |
| 🏨 Booking Options | ![Booking](screenshots/booking.png) |
| 🧾 Booking Form | ![Booking Form](screenshots/booking_form.png) |
| ✅ Booking Success | ![Success](screenshots/successful.png) |
| 📋 Receipt Page | ![Receipt](screenshots/receipt.png) |
| 📄 Receipt PDF | ![Receipt PDF](screenshots/receipt_pdf.png) |

---

## 🧪 How to Run Locally

1. *Clone the Repository*:
   ```bash
   git clone https://github.com/maheshreddymaram2/SRM-Hostel-Booking-System-Flask.git
   cd SRM-Hostel-Booking-System-Flask
