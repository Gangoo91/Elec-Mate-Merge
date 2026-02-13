// ============================================================
// SITUATION-BASED SECTIONS — Supervisor Knowledge Data
// All content reorganised from abstract categories into
// situation-based sections that match how apprentices think on site.
// ============================================================

// ============================================================
// TYPE DEFINITIONS
// ============================================================

export interface Question {
  id: string;
  question: string;
  answer: string;
  tags: string[];
  priority: 'critical' | 'important' | 'helpful';
  section: string;
}

export interface Scenario {
  id: string;
  title: string;
  situation: string;
  options: { text: string; isCorrect: boolean; feedback: string }[];
  explanation: string;
  section: string;
}

export interface CommunicationScript {
  id: string;
  situation: string;
  poor: string;
  better: string;
  best: string;
  section: string;
}

export interface ContactResource {
  id: string;
  name: string;
  description: string;
  phone?: string;
  website?: string;
  category: 'emergency' | 'professional' | 'training' | 'support';
  availability?: string;
  cost?: string;
}

export interface Section {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  colour: string;
  questionCount: number;
  scenarioCount: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  section: string;
}

export interface RelationshipActivity {
  id: string;
  title: string;
  description: string;
  category: 'daily' | 'weekly' | 'monthly';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeRequired: string;
  steps: string[];
  benefits: string[];
  tips: string[];
  section: string;
}

export interface DifficultConversation {
  id: string;
  scenario: string;
  challenge: string;
  approach: string;
  script: string;
  followUp: string[];
  section: string;
}

export interface SiteKnowledgeTopic {
  id: string;
  title: string;
  icon: string;
  items: string[];
  section: string;
}

export interface SiteScenario {
  id: string;
  scenario: string;
  guidance: string;
  urgency: 'high' | 'medium' | 'standard';
  section: string;
}

export interface SiteContact {
  id: string;
  role: string;
  when: string;
  approach: string;
  section: string;
}

// ============================================================
// SECTIONS
// ============================================================

export const sections: Section[] = [
  {
    id: 'emergency',
    title: 'Emergency \u2014 Act Now',
    subtitle: 'Critical safety info and emergency contacts',
    icon: 'AlertTriangle',
    colour: 'red',
    questionCount: 5,
    scenarioCount: 1,
  },
  {
    id: 'first-day',
    title: 'First Day on a New Site',
    subtitle: 'Inductions, PPE, finding your feet',
    icon: 'HardHat',
    colour: 'blue',
    questionCount: 5,
    scenarioCount: 1,
  },
  {
    id: 'when-things-go-wrong',
    title: 'When Things Go Wrong',
    subtitle: 'Mistakes, safety issues, reporting problems',
    icon: 'ShieldAlert',
    colour: 'amber',
    questionCount: 8,
    scenarioCount: 2,
  },
  {
    id: 'difficult-people',
    title: 'Dealing with Difficult People',
    subtitle: 'Conflict, criticism, workplace banter',
    icon: 'Users',
    colour: 'purple',
    questionCount: 6,
    scenarioCount: 0,
  },
  {
    id: 'your-rights',
    title: 'Your Rights at Work',
    subtitle: 'Pay, hours, scope of work, support',
    icon: 'Scale',
    colour: 'green',
    questionCount: 6,
    scenarioCount: 0,
  },
  {
    id: 'building-career',
    title: 'Building Your Career',
    subtitle: 'Learning, development, professional growth',
    icon: 'TrendingUp',
    colour: 'cyan',
    questionCount: 8,
    scenarioCount: 2,
  },
];

// ============================================================
// QUESTIONS (33 total, redistributed into 6 sections)
// ============================================================

