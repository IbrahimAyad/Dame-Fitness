import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { workouts, emergencyWorkouts } from '../data/workouts';
import { Play, Flame, Clock, Calendar, ChevronRight, Dumbbell, Zap, Coffee, Brain, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import BottomNav from '../components/BottomNav';

export default function HomePage() {
  const { state, getAIRecommendation, getRecoveryInsight, updateEnergyLevel } = useApp();
  const { preferences, progress } = state;
  const [showEmergencyModes, setShowEmergencyModes] = useState(false);
  
  const aiRecommendation = getAIRecommendation();
  const recoveryInsight = getRecoveryInsight();
  
  // Generate narrative progress insights
  const getProgressNarrative = () => {
    const { workoutSessions, currentStreak, aiLearning } = progress;
    
    if (workoutSessions.length >= 5) {
      const recentSessions = workoutSessions.slice(-5);
      const avgCompletion = recentSessions.reduce((acc, s) => acc + s.completionRate, 0) / recentSessions.length;
      
      if (avgCompletion > 0.85) {
        return "Dame AI noticed you're hitting your stride - completion rates are trending up 15%";
      } else if (currentStreak >= 5) {
        return "Consistency is building momentum - your 5-day streak is creating lasting habits";
      }
    }
    
    if (currentStreak >= 3) {
      return "Building strong momentum - streaks like this create lasting change";
    }
    
    return null;
  };
  
  const progressNarrative = getProgressNarrative();

  const featuredWorkouts = workouts.filter(w => w.featured);
  
  // Enhanced Dame AI recommendation logic
  const getRecommendedWorkout = () => {
    const matchedWorkouts = featuredWorkouts.filter(w => {
      // Match environment
      const envMatch = preferences.environment === 'home' ? 
        (w.environment === 'home' || w.environment === 'both') :
        preferences.environment === 'gym' ? 
        (w.environment === 'gym' || w.environment === 'both') : true;
      
      // Match time commitment (±10 minutes)
      const timeMatch = preferences.timeCommitment ? 
        Math.abs(w.duration - parseInt(preferences.timeCommitment)) <= 10 : true;
      
      return envMatch && timeMatch;
    });
    
    return matchedWorkouts[0] || featuredWorkouts[0];
  };
  
  const recommendedWorkout = getRecommendedWorkout();
  
  // Generate AI reasoning
  const getAIReasoning = () => {
    const reasons = [];
    if (preferences.goal) reasons.push(`your ${preferences.goal.toLowerCase()} goal`);
    if (preferences.timeCommitment) reasons.push(`${preferences.timeCommitment} minutes available`);
    if (preferences.environment) reasons.push(`${preferences.environment} training`);
    
    if (reasons.length === 0) return "Based on your preferences";
    return `Based on ${reasons.join(', ')}`;
  };

  const quickWorkouts = workouts.filter(w => w.duration <= 20).slice(0, 3);

  return (
    <div className="min-h-screen bg-dame-black pb-24 page-transition">
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-dame-textMuted text-sm">Welcome back,</p>
            <h1 className="text-2xl font-bold text-white">{state.user.name}</h1>
          </div>
          <Link to="/profile" className="w-12 h-12 rounded-full bg-dame-gray flex items-center justify-center">
            <span className="text-gold font-bold text-lg">
              {state.user.name.charAt(0)}
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-dame-dark rounded-xl p-4 text-center">
            <Flame className="w-6 h-6 text-gold mx-auto mb-1" />
            <p className="text-2xl font-bold text-white">{progress.currentStreak}</p>
            <p className="text-xs text-dame-textMuted">Day Streak</p>
          </div>
          <div className="bg-dame-dark rounded-xl p-4 text-center">
            <Dumbbell className="w-6 h-6 text-gold mx-auto mb-1" />
            <p className="text-2xl font-bold text-white">{progress.completedWorkouts.length}</p>
            <p className="text-xs text-dame-textMuted">Workouts</p>
          </div>
          <div className="bg-dame-dark rounded-xl p-4 text-center">
            <Clock className="w-6 h-6 text-gold mx-auto mb-1" />
            <p className="text-2xl font-bold text-white">{progress.totalMinutes}</p>
            <p className="text-xs text-dame-textMuted">Minutes</p>
          </div>
        </div>

        {/* Recovery Intelligence & AI Insights */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full ${
              progress.recoveryScore >= 85 ? 'bg-green-400' :
              progress.recoveryScore >= 70 ? 'bg-yellow-400' : 'bg-red-400'
            }`} />
            <div>
              <p className="text-white font-semibold">Recovery Score: {progress.recoveryScore}%</p>
              <p className="text-xs text-dame-textMuted">{recoveryInsight}</p>
            </div>
          </div>
          
          {aiRecommendation && (
            <div className="bg-gold/10 border border-gold/30 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                <p className="text-gold text-sm font-medium">{aiRecommendation}</p>
              </div>
            </div>
          )}
          
          {progressNarrative && (
            <div className="bg-dame-dark rounded-xl p-4 border-l-4 border-gold">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0" />
                <p className="text-white text-sm font-medium">{progressNarrative}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Your Next Workout</h2>
          <Link to={`/workout/${recommendedWorkout.id}`} className="block hover-lift">
            <div className="relative rounded-2xl overflow-hidden hover-glow">
              <img
                src={recommendedWorkout.thumbnail}
                alt={recommendedWorkout.title}
                className="w-full h-48 object-cover img-loading transition-transform duration-300 hover:scale-105"
                onLoad={(e) => {
                  e.currentTarget.classList.remove('img-loading');
                  e.currentTarget.classList.add('img-loaded');
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-gold/20 text-gold">
                  Dame AI Pick
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    recommendedWorkout.difficulty === 'hard' ? 'bg-red-500/20 text-red-400' :
                    recommendedWorkout.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {recommendedWorkout.difficulty}
                  </span>
                  <span className="text-dame-textMuted text-sm">{recommendedWorkout.duration} min</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{recommendedWorkout.title}</h3>
                <p className="text-dame-textMuted text-sm mb-1">{getAIReasoning()}</p>
                <p className="text-dame-textMuted text-xs line-clamp-1 opacity-75">{recommendedWorkout.description}</p>
              </div>
              <div className="absolute top-4 right-4">
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center btn-gold-glow">
                  <Play className="w-5 h-5 text-black ml-0.5" fill="currentColor" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="bg-dame-dark rounded-2xl p-5 mb-8">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-white">Train 1-on-1 with Dame</h3>
              <p className="text-sm text-dame-textMuted">Personalized coaching sessions</p>
            </div>
            <Calendar className="w-8 h-8 text-gold" />
          </div>
          <Link to="/book">
            <Button variant="outline" size="sm" className="w-full">
              Book a Session
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Quick Workouts</h2>
            <Link to="/library" className="text-gold text-sm font-medium">View All</Link>
          </div>
          <div className="space-y-3">
            {quickWorkouts.map(workout => (
              <Link
                key={workout.id}
                to={`/workout/${workout.id}`}
                className="flex items-center gap-4 bg-dame-dark rounded-xl p-3"
              >
                <img
                  src={workout.thumbnail}
                  alt={workout.title}
                  className="w-20 h-16 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white truncate">{workout.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-dame-textMuted">
                    <span>{workout.duration} min</span>
                    <span>-</span>
                    <span className="capitalize">{workout.difficulty}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-dame-textMuted" />
              </Link>
            ))}
          </div>
        </div>

        {/* Emergency Quick Modes */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Need a Quick Fix?</h2>
            <button
              onClick={() => setShowEmergencyModes(true)}
              className="text-gold text-sm font-medium flex items-center gap-1"
            >
              <Zap className="w-4 h-4" />
              Emergency
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                updateEnergyLevel('low');
                setShowEmergencyModes(true);
              }}
              className="bg-dame-dark rounded-xl p-3 text-center hover:bg-dame-gray transition-colors"
            >
              <Coffee className="w-6 h-6 text-orange-400 mx-auto mb-1" />
              <p className="text-xs text-white font-medium">Energy</p>
              <p className="text-xs text-dame-textMuted">5 min</p>
            </button>
            <button
              onClick={() => setShowEmergencyModes(true)}
              className="bg-dame-dark rounded-xl p-3 text-center hover:bg-dame-gray transition-colors"
            >
              <Dumbbell className="w-6 h-6 text-blue-400 mx-auto mb-1" />
              <p className="text-xs text-white font-medium">Desk Break</p>
              <p className="text-xs text-dame-textMuted">3 min</p>
            </button>
            <button
              onClick={() => setShowEmergencyModes(true)}
              className="bg-dame-dark rounded-xl p-3 text-center hover:bg-dame-gray transition-colors"
            >
              <Brain className="w-6 h-6 text-green-400 mx-auto mb-1" />
              <p className="text-xs text-white font-medium">Stress Reset</p>
              <p className="text-xs text-dame-textMuted">7 min</p>
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Featured Programs</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
            {featuredWorkouts.slice(0, 4).map(workout => (
              <Link
                key={workout.id}
                to={`/workout/${workout.id}`}
                className="flex-shrink-0 w-40"
              >
                <div className="relative rounded-xl overflow-hidden mb-2">
                  <img
                    src={workout.thumbnail}
                    alt={workout.title}
                    className="w-full h-24 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2">
                    <span className="text-xs font-medium text-white">{workout.duration} min</span>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-white truncate">{workout.title}</h3>
                <p className="text-xs text-dame-textMuted capitalize">{workout.category}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Modes Modal */}
      {showEmergencyModes && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowEmergencyModes(false)}
          />
          <div className="relative w-full bg-dame-dark rounded-t-2xl p-6 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Emergency Modes</h3>
              <button
                onClick={() => setShowEmergencyModes(false)}
                className="w-8 h-8 rounded-full bg-dame-gray flex items-center justify-center text-dame-textMuted hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {emergencyWorkouts.map(emergency => (
                <button
                  key={emergency.id}
                  onClick={() => {
                    setShowEmergencyModes(false);
                    // Navigate to emergency workout player
                    // In a real app, you'd implement a special emergency player
                    alert(`Starting ${emergency.title} - ${emergency.description}`);
                  }}
                  className="w-full text-left p-4 bg-dame-gray rounded-xl hover:bg-dame-gray/70 transition-colors"
                >
                  <div className="flex gap-4 mb-3">
                    <img 
                      src={emergency.thumbnail} 
                      alt={emergency.title}
                      className="w-20 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-white">{emergency.title}</h4>
                        <span className="text-gold text-sm">{emergency.duration} min</span>
                      </div>
                      <p className="text-dame-textMuted text-sm">{emergency.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {emergency.exercises.map((exercise, idx) => (
                      <span key={idx} className="text-xs bg-dame-black px-2 py-1 rounded text-dame-textMuted">
                        {exercise.name}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
