import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import {
  Heart,
  BookOpen,
  Zap,
  Users,
  Shield,
  Phone,
  Brain,
  Wind,
  BookHeart,
  Sparkles,
  ChevronRight,
  AlertTriangle,
  MessageCircle,
  Headphones,
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

const ElectricianMentalHealth = () => {
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
    {
      id: 'breathing',
      title: 'Breathe',
      description: '2 minute reset',
      icon: Wind,
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400',
    },
    {
      id: 'mood',
      title: 'Check In',
      description: 'Log how today feels',
      icon: Heart,
      color: 'from-pink-500/20 to-rose-500/20',
      borderColor: 'border-pink-500/30',
      iconColor: 'text-pink-400',
    },
    {
      id: 'gratitude',
      title: 'Journal',
      description: 'Note one good thing',
      icon: Sparkles,
      color: 'from-amber-500/20 to-yellow-500/20',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400',
    },
    {
      id: 'talk',
      title: 'Talk Now',
      description: 'Peer or guided support',
      icon: MessageCircle,
      color: 'from-purple-500/20 to-violet-500/20',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
    },
  ];

  const mainSections = [
    {
      id: 'tools',
      title: 'Interactive Tools',
      description: 'Breathing, grounding, focus and reset tools',
      icon: Zap,
      color: 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10',
      borderColor: 'border-yellow-500/20',
      iconBg: 'bg-yellow-500/20',
      iconColor: 'text-yellow-400',
    },
    {
      id: 'resources',
      title: 'Resources Library',
      description: 'Trusted guides and practical support links',
      icon: BookOpen,
      color: 'bg-gradient-to-br from-blue-500/10 to-indigo-500/10',
      borderColor: 'border-blue-500/20',
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
    },
    {
      id: 'support',
      title: 'Support Network',
      description: 'Talk to charities, peer groups and services',
      icon: Users,
      color: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-500/20',
      iconBg: 'bg-purple-500/20',
      iconColor: 'text-purple-400',
    },
    {
      id: 'crisis',
      title: 'Crisis Support',
      description: 'Urgent help, helplines and immediate next steps',
      icon: Shield,
      color: 'bg-gradient-to-br from-red-500/10 to-rose-500/10',
      borderColor: 'border-red-500/20',
      iconBg: 'bg-red-500/20',
      iconColor: 'text-red-400',
    },
    {
      id: 'podcasts',
      title: 'Podcasts',
      description: 'Longer-form support and perspective from the trade',
      icon: Headphones,
      color: 'bg-gradient-to-br from-orange-500/10 to-amber-500/10',
      borderColor: 'border-orange-500/20',
      iconBg: 'bg-orange-500/20',
      iconColor: 'text-orange-400',
    },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'breathing':
        return <BreathingExercise onClose={() => setActiveSection(null)} />;
      case 'mood':
        return (
          <QuickMoodCheck
            onClose={() => setActiveSection(null)}
            onOpenSupport={() => setActiveSection('talk')}
            onOpenCrisis={() => setActiveSection('crisis')}
          />
        );
      case 'gratitude':
        return <GratitudeJournal onClose={() => setActiveSection(null)} />;
      case 'talk':
        return <PeerSupportHub onClose={() => setActiveSection(null)} />;
      case 'tools':
        return (
          <div className="space-y-4">
            <Button variant="ghost" onClick={() => setActiveSection(null)} className="mb-2">
              ← Back to Hub
            </Button>
            <InteractiveToolsTab />
          </div>
        );
      case 'resources':
        return (
          <div className="space-y-4">
            <Button variant="ghost" onClick={() => setActiveSection(null)} className="mb-2">
              ← Back to Hub
            </Button>
            <ResourcesLibraryTab />
          </div>
        );
      case 'support':
        return (
          <div className="space-y-4">
            <Button variant="ghost" onClick={() => setActiveSection(null)} className="mb-2">
              ← Back to Hub
            </Button>
            <SupportNetworkTab />
          </div>
        );
      case 'crisis':
        return (
          <div className="space-y-4">
            <Button variant="ghost" onClick={() => setActiveSection(null)} className="mb-2">
              ← Back to Hub
            </Button>
            <CrisisResourcesTab />
          </div>
        );
      case 'podcasts':
        return (
          <div className="space-y-4">
            <Button variant="ghost" onClick={() => setActiveSection(null)} className="mb-2">
              ← Back to Hub
            </Button>
            <PodcastsTab />
          </div>
        );
      default:
        return null;
    }
  };

  if (activeSection) {
    return (
      <MentalHealthProvider>
        <div className="max-w-4xl mx-auto px-4 pb-8 animate-fade-in">{renderActiveSection()}</div>
      </MentalHealthProvider>
    );
  }

  return (
    <MentalHealthProvider>
      <div className="max-w-5xl mx-auto px-4 pb-10 sm:pb-16 space-y-6 animate-fade-in">
        <div className="pt-2">
          <SmartBackButton
            label="Back to Dashboard"
            to="/electrician"
            className="[&>span]:!inline"
          />
        </div>

        <section className="relative overflow-hidden px-1 py-3 sm:py-4">
          <div className="absolute -right-20 top-0 h-44 w-44 rounded-full bg-pink-500/10 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="py-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/55">
                <Heart className="h-3.5 w-3.5 text-pink-400" />
                Wellbeing For Electricians
              </div>
              <h1 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Clear your head. Get help faster. Keep your footing.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/76 sm:text-base">
                This space is built for the real pressure around site work, workload, money,
                fatigue and isolation. Start with what you need right now, then go deeper only if it
                helps.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="tel:116123"
                  className="inline-flex items-center rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-200 transition-colors hover:bg-red-500/15"
                >
                  Call 116 123
                </a>
                <a
                  href="sms:85258?body=SHOUT"
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white/84 transition-colors hover:bg-white/[0.08]"
                >
                  Text SHOUT to 85258
                </a>
                <button
                  onClick={() => setActiveSection('crisis')}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white/84 transition-colors hover:bg-white/[0.08]"
                >
                  Open Crisis Help
                </button>
              </div>
            </div>

            <div className="border-l border-white/10 pl-5 lg:pl-6">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/45">
                Right Now
              </p>
              <h2 className="mt-2 text-xl font-medium text-white">What do you need most?</h2>
              <div className="mt-4 space-y-3">
                <button
                  onClick={() => setActiveSection('crisis')}
                  className="w-full border-b border-red-500/20 pb-3 text-left transition-opacity hover:opacity-100"
                >
                  <div className="text-sm font-medium text-red-200">Need help now</div>
                  <div className="mt-1 text-sm text-white/72">Urgent support, helplines and immediate next steps.</div>
                </button>
                <button
                  onClick={() => setActiveSection('breathing')}
                  className="w-full border-b border-white/10 pb-3 text-left transition-opacity hover:opacity-100"
                >
                  <div className="text-sm font-medium text-white">Need a reset</div>
                  <div className="mt-1 text-sm text-white/72">Use a fast breathing or grounding tool and take the edge off.</div>
                </button>
                <button
                  onClick={() => setActiveSection('mood')}
                  className="w-full text-left transition-opacity hover:opacity-100"
                >
                  <div className="text-sm font-medium text-white">Need to check in</div>
                  <div className="mt-1 text-sm text-white/72">Track how today feels and get a clearer next step.</div>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <h2 className="text-lg font-medium text-white">Fast tools</h2>
            </div>
            <p className="mt-2 text-sm leading-6 text-white/72">
              These are the quickest ways to feel a little more steady without working through the whole library.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-white/10 pt-4">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => setActiveSection(action.id)}
                  className="text-left transition-opacity hover:opacity-100"
              >
                <action.icon className={`mb-3 h-7 w-7 ${action.iconColor}`} />
                <h3 className="font-semibold text-sm text-white">{action.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-white/74">{action.description}</p>
              </button>
            ))}
            </div>
          </div>

          <div className="space-y-4">
            <DailyAffirmation />
            <div className="border-t border-amber-500/20 pt-4">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-amber-300/80">
                Trade Support
              </p>
              <h3 className="mt-2 text-lg font-medium text-white">Made for electrical work, not generic wellness talk.</h3>
              <p className="mt-2 text-sm leading-6 text-white/72">
                Long days, physical fatigue, pricing pressure and working alone all show up differently. Use the trade-specific support links if you want something closer to your world.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="tel:08003032200"
                  className="rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-2 text-sm font-medium text-amber-200"
                >
                  Electrical Industries Charity
                </a>
                <button
                  onClick={() => setActiveSection('support')}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-sm font-medium text-white/84"
                >
                  Open support network
                </button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            <h2 className="text-lg font-medium text-white">Everything else, when you want it</h2>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/72">
            The full toolkit is still here. The difference is you do not have to digest all of it before you find the bit that helps.
          </p>
          <div className="mt-5 grid gap-3 border-t border-white/10 pt-4 lg:grid-cols-2">
            {mainSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                  className="w-full border-b border-white/10 pb-4 text-left transition-opacity hover:opacity-100"
              >
                <div className="flex items-center gap-4">
                  <div
                      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${section.iconBg}`}
                  >
                    <section.icon className={`h-6 w-6 ${section.iconColor}`} />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="font-semibold text-white text-base">{section.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-white/72">{section.description}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white flex-shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </MentalHealthProvider>
  );
};

export default ElectricianMentalHealth;