export const questions: Question[] = [
  // -------------------------------------------------------
  // EMERGENCY section (5 questions)
  // -------------------------------------------------------
  {
    id: 'emergency-001',
    question: 'What should I do if someone gets an electric shock?',
    answer:
      'DO NOT touch them if they are still in contact with electricity. Turn off the power at the source if possible. If you cannot, use a non-conductive item to separate them from the source. Call 999 immediately. Start CPR if trained and they are not breathing. Get the first aider and defibrillator if available.',
    tags: ['electric shock', 'first aid', 'emergency'],
    priority: 'critical',
    section: 'emergency',
  },
  {
    id: 'emergency-002',
    question: 'What should I do if I cause a fire with electrical equipment?',
    answer:
      'Turn off the power if safe to do so. Raise the alarm immediately. Use a CO2 fire extinguisher for electrical fires \u2014 never use water. Evacuate the area if the fire is spreading. Call 999 and report to the site manager immediately.',
    tags: ['fire', 'electrical fire', 'evacuation'],
    priority: 'critical',
    section: 'emergency',
  },
  {
    id: 'emergency-003',
    question: 'What if I am injured at work?',
    answer:
      'Seek immediate medical attention if serious. Report the injury to your supervisor immediately. Ensure it is recorded in the accident book. Take photos if appropriate. Contact your training provider as soon as possible. Do not sign anything without understanding it fully.',
    tags: ['injury', 'accident book', 'reporting'],
    priority: 'critical',
    section: 'emergency',
  },
  {
    id: 'emergency-004',
    question: 'What should I do if I witness an unsafe practice on site?',
    answer:
      'First, ensure your own safety. If it is immediately dangerous, intervene if safe to do so. Document what you saw (date, time, people involved, what happened). Report it to your supervisor, and if they do not act, escalate to the site manager or your training provider. You have a legal duty to report unsafe practices.',
    tags: ['unsafe practices', 'reporting', 'whistleblowing'],
    priority: 'critical',
    section: 'emergency',
  },
  {
    id: 'emergency-005',
    question:
      'I have noticed a safety hazard but my supervisor seems busy and stressed. Should I wait?',
    answer:
      "Never wait to report a safety concern regardless of your supervisor's mood or workload. Safety always takes priority over timing or social considerations. Approach them directly and state the concern clearly and factually. If they are genuinely unavailable, go to the site safety officer or site manager. A few seconds of awkwardness is nothing compared to a potential accident.",
    tags: ['safety concern', 'supervisor busy', 'reporting'],
    priority: 'critical',
    section: 'emergency',
  },

  // -------------------------------------------------------
  // FIRST DAY section (5 questions)
  // -------------------------------------------------------
  {
    id: 'first-day-001',
    question: 'What should I expect and bring on my first day at a new construction site?',
    answer:
      'Report to the main office and present your CSCS card and any required certifications. Attend the mandatory site induction. Bring your own PPE (hard hat, high-vis, safety boots, gloves, eye protection) unless the site provides them. Bring your tool kit, a notepad, and your apprenticeship logbook. Ask about welfare facilities, tool storage, and emergency procedures. Get introduced to your supervisor and immediate team.',
    tags: ['site induction', 'CSCS card', 'first day', 'PPE'],
    priority: 'important',
    section: 'first-day',
  },
  {
    id: 'first-day-002',
    question: 'How do I know if the tools I am given are safe to use?',
    answer:
      'Always inspect tools before use. Check for damage to cables, plugs, casings, and guards. Ensure PAT testing is current (look for valid test labels). If in doubt, do not use it \u2014 ask for a replacement. Report any damaged tools immediately and take them out of service.',
    tags: ['tool safety', 'PAT testing', 'inspection'],
    priority: 'critical',
    section: 'first-day',
  },
  {
    id: 'first-day-003',
    question: 'Who should I contact on site and when? What is the site hierarchy?',
    answer:
      'Your electrical supervisor is your primary point of contact for technical questions, work allocation, and electrical safety concerns \u2014 daily check-ins are encouraged. The site manager handles overall site issues, major problems, and disputes between trades \u2014 approach formally and document issues beforehand. The health and safety officer handles safety incidents, PPE issues, and hazard reporting \u2014 contact them immediately for urgent safety matters. Stores and materials staff handle material shortages, tool requirements, and deliveries \u2014 follow requisition procedures and give advance notice.',
    tags: ['site hierarchy', 'contacts', 'communication'],
    priority: 'important',
    section: 'first-day',
  },
  {
    id: 'first-day-004',
    question: 'How do I communicate with other trades on site?',
    answer:
      'Be respectful and professional. Introduce yourself and your role. Coordinate work to avoid conflicts. Communicate any issues that affect their work early. Use clear, simple language and confirm understanding. Remember, you represent the electrical trade.',
    tags: ['other trades', 'coordination', 'professionalism'],
    priority: 'important',
    section: 'first-day',
  },
  {
    id: 'first-day-005',
    question: 'What are the daily routines I should follow on a construction site?',
    answer:
      'Arrive a few minutes early to prepare for the day. Attend morning briefings and toolbox talks. Confirm your understanding of assigned tasks and ask about any safety considerations. Record your time accurately. Follow material ordering and waste management procedures. At the end of the day, follow site security procedures, secure your tools, and leave the work area tidy.',
    tags: ['daily routine', 'toolbox talks', 'site procedures'],
    priority: 'important',
    section: 'first-day',
  },

  // -------------------------------------------------------
  // WHEN THINGS GO WRONG section (8 questions)
  // -------------------------------------------------------
  {
    id: 'wrong-001',
    question: 'What should I do if I make a mistake that could affect safety?',
    answer:
      'Report it immediately to your supervisor \u2014 honesty is crucial for safety. Do not try to hide or fix it secretly. Explain what happened, what you have learned, and how you will prevent it in future. Most supervisors appreciate honesty and will use it as a learning opportunity.',
    tags: ['mistakes', 'honesty', 'learning'],
    priority: 'critical',
    section: 'when-things-go-wrong',
  },
  {
    id: 'wrong-002',
    question:
      'What should I do if I am asked to work on a circuit that has not been properly isolated?',
    answer:
      'Never work on a live circuit. Politely explain that you need to follow safe isolation procedures first. Use the proper isolation sequence: identify the circuit, isolate it, secure the isolation, test the circuit is dead with a voltage tester, and then test the voltage tester on a known live source. If your supervisor pressures you to skip safety procedures, escalate to your training provider or HSE.',
    tags: ['isolation', 'live working', 'safety procedures'],
    priority: 'critical',
    section: 'when-things-go-wrong',
  },
  {
    id: 'wrong-003',
    question: 'What if I discover existing work that does not meet current standards?',
    answer:
      'Do not alter existing work without permission. Document what you have found and report it to your supervisor. They will decide whether it needs upgrading or just noting. Take photos if appropriate and keep records.',
    tags: ['existing work', 'standards', 'documentation'],
    priority: 'important',
    section: 'when-things-go-wrong',
  },
  {
    id: 'wrong-004',
    question: 'Another trade has damaged my cable run. What should I do?',
    answer:
      'Document the damage with photos and note the date and time. Inform your supervisor immediately. Do not attempt repairs without authorisation. Complete an incident report if required. Your supervisor will coordinate with the other trade and decide on the best course of action.',
    tags: ['cable damage', 'other trades', 'incident report'],
    priority: 'important',
    section: 'when-things-go-wrong',
  },
  {
    id: 'wrong-005',
    question: 'How should I report problems to my supervisor?',
    answer:
      "Be direct, factual, and solution-focused. State what the problem is, when you discovered it, and what impact it may have. If possible, suggest a solution. For example: 'I have identified a potential safety hazard in the meter room \u2014 the incoming supply appears to have damaged insulation.' Report immediately and do not wait for a convenient time if safety is involved.",
    tags: ['reporting', 'communication', 'problem-solving'],
    priority: 'important',
    section: 'when-things-go-wrong',
  },
  {
    id: 'wrong-006',
    question: 'What should I do if a job is taking much longer than expected?',
    answer:
      "Communicate early with your supervisor. Explain what is causing the delay and ask for guidance: 'This is taking longer than expected because of X. Should I continue with this approach or is there a better way?' Do not struggle in silence.",
    tags: ['delays', 'communication', 'efficiency'],
    priority: 'important',
    section: 'when-things-go-wrong',
  },
  {
    id: 'wrong-007',
    question: 'What should I do if my supervisor gives me conflicting instructions?',
    answer:
      "Clarify politely: 'Yesterday you mentioned X, but today you are saying Y. Can you help me understand which approach you would prefer?' If it is about safety or regulations, ask for clarification in writing or involve another qualified person.",
    tags: ['conflicting instructions', 'clarification'],
    priority: 'important',
    section: 'when-things-go-wrong',
  },
  {
    id: 'wrong-008',
    question:
      'What should I do if I am asked to install something that does not seem to comply with BS 7671?',
    answer:
      "Politely question it: 'I want to make sure I understand the regulations correctly. Can you help me see how this complies with BS 7671?' Show the relevant regulation. If still unsure, ask to check with another qualified person or your training provider before proceeding.",
    tags: ['BS 7671', 'compliance', 'regulations'],
    priority: 'critical',
    section: 'when-things-go-wrong',
  },

  // -------------------------------------------------------
  // DIFFICULT PEOPLE section (6 questions)
  // -------------------------------------------------------
  {
    id: 'difficult-001',
    question: 'My supervisor does not wear PPE consistently. Should I still wear mine?',
    answer:
      'Absolutely, always wear your required PPE regardless of what others do. You have a duty of care to yourself. If safety standards are not being followed consistently on site, document this and report it to your training provider. Lead by example and do not compromise on safety.',
    tags: ['PPE', 'safety culture', 'personal responsibility'],
    priority: 'critical',
    section: 'difficult-people',
  },
  {
    id: 'difficult-002',
    question: 'How do I handle workplace banter that makes me uncomfortable?',
    answer:
      "Set boundaries politely but firmly: 'I am not comfortable with that kind of talk' or 'Let us keep it professional.' If it continues, document it and speak to your supervisor or training provider. You have the right to a respectful workplace.",
    tags: ['banter', 'harassment', 'boundaries'],
    priority: 'critical',
    section: 'difficult-people',
  },
  {
    id: 'difficult-003',
    question: 'How do I handle criticism from my supervisor?',
    answer:
      "Listen without getting defensive. Ask clarifying questions: 'What specifically should I do differently?' Take notes and ask for examples of the correct way. Thank them for the feedback and follow up later to show you have implemented their suggestions.",
    tags: ['criticism', 'feedback', 'improvement'],
    priority: 'important',
    section: 'difficult-people',
  },
  {
    id: 'difficult-004',
    question: "What if I disagree with my supervisor's approach to a task?",
    answer:
      "Approach it as a learning opportunity: 'I was taught to do it this way. Can you explain the advantages of your method?' or 'Is there a specific reason we are doing it this way on this site?' Be open to learning different approaches while ensuring safety is not compromised.",
    tags: ['disagreement', 'different methods', 'learning'],
    priority: 'important',
    section: 'difficult-people',
  },
  {
    id: 'difficult-005',
    question: 'How do I handle being the only apprentice or youngest person on site?',
    answer:
      "Focus on being professional, punctual, and eager to learn. Do not try to prove yourself by taking unnecessary risks. Build relationships gradually through competent work. Ask questions and show respect for experienced workers' knowledge.",
    tags: ['isolation', 'age', 'relationships'],
    priority: 'important',
    section: 'difficult-people',
  },
  {
    id: 'difficult-006',
    question: 'How do I ask questions without annoying my supervisor?',
    answer:
      "Time your questions appropriately \u2014 not when they are dealing with urgent issues. Group related questions together. Show you have tried to find the answer first: 'I checked the regs but want to confirm my understanding...' Always thank them for their time and follow up on what you learned.",
    tags: ['questioning', 'timing', 'respect'],
    priority: 'important',
    section: 'difficult-people',
  },

  // -------------------------------------------------------
  // YOUR RIGHTS section (6 questions)
  // -------------------------------------------------------
  {
    id: 'rights-001',
    question: 'What should I do if I am being asked to do tasks outside my scope of work?',
    answer:
      "Politely explain your limitations: 'I am only qualified to work on X as an apprentice. I would be happy to help with Y once I am qualified.' If pressured, contact your training provider. Keep a record of such requests and your responses.",
    tags: ['scope of work', 'limitations', 'training provider'],
    priority: 'critical',
    section: 'your-rights',
  },
  {
    id: 'rights-002',
    question: 'What should I do if I am not being paid correctly or on time?',
    answer:
      'Keep records of your hours worked and pay received. Check your contract for pay rates and payment terms. Raise it with your supervisor first, then your training provider if not resolved. You may need to contact ACAS if the issue persists.',
    tags: ['pay', 'contract', 'ACAS'],
    priority: 'critical',
    section: 'your-rights',
  },
  {
    id: 'rights-003',
    question: 'What if I am not getting enough learning opportunities?',
    answer:
      "Discuss with your supervisor: 'I am keen to learn more about X. Are there opportunities for me to get involved?' Suggest specific areas you want to develop. If this does not improve things, discuss with your training provider during your next review.",
    tags: ['learning opportunities', 'development', 'training'],
    priority: 'important',
    section: 'your-rights',
  },
  {
    id: 'rights-004',
    question: 'How do I handle working in difficult conditions (cramped spaces, heights, etc.)?',
    answer:
      'Assess the risks and discuss with your supervisor. Ensure you have appropriate training and equipment. Take regular breaks and stay hydrated. Speak up if you feel unsafe \u2014 your safety is more important than completing the task quickly.',
    tags: ['difficult conditions', 'risk assessment', 'safety'],
    priority: 'critical',
    section: 'your-rights',
  },
  {
    id: 'rights-005',
    question: 'What should I do if I am not provided with the right tools for the job?',
    answer:
      "Never compromise on safety by using inappropriate tools. Explain to your supervisor: 'I need X tool to do this job safely. What is the best way to get it?' If told to 'make do', explain the safety risks and document the conversation.",
    tags: ['appropriate tools', 'safety', 'equipment'],
    priority: 'critical',
    section: 'your-rights',
  },
  {
    id: 'rights-006',
    question: 'How do I request time off from work?',
    answer:
      "Give as much notice as possible and make your request professionally. Explain the reason briefly: 'I would like to request annual leave for [dates] for a family commitment.' Offer to ensure all current tasks are completed beforehand and to brief a colleague on any ongoing work. Confirm arrangements in writing and be flexible where possible.",
    tags: ['time off', 'annual leave', 'professionalism'],
    priority: 'helpful',
    section: 'your-rights',
  },

  // -------------------------------------------------------
  // BUILDING CAREER section (8 questions)
  // -------------------------------------------------------
  {
    id: 'career-001',
    question:
      'I am not sure about the cable size calculation my supervisor gave me. How should I approach this?',
    answer:
      "Ask your supervisor to walk through the calculation with you. Bring your regulations book and show the sections you are referencing. Ask questions like 'Can you help me understand how you got this current rating?' or 'Which derating factors did you apply here?' This shows you are engaged and want to learn properly.",
    tags: ['calculations', 'cable sizing', 'learning'],
    priority: 'important',
    section: 'building-career',
  },
  {
    id: 'career-002',
    question: 'How do I ask for help with testing procedures without seeming incompetent?',
    answer:
      "Frame it as wanting to learn proper procedure: 'I want to make sure I am doing this test correctly. Can you walk me through your process?' or 'I have done this before but want to make sure I am following your site procedures.' Most supervisors appreciate apprentices who want to do things right.",
    tags: ['testing', 'learning', 'procedures'],
    priority: 'important',
    section: 'building-career',
  },
  {
    id: 'career-003',
    question: 'What if I am asked to work on a system I have never seen before?',
    answer:
      "Be honest about your experience level: 'I have not worked on this type of system before. Can you show me the basics and let me observe first?' Ask for relevant documentation or drawings. Take notes and ask questions throughout the process.",
    tags: ['new systems', 'learning', 'documentation'],
    priority: 'important',
    section: 'building-career',
  },
  {
    id: 'career-004',
    question: 'How do I know when I am ready to work independently on a task?',
    answer:
      "You should be able to explain the task, identify the hazards, know the safety procedures, understand the regulations involved, and have successfully completed similar tasks under supervision. Ask your supervisor: 'Do you think I am ready to do this independently?' and discuss any concerns.",
    tags: ['independence', 'competency', 'supervision'],
    priority: 'important',
    section: 'building-career',
  },
  {
    id: 'career-005',
    question: 'How do I know if my test equipment is working correctly?',
    answer:
      'Check calibration certificates are current. Test your tester on a known live source before and after use. Look for any physical damage. If readings seem wrong, stop and get it checked. Never trust test results from faulty equipment.',
    tags: ['test equipment', 'calibration', 'proving'],
    priority: 'critical',
    section: 'building-career',
  },
  {
    id: 'career-006',
    question: 'What if I damage a tool or piece of equipment?',
    answer:
      'Report it immediately to your supervisor. Do not try to hide it or continue using damaged equipment. Explain how it happened and what you have learned. Take responsibility and offer to replace it if it was due to misuse.',
    tags: ['damage', 'responsibility', 'honesty'],
    priority: 'important',
    section: 'building-career',
  },
  {
    id: 'career-007',
    question: 'How do I stay current with regulation changes?',
    answer:
      'Subscribe to IET updates, follow relevant industry publications, attend CPD events, and discuss changes with your supervisor and training provider. Keep your regulations book updated and make notes about amendments as you learn about them.',
    tags: ['updates', 'CPD', 'IET'],
    priority: 'helpful',
    section: 'building-career',
  },
  {
    id: 'career-008',
    question: 'What if local building control has different requirements?',
    answer:
      'Building regulations take precedence over BS 7671 where they conflict. Always check local requirements and discuss any conflicts with your supervisor. When in doubt, follow the more stringent requirement or contact building control directly.',
    tags: ['building control', 'local requirements', 'conflicts'],
    priority: 'important',
    section: 'building-career',
  },
];

