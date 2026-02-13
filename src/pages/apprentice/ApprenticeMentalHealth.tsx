
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Anchor,
  PenLine,
  Target,
  Sun,
  Moon,
  Sunset,
  TrendingUp,
  Calendar,
  Award,
  ArrowLeft,
  X,
  Headphones
} from "lucide-react";
import ResourcesLibraryTab from "@/components/mental-health/tabs/ResourcesLibraryTab";
import InteractiveToolsTab from "@/components/mental-health/tabs/InteractiveToolsTab";
import SupportNetworkTab from "@/components/mental-health/tabs/SupportNetworkTab";
import CrisisResourcesTab from "@/components/mental-health/tabs/CrisisResourcesTab";
import PodcastsTab from "@/components/mental-health/podcasts/PodcastsTab";
import { PeerSupportHub } from "@/components/mental-health/peer-support";
import { MentalHealthProvider, useMentalHealth } from "@/contexts/MentalHealthContext";
import QuickMoodCheck from "@/components/mental-health/QuickMoodCheck";
import BreathingExercise from "@/components/mental-health/BreathingExercise";
import GratitudeJournal from "@/components/mental-health/GratitudeJournal";
import DailyAffirmation from "@/components/mental-health/DailyAffirmation";
import WellbeingJournal from "@/components/mental-health/journal/WellbeingJournal";
import PersonalSafetyPlan from "@/components/mental-health/safety/PersonalSafetyPlan";
import GroundingExercises from "@/components/mental-health/exercises/GroundingExercises";
import SleepTracker from "@/components/mental-health/SleepTracker";
import MoodInsights from "@/components/mental-health/MoodInsights";
import QuickCopingToolkit from "@/components/mental-health/QuickCopingToolkit";
import { useAuth } from "@/contexts/AuthContext";

const moodEmojis = [
  { value: 1, emoji: "😢", label: "Struggling", color: "from-red-500 to-red-600" },
  { value: 2, emoji: "😔", label: "Low", color: "from-orange-500 to-orange-600" },
  { value: 3, emoji: "😐", label: "Okay", color: "from-yellow-500 to-yellow-600" },
  { value: 4, emoji: "🙂", label: "Good", color: "from-lime-500 to-lime-600" },
  { value: 5, emoji: "😊", label: "Great", color: "from-green-500 to-green-600" }
];

const MentalHealthContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSectionParam = searchParams.get("section");
  const [activeSection, setActiveSection] = useState<string | null>(activeSectionParam);
  const [showQuickMood, setShowQuickMood] = useState(false);

  // Sync section changes to URL
  useEffect(() => {
    if (activeSection) {
      setSearchParams({ section: activeSection }, { replace: false });
    } else {
      searchParams.delete("section");
      setSearchParams(searchParams, { replace: false });
    }
  }, [activeSection]);
  const [selectedQuickMood, setSelectedQuickMood] = useState<number | null>(null);
  const { moodHistory, addMoodEntry } = useMentalHealth();
  const { user } = useAuth();

  // Get user's first name
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] ||
                    user?.email?.split('@')[0] ||
                    'there';

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Good morning", icon: Sun, color: "text-amber-400" };
    if (hour < 17) return { text: "Good afternoon", icon: Sun, color: "text-yellow-400" };
    if (hour < 21) return { text: "Good evening", icon: Sunset, color: "text-orange-400" };
    return { text: "Good night", icon: Moon, color: "text-indigo-400" };
  };

  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;

  // Check if user logged mood today
  const today = new Date().toISOString().split('T')[0];
  const todaysMood = moodHistory.find(entry => entry.date === today);
  const lastMoodEntry = moodHistory[0];

  // Calculate streak
  const getStreak = () => {
    if (moodHistory.length === 0) return 0;
    let streak = 0;
    const now = new Date();
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(now);
      checkDate.setDate(now.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      if (moodHistory.some(e => e.date === dateStr)) {
        streak++;
      } else if (i > 0) break;
    }
    return streak;
  };

  const streak = getStreak();

  // Get journal entries count
  const [journalCount, setJournalCount] = useState(0);
  useEffect(() => {
    const saved = localStorage.getItem('wellbeing-journal');
    if (saved) {
      const entries = JSON.parse(saved);
      setJournalCount(entries.length);
    }
  }, []);

  // Handle quick mood selection - now saves to database!
  const handleQuickMood = (mood: number) => {
    setSelectedQuickMood(mood);

    // Save the mood entry to database
    const today = new Date().toISOString().split('T')[0];
    addMoodEntry({
      date: today,
      mood: mood,
    });

    // If mood is low, suggest resources
    if (mood <= 2) {
      setTimeout(() => {
        setShowQuickMood(false);
        setActiveSection("talk");
      }, 500);
    } else {
      setTimeout(() => setShowQuickMood(false), 1500);
    }
  };

  const quickActions = [
    {
      id: "coping",
      title: "Cope",
      description: "Quick relief",
      icon: Zap,
      gradient: "from-yellow-500/30 to-orange-500/20",
      border: "border-yellow-500/40",
      iconColor: "text-yellow-400",
      glow: "shadow-yellow-500/20"
    },
    {
      id: "breathing",
      title: "Breathe",
      description: "2-min calm",
      icon: Wind,
      gradient: "from-blue-500/30 to-cyan-500/20",
      border: "border-blue-500/40",
      iconColor: "text-blue-400",
      glow: "shadow-blue-500/20"
    },
    {
      id: "mood",
      title: "Check In",
      description: "Log mood",
      icon: Heart,
      gradient: "from-pink-500/30 to-rose-500/20",
      border: "border-pink-500/40",
      iconColor: "text-pink-400",
      glow: "shadow-pink-500/20",
      badge: !todaysMood ? "!" : null
    },
    {
      id: "grounding",
      title: "Ground",
      description: "5-4-3-2-1",
      icon: Anchor,
      gradient: "from-amber-500/30 to-yellow-500/20",
      border: "border-amber-500/40",
      iconColor: "text-amber-400",
      glow: "shadow-amber-500/20"
    }
  ];

  const mainSections = [
    {
      id: "talk",
      title: "Mental Health Mate",
      description: "Chat with AI or connect with peer support",
      icon: MessageCircle,
      gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
      border: "border-purple-500/30",
      iconBg: "bg-gradient-to-br from-purple-500/30 to-pink-500/20",
      iconColor: "text-purple-400",
      badge: { text: "AI + Peers", color: "bg-purple-500/20 text-purple-300" }
    },
    {
      id: "journal",
      title: "Wellbeing Journal",
      description: "Track thoughts, feelings & gratitude",
      icon: PenLine,
      gradient: "from-pink-500/20 via-purple-500/10 to-transparent",
      border: "border-pink-500/30",
      iconBg: "bg-gradient-to-br from-pink-500/30 to-purple-500/20",
      iconColor: "text-pink-400"
    },
    {
      id: "safety-plan",
      title: "My Safety Plan",
      description: "Personal crisis prevention toolkit",
      icon: Shield,
      gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      border: "border-emerald-500/30",
      iconBg: "bg-gradient-to-br from-emerald-500/30 to-teal-500/20",
      iconColor: "text-emerald-400",
      badge: { text: "Important", color: "bg-emerald-500/20 text-emerald-300" }
    },
    {
      id: "sleep",
      title: "Sleep Tracker",
      description: "Track sleep patterns for better wellbeing",
      icon: Moon,
      gradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
      border: "border-indigo-500/30",
      iconBg: "bg-gradient-to-br from-indigo-500/30 to-blue-500/20",
      iconColor: "text-indigo-400"
    },
    {
      id: "insights",
      title: "Mood Insights",
      description: "Understand your mood patterns",
      icon: TrendingUp,
      gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
      border: "border-blue-500/30",
      iconBg: "bg-gradient-to-br from-blue-500/30 to-cyan-500/20",
      iconColor: "text-blue-400"
    },
    {
      id: "tools",
      title: "Interactive Tools",
      description: "Mood tracking, stress relief, goals",
      icon: Target,
      gradient: "from-yellow-500/20 via-orange-500/10 to-transparent",
      border: "border-yellow-500/30",
      iconBg: "bg-gradient-to-br from-yellow-500/30 to-orange-500/20",
      iconColor: "text-yellow-400"
    },
    {
      id: "resources",
      title: "Resources",
      description: "Guides, videos & self-help",
      icon: BookOpen,
      gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
      border: "border-cyan-500/30",
      iconBg: "bg-gradient-to-br from-cyan-500/30 to-blue-500/20",
      iconColor: "text-cyan-400"
    },
    {
      id: "support",
      title: "Support Network",
      description: "Connect with peers & professionals",
      icon: Users,
      gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
      border: "border-green-500/30",
      iconBg: "bg-gradient-to-br from-green-500/30 to-emerald-500/20",
      iconColor: "text-green-400"
    },
    {
      id: "podcasts",
      title: "Podcasts",
      description: "Mental health podcasts for tradespeople",
      icon: Headphones,
      gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
      border: "border-orange-500/30",
      iconBg: "bg-gradient-to-br from-orange-500/30 to-amber-500/20",
      iconColor: "text-orange-400",
      badge: { text: "New", color: "bg-orange-500/20 text-orange-300" }
    }
  ];

  const renderActiveSection = () => {
    const BackBtn = () => (
      <button
        onClick={() => setActiveSection(null)}
        className="inline-flex items-center gap-2 text-sm text-white hover:text-white
          transition-colors mb-4 py-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Hub
      </button>
    );

    switch (activeSection) {
      case "breathing":
        return <BreathingExercise onClose={() => setActiveSection(null)} />;
      case "mood":
        return <QuickMoodCheck onClose={() => setActiveSection(null)} />;
      case "gratitude":
        return <GratitudeJournal onClose={() => setActiveSection(null)} />;
      case "journal":
        return (
          <div>
            <BackBtn />
            <WellbeingJournal />
          </div>
        );
      case "grounding":
        return (
          <div>
            <BackBtn />
            <GroundingExercises />
          </div>
        );
      case "coping":
        return (
          <div>
            <BackBtn />
            <QuickCopingToolkit />
          </div>
        );
      case "sleep":
        return (
          <div>
            <BackBtn />
            <SleepTracker />
          </div>
        );
      case "insights":
        return (
          <div>
            <BackBtn />
            <MoodInsights />
          </div>
        );
      case "safety-plan":
        return (
          <div>
            <BackBtn />
            <PersonalSafetyPlan />
          </div>
        );
      case "talk":
        return (
          <PeerSupportHub onClose={() => setActiveSection(null)} />
        );
      case "tools":
        return (
          <div>
            <BackBtn />
            <InteractiveToolsTab />
          </div>
        );
      case "resources":
        return (
          <div>
            <BackBtn />
            <ResourcesLibraryTab />
          </div>
        );
      case "support":
        return (
          <div>
            <BackBtn />
            <SupportNetworkTab />
          </div>
        );
      case "podcasts":
        return (
          <div>
            <BackBtn />
            <PodcastsTab />
          </div>
        );
      case "crisis":
        return (
          <div>
            <BackBtn />
            <CrisisResourcesTab />
          </div>
        );
      default:
        return null;
    }
  };

  if (activeSection) {
    return (
      <div className="max-w-4xl mx-auto px-4 pb-24 animate-fade-in">
        {renderActiveSection()}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pb-24 space-y-5 animate-fade-in">
      {/* Personalized Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent border border-white/10 p-5">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-purple-500/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <GreetingIcon className={`h-5 w-5 ${greeting.color}`} />
                <span className={`text-sm font-medium ${greeting.color}`}>{greeting.text}</span>
              </div>
              <h1 className="text-2xl font-bold text-white mb-1">
                {firstName}
              </h1>
              <p className="text-sm text-white">
                {todaysMood
                  ? "You've checked in today. How are you now?"
                  : "How are you feeling today?"}
              </p>
            </div>

            {/* Mini mood indicator */}
            {todaysMood && (
              <div className="flex flex-col items-center">
                <span className="text-3xl">
                  {moodEmojis.find(m => m.value === todaysMood.mood)?.emoji || "😐"}
                </span>
                <span className="text-[10px] text-white mt-1">Today</span>
              </div>
            )}
          </div>

          {/* Quick Mood Selector */}
          <div className="mt-4">
            <p className="text-xs text-white mb-2">Quick mood check:</p>
            <div className="flex gap-2">
              {moodEmojis.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => handleQuickMood(mood.value)}
                  className={`flex-1 py-3 rounded-xl transition-all duration-200
                    ${selectedQuickMood === mood.value
                      ? `bg-gradient-to-br ${mood.color} scale-105 shadow-lg`
                      : 'bg-white/5 hover:bg-white/10 active:scale-95'
                    }`}
                >
                  <span className="text-2xl">{mood.emoji}</span>
                </button>
              ))}
            </div>
            {selectedQuickMood && selectedQuickMood <= 2 && (
              <p className="text-xs text-pink-400 mt-2 animate-fade-in">
                I hear you. Let's talk - opening support now...
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      {(moodHistory.length > 0 || journalCount > 0) && (
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-orange-400 mb-1">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-xl font-bold text-white">{streak}</div>
              <div className="text-[10px] text-white">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-pink-400 mb-1">
                <Heart className="h-4 w-4" />
              </div>
              <div className="text-xl font-bold text-white">{moodHistory.length}</div>
              <div className="text-[10px] text-white">Check-ins</div>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5 backdrop-blur">
            <CardContent className="p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-purple-400 mb-1">
                <PenLine className="h-4 w-4" />
              </div>
              <div className="text-xl font-bold text-white">{journalCount}</div>
              <div className="text-[10px] text-white">Journal</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Streak Achievement */}
      {streak >= 3 && (
        <Card className="border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent overflow-hidden">
          <CardContent className="p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Award className="h-5 w-5 text-amber-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-400">
                {streak >= 7 ? "Amazing consistency!" : "You're building a habit!"}
              </p>
              <p className="text-xs text-white">
                {streak} day streak - keep going!
              </p>
            </div>
            <Sparkles className="h-5 w-5 text-amber-400/50" />
          </CardContent>
        </Card>
      )}

      {/* Daily Affirmation */}
      <DailyAffirmation />

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-400" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => setActiveSection(action.id)}
              className={`relative p-3 rounded-2xl border ${action.border} bg-gradient-to-br ${action.gradient}
                hover:scale-[1.02] active:scale-[0.98] transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-white/20 shadow-lg ${action.glow}`}
            >
              {action.badge && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold animate-pulse">
                  {action.badge}
                </span>
              )}
              <action.icon className={`h-7 w-7 ${action.iconColor} mx-auto mb-1`} />
              <h3 className="font-semibold text-xs text-white">{action.title}</h3>
              <p className="text-[10px] text-white mt-0.5 leading-tight">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Sections */}
      <div>
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <Brain className="h-4 w-4 text-purple-400" />
          Explore
        </h2>
        <div className="space-y-2">
          {mainSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full p-3 rounded-xl border ${section.border} bg-gradient-to-r ${section.gradient}
                hover:scale-[1.01] active:scale-[0.99] transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-white/20`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex-shrink-0 w-11 h-11 rounded-xl ${section.iconBg} flex items-center justify-center`}>
                  <section.icon className={`h-5 w-5 ${section.iconColor}`} />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white text-sm">{section.title}</h3>
                    {section.badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${section.badge.color}`}>
                        {section.badge.text}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white truncate">{section.description}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-white flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Industry Support Card */}
      <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-orange-500/5 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-400 text-sm mb-1">For Electrical Workers</h3>
              <p className="text-xs text-white mb-3">
                Industry-specific support from the Electrical Industries Charity
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="tel:08003032200"
                  className="inline-flex items-center text-xs bg-amber-500/20 text-amber-300 px-3 py-2 rounded-lg hover:bg-amber-500/30 transition-colors font-medium"
                >
                  <Phone className="h-3 w-3 mr-1.5" />
                  0800 303 2200
                </a>
                <a
                  href="https://www.electricalcharity.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs bg-white/5 text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Visit Website
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Back to Dashboard */}
      <div className="pt-2">
        <SmartBackButton />
      </div>

      {/* Floating Crisis Button */}
      <button
        onClick={() => setActiveSection("crisis")}
        className="fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-600
          shadow-lg shadow-red-500/30 flex items-center justify-center
          hover:scale-105 active:scale-95 transition-transform"
      >
        <Phone className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

const ApprenticeMentalHealth = () => {
  return (
    <MentalHealthProvider>
      <MentalHealthContent />
    </MentalHealthProvider>
  );
};

export default ApprenticeMentalHealth;
