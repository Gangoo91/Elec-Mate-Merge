const AssessmentBestPractices = () => {
  const practices = [
    {
      title: 'Before starting work',
      items: [
        'Always complete pre-job assessment',
        'Verify all safety equipment is available',
        'Review method statements and risk assessments',
        'Ensure communication plan is in place',
        'Check weather conditions and forecasts',
      ],
    },
    {
      title: 'During assessment',
      items: [
        'Document all findings clearly',
        'Take photographs where appropriate',
        'Involve experienced colleagues when uncertain',
        "Don't proceed if conditions are unsafe",
        'Regular reassessment as work progresses',
      ],
    },
    {
      title: 'Team communication',
      items: [
        'Share assessment findings with all team members',
        'Ensure everyone understands the risks',
        'Establish clear communication protocols',
        'Regular safety briefings throughout the day',
        'Encourage team members to raise concerns',
      ],
    },
    {
      title: 'Documentation',
      items: [
        'Complete all required forms accurately',
        'Store digital copies securely',
        'Include relevant photos and measurements',
        'Note any unusual conditions or findings',
        'Ensure assessments are signed and dated',
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-[16px] sm:text-[18px] font-medium text-white">
        Assessment best practices
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {practices.map((practice, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              {practice.title}
            </span>
            <ul className="space-y-1.5">
              {practice.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
          Safety warning
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          When in doubt, stop and ask. If you're unsure about any aspect of the site assessment,
          don't proceed. Contact your supervisor, mentor, or a qualified electrician for guidance.
          It's always better to ask questions than to compromise safety.
        </p>
      </div>
    </div>
  );
};

export default AssessmentBestPractices;
