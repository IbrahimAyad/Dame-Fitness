import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { workouts } from '../data/workouts';
import { Button } from '../components/ui/button';
import { useApp } from '../context/AppContext';
import { ChevronLeft, Play, Clock, Flame, Dumbbell, MapPin, ChevronRight, X, HelpCircle, MessageCircle } from 'lucide-react';

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useApp();
  const { preferences } = state;
  const workout = workouts.find(w => w.id === id);
  const [showWhyWorkout, setShowWhyWorkout] = useState(false);
  const [showAskDame, setShowAskDame] = useState(false);
  
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  
  const askDameQuestions = [
    {
      question: "Why this workout?",
      answer: workout?.aiCoach?.whyThisWorkout ? 
        `${workout.aiCoach.whyThisWorkout.goalAlignment}, ${workout.aiCoach.whyThisWorkout.timeMatch}, and ${workout.aiCoach.whyThisWorkout.muscleEfficiency.toLowerCase()}.` :
        "This workout matches your goals and available time perfectly.",
      followUp: ["What if I want something harder?", "Can I modify this?"]
    },
    {
      question: "How often should I train this?",
      answer: workout?.difficulty === 'hard' ? 
        "2-3 times per week with rest days between for recovery." :
        workout?.difficulty === 'medium' ?
        "3-4 times per week, listen to your body for rest needs." :
        "This can be done 4-5 times per week as it's gentle on recovery.",
      followUp: ["What about rest days?", "How do I know I'm ready?"]
    },
    {
      question: "Is this good for fat loss?",
      answer: workout?.category === 'HIIT' ?
        "Absolutely! HIIT workouts are excellent for burning calories and boosting metabolism." :
        workout?.category === 'Strength' ?
        "Yes! Building muscle increases your metabolism and helps with long-term fat loss." :
        "Combined with proper nutrition, this workout supports your fat loss goals.",
      followUp: ["What about diet?", "How long until I see results?"]
    },
    {
      question: "What should I do tomorrow?",
      answer: "That's something I'd want to dial in personally. Book a 1-on-1 session and I'll take care of it.",
      followUp: []
    }
  ];

  if (!workout) {
    return (
      <div className="min-h-screen bg-dame-black flex items-center justify-center">
        <p className="text-white">Workout not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dame-black">
      <div className="relative">
        <img
          src={workout.thumbnail}
          alt={workout.title}
          className="w-full h-72 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dame-black via-dame-black/50 to-transparent" />
        
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="px-6 -mt-20 relative z-10 pb-32">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            workout.difficulty === 'hard' ? 'bg-red-500/20 text-red-400' :
            workout.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-green-500/20 text-green-400'
          }`}>
            {workout.difficulty.toUpperCase()}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-dame-gray text-white capitalize">
            {workout.category}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">{workout.title}</h1>
        <p className="text-dame-textMuted mb-3">{workout.description}</p>
        
        <div className="flex items-center gap-4 mb-6">
          {workout.aiCoach && (
            <button
              onClick={() => setShowWhyWorkout(true)}
              className="flex items-center gap-2 text-gold text-sm font-medium hover:text-gold/80 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              Why this workout?
            </button>
          )}
          <button
            onClick={() => setShowAskDame(true)}
            className="flex items-center gap-2 text-dame-textMuted text-sm font-medium hover:text-white transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Ask Dame AI
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-dame-dark rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-white font-semibold">{workout.duration} min</p>
              <p className="text-xs text-dame-textMuted">Duration</p>
            </div>
          </div>
          <div className="bg-dame-dark rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Flame className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-white font-semibold">{workout.calories} cal</p>
              <p className="text-xs text-dame-textMuted">Burn Est.</p>
            </div>
          </div>
          <div className="bg-dame-dark rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-white font-semibold">{workout.exercises.length}</p>
              <p className="text-xs text-dame-textMuted">Exercises</p>
            </div>
          </div>
          <div className="bg-dame-dark rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-white font-semibold capitalize">{workout.environment}</p>
              <p className="text-xs text-dame-textMuted">Location</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-3">Equipment Needed</h2>
          <div className="flex flex-wrap gap-2">
            {workout.equipment.map(eq => (
              <span key={eq} className="px-3 py-1.5 bg-dame-gray rounded-lg text-sm text-white">
                {eq}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-3">Target Muscles</h2>
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map(mg => (
              <span key={mg} className="px-3 py-1.5 bg-gold/10 rounded-lg text-sm text-gold">
                {mg}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Exercises ({workout.exercises.length})</h2>
          <div className="space-y-2">
            {workout.exercises.map((exercise, idx) => (
              <div key={exercise.id} className="bg-dame-dark rounded-xl p-4 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-dame-gray flex items-center justify-center text-gold font-semibold text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{exercise.name}</p>
                  <p className="text-sm text-dame-textMuted">{Math.floor(exercise.duration / 60)}:{(exercise.duration % 60).toString().padStart(2, '0')}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-dame-textMuted" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-dame-black/95 backdrop-blur-sm border-t border-dame-gray z-40">
        <button
          className="w-full h-14 rounded-xl px-10 text-base bg-gold text-black hover:bg-gold/90 font-semibold inline-flex items-center justify-center transition-all btn-gold-glow btn-press relative z-50 focus-ring hover-glow"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Haptic feedback
            if ('vibrate' in navigator) {
              navigator.vibrate(50);
            }
            
            console.log('Start workout clicked for workout ID:', workout.id);
            const targetUrl = `/workout/${workout.id}/play`;
            console.log('Navigating to:', targetUrl);
            
            // Try multiple navigation methods
            try {
              navigate(targetUrl);
              console.log('Navigate called successfully');
            } catch (error) {
              console.error('Navigate failed:', error);
              // Fallback to window.location
              window.location.href = targetUrl;
            }
          }}
          type="button"
        >
          <Play className="w-5 h-5 mr-2" fill="currentColor" />
          Start Workout
        </button>
      </div>

      {/* Why This Workout Bottom Sheet */}
      {showWhyWorkout && workout.aiCoach && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowWhyWorkout(false)}
          />
          <div className="relative w-full bg-dame-dark rounded-t-2xl p-6 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Coach Dame says:</h3>
              <button
                onClick={() => setShowWhyWorkout(false)}
                className="w-8 h-8 rounded-full bg-dame-gray flex items-center justify-center text-dame-textMuted hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                <p className="text-dame-textMuted">{workout.aiCoach.whyThisWorkout?.goalAlignment}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                <p className="text-dame-textMuted">{workout.aiCoach.whyThisWorkout?.timeMatch}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                <p className="text-dame-textMuted">{workout.aiCoach.whyThisWorkout?.muscleEfficiency}</p>
              </div>
              {workout.aiCoach.whyThisWorkout?.restDayPairing && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                  <p className="text-dame-textMuted">{workout.aiCoach.whyThisWorkout?.restDayPairing}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
              {selectedQuestion ? (
                // Show answer and follow-up questions
                <div>
                  <div className="bg-gold/10 rounded-lg p-4 mb-4">
                    <p className="text-white text-sm font-medium mb-2">Dame AI:</p>
                    <p className="text-dame-textMuted text-sm">
                      {askDameQuestions.find(q => q.question === selectedQuestion)?.answer}
                    </p>
                  </div>
                  
                  {askDameQuestions.find(q => q.question === selectedQuestion)?.followUp.length > 0 && (
                    <div className="space-y-2 mb-4">
                      <p className="text-xs text-dame-textMuted">Follow-up questions:</p>
                      {askDameQuestions.find(q => q.question === selectedQuestion)?.followUp.map((followUp, idx) => (
                        <button
                          key={idx}
                          className="w-full text-left p-2 bg-dame-black/50 rounded text-dame-textMuted text-xs hover:text-white transition-colors"
                          onClick={() => {
                            if (followUp.includes("diet") || followUp.includes("results") || followUp.includes("know I'm ready")) {
                              alert("That's exactly what we'd dive deep into during a 1-on-1 session. Every person is different!");
                            } else {
                              alert("Great question! This is something I'd love to explore more in our personal session.");
                            }
                          }}
                        >
                          {followUp}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedQuestion(null)}
                      className="flex-1 p-2 bg-dame-gray rounded text-white text-sm"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        setShowAskDame(false);
                        // Navigate to booking
                      }}
                      className="flex-1 p-2 bg-gold rounded text-black text-sm font-medium"
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              ) : (
                // Show initial questions
                askDameQuestions.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <button
                      className="w-full text-left p-3 bg-dame-gray rounded-lg text-white text-sm hover:bg-dame-gray/70 transition-colors"
                      onClick={() => setSelectedQuestion(item.question)}
                    >
                      {item.question}
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-dame-gray">
              <p className="text-dame-textMuted text-sm">
                Need more personalized guidance? Book a 1-on-1 session for detailed coaching.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
