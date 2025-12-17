import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserPreferences {
  goal: string;
  environment: string;
  experience: string;
  equipment: string[];
  timeCommitment: string;
  onboardingComplete: boolean;
}

export interface WorkoutSession {
  workoutId: string;
  date: string;
  completedDuration: number;
  targetDuration: number;
  skippedExercises: string[];
  completionRate: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening';
}

export interface AILearningData {
  preferredWorkoutTypes: { [category: string]: number }; // completion rate by category
  preferredTimes: { [timeOfDay: string]: number }; // frequency by time of day
  difficultyPreference: { [difficulty: string]: number }; // completion rate by difficulty
  skipPatterns: { [exerciseType: string]: number }; // skip frequency by exercise type
  recoveryPatterns: {
    averageRestDays: number;
    intensityBeforeRest: number;
    lastIntenseWorkout: string | null;
  };
  completionTrends: {
    weeklyAverage: number;
    improvementRate: number;
    consistencyScore: number;
  };
}

export interface UserProgress {
  completedWorkouts: string[];
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
  lastWorkoutDate: string | null;
  weeklyGoal: number;
  thisWeekWorkouts: number;
  workoutSessions: WorkoutSession[];
  aiLearning: AILearningData;
  recoveryScore: number;
  energyLevel: 'low' | 'medium' | 'high';
}

export interface AppState {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  preferences: UserPreferences;
  progress: UserProgress;
  showSplash: boolean;
}

interface AppContextType {
  state: AppState;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  completeOnboarding: () => void;
  recordWorkoutCompletion: (workoutId: string, duration: number) => void;
  recordDetailedWorkoutSession: (session: Omit<WorkoutSession, 'date'>) => void;
  updateEnergyLevel: (level: 'low' | 'medium' | 'high') => void;
  getAIRecommendation: () => string | null;
  getRecoveryInsight: () => string | null;
  hideSplash: () => void;
  resetProgress: () => void;
}

