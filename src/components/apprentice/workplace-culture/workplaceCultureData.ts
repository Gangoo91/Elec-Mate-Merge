// ── Centralised Workplace Culture Data ─────────────────────────
// All content for the hub-and-spoke workplace culture page.
// Consolidates content from the previous 6-tab, 19-file architecture.

// ── Types ──────────────────────────────────────────────────────

export interface Section {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  colour: string;
}

export interface Question {
  id: string;
  section: string;
  question: string;
  answer: string;
  tags: string[];
  priority: 'critical' | 'important' | 'helpful';
}

export interface Scenario {
  id: string;
  section: string;
  situation: string;
  rightApproach: string;
  wrongApproach: string;
}

export interface CommunicationScript {
  id: string;
  section: string;
  situation: string;
  poor: string;
  better: string;
  best: string;
}

export interface TermEntry {
  id: string;
  section: string;
  category: string;
  term: string;
  meaning: string;
  usage: string;
}

export interface RegionalInfo {
  id: string;
  section: string;
  region: string;
  characteristics: string[];
  commonPhrases: string[];
  workingHours: string;
  breakCulture: string;
  keyTips: string[];
}

export interface IndustryType {
  id: string;
  section: string;
  sector: string;
  culture: string;
  communication: string;
  challenges: string;
}

