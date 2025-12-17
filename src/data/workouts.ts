// Import optimized professional images
import aiPickHero from '../assets/ai-pick-hero.webp';
import dameHeroImage from '../assets/dame-hero-image.webp';
import hiitHero from '../assets/hiit-hero.webp';
import emergencyEnergy from '../assets/emergency-energy.webp';
import emergencyDesk from '../assets/emergency-desk.webp';
import emergencyStress from '../assets/emergency-stress.webp';

export interface AICue {
  at: number; // seconds from workout start
  type: 'form' | 'tip' | 'push' | 'effort';
  text: string;
}

export interface AICoach {
  cues: AICue[];
  whyThisWorkout?: {
    goalAlignment: string;
    timeMatch: string;
    muscleEfficiency: string;
    restDayPairing?: string;
  };
  postWorkoutSummary?: {
    consistency: string;
    form: string;
    pairing: string;
  };
}

export interface Exercise {
  id: string;
  name: string;
  duration: number; // seconds
  startTime: number; // seconds from video start
  formTips: string[];
  muscleGroups: string[];
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  difficulty: 'easy' | 'medium' | 'hard';
  environment: 'home' | 'gym' | 'both';
  category: string;
  muscleGroups: string[];
  equipment: string[];
  calories: number;
  thumbnail: string;
  videoUrl: string;
  exercises: Exercise[];
  featured?: boolean;
  aiCoach?: AICoach;
}