const defaultState: AppState = {
  user: {
    name: 'Demo User',
    email: 'demo@damefitness.com',
    avatar: '',
  },
  preferences: {
    goal: '',
    environment: '',
    experience: '',
    equipment: [],
    timeCommitment: '',
    onboardingComplete: false,
  },
  progress: {
    completedWorkouts: [],
    totalMinutes: 0,
    currentStreak: 3,
    longestStreak: 7,
    lastWorkoutDate: null,
    weeklyGoal: 4,
    thisWeekWorkouts: 2,
    workoutSessions: [],
    aiLearning: {
      preferredWorkoutTypes: {},
      preferredTimes: { morning: 0, afternoon: 0, evening: 0 },
      difficultyPreference: { easy: 0, medium: 0, hard: 0 },
      skipPatterns: {},
      recoveryPatterns: {
        averageRestDays: 1,
        intensityBeforeRest: 0,
        lastIntenseWorkout: null,
      },
      completionTrends: {
        weeklyAverage: 0,
        improvementRate: 0,
        consistencyScore: 0.8,
      },
    },
    recoveryScore: 85,
    energyLevel: 'medium',
  },
  showSplash: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('dame-fitness-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...parsed, showSplash: true };
    }
    return defaultState;
  });

  useEffect(() => {
    const { showSplash, ...toSave } = state;
    localStorage.setItem('dame-fitness-state', JSON.stringify(toSave));
  }, [state]);

  const updatePreferences = (prefs: Partial<UserPreferences>) => {
    setState(prev => ({
      ...prev,
      preferences: { ...prev.preferences, ...prefs },
    }));
  };

  const completeOnboarding = () => {
    setState(prev => ({
      ...prev,
      preferences: { ...prev.preferences, onboardingComplete: true },
    }));
  };

  const recordWorkoutCompletion = (workoutId: string, duration: number) => {
    const today = new Date().toDateString();
    setState(prev => {
      const lastDate = prev.progress.lastWorkoutDate;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      let newStreak = prev.progress.currentStreak;
      if (lastDate === yesterday.toDateString()) {
        newStreak += 1;
      } else if (lastDate !== today) {
        newStreak = 1;
      }

      return {
        ...prev,
        progress: {
          ...prev.progress,
          completedWorkouts: [...prev.progress.completedWorkouts, workoutId],
          totalMinutes: prev.progress.totalMinutes + duration,
          currentStreak: newStreak,
          longestStreak: Math.max(prev.progress.longestStreak, newStreak),
          lastWorkoutDate: today,
          thisWeekWorkouts: prev.progress.thisWeekWorkouts + 1,
        },
      };
    });
  };

  const hideSplash = () => {
    setState(prev => ({ ...prev, showSplash: false }));
  };

  const recordDetailedWorkoutSession = (session: Omit<WorkoutSession, 'date'>) => {
    const today = new Date().toISOString().split('T')[0];
    const hour = new Date().getHours();
    const timeOfDay: 'morning' | 'afternoon' | 'evening' = 
      hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';

    const fullSession: WorkoutSession = {
      ...session,
      date: today,
      timeOfDay,
    };

    setState(prev => {
      const updatedSessions = [...prev.progress.workoutSessions, fullSession];
      
      // Update AI learning data
      const aiLearning = { ...prev.progress.aiLearning };
      
      // Update workout type preferences
      aiLearning.preferredWorkoutTypes[session.category] = 
        (aiLearning.preferredWorkoutTypes[session.category] || 0) + session.completionRate;
      
      // Update time preferences
      aiLearning.preferredTimes[timeOfDay]++;
      
      // Update difficulty preferences
      aiLearning.difficultyPreference[session.difficulty] = 
        (aiLearning.difficultyPreference[session.difficulty] || 0) + session.completionRate;
      
      // Calculate recovery score
      const recentSessions = updatedSessions.slice(-7); // Last week
      const avgIntensity = recentSessions.reduce((acc, s) => 
        acc + (s.difficulty === 'hard' ? 3 : s.difficulty === 'medium' ? 2 : 1), 0) / recentSessions.length;
      
      const newRecoveryScore = Math.max(50, Math.min(100, 100 - (avgIntensity - 1.5) * 20));

      return {
        ...prev,
        progress: {
          ...prev.progress,
          workoutSessions: updatedSessions,
          aiLearning,
          recoveryScore: Math.round(newRecoveryScore),
        },
      };
    });
  };

  const updateEnergyLevel = (level: 'low' | 'medium' | 'high') => {
    setState(prev => ({
      ...prev,
      progress: { ...prev.progress, energyLevel: level },
    }));
  };

  const getAIRecommendation = (): string | null => {
    const { aiLearning, workoutSessions, recoveryScore, energyLevel } = state.progress;
    
    // Smart recovery recommendations
    if (recoveryScore < 70) {
      return "Dame AI suggests a mobility session - you've been pushing hard lately";
    }
    
    // Energy-based recommendations
    if (energyLevel === 'low') {
      return "Dame AI recommends a gentle flow - match your energy today";
    }
    
    // Pattern-based recommendations
    const recentSessions = workoutSessions.slice(-5);
    const intenseSessions = recentSessions.filter(s => s.difficulty === 'hard').length;
    if (intenseSessions >= 3) {
      return "Dame AI suggests active recovery - time for a lighter session";
    }
    
    return null;
  };

  const getRecoveryInsight = (): string | null => {
    const { recoveryScore, workoutSessions } = state.progress;
    
    if (recoveryScore >= 85) {
      return "Recovery looking strong - ready for intensity";
    } else if (recoveryScore >= 70) {
      return "Good recovery balance - maintain current pace";
    } else {
      return "Focus on recovery - your body will thank you";
    }
  };

  const resetProgress = () => {
    setState(defaultState);
    localStorage.removeItem('dame-fitness-state');
  };

  return (
    <AppContext.Provider value={{
      state,
      updatePreferences,
      completeOnboarding,
      recordWorkoutCompletion,
      recordDetailedWorkoutSession,
      updateEnergyLevel,
      getAIRecommendation,
      getRecoveryInsight,
      hideSplash,
      resetProgress,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
