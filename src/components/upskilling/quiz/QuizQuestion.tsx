
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuizQuestion as QuizQuestionType } from '@/types/quiz';

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedAnswer: number | undefined;
  onAnswerSelect: (answerIndex: number) => void;
  isFlagged?: boolean;
  onToggleFlag?: () => void;
}

const QuizQuestion = ({ question, selectedAnswer, onAnswerSelect, isFlagged, onToggleFlag }: QuizQuestionProps) => {
  return (
    <Card className="bg-[#323232] border-transparent">
      <CardHeader className="relative">
        <CardTitle className="text-foreground text-lg pr-10">
          {question.question}
        </CardTitle>
        {onToggleFlag && (
          <button
            onClick={onToggleFlag}
            className="absolute top-6 right-6 transition-colors"
            aria-label={isFlagged ? "Unflag question" : "Flag question for review"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={isFlagged ? "hsl(var(--primary))" : "none"}
              stroke={isFlagged ? "hsl(var(--primary))" : "hsl(0 0% 64%)"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hover:stroke-primary"
            >
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" x2="4" y1="22" y2="15" />
            </svg>
          </button>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
              selectedAnswer === index
                ? 'border-elec-yellow bg-yellow-600/20 text-foreground'
                : 'border-white/30 bg-elec-gray text-foreground hover:border-gray-500 hover:bg-[#323232]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selectedAnswer === index
                  ? 'border-elec-yellow bg-elec-yellow'
                  : 'border-white/30'
              }`}>
                {selectedAnswer === index && (
                  <div className="w-2 h-2 rounded-full bg-black"></div>
                )}
              </div>
              <span className="text-sm">{option}</span>
            </div>
          </button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuizQuestion;
