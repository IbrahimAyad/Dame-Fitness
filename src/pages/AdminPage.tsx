import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Upload, Plus, Video, Image, FileText, Check, X, ChevronDown } from 'lucide-react';
import BottomNav from '../components/BottomNav';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'upload' | 'manage'>('upload');
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    duration: '',
    difficulty: 'medium',
    environment: 'both',
    category: 'Strength',
    equipment: '',
    video: null as File | null,
    thumbnail: null as File | null,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Workout upload:', uploadForm);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setUploadForm({
      title: '',
      description: '',
      duration: '',
      difficulty: 'medium',
      environment: 'both',
      category: 'Strength',
      equipment: '',
      video: null,
      thumbnail: null,
    });
  };

  const mockWorkouts = [
    { id: '1', title: '30-Min Upper Body Power', status: 'published', views: 1234 },
    { id: '2', title: '45-Min Leg Day Burner', status: 'published', views: 892 },
    { id: '3', title: '15-Min Quick Core Blast', status: 'draft', views: 0 },
  ];

  return (
    <div className="min-h-screen bg-dame-black pb-24">
      <div className="px-6 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-dame-textMuted text-sm mb-6">Manage your workout content</p>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'upload' ? 'bg-gold text-black' : 'bg-dame-dark text-white'
            }`}
          >
            Upload New
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeTab === 'manage' ? 'bg-gold text-black' : 'bg-dame-dark text-white'
            }`}
          >
            Manage
          </button>
        </div>

        {showSuccess && (
          <div className="bg-green-500/20 border border-green-500 rounded-xl p-4 mb-6 flex items-center gap-3">
            <Check className="w-5 h-5 text-green-500" />
            <p className="text-green-400">Workout uploaded successfully! (Demo mode)</p>
          </div>
        )}

        {activeTab === 'upload' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-dame-textMuted mb-1 block">Workout Title</label>
              <input
                type="text"
                required
                value={uploadForm.title}
                onChange={e => setUploadForm({ ...uploadForm, title: e.target.value })}
                className="w-full bg-dame-dark border border-dame-gray rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold"
                placeholder="e.g., 30-Min Upper Body Power"
              />
            </div>

            <div>
              <label className="text-sm text-dame-textMuted mb-1 block">Description</label>
              <textarea
                required
                value={uploadForm.description}
                onChange={e => setUploadForm({ ...uploadForm, description: e.target.value })}
                className="w-full bg-dame-dark border border-dame-gray rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold h-24 resize-none"
                placeholder="Describe the workout..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-dame-textMuted mb-1 block">Duration (min)</label>
                <input
                  type="number"
                  required
                  value={uploadForm.duration}
                  onChange={e => setUploadForm({ ...uploadForm, duration: e.target.value })}
                  className="w-full bg-dame-dark border border-dame-gray rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold"
                  placeholder="30"
                />
              </div>
              <div>
                <label className="text-sm text-dame-textMuted mb-1 block">Category</label>
                <select
                  value={uploadForm.category}
                  onChange={e => setUploadForm({ ...uploadForm, category: e.target.value })}
                  className="w-full bg-dame-dark border border-dame-gray rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold appearance-none"
                >
                  <option>Strength</option>
                  <option>HIIT</option>
                  <option>Core</option>
                  <option>Mobility</option>
                  <option>Yoga</option>
                  <option>Athletic</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-dame-textMuted mb-1 block">Difficulty</label>
                <select
                  value={uploadForm.difficulty}
                  onChange={e => setUploadForm({ ...uploadForm, difficulty: e.target.value })}
                  className="w-full bg-dame-dark border border-dame-gray rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold appearance-none"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-dame-textMuted mb-1 block">Environment</label>
                <select
                  value={uploadForm.environment}
                  onChange={e => setUploadForm({ ...uploadForm, environment: e.target.value })}
                  className="w-full bg-dame-dark border border-dame-gray rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold appearance-none"
                >
                  <option value="home">Home</option>
                  <option value="gym">Gym</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-dame-textMuted mb-1 block">Equipment (comma-separated)</label>
              <input
                type="text"
                value={uploadForm.equipment}
                onChange={e => setUploadForm({ ...uploadForm, equipment: e.target.value })}
                className="w-full bg-dame-dark border border-dame-gray rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold"
                placeholder="Dumbbells, Bench, Cable Machine"
              />
            </div>

            <div>
              <label className="text-sm text-dame-textMuted mb-2 block">Workout Video</label>
              <label className="flex flex-col items-center justify-center w-full h-32 bg-dame-dark border-2 border-dashed border-dame-gray rounded-xl cursor-pointer hover:border-gold transition-colors">
                <Video className="w-8 h-8 text-dame-textMuted mb-2" />
                <span className="text-dame-textMuted text-sm">
                  {uploadForm.video ? uploadForm.video.name : 'Click to upload video'}
                </span>
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={e => setUploadForm({ ...uploadForm, video: e.target.files?.[0] || null })}
                />
              </label>
            </div>

            <div>
              <label className="text-sm text-dame-textMuted mb-2 block">Thumbnail Image</label>
              <label className="flex flex-col items-center justify-center w-full h-32 bg-dame-dark border-2 border-dashed border-dame-gray rounded-xl cursor-pointer hover:border-gold transition-colors">
                <Image className="w-8 h-8 text-dame-textMuted mb-2" />
                <span className="text-dame-textMuted text-sm">
                  {uploadForm.thumbnail ? uploadForm.thumbnail.name : 'Click to upload thumbnail'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => setUploadForm({ ...uploadForm, thumbnail: e.target.files?.[0] || null })}
                />
              </label>
            </div>

            <Button type="submit" className="w-full" size="lg">
              <Upload className="w-5 h-5 mr-2" />
              Upload Workout
            </Button>
          </form>
        )}

        {activeTab === 'manage' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-dame-textMuted">3 workouts</p>
              <Button size="sm" onClick={() => setActiveTab('upload')}>
                <Plus className="w-4 h-4 mr-1" />
                Add New
              </Button>
            </div>

            {mockWorkouts.map(workout => (
              <div key={workout.id} className="bg-dame-dark rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white">{workout.title}</h3>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    workout.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {workout.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-dame-textMuted">{workout.views} views</span>
                  <div className="flex gap-2">
                    <button className="text-gold text-sm font-medium">Edit</button>
                    <button className="text-red-400 text-sm font-medium">Delete</button>
                  </div>
                </div>
              </div>
            ))}

            <p className="text-center text-dame-textMuted text-sm pt-4">
              This is a demo interface. In production, uploads would be saved to your content management system.
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