export interface ProfessionalTip {
  id: string;
  section: string;
  area: string;
  description: string;
  expectations: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Contact {
  id: string;
  name: string;
  description: string;
  phone?: string;
  website?: string;
  availability?: string;
  category: 'industry' | 'support' | 'emergency';
}

// ── Sections (the 6 hub cards) ─────────────────────────────────

export const sections: Section[] = [
  {
    id: 'raising-concerns',
    title: 'Raising Concerns',
    subtitle: 'Speaking up about safety issues professionally',
    icon: 'AlertTriangle',
    colour: 'red',
  },
  {
    id: 'communication',
    title: 'Communication Skills',
    subtitle: 'Professional workplace communication',
    icon: 'MessageSquare',
    colour: 'blue',
  },
  {
    id: 'reading-the-room',
    title: 'Reading the Room',
    subtitle: 'Body language and social dynamics',
    icon: 'Eye',
    colour: 'purple',
  },
  {
    id: 'asking-for-help',
    title: 'Asking for Help',
    subtitle: 'Seeking clarification without fear',
    icon: 'HelpCircle',
    colour: 'amber',
  },
  {
    id: 'cultural-awareness',
    title: 'Cultural Awareness',
    subtitle: 'Working in a diverse industry',
    icon: 'Globe',
    colour: 'green',
  },
  {
    id: 'professional-standards',
    title: 'Professional Standards',
    subtitle: 'Expectations and industry etiquette',
    icon: 'Award',
    colour: 'cyan',
  },
];

// ── Questions (FAQ-style Q&A) ──────────────────────────────────

export const questions: Question[] = [
  // ── Raising Concerns ─────────────────────────────
  {
    id: 'rc-q1',
    section: 'raising-concerns',
    question: 'What if my safety concern is ignored?',
    answer:
      "If your immediate supervisor ignores a legitimate safety concern, document the concern and follow your company's escalation procedure. This might involve speaking to a higher manager, safety officer, or union representative. In cases of serious and imminent danger, you have the legal right to refuse unsafe work.",
    tags: ['safety', 'escalation', 'legal rights'],
    priority: 'critical',
  },
  {
    id: 'rc-q2',
    section: 'raising-concerns',
    question: "How do I raise a safety concern about my supervisor's behaviour?",
    answer:
      "This requires tact and careful documentation. First, try speaking directly with your supervisor if you feel safe doing so. If that's not effective, consult your company's policies on reporting safety violations, which may involve HR, a safety committee, or an anonymous reporting system. Document specific instances, dates, times, and how the behaviour violates specific regulations.",
    tags: ['supervisor', 'documentation', 'HR'],
    priority: 'critical',
  },
  {
    id: 'rc-q3',
    section: 'raising-concerns',
    question: "What if refusing makes me look like I'm not a team player?",
    answer:
      'Frame your refusal as protecting the team, not just yourself. Use phrases like "I\'m concerned about our liability here" or "I want to make sure we all get home safely." Offering alternatives shows you\'re solution-focused. A good team values safety over speed — and most experienced workers will respect your professionalism, even if they seem annoyed in the moment.',
    tags: ['team', 'professionalism', 'refusal'],
    priority: 'important',
  },
  {
    id: 'rc-q4',
    section: 'raising-concerns',
    question: 'Could I lose my apprenticeship if I refuse certain tasks?',
    answer:
      'You have legal protections against retaliation for refusing genuinely unsafe work. Document incidents, including dates, times, what was requested, and your response. If you experience negative consequences, contact your apprenticeship provider, union representative, or the Health and Safety Executive. Your training agreement should outline the appropriate supervision levels required for different tasks.',
    tags: ['apprenticeship', 'legal protection', 'retaliation'],
    priority: 'critical',
  },
  {
    id: 'rc-q5',
    section: 'raising-concerns',
    question: 'How do I identify the specific safety risk before raising it?',
    answer:
      "Use the STAR approach: Situation (what's happening), Task (what regulation it relates to), Action (what needs to change), and Result (what the safe outcome looks like). Reference relevant regulations like BS 7671, the Work at Height Regulations, or CDM Regulations. Being specific about which regulation is being breached gives your concern more weight.",
    tags: ['safety', 'STAR', 'regulations'],
    priority: 'important',
  },

  // ── Communication ────────────────────────────────
  {
    id: 'cm-q1',
    section: 'communication',
    question: 'How do I communicate with a client about delays?',
    answer:
      "Be upfront and honest. Explain what caused the delay, what you're doing to resolve it, and give a realistic updated timeline. Use language like \"I want to keep you informed — we've hit a complication with [specific issue]. I'm working on a solution and expect to be back on track by [time].\" Clients respect transparency far more than vague reassurances.",
    tags: ['client', 'delays', 'transparency'],
    priority: 'important',
  },
  {
    id: 'cm-q2',
    section: 'communication',
    question: 'What should I say during a morning site briefing?',
    answer:
      'Arrive 5-10 minutes early, listen actively, and confirm your understanding. A good response: "I understand I\'m working on the kitchen ring main today. Should I start with the sockets or lighting circuit first? And who should I report to if I find any issues?" This shows you\'re engaged, prepared, and safety-conscious.',
    tags: ['briefing', 'morning', 'site'],
    priority: 'important',
  },
  {
    id: 'cm-q3',
    section: 'communication',
    question: 'How do I report a problem to my supervisor effectively?',
    answer:
      "Be specific and solution-oriented. Instead of \"there's a problem,\" say \"I've hit a problem with the cable run behind the kitchen units — there's a gas pipe in the way that wasn't on the drawings. I've stopped work and marked the area. Could we discuss alternative routing options?\" This shows initiative and professionalism.",
    tags: ['reporting', 'problem-solving', 'supervisor'],
    priority: 'important',
  },
  {
    id: 'cm-q4',
    section: 'communication',
    question: 'When should I use face-to-face vs text communication?',
    answer:
      'Use face-to-face for complex instructions, safety issues, learning new skills, and problem-solving — you get immediate feedback and build relationships. Use text/written communication for non-urgent updates, sharing photos, material lists, and handovers — it creates a permanent record you can reference later. When in doubt, face-to-face is usually better for anything important.',
    tags: ['methods', 'face-to-face', 'written'],
    priority: 'helpful',
  },
  {
    id: 'cm-q5',
    section: 'communication',
    question: 'How do I introduce myself to a client professionally?',
    answer:
      "\"Hello, I'm [Name], the apprentice electrician working with [Supervisor's name] today. We'll be installing your new consumer unit, which should take about 4 hours. You'll be without power for about 2 hours while we make the final connections. Is there anything specific you'd like us to be careful with?\" This covers who you are, what's happening, how long it'll take, and shows respect for their home.",
    tags: ['client', 'introduction', 'professional'],
    priority: 'helpful',
  },

  // ── Reading the Room ─────────────────────────────
  {
    id: 'rtr-q1',
    section: 'reading-the-room',
    question: 'How do I know if someone is open to receiving help or advice?',
    answer:
      'Look for open body posture (uncrossed arms), eye contact, and engaged responses to questions. People receptive to help often pause their work when you approach, turn to face you fully, and ask clarifying questions. If they continue working without looking up, give short responses, or physically turn away, they may not be receptive at that moment.',
    tags: ['body language', 'help', 'signals'],
    priority: 'helpful',
  },
  {
    id: 'rtr-q2',
    section: 'reading-the-room',
    question: 'What body language should I use when asserting myself as a new apprentice?',
    answer:
      'Stand straight with shoulders back, maintain appropriate eye contact, and speak clearly at a measured pace. Avoid fidgeting, looking down, or speaking too quietly as these can undermine your credibility. Ask questions confidently and take notes visibly to demonstrate your engagement and commitment to learning.',
    tags: ['body language', 'confidence', 'apprentice'],
    priority: 'helpful',
  },
  {
    id: 'rtr-q3',
    section: 'reading-the-room',
    question: "What if I'm not sure whether banter crosses the line?",
    answer:
      "A good rule of thumb is to consider whether you'd be comfortable if the comment was said in front of your family, was recorded on video, or appeared in writing. If something makes you uncomfortable, it's likely problematic regardless of intent. Trust your instinct — if it feels wrong, it probably is.",
    tags: ['banter', 'boundaries', 'harassment'],
    priority: 'important',
  },
  {
    id: 'rtr-q4',
    section: 'reading-the-room',
    question: 'How do I fit in without participating in inappropriate jokes?',
    answer:
      "Focus on building relationships through shared interests, offering help on tasks, asking questions about others' expertise, and initiating positive conversations about sports, projects, or skills. Friendly banter can exist without crossing ethical lines — redirect conversations toward more inclusive topics when necessary.",
    tags: ['banter', 'fitting in', 'social'],
    priority: 'helpful',
  },
  {
    id: 'rtr-q5',
    section: 'reading-the-room',
    question: 'How should I react if a colleague looks unusually tired near dangerous equipment?',
    answer:
      'Approach with care and don\'t embarrass them. Something like "Would you like to take a quick break? I could use one myself. Maybe grab a coffee?" works well. If you\'re genuinely concerned about safety, discreetly mention it to the supervisor. Fatigue is a serious safety risk — the HSE reports it as a contributing factor in many workplace accidents.',
    tags: ['fatigue', 'safety', 'colleague'],
    priority: 'critical',
  },

  // ── Asking for Help ──────────────────────────────
  {
    id: 'afh-q1',
    section: 'asking-for-help',
    question: 'What if my supervisor gets annoyed when I ask questions?',
    answer:
      'Try to batch your questions instead of asking them one by one. Take notes throughout the day, and find an appropriate time to ask multiple questions at once. You can preface with "I\'ve been taking notes on things I need clarification on — is now a good time to go through them?" This shows you\'re organised and respectful of their time.',
    tags: ['supervisor', 'timing', 'questions'],
    priority: 'important',
  },
  {
    id: 'afh-q2',
    section: 'asking-for-help',
    question: "How do I remember complex instructions when there's a lot to take in?",
    answer:
      "Develop a consistent note-taking system that works for you — whether that's in a dedicated notebook, on your phone, or using voice memos (with permission). Take photos of complex installations or diagrams when appropriate. Immediately repeat back the most critical information to confirm understanding and help with retention.",
    tags: ['note-taking', 'memory', 'instructions'],
    priority: 'helpful',
  },
  {
    id: 'afh-q3',
    section: 'asking-for-help',
    question: "How do I ask for help when I've been shown something multiple times?",
    answer:
      'Be honest and suggest a different approach: "I\'m having trouble grasping this technique. Would it be possible to try a different approach, maybe with a diagram or by breaking it down further?" People learn differently — asking for a visual explanation when verbal hasn\'t worked shows self-awareness, not weakness.',
    tags: ['learning', 'techniques', 'honesty'],
    priority: 'helpful',
  },
  {
    id: 'afh-q4',
    section: 'asking-for-help',
    question: "What's the best way to confirm I've understood complex instructions?",
    answer:
      'Repeat them back: "Let me make sure I\'ve got this right. You\'d like me to first... then... Is that correct?" This technique catches misunderstandings before they become mistakes. For complex wiring tasks, walk through the diagram step by step before starting. It takes 30 seconds and can save hours of rework.',
    tags: ['confirmation', 'understanding', 'repeat-back'],
    priority: 'important',
  },

  // ── Cultural Awareness ───────────────────────────
  {
    id: 'ca-q1',
    section: 'cultural-awareness',
    question: "How do I correct someone's work when there's a language barrier?",
    answer:
      'Use visual demonstrations alongside simple, clear language. Focus on the work itself rather than the person. Use diagrams, photos, or hands-on demonstrations. Confirm understanding through having them repeat or demonstrate the technique. Avoid idioms, slang, or complex technical jargon when explaining corrections.',
    tags: ['language barrier', 'correction', 'visual'],
    priority: 'important',
  },
  {
    id: 'ca-q2',
    section: 'cultural-awareness',
    question: 'What if cultural differences are causing tension in the team?',
    answer:
      'Address issues proactively through team discussions about working styles and expectations. Create opportunities for team members to share their perspectives. Establish clear, consistent protocols that everyone understands. Focus on common goals and shared professional standards while acknowledging that there are multiple valid approaches to achieving them.',
    tags: ['tension', 'team', 'diversity'],
    priority: 'important',
  },
  {
    id: 'ca-q3',
    section: 'cultural-awareness',
    question: 'Why might a colleague avoid direct eye contact?',
    answer:
      'In many cultures, avoiding direct eye contact is a sign of respect, not disinterest or dishonesty. East Asian, South Asian, and many African cultures consider prolonged eye contact with authority figures to be disrespectful. Focus on their overall engagement and communication quality rather than judging by Western eye contact norms.',
    tags: ['eye contact', 'culture', 'respect'],
    priority: 'helpful',
  },
  {
    id: 'ca-q4',
    section: 'cultural-awareness',
    question: "How should I handle a colleague's religious observance needs?",
    answer:
      'Be supportive and plan around it: "Let me know what schedule works best for you. We can plan the work to accommodate your prayer times." Religious observance is protected by UK equality law. Treating it as a normal part of workplace planning — rather than a disruption — shows professionalism and creates a more inclusive team.',
    tags: ['religion', 'accommodation', 'equality'],
    priority: 'important',
  },

  // ── Professional Standards ───────────────────────
  {
    id: 'ps-q1',
    section: 'professional-standards',
    question: 'What does punctuality really mean on a building site?',
    answer:
      "It means arriving 10-15 minutes before the official start time so you're ready to work at the designated hour, not just walking through the gate. Use this time to check your tools, read any site notices, and prepare for the day. If you're going to be late, call ahead immediately — don't just turn up late with an excuse.",
    tags: ['punctuality', 'reliability', 'first impression'],
    priority: 'critical',
  },
  {
    id: 'ps-q2',
    section: 'professional-standards',
    question: 'How should I handle receiving critical feedback?',
    answer:
      "Listen without interrupting, thank the person for their feedback, and ask for specific examples if you need clarity. Avoid getting defensive — even if you disagree, consider the feedback objectively. Follow up afterwards to show you've taken it on board. The most successful apprentices are the ones who actively seek out feedback rather than avoiding it.",
    tags: ['feedback', 'growth', 'professionalism'],
    priority: 'important',
  },
  {
    id: 'ps-q3',
    section: 'professional-standards',
    question: "What's expected regarding PPE and appearance?",
    answer:
      "Clean, well-maintained PPE worn correctly at all times. Company uniform or appropriate workwear that's presentable. Tools and equipment properly maintained and organised. Personal hygiene standards maintained — you're working in close proximity to colleagues and sometimes in clients' homes. Your appearance reflects on your employer and the trade.",
    tags: ['PPE', 'appearance', 'professionalism'],
    priority: 'important',
  },
  {
    id: 'ps-q4',
    section: 'professional-standards',
    question: "What does 'showing initiative' actually mean as an apprentice?",
    answer:
      "It means tidying your work area without being asked, offering to help when you've finished a task, preparing materials for the next job, asking what you can learn next, and suggesting improvements when you spot them. It doesn't mean taking on tasks beyond your competence — always check before doing something new.",
    tags: ['initiative', 'proactive', 'learning'],
    priority: 'helpful',
  },
  {
    id: 'ps-q5',
    section: 'professional-standards',
    question: 'How do I build a good reputation in the electrical industry?',
    answer:
      'Consistency is key: be reliable, be honest about your abilities, deliver quality work, and treat everyone with respect. Word travels fast in this industry — your reputation on one site follows you to the next. The electricians who progress fastest are known for being safe, skilled, and easy to work with.',
    tags: ['reputation', 'career', 'consistency'],
    priority: 'helpful',
  },
];

// ── Scenarios (right/wrong approach) ───────────────────────────

export const scenarios: Scenario[] = [
  // ── Raising Concerns ─────────────────────────────
  {
    id: 'rc-s1',
    section: 'raising-concerns',
    situation: 'You notice another worker using a damaged power tool',
    rightApproach:
      '"Excuse me, I\'ve noticed that drill has some exposed wiring near the handle. Would you like me to help you find a replacement? I\'m concerned it might not be safe."',
    wrongApproach: '"That drill looks dangerous. You shouldn\'t be using it."',
  },
  {
    id: 'rc-s2',
    section: 'raising-concerns',
    situation: 'A supervisor asks you to work on a live circuit',
    rightApproach:
      '"I understand we\'re tight on schedule. The regulations require isolation before working on this circuit. I can isolate it quickly and still complete the work safely."',
    wrongApproach: '"That\'s against the rules. I\'m not doing that."',
  },
  {
    id: 'rc-s3',
    section: 'raising-concerns',
    situation: 'You see a colleague working at height without proper fall protection',
    rightApproach:
      '"Hey mate, I\'ve got a spare harness in the van. The regs require fall protection above 2 metres — we could both get in trouble if someone sees this."',
    wrongApproach: '"You\'re breaking the rules and being stupid. You\'ll fall and hurt yourself."',
  },
  {
    id: 'rc-s4',
    section: 'raising-concerns',
    situation: "Multiple safety violations are occurring on site but you're new",
    rightApproach:
      '"I\'ve noticed a few safety concerns around the site. Would it be possible to discuss these privately with you? I\'m just trying to understand the safety protocols here."',
    wrongApproach:
      "Staying silent because you're new, or publicly criticising the entire site's safety culture.",
  },
  {
    id: 'rc-s5',
    section: 'raising-concerns',
    situation: 'Asked to work at height without proper fall protection',
    rightApproach:
      '"I\'m not comfortable proceeding without the proper harness as required by the Work at Height Regulations. I can get the equipment from the van or help with ground tasks until it\'s available."',
    wrongApproach: '"That\'s too dangerous. I\'m not doing it."',
  },
  {
    id: 'rc-s6',
    section: 'raising-concerns',
    situation: 'Pressured to complete electrical work beyond your training level',
    rightApproach:
      '"This type of installation is outside my current qualification level. According to my apprenticeship agreement, I need supervision for this task. Can we arrange that?"',
    wrongApproach: "Attempting work you're not qualified for, or walking off without explanation.",
  },
  {
    id: 'rc-s7',
    section: 'raising-concerns',
    situation: 'Asked to use equipment you know is faulty',
    rightApproach:
      '"This equipment has a fault that could be dangerous. I can help source a replacement quickly so we don\'t fall behind schedule."',
    wrongApproach: 'Using it anyway despite the risk, or refusing without offering any solution.',
  },
  {
    id: 'rc-s8',
    section: 'raising-concerns',
    situation: 'Told to skip important safety tests to save time',
    rightApproach:
      '"I understand we\'re under time pressure, but these tests are required by BS 7671. If we skip them and something goes wrong, we could be legally liable. I can work through lunch to make up the time."',
    wrongApproach:
      'Silently skipping the tests to avoid confrontation, or creating a scene about being asked.',
  },
  {
    id: 'rc-s9',
    section: 'raising-concerns',
    situation: 'Supervisor insists you continue working in severe weather conditions',
    rightApproach:
      '"The lightning presents a significant risk while working with these metal components. The HSE guidelines recommend suspending work in these conditions. We could use this time to prep materials under cover for when it\'s safe to resume."',
    wrongApproach:
      'Simply leaving the site without explanation or continuing to work despite clear danger.',
  },

  // ── Reading the Room ─────────────────────────────
  {
    id: 'rtr-s1',
    section: 'reading-the-room',
    situation:
      "A colleague keeps checking their watch and sighing while you're explaining something",
    rightApproach:
      '"I notice we might be short on time. Would it help if I sent you these details in a text later?"',
    wrongApproach: 'Continue with a lengthy explanation ignoring their signals.',
  },
  {
    id: 'rtr-s2',
    section: 'reading-the-room',
    situation: 'Site manager has crossed arms and is frowning during your update',
    rightApproach: '"I\'d appreciate any feedback on how we could improve this approach."',
    wrongApproach: '"Why do you look so angry? I\'m just telling you how it is."',
  },
  {
    id: 'rtr-s3',
    section: 'reading-the-room',
    situation: 'A new team member stands apart from the group during breaks',
    rightApproach:
      'Approach them individually with a casual greeting: "First week on site? I\'m Dave — let me know if you need anything."',
    wrongApproach:
      "Publicly point out that they're being antisocial or assume they don't want to be part of the team.",
  },
  {
    id: 'rtr-s4',
    section: 'reading-the-room',
    situation: 'Someone appears frustrated with a complex installation task',
    rightApproach:
      '"That conduit run looks tricky. I had a similar one last week — mind if I show you a technique that helped me?"',
    wrongApproach: '"You\'re doing that wrong. Let me take over."',
  },
  {
    id: 'rtr-s5',
    section: 'reading-the-room',
    situation:
      'You notice a colleague looks unusually tired or distracted while working with dangerous equipment',
    rightApproach:
      '"Would you like to take a quick break? I could use one myself. Maybe grab a coffee?"',
    wrongApproach: 'Ignore the signs or publicly comment on their poor performance.',
  },
  {
    id: 'rtr-s6',
    section: 'reading-the-room',
    situation: 'Colleagues make jokes about your age or experience level',
    rightApproach:
      '"I know I\'m still learning, but I\'d appreciate the chance to prove myself without the commentary."',
    wrongApproach: 'Responding with insults or becoming visibly upset.',
  },
  {
    id: 'rtr-s7',
    section: 'reading-the-room',
    situation: "Someone makes discriminatory remarks disguised as 'just joking'",
    rightApproach: '"I don\'t find those kinds of jokes funny. Let\'s keep things professional."',
    wrongApproach: 'Laughing along to fit in despite being uncomfortable.',
  },
  {
    id: 'rtr-s8',
    section: 'reading-the-room',
    situation: 'Persistent teasing about a mistake you made weeks ago',
    rightApproach:
      '"I\'ve learned from that mistake and moved on. I\'d appreciate if we could focus on the current job now."',
    wrongApproach: 'Getting defensive or making excuses about the past mistake.',
  },
  {
    id: 'rtr-s9',
    section: 'reading-the-room',
    situation: "A colleague is being targeted with uncomfortable 'jokes' about their background",
    rightApproach:
      'Privately: "I noticed those comments earlier. Are you OK? I don\'t think that kind of talk is appropriate either."',
    wrongApproach: 'Joining in with the inappropriate comments to fit in with the group.',
  },
  {
    id: 'rtr-s10',
    section: 'reading-the-room',
    situation: 'Being pressured to participate in pranks that could be unsafe',
    rightApproach:
      '"That sounds like it could go wrong easily. I don\'t want to risk anyone getting hurt or in trouble."',
    wrongApproach:
      "Participating despite your concerns because you fear being labelled as 'no fun'.",
  },

  // ── Asking for Help ──────────────────────────────
  {
    id: 'afh-s1',
    section: 'asking-for-help',
    situation: 'A supervisor gives multiple complex instructions at once',
    rightApproach:
      '"Let me make sure I\'ve got this right. You\'d like me to first... then... Is that correct?"',
    wrongApproach: "Nodding and saying 'yes' despite confusion, then doing the task incorrectly.",
  },
  {
    id: 'afh-s2',
    section: 'asking-for-help',
    situation: "You're unfamiliar with a specialised tool or fitting",
    rightApproach:
      '"I haven\'t worked with this model before. Could you show me the correct way to use it, or point me to the manual?"',
    wrongApproach: 'Attempting to use it without guidance, risking damage or safety issues.',
  },
  {
    id: 'afh-s3',
    section: 'asking-for-help',
    situation: "Everyone is using technical terminology you don't understand",
    rightApproach:
      '"I\'m still learning some of the technical terms. Could you clarify what you mean by [term]?"',
    wrongApproach:
      'Staying silent and hoping to figure it out later, potentially missing crucial information.',
  },
  {
    id: 'afh-s4',
    section: 'asking-for-help',
    situation: "You've been shown a technique multiple times but still don't understand",
    rightApproach:
      '"I\'m having trouble grasping this technique. Would it be possible to try a different approach, maybe with a diagram or by breaking it down further?"',
    wrongApproach:
      'Pretending to understand to avoid looking slow or asking for the same explanation over and over.',
  },
  {
    id: 'afh-s5',
    section: 'asking-for-help',
    situation: "You're given a complex wiring diagram to follow",
    rightApproach:
      '"I\'d like to walk through this diagram step by step before I start. Could you confirm my understanding of this section here?"',
    wrongApproach: 'Proceeding without clarification and making assumptions about unclear parts.',
  },

  // ── Cultural Awareness ───────────────────────────
  {
    id: 'ca-s1',
    section: 'cultural-awareness',
    situation: "A colleague doesn't make direct eye contact during conversations",
    rightApproach:
      'Recognise this may be a sign of respect in their culture, not disinterest. Focus on their overall engagement and communication.',
    wrongApproach:
      "Assuming they're being dishonest or not paying attention because they don't meet Western eye contact expectations.",
  },
  {
    id: 'ca-s2',
    section: 'cultural-awareness',
    situation: 'Team member needs to take brief breaks for religious observance',
    rightApproach:
      '"Let me know what schedule works best for you. We can plan the work to accommodate your prayer times."',
    wrongApproach:
      "Making them feel uncomfortable about their religious practices or suggesting they're not committed to the job.",
  },
  {
    id: 'ca-s3',
    section: 'cultural-awareness',
    situation: 'Language barrier causes confusion about a technical instruction',
    rightApproach:
      '"Let me show you what I mean," then demonstrating the technique or drawing a diagram. Check understanding with follow-up questions.',
    wrongApproach:
      'Repeating the same instructions louder or using complicated terms, then getting frustrated.',
  },
  {
    id: 'ca-s4',
    section: 'cultural-awareness',
    situation: 'Different approaches to hierarchy and authority',
    rightApproach:
      'Explain the chain of command clearly while still encouraging questions and input regardless of seniority.',
    wrongApproach:
      'Becoming offended if someone from a hierarchical culture is very deferential, or if someone from an egalitarian culture is more direct.',
  },
  {
    id: 'ca-s5',
    section: 'cultural-awareness',
    situation: 'Differences in communication style (direct vs. indirect)',
    rightApproach:
      'Learn to recognise different styles. Some cultures value direct communication while others prefer indirect approaches to avoid potential conflict or loss of face.',
    wrongApproach:
      'Judging someone as rude for being direct, or as dishonest for being indirect, without understanding cultural context.',
  },
];

// ── Communication Scripts (poor/better/best) ───────────────────

export const communicationScripts: CommunicationScript[] = [
  {
    id: 'cs-1',
    section: 'communication',
    situation: 'Asking for help with a complex wiring task',
    poor: "I don't know what I'm doing, can you just do it for me?",
    better: "I'm struggling with this wiring task. Could you give me some guidance?",
    best: "Could you help me understand the correct approach for this wiring task? I want to make sure I'm doing it safely and to the right standard.",
  },
  {
    id: 'cs-2',
    section: 'communication',
    situation: "Reporting your morning's work progress",
    poor: "I'm working on it.",
    better: "I've done the first two circuits and I'm starting the third.",
    best: "I've completed the first two circuits. The third is taking longer due to access issues — should I continue or reassess?",
  },
  {
    id: 'cs-3',
    section: 'communication',
    situation: "Explaining a mistake you've noticed",
    poor: "That's wrong.",
    better: 'I think there might be an issue with this connection.',
    best: 'I think there might be a different approach we could consider here. The regulation suggests [specific reference] — would you like to take a look?',
  },
  {
    id: 'cs-4',
    section: 'communication',
    situation: 'Declining an unsafe task',
    poor: "I can't do it.",
    better: "I'm not comfortable doing that without proper safety measures.",
    best: "I'd like to discuss the best way to approach this task safely. The current setup doesn't meet the requirements in [regulation]. Here's what I suggest instead...",
  },
  {
    id: 'cs-5',
    section: 'communication',
    situation: "Responding to an instruction you don't understand",
    poor: 'Whatever.',
    better: 'Could you explain that again please?',
    best: "I want to make sure I get this right. Could you walk me through the steps? I'll take notes so I can refer back to them.",
  },
  {
    id: 'cs-6',
    section: 'communication',
    situation: 'Telling a client about additional work needed',
    poor: "It's broken. Pay more.",
    better: "There's extra work needed that wasn't originally quoted.",
    best: "I've identified an issue that needs attention. Let me explain the problem and the solution. There are additional requirements that weren't in the original scope — may I explain the necessary work?",
  },
  {
    id: 'cs-7',
    section: 'communication',
    situation: 'Addressing a safety concern about PPE',
    poor: "You're not wearing PPE.",
    better: 'I noticed you might need additional PPE for this task.',
    best: "I noticed we might need additional PPE for this task. Shall we check the requirements together? I want to make sure we're both covered.",
  },
  {
    id: 'cs-8',
    section: 'communication',
    situation: 'Discussing a messy work area',
    poor: 'This site is messy.',
    better: 'We should tidy up this area.',
    best: "Could we take a moment to improve the housekeeping in this area for safety? I'll start clearing the cable offcuts if you can sort the fixings.",
  },
];

// ── Terminology ────────────────────────────────────────────────

export const terminology: TermEntry[] = [
  // Common Abbreviations
  {
    id: 't-1',
    section: 'communication',
    category: 'Common Abbreviations',
    term: 'CU',
    meaning: 'Consumer Unit',
    usage: 'We need to upgrade the CU to meet current regulations',
  },
  {
    id: 't-2',
    section: 'communication',
    category: 'Common Abbreviations',
    term: 'RCD',
    meaning: 'Residual Current Device',
    usage: 'Test the RCD monthly by pressing the test button',
  },
  {
    id: 't-3',
    section: 'communication',
    category: 'Common Abbreviations',
    term: 'RCBO',
    meaning: 'Residual Current Breaker with Overload',
    usage: 'Install an RCBO for each circuit',
  },
  {
    id: 't-4',
    section: 'communication',
    category: 'Common Abbreviations',
    term: 'DB',
    meaning: 'Distribution Board',
    usage: 'Label all circuits clearly in the DB',
  },
  {
    id: 't-5',
    section: 'communication',
    category: 'Common Abbreviations',
    term: 'SWA',
    meaning: 'Steel Wire Armoured cable',
    usage: "We'll use SWA for the outdoor supply",
  },
  // Testing & Inspection
  {
    id: 't-6',
    section: 'communication',
    category: 'Testing & Inspection',
    term: 'IR',
    meaning: 'Insulation Resistance',
    usage: 'The IR test results are within acceptable limits',
  },
  {
    id: 't-7',
    section: 'communication',
    category: 'Testing & Inspection',
    term: 'EFLI',
    meaning: 'Earth Fault Loop Impedance',
    usage: 'Record the EFLI values for each circuit',
  },
  {
    id: 't-8',
    section: 'communication',
    category: 'Testing & Inspection',
    term: 'R1+R2',
    meaning: 'Live + Earth continuity',
    usage: 'The R1+R2 readings confirm good continuity',
  },
  {
    id: 't-9',
    section: 'communication',
    category: 'Testing & Inspection',
    term: 'PFC',
    meaning: 'Prospective Fault Current',
    usage: 'Check the PFC at the origin of the installation',
  },
  {
    id: 't-10',
    section: 'communication',
    category: 'Testing & Inspection',
    term: 'Zs',
    meaning: 'Earth Loop Impedance',
    usage: 'Zs values must not exceed the maximum permitted',
  },
  // Site Language
  {
    id: 't-11',
    section: 'communication',
    category: 'Site Language',
    term: 'First fix',
    meaning: 'Initial electrical installation before plastering',
    usage: 'Complete first fix before plasterboarding',
  },
  {
    id: 't-12',
    section: 'communication',
    category: 'Site Language',
    term: 'Second fix',
    meaning: 'Final electrical installation after plastering',
    usage: 'Second fix includes fitting accessories and testing',
  },
  {
    id: 't-13',
    section: 'communication',
    category: 'Site Language',
    term: 'Snagging',
    meaning: 'Fixing minor defects before handover',
    usage: "There's a snagging list to complete before handover",
  },
  {
    id: 't-14',
    section: 'communication',
    category: 'Site Language',
    term: 'Making good',
    meaning: 'Repairing surfaces after installation',
    usage: 'Make good any damage to walls after cable installation',
  },
  {
    id: 't-15',
    section: 'communication',
    category: 'Site Language',
    term: 'Pulling cables',
    meaning: 'Installing cables through containment',
    usage: 'Start pulling cables for the ground floor circuits',
  },
];

// ── Regional Information ───────────────────────────────────────

export const regionalInfo: RegionalInfo[] = [
  {
    id: 'ri-1',
    section: 'cultural-awareness',
    region: 'London & South East',
    characteristics: [
      'Fast-paced working environment',
      'More formal communication style',
      'Higher client expectations',
      'Diverse multicultural teams',
    ],
    commonPhrases: ["Right, let's crack on", 'Cheers mate', "I'll ping you an email"],
    workingHours: '7:30 AM - 4:30 PM typically',
    breakCulture: 'Quick lunch breaks, tea breaks important',
    keyTips: [
      'Be punctual — traffic delays not accepted',
      'Dress smartly for client-facing work',
      'Be prepared for longer commutes',
    ],
  },
  {
    id: 'ri-2',
    section: 'cultural-awareness',
    region: 'Scotland',
    characteristics: [
      'Strong emphasis on craftsmanship',
      'Team-oriented approach',
      'Respect for experience and tradition',
      'Direct but friendly communication',
    ],
    commonPhrases: ["How's it going?", 'Aye, no bother', "That's you sorted"],
    workingHours: '8:00 AM - 5:00 PM typically',
    breakCulture: 'Longer lunch breaks, morning tea ritual',
    keyTips: [
      'Weather preparedness essential',
      'Respect for hierarchical structure',
      'Community approach to problem-solving',
    ],
  },
  {
    id: 'ri-3',
    section: 'cultural-awareness',
    region: 'Northern England',
    characteristics: [
      'Straightforward communication',
      'Strong work ethic',
      'Emphasis on practical solutions',
      'Friendly workplace banter',
    ],
    commonPhrases: ['Alreet mate', 'Get cracking', "That'll do nicely"],
    workingHours: '7:45 AM - 4:45 PM typically',
    breakCulture: 'Proper breakfast culture, mid-morning breaks',
    keyTips: [
      'Be ready for direct feedback',
      'Appreciate local industrial heritage',
      'Weather-resistant work attitude',
    ],
  },
  {
    id: 'ri-4',
    section: 'cultural-awareness',
    region: 'Wales',
    characteristics: [
      'Close-knit working relationships',
      'Bilingual considerations',
      'Strong community connections',
      'Methodical approach to work',
    ],
    commonPhrases: ['Shwmae', 'Tidy job', 'Fair play to you'],
    workingHours: '8:00 AM - 5:00 PM typically',
    breakCulture: 'Social break times, rugby talk common',
    keyTips: [
      'Respect Welsh language when present',
      'Community reputation matters',
      'Seasonal work variations common',
    ],
  },
];

// ── Industry Types ─────────────────────────────────────────────

export const industryTypes: IndustryType[] = [
  {
    id: 'it-1',
    section: 'cultural-awareness',
    sector: 'Domestic Electrical',
    culture: 'Customer service focused, neat appearance crucial, explaining work to homeowners',
    communication: 'Patient, clear explanations, avoiding technical jargon',
    challenges: 'Managing client expectations, working in occupied homes',
  },
  {
    id: 'it-2',
    section: 'cultural-awareness',
    sector: 'Commercial Projects',
    culture: 'Team coordination, meeting deadlines, corporate environment awareness',
    communication: 'Professional emails, site meeting participation, progress reporting',
    challenges: 'Multiple trades coordination, client business operations',
  },
  {
    id: 'it-3',
    section: 'cultural-awareness',
    sector: 'Industrial Settings',
    culture: 'Safety-first mentality, shift work patterns, machinery integration',
    communication: 'Clear, concise radio communication, technical documentation',
    challenges: '24/7 operations, critical system dependencies',
  },
  {
    id: 'it-4',
    section: 'cultural-awareness',
    sector: 'New Build Construction',
    culture: 'Fast-paced, deadline-driven, multi-trade environment',
    communication: 'Quick decisions, progress updates, problem escalation',
    challenges: 'Weather dependency, programme changes, material logistics',
  },
];

// ── Professional Tips (checklist items) ────────────────────────

export const professionalTips: ProfessionalTip[] = [
  {
    id: 'pt-1',
    section: 'professional-standards',
    area: 'Punctuality & Reliability',
    description: 'Being on time and consistent in your work habits',
    expectations: [
      'Arrive 10-15 minutes early',
      'Call ahead if running late',
      'Maintain consistent work quality',
      'Follow through on commitments',
    ],
  },
  {
    id: 'pt-2',
    section: 'professional-standards',
    area: 'Safety Communication',
    description: 'Speaking up about safety concerns and following protocols',
    expectations: [
      'Report hazards immediately',
      'Use proper safety terminology',
      'Ask questions about unfamiliar procedures',
      'Never compromise on safety for speed',
    ],
  },
  {
    id: 'pt-3',
    section: 'professional-standards',
    area: 'Professional Appearance',
    description: 'Maintaining appropriate dress and presentation standards',
    expectations: [
      'Clean, well-maintained PPE',
      'Company uniform worn correctly',
      'Personal hygiene standards',
      'Tools and equipment properly maintained',
    ],
  },
  {
    id: 'pt-4',
    section: 'professional-standards',
    area: 'Work Ethic & Attitude',
    description: 'Demonstrating commitment and positive approach to learning',
    expectations: [
      'Show enthusiasm for learning',
      'Take initiative when appropriate',
      'Accept feedback positively',
      'Support team goals',
    ],
  },
  {
    id: 'pt-5',
    section: 'professional-standards',
    area: 'Client Interactions',
    description: 'Representing your company professionally when dealing with customers',
    expectations: [
      'Always be polite and professional',
      'Know when to refer to supervisor',
      'Keep clients informed of progress',
      "Respect the client's property and privacy",
    ],
  },
  {
    id: 'pt-6',
    section: 'professional-standards',
    area: 'Continuous Learning',
    description: 'Staying current with regulations and developing new skills',
    expectations: [
      'Keep up with regulation changes',
      'Attend available training courses',
      'Learn from experienced colleagues',
      'Take notes and review them regularly',
    ],
  },
];

// ── Quiz Questions (15+ for randomised 10-question quiz) ──────

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'quiz-1',
    question: "What's the most appropriate way to greet a new colleague on a UK construction site?",
    options: [
      "A firm handshake and 'Good morning'",
      'A casual wave from across the site',
      'Wait for them to approach you first',
      'Just nod and continue working',
    ],
    correctIndex: 0,
    explanation:
      'A firm handshake with a polite greeting shows professionalism and respect in UK workplace culture. It sets a positive tone for the working relationship.',
  },
  {
    id: 'quiz-2',
    question: "When having tea breaks on site, what's considered good etiquette?",
    options: [
      'Take breaks whenever you want',
      "Offer to make tea for others when it's your turn",
      "Always bring your own tea and don't share",
      'Skip tea breaks to show dedication',
    ],
    correctIndex: 1,
    explanation:
      "Taking turns to make tea for the team is a traditional part of UK workplace culture that builds camaraderie. It's one of the easiest ways to be accepted on a new site.",
  },
  {
    id: 'quiz-3',
    question: 'You notice a safety hazard on site. What should you do first?',
    options: [
      "Ignore it — it's not your responsibility",
      'Post about it on social media',
      'Report it to your supervisor with specific details',
      'Wait to see if someone else notices',
    ],
    correctIndex: 2,
    explanation:
      "Reporting safety hazards is everyone's responsibility. Being specific about the issue, location, and relevant regulations helps your supervisor act quickly.",
  },
  {
    id: 'quiz-4',
    question:
      "A colleague is making discriminatory comments disguised as 'banter'. What's the best response?",
    options: [
      'Laugh along to fit in',
      '"I don\'t find those kinds of jokes funny. Let\'s keep things professional."',
      'Report them anonymously without saying anything',
      'Make a similar joke back',
    ],
    correctIndex: 1,
    explanation:
      'Setting a clear, professional boundary is the most effective first step. It addresses the behaviour directly while maintaining workplace relationships.',
  },
  {
    id: 'quiz-5',
    question: "What does 'first fix' mean in the electrical trade?",
    options: [
      'Repairing a fault for the first time',
      'Initial electrical installation before plastering',
      'The first day on a new job',
      'Testing circuits for the first time',
    ],
    correctIndex: 1,
    explanation:
      'First fix refers to the initial electrical installation work done before plastering and decorating, including running cables and installing back boxes.',
  },
  {
    id: 'quiz-6',
    question:
      "Your supervisor gives you complex instructions you don't fully understand. What should you do?",
    options: [
      'Nod and figure it out as you go',
      'Repeat the instructions back to confirm your understanding',
      'Ask a colleague instead of the supervisor',
      'Wait until you make a mistake then ask',
    ],
    correctIndex: 1,
    explanation:
      "Repeating instructions back catches misunderstandings before they become mistakes. It takes 30 seconds and shows you're engaged and thorough.",
  },
  {
    id: 'quiz-7',
    question: 'Why might a colleague from another culture avoid direct eye contact?',
    options: [
      "They're being dishonest",
      "They're not interested in the conversation",
      'In many cultures, this is a sign of respect',
      'They have poor social skills',
    ],
    correctIndex: 2,
    explanation:
      'In many cultures worldwide, avoiding direct eye contact with authority figures or in certain situations is a sign of respect, not disinterest.',
  },
  {
    id: 'quiz-8',
    question: "You're asked to skip electrical tests to save time. What's the correct response?",
    options: [
      "Do as you're told — the supervisor knows best",
      'Skip the tests but document that you were told to',
      'Explain that the tests are required by BS 7671 and offer to work faster elsewhere',
      'Just do the tests anyway without telling anyone',
    ],
    correctIndex: 2,
    explanation:
      'Tests required by BS 7671 are legal requirements. Explaining this professionally while offering alternatives shows both knowledge and teamwork.',
  },
  {
    id: 'quiz-9',
    question: "What's the recommended way to handle receiving critical feedback?",
    options: [
      'Get defensive and explain why you did it that way',
      'Listen without interrupting, thank the person, and ask for specific examples',
      'Agree with everything to avoid conflict',
      "Ignore it — you know what you're doing",
    ],
    correctIndex: 1,
    explanation:
      'The most successful apprentices actively seek out feedback. Listening, thanking, and asking for specifics shows maturity and a genuine desire to improve.',
  },
  {
    id: 'quiz-10',
    question: "What does 'making good' mean on site?",
    options: [
      'Doing a good job',
      'Making friends with colleagues',
      'Repairing surfaces after installation work',
      'Arriving early to make a good impression',
    ],
    correctIndex: 2,
    explanation:
      "Making good means repairing any damage to walls, ceilings, or surfaces caused during electrical installation work. It's about leaving the site clean and tidy.",
  },
  {
    id: 'quiz-11',
    question: 'A client asks you a question about costs. How should you respond?',
    options: [
      'Give them a rough estimate to be helpful',
      '"That\'s a great question — let me check with my supervisor and get back to you with accurate information."',
      "Tell them it's not your department",
      'Make up a number that sounds reasonable',
    ],
    correctIndex: 1,
    explanation:
      'As an apprentice, you should never make promises about costs. Referring to your supervisor shows professionalism and prevents misunderstandings.',
  },
  {
    id: 'quiz-12',
    question: 'What does showing initiative as an apprentice look like?',
    options: [
      'Taking on complex tasks without supervision',
      'Tidying your work area, preparing materials, and asking what to learn next',
      'Telling experienced electricians better ways to do things',
      'Working through breaks to impress the boss',
    ],
    correctIndex: 1,
    explanation:
      "Initiative means being proactive within your competence level — tidying up, preparing, and showing eagerness to learn. It doesn't mean exceeding your qualification level.",
  },
  {
    id: 'quiz-13',
    question:
      "A team member needs short breaks for religious observance. What's the appropriate attitude?",
    options: [
      'They should do it on their own time',
      'Plan the work schedule to accommodate their needs',
      "It's unfair to the rest of the team",
      'They should keep it private',
    ],
    correctIndex: 1,
    explanation:
      'Religious observance is protected by UK equality law. Treating it as a normal part of workplace planning shows professionalism and creates an inclusive team.',
  },
  {
    id: 'quiz-14',
    question: "What's the best time to arrive on a building site?",
    options: [
      'Exactly on time',
      '10-15 minutes before the official start',
      '30 minutes early to make an impression',
      "It doesn't matter as long as you finish your work",
    ],
    correctIndex: 1,
    explanation:
      "Arriving 10-15 minutes early means you're ready to work at the start time. Use this time to check tools, read site notices, and prepare for the day.",
  },
  {
    id: 'quiz-15',
    question: "What does 'CU' stand for in the electrical trade?",
    options: ['Cable Unit', 'Consumer Unit', 'Current Unit', 'Copper Utility'],
    correctIndex: 1,
    explanation:
      'CU stands for Consumer Unit — the main distribution board in a domestic property that houses circuit breakers and RCDs.',
  },
  {
    id: 'quiz-16',
    question: 'Which communication method is best for reporting a safety issue?',
    options: [
      'Send a text message',
      'Face-to-face with your supervisor',
      'Email at the end of the day',
      'Mention it at the next team meeting',
    ],
    correctIndex: 1,
    explanation:
      'Safety issues require immediate face-to-face communication. This ensures the message is received, understood, and acted upon straight away.',
  },
  {
    id: 'quiz-17',
    question:
      "What's the best way to handle a misunderstanding with a colleague from a different cultural background?",
    options: [
      'Avoid them to prevent further conflict',
      "Assume they're wrong and you're right",
      "Have a calm, private conversation to understand each other's perspective",
      'Report it to HR immediately',
    ],
    correctIndex: 2,
    explanation:
      'Most cultural misunderstandings are resolved through open, respectful conversation. Seeking to understand before being understood builds stronger working relationships.',
  },
];

