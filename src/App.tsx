import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useAuthStore } from './store/authStore';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import PageLoader from './components/PageLoader';

// Pages
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LifestyleAnalysis from './pages/LifestyleAnalysis';
import PersonalChallenges from './pages/PersonalChallenges';
import CommunitySpace from './pages/CommunitySpace';
import ResourceFinder from './pages/ResourceFinder';
import UserProfile from './pages/UserProfile';
import EditProfile from './pages/EditProfile';
import CarbonFootprint from './pages/CarbonFootprint';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  const { setUser, user } = useAuthStore(state => ({ setUser: state.setUser, user: state.user }));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/lifestyle-analysis" element={<LifestyleAnalysis />} />
              <Route path="/personal-challenges" element={<PersonalChallenges />} />
              <Route path="/community" element={<CommunitySpace />} />
              <Route path="/resources" element={<ResourceFinder />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/carbon-footprint" element={<CarbonFootprint />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <SpeedInsights />
      </div>
    </Router>
  );
}

export default App;