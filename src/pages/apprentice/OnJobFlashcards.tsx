
import { useState } from "react";
import { Button } from "@/components/ui/button";
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

  const studyStats = [
    { label: "Total Cards", value: flashcardSets.reduce((acc, set) => acc + set.count, 0), icon: BookOpen },
    { label: "Study Sets", value: flashcardSets.length, icon: BarChart3 },
    { label: "Categories", value: new Set(flashcardSets.map(set => set.category)).size, icon: TrendingUp },
    { label: "Skill Levels", value: 3, icon: Lightbulb }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Flashcards & Microlearning</h1>
          <p className="text-muted-foreground">Quick-fire revision for cable colours, regulations, and technical knowledge</p>
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
          {/* Study Overview */}
          <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-elec-yellow" />
                <CardTitle className="text-elec-yellow">Flashcard Study Centre</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Master essential electrical knowledge through spaced repetition and active recall. 
                Choose from comprehensive study sets covering regulations, safety, tools, and technical concepts.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {studyStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="h-6 w-6 text-elec-yellow mx-auto mb-2" />
                    <div className="text-2xl font-bold text-elec-yellow mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Flashcard Sets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