export const workouts: Workout[] = [
  {
    id: '1',
    title: '30-Min Upper Body Power',
    description: 'Build strength and definition in your chest, shoulders, and arms with Dame. Perfect for intermediate lifters looking to level up.',
    duration: 30,
    difficulty: 'medium',
    environment: 'gym',
    category: 'Strength',
    muscleGroups: ['Chest', 'Shoulders', 'Arms', 'Back'],
    equipment: ['Dumbbells', 'Bench', 'Cable Machine'],
    calories: 280,
    thumbnail: aiPickHero,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    featured: true,
    exercises: [
      { id: 'e1', name: 'Warm-Up Arm Circles', duration: 60, startTime: 0, formTips: ['Keep shoulders relaxed', 'Full range of motion'], muscleGroups: ['Shoulders'] },
      { id: 'e2', name: 'Push-Ups', duration: 90, startTime: 60, formTips: ['Core tight', 'Elbows at 45 degrees'], muscleGroups: ['Chest', 'Triceps'] },
      { id: 'e3', name: 'Dumbbell Bench Press', duration: 180, startTime: 150, formTips: ['Feet flat on floor', 'Control the descent'], muscleGroups: ['Chest'] },
      { id: 'e4', name: 'Shoulder Press', duration: 180, startTime: 330, formTips: ['No arching back', 'Full extension'], muscleGroups: ['Shoulders'] },
      { id: 'e5', name: 'Bicep Curls', duration: 120, startTime: 510, formTips: ['No swinging', 'Squeeze at top'], muscleGroups: ['Biceps'] },
      { id: 'e6', name: 'Tricep Dips', duration: 120, startTime: 630, formTips: ['Shoulders down', 'Slow and controlled'], muscleGroups: ['Triceps'] },
      { id: 'e7', name: 'Lat Pulldowns', duration: 180, startTime: 750, formTips: ['Pull to chest', 'Squeeze shoulder blades'], muscleGroups: ['Back'] },
      { id: 'e8', name: 'Cable Flyes', duration: 150, startTime: 930, formTips: ['Slight bend in elbows', 'Feel the stretch'], muscleGroups: ['Chest'] },
      { id: 'e9', name: 'Cool Down Stretches', duration: 120, startTime: 1080, formTips: ['Deep breaths', 'Hold each stretch'], muscleGroups: ['Full Body'] },
    ],
    aiCoach: {
      cues: [
        { at: 90, type: 'form', text: 'Brace your core tight.' },
        { at: 180, type: 'tip', text: 'Control that negative - slow down.' },
        { at: 270, type: 'push', text: 'You\'ve got more - stay strong.' },
        { at: 420, type: 'form', text: 'Keep those elbows aligned.' },
        { at: 540, type: 'tip', text: 'Squeeze the peak contraction.' },
        { at: 720, type: 'effort', text: 'That set was clean.' },
        { at: 900, type: 'push', text: 'Focus on that mind-muscle connection.' },
        { at: 1050, type: 'effort', text: 'You stayed consistent today.' }
      ],
      whyThisWorkout: {
        goalAlignment: 'You chose muscle gain',
        timeMatch: 'You have 30 minutes today',
        muscleEfficiency: 'This hits chest and shoulders efficiently',
        restDayPairing: 'Good pairing before a rest day'
      },
      postWorkoutSummary: {
        consistency: 'You stayed consistent today',
        form: 'Form looked solid across most sets',
        pairing: 'This paired well with your last workout'
      }
    }
  },
  {
    id: '2',
    title: '45-Min Leg Day Burner',
    description: 'Intense lower body workout targeting quads, hamstrings, and glutes. Get ready to feel the burn and build serious leg strength.',
    duration: 45,
    difficulty: 'hard',
    environment: 'gym',
    category: 'Strength',
    muscleGroups: ['Quads', 'Hamstrings', 'Glutes', 'Calves'],
    equipment: ['Barbell', 'Squat Rack', 'Leg Press'],
    calories: 450,
    thumbnail: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    featured: true,
    exercises: [
      { id: 'e1', name: 'Dynamic Leg Swings', duration: 90, startTime: 0, formTips: ['Hold for balance', 'Controlled swing'], muscleGroups: ['Hip Flexors'] },
      { id: 'e2', name: 'Barbell Squats', duration: 300, startTime: 90, formTips: ['Chest up', 'Knees track toes'], muscleGroups: ['Quads', 'Glutes'] },
      { id: 'e3', name: 'Romanian Deadlifts', duration: 240, startTime: 390, formTips: ['Hinge at hips', 'Slight knee bend'], muscleGroups: ['Hamstrings'] },
      { id: 'e4', name: 'Leg Press', duration: 240, startTime: 630, formTips: ['Full range of motion', 'Dont lock knees'], muscleGroups: ['Quads'] },
      { id: 'e5', name: 'Walking Lunges', duration: 180, startTime: 870, formTips: ['Long strides', 'Upright torso'], muscleGroups: ['Quads', 'Glutes'] },
      { id: 'e6', name: 'Leg Curls', duration: 180, startTime: 1050, formTips: ['Slow negative', 'Squeeze at top'], muscleGroups: ['Hamstrings'] },
      { id: 'e7', name: 'Calf Raises', duration: 150, startTime: 1230, formTips: ['Full stretch', 'Pause at top'], muscleGroups: ['Calves'] },
      { id: 'e8', name: 'Glute Bridges', duration: 180, startTime: 1380, formTips: ['Squeeze glutes', 'Drive through heels'], muscleGroups: ['Glutes'] },
      { id: 'e9', name: 'Cool Down & Stretch', duration: 180, startTime: 1560, formTips: ['Focus on quads and hamstrings'], muscleGroups: ['Lower Body'] },
    ]
  },
  {
    id: '3',
    title: '15-Min Quick Core Blast',
    description: 'Short but intense core workout you can do anywhere. Perfect for busy days when you need a quick but effective session.',
    duration: 15,
    difficulty: 'easy',
    environment: 'both',
    category: 'Core',
    muscleGroups: ['Abs', 'Obliques', 'Lower Back'],
    equipment: ['None'],
    calories: 120,
    thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    exercises: [
      { id: 'e1', name: 'Plank Hold', duration: 60, startTime: 0, formTips: ['Flat back', 'Engage core'], muscleGroups: ['Core'] },
      { id: 'e2', name: 'Bicycle Crunches', duration: 90, startTime: 60, formTips: ['Touch elbow to knee', 'Control the movement'], muscleGroups: ['Obliques'] },
      { id: 'e3', name: 'Mountain Climbers', duration: 60, startTime: 150, formTips: ['Keep hips low', 'Drive knees forward'], muscleGroups: ['Core'] },
      { id: 'e4', name: 'Dead Bug', duration: 90, startTime: 210, formTips: ['Lower back pressed down', 'Move slowly'], muscleGroups: ['Core'] },
      { id: 'e5', name: 'Russian Twists', duration: 90, startTime: 300, formTips: ['Feet off ground', 'Rotate from core'], muscleGroups: ['Obliques'] },
      { id: 'e6', name: 'Leg Raises', duration: 90, startTime: 390, formTips: ['Control descent', 'No arching back'], muscleGroups: ['Lower Abs'] },
      { id: 'e7', name: 'Side Plank', duration: 90, startTime: 480, formTips: ['Hip up', 'Stack feet'], muscleGroups: ['Obliques'] },
      { id: 'e8', name: 'Flutter Kicks', duration: 60, startTime: 570, formTips: ['Small movements', 'Keep lower back down'], muscleGroups: ['Lower Abs'] },
      { id: 'e9', name: 'Stretch & Breathe', duration: 60, startTime: 630, formTips: ['Deep breaths', 'Relax'], muscleGroups: ['Core'] },
    ]
  },
  {
    id: '4',
    title: 'Full Body Strength 20',
    description: 'Efficient full-body workout using just your bodyweight. Great for home workouts or when traveling.',
    duration: 20,
    difficulty: 'medium',
    environment: 'home',
    category: 'Strength',
    muscleGroups: ['Full Body'],
    equipment: ['None'],
    calories: 180,
    thumbnail: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    featured: true,
    exercises: [
      { id: 'e1', name: 'Jumping Jacks', duration: 60, startTime: 0, formTips: ['Full arm extension', 'Land softly'], muscleGroups: ['Full Body'] },
      { id: 'e2', name: 'Squats', duration: 90, startTime: 60, formTips: ['Weight in heels', 'Depth matters'], muscleGroups: ['Legs'] },
      { id: 'e3', name: 'Push-Ups', duration: 90, startTime: 150, formTips: ['Core engaged', 'Full range'], muscleGroups: ['Chest', 'Arms'] },
      { id: 'e4', name: 'Lunges', duration: 120, startTime: 240, formTips: ['Knee over ankle', 'Upright torso'], muscleGroups: ['Legs'] },
      { id: 'e5', name: 'Plank', duration: 60, startTime: 360, formTips: ['No sagging', 'Breathe'], muscleGroups: ['Core'] },
      { id: 'e6', name: 'Burpees', duration: 90, startTime: 420, formTips: ['Explosive jump', 'Chest to ground'], muscleGroups: ['Full Body'] },
      { id: 'e7', name: 'Tricep Dips', duration: 90, startTime: 510, formTips: ['Shoulders down', 'Elbows back'], muscleGroups: ['Arms'] },
      { id: 'e8', name: 'High Knees', duration: 60, startTime: 600, formTips: ['Drive knees up', 'Pump arms'], muscleGroups: ['Cardio'] },
      { id: 'e9', name: 'Cool Down', duration: 90, startTime: 660, formTips: ['Slow movements', 'Deep breaths'], muscleGroups: ['Recovery'] },
    ],
    aiCoach: {
      cues: [
        { at: 30, type: 'form', text: 'Land soft on those toes.' },
        { at: 120, type: 'push', text: 'Drive through your heels — power up.' },
        { at: 210, type: 'form', text: 'Keep that core braced.' },
        { at: 300, type: 'tip', text: 'Control the descent.' },
        { at: 390, type: 'push', text: 'Hold steady — breathe through it.' },
        { at: 480, type: 'effort', text: 'Explosive movement - you got this.' },
        { at: 570, type: 'form', text: 'Shoulders down and back.' },
        { at: 630, type: 'push', text: 'Drive those knees high.' }
      ],
      whyThisWorkout: {
        goalAlignment: 'Perfect for your time crunch',
        timeMatch: 'Efficient 20-minute session',
        muscleEfficiency: 'Hits every major muscle group',
        restDayPairing: 'Great active recovery option'
      },
      postWorkoutSummary: {
        consistency: 'Solid effort throughout',
        form: 'Good movement quality today',
        pairing: 'Perfect for your home setup'
      }
    }
  },
  {
    id: '5',
    title: 'HIIT Cardio Blast',
    description: 'High-intensity interval training to torch calories and boost your metabolism. All-out effort for maximum results.',
    duration: 25,
    difficulty: 'hard',
    environment: 'both',
    category: 'HIIT',
    muscleGroups: ['Full Body'],
    equipment: ['None'],
    calories: 350,
    thumbnail: hiitHero,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    exercises: [
      { id: 'e1', name: 'Warm-Up Jog', duration: 90, startTime: 0, formTips: ['Light pace', 'Get blood flowing'], muscleGroups: ['Cardio'] },
      { id: 'e2', name: 'Sprint Intervals', duration: 180, startTime: 90, formTips: ['All out effort', 'Rest between'], muscleGroups: ['Cardio'] },
      { id: 'e3', name: 'Jump Squats', duration: 120, startTime: 270, formTips: ['Explode up', 'Land soft'], muscleGroups: ['Legs'] },
      { id: 'e4', name: 'Burpee Box Jumps', duration: 150, startTime: 390, formTips: ['Maintain form', 'Stay explosive'], muscleGroups: ['Full Body'] },
      { id: 'e5', name: 'Mountain Climbers', duration: 120, startTime: 540, formTips: ['Fast pace', 'Core tight'], muscleGroups: ['Core'] },
      { id: 'e6', name: 'Plyo Lunges', duration: 120, startTime: 660, formTips: ['Switch in air', 'Soft landing'], muscleGroups: ['Legs'] },
      { id: 'e7', name: 'Tuck Jumps', duration: 90, startTime: 780, formTips: ['Knees to chest', 'Quick recovery'], muscleGroups: ['Legs'] },
      { id: 'e8', name: 'Battle Ropes', duration: 120, startTime: 870, formTips: ['Full arm movement', 'Keep rhythm'], muscleGroups: ['Arms', 'Core'] },
      { id: 'e9', name: 'Cool Down Walk', duration: 120, startTime: 990, formTips: ['Slow pace', 'Recover heart rate'], muscleGroups: ['Recovery'] },
    ]
  },
  {
    id: '6',
    title: 'Dumbbell Sculpt',
    description: 'Total body dumbbell workout for building lean muscle and improving definition. All you need is a set of dumbbells.',
    duration: 35,
    difficulty: 'medium',
    environment: 'home',
    category: 'Strength',
    muscleGroups: ['Full Body'],
    equipment: ['Dumbbells'],
    calories: 300,
    thumbnail: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    exercises: [
      { id: 'e1', name: 'Dumbbell Warm-Up', duration: 90, startTime: 0, formTips: ['Light weight', 'Full movements'], muscleGroups: ['Full Body'] },
      { id: 'e2', name: 'Goblet Squats', duration: 180, startTime: 90, formTips: ['Hold at chest', 'Sit back'], muscleGroups: ['Legs'] },
      { id: 'e3', name: 'Dumbbell Rows', duration: 180, startTime: 270, formTips: ['Pull to hip', 'Squeeze back'], muscleGroups: ['Back'] },
      { id: 'e4', name: 'Chest Press', duration: 180, startTime: 450, formTips: ['Slow negative', 'Full stretch'], muscleGroups: ['Chest'] },
      { id: 'e5', name: 'Shoulder Press', duration: 150, startTime: 630, formTips: ['Core braced', 'Full lockout'], muscleGroups: ['Shoulders'] },
      { id: 'e6', name: 'Bicep Curls', duration: 120, startTime: 780, formTips: ['No momentum', 'Squeeze peak'], muscleGroups: ['Biceps'] },
      { id: 'e7', name: 'Tricep Extensions', duration: 120, startTime: 900, formTips: ['Elbows stable', 'Full extension'], muscleGroups: ['Triceps'] },
      { id: 'e8', name: 'Dumbbell Deadlifts', duration: 180, startTime: 1020, formTips: ['Flat back', 'Hip hinge'], muscleGroups: ['Hamstrings', 'Back'] },
      { id: 'e9', name: 'Stretch & Cool Down', duration: 120, startTime: 1200, formTips: ['Hold stretches', 'Relax'], muscleGroups: ['Full Body'] },
    ]
  },
  {
    id: '7',
    title: 'Morning Mobility Flow',
    description: 'Start your day right with this gentle mobility and stretching routine. Perfect for recovery days or morning wake-ups.',
    duration: 20,
    difficulty: 'easy',
    environment: 'home',
    category: 'Mobility',
    muscleGroups: ['Full Body'],
    equipment: ['None'],
    calories: 80,
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    exercises: [
      { id: 'e1', name: 'Cat-Cow Stretch', duration: 120, startTime: 0, formTips: ['Flow with breath', 'Full range'], muscleGroups: ['Spine'] },
      { id: 'e2', name: 'World Greatest Stretch', duration: 180, startTime: 120, formTips: ['Deep lunge', 'Rotate open'], muscleGroups: ['Hip Flexors'] },
      { id: 'e3', name: 'Hip Circles', duration: 120, startTime: 300, formTips: ['Large circles', 'Both directions'], muscleGroups: ['Hips'] },
      { id: 'e4', name: 'Shoulder Rolls', duration: 90, startTime: 420, formTips: ['Full circles', 'Relax neck'], muscleGroups: ['Shoulders'] },
      { id: 'e5', name: 'Downward Dog', duration: 120, startTime: 510, formTips: ['Press heels down', 'Long spine'], muscleGroups: ['Hamstrings', 'Back'] },
      { id: 'e6', name: 'Pigeon Pose', duration: 180, startTime: 630, formTips: ['Square hips', 'Breathe deeply'], muscleGroups: ['Glutes', 'Hip Flexors'] },
      { id: 'e7', name: 'Spinal Twist', duration: 120, startTime: 810, formTips: ['Both sides', 'Gentle rotation'], muscleGroups: ['Spine'] },
      { id: 'e8', name: 'Standing Forward Fold', duration: 90, startTime: 930, formTips: ['Soft knees OK', 'Hang heavy'], muscleGroups: ['Hamstrings'] },
      { id: 'e9', name: 'Deep Breathing', duration: 90, startTime: 1020, formTips: ['Box breathing', 'Center yourself'], muscleGroups: ['Mind-Body'] },
    ]
  },
  {
    id: '8',
    title: 'Back & Biceps Builder',
    description: 'Focus workout for building a strong, defined back and powerful biceps. Classic bodybuilding split.',
    duration: 40,
    difficulty: 'hard',
    environment: 'gym',
    category: 'Strength',
    muscleGroups: ['Back', 'Biceps'],
    equipment: ['Pull-Up Bar', 'Dumbbells', 'Cable Machine'],
    calories: 380,
    thumbnail: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=800',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    exercises: [
      { id: 'e1', name: 'Band Pull-Aparts', duration: 90, startTime: 0, formTips: ['Squeeze shoulder blades', 'Controlled'], muscleGroups: ['Upper Back'] },
      { id: 'e2', name: 'Pull-Ups', duration: 240, startTime: 90, formTips: ['Full hang', 'Chin over bar'], muscleGroups: ['Lats'] },
      { id: 'e3', name: 'Barbell Rows', duration: 240, startTime: 330, formTips: ['Flat back', 'Pull to belly'], muscleGroups: ['Back'] },
      { id: 'e4', name: 'Lat Pulldowns', duration: 180, startTime: 570, formTips: ['Wide grip', 'Squeeze lats'], muscleGroups: ['Lats'] },
      { id: 'e5', name: 'Seated Rows', duration: 180, startTime: 750, formTips: ['Chest up', 'Pull to sternum'], muscleGroups: ['Mid Back'] },
      { id: 'e6', name: 'Face Pulls', duration: 120, startTime: 930, formTips: ['External rotation', 'Light weight'], muscleGroups: ['Rear Delts'] },
      { id: 'e7', name: 'Barbell Curls', duration: 150, startTime: 1050, formTips: ['No swinging', 'Full range'], muscleGroups: ['Biceps'] },
      { id: 'e8', name: 'Hammer Curls', duration: 120, startTime: 1200, formTips: ['Neutral grip', 'Alternate arms'], muscleGroups: ['Biceps'] },
      { id: 'e9', name: 'Cool Down', duration: 120, startTime: 1320, formTips: ['Stretch lats', 'Foam roll'], muscleGroups: ['Recovery'] },
    ]
  },
  {
    id: '9',
    title: 'Power Yoga Flow',
    description: 'Dynamic yoga flow that builds strength and flexibility. Challenging poses with breath-synchronized movement.',
    duration: 30,
    difficulty: 'medium',
    environment: 'home',
    category: 'Yoga',
    muscleGroups: ['Full Body'],
    equipment: ['Yoga Mat'],
    calories: 200,
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    exercises: [
      { id: 'e1', name: 'Sun Salutation A', duration: 180, startTime: 0, formTips: ['Flow with breath', 'Smooth transitions'], muscleGroups: ['Full Body'] },
      { id: 'e2', name: 'Warrior I', duration: 150, startTime: 180, formTips: ['Hips square', 'Arms up'], muscleGroups: ['Legs', 'Core'] },
      { id: 'e3', name: 'Warrior II', duration: 150, startTime: 330, formTips: ['Hips open', 'Gaze over fingers'], muscleGroups: ['Legs'] },
      { id: 'e4', name: 'Triangle Pose', duration: 150, startTime: 480, formTips: ['Long spine', 'Stack shoulders'], muscleGroups: ['Legs', 'Core'] },
      { id: 'e5', name: 'Chair Pose', duration: 120, startTime: 630, formTips: ['Weight in heels', 'Arms strong'], muscleGroups: ['Legs'] },
      { id: 'e6', name: 'Crow Pose', duration: 120, startTime: 750, formTips: ['Lean forward', 'Engage core'], muscleGroups: ['Arms', 'Core'] },
      { id: 'e7', name: 'Wheel Pose', duration: 120, startTime: 870, formTips: ['Open chest', 'Push through hands'], muscleGroups: ['Back', 'Shoulders'] },
      { id: 'e8', name: 'Headstand Prep', duration: 120, startTime: 990, formTips: ['Core engaged', 'Slow and steady'], muscleGroups: ['Core', 'Shoulders'] },
      { id: 'e9', name: 'Savasana', duration: 180, startTime: 1110, formTips: ['Complete relaxation', 'Let go'], muscleGroups: ['Mind-Body'] },
    ]
  },
  {
    id: '10',
    title: 'Tabata Burnout',
    description: 'Classic Tabata intervals: 20 seconds work, 10 seconds rest. Short, brutal, and incredibly effective.',
    duration: 20,
    difficulty: 'hard',
    environment: 'both',
    category: 'HIIT',
    muscleGroups: ['Full Body'],
    equipment: ['None'],
    calories: 280,
    thumbnail: hiitHero,
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    exercises: [
      { id: 'e1', name: 'Warm-Up', duration: 120, startTime: 0, formTips: ['Get moving', 'Increase heart rate'], muscleGroups: ['Full Body'] },
      { id: 'e2', name: 'Tabata: Burpees', duration: 120, startTime: 120, formTips: ['All out', '8 rounds'], muscleGroups: ['Full Body'] },
      { id: 'e3', name: 'Tabata: Jump Squats', duration: 120, startTime: 240, formTips: ['Explode up', '8 rounds'], muscleGroups: ['Legs'] },
      { id: 'e4', name: 'Tabata: Push-Ups', duration: 120, startTime: 360, formTips: ['Chest to floor', '8 rounds'], muscleGroups: ['Chest'] },
      { id: 'e5', name: 'Tabata: Mountain Climbers', duration: 120, startTime: 480, formTips: ['Fast feet', '8 rounds'], muscleGroups: ['Core'] },
      { id: 'e6', name: 'Tabata: High Knees', duration: 120, startTime: 600, formTips: ['Drive knees', '8 rounds'], muscleGroups: ['Cardio'] },
      { id: 'e7', name: 'Tabata: Plank Jacks', duration: 120, startTime: 720, formTips: ['Core stable', '8 rounds'], muscleGroups: ['Core'] },
      { id: 'e8', name: 'Tabata: Lunges', duration: 120, startTime: 840, formTips: ['Alternate legs', '8 rounds'], muscleGroups: ['Legs'] },
      { id: 'e9', name: 'Cool Down', duration: 180, startTime: 960, formTips: ['Slow movements', 'Stretch'], muscleGroups: ['Recovery'] },
    ]
  },
  {
    id: '11',
    title: 'Chest & Triceps Pump',
    description: 'Classic push day workout targeting chest and triceps. Build size and strength with proven exercises.',
    duration: 40,
    difficulty: 'medium',
    environment: 'gym',
    category: 'Strength',
    muscleGroups: ['Chest', 'Triceps'],
    equipment: ['Barbell', 'Dumbbells', 'Cables'],
    calories: 350,
    thumbnail: 'https://images.unsplash.com/photo-1534368420009-621bfab424a8?w=800',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    exercises: [
      { id: 'e1', name: 'Warm-Up', duration: 120, startTime: 0, formTips: ['Band work', 'Rotator cuff'], muscleGroups: ['Shoulders'] },
      { id: 'e2', name: 'Bench Press', duration: 300, startTime: 120, formTips: ['Arch back slightly', 'Controlled descent'], muscleGroups: ['Chest'] },
      { id: 'e3', name: 'Incline Dumbbell Press', duration: 240, startTime: 420, formTips: ['45 degree angle', 'Full stretch'], muscleGroups: ['Upper Chest'] },
      { id: 'e4', name: 'Cable Flyes', duration: 180, startTime: 660, formTips: ['Slight bend elbows', 'Squeeze together'], muscleGroups: ['Chest'] },
      { id: 'e5', name: 'Dips', duration: 180, startTime: 840, formTips: ['Lean forward', 'Deep stretch'], muscleGroups: ['Chest', 'Triceps'] },
      { id: 'e6', name: 'Skull Crushers', duration: 180, startTime: 1020, formTips: ['Elbows in', 'Slow negative'], muscleGroups: ['Triceps'] },
      { id: 'e7', name: 'Tricep Pushdowns', duration: 150, startTime: 1200, formTips: ['Lock elbows', 'Full extension'], muscleGroups: ['Triceps'] },
      { id: 'e8', name: 'Overhead Extensions', duration: 150, startTime: 1350, formTips: ['Stretch at bottom', 'Squeeze at top'], muscleGroups: ['Triceps'] },
      { id: 'e9', name: 'Cool Down Stretch', duration: 120, startTime: 1500, formTips: ['Chest opener', 'Tricep stretch'], muscleGroups: ['Recovery'] },
    ]
  },
  {
    id: '12',
    title: 'Athletic Performance',
    description: 'Sports-specific training for improved athleticism. Build speed, power, and agility for any sport.',
    duration: 45,
    difficulty: 'hard',
    environment: 'gym',
    category: 'Athletic',
    muscleGroups: ['Full Body'],
    equipment: ['Box', 'Medicine Ball', 'Resistance Bands'],
    calories: 420,
    thumbnail: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    exercises: [
      { id: 'e1', name: 'Dynamic Warm-Up', duration: 180, startTime: 0, formTips: ['High knees', 'Butt kicks', 'Skips'], muscleGroups: ['Full Body'] },
      { id: 'e2', name: 'Box Jumps', duration: 180, startTime: 180, formTips: ['Explosive', 'Soft landing'], muscleGroups: ['Legs'] },
      { id: 'e3', name: 'Medicine Ball Slams', duration: 150, startTime: 360, formTips: ['Full body', 'Slam hard'], muscleGroups: ['Core'] },
      { id: 'e4', name: 'Lateral Bounds', duration: 150, startTime: 510, formTips: ['Push off hard', 'Stick landing'], muscleGroups: ['Legs'] },
      { id: 'e5', name: 'Sled Push', duration: 180, startTime: 660, formTips: ['Low position', 'Drive through'], muscleGroups: ['Legs', 'Core'] },
      { id: 'e6', name: 'Agility Ladder', duration: 180, startTime: 840, formTips: ['Quick feet', 'Stay light'], muscleGroups: ['Cardio'] },
      { id: 'e7', name: 'Power Cleans', duration: 240, startTime: 1020, formTips: ['Hip explosion', 'Catch low'], muscleGroups: ['Full Body'] },
      { id: 'e8', name: 'Sprint Intervals', duration: 240, startTime: 1260, formTips: ['All out', 'Full recovery'], muscleGroups: ['Cardio'] },
      { id: 'e9', name: 'Cool Down & Mobility', duration: 180, startTime: 1500, formTips: ['Foam roll', 'Stretch'], muscleGroups: ['Recovery'] },
    ]
  },
];

