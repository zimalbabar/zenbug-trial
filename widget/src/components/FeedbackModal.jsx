import React, { useState } from "react";
import html2canvas from "html2canvas";
import axios from "axios";
import collectMetadata from "../utils/collectMetadata";

const FeedbackModal = ({ onClose }) => {
  const [screenshot, setScreenshot] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    severity: "low",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const takeScreenshot = async () => {
    // Hide modal temporarily
    const modal = document.querySelector(".zenbug-modal-overlay");
    if (modal) modal.style.display = "none";

    await new Promise((resolve) => setTimeout(resolve, 100)); // wait a tick

    const canvas = await html2canvas(document.body, {
      backgroundColor: "#1e1e1e", // force dark background
      windowWidth: document.body.scrollWidth,
      windowHeight: document.body.scrollHeight,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      ignoreElements: (el) =>
        el.classList?.contains("zenbug-modal-overlay") || el.id === "zenbug-btn"
    });

    setScreenshot(canvas.toDataURL("image/png"));

    // Show modal again
    if (modal) modal.style.display = "flex";
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      imageUrl: screenshot,
      metadata: collectMetadata(),
    };
    try {
      await axios.post("http://localhost:5055/api/feedback", payload);
      alert("Feedback submitted!");
      onClose();
    } catch (err) {
      alert("Submission failed.");
    }
  };

  return (
    <div className="zenbug-modal-overlay" onClick={onClose}>
      <div className="zenbug-modal" onClick={(e) => e.stopPropagation()}>
        <button className = "close" onClick={onClose} style={{ marginTop: "10px" }}>
          ✖
        </button>
        <h3 className="zenbug-title">Submit Feedback</h3>

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Describe the issue..."
          value={form.description}
          onChange={handleChange}
        />
        <select
          name="severity"
          value={form.severity}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {/* Screenshot preview */}
        {screenshot && <img src={screenshot} alt="screenshot" width="100%" />}

        {/* Take Screenshot button */}
        <button
          className="screenshot"
          onClick={takeScreenshot}
          style={{ marginTop: "10px" }}
        >
          Take Screenshot
        </button>

        <button className="submit" onClick={handleSubmit} style={{ marginTop: "10px" }}>
          Submit
        </button>
        <button onClick={onClose} style={{ marginTop: "10px" }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;


// import React, { useState } from "react";
// import html2canvas from "html2canvas";
// import axios from "axios";
// import collectMetadata from "../utils/collectMetadata";

// const FeedbackModal = ({ onClose }) => {
//   const [screenshot, setScreenshot] = useState(null);
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     severity: "low",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const takeScreenshot = async () => {
//     // Hide modal temporarily so it doesn't appear in screenshot
//     const modal = document.querySelector(".zenbug-modal-overlay");
//     modal.style.display = "none";

//     // Wait a moment for DOM to update
//     await new Promise((resolve) => setTimeout(resolve, 100));

//     // Capture screenshot of entire page
//     const canvas = await html2canvas(document.body, {
//       windowWidth: window.innerWidth,
//       windowHeight: window.innerHeight,
//       scrollX: window.scrollX,
//       scrollY: window.scrollY,
//     });
//     setScreenshot(canvas.toDataURL("image/png"));

//     // Show modal again
//     modal.style.display = "flex";
//   };
  

//   const handleSubmit = async () => {
//     const payload = {
//       ...form,
//       imageUrl: screenshot,
//       metadata: collectMetadata(),
//     };
//     try {
//       await axios.post("http://localhost:5055/api/feedback", payload);
//       alert("Feedback submitted!");
//       onClose();
//     } catch (err) {
//       alert("Submission failed.");
//     }
//   };

//   return (
//     <div className="zenbug-modal-overlay" onClick={onClose} style={{ display: "flex" }}>
//       <div className="zenbug-modal" onClick={(e) => e.stopPropagation()}>
//         <button className = "close" onClick={onClose} style={{ marginTop: "10px" }}>
//           ✖
//         </button>
//         <h3 className="zenbug-title">Submit Feedback</h3>

//         <input
//           name="title"
//           placeholder="Title"
//           value={form.title}
//           onChange={handleChange}
//         />
//         <textarea
//           name="description"
//           placeholder="Describe the issue..."
//           value={form.description}
//           onChange={handleChange}
//         />
//         <select
//           name="severity"
//           value={form.severity}
//           onChange={handleChange}
//         >
//           <option value="low">Low</option>
//           <option value="medium">Medium</option>
//           <option value="high">High</option>
//         </select>

//         {/* Screenshot preview */}
//         {screenshot && <img src={screenshot} alt="screenshot" width="100%" />}

//         {/* Take screenshot button */}
//         <button className= "screenshot" onClick={takeScreenshot} style={{ marginTop: "10px" }}>
//           Take Screenshot
//         </button>

//         {/* Submit + Cancel */}
//         <button className="submit" onClick={handleSubmit} style={{ marginTop: "10px" }}>
//           Submit
//         </button>
        
//       </div>
//     </div>
//   );
// };

// export default FeedbackModal;

