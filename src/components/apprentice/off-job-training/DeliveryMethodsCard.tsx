const DeliveryMethodsCard = () => {
  const deliveryMethods = [
    {
      method: 'Face-to-face learning',
      description: 'Traditional classroom or workshop-based learning',
      examples: ['College attendance', 'Training centre workshops', 'Skills demonstrations'],
      pros: ['Direct interaction with tutors', 'Hands-on practice', 'Peer learning'],
      timeAllocation: '60-80% typical',
    },
    {
      method: 'Online learning',
      description: 'Digital platforms and e-learning modules',
      examples: ['LMS courses', 'Virtual classrooms', 'Interactive simulations'],
      pros: ['Flexible scheduling', 'Self-paced learning', 'Accessible anywhere'],
      timeAllocation: '20-40% typical',
    },
    {
      method: 'Blended learning',
      description: 'Combination of face-to-face and online methods',
      examples: ['Flipped classroom', 'Pre-session online prep', 'Post-session follow-up'],
      pros: ['Best of both worlds', 'Reinforced learning', 'Flexible delivery'],
      timeAllocation: 'Most common approach',
    },
    {
      method: 'Mobile learning',
      description: 'Learning through mobile devices and apps',
      examples: ['Training apps', 'Mobile quizzes', 'Video tutorials'],
      pros: ['Learn on-the-go', 'Bite-sized content', 'Always available'],
      timeAllocation: 'Supplementary',
    },
    {
      method: 'Field visits',
      description: 'Educational visits to industry sites',
      examples: ['Factory tours', 'Site visits', 'Trade exhibitions'],
      pros: ['Real-world context', 'Industry exposure', 'Networking opportunities'],
      timeAllocation: '5-10% typical',
    },
    {
      method: 'Project-based learning',
      description: 'Learning through practical projects and assignments',
      examples: ['Design projects', 'Case studies', 'Research assignments'],
      pros: ['Applied learning', 'Problem-solving skills', 'Portfolio building'],
      timeAllocation: '20-30% typical',
    },
  ];

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Training delivery methods
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Understanding different ways off-the-job training can be delivered
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deliveryMethods.map((method, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-[14px] font-semibold text-white">{method.method}</h4>
              <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                {method.timeAllocation}
              </span>
            </div>
            <p className="text-[14px] text-white/85 leading-relaxed">{method.description}</p>
            <div className="space-y-2">
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Examples
                </span>
                <ul className="space-y-1">
                  {method.examples.map((example, idx) => (
                    <li
                      key={idx}
                      className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                  Benefits
                </span>
                <ul className="space-y-1">
                  {method.pros.map((pro, idx) => (
                    <li
                      key={idx}
                      className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryMethodsCard;
