
import { useState, useEffect } from "react";
import { PortfolioEntry, PortfolioCategory, PortfolioAnalytics, PortfolioActivity } from "@/types/portfolio";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = 'portfolio_entries';
const CATEGORIES_KEY = 'portfolio_categories';
const ANALYTICS_KEY = 'portfolio_analytics';

const defaultCategories: PortfolioCategory[] = [
  {
    id: 'practical-skills',
    name: 'Practical Skills',
    description: 'Hands-on electrical work and installations',
    icon: 'wrench',
    color: 'blue',
    requiredEntries: 8,
    completedEntries: 0
  },
  {
    id: 'health-safety',
    name: 'Health & Safety',
    description: 'Safety procedures and risk assessments',
    icon: 'shield',
    color: 'green',
    requiredEntries: 5,
    completedEntries: 0
  },
  {
    id: 'testing-inspection',
    name: 'Testing & Inspection',
    description: 'Electrical testing and certification work',
    icon: 'search',
    color: 'yellow',
    requiredEntries: 6,
    completedEntries: 0
  },
  {
    id: 'customer-service',
    name: 'Customer Service',
    description: 'Client interactions and communication',
    icon: 'users',
    color: 'purple',
    requiredEntries: 4,
    completedEntries: 0
  },
  {
    id: 'professional-development',
    name: 'Professional Development',
    description: 'Learning and skill enhancement activities',
    icon: 'graduation-cap',
    color: 'orange',
    requiredEntries: 3,
    completedEntries: 0
  }
];

export const usePortfolioData = () => {
  const { toast } = useToast();
  const [entries, setEntries] = useState<PortfolioEntry[]>([]);
  const [categories, setCategories] = useState<PortfolioCategory[]>(defaultCategories);
  const [analytics, setAnalytics] = useState<PortfolioAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    loadData();
  }, []);

  // Update analytics when entries change
  useEffect(() => {
    updateAnalytics();
  }, [entries]);

  const loadData = () => {
    try {
      const savedEntries = localStorage.getItem(STORAGE_KEY);
      const savedCategories = localStorage.getItem(CATEGORIES_KEY);
      
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
      
      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      }
    } catch (error) {
      console.error('Error loading portfolio data:', error);
      toast({
        title: "Error loading portfolio",
        description: "Failed to load your portfolio data from storage.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveEntries = (newEntries: PortfolioEntry[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries));
      setEntries(newEntries);
    } catch (error) {
      console.error('Error saving entries:', error);
      toast({
        title: "Error saving portfolio",
        description: "Failed to save your portfolio changes.",
        variant: "destructive"
      });
    }
  };

  const addEntry = (entryData: Omit<PortfolioEntry, 'id' | 'dateCreated'>) => {
    const newEntry: PortfolioEntry = {
      ...entryData,
      id: `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      dateCreated: new Date().toISOString(),
      status: 'draft'
    };

    const updatedEntries = [...entries, newEntry];
    saveEntries(updatedEntries);
    
    toast({
      title: "Portfolio entry added",
      description: "Your new portfolio entry has been saved successfully."
    });

    return newEntry.id;
  };

  const updateEntry = (entryId: string, updates: Partial<PortfolioEntry>) => {
    const updatedEntries = entries.map(entry => 
      entry.id === entryId ? { ...entry, ...updates } : entry
    );
    saveEntries(updatedEntries);
    
    toast({
      title: "Portfolio entry updated",
      description: "Your changes have been saved successfully."
    });
  };

  const deleteEntry = (entryId: string) => {
    const updatedEntries = entries.filter(entry => entry.id !== entryId);
    saveEntries(updatedEntries);
    
    toast({
      title: "Portfolio entry deleted",
      description: "The portfolio entry has been removed."
    });
  };

  const updateAnalytics = () => {
    const totalEntries = entries.length;
    const completedEntries = entries.filter(e => e.status === 'completed').length;
    const totalTimeSpent = entries.reduce((total, entry) => total + entry.timeSpent, 0);
    const averageRating = entries.length > 0 
      ? entries.reduce((total, entry) => total + entry.selfAssessment, 0) / entries.length 
      : 0;

    const categoriesProgress: { [key: string]: number } = {};
    categories.forEach(category => {
      const categoryEntries = entries.filter(e => e.category.id === category.id && e.status === 'completed');
      categoriesProgress[category.id] = Math.min((categoryEntries.length / category.requiredEntries) * 100, 100);
    });

    const skillsDemo = [...new Set(entries.flatMap(entry => entry.skills))];

    const recentActivity: PortfolioActivity[] = entries
      .slice(-5)
      .map(entry => ({
        id: `activity_${entry.id}`,
        type: 'created',
        entryId: entry.id,
        entryTitle: entry.title,
        date: entry.dateCreated
      }));

    const newAnalytics: PortfolioAnalytics = {
      totalEntries,
      completedEntries,
      totalTimeSpent,
      averageRating,
      categoriesProgress,
      skillsDemo,
      recentActivity
    };

    setAnalytics(newAnalytics);
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(newAnalytics));
  };

  return {
    entries,
    categories,
    analytics,
    isLoading,
    addEntry,
    updateEntry,
    deleteEntry,
    loadData
  };
};
