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

const InteractiveToolsTab = () => {
  const communicationFrameworks = [
    {
      title: 'STAR method for reporting',
      description: 'Structure your incident reports and project updates professionally.',
      components: ['Situation', 'Task', 'Action', 'Result'],
      example:
        'Situation: Found loose connection in consumer unit. Task: Needed to report safely. Action: Isolated supply, documented with photos. Result: Senior electrician praised thorough documentation.',
    },
    {
      title: 'CLEAR communication',
      description: 'Ensure your messages are understood first time.',
      components: ['Concise', 'Logical', 'Engaging', 'Actionable', 'Respectful'],
      example:
        "Instead of 'The thing is broken', say 'The 32A MCB on the kitchen ring final is tripping. I've checked for obvious faults but need guidance on next steps.'",
    },
    {
      title: 'Listen-understand-respond',
      description: 'Active listening framework for difficult conversations.',
      components: ['Listen fully', 'Understand context', 'Respond appropriately'],
      example:
        'When a client complains about delays, listen to their concerns, understand their perspective, then respond with solutions and realistic timelines.',
    },
  ];

  const practiceScenarios = [
    {
      title: 'Asking for help from a senior electrician',
      situation: "You're stuck on a complex three-phase installation and need guidance.",
      tips: [
        "Be specific about what you've already tried",
        'Show your working and thought process',
        "Ask at an appropriate time when they're not busy",
        'Take notes and follow up with what you learned',
      ],
      example:
        "I'm working on the three-phase board in the workshop. I've identified L1, L2, L3 and the neutral, but I'm unsure about the earth arrangements for the SWA. Could you spare 5 minutes to check my understanding?",
    },
    {
      title: 'Dealing with an impatient client',
      situation: 'A homeowner is frustrated about work taking longer than expected.',
      tips: [
        'Acknowledge their frustration first',
        'Explain the reason for delays in simple terms',
        'Give realistic timelines with buffer',
        'Keep them updated regularly',
      ],
      example:
        "I understand this is frustrating, and I apologise for the delay. The reason it's taking longer is that we discovered the earthing needs upgrading for safety. This will add about 2 hours, but it's essential for your family's safety.",
    },
    {
      title: 'Reporting a safety concern',
      situation:
        'You notice unsafe working conditions but need to speak up to senior staff.',
      tips: [
        "Use 'I' statements to avoid blame",
        'Focus on the safety risk, not personalities',
        'Suggest solutions where possible',
        'Document the conversation',
      ],
      example:
        "I've noticed the temporary supply cable is running across the walkway without protection. I'm concerned someone could trip or damage it. Could we run it overhead or add cable protectors?",
    },
    {
      title: 'Team meeting participation',
      situation:
        'Weekly site meeting where you need to contribute and ask questions.',
      tips: [
        'Prepare your points beforehand',
        'Ask questions for clarification, not to show off',
        'Speak clearly and at appropriate volume',
        'Take notes and follow through on actions',
      ],
      example:
        "From yesterday's work on the office lighting, I completed circuits 1-4. I need clarification on the emergency lighting requirements for circuits 5-6 before I continue.",
    },
  ];

  const communicationTips = [
    {
      category: 'Phone conversations',
      tips: [
        'Always state your name and company when answering',
        'Keep a pen and paper handy for notes',
        'Repeat back important information to confirm',
        'End with a clear summary of next steps',
      ],
    },
    {
      category: 'Face-to-face interactions',
      tips: [
        'Make appropriate eye contact',
        'Use open body language',
        "Match the other person's communication style",
        'Be aware of personal space and cultural differences',
      ],
    },
    {
      category: 'Written communication',
      tips: [
        'Use proper spelling and grammar in all written communication',
        'Structure emails with clear subject lines',
        'Use bullet points for multiple items',
        'Always proofread before sending',
      ],
    },
    {
      category: 'Time-sensitive communication',
      tips: [
        'Prioritise urgent safety issues',
        'Use appropriate channels (call for urgent, email for non-urgent)',
        'Set clear expectations about response times',
        'Follow up appropriately without being pushy',
      ],
    },
  ];

  const difficultConversationTips = [
    {
      title: "When you've made a mistake",
      approach: 'Own it early, explain briefly, focus on solutions.',
      example:
        "I've made an error with the lighting circuit connections. I've isolated the supply for safety. Can you help me understand the correct method so I can fix it properly?",
    },
    {
      title: "When you don't understand instructions",
      approach: 'Ask specific questions, request demonstrations, confirm understanding.',
      example:
        'I want to make sure I understand the termination method correctly. Could you show me the first connection so I can follow the same approach for the rest?',
    },
    {
      title: 'When dealing with workplace conflict',
      approach: 'Stay professional, focus on work impact, seek supervisor guidance.',
      example:
        "I'm having difficulty getting the information I need to complete my work. Could we discuss the best way to coordinate between our teams?",
    },
    {
      title: 'When you need to chase someone',
      approach: 'Be polite but direct, reference what was agreed, offer alternatives.',
      example:
        "Hi, just following up on the cable order we discussed on Monday. I need those drums by Wednesday to stay on programme. Is there anything I can do to help speed things up?",
    },
    {
      title: 'When a client questions your work',
      approach: 'Stay calm, explain your reasoning, offer to involve your supervisor.',
      example:
        "I understand your concern. This cable route follows the safe zones required by the wiring regulations. I can ask my supervisor to explain the technical reasons if you would like.",
    },
  ];

  const messageTemplates = [
    {
      title: 'Daily progress text to supervisor',
      template:
        'Hi [Name], update for today: Completed first fix in rooms 4-6 (32 points). Tomorrow I will start room 7. Need more 1.5mm T+E — can you order 2 drums? Finished at 4:30, site locked up.',
    },
    {
      title: 'Material request',
      template:
        'Hi [Name], we need the following for [site name] by [day]: 2x drums 2.5mm T+E, 1x drum 1.5mm T+E, 20x 25mm back boxes, 10x double socket fronts (white). Job ref: [number]. Thanks.',
    },
    {
      title: 'Reporting an issue',
      template:
        'Hi [Name], reporting an issue on [site]. Found [describe problem] in [location]. I have [action taken — isolated, marked, stopped work]. Please advise on next steps. Photos attached.',
    },
    {
      title: 'Confirming a verbal agreement',
      template:
        'Hi [Name], just to confirm what we discussed: [summary of agreement]. If I have misunderstood anything, please let me know. Otherwise I will proceed on this basis. Thanks.',
    },
  ];

  const tradeCoordination = [
    {
      trade: 'Plasterers',
      tip: 'Coordinate first fix timing — your cables must be in and capped before they plasterboard or skim. Give them 24 hours notice before you need access.',
    },
    {
      trade: 'Plumbers / gas engineers',
      tip: 'Share cable and pipe routes early to avoid clashes. If you find a gas pipe in your cable route, stop and discuss — never drill near gas pipes.',
    },
    {
      trade: 'Joiners / carpenters',
      tip: 'Let them know where cables run in timber frames. Mark cable routes clearly so they do not drill or nail through your cables.',
    },
    {
      trade: 'Painters / decorators',
      tip: 'Give them enough notice before second fix — you need the painting finished before you fit socket fronts and switch plates.',
    },
    {
      trade: 'General builders',
      tip: 'Coordinate builders work (chases, holes, openings) as early as possible. It is much harder and more expensive to cut holes after plastering.',
    },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Communication frameworks and practical tips
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Master proven communication frameworks and get practical tips for real workplace
          scenarios. These tools will help you communicate more effectively with colleagues,
          supervisors, and clients.
        </p>
      </div>

      <Section eyebrow="Communication frameworks">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {communicationFrameworks.map((framework, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[14px] text-white">{framework.title}</h4>
              <p className="text-[13px] text-white/70 leading-relaxed">{framework.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {framework.components.map((c, idx) => (
                  <Pill key={idx}>{c}</Pill>
                ))}
              </div>
              <p className="text-[13px] text-white/85 italic leading-relaxed">
                <span className="text-white/55 not-italic">Example: </span>
                {framework.example}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Practice scenarios">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {practiceScenarios.map((scenario, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[14px] text-white">{scenario.title}</h4>
              <p className="text-[13px] text-white/70 leading-relaxed">{scenario.situation}</p>
              <ul className="space-y-1">
                {scenario.tips.map((tip, tipIdx) => (
                  <li
                    key={tipIdx}
                    className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[13px] text-white/85 italic leading-relaxed">
                <span className="text-white/55 not-italic">Example: </span>
                &ldquo;{scenario.example}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Communication tips by situation">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {communicationTips.map((category, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[14px] text-white">{category.category}</h4>
              <ul className="space-y-1">
                {category.tips.map((tip, tipIdx) => (
                  <li
                    key={tipIdx}
                    className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Handling difficult conversations">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {difficultConversationTips.map((tip, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[14px] text-white">{tip.title}</h4>
              <p className="text-[13px] text-white/85 leading-relaxed">
                <span className="text-white/55">Approach: </span>
                {tip.approach}
              </p>
              <p className="text-[13px] text-white/85 italic leading-relaxed">
                <span className="text-white/55 not-italic">Example: </span>
                &ldquo;{tip.example}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Ready-made message templates"
        description="Copy and adapt these templates for common workplace messages. Good written communication saves time and prevents misunderstandings."
      >
        <div className="space-y-2">
          {messageTemplates.map((template, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[14px] text-white">{template.title}</h4>
              <p className="text-[13px] text-white/85 font-mono leading-relaxed">
                {template.template}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Working with other trades"
        description="On larger sites you will work alongside multiple trades. Clear communication prevents costly mistakes and delays."
      >
        <div className="space-y-2">
          {tradeCoordination.map((item, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-1"
            >
              <p className="text-[14px] text-white">{item.trade}</p>
              <p className="text-[13px] text-white/70 leading-relaxed">{item.tip}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Practice makes perfect">
        <p className="text-[14px] text-white/85 leading-relaxed">
          Effective communication is a skill that improves with practice. Start by focusing on one
          framework or tip at a time. Use these scenarios to practice with colleagues, friends, or
          even in front of a mirror. The more you practice professional communication, the more
          natural it becomes in real situations.
        </p>
        <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="text-[13px] text-white/85 leading-relaxed">
            <span className="text-white">Weekly challenge: </span>
            Pick one communication skill from this guide each week and consciously practise it on
            site. After a month, you will notice a real difference in how people respond to you
            and how confident you feel.
          </p>
        </div>
      </Section>
    </div>
  );
};

export default InteractiveToolsTab;
