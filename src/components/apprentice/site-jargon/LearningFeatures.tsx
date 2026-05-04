import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Shuffle } from 'lucide-react';
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
  const progress =
    shuffledTerms.length > 0
      ? ((currentTermIndex + (showAnswer ? 1 : 0)) / shuffledTerms.length) * 100
      : 0;

  if (isStudying && currentTerm) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            {currentTermIndex + 1} of {shuffledTerms.length}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsStudying(false)}
            className="text-white touch-manipulation hover:bg-white/[0.05]"
          >
            Exit
          </Button>
        </div>

        <Progress value={progress} className="w-full h-1" />

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-[24px] font-semibold text-white leading-tight">
              {currentTerm.term}
            </h3>
            {currentTerm.difficulty && (
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {currentTerm.difficulty}
              </span>
            )}
          </div>

          {showAnswer && (
            <div className="space-y-3 animate-fade-in">
              <p className="text-[14px] text-white/85 leading-relaxed text-center">
                {currentTerm.definition}
              </p>

              {currentTerm.commonUsage && (
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Common usage
                  </span>
                  <p className="text-[13px] text-white/85 italic leading-relaxed">
                    "{currentTerm.commonUsage}"
                  </p>
                </div>
              )}

              {currentTerm.context && (
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Context
                  </span>
                  <p className="text-[13px] text-white/85 leading-relaxed">{currentTerm.context}</p>
                </div>
              )}

              {currentTerm.relatedTerms && currentTerm.relatedTerms.length > 0 && (
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {currentTerm.relatedTerms.map((related, i) => (
                    <span
                      key={i}
                      className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                    >
                      {related}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 justify-center pt-2">
            {!showAnswer ? (
              <Button
                onClick={() => setShowAnswer(true)}
                className="h-11 px-8 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
              >
                Show answer
              </Button>
            ) : (
              <>
                <Button
                  onClick={nextCard}
                  className="h-11 px-8 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
                >
                  {currentTermIndex < shuffledTerms.length - 1 ? 'Next card' : 'Finish'}
                </Button>
                <Button
                  variant="outline"
                  onClick={reshuffleCards}
                  className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Shuffle
                </Button>
              </>
            )}
          </div>
        </div>

        <p className="text-[12px] text-white/55 text-center">
          {studiedCount} term{studiedCount !== 1 ? 's' : ''} studied this session
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Study mode
        </span>
        <h3 className="text-[18px] font-semibold text-white leading-tight">Flashcards</h3>
      </div>

      <p className="text-[14px] text-white/85 leading-relaxed">
        Test your knowledge with interactive flashcards. Cards are shuffled randomly and show the
        term first — tap to reveal the definition, context, and usage examples.
      </p>

      <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
        <p className="text-[14px] text-white/85 leading-relaxed">
          {terms.length} terms available based on your current filters. Cards are shuffled each time
          you start.
        </p>
        <Button
          onClick={startFlashcards}
          className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
          disabled={terms.length === 0}
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Start flashcards ({terms.length} terms)
        </Button>
      </div>

      {studiedCount > 0 && (
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Last session
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            You studied <strong className="text-elec-yellow">{studiedCount} terms</strong> in your
            last session. Keep it up.
          </p>
        </div>
      )}

      <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Tip
        </span>
        <p className="text-[13px] text-white/85 leading-relaxed">
          Use the search and category filters on the Browse tab first, then study only the filtered
          terms. This lets you focus on specific categories like safety terms or testing
          terminology.
        </p>
      </div>
    </div>
  );
};

export default LearningFeatures;