// ============================================================
// SCENARIOS (from ScenarioBasedTool and CommunicationSimulator)
// ============================================================

export const scenarios: Scenario[] = [
  // From ScenarioBasedTool
  {
    id: 'scenario-001',
    title: 'Conflicting Instructions',
    situation:
      'Your supervisor tells you to do one thing, but the site manager says something different.',
    options: [
      {
        text: "Follow supervisor's instructions without question",
        isCorrect: false,
        feedback:
          'This could lead to confusion and potential safety issues if instructions conflict.',
      },
      {
        text: 'Ask supervisor and site manager to clarify together',
        isCorrect: true,
        feedback:
          'Excellent! This approach ensures clear communication and prevents misunderstandings.',
      },
      {
        text: 'Follow site manager as they have higher authority',
        isCorrect: false,
        feedback:
          'Authority levels can vary by situation. It is better to seek clarification first.',
      },
      {
        text: 'Do nothing until it is resolved',
        isCorrect: false,
        feedback: 'Inaction could delay important work. Proactive communication is better.',
      },
    ],
    explanation:
      'Always seek clarification when receiving conflicting instructions to avoid confusion and potential safety issues.',
    section: 'when-things-go-wrong',
  },
  {
    id: 'scenario-002',
    title: 'Safety Concern Communication',
    situation: 'You notice a potential safety hazard but your supervisor seems busy and stressed.',
    options: [
      {
        text: 'Wait for a better time to mention it',
        isCorrect: false,
        feedback: 'Safety concerns should never be delayed \u2014 they could lead to accidents.',
      },
      {
        text: "Report it immediately regardless of supervisor's mood",
        isCorrect: true,
        feedback: 'Perfect! Safety always takes priority over timing or mood considerations.',
      },
      {
        text: 'Fix it yourself if possible',
        isCorrect: false,
        feedback:
          'You should report it first \u2014 you might not have authority or proper knowledge to fix it safely.',
      },
      {
        text: 'Mention it to a colleague first',
        isCorrect: false,
        feedback: 'Safety concerns should be reported directly to supervisors or safety officers.',
      },
    ],
    explanation:
      "Safety concerns should always be reported immediately, regardless of timing or your supervisor's current state.",
    section: 'emergency',
  },
  {
    id: 'scenario-003',
    title: 'Learning Opportunity Request',
    situation:
      'You see other tradespeople doing interesting work that you would like to learn about, but you have your own tasks to complete.',
    options: [
      {
        text: 'Leave your work to watch them',
        isCorrect: false,
        feedback: 'Abandoning your assigned tasks without permission is unprofessional.',
      },
      {
        text: 'Ask your supervisor if you can observe during a break or after completing your tasks',
        isCorrect: true,
        feedback: 'Great approach! This shows initiative while respecting your responsibilities.',
      },
      {
        text: 'Ignore it and focus only on your assigned work',
        isCorrect: false,
        feedback: 'Missing learning opportunities can slow your development as an apprentice.',
      },
      {
        text: 'Ask the other tradespeople directly without involving your supervisor',
        isCorrect: false,
        feedback:
          'You should always check with your supervisor before changing your focus or schedule.',
      },
    ],
    explanation:
      'Always communicate with your supervisor about learning opportunities. They can help you balance learning with your responsibilities.',
    section: 'building-career',
  },
  // From CommunicationSimulator
  {
    id: 'scenario-004',
    title: 'Asking for Help',
    situation:
      'You have been working on connecting a consumer unit for 30 minutes but cannot figure out the proper sequence. Your supervisor is nearby working on another task.',
    options: [
      {
        text: 'Hey, can you help me with this? I am stuck.',
        isCorrect: false,
        feedback:
          'This is direct but lacks specifics. Your supervisor does not know what exactly you need help with.',
      },
      {
        text: 'Excuse me, could you help me understand the correct sequence for connecting this consumer unit? I want to make sure I am doing it safely.',
        isCorrect: true,
        feedback:
          'Excellent! This is specific, shows you are thinking about safety, and demonstrates a learning mindset.',
      },
      {
        text: 'I cannot do this. It is too complicated.',
        isCorrect: false,
        feedback:
          'This shows defeat rather than a willingness to learn. It does not help your supervisor understand what specific help you need.',
      },
      {
        text: 'You need to show me how to do this right now.',
        isCorrect: false,
        feedback: 'Too demanding. This approach can damage your relationship with your supervisor.',
      },
    ],
    explanation:
      'When asking for help, be specific about what you need, show you have thought about safety, and demonstrate that you are keen to learn.',
    section: 'first-day',
  },
  {
    id: 'scenario-005',
    title: 'Reporting Progress',
    situation:
      'You were asked to install socket outlets in three rooms. You have completed two rooms but encountered a problem in the third that is slowing you down.',
    options: [
      {
        text: 'It is going fine.',
        isCorrect: false,
        feedback:
          "Too vague. Your supervisor needs specific information to help plan the day's work.",
      },
      {
        text: 'I have completed the socket installations in the kitchen and living room. I am working on the bedroom but encountered an issue with the existing wiring that is requiring extra time to resolve safely.',
        isCorrect: true,
        feedback:
          'Perfect! This gives specific progress updates and identifies the issue causing delays.',
      },
      {
        text: 'There is a problem and I do not know what to do about it.',
        isCorrect: false,
        feedback:
          'You have identified there is an issue but have not provided enough detail for your supervisor to help effectively.',
      },
      {
        text: 'I finished two rooms. The third one has bad wiring that is making this take forever.',
        isCorrect: false,
        feedback:
          "You have given progress info but the tone could be more professional, and 'bad wiring' is not specific enough.",
      },
    ],
    explanation:
      'When reporting progress, give specific details about what is complete, what remains, and clearly describe any issues or delays.',
    section: 'building-career',
  },
  {
    id: 'scenario-006',
    title: 'Expressing Concerns',
    situation:
      'You observe that the method being used to access a high ceiling area seems potentially unsafe, but you are not sure if you should speak up as an apprentice.',
    options: [
      {
        text: 'That looks dangerous.',
        isCorrect: false,
        feedback: 'Too vague and could sound like criticism. Be more specific and constructive.',
      },
      {
        text: 'I am concerned about the safety of accessing that height without proper fall protection. Could we discuss the safest approach?',
        isCorrect: true,
        feedback:
          'Excellent! This shows concern for safety while being respectful and opening dialogue.',
      },
      {
        text: 'Maybe we should think about this differently...',
        isCorrect: false,
        feedback: 'You are raising the issue but not being clear about your specific concerns.',
      },
      {
        text: 'We should not be doing it this way. It is not safe.',
        isCorrect: false,
        feedback:
          'Your concern is valid but the delivery could be seen as confrontational. Better to suggest discussion.',
      },
    ],
    explanation:
      'Always speak up about safety concerns, even as an apprentice. Frame your concern specifically and suggest discussing the safest approach together.',
    section: 'when-things-go-wrong',
  },
];

