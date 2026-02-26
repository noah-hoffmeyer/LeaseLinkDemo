import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Listings from './pages/Listings';
import Profiles from './pages/Profiles';
import Matches from './pages/Matches';
import MyProfile from './pages/MyProfile';

function AppContent() {
  const { user } = useAuth();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  if (!user) {
    return <Login />;
  }

  // Simple router
  const renderPage = () => {
    switch (currentPath) {
      case '/':
      case '/listings':
        return <Listings />;
      case '/profiles':
        return <Profiles />;
      case '/matches':
        return <Matches />;
      case '/my-profile':
        return <MyProfile />;
      default:
        return <Listings />;
    }
  };

  return (
    <Layout currentPath={currentPath} navigate={navigate}>
      {renderPage()}
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}
