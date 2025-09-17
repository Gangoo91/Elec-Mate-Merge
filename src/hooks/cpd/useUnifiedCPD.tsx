import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { enhancedCPDService, type EnhancedCPDEntry, type CPDComplianceStats, type CPDPortfolio } from '@/services/enhancedCPDService';
import { professionalBodyService, type UserProfessionalMembership } from '@/services/professionalBodyService';
import { useToast } from '@/hooks/use-toast';

export interface CPDGoal {
  id: string;
  title: string;
  targetHours: number;
  currentHours: number;
  deadline: string;
  category: string;
  status: 'Active' | 'Completed' | 'Paused';
  description?: string;
  createdAt: string;
}

export const useUnifiedCPD = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [entries, setEntries] = useState<EnhancedCPDEntry[]>([]);
  const [goals, setGoals] = useState<CPDGoal[]>([]);
  const [memberships, setMemberships] = useState<UserProfessionalMembership[]>([]);
  const [complianceStats, setComplianceStats] = useState<CPDComplianceStats | null>(null);
  const [portfolios, setPortfolios] = useState<CPDPortfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMembership, setActiveMembership] = useState<UserProfessionalMembership | null>(null);

  const refreshData = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      
      // Fetch user memberships first
      const userMemberships = await professionalBodyService.getUserMemberships(user.id);
      setMemberships(userMemberships);
      
      // Set active membership (first one if none set)
      if (userMemberships.length > 0 && !activeMembership) {
        setActiveMembership(userMemberships[0]);
      }
      
      // Fetch CPD entries
      const cpdEntries = await enhancedCPDService.getAllEntries(
        user.id, 
        activeMembership?.professional_body_id
      );
      setEntries(cpdEntries);

      // Fetch compliance stats if we have an active membership
      if (activeMembership) {
        const stats = await enhancedCPDService.getComplianceStats(
          user.id, 
          activeMembership.professional_body_id
        );
        setComplianceStats(stats);
      }

      // Fetch portfolios
      const userPortfolios = await enhancedCPDService.getPortfolios(user.id);
      setPortfolios(userPortfolios);

      // Load goals from localStorage for now (can be migrated to DB later)
      const storedGoals = localStorage.getItem(`cpd_goals_${user.id}`);
      if (storedGoals) {
        setGoals(JSON.parse(storedGoals));
      }

    } catch (error) {
      console.error('Error refreshing CPD data:', error);
      toast({
        title: "Error loading CPD data",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [user?.id, activeMembership?.professional_body_id]);

  const addEntry = async (entryData: {
    title: string;
    description?: string;
    activity_type: string;
    category: string;
    hours: number;
    date_completed: string;
    learning_outcomes?: string[];
  }) => {
    if (!user?.id) {
      toast({
        title: "Authentication required",
        description: "Please log in to add CPD entries.",
        variant: "destructive"
      });
      return null;
    }

    try {
      const newEntry = await enhancedCPDService.addEntry({
        ...entryData,
        user_id: user.id,
        professional_body_id: activeMembership?.professional_body_id
      });
      
      await refreshData();
      
      toast({
        title: "CPD entry added",
        description: `${entryData.title} has been recorded.`,
      });
      
      return newEntry;
    } catch (error) {
      console.error('Error adding CPD entry:', error);
      toast({
        title: "Error adding entry",
        description: "Please try again later.",
        variant: "destructive"
      });
      return null;
    }
  };

  const updateEntry = async (id: string, updates: Partial<EnhancedCPDEntry>) => {
    try {
      const updatedEntry = await enhancedCPDService.updateEntry(id, updates);
      await refreshData();
      
      toast({
        title: "CPD entry updated",
        description: "Your changes have been saved.",
      });
      
      return updatedEntry;
    } catch (error) {
      console.error('Error updating CPD entry:', error);
      toast({
        title: "Error updating entry",
        description: "Please try again later.",
        variant: "destructive"
      });
      return null;
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      await enhancedCPDService.deleteEntry(id);
      await refreshData();
      
      toast({
        title: "CPD entry deleted",
        description: "The entry has been removed.",
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting CPD entry:', error);
      toast({
        title: "Error deleting entry",
        description: "Please try again later.",
        variant: "destructive"
      });
      return false;
    }
  };

  const uploadEvidence = async (file: File, entryId: string) => {
    if (!user?.id) return null;

    try {
      const evidenceFile = await enhancedCPDService.uploadEvidence(file, entryId, user.id);
      await refreshData();
      
      toast({
        title: "Evidence uploaded",
        description: "File has been attached to the CPD entry.",
      });
      
      return evidenceFile;
    } catch (error) {
      console.error('Error uploading evidence:', error);
      toast({
        title: "Error uploading evidence",
        description: "Please try again later.",
        variant: "destructive"
      });
      return null;
    }
  };

  const addGoal = (goalData: Omit<CPDGoal, 'id' | 'createdAt'>) => {
    if (!user?.id) return null;

    const newGoal: CPDGoal = {
      id: crypto.randomUUID(),
      ...goalData,
      createdAt: new Date().toISOString(),
    };

    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    localStorage.setItem(`cpd_goals_${user.id}`, JSON.stringify(updatedGoals));

    toast({
      title: "CPD goal created",
      description: `${goalData.title} has been added to your goals.`,
    });

    return newGoal;
  };

  const updateGoal = (id: string, updates: Partial<CPDGoal>) => {
    if (!user?.id) return null;

    const updatedGoals = goals.map(goal => 
      goal.id === id ? { ...goal, ...updates } : goal
    );
    
    setGoals(updatedGoals);
    localStorage.setItem(`cpd_goals_${user.id}`, JSON.stringify(updatedGoals));

    toast({
      title: "CPD goal updated",
      description: "Your changes have been saved.",
    });

    return updatedGoals.find(goal => goal.id === id) || null;
  };

  const deleteGoal = (id: string) => {
    if (!user?.id) return false;

    const updatedGoals = goals.filter(goal => goal.id !== id);
    setGoals(updatedGoals);
    localStorage.setItem(`cpd_goals_${user.id}`, JSON.stringify(updatedGoals));

    toast({
      title: "CPD goal deleted",
      description: "The goal has been removed.",
    });

    return true;
  };

  const generatePortfolio = async (title: string) => {
    if (!user?.id || !activeMembership) {
      toast({
        title: "Professional body required",
        description: "Please set up your professional body membership first.",
        variant: "destructive"
      });
      return null;
    }

    try {
      const portfolio = await enhancedCPDService.generatePortfolio(
        user.id,
        activeMembership.professional_body_id,
        title
      );
      
      await refreshData();
      
      toast({
        title: "Portfolio generated",
        description: "Your CPD portfolio has been created.",
      });
      
      return portfolio;
    } catch (error) {
      console.error('Error generating portfolio:', error);
      toast({
        title: "Error generating portfolio",
        description: "Please try again later.",
        variant: "destructive"
      });
      return null;
    }
  };

  return {
    entries,
    goals,
    memberships,
    activeMembership,
    complianceStats,
    portfolios,
    loading,
    addEntry,
    updateEntry,
    deleteEntry,
    uploadEvidence,
    addGoal,
    updateGoal,
    deleteGoal,
    generatePortfolio,
    setActiveMembership,
    refreshData,
  };
};