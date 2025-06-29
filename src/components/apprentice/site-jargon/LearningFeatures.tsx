
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Clock, 
  Shuffle, 
  CheckCircle,
  Star,
  TrendingUp
} from "lucide-react";
import { JargonTerm } from "@/data/apprentice/siteJargonData";

interface LearningFeaturesProps {
  terms: JargonTerm[];
}

const LearningFeatures = ({ terms }: LearningFeaturesProps) => {
  const [studyMode, setStudyMode] = useState<'flashcards' | 'quiz' | 'practice' | null>(null);
  const [currentTermIndex, setCurrentTermIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [studyProgress, setStudyProgress] = useState(0);

  const startFlashcards = () => {
    setStudyMode('flashcards');
    setCurrentTermIndex(0);
    setShowAnswer(false);
  };

  const nextCard = () => {
    if (currentTermIndex < terms.length - 1) {
      setCurrentTermIndex(currentTermIndex + 1);
      setShowAnswer(false);
      setStudyProgress(((currentTermIndex + 1) / terms.length) * 100);
    } else {
      setStudyMode(null);
      setStudyProgress(100);
    }
  };

  const shuffleTerms = () => {
    // Simple shuffle implementation
    const shuffled = [...terms].sort(() => Math.random() - 0.5);
    setCurrentTermIndex(0);
    setShowAnswer(false);
  };

  const currentTerm = terms[currentTermIndex];

  if (studyMode === 'flashcards' && currentTerm) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-elec-yellow">Flashcard Study Mode</CardTitle>
            <Badge variant="outline">
              {currentTermIndex + 1} of {terms.length}
            </Badge>
          </div>
          <Progress value={studyProgress} className="w-full" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="p-6 border border-elec-yellow/30 rounded-lg bg-elec-dark/30">
              <h3 className="text-2xl font-bold text-elec-yellow mb-4">
                {currentTerm.term}
              </h3>
              
              {showAnswer && (
                <div className="space-y-3 animate-fade-in">
                  <p className="text-elec-light text-lg">{currentTerm.definition}</p>
                  
                  {currentTerm.commonUsage && (
                    <div className="p-3 bg-green-500/10 rounded border border-green-500/20">
                      <p className="text-sm text-green-400 font-medium mb-1">Common Usage:</p>
                      <p className="text-sm italic">"{currentTerm.commonUsage}"</p>
                    </div>
                  )}
                  
                  {currentTerm.context && (
                    <div className="p-3 bg-blue-500/10 rounded border border-blue-500/20">
                      <p className="text-sm text-blue-400 font-medium mb-1">Context:</p>
                      <p className="text-sm">{currentTerm.context}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex gap-3 justify-center">
              {!showAnswer ? (
                <Button onClick={() => setShowAnswer(true)} className="px-8">
                  Show Answer
                </Button>
              ) : (
                <>
                  <Button onClick={nextCard} className="px-8">
                    {currentTermIndex < terms.length - 1 ? 'Next Card' : 'Complete'}
                  </Button>
                  <Button variant="outline" onClick={shuffleTerms}>
                    <Shuffle className="h-4 w-4 mr-2" />
                    Shuffle
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="flex justify-between text-sm text-muted-foreground">
            <Button variant="ghost" size="sm" onClick={() => setStudyMode(null)}>
              Exit Study Mode
            </Button>
            <span>Difficulty: {currentTerm.difficulty || 'Basic'}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Learning Features
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="study-modes" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="study-modes">Study Modes</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="study-modes" className="space-y-4 mt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-blue-500/20 bg-blue-500/5">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-400" />
                    <h3 className="font-semibold">Flashcards</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Study terms with interactive flashcards. Perfect for memorisation.
                  </p>
                  <Button onClick={startFlashcards} className="w-full">
                    Start Flashcards
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-green-500/20 bg-green-500/5">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-400" />
                    <h3 className="font-semibold">Quick Quiz</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Test your knowledge with randomised quiz questions.
                  </p>
                  <Button className="w-full" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-purple-500/20 bg-purple-500/5">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-purple-400" />
                    <h3 className="font-semibold">Daily Challenge</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn 5 new terms every day with spaced repetition.
                  </p>
                  <Button className="w-full" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-orange-500/20 bg-orange-500/5">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Shuffle className="h-5 w-5 text-orange-400" />
                    <h3 className="font-semibold">Random Practice</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Practice with randomly selected terms from all categories.
                  </p>
                  <Button className="w-full" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-4 mt-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 border border-elec-yellow/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-elec-yellow" />
                  <div>
                    <h4 className="font-medium">Terms Studied</h4>
                    <p className="text-sm text-muted-foreground">Track your learning progress</p>
                  </div>
                </div>
                <Badge variant="outline">0 / {terms.length}</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <div>
                    <h4 className="font-medium">Mastered Terms</h4>
                    <p className="text-sm text-muted-foreground">Terms you know well</p>
                  </div>
                </div>
                <Badge variant="outline">0</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-blue-500/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <div>
                    <h4 className="font-medium">Study Streak</h4>
                    <p className="text-sm text-muted-foreground">Consecutive days studied</p>
                  </div>
                </div>
                <Badge variant="outline">0 days</Badge>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="achievements" className="space-y-4 mt-4">
            <div className="grid gap-3">
              <div className="flex items-center gap-3 p-3 border border-elec-yellow/20 rounded-lg opacity-50">
                <Trophy className="h-6 w-6 text-yellow-400" />
                <div>
                  <h4 className="font-medium">First Steps</h4>
                  <p className="text-xs text-muted-foreground">Study your first 10 terms</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 border border-elec-yellow/20 rounded-lg opacity-50">
                <Star className="h-6 w-6 text-purple-400" />
                <div>
                  <h4 className="font-medium">Category Expert</h4>
                  <p className="text-xs text-muted-foreground">Master all terms in a category</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 border border-elec-yellow/20 rounded-lg opacity-50">
                <Target className="h-6 w-6 text-green-400" />
                <div>
                  <h4 className="font-medium">Perfect Score</h4>
                  <p className="text-xs text-muted-foreground">Get 100% on a practice quiz</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LearningFeatures;
