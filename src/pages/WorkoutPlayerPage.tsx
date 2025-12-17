import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { workouts } from '../data/workouts';
import { useApp } from '../context/AppContext';
import { X, Pause, Play, SkipForward, Volume2, VolumeX, ChevronUp, ChevronDown } from 'lucide-react';

export default function WorkoutPlayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recordWorkoutCompletion } = useApp();
  const workout = workouts.find(w => w.id === id);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showExercisePanel, setShowExercisePanel] = useState(false);
  const [currentAICue, setCurrentAICue] = useState<string | null>(null);
  const [aiActive, setAIActive] = useState(false);
  const [showFormCheck, setShowFormCheck] = useState(false);
  const [formCheckTriggered, setFormCheckTriggered] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  const lastCueTimeRef = useRef<number>(0);
  
  // Countdown and workout state
  const [countdown, setCountdown] = useState(5); // 5 second countdown
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [showCountdown, setShowCountdown] = useState(true);
  const [isSimulated, setIsSimulated] = useState(false); // For when real video fails
  const simulationInterval = useRef<NodeJS.Timeout>();

  if (!workout) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Workout not found</p>
      </div>
    );
  }

  const totalDuration = workout.duration * 60;
  const currentExerciseIndex = workout.exercises.findIndex((ex, idx) => {
    const nextEx = workout.exercises[idx + 1];
    return currentTime >= ex.startTime && (!nextEx || currentTime < nextEx.startTime);
  });
  const currentExercise = workout.exercises[Math.max(0, currentExerciseIndex)];
  const exerciseProgress = currentExercise
    ? ((currentTime - currentExercise.startTime) / currentExercise.duration) * 100
    : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (isSimulated) {
      // Handle simulated video
      if (isPlaying) {
        if (simulationInterval.current) {
          clearInterval(simulationInterval.current);
          simulationInterval.current = undefined;
        }
      } else {
        startSimulation();
      }
      setIsPlaying(!isPlaying);
    } else if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const startSimulation = () => {
    // Simulate video playback with interval updates
    simulationInterval.current = setInterval(() => {
      setCurrentTime(prev => {
        const newTime = prev + 1;
        if (newTime >= totalDuration) {
          handleComplete();
          return totalDuration;
        }
        return newTime;
      });
    }, 1000);
  };

  const handleSkip = () => {
    const nextExercise = workout.exercises[currentExerciseIndex + 1];
    if (nextExercise) {
      const newTime = nextExercise.startTime;
      if (isSimulated) {
        setCurrentTime(newTime);
      } else if (videoRef.current) {
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
      }
    }
  };

  const handleExit = () => {
    if (currentTime > 60) {
      const completedMinutes = Math.floor(currentTime / 60);
      recordWorkoutCompletion(workout.id, completedMinutes);
      navigate(`/workout/${workout.id}/complete`, { state: { duration: completedMinutes, workout } });
    } else {
      navigate(`/workout/${workout.id}`);
    }
  };

  const handleComplete = () => {
    recordWorkoutCompletion(workout.id, workout.duration);
    navigate(`/workout/${workout.id}/complete`, { state: { duration: workout.duration, workout } });
  };

  const handleVideoClick = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  // Countdown effect
  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const timer = setTimeout(() => {
        if (countdown === 1) {
          // Countdown finished - start workout
          setShowCountdown(false);
          setWorkoutStarted(true);
          
          // Try to start real video, fallback to simulation
          if (videoRef.current) {
            videoRef.current.play().catch(() => {
              // Video failed to load/play - use simulation
              setIsSimulated(true);
              setIsPlaying(true);
              startSimulation();
            });
          } else {
            // No video element - use simulation
            setIsSimulated(true);
            setIsPlaying(true);
            startSimulation();
          }
          
          // Haptic feedback for workout start
          if ('vibrate' in navigator) {
            navigator.vibrate([100, 50, 100]); // Strong start vibration
          }
        } else {
          setCountdown(countdown - 1);
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [countdown, showCountdown]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !workoutStarted) return;

    const handleTimeUpdate = () => {
      const time = video.currentTime;
      setCurrentTime(time);
      
      // Check for AI coaching cues
      if (workout.aiCoach && workout.aiCoach.cues) {
        const currentSecond = Math.floor(time);
        const matchingCue = workout.aiCoach.cues.find(cue => 
          cue.at === currentSecond && 
          currentSecond > lastCueTimeRef.current + 30 && // Min 30s between cues
          !currentAICue // Don't stack cues
        );
        
        if (matchingCue) {
          // Skip cues during rest periods or transitions
          const isInRestPeriod = currentExercise && 
            (currentTime - currentExercise.startTime) > (currentExercise.duration - 10);
          
          if (!isInRestPeriod) {
            setCurrentAICue(matchingCue.text);
            setAIActive(true);
            lastCueTimeRef.current = currentSecond;
            
            // Haptic feedback for AI cue
            if ('vibrate' in navigator) {
              navigator.vibrate(50); // Subtle 50ms vibration
            }
            
            // Hide cue after 3 seconds
            setTimeout(() => {
              setCurrentAICue(null);
              setTimeout(() => setAIActive(false), 500);
            }, 3000);
          }
        }
        
        // Trigger form check animation once during workout (around 1/3 through)
        if (!formCheckTriggered && currentTime > totalDuration * 0.33 && currentTime < totalDuration * 0.35) {
          const isInExercise = currentExercise && 
            (currentTime - currentExercise.startTime) > 10 && 
            (currentTime - currentExercise.startTime) < (currentExercise.duration - 10);
          
          if (isInExercise) {
            setShowFormCheck(true);
            setFormCheckTriggered(true);
            
            // Haptic feedback for form check
            if ('vibrate' in navigator) {
              navigator.vibrate([30, 100, 30]); // Pattern: short-pause-short
            }
            
            // Hide form check after 3 seconds
            setTimeout(() => setShowFormCheck(false), 3000);
          }
        }
      }
    };
    
    const handleEnded = () => handleComplete();

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      if (video) {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('ended', handleEnded);
      }
      // Cleanup simulation interval
      if (simulationInterval.current) {
        clearInterval(simulationInterval.current);
      }
    };
  }, [currentExercise, currentAICue, workoutStarted]);

  useEffect(() => {
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
    }
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col" onClick={handleVideoClick}>
      {/* Video Area - 60-70% of screen */}
      <div className="relative flex-1" style={{ minHeight: '60vh', maxHeight: '70vh' }}>
        {!isSimulated ? (
          <video
            ref={videoRef}
            src={workout.videoUrl}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            muted={isMuted}
            onError={() => {
              // Video failed to load - switch to simulation
              setIsSimulated(true);
            }}
          />
        ) : (
          // Simulated workout background with dynamic exercise display
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* Dynamic background based on exercise type */}
            <div className={`absolute inset-0 transition-all duration-1000 ${
              currentExercise.name.toLowerCase().includes('warm') || currentExercise.name.toLowerCase().includes('cool') 
                ? 'bg-gradient-to-br from-blue-900 via-purple-900 to-black' 
                : currentExercise.name.toLowerCase().includes('cardio') || currentExercise.name.toLowerCase().includes('mountain')
                ? 'bg-gradient-to-br from-red-900 via-orange-900 to-black'
                : 'bg-gradient-to-br from-dame-dark via-gold/10 to-black'
            }`}></div>
            
            {/* Animated workout visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center z-10">
                {/* Exercise number with pulse animation */}
                <div className={`w-36 h-36 mx-auto mb-8 bg-gradient-to-r from-gold to-yellow-400 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isPlaying ? 'animate-pulse shadow-2xl shadow-gold/50' : ''
                }`}>
                  <span className="text-black text-5xl font-bold">{currentExerciseIndex + 1}</span>
                </div>
                
                {/* Exercise name with typewriter effect */}
                <p className="text-3xl font-bold text-white mb-3 max-w-md mx-auto leading-tight">
                  {currentExercise.name}
                </p>
                
                {/* Dame coaching text */}
                <p className="text-gold text-xl mb-6 font-medium">
                  {isPlaying ? "Dame's coaching you live" : "Dame's ready to guide"}
                </p>
                
                {/* Form tips as floating badges */}
                <div className="flex flex-wrap gap-2 justify-center max-w-sm mx-auto">
                  {currentExercise.formTips.slice(0, 2).map((tip, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm border border-white/30"
                    >
                      {tip}
                    </span>
                  ))}
                </div>
                
                {/* Exercise progress indicator */}
                <div className="mt-8 w-64 mx-auto">
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold to-yellow-400 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(0, exerciseProgress))}%` }}
                    />
                  </div>
                  <p className="text-white/60 text-sm mt-2">
                    {formatTime(Math.max(0, currentExercise.duration - (currentTime - currentExercise.startTime)))} remaining
                  </p>
                </div>
              </div>
              
              {/* Animated background elements */}
              {isPlaying && (
                <>
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold/30 rounded-full animate-ping"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-yellow-400/40 rounded-full animate-ping delay-1000"></div>
                  <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-gold/50 rounded-full animate-ping delay-2000"></div>
                </>
              )}
            </div>
          </div>
        )}
        
        {/* Countdown Overlay */}
        {showCountdown && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="text-center">
              <div className="w-40 h-40 mx-auto mb-8 bg-gradient-to-r from-gold to-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                {countdown === 0 ? (
                  <span className="text-black text-4xl font-bold">GO!</span>
                ) : (
                  <span className="text-black text-6xl font-bold">{countdown}</span>
                )}
              </div>
              <p className="text-white text-2xl font-semibold mb-2">
                {countdown === 0 ? "Let's do this!" : "Get Ready!"}
              </p>
              <p className="text-dame-textMuted text-lg">{workout.title}</p>
              <div className="mt-6 text-gold text-sm">
                Dame AI is ready to guide you
              </div>
            </div>
          </div>
        )}
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

        {/* Top controls */}
        <div className={`absolute top-0 left-0 right-0 p-4 flex items-center justify-between transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={(e) => { e.stopPropagation(); handleExit(); }}
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="text-center">
            <p className="text-gold text-sm font-semibold">{workout.title}</p>
            <p className="text-white/60 text-xs">with Dame</p>
          </div>
          <div className="flex items-center gap-2">
            {workout.aiCoach && (
              <div className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                aiActive ? 'bg-gold/30 text-gold' : 'bg-black/30 text-white/60'
              }`}>
                Dame AI • {aiActive ? 'Active' : 'Ready'}
              </div>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
              className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>

        {/* Center play/pause - only show after countdown */}
        {workoutStarted && (
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
            <button
              onClick={(e) => { e.stopPropagation(); handlePlayPause(); }}
              className="w-20 h-20 rounded-full bg-gold/90 flex items-center justify-center btn-gold-glow"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-black" fill="currentColor" />
              ) : (
                <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
              )}
            </button>
          </div>
        )}

        {/* AI Coaching Cue Overlay */}
        {currentAICue && (
          <div className="absolute bottom-1/4 left-4 right-4 flex justify-center">
            <div className="bg-gold/90 text-black px-6 py-3 rounded-2xl max-w-xs text-center animate-fade-in-up backdrop-blur-sm">
              <p className="font-semibold text-sm">{currentAICue}</p>
            </div>
          </div>
        )}

        {/* Visual Form Check */}
        {showFormCheck && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                {/* Scanning animation */}
                <div className="w-40 h-40 border-2 border-gold/60 rounded-full animate-pulse">
                  <div className="absolute inset-4 border border-gold/40 rounded-full">
                    <div className="absolute inset-4 border border-gold/20 rounded-full"></div>
                  </div>
                </div>
                
                {/* Status badge */}
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-500/90 text-white px-4 py-2 rounded-full text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      Form: Looking Good
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom info panel - 30-40% of screen */}
      <div className="bg-dame-black flex-shrink-0" style={{ minHeight: '30vh' }}>
        {/* Progress bar */}
        <div className="h-1 bg-dame-gray relative">
          <div
            className="h-full bg-gold transition-all duration-300"
            style={{ width: `${(currentTime / totalDuration) * 100}%` }}
          />
        </div>

        <div className="p-6">
          {/* Timer and controls row */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-3xl font-bold text-white">{formatTime(currentTime)}</p>
              <p className="text-dame-textMuted text-sm">of {formatTime(totalDuration)}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); handleSkip(); }}
              className="flex items-center gap-2 px-4 py-2 bg-dame-gray rounded-lg text-white"
            >
              <SkipForward className="w-5 h-5" />
              Skip
            </button>
          </div>

          {/* Current exercise */}
          <div className="bg-dame-dark rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gold text-sm font-medium">
                Exercise {currentExerciseIndex + 1} of {workout.exercises.length}
              </span>
              <span className="text-dame-textMuted text-sm">
                {formatTime(currentExercise.duration - (currentTime - currentExercise.startTime))} left
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{currentExercise.name}</h2>
            <div className="h-1.5 bg-dame-gray rounded-full overflow-hidden">
              <div
                className="h-full bg-gold rounded-full transition-all"
                style={{ width: `${Math.min(100, Math.max(0, exerciseProgress))}%` }}
              />
            </div>
          </div>

          {/* Form tips */}
          <div className="mb-4">
            <p className="text-dame-textMuted text-sm mb-2">Form Tips:</p>
            <div className="flex flex-wrap gap-2">
              {currentExercise.formTips.map((tip, i) => (
                <span key={i} className="px-3 py-1 bg-gold/10 rounded-full text-gold text-sm">
                  {tip}
                </span>
              ))}
            </div>
          </div>

          {/* Exercise list toggle */}
          <button
            onClick={(e) => { e.stopPropagation(); setShowExercisePanel(!showExercisePanel); }}
            className="w-full py-2 flex items-center justify-center gap-2 text-dame-textMuted"
          >
            {showExercisePanel ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
            <span className="text-sm">View All Exercises</span>
          </button>

          {showExercisePanel && (
            <div className="mt-4 max-h-40 overflow-y-auto space-y-2">
              {workout.exercises.map((ex, idx) => (
                <div
                  key={ex.id}
                  className={`p-3 rounded-lg flex items-center gap-3 ${
                    idx === currentExerciseIndex ? 'bg-gold/10 border border-gold' : 'bg-dame-gray'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                    idx === currentExerciseIndex ? 'bg-gold text-black' : 'bg-dame-muted text-white'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className={idx === currentExerciseIndex ? 'text-gold' : 'text-white'}>
                    {ex.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
