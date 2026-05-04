interface Scenario {
  situation: string;
  approach: string;
  example: string;
  tips: string[];
}

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

const ScenarioBlock = ({ scenario }: { scenario: Scenario }) => (
  <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
    <h4 className="text-[14px] text-white">{scenario.situation}</h4>
    <div className="space-y-1">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        Approach
      </span>
      <p className="text-[14px] text-white/85 leading-relaxed">{scenario.approach}</p>
    </div>
    <div className="space-y-1">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        Example response
      </span>
      <p className="text-[14px] text-white/85 italic leading-relaxed">
        &ldquo;{scenario.example}&rdquo;
      </p>
    </div>
    <div className="flex flex-wrap gap-1.5">
      {scenario.tips.map((tip, tipIndex) => (
        <Pill key={tipIndex}>{tip}</Pill>
      ))}
    </div>
  </div>
);

const DifficultSituationsTab = () => {
  const difficultScenarios = [
    {
      category: 'Disagreements with supervisors',
      scenarios: [
        {
          situation: 'Your supervisor asks you to do something that seems unsafe',
          approach: 'Express your concerns professionally and ask for clarification.',
          example:
            "I want to make sure I understand this correctly. You'd like me to work on this circuit without isolation? Could you help me understand the safe procedure for this situation?",
          tips: [
            'Never ignore safety concerns',
            'Ask questions rather than refuse outright',
            'Document the conversation if needed',
          ],
        },
        {
          situation: 'You disagree with the chosen method or approach',
          approach: 'Present your perspective as a question or suggestion.',
          example:
            "I've seen this done differently before. Would it be worth considering running the cable via the alternative route to avoid the beam?",
          tips: [
            'Show respect for their experience',
            'Frame as learning opportunity',
            'Be open to their reasoning',
          ],
        },
        {
          situation: "You've made a mistake and need to report it",
          approach: 'Be honest immediately and focus on solutions.',
          example:
            "I need to let you know I've made an error with the cable termination. I've isolated the circuit and I'm ready to fix it. What's the best approach?",
          tips: [
            "Report immediately — don't try to hide it",
            'Take responsibility',
            'Have a solution ready if possible',
          ],
        },
      ],
    },
    {
      category: 'Challenging client interactions',
      scenarios: [
        {
          situation: 'Client questions your competence or age',
          approach: 'Stay professional and redirect to your supervisor if needed.',
          example:
            "I understand your concerns. I'm working under the supervision of [supervisor's name] who has [X] years experience. Would you like me to ask them to explain the work we're doing?",
          tips: [
            "Don't take it personally",
            "Use your supervisor's authority",
            'Focus on the work quality',
          ],
        },
        {
          situation: 'Client wants to change the work mid-project',
          approach: 'Acknowledge their request but explain the process.',
          example:
            "I can see why you'd want that additional socket there. I'll need to discuss this with my supervisor as it affects the circuit design and may need updated certification.",
          tips: [
            'Never agree to changes without supervisor approval',
            'Explain why approval is needed',
            'Be helpful but maintain boundaries',
          ],
        },
        {
          situation: 'Client is unhappy with disruption or mess',
          approach: 'Acknowledge their concerns and explain your precautions.',
          example:
            "I understand this is disruptive. We're using dust sheets and will clean up thoroughly. The power will be off for about 2 hours while we make the connections. Is there anything specific you're worried about?",
          tips: [
            'Show empathy for their situation',
            "Explain what you're doing to minimise impact",
            'Give realistic timeframes',
          ],
        },
      ],
    },
    {
      category: 'Workplace conflicts',
      scenarios: [
        {
          situation: "Colleague isn't pulling their weight",
          approach: 'Focus on work coordination rather than personal criticism.',
          example:
            "We need to coordinate our work better to meet the deadline. Could we agree on who's doing what sections by when?",
          tips: [
            'Focus on work outcomes, not personalities',
            'Suggest solutions, not just problems',
            'Involve supervisor if it affects safety or deadlines',
          ],
        },
        {
          situation: 'Someone takes credit for your work',
          approach: 'Address it directly but professionally.',
          example:
            "I'm glad the client liked the installation. I spent quite a bit of time planning that cable route — it's always satisfying when the extra effort pays off.",
          tips: [
            'Claim your contributions matter-of-factly',
            "Don't be aggressive or accusatory",
            'Document your contributions when appropriate',
          ],
        },
        {
          situation: 'You witness unsafe behaviour by a colleague',
          approach: "Address it immediately if there's immediate danger, then follow up properly.",
          example:
            "Hold on — that circuit's still live. Let me help you isolate it properly before we continue.",
          tips: [
            'Safety always comes first',
            'Speak up immediately for immediate dangers',
            'Report persistent unsafe behaviour to supervisor',
          ],
        },
      ],
    },
  ];

  const bullyingScenarios: Scenario[] = [
    {
      situation: 'Being belittled or laughed at for asking questions',
      approach:
        'Stay calm and remember that asking questions is essential in a safety-critical trade.',
      example:
        "I'd rather ask and get it right than guess and cause a problem. Could you show me the correct way?",
      tips: [
        'Asking questions shows professionalism, not weakness',
        'Document repeated incidents',
        'Speak to your supervisor or training provider',
      ],
    },
    {
      situation: 'Being given all the unpleasant jobs as "the apprentice"',
      approach:
        'Accept reasonable tasks but know the difference between learning and exploitation.',
      example:
        "I'm happy to help with site tidying, but I also need to get my practical experience signed off. Could we agree a balance between site tasks and electrical work?",
      tips: [
        'Apprentices should spend most time on electrical work',
        'Talk to your training provider if concerned',
        'Keep a log of your daily activities',
      ],
    },
    {
      situation: 'Someone pressures you to work unsafely',
      approach:
        'Never compromise on safety — you have the legal right to refuse unsafe work.',
      example:
        'I understand we are under time pressure, but I am not willing to work on this circuit without isolating it. If something goes wrong, it is me who gets hurt.',
      tips: [
        'Your safety is more important than any deadline',
        'You cannot be disciplined for refusing unsafe work',
        'Report it to your supervisor and training provider',
      ],
    },
    {
      situation: 'Experiencing discrimination or inappropriate comments',
      approach:
        'You do not have to tolerate discrimination of any kind — report it through the correct channels.',
      example:
        "That comment is not appropriate. I'd prefer if we kept things professional on site.",
      tips: [
        'You are protected by law under the Equality Act 2010',
        'Report to your supervisor, HR, or training provider',
        'Keep a written record of what was said, when, and who witnessed it',
      ],
    },
  ];

  const deEscalationTechniques = [
    {
      technique: 'Active listening',
      description: 'Really hear what the other person is saying.',
      steps: [
        'Give them your full attention',
        "Don't interrupt",
        "Repeat back what you've heard",
        'Ask clarifying questions',
      ],
    },
    {
      technique: 'Stay calm',
      description: 'Keep your emotions under control.',
      steps: [
        'Take deep breaths',
        'Lower your voice',
        'Keep body language open',
        'Pause before responding',
      ],
    },
    {
      technique: 'Find common ground',
      description: 'Look for shared goals or interests.',
      steps: [
        'Identify what you both want to achieve',
        'Focus on the work, not personalities',
        'Emphasise shared responsibilities',
        'Work towards solutions together',
      ],
    },
    {
      technique: 'Know when to escalate',
      description: 'Recognise when you need help.',
      steps: [
        'If safety is involved',
        "If you're out of your depth",
        'If emotions are running too high',
        'If the other person requests your supervisor',
      ],
    },
  ];

  const communicationDonts = [
    "Don't raise your voice or get aggressive",
    "Don't make it personal or use blame language",
    "Don't ignore the problem hoping it will go away",
    "Don't badmouth colleagues to clients",
    "Don't promise things you can't deliver",
    "Don't argue about company policies you can't change",
    "Don't discuss other people's personal matters",
    "Don't use technical jargon to confuse or intimidate",
  ];

  const helpResources = [
    {
      who: 'Your training provider',
      detail:
        'Your first port of call. They have a duty of care and can intervene with your employer if needed.',
    },
    {
      who: 'Your employer (HR / manager)',
      detail:
        'If the issue is with colleagues, your employer should have a grievance procedure you can follow.',
    },
    {
      who: 'ACAS (Advisory, Conciliation and Arbitration Service)',
      detail:
        'Free, impartial advice on workplace disputes. Call 0300 123 1100 or visit acas.org.uk.',
    },
    {
      who: 'Citizens Advice',
      detail:
        'Free advice on your employment rights, including apprenticeship rights. Visit citizensadvice.org.uk.',
    },
    {
      who: 'National Apprenticeship Helpline',
      detail:
        'Call 0800 015 0400 for advice and support with any apprenticeship-related issues.',
    },
    {
      who: 'Health and Safety Executive (HSE)',
      detail:
        'If you are being asked to work unsafely and your employer will not act, contact HSE. Call 0300 003 1647.',
    },
    {
      who: 'Unite the Union / GMB',
      detail:
        'Trade unions offer support and representation for construction workers, including apprentices.',
    },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">
        <p className="text-[14px] text-white/85 leading-relaxed">
          <span className="text-white">Remember:</span> Difficult situations are learning
          opportunities. Stay professional, focus on solutions, and don&rsquo;t hesitate to ask for
          help when needed.
        </p>
      </div>

      {difficultScenarios.map((category, index) => (
        <Section key={index} eyebrow={category.category}>
          <div className="space-y-3">
            {category.scenarios.map((scenario, scenarioIndex) => (
              <ScenarioBlock key={scenarioIndex} scenario={scenario} />
            ))}
          </div>
        </Section>
      ))}

      <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
          Bullying, harassment and pressure
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          Unfortunately, bullying and harassment still happen in construction. As an apprentice
          you may feel you cannot speak up. You can, and you should.
        </p>
        <div className="space-y-3">
          {bullyingScenarios.map((scenario, scenarioIndex) => (
            <ScenarioBlock key={scenarioIndex} scenario={scenario} />
          ))}
        </div>
      </div>

      <Section eyebrow="De-escalation techniques">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {deEscalationTechniques.map((technique, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
            >
              <h4 className="text-[14px] text-white">{technique.technique}</h4>
              <p className="text-[13px] text-white/70 leading-relaxed">{technique.description}</p>
              <ul className="space-y-1">
                {technique.steps.map((step, stepIndex) => (
                  <li
                    key={stepIndex}
                    className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="What not to do">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {communicationDonts.map((dont, index) => (
            <div
              key={index}
              className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>{dont}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Key principles">
        <div className="space-y-2">
          {[
            {
              title: 'Stay professional',
              body: 'Maintain respect and composure regardless of the situation. Even when others are being unprofessional, your calm response reflects well on you.',
            },
            {
              title: 'Focus on solutions',
              body: 'Look for ways to resolve issues rather than assigning blame. The question is always "How do we fix this?" not "Whose fault is it?"',
            },
            {
              title: 'Know your limits',
              body: 'Escalate to your supervisor when situations are beyond your experience. There is no shame in saying "This is above my level — I need to involve someone more senior."',
            },
            {
              title: 'Document everything',
              body: 'Keep a written record of difficult incidents — dates, times, what was said, and who witnessed it. This protects you and helps if the issue needs escalating.',
            },
          ].map((p, idx) => (
            <div
              key={idx}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-1"
            >
              <h4 className="text-[14px] text-white">{p.title}</h4>
              <p className="text-[14px] text-white/85 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Where to get help"
        description="If you are struggling with a difficult situation on site, these people and organisations can help."
      >
        <div className="space-y-2">
          {helpResources.map((item, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-1"
            >
              <p className="text-[14px] text-white">{item.who}</p>
              <p className="text-[13px] text-white/70 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default DifficultSituationsTab;