// ============================================================
// COMMUNICATION SCRIPTS (poor/better/best)
// ============================================================

export const communicationScripts: CommunicationScript[] = [
  {
    id: 'script-001',
    situation: 'Asking for clarification',
    poor: "I don't get it",
    better: 'Could you explain that procedure once more, please?',
    best: 'I want to ensure I understand the sequence correctly \u2014 could you walk me through steps 3 and 4 again?',
    section: 'first-day',
  },
  {
    id: 'script-002',
    situation: 'Reporting completion',
    poor: 'Done',
    better: 'I have finished the task',
    best: 'I have completed the ring final installation and it is ready for inspection. All connections are secure and the circuit has been initially tested.',
    section: 'building-career',
  },
  {
    id: 'script-003',
    situation: 'Requesting materials',
    poor: 'Need more cable',
    better: 'I need additional cable',
    best: 'I require approximately 20 metres of 2.5mm\u00B2 T&E cable to complete the kitchen ring final circuit.',
    section: 'first-day',
  },
  {
    id: 'script-004',
    situation: 'Expressing uncertainty',
    poor: 'I think this is wrong',
    better: 'This does not look right to me',
    best: 'I am concerned about this connection \u2014 the readings do not match what I expected. Could you verify this for me?',
    section: 'when-things-go-wrong',
  },
];

