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

const ProfessionalSkillsTab = () => {
  const coreSkills = [
    {
      skill: 'Active listening',
      description: 'Understanding instructions and feedback completely.',
      techniques: [
        'Maintain eye contact when receiving instructions',
        "Don't interrupt — wait for the full explanation",
        'Repeat back important details to confirm understanding',
        'Ask questions if anything is unclear',
        'Take notes for complex procedures',
      ],
      practice:
        "Next time you receive instructions, try repeating the key points back: 'So you want me to install the sockets first, then run the lighting circuits, is that right?'",
    },
    {
      skill: 'Clear speaking',
      description: 'Expressing yourself clearly and professionally.',
      techniques: [
        'Speak at a steady pace — not too fast when nervous',
        'Use specific technical terms correctly',
        "Avoid filler words like 'um', 'like', 'you know'",
        'Structure your message: problem → impact → solution',
        'Speak loudly enough to be heard over site noise',
      ],
      practice:
        "Practise the 'SBI' model: Situation → Behaviour → Impact. 'In the kitchen (S), the cable run hits a beam (B), so we can't complete the circuit safely (I).'",
    },
    {
      skill: 'Body language',
      description: 'Professional non-verbal communication.',
      techniques: [
        'Stand or sit up straight — shows confidence and respect',
        'Make appropriate eye contact during conversations',
        'Keep your hands visible and avoid fidgeting',
        "Face the person you're speaking to",
        'Match your expression to the seriousness of the topic',
      ],
      practice:
        'Before important conversations, take a moment to check your posture and facial expression. Are you projecting confidence and professionalism?',
    },
    {
      skill: 'Written communication',
      description: 'Professional documentation and messages.',
      techniques: [
        'Use proper spelling and grammar in all written communication',
        'Be concise but include all necessary details',
        'Use bullet points for lists and complex information',
        'Include dates, times, and specific locations',
        'Proofread before sending',
      ],
      practice:
        'When writing work reports or messages, use this structure: What happened? When? Where? What action was taken? What happens next?',
    },
  ];

  const professionalLanguage = [
    {
      category: 'Asking for help',
      examples: [
        {
          poor: "I don't know how to do this",
          better: 'Could you show me the correct procedure for this?',
        },
        {
          poor: 'This is impossible',
          better: "I'm having difficulty with this — could you suggest an approach?",
        },
        {
          poor: "You didn't tell me that",
          better: 'I may have misunderstood — could you clarify this part?',
        },
      ],
    },
    {
      category: 'Reporting problems',
      examples: [
        { poor: 'This is all wrong', better: "I've identified an issue that needs attention" },
        {
          poor: "It's not working",
          better: "The circuit isn't functioning as expected — here's what I've observed",
        },
        {
          poor: 'Someone messed up',
          better: 'There appears to be a discrepancy with the original plan',
        },
      ],
    },
    {
      category: 'Making suggestions',
      examples: [
        {
          poor: 'You should do it this way',
          better: 'Would it work better if we tried this approach?',
        },
        { poor: "That's wrong", better: 'I wonder if there might be an alternative method?' },
        {
          poor: 'I know a better way',
          better: "I've seen this done differently — would that be appropriate here?",
        },
      ],
    },
    {
      category: 'Accepting feedback',
      examples: [
        {
          poor: "That's not fair, I did my best",
          better: 'Thanks for the feedback. What specifically should I do differently next time?',
        },
        {
          poor: "It wasn't my fault",
          better: 'I understand. Can you show me the correct way so I get it right next time?',
        },
        {
          poor: 'Nobody told me that',
          better:
            "I appreciate you pointing that out — I'll make a note so I remember for next time",
        },
      ],
    },
    {
      category: 'Giving progress updates',
      examples: [
        {
          poor: "I'm getting on with it",
          better: "I've completed the first fix in rooms 1 and 2, and I'm about to start room 3",
        },
        {
          poor: "It's taking ages",
          better:
            'The cable route is more complex than expected. I estimate another 2 hours to complete this section.',
        },
        {
          poor: "I'm nearly done",
          better:
            "I've got 3 more sockets to terminate and then I need about 30 minutes for testing",
        },
      ],
    },
    {
      category: 'When you do not know something',
      examples: [
        {
          poor: "I don't have a clue",
          better: "I haven't come across this before. Could you point me in the right direction?",
        },
        {
          poor: 'I just guessed',
          better:
            "I wasn't sure about this connection, so I've left it for you to check rather than risk getting it wrong",
        },
        {
          poor: 'Whatever, it will be fine',
          better: "I'd rather check the On-Site Guide than assume — give me 2 minutes",
        },
      ],
    },
  ];

  return (
    <div className="space-y-5">
      <Section eyebrow="Essential communication skills">
        <div className="space-y-3">
          {coreSkills.map((skill, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-3"
            >
              <div className="space-y-1">
                <h3 className="text-[16px] font-semibold text-white">{skill.skill}</h3>
                <p className="text-[13px] text-white/70 leading-relaxed">{skill.description}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Key techniques
                  </span>
                  <ul className="space-y-1">
                    {skill.techniques.map((technique, techIndex) => (
                      <li
                        key={techIndex}
                        className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                        <span>{technique}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Practice exercise
                  </span>
                  <p className="text-[13px] text-white/85 leading-relaxed">{skill.practice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Professional language examples">
        <div className="space-y-4">
          {professionalLanguage.map((category, index) => (
            <div key={index} className="space-y-3">
              <h3 className="text-[14px] text-white">{category.category}</h3>
              <div className="space-y-2">
                {category.examples.map((example, exampleIndex) => (
                  <div key={exampleIndex} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                        Avoid saying
                      </span>
                      <p className="text-[13px] text-white/85 italic leading-relaxed">
                        &ldquo;{example.poor}&rdquo;
                      </p>
                    </div>
                    <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                        Better approach
                      </span>
                      <p className="text-[13px] text-white/85 italic leading-relaxed">
                        &ldquo;{example.better}&rdquo;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Building communication confidence"
        description="Many apprentices feel nervous about speaking up on site. These strategies help build confidence over time."
      >
        <div className="space-y-2">
          {[
            {
              title: 'Start small',
              detail:
                'Begin with simple updates and questions. The more you speak up in low-stakes situations, the easier it becomes in high-pressure ones.',
            },
            {
              title: 'Prepare your points',
              detail:
                'Before meetings or conversations with your supervisor, think about what you want to say. Even a few seconds of mental preparation helps.',
            },
            {
              title: 'Use technical language correctly',
              detail:
                'Learning and using the correct terminology shows you are taking your training seriously. It earns respect from colleagues.',
            },
            {
              title: 'Ask questions freely',
              detail:
                'There is no such thing as a stupid question in a safety-critical trade. Experienced electricians respect apprentices who ask rather than guess.',
            },
            {
              title: 'Accept that mistakes happen',
              detail:
                'Everyone makes mistakes — what matters is how you handle them. Own it, fix it, learn from it. Your credibility grows each time you handle a mistake well.',
            },
            {
              title: 'Practise at college',
              detail:
                'Use college sessions to practise explaining technical concepts. Presenting to classmates in a safe environment builds confidence for site.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-1"
            >
              <h4 className="text-[14px] text-white">{item.title}</h4>
              <p className="text-[13px] text-white/70 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Communication at your AM2S assessment"
        description="The end-point assessment for the Installation and Maintenance Electrician standard is the integrated AM2S: a practical assessment of around 16.5 to 18.5 hours with an embedded online multiple-choice knowledge test. There is no separate professional discussion — but how you communicate with the assessor while you work still counts towards your grade."
      >
        <div className="space-y-3">
          <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              What the assessor looks for
            </span>
            <ul className="space-y-1.5">
              {[
                'Clear, accurate use of technical terminology as you explain what you are doing',
                'Ability to talk the assessor through your safe isolation and your method',
                'Professional behaviour and calm, courteous communication under assessment pressure',
                'Asking sensible questions to clarify the task rather than guessing',
                'Awareness of health and safety communication — signs, warnings, and reporting',
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              How to prepare
            </span>
            <ul className="space-y-1.5">
              {[
                'Rehearse explaining your safe isolation procedure out loud, step by step',
                'Practise narrating your method as you work, the way you would for the assessor',
                'Revise the knowledge areas of the standard for the embedded online multiple-choice test',
                'Run a mock AM2S task with your training provider and ask for feedback on your communication',
                'Record yourself talking through a wiring task and listen back for clarity',
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ProfessionalSkillsTab;
