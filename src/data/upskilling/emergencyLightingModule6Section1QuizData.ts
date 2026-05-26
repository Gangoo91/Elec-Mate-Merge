import { QuizQuestion } from '@/types/quiz';

export const emergencyLightingModule6Section1QuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the main purpose of BS 5266-1?',
    options: [
      'Missing documentation and standards referencing despite adequate performance',
      'To provide a code of practice for emergency lighting design, installation, and maintenance',
      'Design calculations, as-built drawings, certificates, and maintenance schedules',
      'To avoid large variations between bright and dark areas that could impair visibility',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5266-1 is a comprehensive code of practice covering the design, installation, and maintenance of emergency lighting systems, not just performance criteria.',
  },
  {
    id: 2,
    question: 'What does EN 1838 focus on?',
    options: [
      'Record non-attendance and proceed with the test as \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'deemed witnessed\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'',
      'How one efficiency measure affects the savings of another',
      'Photometric performance criteria (light levels and duration)',
      'They have been advised of work completed and any recommendations',
    ],
    correctAnswer: 2,
    explanation:
      'EN 1838 specifically defines the photometric performance requirements including illuminance levels, uniformity, duration, and visibility.',
  },
  {
    id: 3,
    question: 'What is the minimum illuminance required for escape routes?',
    options: [
      '0.5 lux',
      '15 lux',
      '5 lux',
      '1 lux',
    ],
    correctAnswer: 3,
    explanation:
      'EN 1838 requires a minimum of 1 lux along the centre line of escape routes to ensure safe evacuation.',
  },
  {
    id: 4,
    question: 'What is the minimum illuminance for open areas (anti-panic lighting)?',
    options: [
      '0.5 lux',
      '1 lux',
      '0.1 lux',
      '2 lux',
    ],
    correctAnswer: 0,
    explanation:
      'Open areas require a minimum of 0.5 lux on the floor area to prevent panic and enable safe movement.',
  },
  {
    id: 5,
    question: 'What is the minimum required duration for emergency lighting in public buildings?',
    options: [
      '30 minutes',
      '3 hours',
      '2 hours',
      '1 hour',
    ],
    correctAnswer: 1,
    explanation:
      'Public and high-risk buildings typically require 3 hours duration, whilst 1 hour is the minimum for other premises.',
  },
  {
    id: 6,
    question: 'Which clause in BS 5266-1 deals with testing and inspection?',
    options: [
      'Clause 4',
      'Clause 6',
      'Clause 10',
      'Clause 8',
    ],
    correctAnswer: 2,
    explanation:
      'Clause 10 covers inspection, testing, and maintenance regime, with reference to BS 5266-8 (EN 50172).',
  },
  {
    id: 7,
    question: 'Why is uniformity important in emergency lighting design?',
    options: [
      'Because it lacks proper documentation and standards referencing',
      'To provide a code of practice for emergency lighting design, installation, and maintenance',
      'Design calculations, as-built drawings, certificates, and maintenance schedules',
      'To avoid large variations between bright and dark areas that could impair visibility',
    ],
    correctAnswer: 3,
    explanation:
      'Uniformity (max/min ratio < 40:1) prevents dangerous dark spots that could hinder safe evacuation and cause disorientation.',
  },
  {
    id: 8,
    question: 'What type of documentation proves compliance with BS 5266-1?',
    options: [
      'Design calculations, as-built drawings, certificates, and maintenance schedules',
      'To provide a code of practice for emergency lighting design, installation, and maintenance',
      'Missing documentation and standards referencing despite adequate performance',
      'To avoid large variations between bright and dark areas that could impair visibility',
    ],
    correctAnswer: 0,
    explanation:
      'Comprehensive documentation including calculations, drawings, signed certificates, and maintenance schedules is essential to prove compliance.',
  },
  {
    id: 9,
    question: 'Why can a system that works still fail compliance?',
    options: [
      'To identify points requiring extra luminaires and potential obstructions',
      'Because it lacks proper documentation and standards referencing',
      'Acute stress is short-term; chronic stress is long-lasting and ongoing',
      'Gather information from the user about symptoms',
    ],
    correctAnswer: 1,
    explanation:
      'Without proper documentation, design calculations, and standards referencing, even a functioning system is deemed non-compliant.',
  },
  {
    id: 10,
    question: 'What was the main issue found in the Manchester case study?',
    options: [
      'To provide a code of practice for emergency lighting design, installation, and maintenance',
      'Photometric performance criteria (light levels and duration)',
      'Missing documentation and standards referencing despite adequate performance',
      'To avoid large variations between bright and dark areas that could impair visibility',
    ],
    correctAnswer: 2,
    explanation:
      "The system achieved adequate illumination but failed audit because documentation didn't reference EN 1838's specific lux levels or include test data, requiring redesign and re-certification.",
  },
];