// ============================================================
// DIFFICULT CONVERSATIONS
// ============================================================

export const difficultConversations: DifficultConversation[] = [
  {
    id: 'convo-001',
    scenario: 'Admitting a Mistake',
    challenge: 'Fear of getting in trouble or looking incompetent',
    approach: 'Immediate honesty with solution focus',
    script:
      'I need to let you know that I have made an error with the cable routing in the kitchen. I have isolated the circuit and I think the best approach would be to re-route via the utility room. Can we discuss the correction procedure?',
    followUp: [
      'Take responsibility completely',
      'Focus on the solution',
      'Learn from the feedback',
      'Document lessons learned',
    ],
    section: 'when-things-go-wrong',
  },
  {
    id: 'convo-002',
    scenario: 'Disagreeing with Instructions',
    challenge: 'Balancing respect with safety concerns',
    approach: 'Respectful questioning with safety focus',
    script:
      'I understand the approach you have outlined, but I have a concern about the cable routing through that area. The building plans show a potential conflict. Could we review this together?',
    followUp: [
      'Present facts, not opinions',
      'Suggest alternatives',
      'Accept the final decision',
      'Document any concerns formally if needed',
    ],
    section: 'difficult-people',
  },
  {
    id: 'convo-003',
    scenario: 'Requesting Time Off',
    challenge: 'Balancing personal needs with work commitments',
    approach: 'Professional request with adequate notice',
    script:
      'I would like to request annual leave for [dates] for a family commitment. I can ensure all my current tasks are completed beforehand, and I am happy to brief a colleague on any ongoing work.',
    followUp: [
      'Give maximum notice possible',
      'Offer to arrange cover',
      'Confirm arrangements in writing',
      'Be flexible where possible',
    ],
    section: 'your-rights',
  },
];

// ============================================================
// RELATIONSHIP BUILDING ACTIVITIES
// ============================================================

