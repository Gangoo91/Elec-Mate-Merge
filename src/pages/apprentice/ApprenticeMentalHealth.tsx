import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { storageGetJSONSync } from '@/utils/storage';
import {
  Heart, BookOpen, Zap, Users, Shield, Phone, Wind, Sparkles, ChevronRight,
  MessageCircle, Anchor, PenLine, Target, Moon, TrendingUp, Headphones, ArrowLeft,
} from 'lucide-react';
import ResourcesLibraryTab from '@/components/mental-health/tabs/ResourcesLibraryTab';
import InteractiveToolsTab from '@/components/mental-health/tabs/InteractiveToolsTab';
import SupportNetworkTab from '@/components/mental-health/tabs/SupportNetworkTab';
import CrisisResourcesTab from '@/components/mental-health/tabs/CrisisResourcesTab';
import PodcastsTab from '@/components/mental-health/podcasts/PodcastsTab';
import { PeerSupportHub } from '@/components/mental-health/peer-support';
import { MentalHealthProvider, useMentalHealth } from '@/contexts/MentalHealthContext';
import QuickMoodCheck from '@/components/mental-health/QuickMoodCheck';
import BreathingExercise from '@/components/mental-health/BreathingExercise';
import GratitudeJournal from '@/components/mental-health/GratitudeJournal';
import DailyAffirmation from '@/components/mental-health/DailyAffirmation';
import WellbeingJournal from '@/components/mental-health/journal/WellbeingJournal';
import PersonalSafetyPlan from '@/components/mental-health/safety/PersonalSafetyPlan';
import GroundingExercises from '@/components/mental-health/exercises/GroundingExercises';
import SleepTracker from '@/components/mental-health/SleepTracker';
import MoodInsights from '@/components/mental-health/MoodInsights';
import QuickCopingToolkit from '@/components/mental-health/QuickCopingToolkit';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

const moodEmojis = [
  { value: 1, emoji: '😢', label: 'Struggling' },
  { value: 2, emoji: '😔', label: 'Low' },
  { value: 3, emoji: '😐', label: 'Okay' },
  { value: 4, emoji: '🙂', label: 'Good' },
  { value: 5, emoji: '😊', label: 'Great' },
];

