import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

interface TheoryQuizCardProps {
  courseSlug: string;
  unitCode: string;
  quizCompleted: boolean;
  onClick: () => void;
}

const TheoryQuizCard = ({ courseSlug, unitCode, quizCompleted, onClick }: TheoryQuizCardProps) => {
  const unitCodeFormatted = unitCode.toLowerCase().replace('/', '-');

  return (
    <Link
      to={`/apprentice/study/eal/${courseSlug}/unit/${unitCodeFormatted}/quiz`}
      onClick={onClick}
      className="block h-full touch-manipulation"
    >
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 h-full relative active:bg-white/[0.04] transition-colors">
        <div className="flex flex-col space-y-2">
          <div className="flex items-baseline gap-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Assessment
            </span>
            <h3 className="text-[16px] font-semibold text-white leading-tight">Quiz</h3>
          </div>
          <p className="text-[14px] text-white/70 leading-relaxed">
            Electrical Theory Assessment Quiz
          </p>
        </div>

        {quizCompleted && (
          <CheckCircle className="absolute top-4 right-4 h-4 w-4 text-elec-yellow" />
        )}
      </div>
    </Link>
  );
};

export default TheoryQuizCard;
