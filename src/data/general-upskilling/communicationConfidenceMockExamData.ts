/**
 * Communication & Confidence Mock Exam Question Bank
 *
 * 200 questions covering all 5 categories with difficulty distribution.
 *
 * Categories (5):
 *   Understanding Communication (40) | Listening & Understanding Others (40) |
 *   Speaking with Confidence (40) | Professional Writing & Digital Communication (40) |
 *   Negotiation, Persuasion & Difficult Conversations (40)
 *
 * Difficulty per category: ~40% basic, ~40% intermediate, ~20% advanced
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export const communicationConfidenceCategories = [
  'Understanding Communication',
  'Listening & Understanding Others',
  'Speaking with Confidence',
  'Professional Writing & Digital Communication',
  'Negotiation, Persuasion & Difficult Conversations',
];

// ---------------------------------------------------------------------------
// Exam configuration
// ---------------------------------------------------------------------------
export const communicationConfidenceMockExamConfig: MockExamConfig = {
  examId: 'communication-confidence',
  examTitle: 'Communication & Confidence Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800, // 30 minutes
  passThreshold: 80,
  exitPath: '/study-centre/personal-development/cc-module-6',
  categories: communicationConfidenceCategories,
};

// ---------------------------------------------------------------------------
// Random question selector
// ---------------------------------------------------------------------------
export const getRandomCCExamQuestions = (numQuestions: number = 20) => {
  return getRandomQuestionsBalanced(
    communicationConfidenceQuestionBank,
    numQuestions,
    communicationConfidenceCategories
  );
};

// ---------------------------------------------------------------------------
// Question Bank — 200 questions
// ---------------------------------------------------------------------------
export const communicationConfidenceQuestionBank: StandardMockQuestion[] = [
  // =======================================================================
  // UNDERSTANDING COMMUNICATION — 40 questions (id 1-40)
  // =======================================================================

  // ===== BASIC (id 1-16) =====
  {
    id: 1,
    question: 'In the Shannon-Weaver model of communication, what is the role of the "encoder"?',
    options: [
      'To provide feedback to the sender after receiving it',
      "To convert the sender's message into a transmittable signal",
      'To receive the signal and interpret the intended meaning of it',
      'To add background noise to the channel during transit',
    ] as const,
    correctAnswer: 1,
    explanation:
      "In the Shannon-Weaver model (1949), the encoder converts the sender's intended message into a signal suitable for transmission through a channel. For example, when speaking, the vocal cords and mouth act as the encoder, turning thoughts into sound waves.",
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'Shannon-Weaver model',
    category: 'Understanding Communication' as const,
  },
  {
    id: 2,
    question:
      'Which of the following is a key component of the Shannon-Weaver communication model?',
    options: [
      'Self-awareness',
      'Empathy',
      'Noise',
      'Motivation',
    ] as const,
    correctAnswer: 2,
    explanation:
      'The Shannon-Weaver model identifies noise as any interference that distorts or disrupts the message during transmission. This can be physical noise (machinery on site), semantic noise (jargon misunderstanding), or psychological noise (preoccupation or stress).',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'Shannon-Weaver model',
    category: 'Understanding Communication' as const,
  },
  {
    id: 3,
    question: 'What does the term "channel" refer to in the Shannon-Weaver model?',
    options: [
      'The mental process the receiver uses to interpret the message received',
      'The original idea that the sender first intends to communicate',
      'Any interference that distorts or delays the message while in transit',
      'The medium through which a message travels from sender to receiver',
    ] as const,
    correctAnswer: 3,
    explanation:
      'The channel is the medium or pathway through which the encoded message travels. On a construction site this could be face-to-face speech, a two-way radio, a written method statement, or an email. Choosing the right channel affects how clearly the message is received.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'Shannon-Weaver model',
    category: 'Understanding Communication' as const,
  },
  {
    id: 4,
    question:
      'According to ILM Level 2 guidance, which of the following best describes effective workplace communication?',
    options: [
      'Ensuring the intended message is received, understood, and acted upon correctly',
      'Using precise technical language in order to demonstrate expertise to the listener',
      'Speaking loudly and clearly so that everybody present on the site is able to hear you',
      'Sending a written confirmation of every single conversation that takes place on site',
    ] as const,
    correctAnswer: 0,
    explanation:
      'ILM Level 2 defines effective communication as ensuring the message is not only transmitted but also received, understood, and acted upon as intended. This goes beyond simply delivering information and requires the communicator to check understanding and adapt their approach.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'ILM Level 2',
    category: 'Understanding Communication' as const,
  },
  {
    id: 5,
    question:
      'Which psychologist developed Transactional Analysis (TA) and the concept of ego states?',
    options: [
      'Albert Mehrabian',
      'Eric Berne',
      'Carl Rogers',
      'Abraham Maslow',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Eric Berne developed Transactional Analysis in the 1950s and 1960s. His model identifies three ego states (Parent, Adult, Child) that people shift between during interactions, and understanding these helps explain why communication sometimes breaks down.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'Eric Berne TA',
    category: 'Understanding Communication' as const,
  },
  {
    id: 6,
    question: "In Eric Berne's Transactional Analysis, what are the three ego states?",
    options: [
      'Assertive, Passive, and Aggressive',
      'Sender, Receiver, and Observer',
      'Parent, Adult, and Child',
      'Conscious, Subconscious, and Unconscious',
    ] as const,
    correctAnswer: 2,
    explanation:
      "Berne's three ego states are Parent (learned attitudes and behaviours from authority figures), Adult (rational, here-and-now thinking), and Child (feelings and impulses from early experiences). Effective workplace communication typically operates from the Adult ego state.",
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'Eric Berne TA',
    category: 'Understanding Communication' as const,
  },
  {
    id: 7,
    question:
      'What does the acronym SOLER stand for in the context of communication body language?',
    options: [
      'Stand upright, Open arms, Look directly, Evaluate, then React clearly',
      'Sit down, Observe closely, Listen carefully, Engage, then Respond',
      'Stay calm, Organise your thoughts, Listen carefully, Express clearly, Review',
      'Squarely face the person, Open posture, Lean forward, Eye contact, Relax',
    ] as const,
    correctAnswer: 3,
    explanation:
      'SOLER is a framework developed by Gerard Egan to describe attentive body language: Squarely face the person, adopt an Open posture, Lean slightly forward to show interest, maintain appropriate Eye contact, and Relax to appear approachable. This non-verbal framework supports active listening.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'SOLER model',
    category: 'Understanding Communication' as const,
  },
  {
    id: 8,
    question:
      'Which of these is an example of "noise" in the Shannon-Weaver model on a construction site?',
    options: [
      'A power drill running while a colleague explains a task',
      'A colleague repeating an instruction back to confirm understanding',
      'A clearly written method statement handed over before the task',
      'A supervisor choosing a quiet location for a safety briefing',
    ] as const,
    correctAnswer: 0,
    explanation:
      'A power drill running during a verbal explanation is physical noise that interferes with the signal between sender and receiver. The Shannon-Weaver model recognises that noise at any point in the channel can distort the message and lead to miscommunication, which is a genuine safety risk on site.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'Shannon-Weaver model',
    category: 'Understanding Communication' as const,
  },
  {
    id: 9,
    question: 'What is the primary purpose of an "I-message" in workplace communication?',
    options: [
      'To assign clear responsibility for a mistake to the person who actually made it',
      'To express feelings and needs without blaming or accusing the other person',
      'To soften a request so that the other person feels no obligation to act',
      'To restate the point made by the other person in your own words to confirm it',
    ] as const,
    correctAnswer: 1,
    explanation:
      'I-messages (e.g., "I feel concerned when safety procedures aren\'t followed because someone could get hurt") express the speaker\'s feelings and needs without placing blame. This reduces defensiveness and keeps communication constructive, making them particularly valuable during site disagreements.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'I-messages',
    category: 'Understanding Communication' as const,
  },
  {
    id: 10,
    question:
      'Which communication style involves expressing your own needs while also respecting the needs of others?',
    options: [
      'Passive',
      'Aggressive',
      'Assertive',
      'Passive-aggressive',
    ] as const,
    correctAnswer: 2,
    explanation:
      "Assertive communication involves clearly expressing your own thoughts, feelings, and needs while simultaneously respecting the rights and needs of others. It is distinct from aggressive (disregarding others' needs), passive (neglecting your own needs), and passive-aggressive (indirectly expressing dissatisfaction) styles.",
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'communication styles',
    category: 'Understanding Communication' as const,
  },
  {
    id: 11,
    question: 'What is the main limitation of one-way communication?',
    options: [
      'It takes significantly longer to deliver than any form of two-way communication does',
      'It can only ever be used for written messages, and never for spoken ones on site',
      'It requires specialist equipment that is rarely available on a busy building site',
      'There is no opportunity for the receiver to ask questions or provide feedback',
    ] as const,
    correctAnswer: 3,
    explanation:
      'One-way communication (such as a written notice or a tannoy announcement) does not allow the receiver to seek clarification or confirm understanding. Without a feedback loop, misunderstandings are more likely and the sender cannot verify that the message has been correctly interpreted.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'communication styles',
    category: 'Understanding Communication' as const,
  },
  {
    id: 12,
    question: 'Which of the following is an example of a physical barrier to communication?',
    options: [
      'Loud machinery on a building site',
      'Using overly technical jargon',
      'Having a personal dislike of a colleague',
      'Being distracted by worry about a deadline',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Physical barriers are environmental factors that prevent or distort message transmission. Loud machinery is a classic physical barrier on construction sites. Jargon is a semantic/language barrier, personal dislike is an attitudinal barrier, and worry is a psychological barrier.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'barrier framework',
    category: 'Understanding Communication' as const,
  },
  {
    id: 13,
    question:
      'Under CDM 2015, which duty holder has a specific duty to ensure that relevant information is communicated to all workers on site?',
    options: [
      'The Domestic Client',
      'The Principal Contractor',
      'The Principal Designer',
      'The Health and Safety Executive',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Under the Construction (Design and Management) Regulations 2015, the Principal Contractor has a duty to ensure that relevant safety and health information is communicated to all workers. This includes site rules, emergency procedures, and relevant risk information. Clear communication is a legal obligation, not just good practice.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'CDM 2015',
    category: 'Understanding Communication' as const,
  },
  {
    id: 14,
    question:
      'What type of communication barrier is created when a supervisor uses highly technical electrical terminology with a new apprentice?',
    options: [
      'A physical or environmental barrier',
      'A physiological or sensory barrier',
      'A semantic or language barrier',
      'A psychological or emotional barrier',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Using jargon or technical language that the receiver does not understand creates a semantic (language) barrier. On site, experienced electricians should adapt their language when communicating with apprentices or other trades to ensure the message is understood.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'barrier framework',
    category: 'Understanding Communication' as const,
  },
  {
    id: 15,
    question: 'In workplace communication, what does "feedback" primarily help to achieve?',
    options: [
      'A permanent written record of every single instruction that is given on site',
      'A faster delivery of the message to a much larger number of people',
      'A reduction in the amount of technical detail that the sender needs to include',
      'Confirmation that the message has been received and understood as intended',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Feedback closes the communication loop by allowing the sender to verify that their message was received and understood correctly. On site, this might be as simple as asking "Can you repeat back what I just asked you to do?" — a practice that significantly reduces errors and safety incidents.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'communication styles',
    category: 'Understanding Communication' as const,
  },
  {
    id: 16,
    question: 'Which of the following best describes "passive" communication?',
    options: [
      'Avoiding expressing your own opinions or needs to prevent conflict',
      'Expressing your views forcefully without regard for others',
      'Clearly stating your position while respecting the position of others',
      'Saying one thing but clearly meaning something else entirely',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Passive communication involves failing to express honest feelings, needs, or opinions, often to avoid conflict. In a workplace context, this can be dangerous — for example, an apprentice who passively agrees they understand a task when they actually do not could create a safety risk.',
    section: 'Understanding Communication',
    difficulty: 'basic' as const,
    topic: 'communication styles',
    category: 'Understanding Communication' as const,
  },

  // ===== INTERMEDIATE (id 17-32) =====
  {
    id: 17,
    question: 'In Transactional Analysis, a "crossed transaction" occurs when:',
    options: [
      'The sender uses verbal and non-verbal signals at the same time, giving the receiver two conflicting messages',
      'The response comes from a different ego state than the one addressed, causing communication breakdown',
      'Two people speak at the same time and interrupt each other repeatedly throughout the conversation',
      'A message is sent through the wrong communication channel and therefore never reaches the intended receiver',
    ] as const,
    correctAnswer: 1,
    explanation:
      'In Berne\'s Transactional Analysis, a crossed transaction happens when a message aimed at one ego state receives a response from a different one. For example, an Adult-to-Adult request ("Can you check that circuit?") met with a Child response ("You\'re always picking on me!") creates a crossed transaction and communication breakdown.',
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'Eric Berne TA',
    category: 'Understanding Communication' as const,
  },
  {
    id: 18,
    question: "Albert Mehrabian's 7-38-55 rule applies specifically to communication about:",
    options: [
      'Technical instructions in which the precise wording carries nearly all the meaning',
      'All written communication, such as emails, job sheets, and formal method statements',
      'Feelings and attitudes when the verbal and non-verbal messages are incongruent',
      'Any face-to-face conversation at all, regardless of the subject matter being discussed',
    ] as const,
    correctAnswer: 2,
    explanation:
      "Mehrabian's research found that when communicating feelings and attitudes, and when verbal and non-verbal cues are inconsistent (incongruent), the receiver relies on words for only 7%, tone of voice for 38%, and body language for 55%. This rule does NOT apply to all communication — it is specific to the expression of feelings and attitudes with incongruent messages.",
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'Mehrabian 7-38-55',
    category: 'Understanding Communication' as const,
  },
  {
    id: 19,
    question:
      'According to Mehrabian\'s research, when someone says "I\'m fine" with a frown and flat tone, which element do receivers rely on most to interpret the true feeling?',
    options: [
      'The context of the conversation (100%)',
      'The words spoken (7%)',
      'The tone of voice (38%)',
      'Body language (55%)',
    ] as const,
    correctAnswer: 3,
    explanation:
      'When there is incongruence between verbal and non-verbal signals about feelings and attitudes, Mehrabian found that body language accounts for 55% of the message received, tone of voice for 38%, and the actual words for only 7%. In this example, the frown contradicts "I\'m fine," so the receiver trusts the body language over the words.',
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'Mehrabian 7-38-55',
    category: 'Understanding Communication' as const,
  },
  {
    id: 20,
    question:
      "Why is it incorrect to apply Mehrabian's 7-38-55 rule to a toolbox talk about electrical safety procedures?",
    options: [
      'Because the rule only applies to the communication of feelings and attitudes with incongruent messages, not to factual information',
      'Because the rule only applies when the speaker and the listener come from different trades and use very different vocabulary',
      'Because the rule was developed for written communication such as emails and site notices, rather than for spoken briefings',
      'Because the rule states that the words themselves carry 55% of the meaning in any spoken message, so the wording matters least of all',
    ] as const,
    correctAnswer: 0,
    explanation:
      "Mehrabian's 7-38-55 finding was derived from experiments about communicating feelings and attitudes where verbal and non-verbal cues were inconsistent. It was never intended to apply to factual, technical communication. Applying it to a safety briefing would be a misuse of the research — in a toolbox talk, the actual words (content) are critically important.",
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'Mehrabian 7-38-55',
    category: 'Understanding Communication' as const,
  },
  {
    id: 21,
    question:
      'In Transactional Analysis, which type of transaction is most likely to produce effective, adult workplace communication?',
    options: [
      'A crossed Parent-to-Child transaction',
      'A complementary Adult-to-Adult transaction',
      'An ulterior Child-to-Child transaction',
      'A complementary Parent-to-Child transaction',
    ] as const,
    correctAnswer: 1,
    explanation:
      'A complementary Adult-to-Adult transaction is the most productive for workplace communication. Both parties are operating rationally, dealing with facts and current reality, and respecting each other as equals. This ego state pairing minimises emotional reactions and keeps discussions focused on problem-solving.',
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'Eric Berne TA',
    category: 'Understanding Communication' as const,
  },
  {
    id: 22,
    question:
      'An electrician tells an apprentice, "You should know better than to wire it like that!" Which ego state is the electrician communicating from?',
    options: [
      'Free Child',
      'Adult',
      'Critical Parent',
      'Nurturing Parent',
    ] as const,
    correctAnswer: 2,
    explanation:
      'The statement "You should know better" is judgemental and disapproving, characteristic of the Critical Parent ego state. A more effective approach would be to communicate from the Adult state: "The wiring needs to be changed because..." — this provides useful information without triggering a defensive Child response.',
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'Eric Berne TA',
    category: 'Understanding Communication' as const,
  },
  {
    id: 23,
    question: 'Which of the following is a psychological barrier to communication?',
    options: [
      'Generators and power tools running loudly during a verbal briefing',
      'An instruction that is given using unfamiliar technical jargon',
      'A poor mobile signal cutting out during a site phone call',
      "A receiver's preconceived negative opinion about the sender",
    ] as const,
    correctAnswer: 3,
    explanation:
      'Psychological barriers are internal mental states that interfere with receiving and processing messages. A preconceived negative opinion (bias or prejudice) means the receiver may dismiss or distort the message regardless of its content. This is distinct from physical barriers (noise), language barriers, or message quality issues.',
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'barrier framework',
    category: 'Understanding Communication' as const,
  },
  {
    id: 24,
    question:
      'In the SOLER model, why is "leaning slightly forward" recommended during a conversation?',
    options: [
      'It signals genuine interest and attentiveness to the speaker',
      'It reduces the need for eye contact',
      'It establishes physical dominance in the interaction',
      'It helps the listener hear more clearly in noisy environments',
    ] as const,
    correctAnswer: 0,
    explanation:
      "In Egan's SOLER model, leaning slightly forward communicates engagement and genuine interest in what the other person is saying. This subtle body language cue encourages the speaker to continue sharing and creates a sense of connection. It should be natural, not exaggerated, to avoid appearing intrusive.",
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'SOLER model',
    category: 'Understanding Communication' as const,
  },
  {
    id: 25,
    question:
      'Under CDM 2015, what is the communication responsibility of the Designer in relation to health and safety risks?',
    options: [
      'To supervise all of the site workers directly and to issue them with detailed daily instructions',
      'To communicate foreseeable risks that cannot be designed out to those who need the information',
      'To prepare and maintain the construction phase health and safety plan for the whole of the project',
      'To ensure that suitable welfare facilities are provided and maintained throughout the construction phase',
    ] as const,
    correctAnswer: 1,
    explanation:
      'CDM 2015 requires Designers to communicate information about foreseeable risks that cannot be eliminated through design. This includes providing relevant information to the Principal Designer, Principal Contractor, and other designers so that risks can be managed during construction. This is typically done through drawings, specifications, and design risk assessments.',
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'CDM 2015',
    category: 'Understanding Communication' as const,
  },
  {
    id: 26,
    question: 'What distinguishes assertive communication from aggressive communication?',
    options: [
      'Assertive communication is always delivered in writing so there is a record; aggressive communication is always spoken aloud',
      'Assertive communication avoids stating your own needs so that conflict is prevented; aggressive communication states those needs clearly',
      "Assertive communication respects both your own rights and the rights of others; aggressive communication disregards others' rights",
      'Assertive communication is used only when speaking to your superiors; aggressive communication is used only with subordinates',
    ] as const,
    correctAnswer: 2,
    explanation:
      "The key distinction is respect for rights. Assertive communication expresses your needs, opinions, and boundaries clearly while still acknowledging and respecting the other person's perspective. Aggressive communication prioritises your own needs at the expense of others, often involving blame, intimidation, or dismissiveness.",
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'communication styles',
    category: 'Understanding Communication' as const,
  },
  {
    id: 27,
    question: 'An I-message typically follows which structure?',
    options: [
      '"I feel [emotion] when [specific behaviour] because [impact on me]"',
      '"I think that you should do [instruction] because of [the stated reason]"',
      '"I am now telling you that [the demand] or else [the stated consequence]"',
      '"I want [this outcome] and you need to do [the required action]"',
    ] as const,
    correctAnswer: 0,
    explanation:
      'The classic I-message structure identifies the speaker\'s feeling, the specific behaviour that triggered it, and the tangible impact. For example: "I feel frustrated when materials aren\'t put back because I waste time looking for them." This approach takes ownership of feelings and avoids accusatory "you" language.',
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'I-messages',
    category: 'Understanding Communication' as const,
  },
  {
    id: 28,
    question:
      'Which of the following scenarios best illustrates a "semantic barrier" to communication?',
    options: [
      'An electrician uses the term "earth continuity conductor" while the plumber thinks they mean a physical earth wire to the ground',
      'A fire alarm sounds repeatedly during a verbal handover of instructions, so the electrician has to shout and the plumber mishears him',
      'A worker is too anxious about a looming deadline to take in the safety briefing, and afterwards cannot recall what the supervisor said',
      'A printed notice on the site hoarding uses a font that is far too small for some of the workers to read it easily from any distance',
    ] as const,
    correctAnswer: 0,
    explanation:
      'A semantic barrier arises when the same words carry different meanings for sender and receiver. Technical terminology can mean different things across trades. The fire alarm is a physical barrier, nervousness is a psychological barrier, and small font is a physical/presentation barrier.',
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'barrier framework',
    category: 'Understanding Communication' as const,
  },
  {
    id: 29,
    question:
      'According to ILM Level 2 guidance, which factor has the GREATEST impact on whether communication is effective?',
    options: [
      'Whether the sender used correct grammar and clear, precise vocabulary',
      'Whether the receiver understood the message and can act on it correctly',
      'Whether the message was delivered in person rather than being put in writing',
      'Whether the sender holds a more senior position than the receiver',
    ] as const,
    correctAnswer: 1,
    explanation:
      "ILM Level 2 emphasises that the true measure of effective communication is the receiver's understanding and ability to act correctly. The sender bears responsibility for ensuring the message lands — this means checking understanding, adapting to the audience, and choosing appropriate methods.",
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'ILM Level 2',
    category: 'Understanding Communication' as const,
  },
  {
    id: 30,
    question:
      'In the Shannon-Weaver model, adding a "feedback loop" from receiver to sender primarily addresses which limitation of the original model?',
    options: [
      'The original model could not represent physical noise in the channel, so interference on site could not be described',
      'The original model assumed that the sender and the receiver always spoke two completely different languages',
      'The original model was linear and one-directional, with no mechanism for the receiver to confirm understanding',
      'The original model required a written message rather than a spoken one, so face-to-face site briefings fell outside it',
    ] as const,
    correctAnswer: 2,
    explanation:
      'The original Shannon-Weaver model (1949) was a linear, one-way model developed for telephone communication. Later adaptations added a feedback loop to represent two-way communication, allowing the receiver to signal whether the message was received and understood. This made the model more applicable to human interpersonal communication.',
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'Shannon-Weaver model',
    category: 'Understanding Communication' as const,
  },
  {
    id: 31,
    question:
      'Which element of the SOLER model is most likely to need cultural adaptation when working on a diverse construction site?',
    options: [
      'Leaning forward, because the distance norms are the same globally',
      'Squarely facing the person, because all cultures value face-to-face interaction equally',
      'Relaxing, because relaxation is universally understood the same way',
      'Eye contact, because norms for direct eye contact vary significantly across cultures',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Eye contact norms vary significantly across cultures. In some cultures, sustained direct eye contact signals respect and attentiveness; in others, it can be perceived as challenging, disrespectful, or intrusive. On diverse construction sites, being aware of these differences helps avoid unintended offence and supports inclusive communication.',
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'SOLER model',
    category: 'Understanding Communication' as const,
  },
  {
    id: 32,
    question:
      'A site manager says to an electrician, "Don\'t worry, I\'ll take care of everything — you just do as I say." Which TA ego state dynamic does this represent?',
    options: [
      'Parent-to-Child, with the manager adopting a Nurturing (or Controlling) Parent role',
      'Adult-to-Child, with the manager simply providing factual instructions about the work',
      'Child-to-Parent, with the manager seeking reassurance and approval from the electrician',
      'Adult-to-Adult, with the manager being helpful, efficient and completely matter-of-fact',
    ] as const,
    correctAnswer: 0,
    explanation:
      "The statement \"Don't worry, I'll take care of everything — just do as I say\" places the manager in a Parent ego state (either Nurturing or Controlling) and positions the electrician as a Child. While possibly well-intentioned, this dynamic undermines the electrician's professional autonomy and can lead to resentment or disengagement.",
    section: 'Understanding Communication',
    difficulty: 'intermediate' as const,
    topic: 'Eric Berne TA',
    category: 'Understanding Communication' as const,
  },

  // ===== ADVANCED (id 33-40) =====
  {
    id: 33,
    question:
      'A researcher claims that "93% of all communication is non-verbal" based on Mehrabian\'s work. What is the most accurate critique of this claim?',
    options: [
      'The figure should be 87%, because tone of voice and body language add up to that amount once the words themselves are excluded from the overall total',
      "It overgeneralises Mehrabian's findings, which only apply to the communication of feelings and attitudes when verbal and non-verbal cues are incongruent",
      'The claim is correct, but it only applies to communication over the telephone, where the listener can hear the tone but cannot see the speaker at all',
      'The claim understates the figure, because later research has shown that non-verbal cues actually carry 99% of the meaning in any face-to-face conversation',
    ] as const,
    correctAnswer: 1,
    explanation:
      "This is one of the most widely misquoted statistics in communication studies. Mehrabian himself has stated that his findings are frequently misinterpreted. The 7-38-55 percentages were derived from two small studies about how people judge feelings and attitudes when the speaker's words, tone, and body language are inconsistent. Applying this to all communication — especially technical, factual, or written — is a fundamental misrepresentation of the research.",
    section: 'Understanding Communication',
    difficulty: 'advanced' as const,
    topic: 'Mehrabian 7-38-55',
    category: 'Understanding Communication' as const,
  },
  {
    id: 34,
    question:
      'In Transactional Analysis, an "ulterior transaction" is most dangerous in workplace communication because:',
    options: [
      'The message is sent through the wrong channel altogether and therefore never reaches the intended receiver',
      'Both parties speak from the Child ego state, which quickly leads to an emotional argument on site',
      'The overt (social) message differs from the covert (psychological) message, creating hidden agendas',
      'The receiver responds from a different ego state than the one that was addressed, so the exchange is crossed',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Ulterior transactions operate on two levels simultaneously — the overt social message and a hidden psychological message. For example, a colleague saying "That\'s an interesting way to wire it" with a sarcastic tone is delivering a critical hidden message beneath an apparently neutral statement. These transactions are manipulative and undermine trust, making them particularly problematic in safety-critical environments.',
    section: 'Understanding Communication',
    difficulty: 'advanced' as const,
    topic: 'Eric Berne TA',
    category: 'Understanding Communication' as const,
  },
  {
    id: 35,
    question:
      'How do the CDM 2015 Regulations position communication in relation to the hierarchy of risk control?',
    options: [
      'Communication replaces physical controls once a risk has been identified, so a warning notice may be used instead of guarding or isolation wherever that is convenient',
      'Communication is the first control to apply, so residual risks must be notified to workers before any attempt is made to eliminate or reduce them through design at all',
      'Communication is optional once a risk assessment has been documented, because the written assessment itself discharges the duty owed to everyone who is working on the site',
      'Communication of residual risks is required when hazards cannot be eliminated or reduced through design, forming part of the "inform" step after designing out risk',
    ] as const,
    correctAnswer: 3,
    explanation:
      'CDM 2015 follows a hierarchy: eliminate, reduce, inform. Communication sits within the "inform" stage — once risks cannot be designed out or reduced, relevant information about residual risks must be communicated to those who need to manage them. This means communication is a legal duty that complements (but never replaces) physical risk controls.',
    section: 'Understanding Communication',
    difficulty: 'advanced' as const,
    topic: 'CDM 2015',
    category: 'Understanding Communication' as const,
  },
  {
    id: 36,
    question:
      'A project manager consistently addresses the team from a Critical Parent ego state. According to Transactional Analysis theory, what is the most likely long-term effect on team communication?',
    options: [
      'Team members will increasingly respond from the Adapted Child ego state, becoming compliant but disengaged, or from the Rebellious Child state, creating conflict',
      'Team members will gradually shift into a stable Adult-to-Adult dynamic with the manager, because a firm lead encourages rational, factual exchanges over time',
      'Team members will mirror the Critical Parent state and begin to confront the manager as equals, so the team settles into a stable pattern of mutual criticism over time',
      'Team members will become more open and increasingly willing to raise safety concerns, because a critical lead makes expectations clear to everyone on site',
    ] as const,
    correctAnswer: 0,
    explanation:
      'TA theory predicts that persistent Critical Parent communication invites complementary Child responses. Over time, team members either become Adapted Child (compliant but passive, unlikely to raise concerns) or Rebellious Child (resistant and confrontational). Both outcomes damage open communication. In safety-critical environments, Adapted Child responses are particularly dangerous because workers may not speak up about hazards.',
    section: 'Understanding Communication',
    difficulty: 'advanced' as const,
    topic: 'Eric Berne TA',
    category: 'Understanding Communication' as const,
  },
  {
    id: 37,
    question:
      'Which of the following correctly explains the relationship between the Shannon-Weaver model and modern workplace communication theory?',
    options: [
      'The Shannon-Weaver model has been disproved by later research and is no longer used in any context, having been replaced entirely by Transactional Analysis as the standard account of workplace communication',
      'The Shannon-Weaver model provides a useful structural framework but must be supplemented with interpersonal elements like feedback, context, and shared meaning to fully represent human communication',
      'The Shannon-Weaver model fully captures human communication and needs no additions, because sender, encoder, channel, decoder and receiver between them account for every exchange that happens on site',
      'The Shannon-Weaver model applies only to written communication and never to spoken interaction, because the channel it describes has to be a permanent record such as a job sheet, drawing or email',
    ] as const,
    correctAnswer: 1,
    explanation:
      "The Shannon-Weaver model (originally designed for telecommunications) remains valuable as a structural framework for understanding the components of communication. However, human communication is more complex than signal transmission — it requires shared meaning, context, feedback, and interpersonal dynamics that later models (such as Schramm's interactive model and Barnlund's transactional model) address more fully.",
    section: 'Understanding Communication',
    difficulty: 'advanced' as const,
    topic: 'Shannon-Weaver model',
    category: 'Understanding Communication' as const,
  },
  {
    id: 38,
    question:
      'An electrician uses an I-message during a site meeting: "I feel concerned when isolation procedures aren\'t followed because it puts people at risk of electric shock." A colleague responds, "Stop being so dramatic." How should the electrician respond to maintain assertive communication?',
    options: [
      'Drop the subject to avoid conflict, since the colleague clearly disagrees and pressing the point in front of the whole team would only create bad feeling on this job',
      'Raise their voice and insist loudly, in front of the whole team, that the colleague is putting lives at risk every time the isolation procedure is ignored on this site',
      'Calmly restate the concern using another I-message, such as "I understand it might seem that way, but this is about safety and I need us to follow the procedure"',
      'Report the colleague straight to the site manager without speaking to them about it first, so that the manager can decide what disciplinary action is appropriate here',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Maintaining assertive communication after being dismissed requires emotional regulation and persistence. Calmly restating the concern with another I-message acknowledges the colleague\'s response without accepting the dismissal, keeps the focus on the safety issue, and models professional Adult-to-Adult communication. This is the "broken record" assertiveness technique combined with empathetic acknowledgement.',
    section: 'Understanding Communication',
    difficulty: 'advanced' as const,
    topic: 'I-messages',
    category: 'Understanding Communication' as const,
  },
  {
    id: 39,
    question:
      'When multiple communication barriers exist simultaneously (e.g., physical noise, semantic confusion, and psychological stress), what approach does ILM Level 2 guidance recommend?',
    options: [
      'Abandon the message altogether and try again on another day, when the noise has stopped, the jargon can be explained and everyone on the site is calmer',
      'Increase your volume and repeat the message word for word until the receiver finally responds, since repetition and loudness will overcome any barrier that exists',
      'Deliver the message in full at normal speed and rely on the receiver to filter out the noise, the jargon and their own stress without any help at all',
      'Identify and address the most impactful barrier first, then systematically reduce others using channel selection, language adaptation, and emotional awareness',
    ] as const,
    correctAnswer: 3,
    explanation:
      "When facing multiple simultaneous barriers, a systematic approach is needed. ILM Level 2 guidance emphasises identifying which barrier is most disruptive, addressing it first, and then tackling others. This might mean moving to a quieter location (physical), simplifying language (semantic), and checking the receiver's emotional state (psychological) before delivering the message.",
    section: 'Understanding Communication',
    difficulty: 'advanced' as const,
    topic: 'ILM Level 2',
    category: 'Understanding Communication' as const,
  },
  {
    id: 40,
    question:
      'In a complex multi-trade project environment, which combination of communication frameworks would be MOST effective for ensuring clear, respectful information flow between trades?',
    options: [
      'Adult ego state (TA) for rational exchanges, SOLER for attentive body language, I-messages for raising concerns, and systematic barrier identification for troubleshooting breakdowns',
      'Critical Parent ego state for authority, aggressive communication for urgency, one-way channels for efficiency, and written notices instead of any face-to-face discussion between trades',
      'Passive communication to avoid inter-trade conflict, written notices as the only permitted method, and no questions raised in coordination meetings whatever the risk to anyone involved may be',
      'Mehrabian\'s 7-38-55 rule applied to all site communications, non-verbal cues prioritised over technical content, and instructions issued only by the most senior trade present there',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Effective multi-trade communication requires an integrated approach: Adult-to-Adult transactions (TA) ensure rational, respectful exchanges; SOLER supports attentive non-verbal behaviour during face-to-face interactions; I-messages allow concerns to be raised without blame; and systematic barrier identification helps troubleshoot when communication fails. This combination addresses both the structural and interpersonal dimensions of communication.',
    section: 'Understanding Communication',
    difficulty: 'advanced' as const,
    topic: 'communication styles',
    category: 'Understanding Communication' as const,
  },

  // =======================================================================
  // LISTENING & UNDERSTANDING OTHERS — 40 questions (id 41-80)
  // =======================================================================

  // ===== BASIC (id 41-56) =====
  {
    id: 41,
    question: 'What is the primary difference between "hearing" and "listening"?',
    options: [
      'Hearing requires eye contact with the speaker, whereas listening can be done perfectly well with your back turned',
      'Hearing is a passive physical process; listening is an active mental process of interpreting and understanding',
      'Hearing involves understanding the meaning of what is said, whereas listening is simply detecting the sound waves',
      'Hearing applies only to face-to-face conversation, whereas listening applies only to telephone calls and radio messages',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Hearing is the physiological reception of sound waves — it happens automatically. Listening is an active cognitive process that involves paying attention, interpreting meaning, and seeking to understand the speaker's message. Effective workplace communication requires conscious listening, not just passive hearing.",
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'active listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 42,
    question: 'According to Stephen Covey, how many levels of listening are there?',
    options: [
      'Three',
      'Two',
      'Five',
      'Seven',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Stephen Covey identified five levels of listening: ignoring, pretend listening, selective listening, attentive listening, and empathetic listening. Each level represents a deeper degree of engagement with the speaker, with empathetic listening being the highest and most effective level.',
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: "Covey's 5 levels",
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 43,
    question: 'What is "selective listening" in Covey\'s framework?',
    options: [
      'Focusing exclusively on whoever is the most senior person present in the room',
      'Carefully choosing which conversations on site you are going to take any part in at all',
      'Listening to only one person at a time when you are in a larger group setting',
      'Hearing only the parts of a message that interest you or confirm your existing views',
    ] as const,
    correctAnswer: 3,
    explanation:
      "Selective listening (Covey's third level) involves filtering the speaker's message and only hearing parts that are interesting, relevant, or that confirm existing beliefs. On site, this is dangerous — a worker selectively listening during a safety briefing might miss a critical piece of information.",
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: "Covey's 5 levels",
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 44,
    question: "What is Covey's Habit 5?",
    options: [
      'Seek first to understand, then to be understood',
      'Begin with the end in mind',
      'Put first things first',
      'Sharpen the saw',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Covey\'s Habit 5, "Seek first to understand, then to be understood," is a foundational principle of effective communication. It means genuinely listening to understand the other person\'s perspective before presenting your own. This habit builds trust and reduces conflict in workplace relationships.',
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'Habit 5',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 45,
    question: 'What does the "R" stand for in the RASA listening model?',
    options: [
      'Rephrase',
      'Receive',
      'Reiterate',
      'Repeat',
    ] as const,
    correctAnswer: 1,
    explanation:
      "In Julian Treasure's RASA model, the R stands for Receive — paying attention to the speaker. The full acronym is Receive, Appreciate, Summarise, Ask. It provides a simple framework for conscious, active listening in any setting.",
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'RASA model',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 46,
    question: 'In the RASA listening model, what does "Appreciate" involve?',
    options: [
      'Openly agreeing with every single point the speaker makes so as to keep them feeling comfortable',
      'Praising the speaker warmly for the quality of their argument once they have finished speaking to you',
      'Making small verbal acknowledgements like "mm-hmm," "I see," or nodding to show you are engaged',
      'Thanking the speaker formally at the end and noting down their contribution in the meeting minutes',
    ] as const,
    correctAnswer: 2,
    explanation:
      'In the RASA model, "Appreciate" means providing small signals — both verbal (such as "I see," "mm-hmm," "go on") and non-verbal (nodding, eye contact) — that demonstrate you are actively engaged and valuing what the speaker is sharing. It does not mean agreeing with the content, but showing you are present and attentive.',
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'RASA model',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 47,
    question: 'What is "active listening"?',
    options: [
      'Waiting quietly for your own turn to speak while the other person is talking',
      'Listening to a speaker while carrying out another practical task at exactly the same time',
      'Interrupting the speaker regularly in order to show them that you are engaged',
      'A deliberate effort to fully concentrate on, understand, and respond to a speaker',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Active listening is a conscious effort to hear not only the words being said but also to understand the complete message. It involves giving full attention, withholding judgement, providing feedback, and responding appropriately. Simply waiting for your turn to speak is not active listening — it is rehearsing your response.',
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'active listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 48,
    question: 'Which of the following is an example of "paraphrasing" during a conversation?',
    options: [
      '"So what you\'re saying is that the circuit needs to be re-routed to avoid the water pipe?"',
      '"Why did you not spot the water pipe at all before you started routing the circuit in there?"',
      '"You will need to re-route that circuit right around the water pipe straight away."',
      '"Did the position of the water pipe affect the route that you took for that circuit in the end?"',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Paraphrasing means restating the speaker\'s message in your own words to confirm understanding. "So what you\'re saying is..." demonstrates that you have listened and are checking your comprehension. This is a core active listening skill that reduces miscommunication on site.',
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'paraphrasing',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 49,
    question: 'What type of question is "Can you tell me more about the fault you found?"',
    options: [
      'A leading question',
      'An open question',
      'A rhetorical question',
      'A closed question',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Open questions begin with words like "what," "how," "why," "tell me," and invite detailed, expansive responses. "Can you tell me more about..." encourages the speaker to elaborate, which is valuable when investigating faults, gathering information, or understanding a colleague\'s perspective.',
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'question types',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 50,
    question: 'Which of the following is a "closed question"?',
    options: [
      '"What challenges did you face during the installation?"',
      '"How did you approach the cable routing?"',
      '"Did you isolate the supply before starting work?"',
      '"Why do you think the RCD keeps tripping?"',
    ] as const,
    correctAnswer: 2,
    explanation:
      'A closed question can be answered with a simple "yes" or "no" or a short factual response. "Did you isolate the supply?" expects a yes/no answer. Closed questions are useful for confirming specific facts but do not encourage detailed explanations.',
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'question types',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 51,
    question: 'In the context of listening, what does "reflective listening" primarily involve?',
    options: [
      'Looking at the speaker in a mirror in order to improve your own body language',
      'Thinking quietly about what has been said once the whole conversation has ended',
      'Reflecting on your own past experiences while the other person is still speaking',
      "Mirroring back the speaker's feelings and content to show understanding",
    ] as const,
    correctAnswer: 3,
    explanation:
      'Reflective listening involves mirroring back both the content and the emotional tone of what the speaker has said. For example: "It sounds like you\'re frustrated because the delivery was late again." This validates the speaker\'s experience and demonstrates genuine understanding.',
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'reflective listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 52,
    question: 'Which of the following behaviours is a barrier to effective listening?',
    options: [
      'Mentally preparing your response while the speaker is still talking',
      'Asking a clarifying question when a particular point is unclear',
      'Summarising all of the key points back to the speaker at the very end',
      'Allowing a brief silence after the speaker finishes a point',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Mentally formulating your reply while someone is still speaking means you are not fully processing their message. This "rehearsing" behaviour is one of the most common barriers to effective listening and can cause you to miss important information or misunderstand the speaker\'s point.',
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'active listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 53,
    question: 'Which body language signal typically indicates that someone is NOT listening?',
    options: [
      'Leaning slightly forward towards the speaker',
      'Repeatedly checking their phone or watch',
      'Maintaining steady eye contact with the speaker',
      'Nodding in response to the key points',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Repeatedly checking a phone or watch sends a clear non-verbal signal that the person is disengaged and not prioritising the conversation. This undermines the speaker's confidence and can damage professional relationships. On site, this inattention during safety communication can have serious consequences.",
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'active listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 54,
    question: "What is the lowest level of listening in Covey's framework?",
    options: [
      'Selective listening — only hearing certain parts',
      'Pretend listening — appearing to listen while thinking about something else',
      'Ignoring — making no effort to listen at all',
      'Passive listening — hearing without processing',
    ] as const,
    correctAnswer: 2,
    explanation:
      "Covey's lowest level is ignoring — making no effort whatsoever to listen. This is followed by pretend listening (going through the motions), selective listening (hearing only certain parts), attentive listening (genuinely focusing), and empathetic listening (understanding the other person's frame of reference).",
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: "Covey's 5 levels",
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 55,
    question: 'Why is asking "clarifying questions" considered a key active listening skill?',
    options: [
      'It allows the listener to steer the speaker gradually towards the conclusion they already prefer',
      'It clearly signals to the speaker that they should now bring the whole conversation to a rapid close',
      'It gives the listener extra time in which to prepare a rebuttal to the argument of the speaker',
      'It demonstrates engagement and helps ensure the listener has correctly understood the message',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Clarifying questions serve two purposes: they signal to the speaker that you are engaged and processing their message, and they help you fill gaps in your understanding. Questions like "When you say X, do you mean...?" reduce the chance of misinterpretation and show respect for the speaker\'s message.',
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'active listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 56,
    question: 'In the RASA listening model, what does the "S" stand for?',
    options: [
      'Summarise',
      'Sympathise',
      'Silence',
      'Support',
    ] as const,
    correctAnswer: 0,
    explanation:
      'The S in RASA stands for Summarise — pulling together the key points of what the speaker has said. Summarising demonstrates that you have been listening, helps confirm mutual understanding, and gives the speaker an opportunity to correct any misinterpretations.',
    section: 'Listening & Understanding Others',
    difficulty: 'basic' as const,
    topic: 'RASA model',
    category: 'Listening & Understanding Others' as const,
  },

  // ===== INTERMEDIATE (id 57-72) =====
  {
    id: 57,
    question: 'How does the "funnel technique" work in questioning?',
    options: [
      'It alternates open and closed questions in no particular order, so as to keep the speaker alert and attentive',
      'It starts with broad, open questions and progressively narrows to specific, closed questions to focus the conversation',
      'It uses only closed questions throughout the whole conversation, so that the answers stay short and factual',
      'It starts with specific, closed questions and gradually broadens out to general, open ones as the conversation develops',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The funnel technique begins with broad, open questions to establish the big picture and encourage the speaker to share freely, then progressively narrows to more specific, closed questions to pin down details. This is particularly useful in fault-finding: "Tell me what happened" (open) leading to "Was the RCD tripped when you arrived?" (closed).',
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'funnel technique',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 58,
    question:
      'What distinguishes "empathetic listening" from "attentive listening" in Covey\'s framework?',
    options: [
      'Empathetic listening focuses only on the words that are spoken, while attentive listening is the level that adds the emotion behind them as well',
      'Empathetic listening is reserved only for written messages such as emails, while attentive listening is used for spoken conversations',
      "Empathetic listening seeks to understand the speaker's feelings and perspective from their frame of reference, not just the factual content",
      'Empathetic listening means agreeing with everything the speaker says, while attentive listening means staying strictly neutral during the exchange',
    ] as const,
    correctAnswer: 2,
    explanation:
      "Attentive listening (Covey's fourth level) involves genuinely paying attention to the words being said. Empathetic listening (fifth level) goes deeper — it seeks to understand the speaker's emotions, perspective, and frame of reference. You are not just hearing the content; you are understanding the person. This is the most powerful level for building trust and resolving conflict.",
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: "Covey's 5 levels",
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 59,
    question:
      'When using the SOLER model during a listening interaction, what does maintaining an "open posture" communicate to the speaker?',
    options: [
      'That you hold a clear position of authority over the person who is now speaking to you',
      'That you would much prefer this conversation to be kept as brief as it possibly can be',
      'That you are relaxed because the topic being discussed is not at all important to you',
      'Receptiveness and willingness to hear what they have to say without defensiveness',
    ] as const,
    correctAnswer: 3,
    explanation:
      'An open posture (uncrossed arms and legs, body oriented towards the speaker) communicates receptiveness, approachability, and a willingness to engage. Conversely, crossed arms or turned-away posture can signal defensiveness or disinterest, which discourages the speaker from sharing openly.',
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'SOLER',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 60,
    question:
      "An apprentice says, \"I'm not sure I've connected this correctly — it doesn't look right to me.\" Which response demonstrates the best active listening?",
    options: [
      '"What specifically doesn\'t look right to you? Talk me through what you\'ve done so far."',
      '"It is probably fine — just leave it and we will check it all at the end of the day."',
      '"If you had paid proper attention earlier on you would already know whether it was right or not."',
      '"Do not worry about it, these things rarely matter anywhere near as much as you think."',
    ] as const,
    correctAnswer: 0,
    explanation:
      "The best response uses an open question to explore the apprentice's concern and invites them to elaborate. This demonstrates genuine interest in understanding their perspective, validates their instinct to speak up, and creates an opportunity for learning. The other responses dismiss the concern, delay action, or criticise — all of which discourage future communication.",
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'active listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 61,
    question:
      'In Socratic questioning, what is the primary purpose of asking "What evidence supports that view?"',
    options: [
      'To challenge and deliberately undermine the confidence that the person has in their judgement',
      'To encourage the person to examine the basis for their belief and think more critically',
      'To demonstrate that the questioner holds far superior technical knowledge of the job',
      'To delay making any decision at all until a great deal more test data is available on site',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Socratic questioning uses thoughtful, probing questions to stimulate critical thinking and deeper understanding. "What evidence supports that view?" is not confrontational — it invites the person to examine the foundations of their reasoning. This develops their analytical skills and often leads to better-quality conclusions on site.',
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'Socratic questioning',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 62,
    question:
      'Which of the following is the best example of "reflecting feelings" in a listening interaction?',
    options: [
      '"You should just prioritise the urgent jobs and leave the rest, because it will all sort itself out in the end."',
      '"I had exactly the same problem last month, so let me tell you exactly what I did about it and how it worked."',
      '"It sounds like you\'re feeling overwhelmed by the amount of work that\'s been added to your schedule."',
      '"There is no point at all getting worked up about it, because everyone on this job is just as busy right now."',
    ] as const,
    correctAnswer: 2,
    explanation:
      "Reflecting feelings means naming the emotion you perceive in the speaker's message and checking whether your perception is accurate. \"It sounds like you're feeling overwhelmed...\" validates the speaker's experience and demonstrates empathetic understanding. Offering advice, minimising, or redirecting to your own experience are not reflective listening.",
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'reflective listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 63,
    question:
      'Why is "pretend listening" (Covey\'s second level) potentially more harmful than openly ignoring someone?',
    options: [
      'Because pretend listening takes far more concentration and effort than genuinely listening to the speaker would ever take on site',
      'Because the speaker can always tell straight away when someone is only pretending to listen, so the deception never works in practice at all',
      'Because pretend listening is a criminal offence under health and safety law and carries an unlimited fine on conviction in court',
      'Because the speaker believes they have been heard and understood when they have not, leading to false confidence in the communication',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Pretend listening is deceptive — the speaker observes cues that suggest engagement (nodding, "uh-huh") and reasonably concludes their message has landed. They then act on the assumption they were understood, which can lead to errors, misaligned expectations, and in safety-critical environments, dangerous outcomes. At least with overt ignoring, the speaker knows the message was not received.',
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: "Covey's 5 levels",
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 64,
    question: 'When paraphrasing, which of the following should you AVOID?',
    options: [
      "Repeating the speaker's exact words back to them word-for-word, as this can feel mechanical and does not demonstrate true understanding",
      'Restating the meaning of the speaker in your own words in order to confirm that you have properly understood what was actually said to you',
      'Capturing the essence of the whole message rather than every minor detail the speaker happened to mention, which keeps the summary short',
      'Inviting the speaker to correct your summary of what they said if you have misunderstood any part of what they were telling you',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Paraphrasing means restating the message in your own words, which demonstrates genuine comprehension. Simply parroting the exact words back (sometimes called "echo listening") does not show that you have processed and understood the meaning. Effective paraphrasing captures the essence and invites the speaker to confirm or correct your understanding.',
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'paraphrasing',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 65,
    question:
      'Which Socratic question type encourages someone to consider the implications of their proposed action?',
    options: [
      '"Who exactly was it that told you to wire it that way in the first place?"',
      '"If we do it that way, what do you think the consequences might be?"',
      '"Are you absolutely certain that you have done every part of this correctly?"',
      '"What time this afternoon do you expect to have all of this finished by?"',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Asking about consequences and implications is a key Socratic questioning technique. "If we do it that way, what might happen?" invites forward thinking and encourages the person to evaluate their own reasoning without being told the answer. This develops critical thinking and is more effective than directive instruction for lasting learning.',
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'Socratic questioning',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 66,
    question:
      'What is a "leading question" and why should it generally be avoided in active listening?',
    options: [
      'A question that can only be answered with a simple yes or no, which limits the amount of detail the speaker is able to give you in reply',
      'A question that asks the speaker to summarise everything they have already said, which wastes time and can make them feel they were not listened to',
      'A question that suggests the desired answer, which can manipulate the response and prevent the speaker from sharing their genuine perspective',
      'A question that invites the speaker to explore their own feelings in depth, which is useful but takes the conversation away from the facts',
    ] as const,
    correctAnswer: 2,
    explanation:
      'A leading question contains an assumption or implies the expected answer, such as "You did follow the isolation procedure, didn\'t you?" This pressures the respondent to confirm rather than share what actually happened. In active listening, neutral, open questions allow the speaker to give an honest, uninfluenced account.',
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'question types',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 67,
    question: 'In the RASA model, what does the "A" at the end (Ask) encourage the listener to do?',
    options: [
      'Ask the speaker to lower their voice a little so that you can concentrate on it properly',
      'Ask another colleague standing nearby to confirm what the speaker has just said',
      'Ask the speaker to put the whole request in writing so that there is a written record',
      'Ask relevant follow-up questions to deepen understanding and show continued interest',
    ] as const,
    correctAnswer: 3,
    explanation:
      'The final A in RASA (Ask) encourages the listener to ask thoughtful follow-up questions. This demonstrates ongoing engagement, helps clarify any remaining ambiguity, and deepens mutual understanding. Good follow-up questions often arise naturally from the summarising step that precedes them.',
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'RASA model',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 68,
    question:
      "Covey's Habit 5 states that most people do not listen with the intent to understand but rather with the intent to:",
    options: [
      'Reply',
      'Judge',
      'Agree',
      'Memorise',
    ] as const,
    correctAnswer: 0,
    explanation:
      "Covey observed that most people listen with the intent to reply — they are formulating their response rather than genuinely trying to understand the speaker's perspective. This means they filter everything through their own frame of reference rather than entering the speaker's frame of reference, which is what empathetic listening requires.",
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'Habit 5',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 69,
    question: 'Which of the following techniques helps a listener avoid interrupting the speaker?',
    options: [
      'Repeating the words of the speaker quietly under your breath while they talk on',
      'Mentally noting points to return to later rather than jumping in immediately',
      'Maintaining a completely blank facial expression throughout the whole conversation',
      'Crossing your arms firmly in order to remind yourself to stay quiet until the end',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Mentally noting points to revisit is an effective self-regulation technique. It allows you to remain present with the speaker while ensuring important points are not lost. When the speaker finishes, you can return to those noted points. This respects the speaker's flow and demonstrates patience — a hallmark of skilled listening.",
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'active listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 70,
    question:
      'An electrician describes a complex fault to a colleague. The colleague responds, "So the RCD trips intermittently under load, and you\'ve already ruled out the appliances on that circuit — is that correct?" This is an example of:',
    options: [
      'Giving technical advice',
      'Offering a diagnosis',
      'Summarising and checking understanding',
      "Challenging the electrician's competence",
    ] as const,
    correctAnswer: 2,
    explanation:
      'The colleague has pulled together the key points of the description (summarising) and then asked "is that correct?" (checking understanding). This is excellent active listening practice that ensures both parties are aligned before moving forward to a solution, preventing wasted time on incorrect assumptions.',
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'paraphrasing',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 71,
    question: 'What is the "inverted funnel" (or "reverse funnel") questioning technique?',
    options: [
      'Asking exactly the same broad question over and over again until a clear answer finally emerges from the other person involved',
      'Alternating between two completely unrelated topics throughout the conversation in order to test how well the speaker can hold their focus',
      'Beginning with broad, open questions and then narrowing down to specific, closed ones as the conversation goes on at the site',
      'Starting with specific, closed questions and gradually broadening to open questions to build confidence before exploring wider topics',
    ] as const,
    correctAnswer: 3,
    explanation:
      'The inverted funnel starts with narrow, specific, easy-to-answer questions and gradually opens up to broader, more complex ones. This technique is useful with nervous or reluctant speakers (such as apprentices) because the initial easy questions build confidence and rapport before deeper exploration. It is the reverse of the standard funnel technique.',
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'funnel technique',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 72,
    question: 'Why is silence an important tool in active listening?',
    options: [
      'Allowing pauses gives the speaker time to think and often encourages them to share more detail',
      'Silence clearly shows that you are bored and want the conversation to end as quickly as possible',
      'Remaining silent means that you do not need to take any responsibility for the conversation',
      'Silence is never appropriate in a professional conversation, so any pause should be filled quickly',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Comfortable silence after a speaker pauses or finishes a point gives them space to gather their thoughts and often leads to them sharing more depth or detail. Many listeners rush to fill silence, which can cut short important disclosures. Skilled listeners are comfortable with pauses and use them as a deliberate tool.',
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate' as const,
    topic: 'active listening',
    category: 'Listening & Understanding Others' as const,
  },

  // ===== ADVANCED (id 73-80) =====
  {
    id: 73,
    question:
      "A colleague describes a situation where they feel a client is being unreasonable about a project timeline. According to Covey's empathetic listening, which response is most appropriate?",
    options: [
      '"You just need to push back and tell the client straight out that the timeline is impossible, because that is the only way anything will ever change on this job."',
      '"It sounds like you\'re caught between wanting to meet the client\'s expectations and knowing the timeline isn\'t realistic — that must be really frustrating."',
      '"Clients are always like that — you soon learn to ignore the unrealistic ones and simply carry on working to the programme that you know is actually achievable."',
      '"When I had a difficult client last year I handled it like this, and here is exactly what I said to them at the time and how the whole thing was sorted out in the end."',
    ] as const,
    correctAnswer: 1,
    explanation:
      "Empathetic listening involves entering the speaker's frame of reference and reflecting both the content and the feelings you perceive. The first response names the tension (content) and the emotion (frustration), showing genuine understanding without offering premature advice, redirecting to your own experience, or prescribing a solution. This allows the speaker to feel truly heard before moving to problem-solving.",
    section: 'Listening & Understanding Others',
    difficulty: 'advanced' as const,
    topic: 'empathetic listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 74,
    question:
      'When conducting a Socratic questioning dialogue with an apprentice about why an RCD has tripped, what sequence of questions best develops their diagnostic thinking?',
    options: [
      'Tell the apprentice the likely cause of the trip immediately so that the job is not delayed, then let them carry out the repair while you get on with something else here',
      'Ask only closed yes/no questions, such as "Is it the shower circuit?" and "Is it the RCD itself?", so the apprentice cannot possibly give an answer that is wrong at any point',
      'Start with "What do you observe?" then "What could cause that?" then "How could you test each possibility?" then "What would you expect to find if your theory is correct?"',
      'Begin with "What would you expect to find?" and then "What is your theory?" before the apprentice has made any observation or carried out a single test on the board',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Effective Socratic questioning follows a logical progression: observation (what do you see?), hypothesis generation (what could cause this?), testing methodology (how would you verify?), and prediction (what would confirm your theory?). This develops systematic diagnostic thinking rather than just providing answers. It takes longer but builds lasting competence and independent problem-solving ability.',
    section: 'Listening & Understanding Others',
    difficulty: 'advanced' as const,
    topic: 'Socratic questioning',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 75,
    question:
      'A site worker becomes visibly upset while describing a near-miss incident. According to best practice in empathetic listening, what should the listener prioritise FIRST?',
    options: [
      'Recording the exact sequence of events for the accident report straight away, before anything is forgotten',
      'Identifying exactly who was at fault on site before the worker forgets any of the finer details',
      'Establishing the precise time and the exact location of the near-miss before anything else is discussed',
      'Acknowledging the emotional impact before attempting to gather factual details about the incident',
    ] as const,
    correctAnswer: 3,
    explanation:
      'When someone is emotionally distressed, attempting to extract factual information before acknowledging their emotional state is ineffective and can feel dismissive. Empathetic listening prioritises the emotional response first ("That must have been frightening — are you alright?"). Once the person feels heard and their emotional state has settled, they will be better able to provide an accurate, detailed factual account.',
    section: 'Listening & Understanding Others',
    difficulty: 'advanced' as const,
    topic: 'empathetic listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 76,
    question:
      "How does combining the RASA model with Covey's empathetic listening create a more complete listening framework?",
    options: [
      "RASA provides the structural process (receive, appreciate, summarise, ask) while Covey's empathetic listening adds the depth of emotional understanding and perspective-taking within each step",
      'RASA replaces empathetic listening entirely, removing any need to consider the feelings of the speaker, because receiving, appreciating, summarising and asking together cover everything a listener needs',
      'Covey\'s empathetic listening provides the four ordered steps of the process, while RASA adds the body language elements of squarely facing the speaker, open posture, leaning forward and eye contact',
      'The two frameworks contradict each other and should never be combined, because RASA requires the listener to stay strictly neutral while Covey requires them to agree with everything the speaker says',
    ] as const,
    correctAnswer: 0,
    explanation:
      "RASA provides a clear, actionable four-step process for listening, but on its own it can become mechanical. Layering Covey's empathetic listening within each RASA step adds emotional depth — receiving with genuine presence, appreciating with authentic empathy, summarising both content and feeling, and asking questions from the speaker's frame of reference rather than your own.",
    section: 'Listening & Understanding Others',
    difficulty: 'advanced' as const,
    topic: 'RASA model',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 77,
    question:
      'In a multi-trade coordination meeting, an electrician notices that the plumbing contractor repeatedly uses technical terms the general labourers do not understand, but no one is asking for clarification. What listening-related action is MOST effective?',
    options: [
      'Use a clarifying question on behalf of the group, such as "Could you explain what you mean by [term] for those of us from other trades?"',
      'Stay silent, because it is not your responsibility to manage whether the other trades in the meeting understand the terms being used',
      'Interrupt the plumber mid-sentence and tell them in front of everyone to start using simpler language that the labourers can follow for once',
      'Wait until after the meeting has finished and then privately explain all of the technical terms to the labourers one by one afterwards',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Asking a clarifying question on behalf of the group demonstrates advanced listening awareness — you have noticed that communication is breaking down for others even though you may understand the terms yourself. Framing it inclusively ("for those of us from other trades") avoids embarrassing anyone and ensures critical information reaches everyone. Waiting until after the meeting means decisions may have already been made on incomplete understanding.',
    section: 'Listening & Understanding Others',
    difficulty: 'advanced' as const,
    topic: 'active listening',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 78,
    question:
      'A supervisor uses the funnel technique during an accident investigation. They start with "Tell me everything that happened from when you arrived on site this morning" and gradually narrow to "At what exact time did you notice the fault?" Why is this sequencing particularly important in investigation contexts?',
    options: [
      'Specific questions asked first ensure that the supervisor controls exactly what the witness reveals, which keeps the investigation focused on the facts that matter most to the company',
      'Starting broad allows the supervisor to suggest to the witness what they should have seen, so that the account given lines up with the version that was already recorded at the time',
      'Broad questions first allow the witness to recall events in their own way without being influenced by specific prompts, preserving the accuracy and completeness of their account',
      'Specific questions asked first save a great deal of time by skipping straight to the relevant facts, so a full account of the whole morning is never needed at any stage of the investigation',
    ] as const,
    correctAnswer: 2,
    explanation:
      'In investigation contexts, the funnel technique is critical for evidence quality. Broad, open questions at the start allow the witness to provide a free recall account, which is more accurate and complete than responses shaped by specific prompts. Narrowing to specific questions later fills in gaps without contaminating the original narrative. This approach is supported by investigative interviewing best practice (e.g., the PEACE model).',
    section: 'Listening & Understanding Others',
    difficulty: 'advanced' as const,
    topic: 'funnel technique',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 79,
    question:
      "An electrician consistently finds that team members come to them with problems but rarely follow through on solutions. Applying Covey's Habit 5 and Socratic questioning, what is the MOST likely cause and the MOST effective response?",
    options: [
      'The team members simply lack the technical ability to carry out the work, so the electrician should take every one of the tasks over entirely and stop asking them to solve anything at all',
      'The team members are deliberately avoiding the work they have been given, so the electrician should escalate every problem straight to the site manager rather than discussing it with them',
      'The electrician is not giving clear enough instructions, so they should write every instruction down in full and hand it over as a written method statement each and every morning on the site',
      'The electrician is probably solving problems FOR team members rather than helping them think through solutions; they should use Socratic questions to guide self-discovery and ownership',
    ] as const,
    correctAnswer: 3,
    explanation:
      'When a listener consistently provides solutions, they create dependency — team members learn to bring problems but not to solve them. Covey\'s Habit 5 suggests first understanding the person\'s perspective, then using Socratic questioning ("What have you already considered?" "What would happen if...?" "What resources do you have?") to guide them toward their own solutions. This develops capability and ownership.',
    section: 'Listening & Understanding Others',
    difficulty: 'advanced' as const,
    topic: 'Socratic questioning',
    category: 'Listening & Understanding Others' as const,
  },
  {
    id: 80,
    question:
      'During a sensitive one-to-one conversation, a team member discloses that they are struggling with a personal issue affecting their work. Which combination of listening skills represents the most professionally appropriate and effective response?',
    options: [
      'Empathetic listening to acknowledge feelings, SOLER body language to show presence, reflective statements to validate, and clear signposting to appropriate support services',
      'Offer detailed personal advice about the situation, share your own similar experiences at length, tell them exactly what decision to make, and follow it up with them the next morning',
      'Quickly redirect the conversation back to the work tasks in hand so as to avoid prying into personal matters, and make no further reference to the disclosure again at all',
      'Reassure them that the problem is only a minor one, change the subject to something lighter, and avoid raising the matter with them again at any point in the future at all',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Sensitive disclosures require an integrated approach: empathetic listening (understanding their emotional experience), SOLER body language (communicating attentive presence), reflective statements (validating their feelings without judgement), and appropriate signposting (directing them to professional support such as an Employee Assistance Programme). This combination demonstrates both genuine care and professional responsibility without overstepping into a counselling role you are not qualified for.',
    section: 'Listening & Understanding Others',
    difficulty: 'advanced' as const,
    topic: 'empathetic listening',
    category: 'Listening & Understanding Others' as const,
  },

  // ---------------------------------------------------------------------------
  // Category 3: Speaking with Confidence (40 questions, id 81-120)
  // ---------------------------------------------------------------------------
  {
    id: 81,
    question:
      'According to Albert Bandura, which of the following is the most powerful source of self-efficacy?',
    options: [
      'Vicarious experiences — watching other people succeed',
      'Mastery experiences — succeeding at a task yourself',
      'Social persuasion — encouragement from others',
      'Emotional states — feeling calm, relaxed and confident',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Bandura identified mastery experiences as the most powerful source of self-efficacy. When you succeed at a task through your own effort, it builds genuine belief in your ability. This is why gradual exposure and practice are more effective than simply being told you can do something.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'self-efficacy sources',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 82,
    question: 'How many sources of self-efficacy did Bandura identify?',
    options: ['Two', 'Three', 'Four', 'Five'] as const,
    correctAnswer: 2,
    explanation:
      'Bandura identified four sources of self-efficacy: mastery experiences, vicarious experiences (modelling), social persuasion (verbal encouragement), and emotional/physiological states. All four contribute to confidence, but mastery experiences are the strongest.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'self-efficacy sources',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 83,
    question: 'Who first described the concept of imposter syndrome in their 1978 research paper?',
    options: [
      'Carol Dweck and Albert Bandura',
      'Pauline Rose Clance and Carl Rogers',
      'Sigmund Freud and Abraham Maslow',
      'Pauline Rose Clance and Suzanne Ames Imes',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Pauline Rose Clance and Suzanne Ames Imes first described the imposter phenomenon in their 1978 paper. They studied high-achieving women who, despite objective evidence of accomplishment, persisted in believing they were not intelligent and that they had fooled anyone who thought otherwise.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'imposter syndrome',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 84,
    question: 'What is glossophobia?',
    options: [
      'Fear of public speaking',
      'Fear of heights',
      'Fear of social situations',
      'Fear of enclosed spaces',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Glossophobia is the fear of public speaking. Research suggests approximately 75% of people experience some degree of anxiety around public speaking, making it one of the most common fears.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'speaking anxiety',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 85,
    question: 'What is the box breathing technique pattern used to manage anxiety?',
    options: [
      'Breathe in for 2, hold for 2, out for 2, hold for 2',
      'Breathe in for 4, hold for 4, out for 4, hold for 4',
      'Breathe in for 3, out for 6',
      'Breathe in for 7, hold for 4, out for 8',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Box breathing follows a 4-4-4-4 pattern: breathe in for 4 seconds, hold for 4 seconds, breathe out for 4 seconds, hold for 4 seconds. The equal intervals and structured pattern activate the parasympathetic nervous system, reducing anxiety.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'anxiety management',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 86,
    question: 'Carol Dweck identified two types of mindset. What are they?',
    options: [
      'Positive and negative',
      'Internal and external',
      'Fixed and growth',
      'Open and closed',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Carol Dweck identified fixed mindset (believing abilities are innate and unchangeable) and growth mindset (believing abilities can be developed through effort and learning). People with a growth mindset are more likely to embrace challenges and persist through setbacks.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'growth mindset',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 87,
    question: 'According to HSE guidance, what is the recommended duration for a toolbox talk?',
    options: [
      '1-2 minutes',
      '45-60 minutes',
      '20-30 minutes',
      '5-10 minutes',
    ] as const,
    correctAnswer: 3,
    explanation:
      'HSE guidance recommends toolbox talks last between 5 and 10 minutes. This keeps them focused on a single topic, maintains attention, and allows time for two-way communication without significantly disrupting the working day.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'toolbox talks',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 88,
    question:
      'Under CDM 2015, which regulation places a duty on contractors to provide instruction and information to workers?',
    options: [
      'Regulation 15',
      'Regulation 8',
      'Regulation 4',
      'Regulation 22',
    ] as const,
    correctAnswer: 0,
    explanation:
      'CDM 2015 Regulation 15 sets out the duties of contractors: every contractor must ensure each worker under their control is given appropriate supervision, instructions and information (Reg 15(8)-(9)) so construction work can be carried out safely. Toolbox talks are one of the key methods for fulfilling this duty. (Regulation 13 covers the principal contractor\'s duties.)',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'CDM 2015',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 89,
    question: 'What is the classic three-part speech structure?',
    options: [
      'Question, discussion, vote',
      'Introduction, body, conclusion',
      'Greeting, agenda, close',
      'Hook, story, sales pitch',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The classic speech structure consists of an introduction (preview your key points), body (deliver the content), and conclusion (summarise what was covered). This structure helps audiences follow your message and remember key points.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'speech structure',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 90,
    question:
      'In the Toastmasters Pathways programme, what is the primary method for building speaking confidence?',
    options: [
      'Memorising scripts and delivering them word-for-word',
      'Avoiding the audience until anxiety naturally fades on its own',
      'Gradual exposure through progressively challenging speeches',
      'A single intensive day of high-pressure public speaking',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Toastmasters Pathways uses gradual exposure — members progress through increasingly challenging speaking assignments over time. This approach is consistent with systematic desensitisation from CBT, where gradual, repeated exposure reduces anxiety.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'Toastmasters',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 91,
    question: 'What does CBT stand for in the context of managing speaking anxiety?',
    options: [
      'Controlled Breathing Training',
      'Confidence Building Technique',
      'Communication-Based Training',
      'Cognitive Behavioural Therapy',
    ] as const,
    correctAnswer: 3,
    explanation:
      'CBT stands for Cognitive Behavioural Therapy. It helps people identify and challenge unhelpful thought patterns. In the context of speaking anxiety, CBT techniques like cognitive restructuring help replace catastrophic thoughts with more balanced, realistic ones.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'CBT',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 92,
    question: 'The confidence-competence loop describes which relationship?',
    options: [
      'Competence and confidence reinforce each other in a positive cycle',
      'You must be fully competent before you can feel confident',
      'Confidence decreases as competence increases',
      'Higher confidence always leads to higher competence',
    ] as const,
    correctAnswer: 0,
    explanation:
      'The confidence-competence loop describes how increased competence builds confidence, which in turn motivates further practice and learning, building more competence. It is a virtuous cycle — the key is to start with small successes that build both skills and belief.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'confidence-competence loop',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 93,
    question: 'A toolbox talk should focus on how many topics?',
    options: [
      'As many as possible in the time available',
      'One single topic',
      'Five topics minimum',
      'Two or three related topics',
    ] as const,
    correctAnswer: 1,
    explanation:
      'An effective toolbox talk should focus on one single topic. This keeps the message clear, focused and memorable. Trying to cover multiple topics dilutes the message and reduces retention.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'toolbox talks',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 94,
    question: 'What does "vicarious experience" mean as a source of self-efficacy?',
    options: [
      'Successfully completing a difficult task yourself',
      'Feeling calm before a presentation',
      'Watching someone similar to you succeed at a task',
      'Receiving praise from a mentor',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Vicarious experience means observing someone you identify with succeed at a task. When you see a colleague who is similar to you deliver a successful toolbox talk, it strengthens your belief that you can do it too.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'self-efficacy sources',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 95,
    question: 'Approximately what percentage of people experience fear of public speaking?',
    options: [
      '25%',
      '50%',
      '95%',
      '75%',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Research consistently suggests approximately 75% of the population experiences some degree of anxiety about public speaking. If you feel nervous before speaking, you are in the majority.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'speaking anxiety',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 96,
    question:
      'What is the key difference between a fixed mindset and a growth mindset when facing a challenge?',
    options: [
      'Fixed mindset avoids challenges to protect self-image; growth mindset embraces them as opportunities to develop',
      'Fixed mindset welcomes all feedback, while growth mindset takes any criticism personally and hides from it',
      'Fixed mindset believes that effort matters most, while growth mindset relies on natural talent alone',
      'Fixed mindset persists after every setback, while growth mindset gives up quickly and looks elsewhere',
    ] as const,
    correctAnswer: 0,
    explanation:
      'A person with a fixed mindset avoids challenges because failure would confirm a lack of ability. A person with a growth mindset embraces challenges as opportunities to learn and improve.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'growth mindset',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 97,
    question:
      'In CBT cognitive restructuring, what is the first step in managing speaking anxiety?',
    options: [
      'Avoiding situations that trigger anxiety',
      'Identifying the specific unhelpful thought',
      'Practising deep breathing exercises',
      'Visualising a successful outcome',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The first step in CBT cognitive restructuring is identifying the specific unhelpful automatic thought. You must recognise what you are telling yourself before you can challenge and replace it.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'CBT',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 98,
    question: 'What is systematic desensitisation in the context of overcoming speaking anxiety?',
    options: [
      'Avoiding all speaking situations until you finally feel ready to try',
      'Jumping straight into the most challenging speaking situation available',
      'Gradual, step-by-step exposure to increasingly challenging speaking situations',
      'Taking prescribed medication before every speaking engagement you attend',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Systematic desensitisation involves creating an exposure ladder — a hierarchy of increasingly challenging speaking situations — and working through them progressively.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'exposure ladder',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 99,
    question: 'Why is two-way communication important in a toolbox talk?',
    options: [
      'It allows the talk to be delivered far more quickly than a one-way briefing',
      'It removes the need to keep a written record of the talk afterwards',
      'It lets the presenter cover several unrelated topics in one session',
      'It confirms understanding, engages workers and surfaces practical concerns',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Two-way communication during toolbox talks confirms workers have understood the message, engages them actively, and allows them to raise practical concerns or questions.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'toolbox talks',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 100,
    question:
      'A newly qualified electrician feels like a fraud despite passing their AM2 assessment. This is best described as:',
    options: [
      'Imposter syndrome as described by Clance and Imes (1978)',
      'A fixed mindset as described by Carol Dweck',
      'Glossophobia, the fear of public speaking',
      'Low self-efficacy caused by a lack of mastery experience',
    ] as const,
    correctAnswer: 0,
    explanation:
      'This is a classic example of imposter syndrome — feeling like a fraud despite objective evidence of competence (passing the AM2 assessment). Clance and Imes (1978) described how high-achieving individuals persistently believe they do not deserve their success.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'imposter syndrome',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 101,
    question: 'Which of the following is the correct structure for an effective toolbox talk?',
    options: [
      'Theory first, then practical examples, then a written test',
      'Opening hook, single-topic body with key points, close with action or understanding check',
      'Read aloud from a safety document, ask if there are any questions, sign the register',
      'Present multiple topics briefly, then issue a handout',
    ] as const,
    correctAnswer: 1,
    explanation:
      'An effective toolbox talk follows: an opening hook to capture attention, a focused body covering one topic with 2-3 key points, and a close that checks understanding or requires action.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'toolbox talks',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 102,
    question: 'What documentation should be completed after delivering a toolbox talk?',
    options: [
      'A full written risk assessment for every hazard on the entire site',
      'A method statement signed by the principal designer and client',
      'A record of the topic, date, presenter, attendee signatures and actions agreed',
      'A formal training certificate issued to each attendee by an awarding body',
    ] as const,
    correctAnswer: 2,
    explanation:
      'A proper record should include the topic, date and time, presenter, attendee signatures, questions raised, and actions agreed. This demonstrates compliance with the contractor\'s duty to provide instruction and information under CDM 2015 Regulation 15.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'toolbox talks',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 103,
    question:
      'Regarding Amy Cuddy research on body language and confidence, which statement is most accurate?',
    options: [
      'The hormonal effects of power posing have been fully confirmed by repeated studies',
      'Power posing has been shown to reliably improve audience perception of the speaker',
      'The research proved that posture has no effect on confidence whatsoever',
      'The original hormonal claims have been debated in replication studies, but the finding that expansive postures can increase subjective feelings of confidence has more support',
    ] as const,
    correctAnswer: 3,
    explanation:
      'The original hormonal claims were not consistently replicated. However, the more modest finding that open postures before a stressful situation can increase subjective confidence has more support. The takeaway is about preparing your mindset, not guaranteed hormonal changes.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'Amy Cuddy',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 104,
    question: 'How does social persuasion work as a source of self-efficacy according to Bandura?',
    options: [
      'Verbal encouragement from a respected person can strengthen belief in your abilities, though weaker than mastery experience',
      'Repeatedly succeeding at a difficult task builds the strongest belief in your ability, more than anything else can',
      'Watching a similar person succeed at the task convinces you that you are able to do the very same thing yourself',
      'Feeling physically calm and steady before a task signals to you that you are well able to cope with what is coming',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Social persuasion — encouragement from others — can boost self-efficacy, particularly when from someone you respect. While weaker than mastery experience, it can provide the push someone needs to attempt a challenging task.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'self-efficacy sources',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 105,
    question:
      'Which emotional/physiological state is most likely to undermine self-efficacy according to Bandura?',
    options: [
      'A calm, settled feeling shortly before stepping up to speak',
      'High anxiety with physical symptoms such as trembling and nausea',
      'Mild excitement and a slightly raised heart rate before a presentation',
      'A feeling of focused alertness during the first few minutes of speaking',
    ] as const,
    correctAnswer: 1,
    explanation:
      'High anxiety with physical symptoms is interpreted as evidence that you cannot cope, undermining self-efficacy. Learning to manage these responses through techniques like box breathing directly improves self-efficacy.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'self-efficacy sources',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 106,
    question:
      'When delivering a toolbox talk on electrical isolation, what should the opening hook achieve?',
    options: [
      'Summarise every single point that will be covered, in fine technical detail, before starting',
      'List all of the regulations and British Standards that apply before introducing the topic',
      'Capture attention with a real example, statistic or question that makes the topic personally relevant',
      'Take the register and collect all of the attendance signatures before anything else is said',
    ] as const,
    correctAnswer: 2,
    explanation:
      'The opening hook should capture attention and make the topic feel personally relevant. A real-world incident, a startling statistic, or a direct question all work effectively.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'toolbox talks',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 107,
    question: 'What does "reading the room" mean in the context of presentations?',
    options: [
      'Reading your prepared notes aloud word-for-word so that nothing at all is missed out',
      'Checking the room layout, the seating and the equipment before the audience arrives',
      'Reciting the whole agenda at the start so that everyone knows exactly what is coming',
      'Observing audience body language, energy levels and engagement to adjust delivery in real time',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Reading the room means observing your audience in real time — noticing if they look engaged, confused, bored or distracted — and adjusting your delivery accordingly.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'presentations',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 108,
    question: 'What is the "exposure ladder" approach to overcoming speaking anxiety?',
    options: [
      'Ranking fears from least to most anxiety-provoking and working through them progressively',
      'Avoiding every speaking situation until the fear finally disappears on its own',
      'Starting with the most terrifying situation in order to get it over with quickly',
      'Climbing up a literal ladder or platform in order to practise speaking from a height',
    ] as const,
    correctAnswer: 0,
    explanation:
      'An exposure ladder ranks speaking situations from least to most challenging. You work through progressively, building confidence at each step before moving to the next.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'exposure ladder',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 109,
    question: 'When presenting a quote to a client, what is the recommended approach?',
    options: [
      'Email the figure with no breakdown and let the client raise any queries',
      'Walk them through it in person, explaining scope, timeline and price',
      'Quote a round number verbally and follow up with paperwork later',
      'Leave a printed quote in the letterbox without any explanation',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Walking a client through a quote in person allows you to explain scope, timeline and price, use visual aids, answer questions in real time, and build rapport.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'client presentations',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 110,
    question: 'The Toastmasters Pathways programme organises learning into how many paths?',
    options: [
      '3',
      '6',
      '11',
      '15',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Toastmasters Pathways offers 11 different learning paths, each containing 5 levels of progressively challenging projects. Members choose a path aligned with their development goals.',
    section: 'Speaking with Confidence',
    difficulty: 'intermediate' as const,
    topic: 'Toastmasters',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 111,
    question:
      'A site supervisor wants to build confidence in running progress meetings. Using Bandura theory, what is the most effective first step?',
    options: [
      'Reading a detailed written guide on how to chair progress meetings well',
      'Watching video recordings of senior managers running large progress meetings',
      'Telling themselves repeatedly that they are already a confident chairperson',
      'Starting by chairing a small, low-stakes team meeting to gain a mastery experience',
    ] as const,
    correctAnswer: 3,
    explanation:
      'According to Bandura, mastery experiences are the most powerful source of self-efficacy. Starting with a small, low-stakes meeting provides an achievable first success that builds genuine confidence.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced' as const,
    topic: 'self-efficacy sources',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 112,
    question:
      'An electrician has the automatic thought: "Everyone will think I do not know what I am talking about" before their first toolbox talk. Using CBT, what is the most effective response?',
    options: [
      'Challenge the thought by examining evidence: "I am qualified, I was asked because of my knowledge, and the audience wants to learn"',
      'Accept the thought as entirely accurate and ask a more experienced colleague to deliver the toolbox talk instead of you',
      'Suppress the thought entirely and refuse to think about the toolbox talk at all until the moment you have to stand up and speak',
      'Repeat the affirmation "I am brilliant at this" over and over again until the unhelpful thought finally disappears altogether',
    ] as const,
    correctAnswer: 0,
    explanation:
      'CBT cognitive restructuring involves examining evidence for and against the unhelpful thought. The balanced thought acknowledges anxiety but replaces catastrophic prediction with realistic evidence.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced' as const,
    topic: 'CBT',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 113,
    question:
      'How should a construction professional handle being asked a question they cannot answer during a presentation?',
    options: [
      'Give a confident-sounding guess so as not to appear unprepared in front of everyone who is present',
      'Acknowledge they do not have the answer, commit to finding out, and follow up within an agreed timeframe',
      'Change the subject quickly and simply hope that no one asks the same question again later in the talk',
      'Tell the questioner that the answer is far too complex to explain in the time that is available',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Honest acknowledgement followed by a commitment to follow up builds more trust than bluffing. Saying "Let me check and get back to you by Friday" demonstrates professionalism and integrity.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced' as const,
    topic: 'presentations',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 114,
    question:
      'Why is imposter syndrome particularly relevant to tradespeople who have recently qualified?',
    options: [
      'Because newly qualified tradespeople have usually not yet passed their final assessment, so their doubts are entirely justified',
      'Because employers rarely give newly qualified tradespeople any real responsibility, so they have no chance to build confidence',
      'The transition from supervised apprentice to autonomous professional creates a gap between objective competence and subjective confidence',
      'Because imposter syndrome only ever affects people early in their working lives and disappears completely once they gain experience',
    ] as const,
    correctAnswer: 2,
    explanation:
      'The transition from apprentice (supervised) to qualified professional (autonomous) creates a natural gap between actual ability and felt confidence. Clance and Imes described how achievers attribute success to luck rather than ability.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced' as const,
    topic: 'imposter syndrome',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 115,
    question: 'How can the physiological sigh technique be used to manage anxiety before speaking?',
    options: [
      'One slow inhale through the mouth followed by holding the breath for ten seconds',
      'Rapid shallow breaths through the mouth to raise your energy level',
      'Holding your breath as long as possible to slow your heart rate',
      'Two quick inhales through the nose followed by a long exhale through the mouth',
    ] as const,
    correctAnswer: 3,
    explanation:
      'The physiological sigh consists of two quick inhales through the nose followed by a long, slow exhale through the mouth. Research suggests this is one of the fastest ways to reduce physiological stress.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced' as const,
    topic: 'anxiety management',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 116,
    question:
      'A project manager needs a reluctant electrician to deliver a toolbox talk. Applying all four Bandura self-efficacy sources, which approach is most effective?',
    options: [
      'Let them observe a colleague (vicarious), encourage them (social persuasion), help them prepare to reduce anxiety (emotional state), then start with a small group (mastery)',
      'Order them to deliver the talk to the whole site immediately with no preparation',
      'Provide written notes and leave them to deliver the talk without any support',
      'Wait until they volunteer, since confidence cannot be developed deliberately',
    ] as const,
    correctAnswer: 0,
    explanation:
      'This systematically addresses all four Bandura sources: vicarious experience (watching), social persuasion (encouragement), emotional state management (preparation), and mastery experience (small achievable audience).',
    section: 'Speaking with Confidence',
    difficulty: 'advanced' as const,
    topic: 'self-efficacy sources',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 117,
    question: 'What is the critical limitation of Amy Cuddy power posing research?',
    options: [
      'The research only ever tested people who were already confident public speakers, so it tells us nothing new',
      'The original hormonal claims were not consistently replicated, though subjective confidence findings have more support',
      'The research has since been fully replicated in every respect and now has no remaining limitations at all',
      'The research applied only to written communication and never to any kind of face-to-face situation at all',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The original hormonal claims (testosterone increase, cortisol decrease) were not consistently replicated. The more modest claim about subjective confidence has more support. Responsible teaching acknowledges this debate.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced' as const,
    topic: 'Amy Cuddy',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 118,
    question:
      'When using storytelling in a client presentation, what makes a construction story effective?',
    options: [
      'As long and as detailed as possible, so as to show the client the full extent of your experience',
      'Focused entirely on your own past achievements in order to impress the client with all of them',
      'Relevant to the client situation, concise, has a clear point, and demonstrates experience without boasting',
      'Designed to highlight the problems caused by the other contractors whose work you have followed',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Effective storytelling is relevant (connects to the client situation), concise (does not derail), purposeful (has a clear takeaway), and authentic (demonstrates experience naturally).',
    section: 'Speaking with Confidence',
    difficulty: 'advanced' as const,
    topic: 'presentations',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 119,
    question:
      'What is the relationship between Bandura self-efficacy theory and Toastmasters Pathways?',
    options: [
      'Toastmasters contradicts Bandura theory by relying solely on social persuasion',
      'Toastmasters and Bandura theory address completely unrelated skills',
      'Toastmasters predates Bandura and inspired his self-efficacy research',
      'Toastmasters operationalises Bandura theory: mastery through progressive challenges, vicarious learning, social persuasion through evaluations, and managing anxiety through practice',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Toastmasters Pathways is a practical application of Bandura theory. Members build mastery through progressive speeches, gain vicarious experience watching others, receive social persuasion through evaluations, and manage emotional state through repeated practice.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced' as const,
    topic: 'Toastmasters',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 120,
    question:
      'A contractor avoids speaking in meetings, claiming "I am not a natural speaker." Using Dweck growth mindset, how should this be addressed?',
    options: [
      'Help them reframe from "I am not a speaker" (fixed) to "I have not developed this skill yet" (growth), then create opportunities for gradual practice',
      'Accept that some people are simply not built for speaking and excuse them from meetings',
      'Insist they speak at every meeting until the fear is forced out of them',
      'Reassure them that speaking skills are irrelevant to their trade anyway',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Dweck distinguishes fixed mindset ("I am not a speaker") from growth mindset ("I have not developed this skill yet"). The effective approach combines reframing the belief with practical opportunities for gradual development.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced' as const,
    topic: 'growth mindset',
    category: 'Speaking with Confidence' as const,
  },

  // ---------------------------------------------------------------------------
  // Category 4: Professional Writing & Digital Communication (40 questions, id 121-160)
  // ---------------------------------------------------------------------------
  {
    id: 121,
    question: 'What are the five essential components of a professional email?',
    options: [
      'Emoji, greeting, body, sign-off, disclaimer',
      'Subject line, greeting, body, closing, signature',
      'Header, introduction, argument, counter-argument, conclusion',
      'Date, recipient, cc list, message, attachment',
    ] as const,
    correctAnswer: 1,
    explanation:
      'A professional email includes a clear subject line, appropriate greeting, well-structured body, professional closing, and signature with contact details.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'email structure',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 122,
    question: 'What is the "24-hour rule" for emails?',
    options: [
      'Every email must receive a reply within 24 hours of being received',
      'Emails should never be sent more than 24 hours after an event occurs',
      'If you feel emotional about an email, wait 24 hours before sending your reply',
      'Emails should be deleted from the server 24 hours after being read',
    ] as const,
    correctAnswer: 2,
    explanation:
      'The 24-hour rule states that if you feel angry or emotional about an email, wait 24 hours before drafting your response. This prevents sending something you may regret.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'email etiquette',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 123,
    question: 'What type of writing should be used in a site diary?',
    options: [
      'Persuasive writing that argues your side of any dispute',
      'Informal notes using abbreviations and personal shorthand',
      'Opinion-led writing that records how you felt about events',
      'Factual, objective writing in the active voice',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Site diary entries should use factual, objective writing in the active voice. They record what happened, when, who was involved, and any decisions made.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'site diaries',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 124,
    question: 'What must a written quote include as a minimum?',
    options: [
      'Scope of work, exclusions, price, validity period and payment terms',
      'The client\'s full credit history and details of any previous tradespeople used',
      'A photograph of every product to be installed and its manufacturer warranty',
      'A day-by-day breakdown of which worker will be on site at each hour',
    ] as const,
    correctAnswer: 0,
    explanation:
      'A professional quote should include scope of work, exclusions, price, validity period, and payment terms. This protects both tradesperson and client.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'quotes and proposals',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 125,
    question: 'What does GDPR stand for?',
    options: [
      'Government Data Processing Rules',
      'General Data Protection Regulation',
      'Global Digital Privacy Requirements',
      'Guaranteed Data Privacy Rights',
    ] as const,
    correctAnswer: 1,
    explanation:
      'GDPR stands for General Data Protection Regulation. It governs how personal data is collected, stored and used, including customer details and site photographs.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'GDPR',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 126,
    question: 'What is "negativity bias" in text-based communication?',
    options: [
      'Recipients tend to remember only the positive parts of a written message and forget all of the rest of it',
      'Senders unconsciously write their messages in a far more negative tone than they actually intend to use when writing',
      'Text messages tend to be interpreted more negatively than intended because tone is stripped from written words',
      'Negative messages are statistically far more likely to be opened and read quickly than positive ones are',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Negativity bias in text means recipients tend to interpret messages more negatively than intended because text lacks tone, facial expressions and body language.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'digital communication',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 127,
    question: 'Under JCT contracts, what is a site diary primarily used for?',
    options: [
      'Calculating the final account and issuing the invoice for the main contractor at the end of the job',
      'Recording the personal contact details and vehicle registrations of each of the visitors',
      'Setting out the full design specification for the works that are to be carried out on the site',
      'Providing a contemporaneous record of events, progress, weather, labour and issues on site',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Under JCT contracts, a site diary provides a contemporaneous record of daily events including weather, labour, progress, instructions received, visitors, deliveries, and delays.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'site diaries',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 128,
    question: 'When should you choose a phone call over an email?',
    options: [
      'When the matter is urgent, complex, sensitive, or requires back-and-forth discussion',
      'When you need a permanent written record of exactly what was agreed and when it was agreed',
      'When the same routine information must be sent out to many different recipients at once',
      'When the message is purely factual and requires no immediate response from anyone at all',
    ] as const,
    correctAnswer: 0,
    explanation:
      'A phone call is more appropriate when matters are urgent, complex, sensitive, or require real-time discussion. Email suits non-urgent information and creating records.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'communication channel',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 129,
    question: 'What is "reply-all" etiquette?',
    options: [
      'Always use reply-all so that everyone on the thread stays fully informed of it',
      'Only use reply-all when your response is genuinely relevant to everyone on the thread',
      'Never use reply-all under any circumstances whatsoever in a professional working setting',
      'Use reply-all only when you are replying to someone more senior than yourself',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Reply-all should only be used when your response is genuinely relevant to every person on the thread. Unnecessary reply-all messages create inbox clutter.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'email etiquette',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 130,
    question: 'What is the difference between "scope" and "exclusions" in a quote?',
    options: [
      'Scope is the total price; exclusions are the optional extras a client can add',
      'Scope is the payment schedule; exclusions are the late-payment penalties',
      'Scope describes what IS included; exclusions describe what is NOT included',
      'Scope is the validity period; exclusions are the warranty conditions',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Scope defines what work is included in the quoted price. Exclusions explicitly state what is not included. Clear scope and exclusions prevent disputes.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'quotes and proposals',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 131,
    question: 'What is the purpose of a validity period on a quote?',
    options: [
      'States how long the completed work is guaranteed against defects',
      'States the date by which the client must pay the final invoice',
      'States how long the job is expected to take from start to finish',
      'States how long the quoted price remains valid',
    ] as const,
    correctAnswer: 3,
    explanation:
      'A validity period states how long the quoted price will be honoured. After this period, costs may have changed and the tradesperson reserves the right to requote.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'quotes and proposals',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 132,
    question: 'What should an email subject line achieve?',
    options: [
      'Clearly and concisely summarise the purpose or action required',
      'Contain the full message so the recipient need not open the email',
      'Be left blank so the recipient reads the message with no preconception',
      'Repeat the recipient\'s name to make the email feel personal',
    ] as const,
    correctAnswer: 0,
    explanation:
      'An effective subject line clearly summarises the purpose: "Site access confirmation — 14 March" or "Quote ref. 2024-087 — domestic rewire".',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'email structure',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 133,
    question: 'What is the primary purpose of a signature block on professional emails?',
    options: [
      'Summarise the key points of the email so that the body need not be read in full',
      'Provide contact details, role, company information and relevant accreditations',
      'Display a legal disclaimer that overrides anything written in the body of the email',
      'Confirm that the recipient has read and agreed to the content of the email',
    ] as const,
    correctAnswer: 1,
    explanation:
      'A signature block provides contact information, identifies your role and company, and can include accreditations (NICEIC, NAPIT), building credibility.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'email structure',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 134,
    question: 'NEC contracts require which approach to record-keeping?',
    options: [
      'Records compiled only at the very end of the project, purely for the purposes of preparing the final account',
      'Verbal records confirmed by the project manager at the weekly progress meetings, with nothing written down',
      'Proactive, contemporaneous record-keeping with early warning notices and compensation event documentation',
      'Minimal record-keeping, relying entirely on the site diary that is kept by the client and by nobody else at all',
    ] as const,
    correctAnswer: 2,
    explanation:
      'NEC contracts emphasise proactive, contemporaneous record-keeping. The Early Warning mechanism requires parties to notify each other of potential problems promptly.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'NEC contracts',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 135,
    question: 'When writing an EICR observation, what is the correct approach?',
    options: [
      'Record a general impression of the whole installation without specifying any locations, codes or regulations',
      'Describe the likely cause of each defect and recommend a specific remedial contractor to carry out the work needed',
      'State your personal opinion of the competence of the original installer and of the standard of their workmanship',
      'Record factual observations with specific locations, citing relevant regulation and correct code (C1, C2, C3, FI)',
    ] as const,
    correctAnswer: 3,
    explanation:
      'EICR observations should be factual, specific and referenced. Each should identify the location, describe the issue, cite the relevant regulation, and assign the classification code.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'technical reports',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 136,
    question: 'What is the recommended approach to managing professional WhatsApp groups?',
    options: [
      'Keep groups focused with clear purposes, separate social chat from work coordination',
      'Add every site contact to one single group so that no one is ever left out of it at all',
      'Allow social and work messages to mix freely in the group in order to build team rapport',
      'Send messages at any hour, since site work runs to very unpredictable schedules',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Professional WhatsApp groups should have a clear purpose, stay focused, and keep social chat separate. Ground rules should be established.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'WhatsApp etiquette',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 137,
    question: 'What is the key principle behind using active voice in professional writing?',
    options: [
      'It makes the writing sound far more formal by hiding who performed the action',
      'Clearly identifies who did what, making writing more direct and accountable',
      'It allows much longer sentences that can include far more technical detail in them',
      'It removes any need at all to name the person who is responsible for an action',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Active voice clearly identifies the subject performing the action: "The electrician installed the consumer unit" is more direct and accountable than passive voice.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'writing skills',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 138,
    question: 'How should a variation be recorded in writing?',
    options: [
      'Noted verbally on site at the time it happens and then confirmed in writing only if a dispute later arises',
      'Recorded only after the work has been finished, so that the final cost of it can be confirmed accurately on the invoice',
      'Documented with variation description, reason, cost implication and written agreement before work is carried out',
      'Added quietly to the original quote without informing the client of the change at any stage of the job itself',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Variations should be documented in writing before additional work is done, including what changed, why, cost and time implications, and written agreement.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'variations',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 139,
    question:
      'Under GDPR, what must a tradesperson consider before sharing site photographs showing identifiable individuals?',
    options: [
      'GDPR does not apply to photographs, only to written records',
      'They only need consent if the photograph is sold for commercial gain',
      'Consent is unnecessary as long as faces are slightly out of focus',
      'They need consent, a legitimate purpose, and secure storage',
    ] as const,
    correctAnswer: 3,
    explanation:
      'GDPR applies to photographs where individuals can be identified. Tradespeople should obtain consent, have a legitimate purpose, store securely, and not share inappropriately.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'GDPR',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 140,
    question: 'What is the tone spectrum in professional email communication?',
    options: [
      'A range from very formal to semi-formal to informal, matched to context',
      'A fixed formal tone that should be used for every email regardless of recipient',
      'The order in which recipients are listed in the To and Cc fields',
      'The volume and emphasis applied when an email is read aloud',
    ] as const,
    correctAnswer: 0,
    explanation:
      'The tone spectrum ranges from very formal (legal correspondence) through semi-formal (standard professional emails) to informal (team chat). Matching tone to context is essential.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'email tone',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 141,
    question: 'When writing a domestic rewire quote, which exclusion is most important to state?',
    options: [
      'The cost of the electrical certificate that is issued on completion',
      'Making good of plaster, decoration and disposal of old materials',
      'The labour rate charged for the qualified electrician alone',
      'The manufacturer of the cable and the accessories that are to be used',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Making good, decoration and disposal are the most common sources of disputes. Clearly excluding them prevents the client assuming they are included.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'quotes and proposals',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 142,
    question: 'Why is ambiguity dangerous in written agreements?',
    options: [
      'It makes the whole agreement appear far less professional to the client',
      'It increases the overall length of the written document unnecessarily',
      'It creates room for different interpretations, leading to disputes',
      'It requires the whole agreement to be witnessed by an independent solicitor',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Ambiguity allows different interpretations of what was agreed. Clear, specific language prevents disputes. "First-fix cabling for 12 power points per drawing E-01" is unambiguous.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'avoiding ambiguity',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 143,
    question: 'What is the decision framework for choosing between phone, text and email?',
    options: [
      'Text for everything that is urgent; phone only for social calls; email never for clients or suppliers',
      'Email for absolutely everything, as it always provides the clearest possible written record of what was agreed',
      'Phone for routine updates; text for formal written records; email for quick day-to-day coordination',
      'Phone for urgent/complex/sensitive; email for formal records; text for brief time-sensitive coordination',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Phone suits urgent, complex or sensitive discussions; email suits formal communication and records; text/WhatsApp suits brief, time-sensitive coordination.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'communication channel',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 144,
    question: 'What language should be avoided in professional quotes?',
    options: [
      'Vague terms like "approximately", "if required", "as necessary" without further definition',
      'Specific quantities such as "12 double socket outlets" or "per drawing number E-01 as issued"',
      'Clear payment terms stating the deposit and the final balance amounts due on completion',
      'Named British Standards and regulation numbers covering the work to be done at the property',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Vague terms create scope for disputes. "Approximately 12 socket outlets" could mean 10 or 15. Every term should be specific and measurable.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'avoiding ambiguity',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 145,
    question: 'What information should a site diary include when recording a delay?',
    options: [
      'A short note simply recording that a delay occurred on that date, with no further detail of any kind',
      'The cause, affected trades, duration, instructions received, and mitigation actions taken',
      'An estimate of who was at fault for the delay and how much compensation is likely to be owed to them',
      'The names of every one of the workers who were sent home early because of the delay that day',
    ] as const,
    correctAnswer: 1,
    explanation:
      'A proper delay record includes cause, affected trades, duration, instructions received, and mitigation actions. This detail supports extension of time claims.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'site diaries',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 146,
    question: 'When is it NOT appropriate to communicate by email?',
    options: [
      'Confirming the agreed start date for a job that has already been scheduled with them',
      'Sending a client a copy of a completed certificate for their own permanent records afterwards',
      'Delivering bad news about a significant project problem requiring immediate discussion',
      'Providing a written summary of a site meeting for the record a short time afterwards',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Email is not appropriate for significant bad news because tone is easily misread and there is no real-time discussion. Deliver bad news by phone or in person first, then follow up in writing.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'communication channel',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 147,
    question:
      'A client sends an angry email about a delay. Following the 24-hour rule, what should you do?',
    options: [
      'Reply immediately with a detailed point-by-point defence of your own position on the delay',
      'Ignore the email completely until the client raises the issue with you once again',
      'Forward the email straight to your whole team and let them decide between them how to respond',
      'Acknowledge receipt briefly, then draft a measured response after you have calmed down',
    ] as const,
    correctAnswer: 3,
    explanation:
      'A brief acknowledgement shows the client you are engaged, while waiting before a substantive response prevents defensive reactions and allows a professional reply.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced' as const,
    topic: 'email etiquette',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 148,
    question:
      'A scope dispute arises where the quote states "electrical installation as per specification E-001." What is the writing error?',
    options: [
      'Referencing a specification rather than listing items creates ambiguity if the specification is later disputed or modified',
      'The quote uses a specification reference instead of stating a fixed total price for the electrical installation at the property',
      'The specification number should also appear in the subject line of every email sent about the job, so it can be traced later',
      'The quote fails to state the validity period of the specification, so the client cannot know how long that price will stand',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Referencing a specification without listing included items creates risk if the specification is revised or if parties have different versions. Best practice is to list items explicitly or clearly state which version applies.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced' as const,
    topic: 'quotes and proposals',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 149,
    question:
      'What is the critical difference between "Plumber did a poor job" versus "Plumber first fix in kitchen did not comply with building regulations — notified site manager at 14:30" in a site diary?',
    options: [
      'The first is a good deal shorter and therefore much quicker to write up at the end of the working day',
      'The first is subjective opinion; the second is factual, specific, time-stamped and records action taken',
      'The first names an individual trade, whereas the second carefully avoids naming anyone who was involved at all',
      'The first entry is written in the passive voice, while the second entry is written in the active voice',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The first is subjective opinion with no specifics. The second is factual, specific, references a standard, includes a timestamp, and records action taken. Only the second has evidential value.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced' as const,
    topic: 'site diaries',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 150,
    question:
      'An electrician shares a progress photo showing a client address on public social media. What issues does this create?',
    options: [
      'It breaches the copyright that is held by the architect in the building design shown in the photograph on the page',
      'It invalidates the electrical certificate that was issued for the installation at that particular address',
      'Potential GDPR breach, security risk (advertising unoccupied property), and privacy violation without consent',
      'It exposes the electrician to personal liability under the Building Regulations for the whole of the installation',
    ] as const,
    correctAnswer: 2,
    explanation:
      'This creates GDPR, security and privacy issues. Best practice is to obtain consent, avoid showing identifiable addresses, and use private or business-only accounts.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced' as const,
    topic: 'GDPR',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 151,
    question:
      'Under NEC contracts, what is the consequence of failing to issue an early warning notice?',
    options: [
      'The whole contract is automatically terminated for a breach by the contractor involved',
      'The project manager must personally pay for any additional costs that result from it',
      'The early warning can simply be issued retrospectively with no penalty of any kind',
      'You may lose the right to claim additional time or money for the resulting event',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Under NEC, failure to issue an early warning can result in losing the right to claim additional time or compensation. The contract assesses events as if the early warning had been given.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced' as const,
    topic: 'NEC contracts',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 152,
    question:
      'How should a professional email handle a chain where the topic has evolved significantly?',
    options: [
      'Start a new email with a new subject line reflecting the current topic',
      'Keep replying on the same chain so all history stays in one place',
      'Delete the old chain and start again with no reference to it',
      'Change the subject line on the existing chain but carry on replying to it',
    ] as const,
    correctAnswer: 0,
    explanation:
      'When an email chain evolves beyond its original topic, start a new email with a relevant subject line. Reference the previous chain while ensuring the new topic is clearly identified.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced' as const,
    topic: 'email etiquette',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 153,
    question:
      'A commercial tender asks for a "fully inclusive price." What is the safest approach?',
    options: [
      'Submit the lowest possible figure and then add further charges later on as each of the issues arises on site',
      'Provide the price but clearly define what "fully inclusive" means by listing all inclusions and exclusions',
      'Decline to quote at all until the tender document itself defines what "fully inclusive" is meant to mean',
      'Quote a high figure that covers every conceivable cost, without itemising any part of it for the client at all',
    ] as const,
    correctAnswer: 1,
    explanation:
      '"Fully inclusive" is inherently ambiguous. By clearly listing inclusions and exclusions, you protect yourself while being transparent.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced' as const,
    topic: 'quotes and proposals',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 154,
    question:
      'Why is it important to keep customer data secure on personal mobile phones under GDPR?',
    options: [
      'GDPR only applies to data that is held on company-owned computers and servers, and never to mobile phones at all',
      'Customer data held on a phone is exempt from GDPR as long as the phone itself is protected by a password or a PIN',
      'Personal data on any device is subject to GDPR, and a lost phone could result in a data breach with ICO fines',
      'GDPR allows unlimited storage of customer data for any length of time, as long as it is never shared with anyone',
    ] as const,
    correctAnswer: 2,
    explanation:
      'GDPR applies to personal data regardless of where stored. A lost or stolen phone with customer data constitutes a data breach. The ICO can fine businesses of any size.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced' as const,
    topic: 'GDPR',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 155,
    question:
      'A subcontractor texts "yeah that price is fine just crack on." Is this sufficient acceptance of a quote?',
    options: [
      'No, because a text message can never form a binding acceptance of a written quote for electrical works',
      'Yes, because any informal agreement is fully sufficient in itself and needs no written follow-up of any kind at all',
      'No, because acceptance is only valid where the client signs a printed copy of the quote in person first',
      'Potentially, but it creates risk — follow up with formal written confirmation referencing the specific quote',
    ] as const,
    correctAnswer: 3,
    explanation:
      'While a text could constitute acceptance, it does not identify which quote, version or terms apply. Best practice is to follow up with formal confirmation referencing the specific quote number and details.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced' as const,
    topic: 'quotes and proposals',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 156,
    question: 'What is the recommended approach when a client requests a mid-project change?',
    options: [
      'Document the change, confirm cost and time implications, obtain written agreement before proceeding, and update the site diary',
      'Carry out the change immediately in order to keep the client happy, and then invoice for all of the extra work at the very end of the job',
      'Refuse all mid-project changes as a matter of firm company policy, so that disputes over cost and time are avoided completely',
      'Make a verbal note of the change on site and rely on the goodwill of the client if any dispute about it later arises between you',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Changes should be documented before work is carried out: describe the change, confirm implications in writing, obtain agreement, and record in the site diary.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced' as const,
    topic: 'variations',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 157,
    question: 'Best practice for sharing progress photos with clients digitally is:',
    options: [
      'Post them on a public social media page so that the client is able to find them easily whenever they want',
      'Send via a dedicated project channel with permission, including context about what the photo shows',
      'Send them with no caption at all, so that the client forms their own impression of the finished work',
      'Share them in a single group chat with all of your other clients at once, so as to save yourself some time',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Use a dedicated channel with permission, provide context about what is shown, and ensure images do not compromise security or GDPR.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'digital communication',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 158,
    question: 'What makes a WhatsApp message professional in a construction context?',
    options: [
      'Sending several short messages in quick succession to convey urgency',
      'Using plenty of abbreviations and emojis so as to keep the overall tone friendly',
      'Clear, purposeful, respectful of working hours, and separate from social chat',
      'Sending messages at any time of the day or night so nothing is forgotten',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Professional WhatsApp messages are clear about what is needed, sent during reasonable hours, kept separate from social conversation, and written with professional courtesy.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate' as const,
    topic: 'WhatsApp etiquette',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 159,
    question: 'What is the recommended date format for site diary entries?',
    options: [
      'A numeric-only format such as "03/04/25" to save space on the page',
      'The day of the week only, such as "Tuesday morning" alone',
      'A relative reference such as "two days after the last delivery"',
      'Unambiguous format such as "14 March 2025" with 24-hour clock',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Use unambiguous date formats and 24-hour clock. Site diaries may be used as evidence years later, so clarity is essential.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'basic' as const,
    topic: 'site diaries',
    category: 'Professional Writing & Digital Communication' as const,
  },
  {
    id: 160,
    question:
      'A colleague posts a photo of defective work by another contractor on a public forum, naming the company. What issues could this create?',
    options: [
      'Potential defamation, damage to professional relationships, GDPR breach if individuals identifiable, and breach of site confidentiality',
      'No issues arise at all, since the defective work is plainly a matter of legitimate public interest to everyone working in the trade today',
      'Only a minor breach of etiquette, carrying no legal or professional consequences of any kind at all for the person who posted the photograph',
      'A breach of the copyright held in the photograph itself, but nothing at all more serious than that for the person who has posted it online',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Publicly naming a company creates defamation risk, damages relationships, possible GDPR issues, and potential confidentiality breach. Use formal channels for genuine concerns.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced' as const,
    topic: 'digital communication',
    category: 'Professional Writing & Digital Communication' as const,
  },

  // ---------------------------------------------------------------------------
  // Category 5: Negotiation, Persuasion & Difficult Conversations (40 questions, id 161-200)
  // ---------------------------------------------------------------------------
  {
    id: 161,
    question: 'Who developed "principled negotiation" in the book "Getting to Yes"?',
    options: [
      'Robert Cialdini, Sharon Bower and Thomas Gordon',
      'Roger Fisher, William Ury and Bruce Patton',
      'Stephen Covey, Eric Berne and Albert Mehrabian',
      'Albert Bandura, Carol Dweck and Amy Cuddy',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Fisher, Ury and Patton of the Harvard Negotiation Project developed principled negotiation, published in "Getting to Yes" (1981).',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'principled negotiation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 162,
    question: 'What does BATNA stand for?',
    options: [
      'Balanced Assessment of Trade Negotiation Alternatives',
      'Basic Approach To Neutral Agreements',
      'Best Alternative To a Negotiated Agreement',
      'Business Analysis for Targeted Negotiation Actions',
    ] as const,
    correctAnswer: 2,
    explanation:
      'BATNA stands for Best Alternative To a Negotiated Agreement. Developed by Fisher, Ury and Patton, it represents your best option if negotiations fail.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'BATNA',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 163,
    question: 'What does the DESC model stand for?',
    options: [
      'Deliver, Explain, Support, Conclude',
      'Determine, Evaluate, Summarise, Communicate',
      'Discuss, Engage, Solve, Confirm',
      'Describe, Express, Specify, Consequences',
    ] as const,
    correctAnswer: 3,
    explanation:
      'The DESC model by Sharon and Gordon Bower stands for Describe (situation factually), Express (your feelings), Specify (what you want), and Consequences (positive outcomes).',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'DESC model',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 164,
    question: 'How many principles of influence did Robert Cialdini identify?',
    options: [
      'Six',
      'Eight',
      'Five',
      'Four',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Cialdini identified six: reciprocity, commitment/consistency, social proof, authority, liking, and scarcity.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'Cialdini principles',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 165,
    question: 'What is the first principle of principled negotiation?',
    options: [
      'Focus on interests, not positions',
      'Separate the people from the problem',
      'Invent options for mutual gain',
      'Insist on objective criteria',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The first principle is "separate the people from the problem" — address the issue without letting personal emotions or egos interfere.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'principled negotiation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 166,
    question: 'What is the "broken record" technique?',
    options: [
      'Raising your voice gradually until the other person backs down',
      'Acknowledging any truth in criticism without conceding your position',
      'Calmly repeating your position without getting drawn into arguments',
      'Restating the other person\'s point back to them to show you understand',
    ] as const,
    correctAnswer: 2,
    explanation:
      'The broken record technique involves calmly repeating your position each time the other person tries to deflect or argue. It is assertive without being aggressive.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'assertive techniques',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 167,
    question: 'What is "fogging" as an assertive communication technique?',
    options: [
      'Deliberately giving vague answers so that the other person eventually loses their own thread',
      'Repeating your own position calmly each and every time that the other person pushes back at you',
      'Deflecting the criticism by immediately raising a complaint of your own against them instead',
      'Agreeing with the truth in criticism without becoming defensive, which defuses aggression',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Fogging involves calmly acknowledging truth in criticism without conceding your position. For example: "You may have received lower quotes. My price reflects quality materials and workmanship."',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'assertive techniques',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 168,
    question:
      'Which Cialdini principle is demonstrated by offering a free inspection before quoting?',
    options: [
      'Reciprocity',
      'Scarcity',
      'Authority',
      'Social proof',
    ] as const,
    correctAnswer: 0,
    explanation:
      'A free inspection demonstrates reciprocity — giving something of value first creates a natural obligation to reciprocate.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'Cialdini principles',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 169,
    question: 'What is the difference between a "position" and an "interest" in negotiation?',
    options: [
      'A position is the opening offer; an interest is the final agreed price',
      'A position is what someone says they want; an interest is why they want it',
      'A position is your walkaway point; an interest is the other party\'s walkaway point',
      'A position is a written demand; an interest is a verbal one',
    ] as const,
    correctAnswer: 1,
    explanation:
      'A position is the stated demand; an interest is the underlying need driving it. Focusing on interests reveals multiple ways to satisfy both parties.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'principled negotiation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 170,
    question: 'Thomas Gordon developed which communication framework?',
    options: [
      'Cognitive Behavioural Therapy',
      'The Shannon-Weaver transmission model',
      'I-messages versus You-messages',
      'Separate the people from the problem',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Thomas Gordon developed I-messages: "I feel concerned when deadlines are missed because..." — expressing feelings without blame.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'I-messages',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 171,
    question: 'What is the preparation framework for a difficult conversation?',
    options: [
      'Rehearse a forceful opening line so the other person knows straight away that you mean business',
      'Avoid any planning beforehand so that the conversation stays completely natural and spontaneous throughout',
      'Wait until tempers flare on site so that the issue is dealt with there and then, in the moment',
      'Plan key points, practise what you will say, choose the right time and place, execute with empathy',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Preparation involves: planning key points, practising (including anticipating responses), choosing appropriate time and place, and executing with empathy.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'difficult conversations',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 172,
    question: 'What is "anchoring" in negotiation?',
    options: [
      'The first number mentioned tends to influence the final outcome',
      'Refusing to state any figure until the other party commits first',
      'Repeating your position calmly until the other party concedes',
      'Splitting the difference between two offers to reach a quick deal',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Anchoring is a cognitive bias where the first number sets a reference point that influences subsequent discussion. Presenting your price first can lead to better outcomes.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'negotiation techniques',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 173,
    question: 'De-escalation techniques are primarily designed to:',
    options: [
      'Win the argument quickly before the other person can respond at all',
      'Reduce emotional intensity so productive conversation can occur',
      'Establish who is at fault before the conversation continues',
      'End the conversation as fast as possible to avoid any confrontation',
    ] as const,
    correctAnswer: 1,
    explanation:
      'De-escalation reduces emotional temperature so rational conversation can resume. Techniques include lowering voice, calm body language, acknowledging feelings, and using their name.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic' as const,
    topic: 'de-escalation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 174,
    question: 'Which Cialdini principle explains why NICEIC or NAPIT logos build trust?',
    options: [
      'Liking',
      'Reciprocity',
      'Authority',
      'Scarcity',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Displaying recognised accreditation logos leverages the authority principle — people trust those who demonstrate expertise and credentials.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'Cialdini principles',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 175,
    question: 'Using DESC, how would you address a consistently late subcontractor?',
    options: [
      '"You are always letting this team down and everybody here has noticed it — sort your timekeeping out this week or you are off the job for good, because I cannot keep covering for you every single morning."',
      '"It does not really matter and nobody here much minds, but if you can manage it then do try to be a bit earlier in future, because it would help the rest of us out on the programme as a whole this month."',
      '"Everyone on this job has noticed that you turn up late every morning and it is becoming a bit of a joke in the canteen and on the scaffold, so you might want to think about doing something about it fairly soon."',
      '"Describe: You have arrived after 09:00 on four occasions. Express: This causes concern as it delays the programme. Specify: I need you on site by 08:00. Consequences: This keeps the project on track"',
    ] as const,
    correctAnswer: 3,
    explanation:
      'DESC provides a structured, assertive approach: factual description, impact expressed, clear specification, and positive consequences. Assertive without being aggressive.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'DESC model',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 176,
    question: 'What does "invent options for mutual gain" mean in principled negotiation?',
    options: [
      'Look for creative solutions where both parties get something they value',
      'Make the first offer so high that any compromise still favours you',
      'Identify your own walkaway point well before the negotiation actually begins',
      'Stick firmly to your opening position until the other side concedes',
    ] as const,
    correctAnswer: 0,
    explanation:
      'This means brainstorming creative solutions that expand possibilities: phased payments, additional scope, or timing adjustments that benefit both parties.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'principled negotiation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 177,
    question: 'How does knowing your BATNA strengthen your negotiation position?',
    options: [
      'It guarantees that the other party will accept your very first offer without any argument at all',
      'It gives you confidence to walk away from a bad deal because you know your best alternative',
      'It removes any need to prepare objective criteria in advance of the negotiation itself',
      'It allows you to anchor the whole discussion with an extreme opening figure of your choosing',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Your BATNA provides a clear benchmark. If the offer is worse, walk away. If better, accept. This eliminates pressure to accept a bad deal.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'BATNA',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 178,
    question: 'What is the "social proof" principle of influence?',
    options: [
      'People comply more with those who hold recognised credentials',
      'People feel obliged to return a favour they have been given',
      'People follow the behaviour of others, especially in uncertainty',
      'People value something more when it appears to be in short supply',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Social proof is the tendency to follow others behaviour, especially when uncertain. Customer testimonials and case studies leverage this principle.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'Cialdini principles',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 179,
    question: 'How should you deliver bad news about a cost overrun?',
    options: [
      'Delay telling the client anything at all until the work is finished and the final bill has been prepared',
      'Bury the extra cost somewhere in the final invoice without ever flagging it to the client in advance at all',
      'Email a brief note about it so that you do not have to discuss the matter with the client face to face',
      'Be direct and honest, explain what happened and why, present cost impact clearly, and offer solutions',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Bad news should be direct, honest and prompt. Explain facts, cause, impact, and solutions. Clients respect honesty even when news is unwelcome.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'difficult conversations',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 180,
    question: 'What is "framing" in negotiation?',
    options: [
      'Presenting information in a way that emphasises different aspects to influence perception',
      'Setting the first figure so as to anchor the whole discussion in your own clear favour',
      'Knowingly making a false statement about the work in order to gain a commercial advantage here',
      'Repeating your own position calmly and firmly until the other party finally gives way',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Framing presents the same information differently: "This upgrade costs £800" versus "For £800 you get RCD protection that could save your family." Both factually correct but different emphasis.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'influence techniques',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 181,
    question: 'When addressing unsafe behaviour on site, what is the recommended approach?',
    options: [
      'Call it out loudly in front of the whole team so as to set a clear example to everyone else on the site that day',
      'Address privately, describe the specific behaviour factually, explain the risk, and agree the correct procedure',
      'Ignore it on the first occasion and act only if exactly the same behaviour is repeated later on that job',
      'Report it straight to the HSE without first speaking to the worker or to the site manager about what you saw on site',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Address promptly but privately, describe behaviour factually, explain risk, and agree correct procedure. Public humiliation creates resentment without improving safety.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'difficult conversations',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 182,
    question: 'What does "insist on objective criteria" mean in principled negotiation?',
    options: [
      'Holding firmly to your own stated position until the other party finally gives way',
      'Knowing your best alternative to a deal so that you can walk away from it if you need to',
      'Base agreements on fair, independent standards rather than pressure or willpower',
      'Separating the people from the problem in order to keep emotions out of the discussion',
    ] as const,
    correctAnswer: 2,
    explanation:
      'The fourth principle means using industry benchmarks, published rates, or objective measurements rather than pressure tactics.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'principled negotiation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 183,
    question: 'Which statement best describes Cialdini\'s "commitment and consistency" principle?',
    options: [
      'People tend to comply far more readily with requests that come from those they happen to like best',
      'People value an offer far more highly when it appears to be scarce or is strictly time-limited in some way',
      'People defer to those who display recognised expertise and formal professional qualifications',
      'Once someone makes a small commitment, they are more likely to follow through with a larger related one',
    ] as const,
    correctAnswer: 3,
    explanation:
      'People act consistently with previous commitments. Once a client agrees to a small step (survey), they are more likely to follow through with a larger one (accepting the quote).',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'Cialdini principles',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 184,
    question:
      'What is the difference between assertive and aggressive communication when chasing an unpaid invoice?',
    options: [
      'Assertive states rights and facts calmly; aggressive attacks the person',
      'Assertive avoids mentioning the debt; aggressive states it plainly',
      'Assertive is always done in writing; aggressive is always done by phone',
      'Assertive gives in to keep the client; aggressive holds firm on the facts',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Assertive: "The invoice was due on 1 March and payment has not been received. Please arrange within 7 days." Aggressive: "You always take the mick." Assertive maintains relationships.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'assertive communication',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 185,
    question:
      'How would you convert "You never give me enough time" into a Thomas Gordon I-message?',
    options: [
      '"You need to start giving me realistic deadlines from now on, because the ones you keep setting are simply impossible to meet."',
      '"I feel under pressure when timescales are tight because I want to deliver quality work. Could we discuss the programme?"',
      '"Why do you always set deadlines that are completely impossible for anybody working on this job to meet on time at all?"',
      '"Everyone on the team thinks the deadlines you keep setting are unreasonable, and every single one of them has said so to me."',
    ] as const,
    correctAnswer: 1,
    explanation:
      'An I-message has three parts: I feel (emotion), when (situation), because (impact). This avoids blame while clearly expressing the concern.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'I-messages',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 186,
    question: 'What is "saying no professionally"?',
    options: [
      'Avoiding giving any direct answer at all, in the hope that the request will quietly go away in time',
      'Agreeing reluctantly to the request in order to avoid any awkwardness with the other person involved',
      'Declining clearly and respectfully, with a brief explanation and where possible an alternative',
      'Refusing bluntly and then ending the conversation there in order to make your own position clear to them',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Professional assertive refusal involves: a clear no, brief explanation, and where possible an alternative suggestion. This maintains the relationship while protecting boundaries.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'assertive communication',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 187,
    question:
      'Cialdini "liking" principle suggests people agree more with those they like. How is this applied ethically?',
    options: [
      'Flatter the client repeatedly so that they feel obliged to choose you rather than anyone else on price',
      'Pretend to share every single opinion that the client expresses, in order to win them over as quickly as possible',
      'Mirror the accent and the mannerisms of the client so as to seem far more similar to them than you are',
      'Build genuine rapport through professionalism, reliability, clear communication and authentic common ground',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Build genuine relationships through consistent professionalism, reliability, and finding authentic common ground. This is not manipulation — it is simply being a good professional.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'Cialdini principles',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 188,
    question: 'What is the key danger of positional bargaining versus principled negotiation?',
    options: [
      'It focuses on winning and losing rather than solutions, often damaging relationships and producing suboptimal outcomes',
      'It always takes a great deal longer to reach any agreement at all, whatever the parties involved actually want out of it',
      'It can only be used where both of the parties involved already trust each other completely right from the outset',
      'It relies entirely on objective criteria and ignores the underlying interests that each of the parties actually holds in it',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Positional bargaining treats negotiation as zero-sum. Principled negotiation creates better outcomes by focusing on interests rather than positions.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'principled negotiation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 189,
    question:
      'Which de-escalation technique is most effective when someone is shouting at you on site?',
    options: [
      'Raise your own voice to match theirs so that you are not drowned out and they can hear exactly what you are saying to them on site',
      'Lower your voice, maintain calm body language, use their name, and acknowledge their frustration before addressing the issue',
      'Walk away from them immediately and refuse to speak to them again until they have apologised properly to you for shouting on site',
      'Stand your ground and list all of the facts loudly back at them until they finally stop shouting and listen properly to what you say',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Lower voice (people match volume), calm body language, use their name (personal connection), and acknowledge emotion before addressing the issue. Productive conversation follows de-escalation.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'de-escalation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 190,
    question:
      'A client says "Your price is too high — my mate would do it for half." Using principled negotiation, what is the best response?',
    options: [
      'Immediately drop your price to match the figure that the client says his mate has quoted, so that you win the work and can then make the difference back later on the extras and the variations that follow',
      'Tell the client that their mate clearly is not a properly qualified electrician and that any work he does will be unsafe, uncertificated and impossible for anyone at all to sign off afterwards',
      'Acknowledge their concern, explore interests, use objective criteria: "I understand price is important. What does that quote include? My price is based on NICEIC standards and full certification"',
      'End the conversation there and then, since a client who haggles over the price at this stage is never going to be worth either the work or the trouble that follows on later in the job itself',
    ] as const,
    correctAnswer: 2,
    explanation:
      'This applies principled negotiation: separates person from problem, focuses on interests, and uses objective criteria. It invites scope comparison rather than just price.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'principled negotiation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 191,
    question:
      'An electrician needs to tell a client a rewire will cost 30% more due to unforeseen asbestos. Using DESC and principled negotiation, what approach is best?',
    options: [
      'Carry out the asbestos removal first and add the whole cost to the final bill without warning the customer, so that the programme is not held up while they think it over and the job still finishes on time in the end',
      'Quietly absorb the extra cost of the asbestos removal yourself in order to avoid an awkward conversation about money, and then make the loss back gradually on the next few jobs that you price for them later at cost',
      'Pause the job entirely and tell the client that you cannot continue on site until they accept the increase in full, without explaining what was actually found or why the removal now needs to be done at all',
      'Describe: "We discovered asbestos in the ceiling void." Express: "I want to be transparent about cost impact." Specify: "The removal adds £2,400." Consequences: "This ensures safe, regulation-compliant completion"',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Combines DESC structure with principled negotiation: factual description, transparency expressed, exact cost specified, consequence framed in client interest (safety, compliance).',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'DESC model',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 192,
    question:
      'A main contractor pressures you to reduce price by 15% or lose the work. Your BATNA is two other available projects. How does this inform your approach?',
    options: [
      'Evaluate whether the reduced price is still better than your BATNA. If not, decline confidently. If close, negotiate for other value (better payment terms, future work)',
      'Accept the 15% reduction immediately in order to secure the relationship for the future, and try to recover the margin on variations once the job has properly started on site',
      'Refuse to discuss the price at all and walk away from the negotiation entirely, since any contractor who asks for a reduction of that size is not worth working for at all',
      'Counter with a 15% increase in order to anchor the discussion back in your own favour, and then hold firmly to that figure whatever the contractor then says to you in reply',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Your BATNA gives a clear comparison. If the reduction is worse than alternatives, decline confidently. If close, negotiate other value. This demonstrates BATNA power.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'BATNA',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 193,
    question: 'How can Cialdini "scarcity" principle be applied ethically when presenting a quote?',
    options: [
      'Invent a fake deadline for the quote in order to pressure the client into making a decision far more quickly than they otherwise would',
      'Honestly communicate genuine constraints: "My next available start is 6 weeks out, but I could fit you in sooner if we confirm by Friday"',
      'Claim that the materials are about to run out when the stock held is actually quite plentiful, so that the client books the work straight away',
      'Tell every client that they are the last available slot that you have, in order to create a false sense of urgency about the job itself',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Ethical scarcity means honestly communicating genuine constraints — real availability, genuine validity periods, or actual supply timelines. Truthful urgency helps clients make timely decisions.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'Cialdini principles',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 194,
    question:
      'You need to discuss persistent late payment with a long-standing client. Combining I-messages and DESC, what is most effective?',
    options: [
      '"You are always paying late and it is really starting to take the mick — I have got suppliers of my own waiting on that money, and I cannot keep chasing you every single month for invoices that were agreed and signed off months ago now. It is simply not good enough.”"',
      '"Could you possibly try to pay a bit sooner next time, if that is alright with you? I do not want to make any fuss about it, and I do know that things are busy at your end, but it really would help me out a great deal if you could somehow manage to do it properly for me.”"',
      'Describe: "The last three invoices were paid 30+ days late." Express: "I value our relationship, but late payment creates cash flow difficulties." Specify: "I need invoices paid within 14-day terms." Consequences: "This allows me to continue prioritising your work"',
      '"If the next invoice is late then I will have to stop working for you altogether and take the matter further, because I am not prepared to carry the cost of your cash flow on top of your own business as well as my own for any longer than I already have done.”"',
    ] as const,
    correctAnswer: 2,
    explanation:
      'Combines DESC with I-message framing: factual description, impact expressed without blame, clear expectation, positive consequence. Assertive, professional and preserves relationship.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'difficult conversations',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 195,
    question:
      'In negotiation, a party reveals their interest is cash flow certainty rather than lowest price. What options for mutual gain could you explore?',
    options: [
      'Offer the lowest possible headline price and simply absorb any cost increases yourself as and when they arise on site',
      'Insist on one single lump-sum payment on completion of the works, so as to keep the paperwork as simple as possible',
      'Refuse to discuss any payment structure at all until the whole scope of the works has been agreed in writing between you',
      'Fixed monthly payments, milestone billing, or a retainer that provides predictability while maintaining your rate',
    ] as const,
    correctAnswer: 3,
    explanation:
      'Understanding the interest (cash flow certainty) opens creative options satisfying both parties. This is "inventing options for mutual gain" from principled negotiation.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'principled negotiation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 196,
    question:
      'You observe an apprentice, who happens to be the site manager\'s son, performing unsafe cable terminations. How should you approach this?',
    options: [
      'Address the safety issue directly using facts and I-messages, document it, and escalate formally if behaviour continues regardless of relationships',
      'Say nothing about it at all, since raising the matter could easily create friction with the site manager and make the rest of the job on site difficult',
      'Mention it casually to the site manager in passing and then leave them to deal with their own son in whatever way they see fit on the day itself',
      'Wait to see whether anyone is actually harmed by the terminations before deciding whether to say anything at all about it to anybody on site',
    ] as const,
    correctAnswer: 0,
    explanation:
      'Safety is non-negotiable regardless of relationships. Address directly with factual I-messages, document, provide guidance, and follow up. Escalate formally if behaviour continues.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'difficult conversations',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 197,
    question: 'How do BATNA and the "zone of possible agreement" (ZOPA) work together?',
    options: [
      'The ZOPA replaces the need for a BATNA once the negotiation has actually begun, so the walkaway point no longer matters at that stage at all',
      'Your BATNA sets your walkaway point, the other party BATNA sets theirs, and the ZOPA is the range between where agreement is possible',
      'The BATNA is your opening offer and the ZOPA is simply the figure that is finally agreed between the two parties at the very end of it',
      'A strong BATNA always guarantees a wide ZOPA that falls in your own favour, whatever alternatives the other party happens to hold as well',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Your BATNA establishes your minimum; their BATNA establishes their maximum. The ZOPA is the overlap where agreement is possible. If no overlap, no deal.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'BATNA',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 198,
    question:
      'A client becomes aggressive about additional costs, shouting and pointing. Combining de-escalation and assertive communication, what is the correct sequence?',
    options: [
      'Present all of the facts and the figures immediately in order to correct their misunderstanding about the cost of the work',
      'Match their energy and assert your own position firmly and loudly until they eventually calm down and stop shouting at you',
      'De-escalate first (lower voice, acknowledge emotion, let them vent), then once calm use DESC model to address the issue',
      'Walk away at once and refuse to continue with any of the work until they put the whole complaint to you in writing first',
    ] as const,
    correctAnswer: 2,
    explanation:
      'First de-escalate (you cannot reason with someone in fight-or-flight), then use structured assertive communication. Attempting facts during high emotion is ineffective.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'de-escalation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 199,
    question:
      'How can framing and anchoring be combined ethically when presenting to a price-sensitive client?',
    options: [
      'Start with the lowest price that you can possibly manage and simply hope that the client does not go on to ask for anything more later',
      'Present three options anchored around your preferred price, framing each in terms of value: "Our recommended option at £X gives you [benefits]"',
      'Refuse to give any price at all until the client has first revealed the full budget they have set aside, so that you can pitch just underneath it',
      'Quote double what the work is actually worth and expect to negotiate the figure back down by half again later on in the meeting with them',
    ] as const,
    correctAnswer: 1,
    explanation:
      'Three-option pricing anchors around the middle option while framing in terms of value. This helps clients decide based on value rather than focusing solely on the lowest number.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'influence techniques',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 200,
    question:
      'A foreman needs to confront a project manager about contradictory instructions causing rework. Using principled negotiation, I-messages and DESC together, which approach is best?',
    options: [
      'Separate person from problem, describe instances factually (DESC), express impact using I-messages, specify a solution like written instruction confirmation, and frame consequence as mutual interest',
      'Raise it loudly in the next site meeting so that the whole team hears the concern and the project manager is left in no doubt, in front of everyone else there, that the rework was not your fault at all',
      'Send a blunt email listing every single contradiction in order, copy in senior management, and ask for a written explanation of how the contradictory instructions came to be issued on site in the first place',
      'Say nothing at all and quietly absorb the cost of the rework, since challenging a superior on a live project is far more trouble than the money involved will ever turn out to be worth to you at all',
    ] as const,
    correctAnswer: 0,
    explanation:
      'This integrates all three frameworks: principled negotiation (separate people from problem, mutual interests), I-messages (impact without blame), and DESC (structured assertion). Most likely to produce constructive resolution while preserving the working relationship.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'principled negotiation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 201,
    question:
      'You are due to finish a kitchen job today. While testing you find a borrowed neutral shared with the upstairs lighting, and the customer is asking you to switch everything back on before guests arrive tonight. What do you do?',
    options: [
      'Energise it all now and note the defect on the certificate for later attention',
      'Tell the customer the job is finished and book a return visit for early next week',
      'Explain the fault in plain terms, leave it isolated, and confirm in writing',
      'Ask the customer to sign a disclaimer accepting the risk of energising the board',
    ],
    correctAnswer: 2,
    explanation:
      'A borrowed neutral means isolating one circuit does not make the other one dead, so the safe answer is to keep it off, say plainly why, and put it in writing. Energising on a promise to return looks helpful today but leaves a live hazard behind you with your name on the paperwork.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced',
    topic: 'Assertiveness and Safety',
    category: 'Speaking with Confidence',
  },
  {
    id: 202,
    question:
      'You quoted a fixed price for a rewire. Once the floorboards are up you find rubber cable, no earths to the lighting, and a second consumer unit nobody mentioned. The customer is out at work. What is the right move?',
    options: [
      'Stop, show the customer what you found, and issue a priced variation',
      'Absorb the extra work quietly so the price stays exactly as quoted',
      'Carry on and add the extra cost to the final invoice at the end',
      'Complete only the work the quote covered and leave the rest disconnected',
    ],
    correctAnswer: 0,
    explanation:
      'Extra work found after opening up needs to be seen, priced and agreed before it is done, so the customer keeps control of the spend. Carrying on and billing at the end feels efficient but turns a fair charge into a dispute, because the customer never got the chance to say yes.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced',
    topic: 'Quoting and Expectations',
    category: 'Negotiation, Persuasion & Difficult Conversations',
  },
  {
    id: 203,
    question:
      'On a new build you find a SWA you installed yesterday cut through by a groundworker. The groundworker denies going near it and the site is busy. What is the most professional response?',
    options: [
      'Repair it quietly and swallow the cost to avoid a site argument',
      'Raise it loudly at the next site meeting so everyone hears it',
      'Tell the client the other trade is lying and refuse to continue',
      'Photograph it, report it to the site manager, and price the repair',
    ],
    correctAnswer: 3,
    explanation:
      'Damage on a shared site is settled with evidence and the site manager, not with an argument between two trades. Absorbing the cost quietly protects the peace once, but it sets a precedent that your work can be damaged for free and leaves no record when it happens again.',
    section: 'Listening & Understanding Others',
    difficulty: 'advanced',
    topic: 'Site Communication',
    category: 'Listening & Understanding Others',
  },
  {
    id: 204,
    question:
      'You have coded a damaged cable in a loft as C2 on an EICR. The landlord says the property has been fine for years and accuses you of inventing work to win the repair. How do you handle it?',
    options: [
      'Point at the wiring regulations and state that the code is not negotiable',
      'Explain what could happen in plain terms and offer a second opinion',
      'Downgrade it to a C3 so the report reads better and keeps the peace',
      'Suggest they get quotes elsewhere and leave the report unexplained',
    ],
    correctAnswer: 1,
    explanation:
      'Describing the actual risk in everyday language, and being relaxed about another electrician looking, removes the suspicion that you are selling rather than reporting. Quoting regulation numbers back at a sceptical client sounds authoritative but usually hardens the belief that you are hiding behind jargon.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced',
    topic: 'Complaints and Bad News',
    category: 'Negotiation, Persuasion & Difficult Conversations',
  },
  {
    id: 205,
    question:
      'Your apprentice has wired a socket with the line and neutral crossed and you spot it while the client is standing in the room watching. What is the best way to deal with it?',
    options: [
      'Correct the apprentice sharply so the client sees standards are held',
      'Say nothing now and let the client assume the work is finished',
      'Tell the client it will be put right, then coach the apprentice apart',
      'Ask the apprentice to explain the mistake to the client directly',
    ],
    correctAnswer: 2,
    explanation:
      'The client needs to know it is caught and being fixed, and the apprentice needs teaching without an audience, so you split the two conversations. Dressing the apprentice down in front of the client may look rigorous but it damages confidence and makes the client doubt the whole job.',
    section: 'Listening & Understanding Others',
    difficulty: 'advanced',
    topic: 'Site Communication',
    category: 'Listening & Understanding Others',
  },
  {
    id: 206,
    question:
      'A domestic customer points at the consumer unit and asks what the RCD actually does. Which explanation is pitched correctly for someone with no electrical background?',
    options: [
      'It cuts the power fast if electricity finds a path through a person',
      'It is a residual current device that detects an earth fault current',
      'It measures the impedance of the earth fault loop at the board',
      'It protects the cable from overload by limiting the current drawn',
    ],
    correctAnswer: 0,
    explanation:
      'Plain language that names the danger and the outcome gives the customer something they can actually use and remember. Expanding the abbreviation into more technical words feels like an answer but leaves the customer none the wiser and less likely to ask the next question.',
    section: 'Understanding Communication',
    difficulty: 'intermediate',
    topic: 'Customer Communication',
    category: 'Understanding Communication',
  },
  {
    id: 207,
    question:
      'A customer asks how long a fault find will take. You genuinely do not know until you have opened the board and tested. What is the best answer to give at the door?',
    options: [
      'Give the shortest possible time so the customer stays happy',
      'Give a realistic range and say when you will confirm the date',
      'Avoid the question and say it depends on how the work goes',
      'Promise a fixed finish time and adjust it quietly later',
    ],
    correctAnswer: 1,
    explanation:
      'A range plus a promise to firm it up is honest and still gives the customer something to plan around. Quoting the best case to keep the mood pleasant simply moves the disappointment to the afternoon, when it costs you more.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'basic',
    topic: 'Quoting and Expectations',
    category: 'Negotiation, Persuasion & Difficult Conversations',
  },
  {
    id: 208,
    question:
      'By mid afternoon it is clear the consumer unit change will run into a second day because the tails need replacing. The customer took the day off work for this. When and how do you tell them?',
    options: [
      'Send a text at the end of the day once the overrun is certain',
      'Work late without telling them and hope the job still finishes',
      'Wait until the morning so the customer has a full night to rest',
      'Ring as soon as you know, explain why, and agree the new plan',
    ],
    correctAnswer: 3,
    explanation:
      'Bad news given early, by voice, with a reason and a plan, still leaves the customer time to make their own arrangements. Holding it until the end of the day removes their options and makes a genuine technical reason look like an excuse.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced',
    topic: 'Complaints and Bad News',
    category: 'Negotiation, Persuasion & Difficult Conversations',
  },
  {
    id: 209,
    question:
      'You have to leave site with two circuits reconnected but not yet fully tested, and you are back on Thursday. What is the right thing to do before you drive off?',
    options: [
      'Verbally tell the customer which circuits are still live and unfinished',
      'Leave the board unlabelled so nobody assumes the work is complete',
      'Label the board, write down what is incomplete, and give a copy',
      'Rely on the certificate at the end of the job to record the detail',
    ],
    correctAnswer: 2,
    explanation:
      'A label at the board plus a written note the customer keeps survives after you leave and after they forget the conversation. A verbal handover is fine as well, but on its own it leaves no evidence of what state you left the installation in.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate',
    topic: 'Records and Handover',
    category: 'Professional Writing & Digital Communication',
  },
  {
    id: 210,
    question:
      'A main contractor tells you to make a final connection with the distribution board still live because shutting down would delay another trade. How should you respond?',
    options: [
      'State plainly why it will not be done live and offer a shutdown slot',
      'Do it live but wear extra PPE and keep a second person watching',
      'Refuse without explanation and let the contractor find someone else',
      'Ask the contractor to confirm in writing that live work is required',
    ],
    correctAnswer: 0,
    explanation:
      'Refusing while offering a workable alternative keeps you safe and keeps the programme moving, which is what makes the refusal stick. Asking for it in writing feels like protection but a signature from someone else does not make the work any safer for you.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced',
    topic: 'Assertiveness and Safety',
    category: 'Speaking with Confidence',
  },
  {
    id: 211,
    question:
      'A customer shows you a poorly done consumer unit change by another electrician and invites you to say how bad it is. You need the remedial work but you also have to keep this professional. What do you say?',
    options: [
      'Agree that the previous work is poor so the customer trusts you',
      'Describe what you found and what it needs, without naming blame',
      'Say nothing about it and quietly correct the faults you can see',
      'Advise the customer to complain to the previous electrician first',
    ],
    correctAnswer: 1,
    explanation:
      'Sticking to what you can see and what it needs gives the customer the facts and keeps you out of a dispute you were not part of. Joining in the criticism wins a moment of trust but tells the customer that you talk about other jobs, and they will wonder what you say about theirs.',
    section: 'Understanding Communication',
    difficulty: 'advanced',
    topic: 'Customer Communication',
    category: 'Understanding Communication',
  },
  {
    id: 212,
    question:
      'A caller wants a price for a consumer unit change over the phone and says other electricians managed it without visiting. You have not seen the earthing arrangement or the tails. What is the best response?',
    options: [
      'Give a firm price now and adjust it on the day if needed',
      'Refuse to discuss any figure until you have inspected the board',
      'Quote high so there is room to come down after you have looked',
      'Give a typical range and explain what could change the final price',
    ],
    correctAnswer: 3,
    explanation:
      'A range with the reasons it could move answers the real question, which is affordability, without committing you to a price for an installation you have not seen. Refusing to say any number at all sounds careful but usually loses the call to someone less careful.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced',
    topic: 'Quoting and Expectations',
    category: 'Negotiation, Persuasion & Difficult Conversations',
  },
  {
    id: 213,
    question:
      'You walk back onto a refurbishment and the plasterer is about to board a wall where your first fix is not yet complete. What is the most effective thing to do first?',
    options: [
      'Speak to the plasterer now and mark the areas that must stay open',
      'Let it happen and cut the boards back once you return to site',
      'Email the site manager and carry on with your own work',
      'Put your own tape across the wall and say nothing further',
    ],
    correctAnswer: 0,
    explanation:
      'A direct word plus a physical mark stops the problem in the next five minutes, which is the only window that matters here. Escalating by email is the right thing later but on its own it arrives long after the boards are on and someone is paying to cut them off.',
    section: 'Listening & Understanding Others',
    difficulty: 'intermediate',
    topic: 'Site Communication',
    category: 'Listening & Understanding Others',
  },
  {
    id: 214,
    question:
      'An EICR comes back unsatisfactory. The owner says they cannot afford the remedial work this year and asks you to leave things as they are. How do you close the job out?',
    options: [
      'Carry out the work anyway since it is clearly needed for safety',
      'Mark the report satisfactory so the customer can rent it out',
      'Record the refusal in writing and give them the report as found',
      'Withdraw and tell them you will not issue any report at all',
    ],
    correctAnswer: 2,
    explanation:
      'The report records what you found, and a written note that the remedial work was declined protects both of you and leaves the decision where it belongs. Softening the outcome to help someone who is short of money puts your name against a document that is simply untrue.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced',
    topic: 'Records and Handover',
    category: 'Professional Writing & Digital Communication',
  },
  {
    id: 215,
    question:
      'A builder asks you to certify a first fix installed by someone who has since left the job. He says it is all standard work and the sale depends on the paperwork. What do you offer?',
    options: [
      'Sign it on the basis that the other electrician seemed competent',
      'Sign it but add a note that you did not carry out the work',
      'Refuse and tell the client the other electrician was at fault',
      'Offer to inspect and test it yourself and certify what you verify',
    ],
    correctAnswer: 3,
    explanation:
      'Offering to inspect and test turns a request you must refuse into a service you can actually provide, which is what assertiveness looks like in practice. A signature with a disclaimer attached is still your signature, and the caveat will not help you when the installation is questioned.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced',
    topic: 'Assertiveness and Safety',
    category: 'Speaking with Confidence',
  },
  {
    id: 216,
    question:
      'On site the project manager stops you in a corridor and verbally changes the position of six sockets. Everyone is busy and nothing is written down. What should you do?',
    options: [
      'Trust your memory and mention it at the next site meeting',
      'Confirm the instruction by email the same day and keep the reply',
      'Write it in your diary so you have your own private record',
      'Ask for a formal variation order before doing anything else',
    ],
    correctAnswer: 1,
    explanation:
      'A short email the same day turns a corridor conversation into a shared record that the other side has seen and can correct. A private diary entry proves only that you wrote something down, and it carries no weight when the manager remembers the instruction differently.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate',
    topic: 'Records and Handover',
    category: 'Professional Writing & Digital Communication',
  },
  {
    id: 217,
    question:
      'A customer rings shouting that the lights you worked on last week have tripped again and that you have wasted their money. What is the best opening approach on that call?',
    options: [
      'Explain immediately that the fault is unrelated to your work',
      'Offer a refund straight away to stop the complaint escalating',
      'Let them finish, repeat the problem back, then agree a next step',
      'Ask them to put the complaint in writing before you respond',
    ],
    correctAnswer: 2,
    explanation:
      'Letting the customer finish and playing the problem back shows you heard it and gets you the detail you need to diagnose anything. Defending your work in the first sentence, even when you are right, tells the customer you are not listening and the call gets louder.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced',
    topic: 'Complaints and Bad News',
    category: 'Negotiation, Persuasion & Difficult Conversations',
  },
  {
    id: 218,
    question:
      'You are talking a homeowner through an EICR observation about the absence of RCD protection on the socket circuits. Which wording is most likely to be understood?',
    options: [
      'Older boards do not have the switch that trips if someone is shocked',
      'The installation lacks 30 mA additional protection to current standards',
      'The circuits are not compliant with the latest amendment requirements',
      'The board is out of date and the whole thing should be replaced',
    ],
    correctAnswer: 0,
    explanation:
      'Naming the protective device by what it does for a person makes the risk concrete and the recommendation obvious. Compliance language is accurate but abstract, and customers who cannot picture the harm tend to file the report and do nothing.',
    section: 'Understanding Communication',
    difficulty: 'intermediate',
    topic: 'Customer Communication',
    category: 'Understanding Communication',
  },
  {
    id: 219,
    question:
      'After chasing walls for a rewire the customer expects the plaster to be made good, and your quote covered only the electrical work. They are visibly upset. What do you do?',
    options: [
      'Make good anyway to keep the customer happy and protect reviews',
      'Point at the quote wording and tell them it was never included',
      'Do a rough patch and mention that decorating is not your trade',
      'Show what the quote covered and price making good as an option',
    ],
    correctAnswer: 3,
    explanation:
      'Walking the customer through the quote and then offering a priced way to solve the problem keeps the relationship and the margin. Quoting the small print at someone who is upset may be technically correct but it ends the goodwill and often the referral.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced',
    topic: 'Quoting and Expectations',
    category: 'Negotiation, Persuasion & Difficult Conversations',
  },
  {
    id: 220,
    question:
      'You are stuck on an earlier job and will be about ninety minutes late to a domestic appointment. What is the best thing to do?',
    options: [
      'Arrive and apologise once you are at the door',
      'Ring ahead as soon as you know you will be late',
      'Send a message once you have finished the earlier job',
      'Say nothing since a short delay is normal in the trade',
    ],
    correctAnswer: 1,
    explanation:
      'Telling the customer as soon as you know gives them their morning back and costs you nothing but a phone call. Waiting until you are free means they have already sat in waiting for you, which is the part people remember and mention in reviews.',
    section: 'Understanding Communication',
    difficulty: 'basic',
    topic: 'Customer Communication',
    category: 'Understanding Communication',
  },
  {
    id: 221,
    question:
      'You have just completed an EICR today. The landlord asks you to date the report three months earlier so there is no gap between certificates for the letting agent. How do you handle the request?',
    options: [
      'Date it from the day the tenancy actually started instead',
      'Date it as asked since the inspection itself was genuine',
      'Date it today and explain why the date has to match the visit',
      'Issue it undated and let the landlord fill the date in',
    ],
    correctAnswer: 2,
    explanation:
      'The date on a report is a statement about when you were there, so it stays today and you say so calmly rather than apologetically. Moving it to fill a gap seems like a small favour, but it makes the document evidence of something that did not happen and the gap is still there anyway.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'advanced',
    topic: 'Records and Handover',
    category: 'Professional Writing & Digital Communication',
  },
  {
    id: 222,
    question:
      'Your apprentice tells you that a scaffolder has been shouting at them and moving their tools. The apprentice is embarrassed and asks you not to make a fuss. What is the right action?',
    options: [
      'Tell the apprentice to toughen up since sites are like that',
      'Confront the other trade on the spot in front of everyone',
      'Move the apprentice to another area and say nothing more',
      'Get the detail from the apprentice and raise it with the manager',
    ],
    correctAnswer: 3,
    explanation:
      'Taking the account properly and routing it through the site manager deals with the behaviour without putting the apprentice in the middle of a confrontation. Squaring up to the scaffolder there and then may feel like support but it usually makes the apprentice a target once you are off site.',
    section: 'Listening & Understanding Others',
    difficulty: 'advanced',
    topic: 'Site Communication',
    category: 'Listening & Understanding Others',
  },
  {
    id: 223,
    question:
      'You are finishing a small commercial installation and the facilities manager will be responsible for it afterwards. What makes the strongest handover?',
    options: [
      'Hand over the certificate and answer questions if they ring',
      'Give certificates, schedules, a board chart and who to call',
      'Email everything later once the office has typed it up',
      'Leave the paperwork in the riser with the drawings',
    ],
    correctAnswer: 1,
    explanation:
      'A handover that includes the schedules, a board chart and a named contact lets the next person work on the installation safely without ringing you first. Certificates alone tell them the work was done but nothing about what is where, which is what they will actually need at seven in the morning.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate',
    topic: 'Records and Handover',
    category: 'Professional Writing & Digital Communication',
  },
  {
    id: 224,
    question:
      'A shop owner needs a new supply to a display unit but says the tills cannot go down during trading hours, and suggests you find a way around the shutdown. What do you propose?',
    options: [
      'Agree an early or late slot so the isolation can be done properly',
      'Work on it live and keep customers away with barriers',
      'Do the work during trading and isolate only the final connection',
      'Turn the job down and suggest they find another electrician',
    ],
    correctAnswer: 0,
    explanation:
      'Offering a time when the shutdown costs the business nothing removes the reason for the pressure and lets you work dead. Isolating only part of the job is a compromise that leaves you working next to live conductors, which is exactly the risk you were trying to design out.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced',
    topic: 'Assertiveness and Safety',
    category: 'Speaking with Confidence',
  },
  {
    id: 225,
    question:
      'While fixing a back box you drill through a copper pipe in the wall. There is no leak yet because the supply is off, but there will be. The customer is downstairs. What do you do?',
    options: [
      'Fix the pipe quietly before the customer notices the damp',
      'Point out that the pipe was buried without any protection',
      'Tell the customer straight away and explain how it gets fixed',
      'Ring your insurer first and say nothing until they reply',
    ],
    correctAnswer: 2,
    explanation:
      'Telling the customer immediately, with a plan for putting it right, keeps you in charge of the story and usually costs far less than the alternative. A quiet repair is found eventually, and at that point the damage to trust is bigger than the hole in the pipe.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced',
    topic: 'Complaints and Bad News',
    category: 'Negotiation, Persuasion & Difficult Conversations',
  },
  {
    id: 226,
    question:
      'You have finished a consumer unit replacement in an occupied house and are handing back to the owner, who has never had a modern board. What is the most useful thing to cover?',
    options: [
      'Hand over the keys and leave the labels for the customer',
      'Walk them through the labels and show how to reset a trip',
      'Explain the test results in full so nothing is left out',
      'Tell them to ring you whenever anything trips in future',
    ],
    correctAnswer: 1,
    explanation:
      'Showing which switch does what and how to reset one turns the board into something the owner can use rather than something they are afraid of. A full recital of test results is thorough but it is aimed at another electrician, not at the person who will be standing there in the dark.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate',
    topic: 'Records and Handover',
    category: 'Professional Writing & Digital Communication',
  },
  {
    id: 227,
    question:
      'A customer offers to pay in full today if you knock the price down and skip the certificate, saying they will never need it. How should you answer?',
    options: [
      'Give the discount and issue the paperwork later if they ask',
      'Decline the job outright and tell them why it looks dodgy',
      'Give the discount and record the job in your own diary only',
      'Explain the paperwork comes with the job and price it as normal',
    ],
    correctAnswer: 3,
    explanation:
      'Treating certification as part of the job rather than an add on keeps the price honest and removes the negotiation entirely. Agreeing to send it later is the version most people fall for, and it ends with an unissued certificate for work you can no longer inspect.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced',
    topic: 'Quoting and Expectations',
    category: 'Negotiation, Persuasion & Difficult Conversations',
  },
  {
    id: 228,
    question:
      'You arrive at a domestic address for a booked appointment and an elderly customer opens the door. What is the best way to start?',
    options: [
      'Introduce yourself, show ID, and explain what you will do',
      'Get straight to the board so the job starts on time',
      'Ask where the tea things are and start unloading tools',
      'Wait for the customer to ask who you are before speaking',
    ],
    correctAnswer: 0,
    explanation:
      'A name, identification and a short outline of the work settles any doubt about who you are and what is about to happen in the house. Heading straight for the board saves two minutes but leaves an anxious customer following you round wondering what you are doing.',
    section: 'Understanding Communication',
    difficulty: 'basic',
    topic: 'Customer Communication',
    category: 'Understanding Communication',
  },
  {
    id: 229,
    question:
      'The wholesaler tells you at half eight that the replacement RCBO will not arrive until tomorrow. The customer has a circuit off and expects it back on today. What do you do?',
    options: [
      'Fit a similar device from the van and mention it afterwards',
      'Wait until the delivery slot passes before telling them',
      'Tell them now, give the new date, and leave things safe',
      'Blame the wholesaler and let the customer chase the order',
    ],
    correctAnswer: 2,
    explanation:
      'Early news with a firm date and the installation left in a safe state gives the customer something to work with and keeps you credible. Substituting a device that happens to be in the van solves your day but may not suit the board, and it becomes your problem permanently.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced',
    topic: 'Complaints and Bad News',
    category: 'Negotiation, Persuasion & Difficult Conversations',
  },
  {
    id: 230,
    question:
      'Your dead testing needs the supply off for about two hours, which will stop the tilers and the joiners working on the same floor. What is the best way to arrange it?',
    options: [
      'Take the shutdown when you are ready and inform people after',
      'Skip the test that needs the supply off and note it later',
      'Ask the site manager to make everyone else stop work now',
      'Agree a shutdown window in advance and post it on the board',
    ],
    correctAnswer: 3,
    explanation:
      'Booking the window ahead and posting it lets other trades plan round you, which is what stops someone switching the supply back on mid test. Taking the isolation when it suits you gets the testing done once and buys you an argument every time you need to do it again.',
    section: 'Listening & Understanding Others',
    difficulty: 'advanced',
    topic: 'Site Communication',
    category: 'Listening & Understanding Others',
  },
  {
    id: 231,
    question:
      'A customer on a two week rewire is ringing you three or four times a day for updates, and the calls are costing you working time. What is the best way to manage it?',
    options: [
      'Agree a set update time each day and stick to it',
      'Answer every call so the customer never feels ignored',
      'Let calls go to voicemail and reply when the job allows',
      'Ask them to email instead so you can work uninterrupted',
    ],
    correctAnswer: 0,
    explanation:
      'A predictable daily update removes the anxiety that is driving the calls, because the customer knows information is coming. Taking every call is generous but it trains the customer to ring whenever they wonder something, and the rewire takes longer.',
    section: 'Understanding Communication',
    difficulty: 'intermediate',
    topic: 'Customer Communication',
    category: 'Understanding Communication',
  },
  {
    id: 232,
    question:
      'An EICR notes undersized main protective bonding. The homeowner says the house has been like that for thirty years without incident and does not see the point of changing it. What is your best explanation?',
    options: [
      'Tell them nothing happening does not mean it is compliant',
      'Explain what the bonding does and when it would matter',
      'Show them the table in the regulations and the required size',
      'Say it is a minor item and they can leave it if they want',
    ],
    correctAnswer: 1,
    explanation:
      'Explaining that bonding only does its job during a fault answers the real objection, which is that nothing has gone wrong yet. Producing the table proves you are right about the size but says nothing about why it matters, so the customer still declines the work.',
    section: 'Understanding Communication',
    difficulty: 'advanced',
    topic: 'Customer Communication',
    category: 'Understanding Communication',
  },
  {
    id: 233,
    question:
      'During a phone call a landlord declines the SPD upgrade you recommended and says to leave it. The call ends and you are back on site. What should you do about the decision?',
    options: [
      'Note the decision, the date, and confirm it back by message',
      'Trust the customer to remember what they turned down',
      'Write it on the job sheet you keep in the van',
      'Mention it when you next visit the property',
    ],
    correctAnswer: 0,
    explanation:
      'A dated note plus a short confirmation message means both sides hold the same version of what was decided. Relying on the customer to remember is how a declined recommendation becomes an accusation that you never mentioned it.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate',
    topic: 'Records and Handover',
    category: 'Professional Writing & Digital Communication',
  },
  {
    id: 234,
    question:
      'It is Friday afternoon, a circuit is part dismantled, and you are back on Monday. The customer wants the room usable over the weekend and suggests an extension lead through the doorway. What do you do?',
    options: [
      'Leave the extension lead run but tape it down carefully',
      'Leave it as it is and return first thing on Monday',
      'Make it safe or leave it isolated and say why in writing',
      'Ask the customer to accept responsibility for the weekend',
    ],
    correctAnswer: 2,
    explanation:
      'You either leave the installation in a safe usable state or you leave it isolated, and either way the customer gets a written note of what was done and why. Handing the risk over verbally, or dressing up a trailing lead as a solution, leaves a hazard in a house you are responsible for having worked in.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced',
    topic: 'Assertiveness and Safety',
    category: 'Speaking with Confidence',
  },
  {
    id: 235,
    question:
      'A client has changed the socket positions twice and now wants downlights added in two rooms, all after the quote was accepted. How do you keep the job profitable without souring the relationship?',
    options: [
      'Absorb the changes to avoid looking difficult about money',
      'Refuse any further changes until the job is finished',
      'Make the changes and settle the extra cost at the end',
      'Price each change as it comes and get it agreed in writing',
    ],
    correctAnswer: 3,
    explanation:
      'Pricing each change at the moment it is raised keeps the client in control and stops small additions quietly eating the margin. Absorbing them to seem easy going teaches the client that changes are free, and the final invoice conversation gets much harder.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced',
    topic: 'Quoting and Expectations',
    category: 'Negotiation, Persuasion & Difficult Conversations',
  },
  {
    id: 236,
    question:
      'A customer wants a supply to a garden office at the end of a long garden and asks why you have priced a much bigger cable than the one in the house. Which answer lands best?',
    options: [
      'The cable has to carry the current over a long distance safely',
      'A longer run loses more power, so a thicker cable is needed',
      'The impedance rises with length so the volt drop is excessive',
      'Regulations require a larger conductor for that circuit length',
    ],
    correctAnswer: 1,
    explanation:
      'Losing power over distance is an idea the customer already understands from hosepipes and extension leads, so the price makes sense to them. Talking about impedance and volt drop is precise but it sounds like justification, which is exactly what a suspicious customer is listening for.',
    section: 'Understanding Communication',
    difficulty: 'intermediate',
    topic: 'Customer Communication',
    category: 'Understanding Communication',
  },
  {
    id: 237,
    question:
      'A customer says the lights in one room sometimes flicker but not always, and there is nothing happening while you are there. What is the most useful first move?',
    options: [
      'Ask when it happens, what is on, and write the answers down',
      'Start testing immediately since the customer cannot diagnose it',
      'Ask them to keep a note and ring you when it happens again',
      'Explain that intermittent faults are very hard to find',
    ],
    correctAnswer: 0,
    explanation:
      'The customer has been watching the fault for weeks, so their observations narrow the search far faster than testing blind. Going straight to the instruments respects your skill but wastes the one source of evidence you cannot recreate on demand.',
    section: 'Understanding Communication',
    difficulty: 'intermediate',
    topic: 'Customer Communication',
    category: 'Understanding Communication',
  },
  {
    id: 238,
    question:
      'You had a tense conversation with a client about an extra charge and agreed to follow it up in writing. What makes the most effective email?',
    options: [
      'Set out who was at fault so the record is clear',
      'State the facts, the next step, and keep it short',
      'Copy in everyone on site so nothing is missed',
      'Wait a few days until the client has calmed down',
    ],
    correctAnswer: 1,
    explanation:
      'A short factual email with a clear next step is easy to agree to and reads the same in six months as it does today. Rehearsing who was at fault feels satisfying to write but it invites a reply in the same tone and turns a disagreement into a dispute.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate',
    topic: 'Complaints and Bad News',
    category: 'Negotiation, Persuasion & Difficult Conversations',
  },
  {
    id: 239,
    question:
      'You overhear your apprentice on the phone telling a customer that the fault is definitely the shower, when you have not finished testing. What do you do?',
    options: [
      'Take the phone off them straight away and take over',
      'Let them finish and correct the customer afterwards',
      'Step in politely, correct it, then debrief them after',
      'Tell the customer the apprentice was mistaken later',
    ],
    correctAnswer: 2,
    explanation:
      'Correcting the information while the customer is still on the phone stops a wrong expectation forming, and the coaching happens privately afterwards. Letting it run and correcting later means the customer has already decided what the fault is and will resist anything you find instead.',
    section: 'Listening & Understanding Others',
    difficulty: 'advanced',
    topic: 'Site Communication',
    category: 'Listening & Understanding Others',
  },
  {
    id: 240,
    question:
      'Midway through an EICR you find exposed live conductors in a damaged junction box in a cupboard, which is a C1. The customer wants the power left on until the weekend. What do you do?',
    options: [
      'Leave it live and write the C1 clearly on the report',
      'Isolate the whole property until the repair is done',
      'Repair it now and add the cost without discussing it',
      'Isolate the affected part, explain why, and record it',
    ],
    correctAnswer: 3,
    explanation:
      'A C1 means danger is present now, so the affected part comes off, the customer is told plainly why, and it goes on the report. Recording it while leaving it energised documents the hazard without removing it, which helps nobody standing in that cupboard.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced',
    topic: 'Assertiveness and Safety',
    category: 'Speaking with Confidence',
  },
  {
    id: 241,
    question:
      'You attend a callout for a tripping circuit, spend two hours testing and find nothing wrong on the day. The customer objects to paying because nothing was repaired. How do you handle it?',
    options: [
      'Waive the fee since nothing was actually repaired today',
      'Insist the fee stands because your time was booked out',
      'Explain what you tested and why the visit is still chargeable',
      'Offer to return free of charge the next time it happens',
    ],
    correctAnswer: 2,
    explanation:
      'Setting out what you tested and what it has ruled out shows the customer they bought information, not nothing, which is what makes the fee defensible. Simply insisting on the price is true but it gives the customer no reason to agree, and that is the call that becomes a review.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced',
    topic: 'Complaints and Bad News',
    category: 'Negotiation, Persuasion & Difficult Conversations',
  },
  {
    id: 242,
    question:
      'You are carrying out an EICR at a rented flat. The tenant let you in and is asking what you found, but the landlord instructed and pays for the work. What is the right approach?',
    options: [
      'Report findings to the landlord and tell the tenant what is safe',
      'Give the tenant the full report since they live in the property',
      'Report only to the landlord and say nothing to the tenant',
      'Ask the tenant to pass your findings on to the landlord',
    ],
    correctAnswer: 0,
    explanation:
      'The report goes to the person who instructed you, while the tenant is told anything they need for their own safety in the flat that day. Saying nothing at all to someone who lives there is defensible on paper but leaves a person living beside a hazard you know about.',
    section: 'Understanding Communication',
    difficulty: 'intermediate',
    topic: 'Customer Communication',
    category: 'Understanding Communication',
  },
  {
    id: 243,
    question:
      'A joiner on site asks to borrow your voltage indicator so he can move a socket himself, saying he has done it plenty of times before. What do you say?',
    options: [
      'Lend the tester and let them prove dead themselves',
      'Isolate it for them so at least it is done properly',
      'Tell them to find their own electrician for the work',
      'Explain the work needs an electrician and offer to quote',
    ],
    correctAnswer: 3,
    explanation:
      'A clear no with an offer to do the work yourself keeps the site safe and keeps the relationship, which is why it holds up better than a flat refusal. Isolating it for him looks like a safe compromise but you have now made yourself part of work you are not going to inspect or certify.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced',
    topic: 'Assertiveness and Safety',
    category: 'Speaking with Confidence',
  },
  {
    id: 244,
    question:
      'A customer leaves a public review saying you were late and left a mess. You were held up by an earlier emergency and you did sweep up. What is the best response?',
    options: [
      'Reply pointing out the parts of the review that are wrong',
      'Reply briefly, offer to talk it through, and stay polite',
      'Leave it unanswered so it drops down the page',
      'Ask the customer privately to take the review down',
    ],
    correctAnswer: 1,
    explanation:
      'A short courteous reply offering to sort it out is written for the hundreds of people who will read it later, not for the reviewer. Correcting the review point by point may be accurate but every future customer sees an argument, which does more damage than the original complaint.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate',
    topic: 'Complaints and Bad News',
    category: 'Negotiation, Persuasion & Difficult Conversations',
  },
  {
    id: 245,
    question:
      'You arrive to continue work on a distribution board that a colleague isolated and locked off before going home. He has texted you that it is definitely dead. What do you do?',
    options: [
      'Work on it since a colleague you trust applied the lock',
      'Ask the colleague to confirm verbally that it is dead',
      'Prove it dead yourself and apply your own lock and label',
      'Check the board is off and start work on that basis',
    ],
    correctAnswer: 2,
    explanation:
      'You prove dead for yourself and put your own lock on, because the only isolation you can rely on is the one you control. Accepting a text from someone you trust is the version that catches people out, since you have no way of knowing what happened on site after he left.',
    section: 'Speaking with Confidence',
    difficulty: 'advanced',
    topic: 'Assertiveness and Safety',
    category: 'Speaking with Confidence',
  },
  {
    id: 246,
    question:
      'You have finished a domestic job but the certificate will be issued from the office rather than on the day. The customer asks for their paperwork before you leave. What is the best thing to say?',
    options: [
      'Say when the certificate will arrive and how it is sent',
      'Tell them it will be with them as soon as possible',
      'Hand over a handwritten note until the real one is ready',
      'Explain that paperwork usually follows within a few weeks',
    ],
    correctAnswer: 0,
    explanation:
      'A specific date and method turns an open question into something the customer can hold you to, and most complaints about paperwork are really complaints about not knowing. As soon as possible sounds reassuring but it means nothing, so the customer starts chasing you within days.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate',
    topic: 'Records and Handover',
    category: 'Professional Writing & Digital Communication',
  },
  {
    id: 247,
    question:
      'You are due to start chasing walls in a furnished living room tomorrow. The customer has not mentioned clearing anything and there is a large glass cabinet against the wall. What do you do?',
    options: [
      'Work around the furniture and be careful with the dust',
      'Agree before the day what will be moved and by whom',
      'Move the furniture yourself and charge for the time',
      'Refuse to start until the rooms are completely empty',
    ],
    correctAnswer: 1,
    explanation:
      'Settling who moves what before the day means nobody is improvising around a glass cabinet with a wall chaser running. Working around it to avoid an awkward conversation is how expensive items get damaged, and the argument afterwards is always worse than the one you avoided.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced',
    topic: 'Quoting and Expectations',
    category: 'Negotiation, Persuasion & Difficult Conversations',
  },
  {
    id: 248,
    question:
      'You are off next week and another electrician is taking over a part completed installation for you. What is the most important thing to leave behind?',
    options: [
      'Ring them on the way and describe what is left to do',
      'Leave the drawings out so they can work it out',
      'Tell the customer to explain the position to them',
      'Leave a written note of what is done, tested and left',
    ],
    correctAnswer: 3,
    explanation:
      'A written note of what is complete, what has been tested and what state things were left in is the only thing that survives you being unavailable. A phone call covers most of it but the detail fades within a day, and the person on site cannot check it against anything.',
    section: 'Professional Writing & Digital Communication',
    difficulty: 'intermediate',
    topic: 'Records and Handover',
    category: 'Professional Writing & Digital Communication',
  },
  {
    id: 249,
    question:
      'A commercial client sees how young you are and says out loud that he expected someone with more experience to be doing the work. How do you respond?',
    options: [
      'List your qualifications until the client is satisfied',
      'Say nothing and let the finished work speak for itself',
      'Answer calmly, explain your plan, and let the work follow',
      'Point out that experience does not guarantee good work',
    ],
    correctAnswer: 2,
    explanation:
      'A calm answer followed by a clear plan for the job shows competence in the only way that actually reassures somebody. Reeling off qualifications sounds defensive, and saying nothing leaves the client watching you all morning waiting to be proved right.',
    section: 'Understanding Communication',
    difficulty: 'intermediate',
    topic: 'Customer Communication',
    category: 'Understanding Communication',
  },
  {
    id: 250,
    question:
      'A client is withholding the final payment because two accessories are the wrong colour and a light is not centred. The rest of the installation is complete and tested. What is the best move?',
    options: [
      'Agree the snag list, fix it, and set a payment date',
      'Hold the certificate back until the invoice is paid',
      'Send a formal demand and stop attending the site',
      'Reduce the invoice by the value of the outstanding snag',
    ],
    correctAnswer: 0,
    explanation:
      'Writing down the snags, fixing them and agreeing when payment follows turns a stand off into a short list with an end date. Holding the certificate hostage feels like leverage but it withholds a safety document over a decorative complaint and it damages you more than the client.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced',
    topic: 'Complaints and Bad News',
    category: 'Negotiation, Persuasion & Difficult Conversations',
  },
];