export const relationshipActivities: RelationshipActivity[] = [
  {
    id: 'activity-001',
    title: 'Morning Check-in Routine',
    description: 'Start each day by properly checking in with your supervisor and team members',
    category: 'daily',
    difficulty: 'beginner',
    timeRequired: '5\u201310 minutes',
    steps: [
      'Arrive a few minutes early to prepare for the day',
      'Greet your supervisor and team members professionally',
      "Ask about the day's priorities and any changes to plans",
      'Confirm your understanding of assigned tasks',
      'Ask if there are any safety considerations for the day',
    ],
    benefits: [
      'Shows reliability and professionalism',
      'Helps you stay aligned with daily goals',
      'Demonstrates that you value communication',
      'Gives opportunities to ask questions early',
    ],
    tips: [
      'Be consistent \u2014 do this every day',
      'Keep it brief but meaningful',
      'Listen actively to responses',
      'Take notes if needed',
    ],
    section: 'first-day',
  },
  {
    id: 'activity-002',
    title: 'Skills Development Conversations',
    description: 'Regular discussions about your learning progress and career development',
    category: 'weekly',
    difficulty: 'intermediate',
    timeRequired: '15\u201320 minutes',
    steps: [
      'Schedule a brief weekly catch-up with your supervisor',
      'Prepare by noting what you have learned and questions you have',
      'Discuss your progress on current skills',
      'Ask for feedback on areas to improve',
      'Set learning goals for the following week',
      'Request opportunities to practise new skills',
    ],
    benefits: [
      'Shows commitment to professional development',
      'Helps identify learning opportunities',
      'Builds trust through open communication',
      'Demonstrates initiative and motivation',
    ],
    tips: [
      'Come prepared with specific questions',
      'Be open to constructive feedback',
      'Follow through on discussed goals',
      'Keep a learning journal',
    ],
    section: 'building-career',
  },
  {
    id: 'activity-003',
    title: 'Team Contribution Initiative',
    description: 'Find ways to contribute positively to your team beyond your assigned tasks',
    category: 'weekly',
    difficulty: 'intermediate',
    timeRequired: 'Ongoing',
    steps: [
      'Observe what additional help your team might need',
      'Offer to assist with tasks that match your skill level',
      'Keep common areas tidy and organised',
      'Share useful information or resources you discover',
      'Volunteer for appropriate additional responsibilities',
      'Help newer team members when possible',
    ],
    benefits: [
      'Shows teamwork and initiative',
      'Builds relationships with all team members',
      'Demonstrates reliability beyond basic requirements',
      'Creates opportunities for additional learning',
    ],
    tips: [
      'Do not overcommit \u2014 balance with your main duties',
      'Ask before taking on additional tasks',
      'Be genuine in your offers to help',
      'Celebrate team successes together',
    ],
    section: 'difficult-people',
  },
  {
    id: 'activity-004',
    title: 'Professional Relationship Mapping',
    description: 'Understand and build relationships with different people in your workplace',
    category: 'monthly',
    difficulty: 'advanced',
    timeRequired: '30 minutes planning + ongoing practice',
    steps: [
      'Identify key people you work with regularly',
      'Note their roles, responsibilities, and communication preferences',
      'Observe successful interactions others have with these people',
      'Plan approaches for building positive relationships with each',
      'Practise adapting your communication style appropriately',
      'Reflect on and improve your relationship-building efforts',
    ],
    benefits: [
      'Improves your professional network',
      'Helps you understand workplace dynamics',
      'Develops emotional intelligence skills',
      'Creates a more positive work environment',
    ],
    tips: [
      'Focus on quality relationships, not quantity',
      'Be authentic in your interactions',
      'Respect different personality types and work styles',
      'Remember that relationships take time to develop',
    ],
    section: 'building-career',
  },
];

// ============================================================
// SITE KNOWLEDGE TOPICS
// ============================================================

export const siteKnowledgeTopics: SiteKnowledgeTopic[] = [
  {
    id: 'site-topic-001',
    title: 'Site Induction & Setup',
    icon: 'HardHat',
    items: [
      'What to expect in your first week on site',
      'Essential documents and certifications to bring',
      'Site-specific safety procedures and emergency contacts',
      'Welfare facilities location and usage protocols',
      'Tool storage and security arrangements',
    ],
    section: 'first-day',
  },
  {
    id: 'site-topic-002',
    title: 'Daily Site Routine',
    icon: 'Clock',
    items: [
      'Morning briefing procedures and toolbox talks',
      'Work allocation and task prioritisation',
      'Progress reporting and time recording',
      'Material ordering and waste management',
      'End-of-day procedures and site security',
    ],
    section: 'first-day',
  },
  {
    id: 'site-topic-003',
    title: 'Site Hierarchy & Communication',
    icon: 'Users',
    items: [
      'Understanding the chain of command on site',
      'When to approach different levels of management',
      'Formal vs informal communication channels',
      'Inter-trade coordination and cooperation',
      'Client interaction protocols and boundaries',
    ],
    section: 'first-day',
  },
  {
    id: 'site-topic-004',
    title: 'Documentation & Paperwork',
    icon: 'FileText',
    items: [
      'Daily worksheets and time recording',
      'Material requisition and delivery notes',
      'Test certificates and completion records',
      'Variation orders and additional work',
      'Health and safety documentation requirements',
    ],
    section: 'when-things-go-wrong',
  },
];

// ============================================================
// SITE SCENARIOS
// ============================================================

export const siteScenarios: SiteScenario[] = [
  {
    id: 'site-scenario-001',
    scenario: 'You arrive on a new construction site for the first time',
    guidance:
      'Report to the main office, present your CSCS card and any required certifications, attend the mandatory site induction, collect PPE if needed, and get introduced to your supervisor and immediate team.',
    urgency: 'standard',
    section: 'first-day',
  },
  {
    id: 'site-scenario-002',
    scenario: 'You notice another trade has damaged your cable run',
    guidance:
      'Document the damage with photos, inform your supervisor immediately, do not attempt repairs without authorisation, and complete an incident report if required.',
    urgency: 'high',
    section: 'when-things-go-wrong',
  },
  {
    id: 'site-scenario-003',
    scenario: 'Client asks you to do additional work not on the original plan',
    guidance:
      'Politely explain you need supervisor approval, do not commit to timeframes or costs, document the request, and refer them to your supervisor or project manager.',
    urgency: 'medium',
    section: 'when-things-go-wrong',
  },
  {
    id: 'site-scenario-004',
    scenario: 'Weather conditions make outdoor work unsafe',
    guidance:
      'Stop work immediately if conditions are dangerous, inform your supervisor, seek alternative indoor tasks if available, and never risk safety for project deadlines.',
    urgency: 'high',
    section: 'when-things-go-wrong',
  },
];

// ============================================================
// SITE CONTACTS (who to contact and when)
// ============================================================

export const siteContacts: SiteContact[] = [
  {
    id: 'site-contact-001',
    role: 'Site Manager',
    when: 'Overall site issues, major problems, disputes between trades',
    approach: 'Formal appointment, document issues beforehand',
    section: 'first-day',
  },
  {
    id: 'site-contact-002',
    role: 'Electrical Supervisor',
    when: 'Technical questions, work allocation, electrical safety concerns',
    approach: 'Direct communication, daily check-ins encouraged',
    section: 'first-day',
  },
  {
    id: 'site-contact-003',
    role: 'Health & Safety Officer',
    when: 'Safety incidents, PPE issues, hazard reporting',
    approach: 'Immediate contact for urgent safety matters',
    section: 'emergency',
  },
  {
    id: 'site-contact-004',
    role: 'Stores/Materials',
    when: 'Material shortages, tool requirements, deliveries',
    approach: 'Follow requisition procedures, advance notice preferred',
    section: 'first-day',
  },
];

// ============================================================
// CONTACT RESOURCES (corrected phone numbers)
// ============================================================

export const emergencyContacts: ContactResource[] = [
  {
    id: 'contact-001',
    name: 'Health and Safety Executive (HSE)',
    description: 'Report serious workplace accidents, dangerous occurrences, and safety concerns',
    phone: '0345 300 9923',
    website: 'https://www.hse.gov.uk',
    category: 'emergency',
    availability: 'Mon\u2013Fri 8:30am\u20135pm (incidents 24/7)',
    cost: 'Free',
  },
  {
    id: 'contact-002',
    name: 'Electrical Safety First',
    description: 'Electrical safety advice and guidance for professionals and consumers',
    phone: '020 3463 5100',
    website: 'https://www.electricalsafetyfirst.org.uk',
    category: 'emergency',
    availability: 'Mon\u2013Fri 9am\u20135pm',
    cost: 'Free advice line',
  },
  {
    id: 'contact-003',
    name: 'RIDDOR Incident Reporting',
    description: 'Online reporting system for serious workplace accidents and incidents',
    website: 'https://www.hse.gov.uk/riddor/report.htm',
    category: 'emergency',
    availability: '24/7 online',
    cost: 'Free',
  },
];

