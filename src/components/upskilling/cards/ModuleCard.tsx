import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, GraduationCap } from 'lucide-react';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  to: string;
  moduleNumber: number | string;
  title: string;
  description?: string;
  duration?: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  isExam?: boolean;
  isCompleted?: boolean;
  progress?: number;
  index?: number;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  to,
  moduleNumber,
  title,
  description,
  duration,
  icon: Icon,
  isExam = false,
  isCompleted: isCompletedProp = false,
  progress: progressProp,
  index: _index = 0,
}) => {
  const { allProgress } = useCourseProgress();
  const location = useLocation();

  const autoProgress = useMemo(() => {
    if (!allProgress.length) return { completed: false, pct: 0 };

    const basePath = location.pathname.replace(/\/[^/]*$/, '');
    const resolvedPath = to.startsWith('../')
      ? basePath.replace(/\/[^/]*$/, '') + '/' + to.replace('../', '')
      : to.startsWith('/')
        ? to
        : basePath + '/' + to;

    const studyCentrePath = resolvedPath.replace(/.*\/study-centre\//, '');
    const parts = studyCentrePath.split('/');
    const courseKey = parts[0] || '';
    const sectionKey = parts.slice(1).join('/') || parts[0] || '';

    const matchingRows = allProgress.filter(
      (p) =>
        (p.course_key === courseKey && p.section_key?.startsWith(sectionKey)) ||
        p.course_key === studyCentrePath ||
        p.section_key === studyCentrePath
    );

    if (matchingRows.length === 0) return { completed: false, pct: 0 };

    const anyComplete = matchingRows.some((r) => r.completed);
    const maxPct = Math.max(...matchingRows.map((r) => r.progress_pct));

    return { completed: anyComplete, pct: maxPct };
  }, [allProgress, to, location.pathname]);

  const isCompleted = isCompletedProp || autoProgress.completed;
  const progress =
    progressProp ?? (autoProgress.pct > 0 && autoProgress.pct < 100 ? autoProgress.pct : undefined);

  const accent = isExam
    ? 'from-elec-yellow/70 via-amber-400/70 to-orange-400/70'
    : 'from-blue-500/70 via-violet-400/70 to-elec-yellow/70';

  const ModuleIcon = isExam ? GraduationCap : Icon;
  const eyebrow = isExam ? 'Final assessment' : `Module ${moduleNumber}`;

  return (
    <Link
      to={to}
      className="group block touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl"
    >
      <div
        className={cn(
          'relative h-full min-h-[180px] sm:min-h-[200px]',
          'bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors',
          'rounded-2xl overflow-hidden',
          'p-5 sm:p-6 flex flex-col text-left',
          'active:scale-[0.99]'
        )}
      >
        {/* Hairline top accent */}
        <div
          className={cn(
            'absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-70 group-hover:opacity-100 transition-opacity',
            accent
          )}
        />

        {/* Header — eyebrow + completed tick */}
        <div className="flex items-start justify-between gap-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            {eyebrow}
          </span>
          {isCompleted && <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />}
        </div>

        {/* Icon + title */}
        <div className="mt-4 flex items-start gap-3">
          <div
            className={cn(
              'shrink-0 h-9 w-9 rounded-xl flex items-center justify-center',
              isExam
                ? 'bg-elec-yellow/15 border border-elec-yellow/30'
                : 'bg-white/[0.04] border border-white/[0.08]'
            )}
          >
            <ModuleIcon
              className={cn('h-4 w-4', isExam ? 'text-elec-yellow' : 'text-white')}
              strokeWidth={1.8}
            />
          </div>
          <h3 className="text-[15px] sm:text-base font-semibold text-white leading-snug tracking-tight line-clamp-2 flex-1 min-w-0">
            {title}
          </h3>
        </div>

        {description && (
          <p className="mt-2.5 text-[12.5px] text-white leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex-grow" />

        {/* Footer — duration / progress / cta */}
        <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
          <span className="text-[11px] text-white truncate">
            {duration ?? (isExam ? 'Open exam' : 'Open module')}
          </span>
          {progress !== undefined && progress > 0 && progress < 100 ? (
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-elec-yellow rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[11px] font-medium text-elec-yellow">{progress}%</span>
            </div>
          ) : (
            <span className="text-[12px] font-medium text-elec-yellow/90 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all shrink-0">
              {isCompleted ? 'Review' : 'Open'} →
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ModuleCard;
