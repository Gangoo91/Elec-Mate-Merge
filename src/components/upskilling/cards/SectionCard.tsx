import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { cn } from '@/lib/utils';

interface SectionCardProps {
  to: string;
  sectionNumber: number | string;
  title: string;
  description?: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  isCompleted?: boolean;
  index?: number;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  to,
  sectionNumber,
  title,
  description,
  icon: Icon,
  isCompleted: isCompletedProp = false,
  index: _index = 0,
}) => {
  const { allProgress } = useCourseProgress();
  const location = useLocation();

  const autoCompleted = useMemo(() => {
    if (!allProgress.length) return false;

    const basePath = location.pathname.replace(/\/[^/]*$/, '');
    const resolvedPath = to.startsWith('../')
      ? basePath.replace(/\/[^/]*$/, '') + '/' + to.replace('../', '')
      : to.startsWith('/')
        ? to
        : basePath + '/' + to;

    const studyCentrePath = resolvedPath.replace(/.*\/study-centre\//, '');

    return allProgress.some(
      (p) =>
        p.completed &&
        (p.section_key === studyCentrePath ||
          p.course_key + '/' + p.section_key === studyCentrePath ||
          p.section_key?.includes(studyCentrePath))
    );
  }, [allProgress, to, location.pathname]);

  const isCompleted = isCompletedProp || autoCompleted;

  return (
    <Link
      to={to}
      className="group block touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl"
    >
      <div
        className={cn(
          'relative h-full min-h-[160px]',
          'bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors',
          'rounded-2xl overflow-hidden',
          'p-5 flex flex-col text-left',
          'active:scale-[0.99]'
        )}
      >
        {/* Hairline top accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-amber-400/70 to-orange-400/70 opacity-70 group-hover:opacity-100 transition-opacity" />

        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Section {sectionNumber}
          </span>
          {isCompleted && <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />}
        </div>

        {/* Icon + title */}
        <div className="mt-4 flex items-start gap-3">
          <div className="shrink-0 h-8 w-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
            <Icon className="h-3.5 w-3.5 text-white" strokeWidth={1.8} />
          </div>
          <h3 className="text-[14.5px] sm:text-[15px] font-semibold text-white leading-snug tracking-tight line-clamp-2 flex-1 min-w-0">
            {title}
          </h3>
        </div>

        {description && (
          <p className="mt-2.5 text-[12px] text-white leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex-grow" />

        {/* CTA */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-end">
          <span className="text-[12px] font-medium text-elec-yellow/90 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all">
            {isCompleted ? 'Review' : 'Start'} →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SectionCard;
