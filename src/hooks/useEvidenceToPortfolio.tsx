import { useState } from "react";
import { TrainingEvidenceItem } from "@/types/time-tracking";
import { PortfolioEntry, PortfolioCategory, PortfolioFile } from "@/types/portfolio";
import { usePortfolioData } from "@/hooks/portfolio/usePortfolioData";
import { useToast } from "@/hooks/use-toast";

// Map evidence types to portfolio categories
const TYPE_TO_CATEGORY_MAP: Record<string, string> = {
  'Practical Work': 'practical-skills',
  'Assessment': 'testing-inspection',
  'Safety Training': 'health-safety',
  'Theory Work': 'professional-development',
  'Customer Work': 'customer-service',
  'College Work': 'professional-development',
  'Certification': 'regulatory-compliance',
  'Photo Evidence': 'practical-skills',
  'Video Evidence': 'practical-skills',
  'Document': 'professional-development'
};

export const useEvidenceToPortfolio = () => {
  const { categories, addEntry } = usePortfolioData();
  const { toast } = useToast();
  const [isConverting, setIsConverting] = useState(false);
  const [convertingId, setConvertingId] = useState<string | null>(null);

  const convertEvidenceToPortfolio = async (evidence: TrainingEvidenceItem): Promise<boolean> => {
    setIsConverting(true);
    setConvertingId(evidence.id);

    try {
      // Find the appropriate category based on evidence type
      const categoryId = TYPE_TO_CATEGORY_MAP[evidence.type] || 'practical-skills';
      const category = categories.find(c => c.id === categoryId) || categories[0];

      if (!category) {
        throw new Error('No portfolio categories available');
      }

      // Convert evidence files to portfolio file format
      const evidenceFiles: PortfolioFile[] = evidence.files.map((fileName, idx) => ({
        id: `evidence_file_${idx}_${Date.now()}`,
        name: fileName,
        type: getFileType(fileName),
        size: 0, // We don't have size info from the old format
        uploadDate: evidence.date
      }));

      // Create the portfolio entry data
      const portfolioData: Omit<PortfolioEntry, 'id' | 'dateCreated'> = {
        title: evidence.title,
        description: evidence.description,
        category,
        skills: inferSkillsFromType(evidence.type),
        reflection: `This evidence was captured on ${evidence.date}. ${evidence.description}`,
        evidenceFiles,
        tags: ['converted-from-evidence', evidence.type.toLowerCase().replace(/\s+/g, '-')],
        assessmentCriteria: [],
        learningOutcomes: inferLearningOutcomesFromType(evidence.type),
        selfAssessment: 3,
        status: 'draft',
        timeSpent: 0,
        awardingBodyStandards: []
      };

      // Add to portfolio
      const result = await addEntry(portfolioData);

      if (result) {
        toast({
          title: "Evidence converted",
          description: `"${evidence.title}" has been added to your portfolio as a draft entry.`,
        });
        return true;
      } else {
        throw new Error('Failed to create portfolio entry');
      }
    } catch (error) {
      console.error('Error converting evidence:', error);
      toast({
        title: "Conversion failed",
        description: "Failed to convert evidence to portfolio entry. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsConverting(false);
      setConvertingId(null);
    }
  };

  return {
    convertEvidenceToPortfolio,
    isConverting,
    convertingId
  };
};

// Helper functions
const getFileType = (fileName: string): string => {
  const ext = fileName.split('.').pop()?.toLowerCase() || '';
  const mimeTypes: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'mp4': 'video/mp4'
  };
  return mimeTypes[ext] || 'application/octet-stream';
};

const inferSkillsFromType = (type: string): string[] => {
  const skillsMap: Record<string, string[]> = {
    'Practical Work': ['wiring-installation', 'cable-management'],
    'Assessment': ['electrical-testing', 'fault-finding'],
    'Safety Training': ['health-safety'],
    'Theory Work': ['circuit-analysis'],
    'Customer Work': [],
    'College Work': ['circuit-analysis'],
    'Certification': [],
    'Photo Evidence': [],
    'Video Evidence': [],
    'Document': []
  };
  return skillsMap[type] || [];
};

const inferLearningOutcomesFromType = (type: string): string[] => {
  const outcomesMap: Record<string, string[]> = {
    'Practical Work': ['lo2'],
    'Assessment': ['lo3'],
    'Safety Training': ['lo1'],
    'Theory Work': ['lo1', 'lo5'],
    'Customer Work': ['lo7'],
    'College Work': ['lo1', 'lo2'],
    'Certification': ['lo5'],
    'Photo Evidence': ['lo2'],
    'Video Evidence': ['lo2'],
    'Document': ['lo7']
  };
  return outcomesMap[type] || [];
};

export default useEvidenceToPortfolio;
