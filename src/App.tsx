import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import SplashPage from './pages/SplashPage';
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage';
import WorkoutDetailPage from './pages/WorkoutDetailPage';
import WorkoutPlayerPage from './pages/WorkoutPlayerPage';
import CompletionPage from './pages/CompletionPage';
import BookingPage from './pages/BookingPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-dame-black">
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/workout/:id" element={<WorkoutDetailPage />} />
            <Route path="/workout/:id/play" element={<WorkoutPlayerPage />} />
            <Route path="/workout/:id/complete" element={<CompletionPage />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
