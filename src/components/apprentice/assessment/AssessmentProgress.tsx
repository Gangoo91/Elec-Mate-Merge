interface AssessmentTool {
  id: string;
  title: string;
  difficulty: string;
}

interface AssessmentProgressProps {
  tools: AssessmentTool[];
  completedAssessments: string[];
}

const AssessmentProgress = ({ tools, completedAssessments }: AssessmentProgressProps) => {
  const completionRate = (completedAssessments.length / tools.length) * 100;
  const essentialCompleted = completedAssessments.filter(
    (id) => tools.find((t) => t.id === id)?.difficulty === 'Essential'
  ).length;
  const essentialTotal = tools.filter((t) => t.difficulty === 'Essential').length;

  const getProgressMessage = () => {
    if (completionRate === 100) return 'All assessments completed.';
    if (completionRate >= 75) return 'Almost there.';
    if (completionRate >= 50) return 'Halfway through.';
    if (completionRate >= 25) return 'Good start.';
    return 'Begin your assessment journey.';
  };

  const getNextRecommendation = () => {
    const incomplete = tools.filter((t) => !completedAssessments.includes(t.id));
    const essential = incomplete.find((t) => t.difficulty === 'Essential');
    if (essential) return essential;
    return incomplete[0];
  };

  const nextTool = getNextRecommendation();

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-5">
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Your progress
        </span>
        <span className="text-[12px] text-white/85 font-mono">
          {completedAssessments.length}/{tools.length} · {Math.round(completionRate)}%
        </span>
      </div>

      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-elec-yellow transition-all duration-500"
          style={{ width: `${completionRate}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-center space-y-1">
          <div className="text-[20px] font-semibold text-white font-mono">
            {completedAssessments.length}
          </div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">Completed</div>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-center space-y-1">
          <div className="text-[20px] font-semibold text-white font-mono">
            {essentialCompleted}/{essentialTotal}
          </div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">Essential</div>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-center space-y-1">
          <div className="text-[20px] font-semibold text-white font-mono">
            {Math.round(completionRate)}%
          </div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">Overall</div>
        </div>
      </div>

      <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Status
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">{getProgressMessage()}</p>
        {nextTool && completionRate < 100 && (
          <p className="text-[13px] text-white/70">
            Next recommended: <span className="text-elec-yellow">{nextTool.title}</span>
          </p>
        )}
      </div>

      {completedAssessments.length > 0 && (
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Recent achievements
          </span>
          <div className="flex flex-wrap gap-1.5">
            {completedAssessments.slice(-3).map((id) => {
              const tool = tools.find((t) => t.id === id);
              return tool ? (
                <span
                  key={id}
                  className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                >
                  {tool.title}
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentProgress;