// Emergency Quick Modes
export const emergencyWorkouts = [
  {
    id: 'sos-energy',
    title: 'SOS Energy Boost',
    description: '5-minute energy revival when you need it most',
    duration: 5,
    thumbnail: emergencyEnergy,
    exercises: [
      { name: 'Jumping Jacks', duration: 60 },
      { name: 'High Knees', duration: 60 },
      { name: 'Mountain Climbers', duration: 60 },
      { name: 'Deep Breathing', duration: 120 },
    ],
    trigger: 'low-energy'
  },
  {
    id: 'desk-break',
    title: 'Desk Break Mobility',
    description: 'Quick desk-side movements to reset your body',
    duration: 3,
    thumbnail: emergencyDesk,
    exercises: [
      { name: 'Neck Rolls', duration: 30 },
      { name: 'Shoulder Shrugs', duration: 30 },
      { name: 'Seated Spinal Twist', duration: 60 },
      { name: 'Calf Raises', duration: 60 },
    ],
    trigger: 'desk-bound'
  },
  {
    id: 'stress-reset',
    title: 'Stress Reset Flow',
    description: 'Calm your mind and release tension quickly',
    duration: 7,
    thumbnail: emergencyStress,
    exercises: [
      { name: 'Box Breathing', duration: 120 },
      { name: 'Gentle Cat-Cow', duration: 60 },
      { name: 'Child\'s Pose', duration: 90 },
      { name: 'Standing Forward Fold', duration: 90 },
      { name: 'Final Deep Breaths', duration: 60 },
    ],
    trigger: 'stress'
  }
];

export const categories = ['All', 'Strength', 'HIIT', 'Core', 'Mobility', 'Yoga', 'Athletic', 'Emergency'];
export const difficulties = ['All', 'easy', 'medium', 'hard'];
export const environments = ['All', 'home', 'gym', 'both'];
export const durations = ['All', '0-15', '16-30', '31-45', '45+'];
