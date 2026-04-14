import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Heart,
  BookOpen,
  Zap,
  Users,
  Shield,
  Phone,
  Brain,
  Wind,
  Sparkles,
  ChevronRight,
  MessageCircle,
  Headphones,
  ArrowLeft,
} from 'lucide-react';
import ResourcesLibraryTab from '@/components/mental-health/tabs/ResourcesLibraryTab';
import InteractiveToolsTab from '@/components/mental-health/tabs/InteractiveToolsTab';
import SupportNetworkTab from '@/components/mental-health/tabs/SupportNetworkTab';
import CrisisResourcesTab from '@/components/mental-health/tabs/CrisisResourcesTab';
import PodcastsTab from '@/components/mental-health/podcasts/PodcastsTab';
import { PeerSupportHub } from '@/components/mental-health/peer-support';
import { MentalHealthProvider } from '@/contexts/MentalHealthContext';
import QuickMoodCheck from '@/components/mental-health/QuickMoodCheck';
import BreathingExercise from '@/components/mental-health/BreathingExercise';
import GratitudeJournal from '@/components/mental-health/GratitudeJournal';
import DailyAffirmation from '@/components/mental-health/DailyAffirmation';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const ElectricianMentalHealth = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSection = searchParams.get('section') || null;
  const setActiveSection = (section: string | null) => {
    if (section) {
      setSearchParams({ section }, { replace: false });
    } else {
      searchParams.delete('section');
      setSearchParams(searchParams, { replace: false });
    }
  };

  const quickActions = [
    { id: 'breathing', title: 'Breathe', sub: '2 min reset', icon: Wind, color: 'text-blue-400', bg: 'bg-blue-500/15' },
    { id: 'mood', title: 'Check In', sub: 'How you feel', icon: Heart, color: 'text-pink-400', bg: 'bg-pink-500/15' },
    { id: 'gratitude', title: 'Journal', sub: 'One good thing', icon: Sparkles, color: 'text-amber-400', bg: 'bg-amber-500/15' },
    { id: 'talk', title: 'Talk', sub: 'Peer support', icon: MessageCircle, color: 'text-purple-400', bg: 'bg-purple-500/15' },
  ];

  const mainSections = [
    { id: 'tools', title: 'Interactive Tools', sub: 'Breathing, grounding and focus tools', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-500/15' },
    { id: 'resources', title: 'Resources', sub: 'Trusted guides and practical links', icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-500/15' },
    { id: 'support', title: 'Support Network', sub: 'Charities, peer groups and services', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/15' },
    { id: 'crisis', title: 'Crisis Support', sub: 'Urgent help and helplines', icon: Shield, color: 'text-red-400', bg: 'bg-red-500/15' },
    { id: 'podcasts', title: 'Podcasts', sub: 'Long-form support from the trade', icon: Headphones, color: 'text-orange-400', bg: 'bg-orange-500/15' },
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
      case 'tools': return <><BackBtn /><InteractiveToolsTab /></>;
      case 'resources': return <><BackBtn /><ResourcesLibraryTab /></>;
      case 'support': return <><BackBtn /><SupportNetworkTab /></>;
      case 'crisis': return <><BackBtn /><CrisisResourcesTab /></>;
      case 'podcasts': return <><BackBtn /><PodcastsTab /></>;
      default: return null;
    }
  };

  if (activeSection) {
    return (
      <MentalHealthProvider>
        <div className="px-4 pb-24 animate-fade-in">{renderActiveSection()}</div>
      </MentalHealthProvider>
    );
  }

  return (
    <MentalHealthProvider>
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
                <p className="text-[10px] text-white/80">Wellbeing for Electricians</p>
              </div>
            </div>
          </div>
          <div className="h-[2px] bg-gradient-to-r from-pink-500/40 via-purple-500/20 to-transparent" />
        </div>

        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="px-4 py-4 space-y-6 pb-24"
        >
          {/* Hero — crisis banner */}
          <motion.div variants={itemVariants}>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/[0.08] to-rose-500/[0.04] border border-red-500/15 p-4">
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-red-500/10 blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-red-400" />
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Need help now?</span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed mb-3">
                  If you're in crisis or need someone to talk to right now, these are always available.
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

          {/* Trade-specific support */}
          <motion.div variants={itemVariants}>
            <div className="rounded-2xl bg-amber-500/[0.06] border border-amber-500/15 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-amber-400" />
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Trade Support</span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed mb-3">
                Long days, physical fatigue, pricing pressure and working alone. The Electrical Industries Charity understands.
              </p>
              <a href="tel:08003032200" className="h-10 px-4 rounded-xl bg-amber-500/15 border border-amber-500/25 text-amber-300 text-xs font-semibold flex items-center gap-2 w-fit touch-manipulation active:scale-[0.98]">
                <Phone className="h-3.5 w-3.5" /> Call 0800 303 2200
              </a>
            </div>
          </motion.div>

          {/* Main sections */}
          <motion.div variants={itemVariants} className="space-y-2">
            <p className="text-[10px] font-bold text-white/70 uppercase tracking-wider mb-1">Go Deeper</p>
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
                  <h3 className="text-sm font-semibold text-white">{s.title}</h3>
                  <p className="text-[11px] text-white/80 mt-0.5">{s.sub}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-white/60 flex-shrink-0" />
              </button>
            ))}
          </motion.div>
        </motion.main>
      </div>
    </MentalHealthProvider>
  );
};

export default ElectricianMentalHealth;