export const professionalContacts: ContactResource[] = [
  {
    id: 'contact-004',
    name: 'Institution of Engineering and Technology (IET)',
    description:
      'Professional development, technical guidance, and career support for electrical engineers',
    phone: '01438 313311',
    website: 'https://www.theiet.org',
    category: 'professional',
    availability: 'Mon\u2013Fri 8:30am\u20135pm',
    cost: 'Membership required for some services',
  },
  {
    id: 'contact-005',
    name: "Electrical Contractors' Association (ECA)",
    description: 'Trade association providing business support, training, and technical advice',
    phone: '01732 471757',
    website: 'https://www.eca.co.uk',
    category: 'professional',
    availability: 'Mon\u2013Fri 9am\u20135pm',
    cost: 'Member services available',
  },
  {
    id: 'contact-006',
    name: 'NICEIC',
    description: 'Assessment, certification, and technical support for electrical contractors',
    phone: '0333 015 6625',
    website: 'https://www.niceic.com',
    category: 'professional',
    availability: 'Mon\u2013Fri 9am\u20135pm',
    cost: 'Registration fees apply',
  },
  {
    id: 'contact-007',
    name: 'SELECT (Scotland)',
    description: 'Scottish electrical contractors association providing training and support',
    phone: '0131 445 5577',
    website: 'https://www.select.org.uk',
    category: 'professional',
    availability: 'Mon\u2013Fri 9am\u20135pm',
    cost: 'Member services',
  },
];

export const trainingContacts: ContactResource[] = [
  {
    id: 'contact-008',
    name: 'City & Guilds',
    description: 'Electrical qualifications, apprenticeships, and professional development courses',
    phone: '01924 930800',
    website: 'https://www.cityandguilds.com',
    category: 'training',
    availability: 'Mon\u2013Fri 8am\u20136pm',
    cost: 'Course fees apply',
  },
  {
    id: 'contact-009',
    name: 'EAL (Excellence, Achievement & Learning)',
    description: 'Electrical qualifications and specialist electrical training programmes',
    phone: '01923 652400',
    website: 'https://www.eal.org.uk',
    category: 'training',
    availability: 'Mon\u2013Fri 9am\u20135pm',
    cost: 'Course fees apply',
  },
  {
    id: 'contact-010',
    name: 'JTL Training',
    description: 'Electrical apprenticeships and training programmes across England and Wales',
    phone: '0800 085 2308',
    website: 'https://www.jtltraining.com',
    category: 'training',
    availability: 'Mon\u2013Fri 8:30am\u20135pm',
    cost: 'Apprenticeship funding available',
  },
];

export const supportContacts: ContactResource[] = [
  {
    id: 'contact-011',
    name: 'ACAS',
    description: 'Workplace rights, employment law, and dispute resolution advice',
    phone: '0300 123 1100',
    website: 'https://www.acas.org.uk',
    category: 'support',
    availability: 'Mon\u2013Fri 8am\u20136pm',
    cost: 'Free advice service',
  },
  {
    id: 'contact-012',
    name: 'Unite the Union',
    description: 'Trade union representing construction and electrical workers across the UK',
    phone: '020 7611 2500',
    website: 'https://www.unitetheunion.org',
    category: 'support',
    availability: 'Mon\u2013Fri 9am\u20135pm',
    cost: 'Membership fees apply',
  },
  {
    id: 'contact-013',
    name: 'Citizens Advice',
    description: 'Free advice on employment rights, benefits, and legal issues',
    phone: '0808 223 1133',
    website: 'https://www.citizensadvice.org.uk',
    category: 'support',
    availability: 'Mon\u2013Fri 9am\u20135pm',
    cost: 'Free service',
  },
];

export const allContacts: ContactResource[] = [
  ...emergencyContacts,
  ...professionalContacts,
  ...trainingContacts,
  ...supportContacts,
];

// ============================================================
// QUIZ QUESTIONS (15 total, spread across all 6 sections)
// ============================================================

