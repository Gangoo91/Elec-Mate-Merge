
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, TrendingUp, Lightbulb, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FlashcardSetCard from "@/components/apprentice/flashcards/FlashcardSetCard";
import FlashcardSession from "@/components/apprentice/flashcards/FlashcardSession";
import StudyModeSelector from "@/components/apprentice/flashcards/StudyModeSelector";
import LearningAnalytics from "@/components/apprentice/flashcards/LearningAnalytics";
import StudyTipsCard from "@/components/apprentice/flashcards/StudyTipsCard";
import { flashcardSets } from "@/data/flashcardSets";

const OnJobFlashcards = () => {
  const [currentView, setCurrentView] = useState<'overview' | 'modeSelect' | 'session'>('overview');
  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [studyMode, setStudyMode] = useState<string | null>(null);

  const handleStartSet = (setId: string) => {
    setSelectedSet(setId);
    setCurrentView('modeSelect');
  };

  const handleSelectMode = (mode: string) => {
    setStudyMode(mode);
    setCurrentView('session');
  };

  const handleExitSession = () => {
    setCurrentView('overview');
    setSelectedSet(null);
    setStudyMode(null);
  };

  const currentSet = selectedSet ? flashcardSets.find(set => set.id === selectedSet) : null;

  if (currentView === 'session' && currentSet) {
    return (
      <div className="space-y-8 animate-fade-in">
        <FlashcardSession 
          setTitle={currentSet.title}
          cards={currentSet.cards}
          onExit={handleExitSession}
        />
      </div>
    );
  }

  if (currentView === 'modeSelect' && currentSet) {
    return (
      <div className="space-y-8 animate-fade-in">
        <StudyModeSelector 
          onSelectMode={handleSelectMode}
          onBack={() => setCurrentView('overview')}
        />
      </div>
    );
  }

  // Enhanced statistics
  const totalCards = flashcardSets.reduce((acc, set) => acc + set.count, 0);
  const totalSets = flashcardSets.length;
  const categories = new Set(flashcardSets.map(set => set.category)).size;
  const completedSets = flashcardSets.filter(set => set.completed).length;
  const averageCardsPerSet = Math.round(totalCards / totalSets);

  const studyStats = [
    { 
      label: "Total Cards", 
      value: totalCards, 
      icon: BookOpen, 
      description: "Comprehensive flashcard library",
      color: "text-blue-400"
    },
    { 
      label: "Study Sets", 
      value: totalSets, 
      icon: BarChart3, 
      description: "Organized topic collections",
      color: "text-green-400"
    },
    { 
      label: "Categories", 
      value: categories, 
      icon: TrendingUp, 
      description: "Different subject areas",
      color: "text-purple-400"
    },
    { 
      label: "Completed", 
      value: completedSets, 
      icon: Lightbulb, 
      description: "Sets you've mastered",
      color: "text-elec-yellow"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Flashcards & Microlearning</h1>
          <p className="text-muted-foreground">Master electrical knowledge through active recall and spaced repetition</p>
        </div>
        <Link to="/apprentice/on-job-tools" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="study" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="study" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Study Sets
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Progress
          </TabsTrigger>
          <TabsTrigger value="tips" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Study Tips
          </TabsTrigger>
        </TabsList>

        <TabsContent value="study" className="space-y-6">
          {/* Enhanced Study Overview */}
          <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray via-elec-dark/50 to-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
                  <BookOpen className="h-8 w-8 text-elec-yellow" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-elec-yellow">Flashcard Study Centre</CardTitle>
                  <p className="text-muted-foreground">Evidence-based learning through active recall</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Master essential electrical knowledge through proven learning techniques. Our comprehensive 
                flashcard system covers regulations, safety procedures, testing methods, and practical applications 
                used daily by electrical professionals.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {studyStats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="p-3 rounded-lg bg-elec-dark/50 border border-elec-yellow/10 mb-3 group-hover:border-elec-yellow/30 transition-colors">
                      <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm font-medium text-white">{stat.label}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{stat.description}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-elec-yellow/5 border border-elec-yellow/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-elec-yellow" />
                  <span className="text-sm font-medium text-elec-yellow">Study Tip</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Research shows that reviewing flashcards for just 10-15 minutes daily can improve retention by up to 200%. 
                  Start with beginner sets and gradually progress to advanced topics.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Filter by Difficulty */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-400">
              Beginner: {flashcardSets.filter(s => s.difficulty === 'beginner').length} sets
            </Badge>
            <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/30 text-yellow-400">
              Intermediate: {flashcardSets.filter(s => s.difficulty === 'intermediate').length} sets
            </Badge>
            <Badge variant="outline" className="bg-red-500/10 border-red-500/30 text-red-400">
              Advanced: {flashcardSets.filter(s => s.difficulty === 'advanced').length} sets
            </Badge>
          </div>

          {/* Flashcard Sets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {flashcardSets.map((set) => (
              <FlashcardSetCard 
                key={set.id}
                set={set}
                onStart={handleStartSet}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <LearningAnalytics />
        </TabsContent>

        <TabsContent value="tips">
          <StudyTipsCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OnJobFlashcards;
