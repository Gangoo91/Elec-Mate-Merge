
import { useState } from "react";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen, Brain, Target, Flame, Zap, Shield, Sparkles,
  TrendingUp, Award, CheckCircle, Clock, Lightbulb
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

  const flashcardSets = [
    {
      id: "cable-colors",
      title: "Cable Colours & Identification",
      icon: Target,
      description: "Learn UK cable colour codes and identification standards",
      count: 5,
      difficulty: 'beginner' as const,
      estimatedTime: "5 mins",
      category: "Basic Theory",
      completed: false,
      progressPercentage: 0,
      masteredCards: 0
    },
    {
      id: "bs7671-regulations",
      title: "BS 7671 Key Regulations",
      icon: BookOpen,
      description: "Essential BS 7671 regulations every apprentice should know",
      count: 5,
      difficulty: 'intermediate' as const,
      estimatedTime: "8 mins",
      category: "Regulations",
      completed: false,
      progressPercentage: 65,
      masteredCards: 3,
      lastStudied: "2 days ago"
    },
    {
      id: "eicr-codes",
      title: "EICR Observation Codes",
      icon: Brain,
      description: "C1, C2, C3, FI codes and their meanings",
      count: 18,
      difficulty: 'advanced' as const,
      estimatedTime: "8 mins",
      category: "Testing & Inspection",
      completed: true,
      progressPercentage: 100,
      masteredCards: 18,
      lastStudied: "1 week ago"
    },
    {
      id: "safe-isolation",
      title: "Safe Isolation Procedures",
      icon: Target,
      description: "Step-by-step safe isolation and proving dead procedures",
      count: 15,
      difficulty: 'intermediate' as const,
      estimatedTime: "12 mins",
      category: "Safety",
      completed: false,
      progressPercentage: 33,
      masteredCards: 5,
      lastStudied: "3 days ago"
    },
    {
      id: "test-instruments",
      title: "Test Instruments & Equipment",
      icon: Brain,
      description: "Common electrical testing equipment and their uses",
      count: 22,
      difficulty: 'beginner' as const,
      estimatedTime: "11 mins",
      category: "Testing & Inspection",
      completed: false,
      progressPercentage: 0,
      masteredCards: 0
    },
    {
      id: "fault-finding",
      title: "Common Electrical Faults",
      icon: Target,
      description: "Identifying and understanding common electrical faults",
      count: 30,
      difficulty: 'advanced' as const,
      estimatedTime: "18 mins",
      category: "Troubleshooting",
      completed: false,
      progressPercentage: 12,
      masteredCards: 4,
      lastStudied: "5 days ago"
    }
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

  // Calculate overall progress stats
  const totalSets = flashcardSets.length;
  const completedSets = flashcardSets.filter(set => set.completed).length;
  const totalCards = flashcardSets.reduce((sum, set) => sum + set.count, 0);
  const masteredCards = flashcardSets.reduce((sum, set) => sum + set.masteredCards, 0);
  const overallProgress = Math.round((masteredCards / totalCards) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-dark/98 to-elec-dark/95">
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
              <p className="text-white/70 max-w-xl text-sm sm:text-base">
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
                  <div className="text-xs sm:text-sm text-white/60">Sets Completed</div>
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
                  <div className="text-xs sm:text-sm text-white/60">Cards Mastered</div>
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
                  <div className="text-xs sm:text-sm text-white/60">Overall Progress</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white/5 to-white/3 border-orange-500/20 hover:border-orange-500/40 transition-colors">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <Flame className={`h-5 w-5 ${streakInfo.currentStreak > 0 ? 'text-orange-400' : 'text-white/40'}`} />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-orange-400">
                    {streakLoading ? '-' : streakInfo.currentStreak}
                  </div>
                  <div className="text-xs sm:text-sm text-white/60">
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
                  <p className="text-sm text-white/80">
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
            {flashcardSets.map((set) => (
              <FlashcardSetCard
                key={set.id}
                set={set}
                onStart={handleStartFlashcards}
              />
            ))}
          </div>
        </div>

        {/* Study Tips */}
        <StudyTipsCard />

      </div>
    </div>
  );
};

export default OnJobFlashcards;
