import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useApp } from '../context/AppContext';
import { ChevronLeft, Calendar, Clock, Video, MapPin, Check, Brain, Target, ExternalLink } from 'lucide-react';
import dameHeroImage from '../assets/dame-hero-image.webp';
import { socialLinks } from '../components/SocialIcons';

const sessionTypes = [
  { id: 'virtual', label: 'Virtual Session', icon: Video, desc: '1-on-1 video call with Dame' },
  { id: 'in-person', label: 'In-Person', icon: MapPin, desc: 'Train at Dame\'s studio' },
];

const durations = [
  { value: '30', label: '30 min', price: '$75' },
  { value: '60', label: '60 min', price: '$125' },
  { value: '90', label: '90 min', price: '$175' },
];

const timeSlots = [
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM',
  '12:00 PM', '1:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
];

export default function BookingPage() {
  const navigate = useNavigate();
  const { state } = useApp();
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState({
    type: '',
    duration: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    goals: '',
  });
  const [submitted, setSubmitted] = useState(false);
  
  // Generate AI insights for booking
  const getAIInsights = () => {
    const { preferences, progress } = state;
    const insights = [];
    
    if (progress.recoveryScore < 70) {
      insights.push("Recovery optimization and injury prevention");
    }
    
    if (preferences.goal) {
      insights.push(`${preferences.goal} progression strategy`);
    }
    
    if (progress.workoutSessions.length > 0) {
      const recentCategories = progress.workoutSessions
        .slice(-5)
        .map(s => s.category)
        .filter((v, i, a) => a.indexOf(v) === i);
      
      if (recentCategories.length > 2) {
        insights.push("Program structure and workout variety");
      }
    }
    
    if (preferences.environment) {
      insights.push(`${preferences.environment} training optimization`);
    }
    
    return insights.slice(0, 3);
  };
  
  const aiInsights = getAIInsights();

  const getNextDays = () => {
    const days = [];
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        value: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
      });
    }
    return days;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In production, integrate with Formspree or similar
    console.log('Booking submitted:', booking);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-dame-black px-6 py-8 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
          <Check className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Booking Request Sent!</h1>
        <p className="text-dame-textMuted mb-8 max-w-sm">
          Dame will review your request and confirm your session within 24 hours.
        </p>
        
        {/* Follow Dame while waiting */}
        <div className="bg-dame-dark rounded-xl p-4 mb-6 max-w-sm mx-auto">
          <h3 className="text-white font-semibold text-center mb-2">Follow Dame</h3>
          <p className="text-dame-textMuted text-sm text-center mb-4">
            Get daily motivation while you wait for your session
          </p>
          <div className="flex gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center flex-1 p-3 rounded-lg transition-all hover-lift btn-press ${social.bgColor} ${social.color}`}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
        
        <Button onClick={() => navigate('/home')}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dame-black">
      <div className="px-6 pt-8 pb-4 sticky top-0 bg-dame-black z-40 border-b border-dame-gray">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-white">Book 1:1 with Dame</h1>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full ${s <= step ? 'bg-gold' : 'bg-dame-gray'}`}
            />
          ))}
        </div>
      </div>

      {/* Dame Hero Section */}
      <div className="relative h-48 mb-6 overflow-hidden">
        <img 
          src={dameHeroImage}
          alt="Dame - Personal Fitness Coach"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dame-black via-dame-black/60 to-transparent" />
        <div className="absolute bottom-4 left-6 right-6">
          <h1 className="text-2xl font-bold text-white mb-1">Train with Dame</h1>
          <p className="text-dame-textMuted text-sm">Get personalized coaching tailored exactly to your goals</p>
        </div>
      </div>

      <div className="px-6 py-6">
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-semibold text-white mb-4">Choose Session Type</h2>
            <div className="space-y-3 mb-8">
              {sessionTypes.map(type => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setBooking({ ...booking, type: type.id })}
                    className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 ${
                      booking.type === type.id ? 'border-gold bg-gold/10' : 'border-dame-gray bg-dame-dark'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      booking.type === type.id ? 'bg-gold' : 'bg-dame-gray'
                    }`}>
                      <Icon className={`w-6 h-6 ${booking.type === type.id ? 'text-black' : 'text-white'}`} />
                    </div>
                    <div className="text-left">
                      <p className={`font-semibold ${booking.type === type.id ? 'text-gold' : 'text-white'}`}>
                        {type.label}
                      </p>
                      <p className="text-sm text-dame-textMuted">{type.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <h2 className="text-lg font-semibold text-white mb-4">Session Duration</h2>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {durations.map(dur => (
                <button
                  key={dur.value}
                  onClick={() => setBooking({ ...booking, duration: dur.value })}
                  className={`p-4 rounded-xl border-2 text-center ${
                    booking.duration === dur.value ? 'border-gold bg-gold/10' : 'border-dame-gray bg-dame-dark'
                  }`}
                >
                  <p className={`font-bold ${booking.duration === dur.value ? 'text-gold' : 'text-white'}`}>
                    {dur.label}
                  </p>
                  <p className="text-sm text-dame-textMuted">{dur.price}</p>
                </button>
              ))}
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!booking.type || !booking.duration}
              className="w-full"
              size="lg"
            >
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-semibold text-white mb-4">Select Date</h2>
            <div className="flex gap-2 overflow-x-auto pb-4 -mx-6 px-6 mb-6">
              {getNextDays().map(day => (
                <button
                  key={day.value}
                  onClick={() => setBooking({ ...booking, date: day.value })}
                  className={`flex-shrink-0 w-16 p-3 rounded-xl text-center ${
                    booking.date === day.value ? 'bg-gold text-black' : 'bg-dame-dark text-white'
                  }`}
                >
                  <p className="text-xs opacity-70">{day.day}</p>
                  <p className="text-xl font-bold">{day.date}</p>
                  <p className="text-xs opacity-70">{day.month}</p>
                </button>
              ))}
            </div>

            <h2 className="text-lg font-semibold text-white mb-4">Select Time</h2>
            <div className="grid grid-cols-3 gap-2 mb-8">
              {timeSlots.map(time => (
                <button
                  key={time}
                  onClick={() => setBooking({ ...booking, time })}
                  className={`p-3 rounded-xl text-sm ${
                    booking.time === time ? 'bg-gold text-black font-semibold' : 'bg-dame-dark text-white'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            <Button
              onClick={() => setStep(3)}
              disabled={!booking.date || !booking.time}
              className="w-full"
              size="lg"
            >
              Continue
            </Button>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit} className="animate-fade-in space-y-4">
            <h2 className="text-lg font-semibold text-white mb-4">Your Information</h2>
            
            <div>
              <label className="text-sm text-dame-textMuted mb-1 block">Full Name</label>
              <input
                type="text"
                required
                value={booking.name}
                onChange={e => setBooking({ ...booking, name: e.target.value })}
                className="w-full bg-dame-dark border border-dame-gray rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="text-sm text-dame-textMuted mb-1 block">Email</label>
              <input
                type="email"
                required
                value={booking.email}
                onChange={e => setBooking({ ...booking, email: e.target.value })}
                className="w-full bg-dame-dark border border-dame-gray rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="text-sm text-dame-textMuted mb-1 block">Phone</label>
              <input
                type="tel"
                required
                value={booking.phone}
                onChange={e => setBooking({ ...booking, phone: e.target.value })}
                className="w-full bg-dame-dark border border-dame-gray rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            {/* AI Insights Section */}
            {aiInsights.length > 0 && (
              <div className="bg-gold/10 border border-gold/30 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="w-5 h-5 text-gold" />
                  <h3 className="text-gold font-semibold">Dame AI suggests focusing on:</h3>
                </div>
                <div className="space-y-2">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                      <p className="text-gold text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="text-sm text-dame-textMuted mb-1 block">What are your goals?</label>
              <textarea
                value={booking.goals}
                onChange={e => setBooking({ ...booking, goals: e.target.value })}
                className="w-full bg-dame-dark border border-dame-gray rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold h-24 resize-none"
                placeholder="Tell Dame what you want to achieve..."
              />
            </div>

            <div className="bg-dame-dark rounded-xl p-4 mt-6">
              <h3 className="font-semibold text-white mb-3">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-dame-textMuted">Session Type</span>
                  <span className="text-white capitalize">{booking.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dame-textMuted">Duration</span>
                  <span className="text-white">{booking.duration} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dame-textMuted">Date</span>
                  <span className="text-white">{booking.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dame-textMuted">Time</span>
                  <span className="text-white">{booking.time}</span>
                </div>
                <div className="border-t border-dame-gray my-2 pt-2 flex justify-between">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-gold font-bold">
                    {durations.find(d => d.value === booking.duration)?.price}
                  </span>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full mt-6" size="lg">
              Submit Booking Request
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
