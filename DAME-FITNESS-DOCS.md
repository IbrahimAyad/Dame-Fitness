# Dame Fitness MVP – Technical Documentation

**Version:** 1.0  
**Last Updated:** December 17, 2024  
**Live URL:** https://vud183a12i61.space.minimax.io

---

## 1. Executive Summary

Dame Fitness MVP is a premium "Trainer-First" fitness platform that positions Dame as the authority while AI works invisibly behind the scenes. The platform delivers personalized workout experiences through progressive AI learning, smart recovery intelligence, and real-time coaching—all while maintaining Dame's voice and brand presence.

### Core Philosophy
> "AI assists quietly. Dame leads confidently."

The MVP is built for demo readiness and early user testing, featuring a dark premium aesthetic with gold accents, full localStorage persistence, and no backend dependencies.

---

## 2. Philosophy & Design Principles

### The Dame AI Approach
Unlike generic AI fitness apps, Dame Fitness makes the trainer the hero. AI enhances Dame's capabilities without overshadowing her brand:

- **Invisible Enhancement:** AI recommendations appear as Dame's insights
- **Progressive Trust:** Features unlock as users demonstrate commitment
- **Personalization Without Intrusion:** Learning happens through usage patterns, not invasive questionnaires
- **Conversion-Focused:** Every AI interaction includes natural paths to 1:1 coaching

### Visual Identity
- **Primary Background:** Dark (#0a0a0a, #111111)
- **Accent:** Gold/Amber (#f59e0b)
- **Typography:** Clean sans-serif with bold headings
- **Spacing:** Generous padding for premium feel
- **Animations:** Subtle, purposeful micro-interactions

---

## 3. System Overview

### Architecture
```
React + TypeScript + Vite
├── Context API (State Management)
├── React Router (Navigation)
├── TailwindCSS (Styling)
├── LocalStorage (Persistence)
└── Lucide Icons (UI Icons)
```

### Key Pages
| Page | Purpose |
|------|---------|
| Splash | Brand intro with animated logo |
| Onboarding | 5-step goal/preference collection |
| Home | Dashboard with AI picks, recovery score, progress |
| Library | Filterable workout catalog |
| WorkoutDetail | Video preview, AI explanation, start CTA |
| WorkoutPlayer | Full-screen player with countdown, coaching cues |
| Completion | Post-workout summary, conversion CTA |
| Booking | 1:1 coaching request form |
| Profile | User stats, preferences, social links |
| Admin | Trainer analytics dashboard |

---

## 4. Frontend Architecture

### Project Structure
```
src/
├── components/
│   ├── common/           # Reusable UI components
│   ├── home/             # Home page components
│   ├── onboarding/       # Onboarding flow
│   └── workout/          # Workout-related components
├── context/
│   └── AppContext.tsx    # Global state management
├── data/
│   └── workouts.ts       # Workout catalog + emergency workouts
├── pages/                # Route pages
├── utils/                # Helper functions
└── App.tsx               # Router configuration
```

### State Management (AppContext)
The AppContext manages all application state with localStorage persistence:

```typescript
interface AppState {
  user: User | null;
  workoutHistory: WorkoutSession[];
  bookingRequests: BookingRequest[];
  aiLearningData: AILearningData;
  hasCompletedOnboarding: boolean;
  currentStreak: number;
}
```

### AI Learning Data Structure
```typescript
interface AILearningData {
  preferredTimes: string[];           // Morning, afternoon, evening patterns
  completedCategories: Record<string, number>;  // Category completion counts
  averageWorkoutDuration: number;     // Minutes
  completionRate: number;             // 0-100%
  lastWorkoutDate: string | null;
  totalWorkouts: number;
  difficultyProgression: string[];    // beginner → intermediate → advanced
  focusAreas: string[];               // Areas user gravitates toward
}
```

### Key Components
- **BottomNav:** Persistent navigation with active state indicators
- **WorkoutCard:** Displays workout with AI badges, difficulty, duration
- **DameAIStatus:** Real-time AI status indicator (Active/Ready)
- **SocialIcons:** TikTok and Instagram links to Dame's profiles

---

## 5. Dame AI Mode – Feature Breakdown

### 5.1 AI Recommendation Engine
Located in `AppContext.tsx`, the `getAIRecommendation()` function provides personalized workout suggestions:

**Recommendation Logic:**
1. Time-based: Morning → energizing, Evening → recovery
2. Pattern-based: Suggests variety when user repeats categories
3. Recovery-aware: Recommends rest when recovery score is low
4. Progressive: Increases difficulty based on completion rate

### 5.2 Recovery Intelligence
The `calculateRecoveryScore()` function determines user readiness:

- **Factors:** Days since last workout, streak length, completion rate
- **Output:** 0-100 score with color-coded indicator
- **AI Insight:** `getRecoveryInsight()` provides contextual recommendations

### 5.3 Real-Time Coaching Cues
During workouts, AI coaching appears at timed intervals:

```typescript
interface AICoachCue {
  time: number;      // Seconds into workout
  message: string;   // Dame's coaching message
  type: 'form' | 'motivation' | 'breathing';
}
```

Cues are defined per workout in `workouts.ts` and displayed as overlay notifications.

### 5.4 Visual Form Check
Momentary scanning animation (1.5s) with "Form: Looking Good" feedback during workouts. Simulates AI form analysis without actual computer vision.

### 5.5 Ask Dame AI
Pre-written conversational responses for common questions:
- Workout recommendations
- Recovery advice
- Nutrition basics
- Motivation
- Training schedules

### 5.6 Emergency Workouts
Quick-access workouts for time-constrained users:
- **SOS Energy Boost:** 5 minutes
- **Desk Break Mobility:** 3 minutes
- **Stress Reset:** 7 minutes

---

## 6. Backend Integration Plan (Future)

### Recommended Stack: Supabase
```
Supabase
├── Auth (Email/Social login)
├── Database (PostgreSQL)
│   ├── users
│   ├── workouts
│   ├── workout_sessions
│   ├── booking_requests
│   └── ai_learning_data
├── Storage (Workout videos, thumbnails)
└── Edge Functions (AI processing)
```

### Database Schema (Proposed)
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  name TEXT,
  goals TEXT[],
  fitness_level TEXT,
  created_at TIMESTAMP
);

-- Workout sessions
CREATE TABLE workout_sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  workout_id TEXT,
  duration INTEGER,
  completed BOOLEAN,
  ai_cues_shown INTEGER,
  created_at TIMESTAMP
);

