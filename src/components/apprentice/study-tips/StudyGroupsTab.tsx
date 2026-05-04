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

const StudyGroupsTab = () => {
  const studyGroups = [
    {
      name: '18th Edition Warriors',
      members: 24,
      location: 'Manchester',
      nextSession: 'Tomorrow, 7:00 PM',
      level: 'Intermediate',
      rating: 4.8,
      description:
        'Dedicated group focusing on mastering BS 7671:2018+A4:2026. Weekly sessions with mock exams and regulation deep-dives.',
      tags: ['BS 7671', 'Mock exams', 'Regulations'],
    },
    {
      name: 'Level 3 Theory Masters',
      members: 18,
      location: 'Birmingham',
      nextSession: 'Saturday, 10:00 AM',
      level: 'Advanced',
      rating: 4.9,
      description:
        'Advanced theory group tackling complex calculations and AC principles. Perfect for Level 3 diploma preparation.',
      tags: ['Level 3', 'AC theory', 'Calculations'],
    },
    {
      name: 'AM2 Practice Squad',
      members: 12,
      location: 'London',
      nextSession: 'Sunday, 2:00 PM',
      level: 'Advanced',
      rating: 4.7,
      description:
        'Hands-on practice group for AM2 preparation. Access to practice rigs and testing equipment.',
      tags: ['AM2', 'Practical', 'Testing'],
    },
    {
      name: 'Apprentice Beginners',
      members: 35,
      location: 'Online',
      nextSession: 'Tonight, 8:00 PM',
      level: 'Beginner',
      rating: 4.6,
      description:
        'Welcoming group for new apprentices. Covers basic electrical principles and industry knowledge.',
      tags: ['Beginners', 'Online', 'Fundamentals'],
    },
  ];

  const groupBenefits = [
    {
      title: 'Peer learning',
      description: 'Learn from fellow apprentices and share experiences.',
      benefits: [
        'Different perspectives on complex topics',
        'Motivation through shared goals',
        'Real-world application examples',
      ],
    },
    {
      title: 'Discussion and debate',
      description: 'Engage in meaningful discussions about electrical concepts.',
      benefits: ['Clarify confusing topics', 'Test your understanding', 'Learn teaching skills'],
    },
    {
      title: 'Accountability',
      description: 'Stay motivated with regular group commitments.',
      benefits: ['Consistent study schedule', 'Progress tracking', 'Mutual encouragement'],
    },
    {
      title: 'Resource sharing',
      description: 'Access pooled study materials and resources.',
      benefits: ['Shared notes and summaries', 'Practice questions', 'Industry insights'],
    },
  ];

  const virtualStudyTips = [
    {
      platform: 'Discord study servers',
      description: 'Join dedicated electrical study Discord servers for ongoing support.',
      features: ['Voice study rooms', 'Screen sharing', 'File sharing', 'Study timers'],
    },
    {
      platform: 'Zoom study sessions',
      description: 'Organised video calls with structured learning activities.',
      features: ['Recorded sessions', 'Breakout rooms', 'Whiteboard sharing', 'Calendar integration'],
    },
    {
      platform: 'WhatsApp groups',
      description: 'Quick questions and daily motivation through messaging groups.',
      features: ['Instant messaging', 'Photo sharing', 'Voice messages', 'File documents'],
    },
    {
      platform: 'Study apps',
      description: 'Collaborative study apps for shared flashcards and quizzes.',
      features: ['Shared flashcard decks', 'Group challenges', 'Progress tracking', 'Leaderboards'],
    },
  ];

  const studyGroupFormats = [
    {
      format: 'Question and answer sessions',
      duration: '1-2 hours',
      description: 'Focused sessions where members bring their toughest questions.',
      structure: [
        'Problem presentation (10 mins)',
        'Group discussion (20 mins)',
        'Solution summary (10 mins)',
        'Next problem',
      ],
    },
    {
      format: 'Mock exam practice',
      duration: '2-3 hours',
      description: 'Timed practice exams followed by group review and discussion.',
      structure: [
        'Exam setup (15 mins)',
        'Timed exam (90 mins)',
        'Break (15 mins)',
        'Group review (45 mins)',
      ],
    },
    {
      format: 'Teaching rotations',
      duration: '1.5-2 hours',
      description: 'Members take turns teaching topics to reinforce their own learning.',
      structure: [
        'Preparation time (15 mins)',
        'Teaching session (20 mins)',
        'Q&A (10 mins)',
        'Feedback (5 mins)',
      ],
    },
    {
      format: 'Case study analysis',
      duration: '2 hours',
      description: 'Real-world electrical scenarios discussed and solved as a group.',
      structure: [
        'Case presentation (20 mins)',
        'Individual analysis (30 mins)',
        'Group discussion (60 mins)',
        'Summary (10 mins)',
      ],
    },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Study groups and collaborative learning
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Join fellow electrical apprentices in structured study groups. Collaborative learning
          improves retention and motivation compared to studying alone.
        </p>
      </div>

      <Section eyebrow="Find your study group">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {studyGroups.map((group, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <h4 className="text-[14px] font-semibold text-white">{group.name}</h4>
                  <div className="flex items-center gap-3 text-[12px] text-white/55">
                    <span>{group.members} members</span>
                    <span>·</span>
                    <span>{group.location}</span>
                    <span>·</span>
                    <span>Rated {group.rating}</span>
                  </div>
                </div>
                <Pill>{group.level}</Pill>
              </div>

              <p className="text-[13px] text-white/85 leading-relaxed">{group.description}</p>

              <div className="text-[13px] text-white/85">
                <span className="text-white/55">Next: </span>
                {group.nextSession}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {group.tags.map((tag, tagIndex) => (
                  <Pill key={tagIndex}>{tag}</Pill>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 h-9 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
                >
                  Join group
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-9 border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06] touch-manipulation"
                >
                  View details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Why study groups work">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {groupBenefits.map((benefit, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[14px] font-semibold text-white">{benefit.title}</h4>
              <p className="text-[13px] text-white/70 leading-relaxed">{benefit.description}</p>
              <ul className="space-y-1">
                {benefit.benefits.map((item, itemIndex) => (
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

      <Section eyebrow="Virtual study platforms">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {virtualStudyTips.map((tip, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[14px] font-semibold text-white">{tip.platform}</h4>
              <p className="text-[13px] text-white/70 leading-relaxed">{tip.description}</p>
              <ul className="space-y-1">
                {tip.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Effective study group formats">
        <div className="space-y-3">
          {studyGroupFormats.map((format, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h4 className="text-[14px] font-semibold text-white">{format.format}</h4>
                <Pill>{format.duration}</Pill>
              </div>
              <p className="text-[13px] text-white/70 leading-relaxed">{format.description}</p>
              <div className="space-y-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  Typical structure
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                  {format.structure.map((step, stepIndex) => (
                    <div
                      key={stepIndex}
                      className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-white/55 font-mono">{stepIndex + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Ready to join a study group?">
        <p className="text-[14px] text-white/85 leading-relaxed">
          Connect with fellow apprentices and accelerate your learning through collaborative study.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button className="h-10 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation">
            Find groups near me
          </Button>
          <Button
            variant="outline"
            className="h-10 border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06] touch-manipulation"
          >
            Create new group
          </Button>
          <Button
            variant="outline"
            className="h-10 border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06] touch-manipulation"
          >
            Join online session
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default StudyGroupsTab;
