import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle } from 'lucide-react';

const InteractiveProgressTracker = () => {
  const [currentYear, setCurrentYear] = useState(1);
  const [completedMilestones, setCompletedMilestones] = useState<number[]>([]);

  const yearMilestones = [
    {
      year: 1,
      title: 'Foundation year',
      milestones: [
        { id: 1, text: 'Complete site induction and safety training', points: 10 },
        { id: 2, text: 'Learn basic tool usage', points: 15 },
        { id: 3, text: 'Complete first college assessments', points: 20 },
        { id: 4, text: 'Build first learning portfolio entries', points: 15 },
      ],
    },
    {
      year: 2,
      title: 'Development year',
      milestones: [
        { id: 5, text: 'Pass BS 7671 Wiring Regulations', points: 25 },
        { id: 6, text: 'Complete first independent installation', points: 20 },
        { id: 7, text: 'Mentor a Year 1 apprentice', points: 15 },
        { id: 8, text: 'Master power tool operation', points: 10 },
      ],
    },
    {
      year: 3,
      title: 'Competence year',
      milestones: [
        { id: 9, text: 'Complete testing and inspection course', points: 30 },
        { id: 10, text: 'Handle customer interactions independently', points: 20 },
        { id: 11, text: 'Complete complex installation project', points: 25 },
        { id: 12, text: 'Build professional network', points: 15 },
      ],
    },
    {
      year: 4,
      title: 'Mastery year',
      milestones: [
        { id: 13, text: 'Pass End Point Assessment', points: 40 },
        { id: 14, text: 'Complete portfolio to high standard', points: 30 },
        { id: 15, text: 'Lead a project team', points: 25 },
        { id: 16, text: 'Plan post-qualification career', points: 20 },
      ],
    },
  ];

  const toggleMilestone = (milestoneId: number) => {
    setCompletedMilestones((prev) =>
      prev.includes(milestoneId) ? prev.filter((id) => id !== milestoneId) : [...prev, milestoneId]
    );
  };

  const getCurrentYearData = () => yearMilestones.find((y) => y.year === currentYear);
  const getTotalPoints = () =>
    completedMilestones.reduce((total, id) => {
      const milestone = yearMilestones.flatMap((y) => y.milestones).find((m) => m.id === id);
      return total + (milestone?.points || 0);
    }, 0);

  const getYearProgress = (year: number) => {
    const yearData = yearMilestones.find((y) => y.year === year);
    if (!yearData) return 0;

    const totalMilestones = yearData.milestones.length;
    const completedCount = yearData.milestones.filter((m) =>
      completedMilestones.includes(m.id)
    ).length;

    return (completedCount / totalMilestones) * 100;
  };

  const currentYearData = getCurrentYearData();
  const totalPoints = getTotalPoints();
  const maxPoints = yearMilestones
    .flatMap((y) => y.milestones)
    .reduce((sum, m) => sum + m.points, 0);

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Progress tracker
        </span>
        <h3 className="text-[18px] font-semibold text-white leading-tight">
          Interactive progress tracker
        </h3>
        <p className="text-[13px] text-white/70">
          Track your apprenticeship milestones and earn points.
        </p>
      </div>

      <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Overall progress
          </span>
          <span className="text-[12px] text-white font-mono">
            {totalPoints} / {maxPoints} pts · {Math.round((totalPoints / maxPoints) * 100)}%
          </span>
        </div>
        <Progress value={(totalPoints / maxPoints) * 100} className="h-2" />
      </div>

      <div className="flex flex-wrap gap-2">
        {yearMilestones.map((year) => {
          const isActive = currentYear === year.year;
          return (
            <Button
              key={year.year}
              onClick={() => setCurrentYear(year.year)}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              className={
                isActive
                  ? 'h-9 bg-elec-yellow text-black font-semibold touch-manipulation'
                  : 'h-9 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation'
              }
            >
              Year {year.year}
              <span className="ml-2 text-[11px] opacity-70">
                {Math.round(getYearProgress(year.year))}%
              </span>
            </Button>
          );
        })}
      </div>

      {currentYearData && (
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h3 className="text-[15px] font-semibold text-white">{currentYearData.title}</h3>
            <span className="text-[12px] text-white/85">
              {
                currentYearData.milestones.filter((m) => completedMilestones.includes(m.id))
                  .length
              }{' '}
              / {currentYearData.milestones.length} completed
            </span>
          </div>

          <div className="space-y-2">
            {currentYearData.milestones.map((milestone) => {
              const isComplete = completedMilestones.includes(milestone.id);
              return (
                <button
                  key={milestone.id}
                  type="button"
                  onClick={() => toggleMilestone(milestone.id)}
                  className={`w-full text-left rounded-lg border p-3 touch-manipulation transition-colors ${
                    isComplete
                      ? 'border-elec-yellow/30 bg-elec-yellow/[0.04]'
                      : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {isComplete ? (
                        <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-white/40 flex-shrink-0" />
                      )}
                      <span
                        className={`text-[13px] ${
                          isComplete ? 'text-white/55 line-through' : 'text-white/85'
                        }`}
                      >
                        {milestone.text}
                      </span>
                    </div>
                    <span className="text-[12px] text-white/85 font-mono">
                      {milestone.points} pts
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {yearMilestones.map((year) => (
          <div
            key={year.year}
            className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-1.5"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Year {year.year}
            </span>
            <Progress value={getYearProgress(year.year)} className="h-1" />
            <p className="text-[11px] text-white/70">
              {year.milestones.filter((m) => completedMilestones.includes(m.id)).length} /{' '}
              {year.milestones.length}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveProgressTracker;
