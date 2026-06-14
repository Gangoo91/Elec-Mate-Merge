import { Users, Wrench, Shield, HardHat, Briefcase, LucideIcon } from 'lucide-react';

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

interface Scenario {
  situation: string;
  good: string;
  tips: string[];
}

interface CommType {
  title: string;
  icon: LucideIcon;
  scenarios: Scenario[];
}

const WorkplaceCommunicationTab = () => {
  const communicationTypes: CommType[] = [
    {
      title: 'With your supervisor',
      icon: Users,
      scenarios: [
        {
          situation: 'Daily check-ins',
          good: "Morning, I've checked the schedule and I'm ready to start on the kitchen circuits. Should I begin with the ring main or the lighting circuit first?",
          tips: ['Be proactive', "Show you've prepared", 'Ask specific questions'],
        },
        {
          situation: 'Reporting problems',
          good: "I've found an issue with the cable run behind the kitchen units. There's a gas pipe in the way. I've stopped work and marked the area. What's the best alternative route?",
          tips: [
            'Stop work immediately',
            'Be specific about the problem',
            'Suggest solutions if possible',
          ],
        },
        {
          situation: 'Asking for help',
          good: 'I want to make sure I terminate this DB correctly. Could you check my work before I energise the circuit?',
          tips: [
            'Ask before making mistakes',
            'Show initiative',
            'Be specific about what you need',
          ],
        },
        {
          situation: 'Requesting time off or adjustments',
          good: "I have a college assessment on Thursday that I need to prepare for. Would it be possible to finish an hour early on Wednesday so I can revise? I'll make sure my current work is at a good stopping point.",
          tips: [
            'Give plenty of notice',
            'Show you have considered the impact on the job',
            'Offer solutions to cover the time',
          ],
        },
        {
          situation: 'End of day handover',
          good: "I've completed the first fix on rooms 3 and 4. Room 5 still needs back boxes chopping out. I've left the cable drums in the store and locked up. The drawings are on the table with my notes.",
          tips: ['Summarise what you did', 'Flag what is left to do', 'Mention anything unusual'],
        },
      ],
    },
    {
      title: 'With experienced colleagues',
      icon: Wrench,
      scenarios: [
        {
          situation: 'Learning techniques',
          good: "I've seen you do that cable termination really quickly. Could you show me your technique when you have a spare minute?",
          tips: [
            'Show respect for their experience',
            "Don't interrupt their work",
            'Be specific about what you want to learn',
          ],
        },
        {
          situation: 'Working as a team',
          good: "I'll start pulling the cables while you mark up the DB. Shall we meet back here in an hour to connect everything up?",
          tips: ['Coordinate your work', 'Be clear about timing', 'Confirm the plan'],
        },
        {
          situation: 'Sharing information',
          good: "Just so you know, the client mentioned they want an extra socket in the study. I've told them we'll discuss it with you first.",
          tips: [
            'Keep everyone informed',
            "Don't make promises you can't keep",
            'Be clear about what was said',
          ],
        },
        {
          situation: 'When you disagree',
          good: 'I understand why you would run it that way. I was taught a different method at college — would it be worth trying it this way to see if it works better here?',
          tips: [
            'Respect their experience',
            'Frame as a question not a challenge',
            'Be open to learning why their way works',
          ],
        },
      ],
    },
    {
      title: 'With clients and customers',
      icon: Shield,
      scenarios: [
        {
          situation: 'Explaining work',
          good: "We're installing a new consumer unit today, which is like the main control box for your electricity. It'll take about 4 hours and you'll be without power for 2 hours while we make the connections.",
          tips: ['Use simple language', 'Explain the impact on them', 'Give realistic timeframes'],
        },
        {
          situation: 'Dealing with concerns',
          good: "I understand you're worried about the dust. We'll lay dust sheets and use a vacuum as we work. Is there anything specific you'd like us to be extra careful with?",
          tips: [
            'Listen to their concerns',
            'Explain your precautions',
            'Ask about their priorities',
          ],
        },
        {
          situation: 'Changes to work',
          good: "We've found some old wiring that needs updating for safety. I'll need to discuss this with my supervisor and get back to you with options and costs.",
          tips: [
            "Don't make decisions beyond your authority",
            'Explain the safety implications',
            'Be clear about next steps',
          ],
        },
        {
          situation: 'Saying no politely',
          good: 'I understand you would like us to add sockets to the garage as well, but that was not included in the original quote. I can ask my supervisor to price it up for you — would that be helpful?',
          tips: [
            'Never do extra work without authorisation',
            'Be helpful but firm',
            'Offer the correct next step',
          ],
        },
      ],
    },
    {
      title: 'With other trades',
      icon: HardHat,
      scenarios: [
        {
          situation: 'Coordinating access',
          good: 'We need to get our first fix cables in before you plasterboard this section. Can we agree a time today so neither of us is waiting around?',
          tips: [
            'Plan ahead to avoid clashes',
            'Be flexible where possible',
            'Respect their schedule too',
          ],
        },
        {
          situation: 'Protecting your work',
          good: "Just a heads up — we've got cables running behind that stud wall. Can you check with us before you drill or nail into that section? I can mark the cable routes for you.",
          tips: [
            'Be polite but clear about safety risks',
            'Offer to help (marking routes, photos)',
            'Report damage immediately',
          ],
        },
        {
          situation: 'Resolving clashes',
          good: 'It looks like your pipework and our cable tray are both planned for the same route. Can we sit down with the drawings and work out who goes where? Maybe we can share the containment.',
          tips: [
            'Approach it as a shared problem',
            'Use the drawings as a reference',
            'Involve the site manager if needed',
          ],
        },
      ],
    },
    {
      title: 'With site managers',
      icon: Briefcase,
      scenarios: [
        {
          situation: 'Site inductions',
          good: 'Thank you for the induction. Could you clarify the emergency muster point and confirm where we can store our tools and materials overnight?',
          tips: [
            'Pay attention and ask questions',
            'Take notes on key information',
            'Know the emergency procedures',
          ],
        },
        {
          situation: 'Reporting delays',
          good: 'We are running behind on the lighting because the ceiling grid was not ready when we arrived. We have moved to another area to keep productive. We should be back on schedule by Thursday.',
          tips: [
            'Report early, not at the last minute',
            'Explain the cause clearly',
            'Show you have a plan to recover',
          ],
        },
        {
          situation: 'Raising safety concerns',
          good: 'I have noticed that the scaffold on level 2 does not have toe boards. Before we can work up there, could you arrange for the scaffolders to make it safe?',
          tips: [
            'Be specific about the hazard',
            'Reference the relevant regulation if you know it',
            'Do not work in unsafe conditions',
          ],
        },
      ],
    },
  ];

  const communicationChannels = [
    {
      method: 'Face-to-face',
      when: 'Complex instructions, safety issues, learning new skills, client discussions',
      pros: [
        'Clear understanding',
        'Immediate feedback',
        'Shows respect',
        'Best for sensitive topics',
      ],
    },
    {
      method: 'Radio / phone',
      when: 'Quick updates, coordination between areas, urgent issues',
      pros: ['Immediate contact', 'Efficient for simple messages', 'Works across large sites'],
    },
    {
      method: 'Text / WhatsApp',
      when: 'Non-urgent updates, sharing photos of work, material requests',
      pros: ['Record of communication', 'Can include images', 'No interruption', 'Evidence trail'],
    },
    {
      method: 'Written notes / reports',
      when: 'Handovers, detailed instructions, material lists, snagging',
      pros: [
        'Permanent record',
        'Can be referenced later',
        'Reduces errors',
        'Professional documentation',
      ],
    },
    {
      method: 'Email',
      when: 'Formal requests, quotes, confirming verbal agreements, complaints',
      pros: [
        'Formal record',
        'Timestamped evidence',
        'Can attach documents',
        'Suitable for office-based contacts',
      ],
    },
    {
      method: 'Site drawings and markups',
      when: 'Cable routes, accessory positions, distribution board layouts',
      pros: [
        'Visual clarity',
        'Avoids misunderstandings',
        'Reference for all trades',
        'Part of project record',
      ],
    },
  ];

  return (
    <div className="space-y-5">
      <Section eyebrow="Key workplace relationships">
        <div className="space-y-4">
          {communicationTypes.map((type, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <h3 className="text-[16px] sm:text-[18px] font-semibold text-white">{type.title}</h3>
              <div className="space-y-3">
                {type.scenarios.map((scenario, scenarioIndex) => (
                  <div
                    key={scenarioIndex}
                    className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-2"
                  >
                    <h4 className="text-[14px] text-white">{scenario.situation}</h4>
                    <p className="text-[14px] text-white/85 italic leading-relaxed">
                      &ldquo;{scenario.good}&rdquo;
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {scenario.tips.map((tip, tipIndex) => (
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

      <Section eyebrow="Communication methods and when to use them">
        <div className="space-y-2">
          {communicationChannels.map((channel, index) => (
            <div
              key={index}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[14px] text-white">{channel.method}</h4>
              <p className="text-[13px] text-white/70 leading-relaxed">{channel.when}</p>
              <ul className="space-y-1">
                {channel.pros.map((pro, proIndex) => (
                  <li
                    key={proIndex}
                    className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="First day on a new site"
        description="Starting on a new site can be nerve-wracking. Use this checklist on your first day."
      >
        <ol className="space-y-2">
          {[
            'Introduce yourself to the site manager and your direct supervisor',
            'Complete the site induction and sign the attendance register',
            'Ask where the welfare facilities are (toilets, canteen, drying room)',
            'Find out the emergency procedures and muster point location',
            'Ask where to store your tools and materials securely',
            'Get the Wi-Fi password and any site-specific app logins',
            'Ask about parking and access arrangements',
            'Find out the working hours and break times for this site',
            'Get phone numbers for your supervisor and the site office',
            'Ask if there are any site-specific safety rules (hot works permits, asbestos register, etc.)',
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-[14px] text-white/85 leading-relaxed"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-md border border-white/10 bg-white/[0.03] flex items-center justify-center text-[12px] font-mono">
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Useful phrases for site">
        <div className="space-y-2">
          {[
            {
              situation: 'When you do not understand',
              phrase: 'Could you explain that again? I want to make sure I get it right.',
            },
            {
              situation: 'When you need to say no',
              phrase: 'I am not comfortable doing that without checking with my supervisor first.',
            },
            {
              situation: 'When you have finished a task',
              phrase:
                'I have finished the sockets in room 2. What would you like me to move on to?',
            },
            {
              situation: 'When you spot a hazard',
              phrase:
                'Hold on, I have noticed something that does not look safe. Can we check this before we continue?',
            },
            {
              situation: 'When you need materials',
              phrase:
                'We are running low on 2.5mm twin and earth. We will need another drum before tomorrow.',
            },
            {
              situation: 'When handing over to someone else',
              phrase:
                'I have got as far as the second fix in room 3. The cables are all pulled in but not terminated. The drawings are on the table.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-1"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {item.situation}
              </span>
              <p className="text-[14px] text-white/85 italic leading-relaxed">
                &ldquo;{item.phrase}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default WorkplaceCommunicationTab;
