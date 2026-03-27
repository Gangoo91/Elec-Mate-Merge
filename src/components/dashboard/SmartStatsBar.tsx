import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, PoundSterling, BookOpen, Award, Flame } from 'lucide-react';
import { useQuoteStorage } from '@/hooks/useQuoteStorage';
import { useInvoiceStorage } from '@/hooks/useInvoiceStorage';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { useQuizResults } from '@/hooks/useQuizResults';
import { useStudyStreak } from '@/hooks/useStudyStreak';

interface StatItemProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color?: string;
  path?: string;
}

function formatCompactNumber(num: number): string {
  if (num >= 10000) {
    return `${(num / 1000).toFixed(0)}k`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toLocaleString();
}

function StatItem({ icon, value, label, color = 'text-elec-yellow', path }: StatItemProps) {
  const navigate = useNavigate();
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue =
    typeof value === 'number' ? value : parseInt(value.replace(/[^0-9]/g, '')) || 0;

  useEffect(() => {
    if (typeof value !== 'number') {
      return;
    }

    const duration = 800;
    const steps = 20;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [numericValue, value]);

  const formattedValue = typeof value === 'string' ? value : formatCompactNumber(displayValue);

  const handleClick = () => {
    if (path) navigate(path);
  };

  return (
    <div className="flex-shrink-0 w-[140px] sm:w-full sm:flex-shrink">
      <div
        className={`
          h-full p-3 sm:p-4 rounded-xl bg-white/5
          ${path ? 'cursor-pointer active:bg-white/10' : ''}
          touch-manipulation transition-colors
        `}
        onClick={handleClick}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <span className={color}>{icon}</span>
          <p className="text-[11px] sm:text-xs text-white truncate">{label}</p>
        </div>

        <span className={`text-xl sm:text-2xl font-bold tracking-tight ${color}`}>
          {formattedValue}
        </span>
      </div>
    </div>
  );
}

export function SmartStatsBar() {
  const { savedQuotes } = useQuoteStorage();
  const { invoices } = useInvoiceStorage();
  const { completedCount } = useCourseProgress();
  const { getOverallStats } = useQuizResults();
  const { streak } = useStudyStreak();

  const quizStats = getOverallStats();

  const pendingQuotes =
    savedQuotes?.filter((q) => q.status === 'sent' || q.status === 'pending') || [];

  const totalQuoteValue = pendingQuotes.reduce((sum, q) => sum + (q.total || 0), 0);

  const formattedValue =
    totalQuoteValue >= 1000 ? `£${(totalQuoteValue / 1000).toFixed(1)}k` : `£${totalQuoteValue}`;

  const stats: StatItemProps[] = [
    {
      icon: <FileText className="h-4 w-4 sm:h-5 sm:w-5" />,
      value: pendingQuotes.length,
      label: 'Active Quotes',
      color: 'text-elec-yellow',
      path: '/electrician/quotes',
    },
    {
      icon: <PoundSterling className="h-4 w-4 sm:h-5 sm:w-5" />,
      value: formattedValue,
      label: 'Quote Value',
      color: 'text-green-500',
      path: '/electrician/quotes',
    },
    {
      icon: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />,
      value: completedCount,
      label: 'Completed',
      color: 'text-blue-500',
      path: '/study-centre',
    },
    {
      icon: <Award className="h-4 w-4 sm:h-5 sm:w-5" />,
      value: quizStats.averageScore > 0 ? `${quizStats.averageScore}%` : '—',
      label: 'Avg Score',
      color: 'text-purple-500',
      path: '/study-centre',
    },
    {
      icon: <Flame className="h-4 w-4 sm:h-5 sm:w-5" />,
      value: streak.currentStreak,
      label: streak.currentStreak === 1 ? 'Day Streak' : 'Day Streak',
      color: streak.currentStreak > 0 ? 'text-orange-500' : 'text-white',
      path: '/study-centre',
    },
  ];

  return (
    <div className="relative">
      <div
        className="
        flex gap-3
        overflow-x-auto
        pb-2 -mx-4 px-4
        sm:mx-0 sm:px-0 sm:pb-0
        scrollbar-hide
        sm:grid sm:grid-cols-5 sm:gap-4
        snap-x snap-mandatory sm:snap-none
        scroll-smooth
      "
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`snap-center ${index === stats.length - 1 ? 'mr-4 sm:mr-0' : ''}`}
          >
            <StatItem {...stat} />
          </div>
        ))}
      </div>
    </div>
  );
}
