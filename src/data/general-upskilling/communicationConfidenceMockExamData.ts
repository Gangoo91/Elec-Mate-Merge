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
      "To convert the sender's message into a transmittable signal",
      'To receive the message and interpret its meaning',
      'To add background noise to the channel',
      'To provide feedback to the sender',
    ] as const,
    correctAnswer: 0,
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
    options: ['Noise', 'Empathy', 'Self-awareness', 'Motivation'] as const,
    correctAnswer: 0,
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
      'The medium through which a message travels from sender to receiver',
      'The emotional tone used when delivering a message',
      'The feedback loop between communicators',
      'The person who decodes the message',
    ] as const,
    correctAnswer: 0,
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
      'Speaking loudly and clearly so everyone can hear',
      'Using technical language to demonstrate expertise',
      'Sending written confirmation of every conversation',
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
    options: ['Eric Berne', 'Albert Mehrabian', 'Carl Rogers', 'Abraham Maslow'] as const,
    correctAnswer: 0,
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
      'Parent, Adult, and Child',
      'Sender, Receiver, and Observer',
      'Conscious, Subconscious, and Unconscious',
      'Assertive, Passive, and Aggressive',
    ] as const,
    correctAnswer: 0,
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
      'Squarely face the person, Open posture, Lean forward, Eye contact, Relax',
      'Sit down, Observe, Listen, Engage, Respond',
      'Stand up, Open arms, Look directly, Evaluate, React',
      'Stay calm, Organise thoughts, Listen carefully, Express clearly, Review',
    ] as const,
    correctAnswer: 0,
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
      'A well-written method statement',
      'A clear radio transmission',
      'A face-to-face toolbox talk in a quiet room',
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
      'To express feelings and needs without blaming or accusing the other person',
      'To assert authority over a colleague',
      'To introduce yourself at the start of a meeting',
      'To summarise the key point of a conversation',
    ] as const,
    correctAnswer: 0,
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
    options: ['Assertive', 'Aggressive', 'Passive', 'Passive-aggressive'] as const,
    correctAnswer: 0,
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
      'There is no opportunity for the receiver to ask questions or provide feedback',
      'It is always slower than two-way communication',
      'It can only be delivered verbally',
      'It requires more people to be effective',
    ] as const,
    correctAnswer: 0,
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
      'The Principal Contractor',
      'The Client',
      'The Designer',
      'The CDM Coordinator',
    ] as const,
    correctAnswer: 0,
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
      'A semantic or language barrier',
      'A physical barrier',
      'A physiological barrier',
      'A systematic barrier',
    ] as const,
    correctAnswer: 0,
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
      'Confirmation that the message has been received and understood as intended',
      'A written record of all conversations',
      'An opportunity for the receiver to criticise the sender',
      'A delay in decision-making to allow reflection',
    ] as const,
    correctAnswer: 0,
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
      'Saying one thing but meaning another',
      'Clearly stating your position while respecting others',
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
      'The response comes from a different ego state than the one addressed, causing communication breakdown',
      'Two people speak at the same time and interrupt each other',
      'A message is sent through the wrong communication channel',
      'The sender uses both verbal and non-verbal signals simultaneously',
    ] as const,
    correctAnswer: 0,
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
      'Feelings and attitudes when the verbal and non-verbal messages are incongruent',
      'All types of workplace communication without exception',
      'Technical instructions delivered on a construction site',
      'Written emails and text messages only',
    ] as const,
    correctAnswer: 0,
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
      'Body language (55%)',
      'The words spoken (7%)',
      'The tone of voice (38%)',
      'The context of the conversation (100%)',
    ] as const,
    correctAnswer: 0,
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
      'Because toolbox talks are always delivered in writing',
      'Because the rule only applies to one-to-one conversations',
      'Because electrical safety is too important for percentages to apply',
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
      'A complementary Adult-to-Adult transaction',
      'A crossed Parent-to-Child transaction',
      'An ulterior Child-to-Child transaction',
      'A complementary Parent-to-Child transaction',
    ] as const,
    correctAnswer: 0,
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
    options: ['Critical Parent', 'Adult', 'Free Child', 'Nurturing Parent'] as const,
    correctAnswer: 0,
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
      "A receiver's preconceived negative opinion about the sender",
      'A noisy workshop environment',
      'A poorly written method statement',
      'A language difference between two workers',
    ] as const,
    correctAnswer: 0,
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
      'It helps the listener hear more clearly in noisy environments',
      'It establishes physical dominance in the interaction',
      'It reduces the need for eye contact',
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
      'To communicate foreseeable risks that cannot be designed out to those who need the information',
      'To personally brief every worker on site about design decisions',
      'To write the Construction Phase Plan',
      'To conduct daily toolbox talks with the workforce',
    ] as const,
    correctAnswer: 0,
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
      "Assertive communication respects both your own rights and the rights of others; aggressive communication disregards others' rights",
      'Assertive communication is always quieter than aggressive communication',
      'Aggressive communication is more honest than assertive communication',
      'There is no real difference; they both achieve the same outcome',
    ] as const,
    correctAnswer: 0,
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
      '"I think you should [instruction] because [reason]"',
      '"I am telling you that [demand] or else [consequence]"',
      '"I want [outcome] and you need to [action]"',
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
      'A fire alarm goes off during a site induction',
      'An apprentice is too nervous to ask a question in front of colleagues',
      'A method statement is printed in very small font',
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
      'Whether the receiver understood the message and can act on it correctly',
      'Whether the sender used correct grammar and vocabulary',
      'Whether the message was delivered in person rather than in writing',
      'Whether the sender holds a more senior position than the receiver',
    ] as const,
    correctAnswer: 0,
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
      'The original model was linear and one-directional, with no mechanism for the receiver to confirm understanding',
      'The original model did not include any concept of noise',
      'The original model could only represent written communication',
      'The original model required both parties to be in the same physical location',
    ] as const,
    correctAnswer: 0,
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
      'Eye contact, because norms for direct eye contact vary significantly across cultures',
      'Squarely facing the person, because all cultures value face-to-face interaction equally',
      'Relaxing, because relaxation is universally understood the same way',
      'Leaning forward, because the distance norms are the same globally',
    ] as const,
    correctAnswer: 0,
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
      'Adult-to-Adult, with the manager being helpful and efficient',
      'Child-to-Parent, with the manager seeking approval',
      'Adult-to-Child, with the manager providing factual instructions',
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
      "It overgeneralises Mehrabian's findings, which only apply to the communication of feelings and attitudes when verbal and non-verbal cues are incongruent",
      'It is completely correct and applies to all forms of communication',
      "It is wrong because Mehrabian's research showed that 100% of communication is verbal",
      'It is only slightly inaccurate because the correct figure is 90%',
    ] as const,
    correctAnswer: 0,
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
      'The overt (social) message differs from the covert (psychological) message, creating hidden agendas',
      'It always involves shouting or raised voices',
      'It only occurs between managers and subordinates',
      'It prevents any form of feedback from being exchanged',
    ] as const,
    correctAnswer: 0,
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
      'Communication of residual risks is required when hazards cannot be eliminated or reduced through design, forming part of the "inform" step after designing out risk',
      'Communication replaces the need for physical risk control measures',
      'Communication is only required at the design stage and not during construction',
      'CDM 2015 does not address communication responsibilities at all',
    ] as const,
    correctAnswer: 0,
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
      'Team members will naturally shift to the Adult ego state to balance the dynamic',
      'The team will become more productive because clear authority improves efficiency',
      'There will be no effect because ego states are fixed personality traits that do not change',
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
      'The Shannon-Weaver model provides a useful structural framework but must be supplemented with interpersonal elements like feedback, context, and shared meaning to fully represent human communication',
      'The Shannon-Weaver model is obsolete and has been entirely replaced by Transactional Analysis',
      'The Shannon-Weaver model perfectly represents all forms of human communication without modification',
      'The Shannon-Weaver model can only be applied to digital communications like email and text',
    ] as const,
    correctAnswer: 0,
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
      'Calmly restate the concern using another I-message, such as "I understand it might seem that way, but this is about safety and I need us to follow the procedure"',
      'Raise their voice to emphasise the seriousness of the issue',
      'Stay silent to avoid further conflict',
      'Report the colleague to management immediately without further discussion',
    ] as const,
    correctAnswer: 0,
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
      'Identify and address the most impactful barrier first, then systematically reduce others using channel selection, language adaptation, and emotional awareness',
      'Accept that communication will fail and switch entirely to written methods',
      'Increase the volume of speech to overcome all barriers simultaneously',
      'Cancel the communication until all barriers have been removed completely',
    ] as const,
    correctAnswer: 0,
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
      'Critical Parent ego state for authority, aggressive communication for urgency, and one-way channels for efficiency',
      'Passive communication to avoid inter-trade conflict, with written notices as the only communication method',
      "Mehrabian's 7-38-55 rule applied to all site communications, with non-verbal cues prioritised over technical content",
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
      'Hearing is a passive physical process; listening is an active mental process of interpreting and understanding',
      'Hearing requires more effort than listening',
      'Listening is automatic; hearing requires concentration',
      'There is no difference — the terms are interchangeable',
    ] as const,
    correctAnswer: 0,
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
    options: ['Five', 'Three', 'Seven', 'Two'] as const,
    correctAnswer: 0,
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
      'Hearing only the parts of a message that interest you or confirm your existing views',
      'Carefully choosing which conversations to participate in',
      'Listening to one person at a time in a group setting',
      'Focusing exclusively on the most important person in the room',
    ] as const,
    correctAnswer: 0,
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
      'Think win-win',
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
    options: ['Receive', 'Respond', 'Reflect', 'Repeat'] as const,
    correctAnswer: 0,
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
      'Making small verbal acknowledgements like "mm-hmm," "I see," or nodding to show you are engaged',
      'Telling the speaker they have done a good job',
      'Giving a formal performance appraisal',
      'Agreeing with everything the speaker says',
    ] as const,
    correctAnswer: 0,
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
      'A deliberate effort to fully concentrate on, understand, and respond to a speaker',
      'Listening while performing another task at the same time',
      'Interrupting the speaker to show that you are engaged',
      'Waiting for your turn to speak while the other person talks',
    ] as const,
    correctAnswer: 0,
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
      '"I completely disagree with your assessment"',
      '"Can you repeat that more slowly?"',
      '"That reminds me of a similar problem I had last week"',
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
      'An open question',
      'A closed question',
      'A leading question',
      'A rhetorical question',
    ] as const,
    correctAnswer: 0,
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
      '"Did you isolate the supply before starting work?"',
      '"How did you approach the cable routing?"',
      '"What challenges did you face during the installation?"',
      '"Why do you think the RCD keeps tripping?"',
    ] as const,
    correctAnswer: 0,
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
      "Mirroring back the speaker's feelings and content to show understanding",
      'Thinking quietly about what has been said after the conversation',
      'Reflecting on your own experiences while the other person speaks',
      'Looking at the speaker in a mirror to improve body language',
    ] as const,
    correctAnswer: 0,
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
      'Maintaining appropriate eye contact',
      'Asking clarifying questions',
      'Nodding occasionally to show engagement',
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
      'Repeatedly checking their phone or watch',
      'Leaning slightly forward',
      'Maintaining eye contact',
      'Nodding in response to key points',
    ] as const,
    correctAnswer: 0,
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
      'Ignoring — making no effort to listen at all',
      'Pretend listening — appearing to listen while thinking about something else',
      'Selective listening — only hearing certain parts',
      'Passive listening — hearing without processing',
    ] as const,
    correctAnswer: 0,
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
      'It demonstrates engagement and helps ensure the listener has correctly understood the message',
      'It allows the listener to control the direction of the conversation',
      'It gives the listener more time to formulate their own argument',
      'It forces the speaker to justify their position',
    ] as const,
    correctAnswer: 0,
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
    options: ['Summarise', 'Sympathise', 'Silence', 'Support'] as const,
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
      'It starts with broad, open questions and progressively narrows to specific, closed questions to focus the conversation',
      'It begins with closed questions and gradually opens up to broader topics',
      'It uses only one type of question throughout the conversation',
      'It involves asking the same question repeatedly until a satisfactory answer is received',
    ] as const,
    correctAnswer: 0,
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
      "Empathetic listening seeks to understand the speaker's feelings and perspective from their frame of reference, not just the factual content",
      'Empathetic listening involves agreeing with everything the speaker says',
      'Attentive listening is more effective in all workplace situations',
      'There is no practical difference between the two levels',
    ] as const,
    correctAnswer: 0,
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
      'Receptiveness and willingness to hear what they have to say without defensiveness',
      'That you are in a position of authority over them',
      'That you are physically comfortable and relaxed',
      'That you have nothing to hide',
    ] as const,
    correctAnswer: 0,
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
      '"It\'s probably fine — don\'t worry about it."',
      '"I\'ll check it later when I have time."',
      '"You should have paid more attention during the briefing."',
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
      'To encourage the person to examine the basis for their belief and think more critically',
      "To challenge and undermine the person's confidence",
      'To demonstrate that the questioner has superior knowledge',
      'To delay making a decision until more data is available',
    ] as const,
    correctAnswer: 0,
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
      '"It sounds like you\'re feeling overwhelmed by the amount of work that\'s been added to your schedule."',
      '"I think you need to manage your time better."',
      '"Everyone feels stressed sometimes — it\'s normal."',
      '"Let me tell you about a time I felt the same way."',
    ] as const,
    correctAnswer: 0,
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
      'Because the speaker believes they have been heard and understood when they have not, leading to false confidence in the communication',
      'Because pretend listening requires more cognitive effort than ignoring',
      'Because it always leads to immediate conflict',
      'Because ignoring is considered more respectful than faking attention',
    ] as const,
    correctAnswer: 0,
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
      'Using your own words to capture the essence of the message',
      'Checking whether your interpretation matches what they meant',
      'Including both the factual content and the emotional tone',
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
      '"If we do it that way, what do you think the consequences might be?"',
      '"Who told you to do it like that?"',
      '"Have you read the method statement?"',
      '"Why didn\'t you think of that earlier?"',
    ] as const,
    correctAnswer: 0,
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
      'A question that suggests the desired answer, which can manipulate the response and prevent the speaker from sharing their genuine perspective',
      'A question that leads to more discussion, which is always beneficial',
      'The first question in a series, which sets the direction for the conversation',
      'A question asked by the team leader, which carries extra authority',
    ] as const,
    correctAnswer: 0,
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
      'Ask relevant follow-up questions to deepen understanding and show continued interest',
      'Ask the speaker to repeat everything they just said',
      'Ask for permission to leave the conversation',
      'Ask a completely unrelated question to change the subject',
    ] as const,
    correctAnswer: 0,
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
    options: ['Reply', 'Judge', 'Agree', 'Memorise'] as const,
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
      'Mentally noting points to return to later rather than jumping in immediately',
      "Repeating the speaker's words under your breath as they talk",
      'Maintaining a completely blank expression throughout',
      'Crossing your arms to remind yourself to stay quiet',
    ] as const,
    correctAnswer: 0,
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
      'Summarising and checking understanding',
      'Giving technical advice',
      'Offering a diagnosis',
      "Challenging the electrician's competence",
    ] as const,
    correctAnswer: 0,
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
      'Starting with specific, closed questions and gradually broadening to open questions to build confidence before exploring wider topics',
      "Asking the most difficult question first to test the speaker's knowledge",
      'Repeating the same question in different ways to check for consistency',
      'Narrowing from general topics to extreme detail until the speaker cannot answer',
    ] as const,
    correctAnswer: 0,
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
      'Silence shows that you are bored and want the conversation to end quickly',
      'Remaining silent means you do not need to take responsibility for the conversation',
      'Silence is never appropriate in professional conversations',
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
      "\"It sounds like you're caught between wanting to meet the client's expectations and knowing the timeline isn't realistic — that must be really frustrating.\"",
      '"Just tell the client it can\'t be done — it\'s not your problem."',
      '"I had a similar situation last year. Here\'s what I did..."',
      '"You need to be more assertive with clients."',
    ] as const,
    correctAnswer: 0,
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
      'Start with "What do you observe?" then "What could cause that?" then "How could you test each possibility?" then "What would you expect to find if your theory is correct?"',
      'Start with "Don\'t you think it\'s the circuit breaker?" to guide them to the answer quickly',
      'Ask "Why haven\'t you fixed it yet?" to create urgency',
      'Tell them the answer directly and ask them to repeat it back',
    ] as const,
    correctAnswer: 0,
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
      'Acknowledging the emotional impact before attempting to gather factual details about the incident',
      'Immediately asking for precise technical details to complete the incident report',
      'Telling the worker to calm down so they can give a clear account',
      "Changing the subject to reduce the worker's distress",
    ] as const,
    correctAnswer: 0,
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
      'They are contradictory frameworks and should not be combined',
      'RASA replaces the need for empathetic listening because it already covers everything',
      "Covey's framework is theoretical while RASA is the only practical model",
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
      "Stay silent because it is not your responsibility to manage others' understanding",
      'Interrupt the plumber and tell them to use simpler language',
      'Wait until after the meeting and privately explain the terms to the labourers',
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
      'Broad questions first allow the witness to recall events in their own way without being influenced by specific prompts, preserving the accuracy and completeness of their account',
      'It makes the investigation take longer, which demonstrates thoroughness to regulators',
      'Closed questions are unreliable, so they should always be left until last',
      'Starting with broad questions is required by law under CDM 2015',
    ] as const,
    correctAnswer: 0,
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
      'The electrician is probably solving problems FOR team members rather than helping them think through solutions; they should use Socratic questions to guide self-discovery and ownership',
      'The team members are lazy and need to be disciplined',
      'The electrician should stop listening to problems altogether to encourage independence',
      'The problems are too complex for the team to solve and the electrician should continue providing answers',
    ] as const,
    correctAnswer: 0,
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
      'Immediately offering personal advice based on your own similar experience',
      'Active listening only, with no emotional acknowledgement, to maintain professional boundaries',
      'Redirecting the conversation to work tasks because personal issues should not be discussed at work',
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
      'Mastery experiences — succeeding at a task yourself',
      'Vicarious experiences — watching others succeed',
      'Social persuasion — encouragement from others',
      'Emotional states — feeling calm and confident',
    ] as const,
    correctAnswer: 0,
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
      'Albert Bandura',
      'Carol Dweck',
      'Pauline Rose Clance and Suzanne Ames Imes',
      'Amy Cuddy',
    ] as const,
    correctAnswer: 2,
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
      'Fear of enclosed spaces',
      'Fear of public speaking',
      'Fear of heights',
      'Fear of social situations',
    ] as const,
    correctAnswer: 1,
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
      'Breathe in for 7, hold for 4, out for 8',
      'Breathe in for 3, out for 6',
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
      'Fixed and growth',
      'Internal and external',
      'Open and closed',
    ] as const,
    correctAnswer: 1,
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
    options: ['1-2 minutes', '5-10 minutes', '20-30 minutes', '45-60 minutes'] as const,
    correctAnswer: 1,
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
    options: ['Regulation 4', 'Regulation 8', 'Regulation 13', 'Regulation 22'] as const,
    correctAnswer: 2,
    explanation:
      'CDM 2015 Regulation 13 requires that every contractor must provide each worker under their control with appropriate supervision, instructions and information so that construction work can be carried out safely. Toolbox talks are one of the key methods for fulfilling this duty.',
    section: 'Speaking with Confidence',
    difficulty: 'basic' as const,
    topic: 'CDM 2015',
    category: 'Speaking with Confidence' as const,
  },
  {
    id: 89,
    question: 'What is the classic three-part speech structure?',
    options: [
      'The DESC model',
      'The sandwich technique',
      'Introduction, body, conclusion',
      'The RASA model',
    ] as const,
    correctAnswer: 2,
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
      'Intensive weekend workshops',
      'Gradual exposure through progressively challenging speeches',
      'Memorising scripts word for word',
      'Watching expert speakers on video',
    ] as const,
    correctAnswer: 1,
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
      'Communication-Based Training',
      'Cognitive Behavioural Therapy',
      'Confidence Building Technique',
      'Controlled Breathing Training',
    ] as const,
    correctAnswer: 1,
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
      'Higher confidence always leads to higher competence',
      'Competence and confidence reinforce each other in a positive cycle',
      'You must be fully competent before you can feel confident',
      'Confidence decreases as competence increases',
    ] as const,
    correctAnswer: 1,
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
      'One single topic',
      'Two or three related topics',
      'As many as possible in the time available',
      'Five topics minimum',
    ] as const,
    correctAnswer: 0,
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
      'Receiving praise from a mentor',
      'Feeling calm before a presentation',
      'Watching someone similar to you succeed at a task',
      'Successfully completing a difficult task yourself',
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
    options: ['25%', '50%', '75%', '95%'] as const,
    correctAnswer: 2,
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
      'Fixed mindset sees failure as learning; growth mindset avoids failure',
      'Fixed mindset believes ability can grow; growth mindset believes ability is innate',
      'Fixed mindset avoids challenges to protect self-image; growth mindset embraces them as opportunities to develop',
      'There is no practical difference',
    ] as const,
    correctAnswer: 2,
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
      'Practising deep breathing exercises',
      'Identifying the specific unhelpful thought',
      'Visualising a successful outcome',
      'Avoiding situations that trigger anxiety',
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
      'Avoiding all speaking situations until you feel ready',
      'Jumping straight into the most challenging speaking situation',
      'Gradual, step-by-step exposure to increasingly challenging speaking situations',
      'Taking medication before every speaking engagement',
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
      'It makes the talk last longer',
      'It satisfies a legal requirement under CDM 2015',
      'It confirms understanding, engages workers and surfaces practical concerns',
      'It is only important for inexperienced presenters',
    ] as const,
    correctAnswer: 2,
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
      'Lack of technical competence',
      'Imposter syndrome as described by Clance and Imes (1978)',
      'Low emotional intelligence',
      'A sign they are not ready for independent work',
    ] as const,
    correctAnswer: 1,
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
      'No documentation is required',
      'A record of the topic, date, presenter, attendee signatures and actions agreed',
      'Only the topic and date',
      'Documentation only for talks lasting more than 15 minutes',
    ] as const,
    correctAnswer: 1,
    explanation:
      'A proper record should include the topic, date and time, presenter, attendee signatures, questions raised, and actions agreed. This demonstrates compliance with CDM 2015 Regulation 13.',
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
      'Power poses definitively raise testosterone and lower cortisol',
      'The original hormonal claims have been debated in replication studies, but the finding that expansive postures can increase subjective feelings of confidence has more support',
      'The research has been completely discredited',
      'Power posing only works for women',
    ] as const,
    correctAnswer: 1,
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
      'It only works from a qualified psychologist',
      'Verbal encouragement from a respected person can strengthen belief in your abilities, though weaker than mastery experience',
      'It is the strongest of all four sources',
      'It has no real effect on confidence',
    ] as const,
    correctAnswer: 1,
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
      'Feeling alert and focused',
      'Feeling calm but slightly bored',
      'High anxiety with physical symptoms such as trembling and nausea',
      'Mild excitement before a presentation',
    ] as const,
    correctAnswer: 2,
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
      'Immediately state the legal penalties',
      'Read out the relevant regulation',
      'Capture attention with a real example, statistic or question that makes the topic personally relevant',
      'Ask everyone to put their phones away',
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
      'Literally reading signs on walls',
      'Checking room temperature',
      'Observing audience body language, energy levels and engagement to adjust delivery in real time',
      'Reading your notes beforehand',
    ] as const,
    correctAnswer: 2,
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
      'Exposing yourself to your biggest fear first',
      'Reading about public speaking before attempting it',
      'Practising in front of a mirror until comfortable',
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
      'Email the quote and wait',
      'Walk them through it in person, explaining scope, timeline and price',
      'Present only the total price',
      'Send via text message',
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
    options: ['3', '6', '11', '15'] as const,
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
      'Reading a book about meeting facilitation',
      'Being told by their manager they are capable',
      'Starting by chairing a small, low-stakes team meeting to gain a mastery experience',
      'Watching a YouTube video about confidence',
    ] as const,
    correctAnswer: 2,
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
      'Suppress the thought',
      'Accept it as true and prepare extensively',
      'Challenge the thought by examining evidence: "I am qualified, I was asked because of my knowledge, and the audience wants to learn"',
      'Cancel the toolbox talk',
    ] as const,
    correctAnswer: 2,
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
      'Make up a plausible answer',
      'Deflect by changing the subject',
      'Acknowledge they do not have the answer, commit to finding out, and follow up within an agreed timeframe',
      'Tell the client the question is outside scope',
    ] as const,
    correctAnswer: 2,
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
      'Their qualifications are not recognised',
      'They lack practical skills',
      'The transition from supervised apprentice to autonomous professional creates a gap between objective competence and subjective confidence',
      'Imposter syndrome only affects manual trades',
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
      'Take a single long sigh and hold your breath',
      'Two quick inhales through the nose followed by a long exhale through the mouth',
      'Breathe rapidly for 30 seconds',
      'Breathe exclusively through the mouth',
    ] as const,
    correctAnswer: 1,
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
      'Tell them they will be fine and give a script',
      'Let them observe a colleague (vicarious), encourage them (social persuasion), help them prepare to reduce anxiety (emotional state), then start with a small group (mastery)',
      'Send them on a public speaking course',
      'Deliver it yourself instead',
    ] as const,
    correctAnswer: 1,
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
      'Only conducted with students',
      'The original hormonal claims were not consistently replicated, though subjective confidence findings have more support',
      'Entirely fabricated',
      'Only applies to men',
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
      'As long and detailed as possible',
      'Fictional for maximum dramatic impact',
      'Relevant to the client situation, concise, has a clear point, and demonstrates experience without boasting',
      'Focuses exclusively on problems to justify pricing',
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
      'They are unrelated',
      'Toastmasters contradicts Bandura',
      'Toastmasters operationalises Bandura theory: mastery through progressive challenges, vicarious learning, social persuasion through evaluations, and managing anxiety through practice',
      'Bandura only applies to clinical settings',
    ] as const,
    correctAnswer: 2,
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
      'Accept not everyone is meant to speak',
      'Force them to present immediately',
      'Help them reframe from "I am not a speaker" (fixed) to "I have not developed this skill yet" (growth), then create opportunities for gradual practice',
      'Suggest a personality test',
    ] as const,
    correctAnswer: 2,
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
      'All emails must be replied to within 24 hours',
      'If you feel emotional about an email, wait 24 hours before sending your reply',
      'Emails should take no more than 24 seconds to read',
      'Check email every 24 minutes',
    ] as const,
    correctAnswer: 1,
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
      'Persuasive with strong opinions',
      'Factual, objective writing in the active voice',
      'Creative with detailed descriptions',
      'Informal shorthand',
    ] as const,
    correctAnswer: 1,
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
      'Just the total price',
      'Scope of work, exclusions, price, validity period and payment terms',
      'A detailed technical specification only',
      'Company logo and thank-you message',
    ] as const,
    correctAnswer: 1,
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
      'General Data Protection Regulation',
      'Government Data Processing Rules',
      'Global Digital Privacy Requirements',
      'Guaranteed Data Privacy Rights',
    ] as const,
    correctAnswer: 0,
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
      'People write more negative messages',
      'Text messages tend to be interpreted more negatively than intended because tone is stripped from written words',
      'Negative news travels faster',
      'People only read negative parts',
    ] as const,
    correctAnswer: 1,
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
      'Recording personal thoughts',
      'Providing a contemporaneous record of events, progress, weather, labour and issues on site',
      'Listing materials ordered',
      'Tracking employee holidays',
    ] as const,
    correctAnswer: 1,
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
      'For every communication',
      'When the matter is urgent, complex, sensitive, or requires back-and-forth discussion',
      'Only when the recipient has no email',
      'Phone calls should never be used professionally',
    ] as const,
    correctAnswer: 1,
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
      'Always reply-all to keep everyone informed',
      'Only use reply-all when your response is genuinely relevant to everyone on the thread',
      'Never use reply-all',
      'Use reply-all for internal but not external',
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
      'They mean the same thing',
      'Scope describes what IS included; exclusions describe what is NOT included',
      'Scope is for domestic; exclusions for commercial',
      'Scope is specification; exclusions are terms',
    ] as const,
    correctAnswer: 1,
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
      'Shows when work will be completed',
      'States how long the quoted price remains valid',
      'Is the warranty period',
      'Shows the date the quote was written',
    ] as const,
    correctAnswer: 1,
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
      'Be left blank',
      'Contain the entire message',
      'Clearly and concisely summarise the purpose or action required',
      'Always start with URGENT',
    ] as const,
    correctAnswer: 2,
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
      'Make the email look professional',
      'Provide contact details, role, company information and relevant accreditations',
      'Add a legal disclaimer',
      'Fill space at the bottom',
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
      'Records are optional',
      'Proactive, contemporaneous record-keeping with early warning notices and compensation event documentation',
      'A single summary report at the end',
      'Records are the client responsibility',
    ] as const,
    correctAnswer: 1,
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
      'Write subjective comments about overall condition',
      'Record factual observations with specific locations, citing relevant regulation and correct code (C1, C2, C3, FI)',
      'Only record observations requiring immediate action',
      'Copy from a template',
    ] as const,
    correctAnswer: 1,
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
      'One group for everything',
      'Keep groups focused with clear purposes, separate social chat from work coordination',
      'Avoid WhatsApp entirely',
      'Only the manager posts',
    ] as const,
    correctAnswer: 1,
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
      'Makes sentences longer',
      'Clearly identifies who did what, making writing more direct and accountable',
      'Only used in creative writing',
      'Removes reference to people',
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
      'Verbally agreed and noted in personal diary',
      'Documented with variation description, reason, cost implication and written agreement before work is carried out',
      'Added to the final invoice',
      'Mentioned at the next site meeting',
    ] as const,
    correctAnswer: 1,
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
      'Nothing — site photos are exempt',
      'They need consent, a legitimate purpose, and secure storage',
      'Only for businesses with 250+ employees',
      'GDPR only applies to computer-stored photos',
    ] as const,
    correctAnswer: 1,
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
      'The volume you read aloud',
      'A range from very formal to semi-formal to informal, matched to context',
      'The emotional content',
      'Number of exclamation marks used',
    ] as const,
    correctAnswer: 1,
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
      'Cable colour',
      'Making good of plaster, decoration and disposal of old materials',
      'Consumer unit brand',
      'Type of screwdriver used',
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
      'Makes documents harder to read',
      'Creates room for different interpretations, leading to disputes',
      'Only a problem over a certain value',
      'Not a real problem in construction',
    ] as const,
    correctAnswer: 1,
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
      'Always use client preference',
      'Phone for urgent/complex/sensitive; email for formal records; text for brief time-sensitive coordination',
      'Email for everything',
      'Text for everything',
    ] as const,
    correctAnswer: 1,
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
      'Technical language',
      'Vague terms like "approximately", "if required", "as necessary" without further definition',
      'Itemised pricing',
      'Reference to industry standards',
    ] as const,
    correctAnswer: 1,
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
      'Just the word "delayed"',
      'The cause, affected trades, duration, instructions received, and mitigation actions taken',
      'A complaint about the cause',
      'Only record delays lasting more than one day',
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
      'Confirming a meeting time',
      'Delivering bad news about a significant project problem requiring immediate discussion',
      'Sending a quote',
      'Sharing meeting minutes',
    ] as const,
    correctAnswer: 1,
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
      'Reply immediately',
      'Acknowledge receipt briefly, then draft a measured response after you have calmed down',
      'Ignore until they follow up',
      'Forward to your solicitor',
    ] as const,
    correctAnswer: 1,
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
      'Quote was too long',
      'Referencing a specification rather than listing items creates ambiguity if the specification is later disputed or modified',
      'Should not have included a specification reference',
      'Error is in the specification',
    ] as const,
    correctAnswer: 1,
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
      'They convey the same information',
      'The first is subjective opinion; the second is factual, specific, time-stamped and records action taken',
      'The first is better — more concise',
      'The second is too formal',
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
      'No issues',
      'Potential GDPR breach, security risk (advertising unoccupied property), and privacy violation without consent',
      'Only an issue if the client complains',
      'Only a problem if workmanship is poor',
    ] as const,
    correctAnswer: 1,
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
      'No consequence',
      'You may lose the right to claim additional time or money for the resulting event',
      'Client can terminate immediately',
      'You receive a formal written warning',
    ] as const,
    correctAnswer: 1,
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
      'Continue the existing chain',
      'Start a new email with a new subject line reflecting the current topic',
      'Delete all previous messages',
      'Forward the entire chain with no explanation',
    ] as const,
    correctAnswer: 1,
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
      'Include everything and add 20% contingency',
      'Provide the price but clearly define what "fully inclusive" means by listing all inclusions and exclusions',
      'Submit the lowest price to win work',
      'Refuse to quote until they define it',
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
      'Not important — GDPR only applies to business computers',
      'Personal data on any device is subject to GDPR, and a lost phone could result in a data breach with ICO fines',
      'Only if you have 100+ customers',
      'GDPR does not apply to sole traders',
    ] as const,
    correctAnswer: 1,
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
      'Yes — any acceptance is binding',
      'Potentially, but it creates risk — follow up with formal written confirmation referencing the specific quote',
      'No — only signed documents count',
      'Depends on the work value',
    ] as const,
    correctAnswer: 1,
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
      'Do the work and add to final invoice',
      'Document the change, confirm cost and time implications, obtain written agreement before proceeding, and update the site diary',
      'Refuse all changes once started',
      'Accept verbally, paperwork later',
    ] as const,
    correctAnswer: 1,
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
      'Post publicly on social media',
      'Send via a dedicated project channel with permission, including context about what the photo shows',
      'Only share if the client asks',
      'Send via personal text with no explanation',
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
      'Using full sentences only',
      'Clear, purposeful, respectful of working hours, and separate from social chat',
      'Any WhatsApp message is unprofessional',
      'Always include the recipient full name',
    ] as const,
    correctAnswer: 1,
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
      'Any format is fine',
      'Unambiguous format such as "14 March 2025" with 24-hour clock',
      'Abbreviations like 14/3/25',
      'Date and time are not important',
    ] as const,
    correctAnswer: 1,
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
      'No issues — it helps the industry',
      'Potential defamation, damage to professional relationships, GDPR breach if individuals identifiable, and breach of site confidentiality',
      'Only an issue if the photo is edited',
      'Fine as long as the work is genuinely defective',
    ] as const,
    correctAnswer: 1,
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
      'Robert Cialdini',
      'Roger Fisher, William Ury and Bruce Patton',
      'Sharon and Gordon Bower',
      'Thomas Gordon',
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
      'Best Alternative To a Negotiated Agreement',
      'Basic Approach To Neutral Agreements',
      'Balanced Assessment of Trade Negotiation Alternatives',
      'Business Analysis for Targeted Negotiation Actions',
    ] as const,
    correctAnswer: 0,
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
      'Decide, Evaluate, Summarise, Conclude',
      'Describe, Express, Specify, Consequences',
      'Discuss, Engage, Solve, Confirm',
      'Deliver, Explain, Support, Close',
    ] as const,
    correctAnswer: 1,
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
    options: ['Four', 'Five', 'Six', 'Eight'] as const,
    correctAnswer: 2,
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
      'Repeating someone words back',
      'Calmly repeating your position without getting drawn into arguments',
      'Playing recorded audio',
      'Breaking a problem into smaller pieces',
    ] as const,
    correctAnswer: 1,
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
      'Making your message deliberately unclear',
      'Agreeing with the truth in criticism without becoming defensive, which defuses aggression',
      'Ignoring the other person',
      'Using complex language to confuse',
    ] as const,
    correctAnswer: 1,
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
    options: ['Authority', 'Scarcity', 'Reciprocity', 'Social proof'] as const,
    correctAnswer: 2,
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
      'They are the same thing',
      'A position is what someone says they want; an interest is why they want it',
      'A position is stronger than an interest',
      'An interest is a hobby',
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
      'The RASA model',
      'I-messages versus You-messages',
      'The SOLER model',
      'The DESC model',
    ] as const,
    correctAnswer: 1,
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
      'Argue, defend, counter-attack, win',
      'Plan key points, practise what you will say, choose the right time and place, execute with empathy',
      'Write a letter, send by email, wait, escalate',
      'Ignore it, hope it resolves, intervene only if forced',
    ] as const,
    correctAnswer: 1,
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
      'Staying in one position physically',
      'The first number mentioned tends to influence the final outcome',
      'Refusing to move from a position',
      'Using an anchor analogy',
    ] as const,
    correctAnswer: 1,
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
      'Win an argument',
      'Reduce emotional intensity so productive conversation can occur',
      'Avoid all conflict by agreeing to everything',
      'Escalate to involve management',
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
    options: ['Liking', 'Reciprocity', 'Authority', 'Scarcity'] as const,
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
      '"You are always late"',
      '"Describe: You have arrived after 09:00 on four occasions. Express: This causes concern as it delays the programme. Specify: I need you on site by 08:00. Consequences: This keeps the project on track"',
      '"If you are late again you are off the job"',
      '"Could you try to do better?"',
    ] as const,
    correctAnswer: 1,
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
      'Both parties compromise equally',
      'Look for creative solutions where both parties get something they value',
      'The powerful party offers options',
      'Always offer three price points',
    ] as const,
    correctAnswer: 1,
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
      'Gives you a script',
      'Gives you confidence to walk away from a bad deal because you know your best alternative',
      'Guarantees you will win',
      'Allows you to threaten',
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
      'People follow the behaviour of others, especially in uncertainty',
      'People prefer dealing with people they like',
      'People respect authority figures',
      'People value scarce things',
    ] as const,
    correctAnswer: 0,
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
      'Bury it in an email',
      'Be direct and honest, explain what happened and why, present cost impact clearly, and offer solutions',
      'Wait until project complete',
      'Blame the subcontractor',
    ] as const,
    correctAnswer: 1,
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
      'Physical frames around documents',
      'Presenting information in a way that emphasises different aspects to influence perception',
      'Setting strict boundaries',
      'Creating a diagram',
    ] as const,
    correctAnswer: 1,
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
      'Shout at the worker publicly',
      'Ignore it if they are experienced',
      'Address privately, describe the specific behaviour factually, explain the risk, and agree the correct procedure',
      'Report to HSE without speaking to them',
    ] as const,
    correctAnswer: 2,
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
      'Always have the final say',
      'Base agreements on fair, independent standards rather than pressure or willpower',
      'Only negotiate with like-minded people',
      'Create your own criteria',
    ] as const,
    correctAnswer: 1,
    explanation:
      'The fourth principle means using industry benchmarks, published rates, or objective measurements rather than pressure tactics.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'intermediate' as const,
    topic: 'principled negotiation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
  {
    id: 183,
    question: 'Which Cialdini principle explains "commitment and consistency"?',
    options: [
      'Offering discounts for referrals',
      'Once someone makes a small commitment, they are more likely to follow through with a larger related one',
      'Using industry logos',
      'Telling clients you have limited availability',
    ] as const,
    correctAnswer: 1,
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
      'No real difference',
      'Assertive states rights and facts calmly; aggressive attacks the person',
      'Assertive is weaker',
      'Aggressive is more honest',
    ] as const,
    correctAnswer: 1,
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
      '"I need more time"',
      '"I feel under pressure when timescales are tight because I want to deliver quality work. Could we discuss the programme?"',
      '"You are being unreasonable"',
      '"Everyone thinks the deadlines are too tight"',
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
      'Simply saying no with no explanation',
      'Declining clearly and respectfully, with a brief explanation and where possible an alternative',
      'Saying yes to avoid conflict',
      'Getting someone else to refuse',
    ] as const,
    correctAnswer: 1,
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
      'Pretend to share client hobbies',
      'Build genuine rapport through professionalism, reliability, clear communication and authentic common ground',
      'Give expensive gifts',
      'Only work with similar people',
    ] as const,
    correctAnswer: 1,
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
      'Takes too long',
      'Focuses on winning and losing rather than solutions, often damaging relationships and producing suboptimal outcomes',
      'Too expensive',
      'Requires too many people',
    ] as const,
    correctAnswer: 1,
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
      'Shout back louder',
      'Walk away silently',
      'Lower your voice, maintain calm body language, use their name, and acknowledge their frustration before addressing the issue',
      'Call security immediately',
    ] as const,
    correctAnswer: 2,
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
      'Match the lower price',
      'Tell them to use their mate',
      'Acknowledge their concern, explore interests, use objective criteria: "I understand price is important. What does that quote include? My price is based on NICEIC standards and full certification"',
      'Argue the other electrician cuts corners',
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
      'Just invoice the extra',
      'Describe: "We discovered asbestos in the ceiling void." Express: "I want to be transparent about cost impact." Specify: "The removal adds £2,400." Consequences: "This ensures safe, regulation-compliant completion"',
      'Do asbestos removal for free',
      'Tell client it is their fault',
    ] as const,
    correctAnswer: 1,
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
      'Accept the 15% reduction',
      'Refuse and walk away',
      'Evaluate whether the reduced price is still better than your BATNA. If not, decline confidently. If close, negotiate for other value (better payment terms, future work)',
      'Threaten to report them',
    ] as const,
    correctAnswer: 2,
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
      'Lie about being fully booked',
      'Honestly communicate genuine constraints: "My next available start is 6 weeks out, but I could fit you in sooner if we confirm by Friday"',
      'Tell everyone they are getting a special expiring deal',
      'Refuse to give written quotes',
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
      'Send a solicitor letter',
      'Describe: "The last three invoices were paid 30+ days late." Express: "I value our relationship, but late payment creates cash flow difficulties." Specify: "I need invoices paid within 14-day terms." Consequences: "This allows me to continue prioritising your work"',
      'Stop working for them',
      'Accept late payment',
    ] as const,
    correctAnswer: 1,
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
      'Simply reduce your rate',
      'Fixed monthly payments, milestone billing, or a retainer that provides predictability while maintaining your rate',
      'Insist on standard terms',
      'Walk away — different priorities',
    ] as const,
    correctAnswer: 1,
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
      'You observe an apprentice (the site manager child) performing unsafe cable terminations. How should you approach this?',
    options: [
      'Ignore it — political problems',
      'Report directly to HSE',
      'Address the safety issue directly using facts and I-messages, document it, and escalate formally if behaviour continues regardless of relationships',
      'Tell other workers and hope word gets back',
    ] as const,
    correctAnswer: 2,
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
      'They are unrelated',
      'Your BATNA sets your walkaway point, the other party BATNA sets theirs, and the ZOPA is the range between where agreement is possible',
      'ZOPA replaces BATNA',
      'BATNA is for buyers, ZOPA for sellers',
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
      'Match their aggression then present facts',
      'De-escalate first (lower voice, acknowledge emotion, let them vent), then once calm use DESC model to address the issue',
      'Leave immediately',
      'Apologise and absorb costs',
    ] as const,
    correctAnswer: 1,
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
      'Start with the lowest price',
      'Present three options anchored around your preferred price, framing each in terms of value: "Our recommended option at £X gives you [benefits]"',
      'Refuse to give a price until they reveal budget',
      'Quote double and expect to negotiate down 50%',
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
      'Send a formal complaint letter',
      'Separate person from problem, describe instances factually (DESC), express impact using I-messages, specify a solution like written instruction confirmation, and frame consequence as mutual interest',
      'Refuse all verbal instructions',
      'Escalate to the client immediately',
    ] as const,
    correctAnswer: 1,
    explanation:
      'This integrates all three frameworks: principled negotiation (separate people from problem, mutual interests), I-messages (impact without blame), and DESC (structured assertion). Most likely to produce constructive resolution while preserving the working relationship.',
    section: 'Negotiation, Persuasion & Difficult Conversations',
    difficulty: 'advanced' as const,
    topic: 'principled negotiation',
    category: 'Negotiation, Persuasion & Difficult Conversations' as const,
  },
];
