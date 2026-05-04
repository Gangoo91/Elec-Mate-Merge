import { Button } from '@/components/ui/button';

const Section = ({
  eyebrow,
  description,
  children,
}: {
  eyebrow: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
    <div className="space-y-1">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        {eyebrow}
      </span>
      {description && (
        <p className="text-[14px] text-white/70 leading-relaxed">{description}</p>
      )}
    </div>
    {children}
  </div>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
    {children}
  </span>
);

const ExamStrategiesTab = () => {
  const examTypes = [
    {
      title: 'BS 7671:2018+A4:2026',
      difficulty: 'High',
      duration: '2 hours',
      passRate: '70%',
      strategies: [
        {
          strategy: 'Master Part 4 — Protection for Safety',
          description:
            'This section is heavily tested and forms the foundation of electrical safety.',
          tips: [
            'Learn Table 41.3 by heart',
            'Understand discrimination principles',
            'Practice shock protection scenarios',
          ],
          priority: 'Critical',
        },
        {
          strategy: 'Cable calculations mastery',
          description: 'Cable sizing appears in multiple question formats throughout the exam.',
          tips: [
            'Practice current-carrying capacity daily',
            'Understand all derating factors',
            'Memorise correction factors table',
          ],
          priority: 'High',
        },
        {
          strategy: 'Effective reference navigation',
          description: 'Learn to navigate BS 7671 and On-Site Guide quickly and efficiently.',
          tips: [
            'Practice finding regulations in under 30 seconds',
            'Use index efficiently',
            'Mark key pages with colour-coded tabs',
          ],
          priority: 'Essential',
        },
      ],
    },
    {
      title: 'Level 3 diploma theory',
      difficulty: 'Medium-high',
      duration: '1.5 hours',
      passRate: '75%',
      strategies: [
        {
          strategy: 'AC theory foundation',
          description:
            'Build rock-solid understanding of AC fundamentals before complex topics.',
          tips: [
            'Master RLC circuits completely',
            'Understand impedance thoroughly',
            'Practice resonance calculations daily',
          ],
          priority: 'Critical',
        },
        {
          strategy: 'Three-phase power systems',
          description:
            'Master the relationship between line and phase values in all configurations.',
          tips: [
            'Practice star-delta conversions',
            'Understand power triangles',
            'Learn phasor diagram construction',
          ],
          priority: 'High',
        },
        {
          strategy: 'Formula application strategy',
          description: 'Focus on understanding concepts rather than memorising formulas.',
          tips: [
            'Draw circuit diagrams for every problem',
            'Work through formula derivations',
            'Connect theory to practical work experience',
          ],
          priority: 'Essential',
        },
      ],
    },
    {
      title: 'AM2 practical assessment',
      difficulty: 'High',
      duration: '5.5 hours',
      passRate: '85%',
      strategies: [
        {
          strategy: 'Time management excellence',
          description: 'Develop a systematic approach to complete all tasks within time limits.',
          tips: [
            'Practice complete mock assessments',
            'Time each individual task',
            'Build in buffer time for complex circuits',
          ],
          priority: 'Critical',
        },
        {
          strategy: 'Methodical testing approach',
          description: 'Follow BS 7671 testing sequence religiously for consistent results.',
          tips: [
            'Memorise testing sequence',
            'Practice with different MFT models',
            'Document results clearly and legibly',
          ],
          priority: 'High',
        },
        {
          strategy: 'Installation quality focus',
          description:
            'Ensure all installation work meets current standards and regulations.',
          tips: [
            'Check cable routes and supports',
            'Verify termination quality',
            'Ensure compliance with current regs',
          ],
          priority: 'Essential',
        },
      ],
    },
    {
      title: 'Level 2 fundamentals',
      difficulty: 'Medium',
      duration: '1.5 hours',
      passRate: '80%',
      strategies: [
        {
          strategy: 'Basic electrical principles',
          description: "Ensure solid foundation in Ohm's Law and basic circuit analysis.",
          tips: [
            'Practice V=IR calculations daily',
            'Understand series vs parallel circuits',
            'Master power calculations',
          ],
          priority: 'Critical',
        },
        {
          strategy: 'Safe working practices',
          description: 'Demonstrate comprehensive understanding of electrical safety.',
          tips: [
            'Know PPE requirements',
            'Understand isolation procedures',
            'Learn risk assessment basics',
          ],
          priority: 'High',
        },
      ],
    },
    {
      title: 'Inspection and testing (2391)',
      difficulty: 'High',
      duration: '3 hours',
      passRate: '65%',
      strategies: [
        {
          strategy: 'Test equipment mastery',
          description: 'Know all test equipment functions and limitations thoroughly.',
          tips: [
            'Understand MFT capabilities',
            'Know test voltage requirements',
            'Practice equipment setup procedures',
          ],
          priority: 'Critical',
        },
        {
          strategy: 'Fault finding methodology',
          description: 'Develop systematic approach to identifying and documenting faults.',
          tips: [
            'Follow logical test sequence',
            'Document findings clearly',
            'Understand code classifications',
          ],
          priority: 'High',
        },
      ],
    },
  ];

  const examTechniques = [
    {
      technique: 'Pre-exam preparation',
      description: 'Optimise your readiness before entering the exam room.',
      steps: [
        'Arrive 15 minutes early to settle nerves',
        'Bring spare calculators and writing materials',
        'Review key formulas one final time',
        'Practice breathing exercises to stay calm',
      ],
      timeframe: 'Day of exam',
    },
    {
      technique: 'Question analysis strategy',
      description: "Read questions carefully and identify exactly what's being asked.",
      steps: [
        'Read each question twice before starting',
        'Highlight key information and requirements',
        'Identify the specific formula or method needed',
        'Check units required in the final answer',
      ],
      timeframe: 'During exam',
    },
    {
      technique: 'Time allocation method',
      description: 'Manage your time effectively to complete all questions.',
      steps: [
        'Allocate 1-2 minutes per mark as a guide',
        'Complete easier questions first to build confidence',
        'Return to difficult questions with remaining time',
        'Reserve final 10 minutes for checking answers',
      ],
      timeframe: 'Throughout exam',
    },
    {
      technique: 'Working methodology',
      description: 'Show clear working to maximise partial marks.',
      steps: [
        'Write down the relevant formula first',
        'Show all substitution steps clearly',
        'Include units at each calculation stage',
        'Circle or highlight your final answer',
      ],
      timeframe: 'For calculations',
    },
  ];

  const advancedStrategies = [
    {
      title: 'Memory palace technique',
      description: 'Use spatial memory to remember complex regulations and tables.',
      application: 'Ideal for BS 7671 regulation numbers and Table 41.3 values',
    },
    {
      title: 'Pattern recognition',
      description: 'Identify common question patterns and develop template solutions.',
      application: 'Effective for cable calculation and circuit design questions',
    },
    {
      title: 'Stress inoculation',
      description: 'Practice under exam-like pressure to build resilience.',
      application: 'Take mock exams with strict time limits and distractions',
    },
    {
      title: 'Interleaving practice',
      description: 'Mix different topic areas in study sessions rather than blocking.',
      application: 'Combine theory, calculations, and regulations in single sessions',
    },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Quick exam success formula
        </span>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            { label: 'Preparation', detail: '3-6 months consistent study' },
            { label: 'Practice', detail: 'Daily mock questions' },
            { label: 'Strategy', detail: 'Exam-specific techniques' },
            { label: 'Success', detail: 'Confident performance' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-1"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {item.label}
              </span>
              <p className="text-[12px] text-white/85 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <Section eyebrow="Comprehensive exam strategies">
        <div className="space-y-3">
          {examTypes.map((exam, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <h3 className="text-[16px] font-semibold text-white">{exam.title}</h3>
                <div className="flex flex-wrap gap-1.5">
                  <Pill>{exam.difficulty}</Pill>
                  <Pill>{exam.duration}</Pill>
                  <Pill>Pass: {exam.passRate}</Pill>
                </div>
              </div>
              <div className="space-y-3">
                {exam.strategies.map((strategy, strategyIndex) => (
                  <div
                    key={strategyIndex}
                    className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-2"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="text-[14px] text-white">{strategy.strategy}</h4>
                      <Pill>{strategy.priority}</Pill>
                    </div>
                    <p className="text-[13px] text-white/85 leading-relaxed">
                      {strategy.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {strategy.tips.map((tip, tipIndex) => (
                        <Pill key={tipIndex}>{tip}</Pill>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Universal exam techniques">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {examTechniques.map((technique, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h4 className="text-[14px] font-semibold text-white">{technique.technique}</h4>
                <Pill>{technique.timeframe}</Pill>
              </div>
              <p className="text-[13px] text-white/70 leading-relaxed">{technique.description}</p>
              <ol className="space-y-1">
                {technique.steps.map((step, stepIndex) => (
                  <li
                    key={stepIndex}
                    className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-white/55 font-mono">{stepIndex + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Advanced learning strategies">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {advancedStrategies.map((strategy, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[14px] font-semibold text-white">{strategy.title}</h4>
              <p className="text-[13px] text-white/70 leading-relaxed">{strategy.description}</p>
              <p className="text-[12px] text-white/85 leading-relaxed">
                <span className="text-white/55">Best for: </span>
                {strategy.application}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Ready to start your exam success journey?">
        <p className="text-[14px] text-white/85 leading-relaxed">
          Choose your target exam and begin with a tailored study plan and practice resources.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            className="h-10 border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06] touch-manipulation"
          >
            BS 7671 practice
          </Button>
          <Button
            variant="outline"
            className="h-10 border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06] touch-manipulation"
          >
            Level 3 mock exams
          </Button>
          <Button
            variant="outline"
            className="h-10 border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06] touch-manipulation"
          >
            AM2 preparation
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default ExamStrategiesTab;
