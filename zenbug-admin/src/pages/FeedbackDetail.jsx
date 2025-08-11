// // src/pages/FeedbackDetail.jsx
// import { useParams } from 'react-router-dom';

// export default function FeedbackDetail() {
//   const { id } = useParams();

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Feedback Detail Page</h2>
//     </div>
//   );
// }
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import './FeedbackDetail.css';
import './styles/FeedbackDetail.css';


export default function FeedbackDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:5055/api/feedback/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setFeedback(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading feedback:", err);
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading) return <div className="loading-message">Loading...</div>;
if (!feedback || !feedback._id)
// {
//   navigate ()
// }
  return <div className="error-message">Feedback not found.</div>;

return (
<div className="feedback-center-wrapper">
  <div className="feedback-content">
    <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
    <h2 className="feedback-title">FEEDBACK: {feedback.title}</h2>

    {feedback.imageUrl && (
      <div className="floating-screenshot">
        <a href={feedback.imageUrl} target="_blank" rel="noopener noreferrer">
          <img src={feedback.imageUrl} alt="Screenshot" className="floating-screenshot-img" />
        </a>
      </div>
    )}

    <p><strong>Status:</strong> {feedback.status}</p>
    <p><strong>Severity:</strong> <span className={`severity-badge severity-${feedback.severity}`}>{feedback.severity}</span></p>
    <p><strong>Description:</strong> {feedback.description}</p>
    <p><strong>Submitted at:</strong> {new Date(feedback.submittedAt).toLocaleString()}</p>
  </div>
</div>


);


}