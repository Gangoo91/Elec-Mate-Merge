import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useUltraFastPortfolio } from './useUltraFastPortfolio';
import { PortfolioEntry } from '@/types/portfolio';

interface AssessmentData {
  id: string;
  unitCode: string;
  unitTitle: string;
  assessmentType: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeTaken: number;
  completedAt: string;
  feedback?: string;
  grade?: string;
}

interface QuizAttempt {
  id: string;
  user_id: string;
  unit_code: string;
  score: number;
  total_questions: number;
  percentage: number;
  time_taken: number;
  created_at: string;
}

export const useAssessmentPortfolioIntegration = () => {
  const { toast } = useToast();
  const { addEntry, categories } = useUltraFastPortfolio();
  const [isConverting, setIsConverting] = useState(false);

  // Map assessment types to portfolio categories
  const getPortfolioCategoryForAssessment = (unitCode: string, assessmentType: string) => {
    // Find the most relevant category based on unit code or assessment type
    const unitCodeLower = unitCode.toLowerCase();
    
    // Electrical installation categories
    if (unitCodeLower.includes('installation') || unitCodeLower.includes('wiring')) {
      return categories.find(cat => cat.name.toLowerCase().includes('installation'));
    }
    
    // Health and safety categories
    if (unitCodeLower.includes('safety') || unitCodeLower.includes('health')) {
      return categories.find(cat => cat.name.toLowerCase().includes('safety'));
    }
    
    // Testing and commissioning
    if (unitCodeLower.includes('test') || unitCodeLower.includes('commission')) {
      return categories.find(cat => cat.name.toLowerCase().includes('testing'));
    }
    
    // Maintenance
    if (unitCodeLower.includes('maintenance') || unitCodeLower.includes('repair')) {
      return categories.find(cat => cat.name.toLowerCase().includes('maintenance'));
    }
    
    // Default to first available category
    return categories[0] || {
      id: 'default',
      name: 'General Assessment',
      description: 'General assessment evidence',
      icon: 'FileText',
      color: '#ffc107',
      requiredEntries: 1,
      completedEntries: 0
    };
  };

  // Generate skills based on assessment performance
  const generateSkillsFromAssessment = (assessment: AssessmentData): string[] => {
    const skills: string[] = [];
    const unitLower = assessment.unitTitle.toLowerCase();
    
    // Base skills from unit content
    if (unitLower.includes('installation')) {
      skills.push('Cable installation', 'Circuit design', 'Equipment mounting');
    }
    if (unitLower.includes('testing')) {
      skills.push('Equipment testing', 'Circuit verification', 'Documentation');
    }
    if (unitLower.includes('safety')) {
      skills.push('Risk assessment', 'Safety procedures', 'Hazard identification');
    }
    if (unitLower.includes('maintenance')) {
      skills.push('Preventive maintenance', 'Fault diagnosis', 'Component replacement');
    }
    
    // Performance-based skills
    if (assessment.percentage >= 90) {
      skills.push('Excellence in theoretical knowledge');
    } else if (assessment.percentage >= 80) {
      skills.push('Strong theoretical understanding');
    } else if (assessment.percentage >= 70) {
      skills.push('Good theoretical foundation');
    }
    
    // Assessment-specific skills
    skills.push('Knowledge assessment completion', 'Time management');
    
    return skills;
  };

  // Generate learning outcomes based on assessment
  const generateLearningOutcomes = (assessment: AssessmentData): string[] => {
    const outcomes: string[] = [];
    
    outcomes.push(`Demonstrated understanding of ${assessment.unitTitle}`);
    outcomes.push(`Achieved ${assessment.percentage}% competency in ${assessment.unitCode}`);
    
    if (assessment.percentage >= 80) {
      outcomes.push('Exceeded minimum competency requirements');
    }
    
    outcomes.push('Completed formal knowledge assessment');
    
    return outcomes;
  };

  // Generate assessment criteria
  const generateAssessmentCriteria = (assessment: AssessmentData): string[] => {
    const criteria: string[] = [];
    
    criteria.push(`Unit: ${assessment.unitCode} - ${assessment.unitTitle}`);
    criteria.push(`Assessment type: ${assessment.assessmentType}`);
    criteria.push(`Minimum pass mark: 70%`);
    criteria.push(`Achieved score: ${assessment.percentage}%`);
    
    return criteria;
  };

  // Convert quiz attempt to assessment data
  const convertQuizAttemptToAssessment = (quiz: QuizAttempt): AssessmentData => {
    return {
      id: quiz.id,
      unitCode: quiz.unit_code,
      unitTitle: `Unit ${quiz.unit_code}`, // We might want to enhance this with actual unit titles
      assessmentType: 'Knowledge Test',
      score: quiz.score,
      totalQuestions: quiz.total_questions,
      percentage: quiz.percentage,
      timeTaken: quiz.time_taken,
      completedAt: quiz.created_at,
    };
  };

  // Convert assessment to portfolio entry
  const convertAssessmentToPortfolio = async (
    assessment: AssessmentData, 
    additionalData?: {
      title?: string;
      reflection?: string;
      additionalSkills?: string[];
      categoryId?: string;
    }
  ): Promise<string | undefined> => {
    setIsConverting(true);
    
    try {
      const category = additionalData?.categoryId 
        ? categories.find(cat => cat.id === additionalData.categoryId)
        : getPortfolioCategoryForAssessment(assessment.unitCode, assessment.assessmentType);

      if (!category) {
        throw new Error('No suitable portfolio category found');
      }

      const skills = [
        ...generateSkillsFromAssessment(assessment),
        ...(additionalData?.additionalSkills || [])
      ];

      const portfolioEntry: Omit<PortfolioEntry, 'id'> = {
        title: additionalData?.title || `${assessment.assessmentType}: ${assessment.unitTitle}`,
        description: `Assessment completion for ${assessment.unitTitle} (${assessment.unitCode}). Achieved ${assessment.score}/${assessment.totalQuestions} (${assessment.percentage}%) in ${Math.round(assessment.timeTaken / 60)} minutes.`,
        category,
        skills,
        reflection: additionalData?.reflection || `Successfully completed the ${assessment.assessmentType} for ${assessment.unitTitle}. This assessment tested my theoretical knowledge and understanding of key concepts in ${assessment.unitCode}. Achieving ${assessment.percentage}% demonstrates my competency in this area.`,
        dateCreated: assessment.completedAt,
        dateCompleted: assessment.completedAt,
        evidenceFiles: [], // Could be enhanced to include assessment screenshots/certificates
        tags: [
          'assessment',
          assessment.assessmentType.toLowerCase().replace(' ', '-'),
          assessment.unitCode.toLowerCase(),
          assessment.percentage >= 80 ? 'high-achievement' : 'competent'
        ],
        assessmentCriteria: generateAssessmentCriteria(assessment),
        learningOutcomes: generateLearningOutcomes(assessment),
        selfAssessment: Math.ceil(assessment.percentage / 20), // Convert percentage to 1-5 scale
        status: 'completed' as const,
        timeSpent: assessment.timeTaken,
        awardingBodyStandards: [`Unit ${assessment.unitCode}`],
        supervisorFeedback: assessment.feedback
      };

      const newEntry = await addEntry(portfolioEntry);
      
      if (newEntry) {
        toast({
          title: "Assessment Added to Portfolio",
          description: `Your ${assessment.assessmentType} results have been successfully added to your portfolio.`,
        });
        
        return newEntry.id;
      }
    } catch (error) {
      console.error('Error converting assessment to portfolio:', error);
      toast({
        title: "Conversion Failed",
        description: "Failed to add assessment to portfolio. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsConverting(false);
    }
  };

  // Auto-convert quiz attempts to portfolio entries
  const autoConvertQuizAttempt = async (quiz: QuizAttempt): Promise<string | undefined> => {
    const assessment = convertQuizAttemptToAssessment(quiz);
    return convertAssessmentToPortfolio(assessment);
  };

  // Bulk convert multiple assessments
  const bulkConvertAssessments = async (assessments: AssessmentData[]): Promise<{ successful: number; failed: number }> => {
    setIsConverting(true);
    let successful = 0;
    let failed = 0;

    try {
      for (const assessment of assessments) {
        try {
          await convertAssessmentToPortfolio(assessment);
          successful++;
        } catch {
          failed++;
        }
      }

      toast({
        title: "Bulk Conversion Complete",
        description: `Successfully converted ${successful} assessments. ${failed} failed.`,
        variant: failed > 0 ? "destructive" : "default"
      });
    } finally {
      setIsConverting(false);
    }

    return { successful, failed };
  };

  return {
    convertAssessmentToPortfolio,
    autoConvertQuizAttempt,
    bulkConvertAssessments,
    convertQuizAttemptToAssessment,
    generateSkillsFromAssessment,
    isConverting,
    categories
  };
};