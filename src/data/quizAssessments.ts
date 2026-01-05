import { Assessment } from '@/types/quiz';

export const quizAssessments: Assessment[] = [
  {
    id: 'visual-inspection',
    title: 'Visual Inspection',
    description: 'Initial examination of electrical installations before testing',
    questions: 20,
    duration: 18,
    difficulty: 'Beginner' as const,
    score: null,
    category: 'Visual Inspection',
    color: 'border-emerald-500/20 bg-emerald-500/5',
    regulation: 'BS 7671:643.1'
  },
  {
    id: 'continuity-testing',
    title: 'Continuity Testing',
    description: 'R1+R2 and ring final circuit continuity measurements',
    questions: 20,
    duration: 18,
    difficulty: 'Intermediate' as const,
    score: null,
    category: 'Continuity Testing',
    color: 'border-blue-500/20 bg-blue-500/5',
    regulation: 'BS 7671:643.2'
  },
  {
    id: 'insulation-resistance',
    title: 'Insulation Resistance',
    description: 'Testing insulation integrity between conductors and earth',
    questions: 20,
    duration: 18,
    difficulty: 'Intermediate' as const,
    score: null,
    category: 'Insulation Resistance',
    color: 'border-purple-500/20 bg-purple-500/5',
    regulation: 'BS 7671:643.3'
  },
  {
    id: 'polarity-testing',
    title: 'Polarity Testing',
    description: 'Verification of correct polarity at all relevant points',
    questions: 20,
    duration: 18,
    difficulty: 'Beginner' as const,
    score: null,
    category: 'Polarity Testing',
    color: 'border-green-500/20 bg-green-500/5',
    regulation: 'BS 7671:643.4'
  },
  {
    id: 'earth-fault-loop',
    title: 'Earth Fault Loop Impedance',
    description: 'Zs testing and maximum permitted values verification',
    questions: 20,
    duration: 18,
    difficulty: 'Advanced' as const,
    score: null,
    category: 'Earth Fault Loop Impedance',
    color: 'border-red-500/20 bg-red-500/5',
    regulation: 'BS 7671:643.5'
  },
  {
    id: 'rcd-testing',
    title: 'RCD Testing',
    description: 'Residual current device operation and timing tests',
    questions: 20,
    duration: 18,
    difficulty: 'Advanced' as const,
    score: null,
    category: 'RCD Testing',
    color: 'border-orange-500/20 bg-orange-500/5',
    regulation: 'BS 7671:643.6'
  },
  {
    id: 'prospective-fault',
    title: 'Prospective Fault Current',
    description: 'PFC measurements and protective device coordination',
    questions: 20,
    duration: 18,
    difficulty: 'Intermediate' as const,
    score: null,
    category: 'Prospective Fault Current',
    color: 'border-cyan-500/20 bg-cyan-500/5',
    regulation: 'BS 7671:643.7'
  },
  {
    id: 'functional-testing',
    title: 'Functional Testing',
    description: 'Testing of protective devices, switches, and controls',
    questions: 20,
    duration: 18,
    difficulty: 'Beginner' as const,
    score: null,
    category: 'Functional Testing',
    color: 'border-teal-500/20 bg-teal-500/5',
    regulation: 'BS 7671:643.8'
  }
];

export const getAssessmentById = (id: string): Assessment | undefined => {
  return quizAssessments.find(assessment => assessment.id === id);
};

export const getAllAssessments = (): Assessment[] => {
  return quizAssessments;
};
