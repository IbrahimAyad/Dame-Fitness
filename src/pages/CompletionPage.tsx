import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Trophy, Flame, Clock, Calendar, Share2, Home, ChevronRight, MessageCircle, X, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';
import { socialLinks } from '../components/SocialIcons';

export default function CompletionPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useApp();
  const { duration, workout } = location.state || {};
  const [showAskDame, setShowAskDame] = useState(false);
  
  const postWorkoutQuestions = [
    {
      question: "What should I do tomorrow?",
      answer: "That's something I'd want to dial in personally. Book a 1-on-1 session and I'll take care of it."
    },
    {
      question: "How do I know if I'm progressing?",
      answer: "Track your consistency, how you feel during workouts, and if movements get easier. I can help you monitor progress in our 1-on-1 sessions."
    },
    {
      question: "Should I do this workout again?",
      answer: workout?.difficulty === 'hard' ? 
        "Give yourself 48-72 hours before repeating intense workouts." :
        "You can repeat this in 24-48 hours if you're feeling recovered."
    }
  ];

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#d97706'],
    });
  }, []);

  if (!workout) {
    return (
      <div className="min-h-screen bg-dame-black flex items-center justify-center">
        <Button onClick={() => navigate('/home')}>Go Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dame-black px-6 py-8">
      <div className="text-center mb-8 animate-slide-up">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gold/20 mb-6">
          <Trophy className="w-12 h-12 text-gold" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Workout Complete!</h1>
        <p className="text-dame-textMuted">Amazing work! You crushed it.</p>
      </div>

      <div className="bg-dame-dark rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">{workout.title}</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-2">
              <Clock className="w-6 h-6 text-gold" />
            </div>
            <p className="text-2xl font-bold text-white">{duration}</p>
            <p className="text-xs text-dame-textMuted">Minutes</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-2">
              <Flame className="w-6 h-6 text-gold" />
            </div>
            <p className="text-2xl font-bold text-white">{workout.calories}</p>
            <p className="text-xs text-dame-textMuted">Calories</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-6 h-6 text-gold" />
            </div>
            <p className="text-2xl font-bold text-white">{workout.exercises.length}</p>
            <p className="text-xs text-dame-textMuted">Exercises</p>
          </div>
        </div>
      </div>

      <div className="bg-dame-dark rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-dame-textMuted text-sm">Current Streak</p>
            <p className="text-3xl font-bold text-gold">{state.progress.currentStreak} Days</p>
          </div>
          <div className="flex -space-x-1">
            {[...Array(Math.min(7, state.progress.currentStreak))].map((_, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gold/20 border-2 border-dame-black flex items-center justify-center">
                <Flame className="w-4 h-4 text-gold" />
              </div>
            ))}
          </div>
        </div>
        <div className="h-1.5 bg-dame-gray rounded-full overflow-hidden">
          <div
            className="h-full bg-gold rounded-full"
            style={{ width: `${(state.progress.thisWeekWorkouts / state.progress.weeklyGoal) * 100}%` }}
          />
        </div>
        <p className="text-sm text-dame-textMuted mt-2">
          {state.progress.thisWeekWorkouts} of {state.progress.weeklyGoal} workouts this week
        </p>
      </div>

      {/* Dame AI Summary */}
      {workout.aiCoach && (
        <div className="bg-dame-dark rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Dame AI Summary</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
              <p className="text-dame-textMuted">{workout.aiCoach.postWorkoutSummary?.consistency}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
              <p className="text-dame-textMuted">{workout.aiCoach.postWorkoutSummary?.form}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
              <p className="text-dame-textMuted">{workout.aiCoach.postWorkoutSummary?.pairing}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-dame-gray">
            <div className="flex items-center gap-3 mb-3">
              <p className="text-gold text-sm font-medium">Want this tailored exactly to you?</p>
              <button
                onClick={() => setShowAskDame(true)}
                className="flex items-center gap-1 text-dame-textMuted text-sm hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Ask Dame
              </button>
            </div>
            <Link to="/book">
              <Button variant="outline" size="sm" className="w-full">
                Book 1-on-1 with Dame
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Primary CTA - Book with Dame */}
      <div className="bg-gradient-to-r from-gold/20 to-gold/10 rounded-2xl p-6 mb-6 border border-gold/30">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
            <Calendar className="w-6 h-6 text-black" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">Ready for the next level?</h3>
            <p className="text-dame-textMuted text-sm mb-4">
              Book a personalized 1-on-1 session with Dame for customized coaching.
            </p>
            <Link to="/book">
              <Button size="lg" className="w-full">
                Book 1:1 with Dame
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Follow Dame for More Motivation */}
      <div className="bg-dame-dark rounded-2xl p-5 mb-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">Keep the momentum going!</h3>
          <p className="text-dame-textMuted text-sm">Follow Dame for daily motivation and fitness tips</p>
        </div>
        <div className="flex gap-3">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 flex-1 p-3 rounded-lg transition-all hover-lift btn-press ${social.bgColor} ${social.color}`}
              >
                <Icon size={20} />
                <div className="flex-1 text-center">
                  <span className="font-medium text-sm">{social.name}</span>
                </div>
                <ExternalLink size={16} className="opacity-60" />
              </a>
            );
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'DAME Fitness',
                text: `Just completed ${workout.title} with DAME Fitness!`,
              });
            }
          }}
        >
          <Share2 className="w-5 h-5 mr-2" />
          Share
        </Button>
        <Link to="/home" className="flex-1">
          <Button variant="outline" className="w-full">
            <Home className="w-5 h-5 mr-2" />
            Home
          </Button>
        </Link>
      </div>

      {/* Ask Dame AI Bottom Sheet */}
      {showAskDame && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAskDame(false)}
          />
          <div className="relative w-full bg-dame-dark rounded-t-2xl p-6 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Ask Dame AI</h3>
              <button
                onClick={() => setShowAskDame(false)}
                className="w-8 h-8 rounded-full bg-dame-gray flex items-center justify-center text-dame-textMuted hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {postWorkoutQuestions.map((item, index) => (
                <div key={index} className="space-y-2">
                  <button
                    className="w-full text-left p-3 bg-dame-gray rounded-lg text-white text-sm hover:bg-dame-gray/70 transition-colors"
                    onClick={() => {
                      setShowAskDame(false);
                      alert(item.answer);
                    }}
                  >
                    {item.question}
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-dame-gray">
              <p className="text-dame-textMuted text-sm">
                For detailed coaching and personalized plans, book a 1-on-1 session with Dame.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