-- Booking requests
CREATE TABLE booking_requests (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name TEXT,
  email TEXT,
  focus_area TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP
);
```

### Migration Path
1. Set up Supabase project
2. Create database tables
3. Implement Supabase Auth
4. Replace localStorage with Supabase client
5. Upload workout videos to Storage
6. Deploy Edge Functions for AI processing

---

## 7. AI Roadmap

### Phase 1: Current (Rule-Based)
- ✅ Time-based recommendations
- ✅ Pattern recognition
- ✅ Recovery scoring
- ✅ Pre-written coaching cues
- ✅ Static form check simulation

### Phase 2: Enhanced Intelligence (3-6 months)
- [ ] LLM-powered Ask Dame AI (OpenAI/Anthropic)
- [ ] Dynamic coaching cue generation
- [ ] Personalized workout modifications
- [ ] Progress narrative generation

### Phase 3: Computer Vision (6-12 months)
- [ ] Real-time form analysis (MediaPipe/TensorFlow.js)
- [ ] Rep counting
- [ ] Movement quality scoring
- [ ] Injury risk detection

### Phase 4: Full AI Integration (12+ months)
- [ ] AI-generated workout programs
- [ ] Voice coaching (ElevenLabs)
- [ ] Predictive analytics
- [ ] Cross-platform sync

---

## 8. Analytics & Tracking Hooks

### Current Tracking Points
All analytics are logged to console and stored in localStorage:

```typescript
// Workout started
trackEvent('workout_started', { workoutId, category, difficulty });

// Workout completed
trackEvent('workout_completed', { 
  workoutId, 
  duration, 
  aiCuesShown, 
  formChecksTriggered 
});

// AI interaction
trackEvent('ai_interaction', { type, query, response });

// Booking submitted
trackEvent('booking_submitted', { focusArea });

// Conversion events
trackEvent('conversion_cta_clicked', { source, workoutId });
```

### Future Analytics Integration
- **Mixpanel/Amplitude:** User behavior analytics
- **PostHog:** Product analytics + session replay
- **Custom Dashboard:** Admin page metrics

---

## 9. Admin Ops

### Current Admin Features (`/admin`)
- **Total Users:** Registration count
- **Workouts Completed:** Session history
- **Booking Requests:** Pending/confirmed
- **Completion Rate:** Overall percentage
- **Booking Management:** View and update status

### Admin Capabilities
```typescript
// View all booking requests
const bookingRequests = state.bookingRequests;

