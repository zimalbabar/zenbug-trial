// content.js
// Load html2canvas dynamically in content script
function loadHtml2Canvas(callback) {
  if (window.html2canvas) {
    callback();
    return;
  }
  const script = document.createElement('script');
  script.src = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
  script.onload = callback;
  document.head.appendChild(script);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "TAKE_SCREENSHOT") {
    loadHtml2Canvas(() => {
      html2canvas(document.body).then(canvas => {
        sendResponse({ screenshot: canvas.toDataURL("image/png") });
      }).catch(err => {
        sendResponse({ error: err.message });
      });
    });
    return true; // async response
  }
});

