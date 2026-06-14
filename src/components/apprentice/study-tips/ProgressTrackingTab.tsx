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
      {description && <p className="text-[14px] text-white/70 leading-relaxed">{description}</p>}
    </div>
    {children}
  </div>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
    {children}
  </span>
);

const ProgressTrackingTab = () => {
  const trackingMethods = [
    {
      method: 'Study time logging',
      description: 'Track daily and weekly study hours across different subjects.',
      benefits: [
        'Identify peak productivity times',
        'Ensure balanced subject coverage',
        'Set realistic study goals',
      ],
      tools: ['Digital calendars', 'Study apps', 'Time tracking software', 'Simple logbooks'],
    },
    {
      method: 'Knowledge assessment',
      description: 'Regular testing to measure understanding and retention.',
      benefits: ['Identify knowledge gaps', 'Track improvement over time', 'Build exam confidence'],
      tools: ['Practice tests', 'Flashcard apps', 'Quiz platforms', 'Self-assessment sheets'],
    },
    {
      method: 'Milestone tracking',
      description: 'Break down learning goals into achievable milestones.',
      benefits: ['Maintain motivation', 'Celebrate small wins', 'Stay on track with deadlines'],
      tools: ['Goal-setting apps', 'Progress charts', 'Achievement badges', 'Milestone calendars'],
    },
    {
      method: 'Skill development',
      description: 'Monitor practical and theoretical skill improvements.',
      benefits: ['Focus on weak areas', 'Track competency growth', 'Prepare for assessments'],
      tools: ['Skill matrices', 'Competency trackers', 'Portfolio systems', 'Progress journals'],
    },
  ];

  const whatToTrack = [
    {
      category: 'Time management',
      items: [
        'Daily study time — minutes actually spent, not planned',
        'Weekly hours across each subject area',
        'Consistency streak — days studied in a row',
      ],
    },
    {
      category: 'Knowledge retention',
      items: [
        'BS 7671:2018+A4:2026 — regulation recall and navigation speed',
        'Level 3 theory — calculations and AC principles',
        'Practical skills — testing sequence and fault finding',
      ],
    },
    {
      category: 'Goal achievement',
      items: [
        'Monthly learning targets met',
        'Assessment readiness against the spec',
        'Portfolio / OTJ evidence logged',
      ],
    },
  ];

  const trackingTools = [
    {
      tool: 'Digital study planners',
      description: 'Comprehensive apps for tracking all aspects of your learning journey.',
      features: ['Integrated calendars', 'Progress analytics', 'Goal setting', 'Reminder systems'],
      examples: ['Notion', 'Trello', 'Microsoft OneNote', 'Google Workspace'],
      bestFor: 'Students who like detailed planning and analytics',
    },
    {
      tool: 'Time tracking apps',
      description: 'Specialised tools for monitoring study time and productivity.',
      features: [
        'Automatic time tracking',
        'Category organisation',
        'Productivity insights',
        'Goal setting',
      ],
      examples: ['Toggl', 'RescueTime', 'Forest', 'Clockify'],
      bestFor: 'Students wanting to optimise their study time',
    },
    {
      tool: 'Flashcard systems',
      description: 'Spaced repetition systems for knowledge retention tracking.',
      features: [
        'Adaptive algorithms',
        'Progress tracking',
        'Performance analytics',
        'Cross-device sync',
      ],
      examples: ['Anki', 'Quizlet', 'Memrise', 'Brainscape'],
      bestFor: 'Memorisation and knowledge retention',
    },
    {
      tool: 'Habit trackers',
      description: 'Simple tools for building and maintaining study habits.',
      features: ['Streak tracking', 'Visual progress', 'Habit reminders', 'Motivation systems'],
      examples: ['Habitica', 'Streaks', 'Way of Life', 'Loop Habit Tracker'],
      bestFor: 'Building consistent study routines',
    },
  ];

  const progressStrategies = [
    {
      strategy: 'Weekly reviews',
      description: 'Regular assessment of progress and adjustment of study plans.',
      implementation: [
        'Set aside 30 minutes every Sunday',
        "Review the previous week's achievements",
        'Identify areas that need more attention',
        "Adjust next week's goals accordingly",
      ],
    },
    {
      strategy: 'Monthly milestones',
      description: 'Break annual goals into monthly checkpoints.',
      implementation: [
        'Define 12 monthly learning objectives',
        'Create specific, measurable targets',
        'Celebrate milestone achievements',
        'Adjust timeline if needed',
      ],
    },
    {
      strategy: 'Peer accountability',
      description: 'Share progress with study partners for motivation.',
      implementation: [
        'Find an accountability partner',
        'Share weekly progress updates',
        'Discuss challenges and solutions',
        'Celebrate successes together',
      ],
    },
    {
      strategy: 'Visual progress tracking',
      description: 'Use charts and graphs to visualise improvement.',
      implementation: [
        'Create progress charts for key subjects',
        'Use colour coding for different topics',
        'Update charts weekly',
        'Display prominently in study area',
      ],
    },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Progress tracking and analytics
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Monitor your learning journey with tracking tools and analytics. Students who track
          progress are more likely to achieve their study goals.
        </p>
      </div>

      <Section
        eyebrow="What to track"
        description="Pick a handful of measures across these three areas and review them weekly. Track your own numbers — the value is in the trend, not a target someone else set."
      >
        <div className="space-y-3">
          {whatToTrack.map((category, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[14px] font-semibold text-white">{category.category}</h4>
              <ul className="space-y-1.5">
                {category.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Essential tracking methods">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {trackingMethods.map((method, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[14px] font-semibold text-white">{method.method}</h4>
              <p className="text-[13px] text-white/70 leading-relaxed">{method.description}</p>
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Key benefits
                </span>
                <ul className="space-y-1">
                  {method.benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Recommended tools
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {method.tools.map((tool, toolIndex) => (
                    <Pill key={toolIndex}>{tool}</Pill>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Recommended tracking tools">
        <div className="space-y-3">
          {trackingTools.map((tool, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <h4 className="text-[14px] font-semibold text-white">{tool.tool}</h4>
                  <p className="text-[13px] text-white/70 leading-relaxed">{tool.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Key features
                  </span>
                  <ul className="space-y-1">
                    {tool.features.map((f, idx) => (
                      <li
                        key={idx}
                        className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Popular examples
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {tool.examples.map((ex, idx) => (
                      <Pill key={idx}>{ex}</Pill>
                    ))}
                  </div>
                  <p className="text-[12px] text-white/70 leading-relaxed">
                    <span className="text-white/55">Best for: </span>
                    {tool.bestFor}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Effective progress strategies">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {progressStrategies.map((strategy, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[14px] font-semibold text-white">{strategy.strategy}</h4>
              <p className="text-[13px] text-white/70 leading-relaxed">{strategy.description}</p>
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Implementation steps
                </span>
                <ol className="space-y-1">
                  {strategy.implementation.map((step, idx) => (
                    <li
                      key={idx}
                      className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-white/55 font-mono">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Progress tracking best practices">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-2">
            <h4 className="text-[14px] font-semibold text-white">Do</h4>
            <ul className="space-y-1.5">
              {[
                'Track consistently, even if just for 5 minutes daily',
                'Focus on trends rather than daily fluctuations',
                'Celebrate small wins and progress milestones',
                'Adjust goals based on realistic progress rates',
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-[14px] font-semibold text-white">Avoid</h4>
            <ul className="space-y-1.5">
              {[
                "Don't obsess over perfect tracking — consistency matters more",
                "Don't compare your progress to others too closely",
                "Don't abandon tracking after a few missed days",
                "Don't set unrealistic or overwhelming goals",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section eyebrow="Start tracking your progress today">
        <p className="text-[14px] text-white/85 leading-relaxed">
          Pick one tracking method above and start this week. A simple notebook or a free habit app
          beats a perfect system you never open — the habit matters more than the tool.
        </p>
      </Section>
    </div>
  );
};

export default ProgressTrackingTab;