// Update booking status
updateBookingStatus(bookingId, 'confirmed' | 'pending' | 'completed');

// View workout analytics
const analytics = {
  totalWorkouts: state.workoutHistory.length,
  completionRate: calculateCompletionRate(),
  popularWorkouts: getPopularWorkouts(),
};
```

### Future Admin Enhancements
- [ ] User management
- [ ] Workout CRUD
- [ ] Revenue tracking
- [ ] Email notifications
- [ ] Calendar integration

---

## 10. Booking Funnel

### User Flow
```
Workout Completion
       ↓
AI Summary + Conversion CTA
       ↓
Booking Page (Pre-filled with AI insights)
       ↓
Form Submission
       ↓
Confirmation + Social Links
```

### Booking Form Fields
- **Name** (required)
- **Email** (required)
- **Focus Area** (AI-suggested)
- **Message** (optional)

### Smart Pre-fill
The AI analyzes user patterns to suggest focus areas:
```typescript
function getBookingInsight(aiData: AILearningData): string {
  if (aiData.completedCategories['strength'] > 5) {
    return "Based on your strength training, consider 1:1 form coaching";
  }
  // ... more rules
}
```

---

## 11. Guardrails for Dame's Brand

### Voice Guidelines
All AI-generated text follows Dame's voice:
- **Confident:** "I've got you" not "The AI suggests"
- **Encouraging:** Positive reinforcement
- **Direct:** Clear instructions, no fluff
- **Personal:** "Your progress" not "User progress"

### Content Rules
- AI never speaks in first person as "AI"
- Recommendations attributed to Dame
- No generic fitness clichés
- Maintain premium, exclusive tone

### Implementation
```typescript
// AI messages always use Dame's voice
const aiMessages = {
  motivation: "You're killing it! Keep that energy up.",
  form: "Watch that form – quality over quantity.",
  rest: "Rest day recommended. Your body's earning gains.",
};
```

---

## 12. Developer Onboarding

### Getting Started

```bash
# Clone and install
cd /workspace/code/dame-fitness-mvp
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Key Files to Know
| File | Purpose |
|------|---------|
| `src/App.tsx` | Router and page layout |
| `src/context/AppContext.tsx` | All state management + AI logic |
| `src/data/workouts.ts` | Workout catalog + AI cues |
| `src/pages/*` | Page components |
| `tailwind.config.js` | Design system (colors, spacing) |

### Adding a New Workout
```typescript
// In src/data/workouts.ts
{
  id: 'unique-id',
  title: 'Workout Name',
  trainer: 'Dame',
  duration: 20,
  difficulty: 'intermediate',
  category: 'strength',
  equipment: ['dumbbells'],
  description: 'Workout description...',
  thumbnail: '/path/to/thumbnail.webp',
  videoUrl: 'https://video-url.com',
  aiCoach: [
    { time: 30, message: "Great start!", type: 'motivation' },
    { time: 60, message: "Keep your core tight", type: 'form' },
  ],
}
```

### Adding a New AI Feature
1. Define the feature logic in `AppContext.tsx`
2. Create UI components in `src/components/`
3. Integrate with existing pages
4. Test across all user flows
5. Ensure Dame's voice is maintained

### Testing Checklist
- [ ] Onboarding flow completes
- [ ] Workout player starts with countdown
- [ ] AI cues appear during workout
- [ ] Completion page shows with CTA
- [ ] Booking form submits successfully
- [ ] State persists after refresh
- [ ] All pages render on mobile

### Deployment
```bash
# Build production bundle
npm run build

# Deploy via platform CLI or agent
# Current deployment: https://vud183a12i61.space.minimax.io
```

---

## Appendix: Social Media Integration

### Dame's Profiles
- **TikTok:** [@lockedinmemo](https://www.tiktok.com/@lockedinmemo)
- **Instagram:** [@lockedinmemo](https://www.instagram.com/@lockedinmemo)

### Integration Points
- Profile page: "Follow Dame" section
- Workout completion: Social sharing prompt
- Booking confirmation: Stay connected links

---

*Document maintained by Matrix Agent. For updates or questions, refer to the codebase or project lead.*
