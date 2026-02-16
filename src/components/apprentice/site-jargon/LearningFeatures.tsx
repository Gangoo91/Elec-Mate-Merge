import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Shuffle, GraduationCap } from 'lucide-react';
import { JargonTerm } from '@/data/apprentice/siteJargonData';

interface LearningFeaturesProps {
  terms: JargonTerm[];
}

const LearningFeatures = ({ terms }: LearningFeaturesProps) => {
  const [isStudying, setIsStudying] = useState(false);
  const [currentTermIndex, setCurrentTermIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studiedCount, setStudiedCount] = useState(0);
  const [shuffledTerms, setShuffledTerms] = useState<JargonTerm[]>([]);

  const startFlashcards = () => {
    const shuffled = [...terms].sort(() => Math.random() - 0.5);
    setShuffledTerms(shuffled);
    setCurrentTermIndex(0);
    setShowAnswer(false);
    setStudiedCount(0);
    setIsStudying(true);
  };

  const nextCard = () => {
    const newCount = studiedCount + 1;
    setStudiedCount(newCount);
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
  const progress = shuffledTerms.length > 0
    ? ((currentTermIndex + (showAnswer ? 1 : 0)) / shuffledTerms.length) * 100
    : 0;

  if (isStudying && currentTerm) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-white border-white/20">
            {currentTermIndex + 1} of {shuffledTerms.length}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsStudying(false)}
            className="text-white touch-manipulation"
          >
            Exit
          </Button>
        </div>

        <Progress value={progress} className="w-full" />

        <Card className="border-elec-yellow/20 bg-white/5">
          <CardContent className="p-6 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-elec-yellow mb-2">
                {currentTerm.term}
              </h3>
              {currentTerm.difficulty && (
                <Badge
                  className={
                    currentTerm.difficulty === 'basic'
                      ? 'bg-green-500/20 text-green-400'
                      : currentTerm.difficulty === 'intermediate'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                  }
                >
                  {currentTerm.difficulty}
                </Badge>
              )}
            </div>

            {showAnswer && (
              <div className="space-y-3 animate-fade-in">
                <p className="text-white text-base text-center">
                  {currentTerm.definition}
                </p>

                {currentTerm.commonUsage && (
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <p className="text-sm text-green-400 font-medium mb-1">Common Usage:</p>
                    <p className="text-sm text-white italic">"{currentTerm.commonUsage}"</p>
                  </div>
                )}

                {currentTerm.context && (
                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <p className="text-sm text-blue-400 font-medium mb-1">Context:</p>
                    <p className="text-sm text-white">{currentTerm.context}</p>
                  </div>
                )}

                {currentTerm.relatedTerms && currentTerm.relatedTerms.length > 0 && (
                  <div className="flex flex-wrap gap-1 justify-center mt-2">
                    {currentTerm.relatedTerms.map((related, i) => (
                      <Badge key={i} variant="outline" className="text-xs text-white border-white/20">
                        {related}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 justify-center pt-2">
              {!showAnswer ? (
                <Button
                  onClick={() => setShowAnswer(true)}
                  className="h-11 px-8 touch-manipulation"
                >
                  Show Answer
                </Button>
              ) : (
                <>
                  <Button
                    onClick={nextCard}
                    className="h-11 px-8 touch-manipulation"
                  >
                    {currentTermIndex < shuffledTerms.length - 1 ? 'Next Card' : 'Finish'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={reshuffleCards}
                    className="h-11 touch-manipulation"
                  >
                    <Shuffle className="h-4 w-4 mr-2" />
                    Shuffle
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <p className="text-white text-xs text-center">
          {studiedCount} term{studiedCount !== 1 ? 's' : ''} studied this session
        </p>
      </div>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-white/5">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Study Mode
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-white text-sm">
          Test your knowledge with interactive flashcards. Cards are shuffled randomly
          and show the term first — tap to reveal the definition, context, and usage examples.
        </p>

        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="h-5 w-5 text-blue-400" />
            <h3 className="font-semibold text-white">Flashcards</h3>
          </div>
          <p className="text-sm text-white mb-4">
            {terms.length} terms available based on your current filters.
            Cards are shuffled each time you start.
          </p>
          <Button
            onClick={startFlashcards}
            className="w-full h-11 touch-manipulation"
            disabled={terms.length === 0}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Start Flashcards ({terms.length} terms)
          </Button>
        </div>

        {studiedCount > 0 && (
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <p className="text-sm text-white">
              You studied <strong className="text-green-400">{studiedCount} terms</strong> in
              your last session. Keep it up!
            </p>
          </div>
        )}

        <div className="p-3 bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg">
          <p className="text-xs text-white">
            <strong className="text-elec-yellow">Tip:</strong> Use the search and category
            filters on the Browse tab first, then study only the filtered terms. This lets you
            focus on specific categories like safety terms or testing terminology.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningFeatures;
