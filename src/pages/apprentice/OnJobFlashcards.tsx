
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Brain, Target } from "lucide-react";
import { Link } from "react-router-dom";
import FlashcardSetCard from "@/components/apprentice/flashcards/FlashcardSetCard";
import StudyModeSelector from "@/components/apprentice/flashcards/StudyModeSelector";
import FlashcardStudySession from "@/components/apprentice/flashcards/FlashcardStudySession";
import StudyTipsCard from "@/components/apprentice/flashcards/StudyTipsCard";

const OnJobFlashcards = () => {
  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [studySession, setStudySession] = useState<{ setId: string; mode: string } | null>(null);

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
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-elec-yellow mb-2">
            Flashcards & Microlearning
          </h1>
          <p className="text-elec-light/80">
            Quick-fire revision for regulations, codes, and essential knowledge
          </p>
        </div>
        <Link to="/apprentice/on-job-tools" className="flex-shrink-0">
          <Button variant="outline" className="border-elec-yellow/30 hover:bg-elec-yellow/10">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-elec-yellow">{completedSets}/{totalSets}</div>
          <div className="text-sm text-elec-light/70">Sets Completed</div>
        </div>
        <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-elec-yellow">{masteredCards}/{totalCards}</div>
          <div className="text-sm text-elec-light/70">Cards Mastered</div>
        </div>
        <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-elec-yellow">{overallProgress}%</div>
          <div className="text-sm text-elec-light/70">Overall Progress</div>
        </div>
        <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-elec-yellow">3</div>
          <div className="text-sm text-elec-light/70">Study Streak (days)</div>
        </div>
      </div>

      {/* Flashcard Sets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {flashcardSets.map((set) => (
          <FlashcardSetCard
            key={set.id}
            set={set}
            onStart={handleStartFlashcards}
          />
        ))}
      </div>

      {/* Study Tips */}
      <StudyTipsCard />
    </div>
  );
};

export default OnJobFlashcards;
