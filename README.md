# ZenBug – Feedback & Bug Reporting Tool

ZenBug is a bug reporting and feedback tool available as both a **web widget** and a **Chrome extension**.  
It allows users to capture screenshots, fill out a form, and submit reports with environment details like browser, URL, OS, and viewport size — all stored in a backend with an admin dashboard for management.

---

## 🚀 Features
- 🖱 **Floating feedback button** (widget) or Chrome extension popup  
- 📸 **Screenshot capture** of the current page (via `html2canvas`)  
- 📝 **Bug/feedback form** with title, description, severity, and optional email  
- 🌐 Auto-collects **metadata**: URL, browser, OS, viewport size  
- 💾 Stores reports in **MongoDB** via Node.js/Express backend  
- 📊 **Admin dashboard** to view, filter, and update bug reports  
- 🖌 Optional screenshot annotation (future enhancement)

---

## 🛠 Tech Stack
- **Frontend Widget**: HTML, CSS, JavaScript  
- **Chrome Extension**: Manifest V3, JavaScript  
- **Backend**: Node.js, Express, MongoDB  
- **Dashboard**: React.js  
