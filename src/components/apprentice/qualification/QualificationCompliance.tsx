import { useQualifications } from '@/hooks/qualification/useQualifications';

const QualificationCompliance = () => {
  const { userSelection, compliance, categories, loading } = useQualifications();

  if (loading) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Loading compliance data...
        </span>
      </div>
    );
  }

  if (!userSelection) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Qualification compliance
        </span>
        <p className="text-[14px] text-white/70 leading-relaxed">
          Select a qualification to track your compliance and progress.
        </p>
      </div>
    );
  }

  const overallProgress =
    compliance.length > 0
      ? Math.round(
          compliance.reduce((sum, c) => sum + c.compliance_percentage, 0) / compliance.length
        )
      : 0;

  const completedCategories = compliance.filter((c) => c.compliance_percentage >= 100).length;
  const inProgressCategories = compliance.filter(
    (c) => c.compliance_percentage > 0 && c.compliance_percentage < 100
  ).length;
  const notStartedCategories = compliance.filter((c) => c.compliance_percentage === 0).length;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Overall progress
          </span>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-mono text-white">{overallProgress}%</span>
          </div>
          <p className="text-[14px] text-white/85 leading-relaxed">
            {userSelection.qualification?.title}
          </p>
          <p className="text-[11px] text-white/55 font-mono">
            {userSelection.qualification?.awarding_body}
          </p>
        </div>

        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-elec-yellow transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
            <div className="text-2xl font-mono text-white">{completedCategories}</div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/55 mt-1">Completed</p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
            <div className="text-2xl font-mono text-white">{inProgressCategories}</div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/55 mt-1">In progress</p>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
            <div className="text-2xl font-mono text-white">{notStartedCategories}</div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/55 mt-1">Not started</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Category progress
        </span>
        <div className="grid gap-3">
          {compliance.map((complianceRecord) => {
            const category = categories.find((c) => c.id === complianceRecord.category_id);
            if (!category) return null;

            const entryProgress = Math.min(
              (complianceRecord.completed_entries / complianceRecord.required_entries) * 100,
              100
            );

            return (
              <div
                key={complianceRecord.id}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="text-[15px] font-medium text-white">{category.name}</h4>
                  <span className="text-2xl font-mono text-white">
                    {complianceRecord.compliance_percentage}%
                  </span>
                </div>

                <p className="text-[13px] text-white/70 leading-relaxed">{category.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-[12px]">
                    <span className="text-white/55">Portfolio entries</span>
                    <span className="text-white/85 font-mono">
                      {complianceRecord.completed_entries} / {complianceRecord.required_entries}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-elec-yellow transition-all duration-500"
                      style={{ width: `${entryProgress}%` }}
                    />
                  </div>
                </div>

                {category.learning_outcomes && category.learning_outcomes.length > 0 && (
                  <div className="pt-3 border-t border-white/[0.06] space-y-1">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      Learning outcomes
                    </span>
                    <ul className="space-y-1.5 mt-1">
                      {category.learning_outcomes.slice(0, 2).map((outcome, index) => (
                        <li
                          key={index}
                          className="text-[12px] text-white/85 leading-relaxed flex items-start gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                      {category.learning_outcomes.length > 2 && (
                        <li className="text-[11px] text-white/55 italic">
                          And {category.learning_outcomes.length - 2} more...
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QualificationCompliance;
