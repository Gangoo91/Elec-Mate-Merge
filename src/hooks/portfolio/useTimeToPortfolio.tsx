
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { TimeEntry } from "@/types/time-tracking";
import { PortfolioEntry, PortfolioCategory } from "@/types/portfolio";
import { usePortfolioData } from "./usePortfolioData";
import { useUniversalPortfolio } from "./useUniversalPortfolio";

export const useTimeToPortfolio = () => {
  const { toast } = useToast();
  const { addEntry, categories } = usePortfolioData();
  const { createUniversalPortfolioEntry, convertTimeEntryToUniversal } = useUniversalPortfolio();
  const [isConverting, setIsConverting] = useState(false);

  const convertTimeEntryToPortfolio = async (
    timeEntry: TimeEntry,
    portfolioData: {
      title: string;
      description: string;
      categoryId: string;
      skills: string[];
      reflection: string;
      learningOutcomes: string[];
      assessmentCriteria: string[];
      tags: string[];
    }
  ) => {
    setIsConverting(true);
    
    try {
      // Find the selected category
      const selectedCategory = categories.find(cat => cat.id === portfolioData.categoryId);
      
      if (!selectedCategory) {
        throw new Error("Selected category not found");
      }

      // Create portfolio entry from time entry using universal system
      const portfolioEntry: Omit<PortfolioEntry, 'id' | 'dateCreated'> = {
        title: portfolioData.title,
        description: portfolioData.description,
        category: selectedCategory,
        skills: portfolioData.skills,
        reflection: portfolioData.reflection,
        dateCompleted: timeEntry.date,
        evidenceFiles: [],
        tags: portfolioData.tags,
        assessmentCriteria: portfolioData.assessmentCriteria,
        learningOutcomes: portfolioData.learningOutcomes,
        supervisorFeedback: '',
        selfAssessment: 3, // Default rating
        status: 'completed',
        timeSpent: timeEntry.duration,
        awardingBodyStandards: []
      };

      // Add to portfolio
      const newEntryId = addEntry(portfolioEntry);
      
      toast({
        title: "Added to Portfolio",
        description: `"${portfolioData.title}" has been successfully added to your portfolio.`
      });

      return newEntryId;
    } catch (error) {
      console.error('Error converting time entry to portfolio:', error);
      toast({
        title: "Error",
        description: "Failed to add entry to portfolio. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsConverting(false);
    }
  };

  // Quick convert using universal system with smart defaults
  const quickConvertTimeEntry = async (timeEntry: TimeEntry) => {
    setIsConverting(true);
    
    try {
      const universalActivity = convertTimeEntryToUniversal(timeEntry);
      const entryId = await createUniversalPortfolioEntry(universalActivity);
      
      toast({
        title: "Quick Add Successful",
        description: `"${timeEntry.activity}" has been automatically added to your portfolio with smart categorisation.`
      });

      return entryId;
    } catch (error) {
      console.error('Error quick converting time entry:', error);
      toast({
        title: "Error",
        description: "Failed to add entry to portfolio. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsConverting(false);
    }
  };

  return {
    convertTimeEntryToPortfolio,
    quickConvertTimeEntry,
    isConverting,
    categories
  };
};
