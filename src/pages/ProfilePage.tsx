import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Flame, Clock, Trophy, Target, Calendar, Settings, ChevronRight, LogOut, ExternalLink } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { socialLinks } from '../components/SocialIcons';

export default function ProfilePage() {
  const { state, resetProgress } = useApp();
  const { user, preferences, progress } = state;

  const stats = [
    { label: 'Total Workouts', value: progress.completedWorkouts.length, icon: Trophy },
    { label: 'Minutes Trained', value: progress.totalMinutes, icon: Clock },
    { label: 'Current Streak', value: `${progress.currentStreak} days`, icon: Flame },
    { label: 'Longest Streak', value: `${progress.longestStreak} days`, icon: Target },
  ];

  return (
    <div className="min-h-screen bg-dame-black pb-24">
      <div className="px-6 pt-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">Profile</h1>
          <button className="text-dame-textMuted">
            <Settings className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-dame-gray flex items-center justify-center">
            <span className="text-gold font-bold text-3xl">{user.name.charAt(0)}</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-dame-textMuted">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {stats.map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-dame-dark rounded-xl p-4">
                <Icon className="w-6 h-6 text-gold mb-2" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-dame-textMuted">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-dame-dark rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-white mb-3">Weekly Goal Progress</h3>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex-1 h-3 bg-dame-gray rounded-full overflow-hidden">
              <div
                className="h-full bg-gold rounded-full"
                style={{ width: `${Math.min(100, (progress.thisWeekWorkouts / progress.weeklyGoal) * 100)}%` }}
              />
            </div>
            <span className="text-gold font-semibold">
              {progress.thisWeekWorkouts}/{progress.weeklyGoal}
            </span>
          </div>
          <p className="text-sm text-dame-textMuted">
            {progress.thisWeekWorkouts >= progress.weeklyGoal
              ? 'Goal achieved! Amazing work!'
              : `${progress.weeklyGoal - progress.thisWeekWorkouts} more workouts to reach your goal`}
          </p>
        </div>

        <div className="bg-dame-dark rounded-xl overflow-hidden mb-6">
          <h3 className="font-semibold text-white p-4 border-b border-dame-gray">My Preferences</h3>
          <div className="divide-y divide-dame-gray">
            <div className="p-4 flex justify-between">
              <span className="text-dame-textMuted">Goal</span>
              <span className="text-white capitalize">{preferences.goal.replace('-', ' ')}</span>
            </div>
            <div className="p-4 flex justify-between">
              <span className="text-dame-textMuted">Environment</span>
              <span className="text-white capitalize">{preferences.environment}</span>
            </div>
            <div className="p-4 flex justify-between">
              <span className="text-dame-textMuted">Experience</span>
              <span className="text-white capitalize">{preferences.experience}</span>
            </div>
            <div className="p-4 flex justify-between">
              <span className="text-dame-textMuted">Time per Session</span>
              <span className="text-white">{preferences.timeCommitment} min</span>
            </div>
          </div>
        </div>

        {/* Follow Dame Social Media */}
        <div className="bg-dame-dark rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-white mb-3">Follow Dame</h3>
          <p className="text-dame-textMuted text-sm mb-4">Stay connected and get motivation daily</p>
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
                  <div className="flex-1">
                    <span className="font-medium text-sm">{social.name}</span>
                  </div>
                  <ExternalLink size={16} className="opacity-60" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Tertiary Booking CTA */}
        <Link to="/book" className="block mb-6">
          <div className="bg-dame-dark rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="font-semibold text-white">Book 1:1 Session</p>
                <p className="text-sm text-dame-textMuted">Train with Dame personally</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-dame-textMuted" />
          </div>
        </Link>

        <Button
          variant="ghost"
          className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
          onClick={resetProgress}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Reset Demo Data
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}
