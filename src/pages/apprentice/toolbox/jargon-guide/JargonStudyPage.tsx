import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Shuffle, GraduationCap, BookOpen, RotateCcw } from 'lucide-react';
import { siteJargonTerms, siteJargonCategories, JargonTerm } from '@/data/apprentice/siteJargonData';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const JargonStudyPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Flashcard state
  const [isStudying, setIsStudying] = useState(false);
  const [currentTermIndex, setCurrentTermIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studiedCount, setStudiedCount] = useState(0);
  const [shuffledTerms, setShuffledTerms] = useState<JargonTerm[]>([]);

  const filteredTerms = useMemo(() => {
    return siteJargonTerms.filter((term) => {
      if (selectedCategory !== 'all' && term.category !== selectedCategory) return false;
      if (selectedDifficulty !== 'all' && term.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [selectedCategory, selectedDifficulty]);

  const startFlashcards = () => {
    const shuffled = [...filteredTerms].sort(() => Math.random() - 0.5);
    setShuffledTerms(shuffled);
    setCurrentTermIndex(0);
    setShowAnswer(false);
    setStudiedCount(0);
    setIsStudying(true);
  };

  const nextCard = () => {
    setStudiedCount(studiedCount + 1);
    if (currentTermIndex < shuffledTerms.length - 1) {
      setCurrentTermIndex(currentTermIndex + 1);
      setShowAnswer(false);
    } else {
      setIsStudying(false);
    }
  };

  const reshuffleCards = () => {
    const shuffled = [...shuffledTerms].sort(() => Math.random() - 0.5);
    setShuffledTerms(shuffled);
    setCurrentTermIndex(0);
    setShowAnswer(false);
  };

  const currentTerm = shuffledTerms[currentTermIndex];
  const progress =
    shuffledTerms.length > 0
      ? ((currentTermIndex + (showAnswer ? 1 : 0)) / shuffledTerms.length) * 100
      : 0;

  // Active flashcard session
  if (isStudying && currentTerm) {
    return (
      <div className="max-w-2xl mx-auto space-y-4 animate-fade-in px-4 pb-20">
        {/* Session Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-white border-elec-yellow/30 bg-elec-yellow/10">
              {currentTermIndex + 1} of {shuffledTerms.length}
            </Badge>
            {studiedCount > 0 && (
              <Badge variant="outline" className="text-green-400 border-green-500/30 bg-green-500/10">
                {studiedCount} studied
              </Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsStudying(false)}
            className="text-white border-red-500/30 hover:bg-red-500/10 touch-manipulation active:scale-[0.98]"
          >
            Exit
          </Button>
        </div>

        <Progress value={progress} className="w-full" />

        {/* Flashcard */}
        <Card className="border-elec-yellow/20 bg-white/5">
          <CardContent className="p-6 space-y-5">
            {/* Term */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-elec-yellow">{currentTerm.term}</h2>
              {currentTerm.difficulty && (
                <Badge
                  className={
                    currentTerm.difficulty === 'basic'
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : currentTerm.difficulty === 'intermediate'
                        ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        : 'bg-red-500/20 text-red-400 border-red-500/30'
                  }
                >
                  {currentTerm.difficulty}
                </Badge>
              )}
            </div>

            {/* Answer */}
            {showAnswer ? (
              <div className="space-y-3 animate-fade-in">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-white text-base text-center leading-relaxed">
                    {currentTerm.definition}
                  </p>
                </div>

                {currentTerm.commonUsage && (
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <p className="text-xs font-medium text-green-400 mb-1">How it sounds on site</p>
                    <p className="text-sm text-white italic">"{currentTerm.commonUsage}"</p>
                  </div>
                )}

                {currentTerm.context && (
                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <p className="text-xs font-medium text-blue-400 mb-1">Context</p>
                    <p className="text-sm text-white">{currentTerm.context}</p>
                  </div>
                )}

                {currentTerm.relatedTerms && currentTerm.relatedTerms.length > 0 && (
                  <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <p className="text-xs font-medium text-purple-400 mb-1.5">Related Terms</p>
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {currentTerm.relatedTerms.map((related, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs text-white border-purple-500/30 bg-purple-500/10"
                        >
                          {related}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-white">Tap below to reveal the answer</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center pt-2">
              {!showAnswer ? (
                <Button
                  onClick={() => setShowAnswer(true)}
                  className="h-11 px-8 touch-manipulation active:scale-[0.98]"
                >
                  Show Answer
                </Button>
              ) : (
                <>
                  <Button
                    onClick={nextCard}
                    className="h-11 px-8 touch-manipulation active:scale-[0.98]"
                  >
                    {currentTermIndex < shuffledTerms.length - 1 ? 'Next Card' : 'Finish'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={reshuffleCards}
                    className="h-11 touch-manipulation active:scale-[0.98]"
                  >
                    <Shuffle className="h-4 w-4 mr-2" />
                    Shuffle
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Session complete / not started
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in px-4 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <div>
          <h1 className="text-xl font-bold text-white">Flashcard Study</h1>
          <p className="text-sm text-white">Test your jargon knowledge</p>
        </div>
      </div>

      {/* How It Works */}
      <Card className="border-elec-yellow/20 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="h-5 w-5 text-elec-yellow" />
            <h3 className="font-semibold text-elec-yellow">How It Works</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-elec-yellow">1</span>
              </div>
              <p className="text-sm text-white">You see a term — think about what it means</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-elec-yellow">2</span>
              </div>
              <p className="text-sm text-white">
                Tap "Show Answer" to reveal the definition, usage example, and context
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-elec-yellow">3</span>
              </div>
              <p className="text-sm text-white">
                Work through all cards — shuffle any time to mix things up
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Options */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardContent className="p-4 space-y-3">
          <h3 className="font-semibold text-blue-400">Choose Your Terms</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-white">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {siteJargonCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-white">Difficulty</label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {(selectedCategory !== 'all' || selectedDifficulty !== 'all') && (
            <div className="flex items-center justify-between">
              <p className="text-xs text-white">{filteredTerms.length} terms match your filters</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedDifficulty('all');
                }}
                className="text-xs text-white touch-manipulation"
              >
                Clear
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Start Button */}
      <Button
        onClick={startFlashcards}
        className="w-full h-12 touch-manipulation active:scale-[0.98] text-base"
        disabled={filteredTerms.length === 0}
      >
        <BookOpen className="h-5 w-5 mr-2" />
        Start Flashcards ({filteredTerms.length} terms)
      </Button>

      {/* Session Results */}
      {studiedCount > 0 && (
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-sm font-bold text-green-400">{studiedCount}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-green-400">
                  {studiedCount} term{studiedCount !== 1 ? 's' : ''} studied
                </p>
                <p className="text-xs text-white">Great work! Start again to keep revising.</p>
              </div>
            </div>
            <Button
              onClick={startFlashcards}
              variant="outline"
              className="w-full h-11 touch-manipulation active:scale-[0.98] border-green-500/30 hover:bg-green-500/10 text-white"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Study Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tip */}
      <div className="p-3 bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg">
        <p className="text-xs text-white">
          <strong className="text-elec-yellow">Tip:</strong> Start with Basic difficulty if you
          are new. Once you can get them all right, move to Intermediate and then Advanced.
        </p>
      </div>
    </div>
  );
};

export default JargonStudyPage;
