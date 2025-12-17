import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Play, User, Settings } from 'lucide-react';

const navItems = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/library', icon: Search, label: 'Library' },
  { path: '/admin', icon: Settings, label: 'Admin' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dame-dark/95 backdrop-blur-lg border-t border-dame-gray z-50">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {navItems.map(item => {
          const isActive = location.pathname === item.path || 
            (item.path === '/library' && location.pathname.startsWith('/workout'));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all btn-press focus-ring ${
                isActive ? 'text-gold bg-gold/10' : 'text-dame-textMuted hover:text-white hover:bg-dame-gray/50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'animate-bounce' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
