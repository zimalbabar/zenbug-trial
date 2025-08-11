// document.getElementById("takeScreenshotBtn").addEventListener("click", () => {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     chrome.tabs.sendMessage(
//       tabs[0].id,
//       { type: "TAKE_SCREENSHOT" },
//       (response) => {
//         if (response?.screenshot) {
//           document.getElementById("screenshotImg").src = response.screenshot;
//         } else {
//           alert("Failed to capture screenshot: " + response?.error);
//         }
//       }
//     );
//   });
// });