// ── Contacts ───────────────────────────────────────────────────

export const contacts: Contact[] = [
  {
    id: 'ct-1',
    name: 'ACAS (Advisory, Conciliation and Arbitration Service)',
    description: 'Free workplace relations advice and guidance for employees and employers',
    phone: '0300 123 1100',
    website: 'https://www.acas.org.uk',
    availability: 'Monday-Friday 8am-6pm',
    category: 'support',
  },
  {
    id: 'ct-2',
    name: 'JIB (Joint Industry Board)',
    description: 'Electrical industry employment standards, grading, and dispute resolution',
    phone: '020 7313 4800',
    website: 'https://www.jib.org.uk',
    availability: 'Monday-Friday 9am-5pm',
    category: 'industry',
  },
  {
    id: 'ct-3',
    name: "ECA (Electrical Contractors' Association)",
    description: 'Industry support, technical guidance, and contractor representation',
    phone: '020 7313 4800',
    website: 'https://www.eca.co.uk',
    availability: 'Monday-Friday 9am-5pm',
    category: 'industry',
  },
  {
    id: 'ct-4',
    name: 'Citizens Advice',
    description: 'Free, independent advice on workplace rights, discrimination, and employment law',
    phone: '0800 144 8848',
    website: 'https://www.citizensadvice.org.uk',
    availability: 'Monday-Friday 9am-5pm',
    category: 'support',
  },
  {
    id: 'ct-5',
    name: 'Health and Safety Executive (HSE)',
    description: 'Report unsafe working conditions and get safety guidance',
    phone: '0300 003 1747',
    website: 'https://www.hse.gov.uk',
    availability: 'Monday-Friday 8:30am-5pm',
    category: 'support',
  },
  {
    id: 'ct-6',
    name: 'Unite the Union',
    description: "UK's largest trade union covering electrical workers and apprentices",
    phone: '020 7611 2500',
    website: 'https://www.unitetheunion.org',
    availability: 'Monday-Friday 9am-5pm',
    category: 'support',
  },
];
