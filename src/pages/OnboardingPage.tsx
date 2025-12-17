import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { ChevronLeft, ChevronRight, Target, Home, Dumbbell, Clock, Trophy } from 'lucide-react';

const steps = [
  {
    id: 'goal',
    title: "What's your primary goal?",
    subtitle: 'This helps us recommend the right workouts for you.',
    icon: Target,
    options: [
      { value: 'build-muscle', label: 'Build Muscle', desc: 'Increase strength and size' },
      { value: 'lose-weight', label: 'Lose Weight', desc: 'Burn fat and get lean' },
      { value: 'get-fit', label: 'Get Fit', desc: 'Improve overall fitness' },
      { value: 'stay-active', label: 'Stay Active', desc: 'Maintain current level' },
    ],
  },
  {
    id: 'environment',
    title: 'Where do you prefer to train?',
    subtitle: 'We will show you workouts that match your setup.',
    icon: Home,
    options: [
      { value: 'home', label: 'At Home', desc: 'Limited or no equipment' },
      { value: 'gym', label: 'At the Gym', desc: 'Full equipment access' },
      { value: 'both', label: 'Both', desc: 'I train wherever I can' },
    ],
  },
  {
    id: 'experience',
    title: 'What is your experience level?',
    subtitle: 'Be honest - we will meet you where you are.',
    icon: Trophy,
    options: [
      { value: 'beginner', label: 'Beginner', desc: 'New to fitness' },
      { value: 'intermediate', label: 'Intermediate', desc: '1-3 years training' },
      { value: 'advanced', label: 'Advanced', desc: '3+ years experience' },
    ],
  },
  {
    id: 'equipment',
    title: 'What equipment do you have?',
    subtitle: 'Select all that apply.',
    icon: Dumbbell,
    options: [
      { value: 'none', label: 'No Equipment', desc: 'Bodyweight only' },
      { value: 'dumbbells', label: 'Dumbbells', desc: 'Adjustable or fixed' },
      { value: 'barbell', label: 'Barbell & Rack', desc: 'Full setup' },
      { value: 'machines', label: 'Gym Machines', desc: 'Cable, leg press, etc.' },
      { value: 'bands', label: 'Resistance Bands', desc: 'Various resistances' },
    ],
    multi: true,
  },
  {
    id: 'time',
    title: 'How much time can you commit?',
    subtitle: 'Per workout session, on average.',
    icon: Clock,
    options: [
      { value: '15-20', label: '15-20 minutes', desc: 'Quick and efficient' },
      { value: '30-40', label: '30-40 minutes', desc: 'Balanced session' },
      { value: '45-60', label: '45-60 minutes', desc: 'Full workout' },
      { value: '60+', label: '60+ minutes', desc: 'Extended training' },
    ],
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { updatePreferences, completeOnboarding } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string | string[]>>({
    goal: '',
    environment: '',
    experience: '',
    equipment: [],
    time: '',
  });

  const step = steps[currentStep];
  const isMulti = step.multi;
  const currentValue = selections[step.id];

  const handleSelect = (value: string) => {
    if (isMulti) {
      const current = currentValue as string[];
      if (current.includes(value)) {
        setSelections({ ...selections, [step.id]: current.filter(v => v !== value) });
      } else {
        setSelections({ ...selections, [step.id]: [...current, value] });
      }
    } else {
      setSelections({ ...selections, [step.id]: value });
    }
  };

  const canProceed = isMulti 
    ? (currentValue as string[]).length > 0 
    : currentValue !== '';

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      updatePreferences({
        goal: selections.goal as string,
        environment: selections.environment as string,
        experience: selections.experience as string,
        equipment: selections.equipment as string[],
        timeCommitment: selections.time as string,
      });
      completeOnboarding();
      navigate('/home');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const Icon = step.icon;

  return (
    <div className="min-h-screen bg-dame-black px-6 py-8 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={handleBack}
          className={`p-2 rounded-full ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-dame-textMuted hover:text-white'}`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === currentStep ? 'w-8 bg-gold' : i < currentStep ? 'w-4 bg-gold/50' : 'w-4 bg-dame-gray'
              }`}
            />
          ))}
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col animate-fade-in" key={currentStep}>
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-4">
            <Icon className="w-8 h-8 text-gold" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{step.title}</h1>
          <p className="text-dame-textMuted">{step.subtitle}</p>
        </div>

        <div className="space-y-3 flex-1">
          {step.options.map(option => {
            const isSelected = isMulti
              ? (currentValue as string[]).includes(option.value)
              : currentValue === option.value;

            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  isSelected
                    ? 'border-gold bg-gold/10'
                    : 'border-dame-gray bg-dame-dark hover:border-dame-muted'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-semibold ${isSelected ? 'text-gold' : 'text-white'}`}>
                      {option.label}
                    </p>
                    <p className="text-sm text-dame-textMuted">{option.desc}</p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-gold bg-gold' : 'border-dame-muted'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-6">
        <Button
          onClick={handleNext}
          disabled={!canProceed}
          size="lg"
          className="w-full"
        >
          {currentStep === steps.length - 1 ? 'Start Training' : 'Continue'}
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
