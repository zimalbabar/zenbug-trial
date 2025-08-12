ZenBug – Feedback & Bug Reporting Tool
ZenBug is a feedback and bug reporting solution available as both a web widget and a Chrome extension. It enables users to capture screenshots, provide issue descriptions, and submit reports directly to your backend along with environment details like browser, URL, OS, and viewport size.
Features
🖱 Floating feedback button (widget) or extension popup
📸 Screenshot capture of the current page
📝 Bug/feedback form with title, description, severity, and optional email
🌐 Auto-collects metadata: URL, browser, OS, viewport size
💾 Stores reports in MongoDB via a Node.js/Express backend
📊 Admin dashboard to view, filter, and update bug reports
🔍 Optional screenshot annotation (future enhancement)
Tech Stack
Frontend Widget: HTML, CSS, JavaScript (html2canvas for screenshots)
Chrome Extension: Manifest V3, JavaScript
Backend: Node.js, Express, MongoDB
Dashboard: React.js
Installation
Backend
cd backend
npm install
node server.js
Frontend Widget
Include via script tag (optional future feature):
<script src="https://your-domain.com/widget.js"></script>
Chrome Extension
Open chrome://extensions/
Enable Developer Mode
Click Load unpacked and select the extension folder
API Endpoints
POST /api/feedback – Submit a new bug report
GET /api/feedback – Retrieve all bug reports (authenticated)
Usage
Open the widget or Chrome extension
Fill out the feedback form and capture a screenshot
Submit – the report will appear in the admin dashboard
