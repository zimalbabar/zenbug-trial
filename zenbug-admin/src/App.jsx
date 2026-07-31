import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import FeedbackDetail from './pages/FeedbackDetail';
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/report/:id"
          element={
            <PrivateRoute>
              <FeedbackDetail />
            </PrivateRoute>
          }
        />
        <Route
  path="/settings"
  element={<Settings />}
/>

        {/* Catch-all Route */}
        <Route
          path="*"
          element={
            localStorage.getItem("token")
              ? <Navigate to="/dashboard" />
              : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
