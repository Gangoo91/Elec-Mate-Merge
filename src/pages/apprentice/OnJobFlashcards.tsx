
import { useState } from "react";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen, Brain, Target, Flame, Zap, Shield, Sparkles,
  TrendingUp, Award, CheckCircle, Clock, Lightbulb,
  Cable, ShieldCheck, Wrench, Atom, Hammer, Leaf
} from "lucide-react";
import FlashcardSetCard from "@/components/apprentice/flashcards/FlashcardSetCard";
import StudyModeSelector from "@/components/apprentice/flashcards/StudyModeSelector";
import FlashcardStudySession from "@/components/apprentice/flashcards/FlashcardStudySession";
import StudyTipsCard from "@/components/apprentice/flashcards/StudyTipsCard";
import { useStudyStreak } from "@/hooks/useStudyStreak";
import { useFlashcardProgress } from "@/hooks/useFlashcardProgress";

const OnJobFlashcards = () => {
  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [studySession, setStudySession] = useState<{ setId: string; mode: string } | null>(null);

  // Use hooks for persistence
  const { streak, loading: streakLoading, getStreakDisplay } = useStudyStreak();
  const { getSetProgress, loading: progressLoading } = useFlashcardProgress();

  const streakInfo = getStreakDisplay();

  // Format an ISO date string to a relative "X days ago" label
  const formatLastStudied = (isoDate: string | null): string | undefined => {
    if (!isoDate) return undefined;
    const diffMs = Date.now() - new Date(isoDate).getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  const flashcardSets = [
    {
      id: "cable-colors",
      title: "Cable Colours & Identification",
      icon: Target,
      description: "Learn UK cable colour codes and identification standards",
      count: 25,
      difficulty: "beginner" as const,
      estimatedTime: "15 mins",
      category: "Basic Theory",
      completed: false,
      progressPercentage: 0,
      masteredCards: 0,
    },
    {
      id: "bs7671-regulations",
      title: "BS 7671 Key Regulations",
      icon: BookOpen,
      description: "Essential BS 7671 regulations every apprentice should know",
      count: 25,
      difficulty: "intermediate" as const,
      estimatedTime: "15 mins",
      category: "Regulations",
      completed: false,
      progressPercentage: 0,
      masteredCards: 0,
    },
    {
      id: "eicr-codes",
      title: "EICR Observation Codes",
      icon: Brain,
      description: "C1, C2, C3, FI codes and their meanings",
      count: 30,
      difficulty: "advanced" as const,
      estimatedTime: "18 mins",
      category: "Testing & Inspection",
      completed: false,
      progressPercentage: 0,
      masteredCards: 0,
    },
    {
      id: "safe-isolation",
      title: "Safe Isolation Procedures",
      icon: Shield,
      description: "Step-by-step safe isolation and proving dead procedures",
      count: 25,
      difficulty: "intermediate" as const,
      estimatedTime: "15 mins",
      category: "Safety",
      completed: false,
      progressPercentage: 0,
      masteredCards: 0,
    },
    {
      id: "test-instruments",
      title: "Test Instruments & Equipment",
      icon: Zap,
      description: "Common electrical testing equipment and their uses",
      count: 30,
      difficulty: "beginner" as const,
      estimatedTime: "18 mins",
      category: "Testing & Inspection",
      completed: false,
      progressPercentage: 0,
      masteredCards: 0,
    },
    {
      id: "fault-finding",
      title: "Common Electrical Faults",
      icon: Target,
      description: "Identifying and understanding common electrical faults",
      count: 35,
      difficulty: "advanced" as const,
      estimatedTime: "20 mins",
      category: "Troubleshooting",
      completed: false,
      progressPercentage: 0,
      masteredCards: 0,
    },
    {
      id: "earthing-bonding",
      title: "Earthing & Bonding",
      icon: Cable,
      description:
        "TN-S, TN-C-S, TT systems, MET, main and supplementary bonding",
      count: 25,
      difficulty: "intermediate" as const,
      estimatedTime: "15 mins",
      category: "Installation",
      completed: false,
      progressPercentage: 0,
      masteredCards: 0,
    },
    {
      id: "circuit-protection",
      title: "Circuit Protection",
      icon: ShieldCheck,
      description:
        "MCBs, RCDs, RCBOs, fuses, discrimination and fault current",
      count: 25,
      difficulty: "intermediate" as const,
      estimatedTime: "15 mins",
      category: "Protection",
      completed: false,
      progressPercentage: 0,
      masteredCards: 0,
    },
    {
      id: "wiring-systems",
      title: "Wiring Systems & Enclosures",
      icon: Wrench,
      description:
        "Trunking, conduit, SWA, MICC, cable tray, IP ratings and fixings",
      count: 25,
      difficulty: "intermediate" as const,
      estimatedTime: "15 mins",
      category: "Installation",
      completed: false,
      progressPercentage: 0,
      masteredCards: 0,
    },
    {
      id: "electrical-science",
      title: "Electrical Science",
      icon: Atom,
      description:
        "Ohm's law, power, energy, magnetism, AC theory and transformers",
      count: 25,
      difficulty: "beginner" as const,
      estimatedTime: "15 mins",
      category: "Basic Theory",
      completed: false,
      progressPercentage: 0,
      masteredCards: 0,
    },
    {
      id: "first-second-fix",
      title: "First Fix & Second Fix",
      icon: Hammer,
      description:
        "Back boxes, cable routes, consumer unit install, termination and testing",
      count: 25,
      difficulty: "beginner" as const,
      estimatedTime: "15 mins",
      category: "Practical Skills",
      completed: false,
      progressPercentage: 0,
      masteredCards: 0,
    },
    {
      id: "environmental-tech",
      title: "Environmental Technology",
      icon: Leaf,
      description:
        "Solar PV, EV charging, heat pumps, battery storage and smart meters",
      count: 25,
      difficulty: "advanced" as const,
      estimatedTime: "15 mins",
      category: "Green Technology",
      completed: false,
      progressPercentage: 0,
      masteredCards: 0,
    },
  ];

  const handleStartFlashcards = (setId: string) => {
    setSelectedSet(setId);
    setShowModeSelector(true);
  };

  const handleSelectMode = (mode: string) => {
    if (selectedSet) {
      setStudySession({ setId: selectedSet, mode });
      setShowModeSelector(false);
    }
  };

  const handleBackFromMode = () => {
    setShowModeSelector(false);
    setSelectedSet(null);
  };

  const handleExitStudySession = () => {
    setStudySession(null);
    setSelectedSet(null);
  };

  // Show study session if active
  if (studySession) {
    return (
      <div className="space-y-8 animate-fade-in">
        <FlashcardStudySession 
          setId={studySession.setId}
          studyMode={studySession.mode}
          onExit={handleExitStudySession}
        />
      </div>
    );
  }

  // Show mode selector if set is selected
  if (showModeSelector) {
    return (
      <div className="space-y-8 animate-fade-in">
        <StudyModeSelector 
          onSelectMode={handleSelectMode}
          onBack={handleBackFromMode}
        />
      </div>
    );
  }

  // Calculate overall progress stats from real Supabase data
  const totalSets = flashcardSets.length;
  const totalCards = flashcardSets.reduce((sum, set) => sum + set.count, 0);
  const setsWithProgress = flashcardSets.map(set => {
    const progress = getSetProgress(set.id, set.count);
    return {
      ...set,
      ...progress,
      completed: progress.progressPercentage === 100
    };
  });
  const completedSets = setsWithProgress.filter(set => set.completed).length;
  const masteredCards = setsWithProgress.reduce((sum, set) => sum + set.masteredCards, 0);
  const overallProgress = totalCards > 0 ? Math.round((masteredCards / totalCards) * 100) : 0;

  return (
    <div className="bg-gradient-to-br from-elec-dark via-elec-dark/98 to-elec-dark/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in">

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/3 border border-elec-yellow/20 p-6 sm:p-8">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                  <Lightbulb className="h-6 w-6 text-elec-yellow" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Flashcards & <span className="text-elec-yellow">Microlearning</span>
                </h1>
              </div>
              <p className="text-white max-w-xl text-sm sm:text-base">
                Quick-fire revision for regulations, codes, and essential knowledge.
                Master key concepts with spaced repetition.
              </p>
            </div>
            <SmartBackButton className="flex-shrink-0" />
          </div>
        </div>

        {/* Progress Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="bg-gradient-to-br from-white/5 to-white/3 border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-elec-yellow/10">
                  <CheckCircle className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-elec-yellow">{completedSets}/{totalSets}</div>
                  <div className="text-xs sm:text-sm text-white">Sets Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/5 to-white/3 border-green-500/20 hover:border-green-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Brain className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-green-400">{masteredCards}/{totalCards}</div>
                  <div className="text-xs sm:text-sm text-white">Cards Mastered</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/5 to-white/3 border-blue-500/20 hover:border-blue-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-400">{overallProgress}%</div>
                  <div className="text-xs sm:text-sm text-white">Overall Progress</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/5 to-white/3 border-orange-500/20 hover:border-orange-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <Flame className={`h-5 w-5 ${streakInfo.currentStreak > 0 ? 'text-orange-400' : 'text-white'}`} />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-orange-400">
                    {streakLoading ? '-' : streakInfo.currentStreak}
                  </div>
                  <div className="text-xs sm:text-sm text-white">
                    {streakInfo.studiedToday ? 'Day Streak 🔥' : 'Study to continue!'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Study Reminder Banner */}
        {!streakInfo.studiedToday && (
          <Card className="border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent overflow-hidden">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/20 flex-shrink-0">
                  <Clock className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-amber-300 mb-1">Keep Your Streak Alive!</h3>
                  <p className="text-sm text-white">
                    Complete at least one flashcard session today to maintain your study streak.
                    Even 5 minutes of revision helps with retention.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Flashcard Sets Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
            Choose a Flashcard Set
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {flashcardSets.map((set) => {
              const realProgress = getSetProgress(set.id, set.count);
              return (
                <FlashcardSetCard
                  key={set.id}
                  set={{
                    ...set,
                    progressPercentage: realProgress.progressPercentage,
                    masteredCards: realProgress.masteredCards,
                    completed: realProgress.progressPercentage === 100,
                    lastStudied: formatLastStudied(realProgress.lastStudied)
                  }}
                  onStart={handleStartFlashcards}
                />
              );
            })}
          </div>
        </div>

        {/* Study Tips */}
        <StudyTipsCard />

      </div>
    </div>
  );
};

export default OnJobFlashcards;
