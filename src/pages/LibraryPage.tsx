import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { workouts, categories, difficulties, environments } from '../data/workouts';
import { Search, Filter, Play, Clock, Flame, X, Dumbbell } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { EmptyState, SkeletonCard } from '../components/LoadingSpinner';

export default function LibraryPage() {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'All',
    difficulty: 'All',
    environment: 'All',
    duration: 'All',
  });

  const filteredWorkouts = useMemo(() => {
    return workouts.filter(w => {
      if (search && !w.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (filters.category !== 'All' && w.category !== filters.category) return false;
      if (filters.difficulty !== 'All' && w.difficulty !== filters.difficulty) return false;
      if (filters.environment !== 'All' && w.environment !== filters.environment && w.environment !== 'both') return false;
      if (filters.duration !== 'All') {
        const [min, max] = filters.duration.split('-').map(Number);
        if (filters.duration === '45+') {
          if (w.duration < 45) return false;
        } else if (w.duration < min || w.duration > max) return false;
      }
      return true;
    });
  }, [search, filters]);

  const activeFiltersCount = Object.values(filters).filter(v => v !== 'All').length;

  return (
    <div className="min-h-screen bg-dame-black pb-24">
      <div className="px-6 pt-8 pb-4 sticky top-0 bg-dame-black z-40">
        <h1 className="text-2xl font-bold text-white mb-4">Workout Library</h1>
        
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dame-textMuted" />
            <input
              type="text"
              placeholder="Search workouts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
              className="w-full bg-dame-dark border border-dame-gray rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-dame-textMuted focus:outline-none focus:border-gold focus-ring transition-colors"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 rounded-xl flex items-center gap-2 ${
              activeFiltersCount > 0 ? 'bg-gold text-black' : 'bg-dame-dark text-white border border-dame-gray'
            }`}
          >
            <Filter className="w-5 h-5" />
            {activeFiltersCount > 0 && <span className="font-semibold">{activeFiltersCount}</span>}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-dame-dark rounded-xl border border-dame-gray animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Filters</h3>
              <button
                onClick={() => setFilters({ category: 'All', difficulty: 'All', environment: 'All', duration: 'All' })}
                className="text-gold text-sm"
              >
                Reset
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-dame-textMuted mb-2 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFilters({ ...filters, category: cat })}
                      className={`px-3 py-1.5 rounded-lg text-sm ${
                        filters.category === cat ? 'bg-gold text-black' : 'bg-dame-gray text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-dame-textMuted mb-2 block">Difficulty</label>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map(diff => (
                    <button
                      key={diff}
                      onClick={() => setFilters({ ...filters, difficulty: diff })}
                      className={`px-3 py-1.5 rounded-lg text-sm capitalize ${
                        filters.difficulty === diff ? 'bg-gold text-black' : 'bg-dame-gray text-white'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-dame-textMuted mb-2 block">Environment</label>
                <div className="flex flex-wrap gap-2">
                  {environments.map(env => (
                    <button
                      key={env}
                      onClick={() => setFilters({ ...filters, environment: env })}
                      className={`px-3 py-1.5 rounded-lg text-sm capitalize ${
                        filters.environment === env ? 'bg-gold text-black' : 'bg-dame-gray text-white'
                      }`}
                    >
                      {env}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-dame-textMuted mb-2 block">Duration (min)</label>
                <div className="flex flex-wrap gap-2">
                  {['All', '0-15', '16-30', '31-45', '45+'].map(dur => (
                    <button
                      key={dur}
                      onClick={() => setFilters({ ...filters, duration: dur })}
                      className={`px-3 py-1.5 rounded-lg text-sm ${
                        filters.duration === dur ? 'bg-gold text-black' : 'bg-dame-gray text-white'
                      }`}
                    >
                      {dur === 'All' ? 'Any' : dur}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="px-6">
        <p className="text-dame-textMuted text-sm mb-4">{filteredWorkouts.length} workouts found</p>
        
        {filteredWorkouts.length === 0 ? (
          <EmptyState
            icon={<Dumbbell className="w-8 h-8 text-dame-textMuted" />}
            title="No workouts found"
            description={search ? `No workouts match "${search}"` : "No workouts match your current filters"}
            action={{
              label: search ? "Clear search" : "Reset filters",
              onClick: () => {
                if (search) {
                  setSearch('');
                } else {
                  setFilters({ category: 'All', difficulty: 'All', environment: 'All', duration: 'All' });
                }
              }
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredWorkouts.map((workout, index) => (
              <Link
                key={workout.id}
                to={`/workout/${workout.id}`}
                className={`bg-dame-dark rounded-xl overflow-hidden group hover-lift stagger-fade-in animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img
                    src={workout.thumbnail}
                    alt={workout.title}
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300 img-loading"
                    onLoad={(e) => {
                      e.currentTarget.classList.remove('img-loading');
                      e.currentTarget.classList.add('img-loaded');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      workout.difficulty === 'hard' ? 'bg-red-500/20 text-red-400' :
                      workout.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {workout.difficulty}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-dame-gray/80 text-white capitalize">
                      {workout.environment}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center hover-glow">
                      <Play className="w-4 h-4 text-black ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-1">{workout.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-dame-textMuted">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {workout.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      {workout.calories} cal
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
