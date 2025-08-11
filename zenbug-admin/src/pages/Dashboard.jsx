import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import './styles/Dashboard.css';

export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [currentView, setCurrentView] = useState("dashboard");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5055/api/feedback", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setFeedbacks(data))
      .catch(err => {
        console.error("Error fetching feedback", err);
        navigate("/login");
      });
  }, [navigate]);

  const getSeverityData = () => {
    const severityMap = { low: 0, medium: 0, high: 0 };
    feedbacks.forEach(fb => {
      severityMap[fb.severity] = (severityMap[fb.severity] || 0) + 1;
    });

    return Object.entries(severityMap).map(([severity, count]) => ({
      severity,
      count
    }));
  };

  const handleStatusChange = async (id, newStatus) => {
    const token = localStorage.getItem("token");

    try {
      await fetch(`http://localhost:5055/api/feedback/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      setFeedbacks(prev =>
        prev.map(fb =>
          fb._id === id ? { ...fb, status: newStatus } : fb
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const filteredFeedbacks = feedbacks.filter((fb) => {
    const matchStatus = statusFilter === "all" || fb.status === statusFilter;
    const matchSeverity = severityFilter === "all" || fb.severity === severityFilter;
    const matchDate = dateFilter === "" || fb.submittedAt.startsWith(dateFilter);
    return matchStatus && matchSeverity && matchDate;
  });

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="modern-sidebar">
        <div className="sidebar-top">
          <div className="logo">🪲 <strong>Zenbug</strong></div>
          <ul className="nav-list">
            <li
              className={currentView === "dashboard" ? "active" : ""}
              onClick={() => setCurrentView("dashboard")}
            >
              <span>📊</span> Dashboard
            </li>
            <li><span>👥</span> Teams</li>
            <li
              className={currentView === "analytics" ? "active" : ""}
              onClick={() => setCurrentView("analytics")}
            >
              <span>📈</span> Analytics
            </li>
            <li><span>⚙️</span> Settings</li>
          </ul>
        </div>

        <div className="sidebar-bottom">
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header>
          <h1 className="dashboard-title">
            {currentView === "analytics" ? "Analytics View" : "Feedback Dashboard"}
          </h1>
        </header>

        {currentView === "dashboard" && (
          <>
            {/* Filter Bar */}
            <div className="filter-bar">
              <h3 className='filterbar-title'>Filter By:</h3>

              <label>Status:</label>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>

              <label>Severity:</label>
              <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <label>Date:</label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>

            {/* Feedback Table */}
            <table className="feedback-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Current Status</th>
                  <th>Change Status</th>
                  <th>Submitted</th>
                  <th>Screenshot</th>
                </tr>
              </thead>
              <tbody>
                {filteredFeedbacks.map((fb) => (
                  <tr key={fb._id} onClick={() => navigate(`/report/${fb._id}`)} className="clickable-row">
                    <td>{fb.title}</td>
                    <td>{fb.status}</td>
                    <td>
                      <select
                        value={fb.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleStatusChange(fb._id, e.target.value)}
                      >
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                    <td>{new Date(fb.submittedAt).toLocaleString()}</td>
                    <td>
                      {fb.imageUrl ? (
                        <img
                          src={fb.imageUrl}
                          alt="Screenshot"
                          style={{ width: "80px", height: "auto", borderRadius: "4px" }}
                        />
                      ) : (
                        "No image"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* Analytics View */}
        {currentView === "analytics" && (
          <div className="analytics-section">
            <h2>Feedback Severity Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getSeverityData()}>
                <XAxis dataKey="severity" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