const MentalHealthContent = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState<string | null>(searchParams.get('section'));
  const { moodHistory, addMoodEntry } = useMentalHealth();
  const { user } = useAuth();

  useEffect(() => {
    if (activeSection) setSearchParams({ section: activeSection }, { replace: false });
    else { searchParams.delete('section'); setSearchParams(searchParams, { replace: false }); }
  }, [activeSection]);

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'there';
  const today = new Date().toISOString().split('T')[0];
  const todaysMood = moodHistory.find((e) => e.date === today);

  const handleQuickMood = (mood: number) => {
    addMoodEntry({ date: today, mood });
    if (mood <= 2) setTimeout(() => setActiveSection('talk'), 500);
  };

  const quickActions = [
    { id: 'coping', title: 'Reset', sub: 'Quick relief', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-500/15' },
    { id: 'breathing', title: 'Breathe', sub: '2 min calm', icon: Wind, color: 'text-blue-400', bg: 'bg-blue-500/15' },
    { id: 'grounding', title: 'Ground', sub: 'Get steady', icon: Anchor, color: 'text-amber-400', bg: 'bg-amber-500/15' },
    { id: 'talk', title: 'Talk', sub: 'Peer support', icon: MessageCircle, color: 'text-purple-400', bg: 'bg-purple-500/15' },
  ];

  const mainSections = [
    { id: 'mood', title: 'Mood Check-In', sub: 'Track how today feels', icon: Heart, color: 'text-pink-400', bg: 'bg-pink-500/15', badge: !todaysMood ? 'Log today' : undefined },
    { id: 'journal', title: 'Wellbeing Journal', sub: 'Track thoughts and gratitude', icon: PenLine, color: 'text-pink-400', bg: 'bg-pink-500/15' },
    { id: 'safety-plan', title: 'My Safety Plan', sub: 'Personal plan for difficult moments', icon: Shield, color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
    { id: 'sleep', title: 'Sleep Tracker', sub: 'See how rest affects wellbeing', icon: Moon, color: 'text-indigo-400', bg: 'bg-indigo-500/15' },
    { id: 'insights', title: 'Mood Insights', sub: 'Spot patterns early', icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-500/15' },
    { id: 'tools', title: 'Interactive Tools', sub: 'Grounding, stress relief and habits', icon: Target, color: 'text-yellow-400', bg: 'bg-yellow-500/15' },
    { id: 'resources', title: 'Resources', sub: 'Trusted guides and self-help', icon: BookOpen, color: 'text-cyan-400', bg: 'bg-cyan-500/15' },
    { id: 'support', title: 'Support Network', sub: 'Charities, peers and services', icon: Users, color: 'text-green-400', bg: 'bg-green-500/15' },
    { id: 'podcasts', title: 'Podcasts', sub: 'Long-form support from the trade', icon: Headphones, color: 'text-orange-400', bg: 'bg-orange-500/15' },
    { id: 'crisis', title: 'Crisis Support', sub: 'Urgent help and helplines', icon: Shield, color: 'text-red-400', bg: 'bg-red-500/15' },
  ];

  const renderActiveSection = () => {
    const BackBtn = () => (
      <button onClick={() => setActiveSection(null)} className="flex items-center gap-2 text-sm text-white/60 hover:text-white mb-4 touch-manipulation">
        <ArrowLeft className="h-4 w-4" /> Back to Hub
      </button>
    );
    switch (activeSection) {
      case 'breathing': return <BreathingExercise onClose={() => setActiveSection(null)} />;
      case 'mood': return <QuickMoodCheck onClose={() => setActiveSection(null)} onOpenSupport={() => setActiveSection('talk')} onOpenCrisis={() => setActiveSection('crisis')} />;
      case 'gratitude': return <GratitudeJournal onClose={() => setActiveSection(null)} />;
      case 'talk': return <PeerSupportHub onClose={() => setActiveSection(null)} />;
      case 'journal': return <><BackBtn /><WellbeingJournal /></>;
      case 'grounding': return <><BackBtn /><GroundingExercises /></>;
      case 'coping': return <><BackBtn /><QuickCopingToolkit /></>;
      case 'sleep': return <><BackBtn /><SleepTracker /></>;
      case 'insights': return <><BackBtn /><MoodInsights /></>;
      case 'safety-plan': return <><BackBtn /><PersonalSafetyPlan /></>;
      case 'tools': return <><BackBtn /><InteractiveToolsTab /></>;
      case 'resources': return <><BackBtn /><ResourcesLibraryTab /></>;
      case 'support': return <><BackBtn /><SupportNetworkTab /></>;
      case 'crisis': return <><BackBtn /><CrisisResourcesTab /></>;
      case 'podcasts': return <><BackBtn /><PodcastsTab /></>;
      default: return null;
    }
  };

  if (activeSection) {
    return <div className="px-4 pb-24 animate-fade-in">{renderActiveSection()}</div>;
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h1 className="text-sm font-bold text-white uppercase tracking-wide">Mental Health</h1>
              <p className="text-[10px] text-white/80">Wellbeing for Apprentices</p>
            </div>
          </div>
        </div>
        <div className="h-[2px] bg-gradient-to-r from-pink-500/40 via-purple-500/20 to-transparent" />
      </div>

      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-4 space-y-6 pb-24">
        {/* Crisis banner */}
        <motion.div variants={itemVariants}>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/[0.08] to-rose-500/[0.04] border border-red-500/15 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-red-400" />
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Need help now?</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed mb-3">
              If you're struggling or need someone to talk to right now.
            </p>
            <div className="flex flex-wrap gap-2">
              <a href="tel:116123" className="h-9 px-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-1.5 touch-manipulation active:scale-[0.98]">
                <Phone className="h-3.5 w-3.5" /> Call 116 123
              </a>
              <a href="sms:85258?body=SHOUT" className="h-9 px-4 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-xs font-medium flex items-center gap-1.5 touch-manipulation active:scale-[0.98]">
                Text SHOUT to 85258
              </a>
            </div>
          </div>
        </motion.div>

        {/* Quick mood check — emoji row */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4">
            <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-3">How are you today, {firstName}?</p>
            <div className="flex justify-between">
              {moodEmojis.map((m) => (
                <button
                  key={m.value}
                  onClick={() => handleQuickMood(m.value)}
                  className={cn(
                    'flex flex-col items-center gap-1.5 touch-manipulation active:scale-[0.95] transition-all',
                    todaysMood?.mood === m.value && 'scale-110'
                  )}
                >
                  <span className={cn('text-2xl', todaysMood?.mood === m.value ? 'grayscale-0' : 'grayscale-[0.3]')}>{m.emoji}</span>
                  <span className={cn('text-[9px] font-medium', todaysMood?.mood === m.value ? 'text-white' : 'text-white/70')}>{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick actions — 4 across */}
        <motion.div variants={itemVariants}>
          <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-3">Quick Reset</p>
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map((a) => (
              <button
                key={a.id}
                onClick={() => setActiveSection(a.id)}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:scale-[0.97] transition-all"
              >
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', a.bg)}>
                  <a.icon className={cn('h-5 w-5', a.color)} />
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-semibold text-white leading-tight">{a.title}</p>
                  <p className="text-[9px] text-white/70 mt-0.5">{a.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Daily affirmation */}
        <motion.div variants={itemVariants}>
          <DailyAffirmation />
        </motion.div>

        {/* Apprentice-specific support */}
        <motion.div variants={itemVariants}>
          <div className="rounded-2xl bg-purple-500/[0.06] border border-purple-500/15 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Apprentice Support</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-3">
              Work, college, revision, money — it piles up. Young Minds and the Electrical Industries Charity are there for you.
            </p>
            <div className="flex flex-wrap gap-2">
              <a href="tel:08004541111" className="h-9 px-4 rounded-xl bg-purple-500/15 border border-purple-500/25 text-purple-300 text-xs font-semibold flex items-center gap-1.5 touch-manipulation active:scale-[0.98]">
                <Phone className="h-3.5 w-3.5" /> Young Minds
              </a>
              <a href="tel:08003032200" className="h-9 px-4 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white text-xs font-medium flex items-center gap-1.5 touch-manipulation active:scale-[0.98]">
                <Phone className="h-3.5 w-3.5" /> EIC Charity
              </a>
            </div>
          </div>
        </motion.div>

        {/* Main sections */}
        <motion.div variants={itemVariants} className="space-y-2">
          <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-1">Your Toolkit</p>
          {mainSections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:scale-[0.98] transition-all text-left"
            >
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', s.bg)}>
                <s.icon className={cn('h-5 w-5', s.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white">{s.title}</h3>
                  {s.badge && <span className="text-[9px] font-bold text-pink-400 bg-pink-500/15 px-1.5 py-0.5 rounded">{s.badge}</span>}
                </div>
                <p className="text-[11px] text-white/80 mt-0.5">{s.sub}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-white/60 flex-shrink-0" />
            </button>
          ))}
        </motion.div>
      </motion.main>
    </div>
  );
};

const ApprenticeMentalHealth = () => (
  <MentalHealthProvider>
    <MentalHealthContent />
  </MentalHealthProvider>
);

export default ApprenticeMentalHealth;
