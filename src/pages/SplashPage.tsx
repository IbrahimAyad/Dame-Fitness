import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function SplashPage() {
  const navigate = useNavigate();
  const { state, hideSplash } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      hideSplash();
      if (state.preferences.onboardingComplete) {
        navigate('/home');
      } else {
        navigate('/onboarding');
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate, hideSplash, state.preferences.onboardingComplete]);

  return (
    <div className="fixed inset-0 bg-dame-black flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="mb-6">
          <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="45" stroke="#f59e0b" strokeWidth="3" />
            <path
              d="M30 50 L45 65 L70 35"
              stroke="#f59e0b"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
            />
          </svg>
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-2">
          <span className="text-gold-gradient">DAME</span>
        </h1>
        <p className="text-dame-textMuted text-lg tracking-widest uppercase">Fitness</p>
        <div className="mt-8">
          <div className="w-48 h-1 bg-dame-gray rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gold rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
