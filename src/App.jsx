import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout';
import { LoginPage } from './pages/LoginPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';
import { InitializeButton } from './components/Admin/InitializeButton';

// Composant pour protéger les routes
const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<InitializeButton />} />
          <Route
            path="/challenges"
            element={
              <ProtectedRoute>
                <ChallengesPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/challenges" />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}; 