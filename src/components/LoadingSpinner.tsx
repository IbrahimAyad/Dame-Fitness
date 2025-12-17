import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export default function LoadingSpinner({ size = 'md', className = '', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Loader2 className={`${sizeClasses[size]} text-gold animate-spin`} />
      {text && (
        <p className="text-dame-textMuted text-sm mt-2">{text}</p>
      )}
    </div>
  );
}

// Skeleton component for loading states
export function SkeletonCard() {
  return (
    <div className="bg-dame-dark rounded-xl p-4 animate-pulse">
      <div className="skeleton h-32 rounded-lg mb-3"></div>
      <div className="skeleton h-4 rounded mb-2"></div>
      <div className="skeleton h-3 rounded w-3/4"></div>
    </div>
  );
}

// Empty state component
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      {icon && (
        <div className="w-16 h-16 rounded-full bg-dame-gray/50 flex items-center justify-center mb-4 float">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-dame-textMuted text-sm mb-4 max-w-sm">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-gold text-black rounded-lg font-medium hover:bg-gold/90 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}