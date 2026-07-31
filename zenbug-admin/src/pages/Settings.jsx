import { useNavigate } from "react-router-dom";
import "./styles/Settings.css";

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="settings-container">

      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h1>⚙️ Settings</h1>

      <div className="settings-card">

        <h2>Admin Profile</h2>

        <p><strong>Username:</strong> Admin</p>
        <p><strong>Role:</strong> Administrator</p>

      </div>

      <div className="settings-card">

        <h2>AI Settings</h2>

        <p>Provider: Groq</p>
        <p>Model: llama-3.3-70b-versatile</p>

      </div>

      <div className="settings-card">

        <h2>Application</h2>

        <label>
          <input type="checkbox" defaultChecked />
          Capture Screenshots
        </label>

        <br />

        <label>
          <input type="checkbox" defaultChecked />
          Collect Browser Metadata
        </label>

      </div>

      <div className="settings-card">

        <h2>About ZenBug</h2>

        <p>Version 1.0</p>
        <p>AI-Powered Bug Tracking System</p>

      </div>

    </div>
  );
}