export const quizQuestions: QuizQuestion[] = [
  // Emergency section (3 questions)
  {
    id: 'quiz-001',
    question:
      'Someone on site has received an electric shock and is still in contact with the supply. What do you do first?',
    options: [
      'Pull them away from the source immediately',
      'Turn off the power at the source or use a non-conductive item to separate them',
      'Call 999 and wait for the ambulance',
      'Start CPR straight away',
    ],
    correctIndex: 1,
    explanation:
      'Never touch someone still in contact with electricity. Turn off the power if possible, or use a non-conductive item (such as a dry wooden broom handle) to separate them. Then call 999 and begin CPR if they are not breathing.',
    section: 'emergency',
  },
  {
    id: 'quiz-002',
    question:
      'An electrical fire starts in a distribution board. Which extinguisher should you use?',
    options: [
      'Water extinguisher',
      'Foam extinguisher',
      'CO2 extinguisher',
      'Wet chemical extinguisher',
    ],
    correctIndex: 2,
    explanation:
      'CO2 extinguishers are safe for use on electrical fires as they do not conduct electricity and leave no residue. Never use water on an electrical fire.',
    section: 'emergency',
  },
  {
    id: 'quiz-003',
    question:
      'You witness a colleague working on a circuit without following safe isolation procedures. What should you do?',
    options: [
      'Mind your own business \u2014 they are more experienced',
      'Wait until the job is finished, then mention it',
      'Intervene if safe to do so, then report it to your supervisor immediately',
      'Post about it on social media to warn others',
    ],
    correctIndex: 2,
    explanation:
      'You have a legal duty to report unsafe practices. If someone is in immediate danger, intervene if safe. Then document and report to your supervisor, site manager, or training provider.',
    section: 'emergency',
  },

  // First Day section (2 questions)
  {
    id: 'quiz-004',
    question: 'You arrive at a new construction site. What is the first thing you should do?',
    options: [
      'Find your supervisor and start working immediately',
      'Report to the main office, present your CSCS card, and attend the site induction',
      'Set up your tools in the nearest available space',
      'Introduce yourself to everyone on site',
    ],
    correctIndex: 1,
    explanation:
      'Always report to the main office first. Present your CSCS card and certifications, attend the mandatory site induction, and get properly introduced to your supervisor before starting any work.',
    section: 'first-day',
  },
  {
    id: 'quiz-005',
    question:
      'You are handed a power tool that does not have a current PAT test label. What should you do?',
    options: [
      'Use it carefully and mention it later',
      'Use it if it looks fine',
      'Do not use it \u2014 report it and request a replacement',
      'PAT test it yourself before using it',
    ],
    correctIndex: 2,
    explanation:
      'Never use equipment without a current PAT test label. Take it out of service, report it to your supervisor, and request a replacement. Using untested equipment puts you and others at risk.',
    section: 'first-day',
  },

  // When Things Go Wrong section (3 questions)
  {
    id: 'quiz-006',
    question: 'You discover a cable run damaged by another trade. What do you do first?',
    options: [
      'Repair it yourself to save time',
      'Document the damage and inform your supervisor immediately',
      'Ignore it \u2014 it is not your responsibility',
      'Tell the other trade to fix it',
    ],
    correctIndex: 1,
    explanation:
      'Always document damage with photos and report to your supervisor. Do not attempt repairs without authorisation, and do not ignore it as it could be a safety hazard.',
    section: 'when-things-go-wrong',
  },
  {
    id: 'quiz-007',
    question:
      'Your supervisor asks you to work on a circuit. You test it and find it is still live. What do you do?',
    options: [
      'Work carefully around the live parts',
      'Refuse to work on it until it is properly isolated, and explain why',
      'Ask a colleague to hold the cables out of the way',
      'Turn off the nearest switch and assume it is safe',
    ],
    correctIndex: 1,
    explanation:
      'Never work on a live circuit. Follow the safe isolation procedure: identify, isolate, secure, test dead, and prove your tester. If pressured to skip safety, escalate to your training provider or HSE.',
    section: 'when-things-go-wrong',
  },
  {
    id: 'quiz-008',
    question:
      'You have made a wiring error that could affect the safety of the installation. What is your best course of action?',
    options: [
      'Fix it quietly before anyone notices',
      'Report it immediately to your supervisor and explain what happened',
      'Leave it and hope it is picked up during testing',
      'Ask a colleague to fix it for you',
    ],
    correctIndex: 1,
    explanation:
      'Always report safety-related mistakes immediately. Honesty builds trust with your supervisor and ensures the error is corrected properly. Hiding mistakes can lead to serious safety consequences.',
    section: 'when-things-go-wrong',
  },

  // Difficult People section (2 questions)
  {
    id: 'quiz-009',
    question:
      'Your supervisor regularly makes comments that make you uncomfortable. What is the most appropriate response?',
    options: [
      'Laugh along to fit in',
      'Set boundaries politely but firmly, and document incidents if they continue',
      'Ignore it \u2014 it is just how things are on site',
      'Retaliate with similar comments',
    ],
    correctIndex: 1,
    explanation:
      "You have the right to a respectful workplace. Set boundaries calmly: 'I am not comfortable with that kind of talk.' If it continues, document incidents and speak to your training provider. This is not 'being soft' \u2014 it is being professional.",
    section: 'difficult-people',
  },
  {
    id: 'quiz-010',
    question:
      'Your supervisor criticises your work in front of the whole team. How should you respond?',
    options: [
      'Argue back to defend yourself',
      'Storm off and refuse to work',
      'Listen calmly, ask what you should do differently, and discuss privately later if needed',
      'Complain to the site manager immediately',
    ],
    correctIndex: 2,
    explanation:
      "Stay calm and professional. Ask clarifying questions: 'What specifically should I do differently?' Take notes, and if you feel the criticism was unfair, discuss it privately with your supervisor later. Reacting emotionally rarely helps.",
    section: 'difficult-people',
  },

  // Your Rights section (2 questions)
  {
    id: 'quiz-011',
    question:
      'You are asked to carry out work that is beyond your level of competence as an apprentice. What should you do?',
    options: [
      'Do it anyway to impress your supervisor',
      'Politely explain your limitations and suggest working under supervision',
      'Refuse outright without explanation',
      'Pretend you know how and figure it out as you go',
    ],
    correctIndex: 1,
    explanation:
      "Never work beyond your competence level. Explain politely: 'I am only qualified to do X as an apprentice. I would be happy to help with this under supervision.' If pressured, contact your training provider.",
    section: 'your-rights',
  },
  {
    id: 'quiz-012',
    question:
      'You have not been paid correctly for three consecutive weeks. What steps should you take?',
    options: [
      'Stop turning up to work until you are paid',
      'Keep records, raise it with your supervisor, then escalate to your training provider and ACAS if not resolved',
      'Accept it as part of being an apprentice',
      'Post about it online to shame the company',
    ],
    correctIndex: 1,
    explanation:
      'Keep accurate records of hours worked and pay received. Check your contract, raise it with your supervisor, then your training provider. If still unresolved, ACAS provides free employment advice on 0300 123 1100.',
    section: 'your-rights',
  },

  // Building Career section (3 questions)
  {
    id: 'quiz-013',
    question:
      'You want to learn about three-phase systems but have not covered them yet. How should you approach this?',
    options: [
      'Start working on a three-phase board to learn by doing',
      'Ask your supervisor if you can observe and learn about three-phase work when the opportunity arises',
      'Wait until college covers it before mentioning it',
      'Watch YouTube videos and then tell your supervisor you know how to do it',
    ],
    correctIndex: 1,
    explanation:
      'Show initiative by asking your supervisor for learning opportunities. Suggest observing first, then assisting under supervision. This shows enthusiasm while respecting safety and your current competence level.',
    section: 'building-career',
  },
  {
    id: 'quiz-014',
    question:
      'Your test instrument gives an unexpected reading during an insulation resistance test. What should you do?',
    options: [
      'Record the reading and move on',
      'Adjust the reading to match what you expected',
      'Stop testing, check the instrument calibration, re-test, and report if the reading persists',
      'Ignore it \u2014 the instrument is probably faulty',
    ],
    correctIndex: 2,
    explanation:
      'Never trust unexpected readings without investigation. Check your instrument calibration is current, prove the tester works on a known source, and re-test. If the reading persists, report it to your supervisor \u2014 there may be a genuine fault.',
    section: 'building-career',
  },
  {
    id: 'quiz-015',
    question: 'You learn that BS 7671 has been amended. How should you stay up to date?',
    options: [
      'Wait until someone tells you what has changed',
      'Subscribe to IET updates, attend CPD events, and discuss changes with your supervisor and training provider',
      'Buy a new copy of the regulations and read it cover to cover',
      'It does not matter \u2014 your college will cover it eventually',
    ],
    correctIndex: 1,
    explanation:
      'Staying current is your professional responsibility. Subscribe to IET updates, follow industry publications, attend CPD events, and discuss amendments with your supervisor. Make notes about changes in your regulations book.',
    section: 'building-career',
  },
];
