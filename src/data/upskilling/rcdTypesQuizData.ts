import type { QuizQuestion } from '@/types/quiz';

export const rcdTypesQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which RCD type is mandatory for EV charging installations?',
    options: ['Type AC', 'Type A', 'Type F', 'Type B'],
    correctAnswer: 3,
    explanation: 'Type B RCDs are mandatory for EV charging as they can detect pure DC residual currents that may occur in EV charging systems.'
  },
  {
    id: 2,
    question: 'What does a Type A RCD detect that Type AC cannot?',
    options: ['High frequency currents', 'Pulsating DC currents', 'Pure DC currents', 'All AC currents'],
    correctAnswer: 1,
    explanation: 'Type A RCDs can detect both AC and pulsating DC residual currents, while Type AC can only detect pure AC currents.'
  },
  {
    id: 3,
    question: 'Why is Type AC becoming unsuitable for modern installations?',
    options: ['Too expensive', 'Electronic equipment creates DC components', 'Too slow to operate', 'Not approved by BS 7671'],
    correctAnswer: 1,
    explanation: 'Modern electronic equipment with switch-mode power supplies can create DC components in fault currents, which Type AC RCDs cannot detect reliably.'
  },
  {
    id: 4,
    question: 'Which RCD type is required for variable frequency drives?',
    options: ['Type AC', 'Type A', 'Type F', 'Type B'],
    correctAnswer: 2,
    explanation: 'Type F RCDs are required for variable frequency drives as they can detect high-frequency residual currents up to 20kHz.'
  },
  {
    id: 5,
    question: 'What is the main application for Type F RCDs?',
    options: ['Basic domestic circuits', 'Equipment with frequency converters', 'EV charging points', 'Swimming pools'],
    correctAnswer: 1,
    explanation: 'Type F RCDs are specifically designed for equipment with frequency converters, such as heat pumps with inverter drives and VFDs.'
  },
  {
    id: 6,
    question: 'Which equipment would require Type B RCD protection?',
    options: ['Standard washing machine', 'LED lighting', 'Solar PV inverter system', 'Electric oven'],
    correctAnswer: 2,
    explanation: 'Solar PV inverter systems can generate pure DC residual currents, requiring Type B RCD protection that can detect all current types including pure DC.'
  },
  {
    id: 7,
    question: 'What happens if the wrong RCD type is installed for an application?',
    options: ['Higher electricity bills', 'Potential failure to provide protection', 'Faster wear of equipment', 'Better protection than needed'],
    correctAnswer: 1,
    explanation: 'Installing the wrong RCD type can result in failure to detect certain types of residual currents, potentially leaving dangerous conditions undetected.'
  },
  {
    id: 8,
    question: 'Which BS 7671 regulation covers RCD type selection?',
    options: ['Regulation 411.3.3', 'Regulation 531.3.3', 'Regulation 522.6.202', 'Regulation 314.1'],
    correctAnswer: 1,
    explanation: 'Regulation 531.3.3 specifies the requirements for RCD type selection based on the type of residual currents that may occur.'
  },
  {
    id: 9,
    question: 'What is the minimum acceptable RCD type for general new installations?',
    options: ['Type AC', 'Type A', 'Type F', 'Type B'],
    correctAnswer: 1,
    explanation: 'Type A is the minimum acceptable standard for new installations as it can handle both AC and pulsating DC residual currents from modern electronic equipment.'
  },
  {
    id: 10,
    question: 'Which RCD type provides universal protection against all residual current types?',
    options: ['Type AC', 'Type A', 'Type F', 'Type B'],
    correctAnswer: 3,
    explanation: 'Type B RCDs provide universal protection, detecting AC, pulsating DC, high-frequency, and pure DC residual currents - covering all possible fault current types.'
  }
];