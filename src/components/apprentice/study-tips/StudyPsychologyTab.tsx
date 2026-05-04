const StudyPsychologyTab = () => {
  const psychologyTopics = [
    {
      title: 'Cognitive load theory',
      description: 'Understanding how your brain processes information',
      content: [
        'Your working memory can only hold 7±2 pieces of information at once',
        'Break complex electrical concepts into smaller, manageable chunks',
        'Use visual aids and diagrams to reduce cognitive load',
        'Practice retrieval to move information from working to long-term memory',
      ],
      tips: [
        'Study one circuit type at a time before combining concepts',
        'Use mind maps to organise related electrical principles',
        'Take breaks every 25-30 minutes to prevent mental fatigue',
      ],
    },
    {
      title: 'Growth mindset',
      description: 'Developing resilience and embracing challenges',
      content: [
        'Believe that electrical skills can be developed through effort and practice',
        'View mistakes as learning opportunities, not failures',
        'Embrace challenging problems as chances to grow',
        'Focus on the learning process rather than just outcomes',
      ],
      tips: [
        "Replace 'I can't do this' with 'I can't do this yet'",
        'Celebrate small improvements in understanding',
        'Seek feedback actively and use it constructively',
      ],
    },
    {
      title: 'Motivation & goal setting',
      description: 'Maintaining drive and direction in your studies',
      content: [
        'Set SMART goals for your electrical training',
        'Connect learning to your long-term career aspirations',
        'Use both intrinsic (personal satisfaction) and extrinsic (qualification) motivation',
        'Track progress to maintain momentum',
      ],
      tips: [
        'Break large goals (like passing BS 7671) into weekly targets',
        'Visualise yourself as a qualified electrician',
        'Find study partners for accountability and support',
      ],
    },
    {
      title: 'Memory consolidation',
      description: 'How memories form and strengthen over time',
      content: [
        'Sleep is crucial for converting short-term memories to long-term storage',
        'Spaced repetition is more effective than massed practice',
        'Active recall strengthens memory pathways',
        'Connecting new information to existing knowledge improves retention',
      ],
      tips: [
        'Review electrical regulations within 24 hours of first learning',
        'Test yourself regularly without looking at notes first',
        'Get 7-9 hours of sleep, especially before exams',
      ],
    },
  ];

  const techniques = [
    {
      title: 'The testing effect',
      description: 'Active recall is more powerful than passive re-reading',
      application: 'Quiz yourself on electrical symbols before checking the answers',
    },
    {
      title: 'Interleaving',
      description: 'Mixing different types of problems improves learning',
      application: 'Alternate between circuit calculations, safety procedures and regulations',
    },
    {
      title: 'Elaborative interrogation',
      description: "Asking 'why' and 'how' deepens understanding",
      application:
        "Don't just memorise cable ratings — understand why they vary with installation method",
    },
    {
      title: 'Dual coding',
      description: 'Using both visual and verbal information enhances memory',
      application: 'Draw circuit diagrams while explaining the theory aloud',
    },
  ];

  const stressManagement = [
    {
      technique: 'Box breathing',
      description: '4-4-4-4 breathing pattern to reduce exam anxiety',
      when: 'Before exams or when feeling overwhelmed',
    },
    {
      technique: 'Progressive muscle relaxation',
      description: 'Systematically tense and release muscle groups',
      when: 'After long study sessions or before sleep',
    },
    {
      technique: 'Positive self-talk',
      description: 'Replace negative thoughts with constructive ones',
      when: 'When facing difficult concepts or feeling discouraged',
    },
    {
      technique: 'Mindfulness',
      description: 'Stay present and focused during study sessions',
      when: 'When your mind wanders or you feel distracted',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Psychology of learning
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Understanding how your mind learns can dramatically improve your study effectiveness.
          These evidence-based psychological principles will help you master electrical concepts
          more efficiently and retain information longer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {psychologyTopics.map((topic, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {topic.title}
              </span>
              <p className="text-[13px] text-white/70">{topic.description}</p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Key principles
              </span>
              <ul className="space-y-1">
                {topic.content.map((point, pointIndex) => (
                  <li
                    key={pointIndex}
                    className="flex items-start gap-2 text-[13px] text-white/85"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Practical applications
              </span>
              <ul className="space-y-1">
                {topic.tips.map((tip, tipIndex) => (
                  <li
                    key={tipIndex}
                    className="flex items-start gap-2 text-[13px] text-white/85"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Evidence-based learning techniques
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {techniques.map((technique, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[14px] font-semibold text-white">{technique.title}</h4>
              <p className="text-[13px] text-white/70 leading-relaxed">{technique.description}</p>
              <div className="rounded-md border border-white/10 bg-white/[0.03] p-2.5 space-y-0.5">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  For electrical training
                </span>
                <p className="text-[12px] text-white/85">{technique.application}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Stress management & wellbeing
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {stressManagement.map((item, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[14px] font-semibold text-white">{item.technique}</h4>
              <p className="text-[13px] text-white/85 leading-relaxed">{item.description}</p>
              <p className="text-[12px] text-white/55">
                <span className="text-white/70">When: </span>
                {item.when}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          The psychology of success
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Your mindset and approach to learning are just as important as the time you spend
          studying. By understanding how your brain works and applying these psychological
          principles, you&apos;ll not only learn electrical concepts more effectively but also
          develop the mental resilience needed for a successful career in the electrical industry.
          Learning is a skill that can be improved with the right techniques and mindset.
        </p>
      </div>
    </div>
  );
};

export default StudyPsychologyTab;
