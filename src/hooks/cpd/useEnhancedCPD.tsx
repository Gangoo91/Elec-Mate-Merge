import { useState, useEffect } from 'react';
import { enhancedCPDService } from '@/services/enhanced-cpd-service';
import { 
  EnhancedCPDEntry, 
  CPDSettings, 
  ComplianceAnalysis, 
  CPDReminder,
  EvidenceFile 
} from '@/types/cpd-enhanced';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useEnhancedCPD = () => {
  const [entries, setEntries] = useState<EnhancedCPDEntry[]>([]);
  const [settings, setSettings] = useState<CPDSettings | null>(null);
  const [reminders, setReminders] = useState<CPDReminder[]>([]);
  const [compliance, setCompliance] = useState<ComplianceAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const refreshData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const newEntries = await enhancedCPDService.getEntries(user.id);
      const newSettings = enhancedCPDService.getSettings();
      const newReminders = enhancedCPDService.getActiveReminders();
      const newCompliance = enhancedCPDService.getComplianceAnalysis();
      
      setEntries(newEntries);
      setSettings(newSettings);
      setReminders(newReminders);
      setCompliance(newCompliance);
    } catch (error) {
      console.error('Error refreshing enhanced CPD data:', error);
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
  }, []);

  const addEntry = async (entryData: Omit<EnhancedCPDEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to add CPD entries.",
          variant: "destructive"
        });
        return null;
      }

      const newEntry = await enhancedCPDService.saveEntry(user.id, entryData);
      refreshData();
      toast({
        title: "CPD entry added",
        description: `${entryData.activity} has been recorded.`,
      });
      return newEntry;
    } catch (error) {
      console.error('Error adding enhanced CPD entry:', error);
      toast({
        title: "Error adding entry",
        description: "Please try again later.",
        variant: "destructive"
      });
      return null;
    }
  };

  const uploadEvidence = async (entryId: string, file: File, type: string) => {
    try {
      const evidenceFile = await enhancedCPDService.uploadEvidence(entryId, file, type);
      
      // Update the entry with the new evidence
      const updatedEntries = entries.map(entry => {
        if (entry.id === entryId) {
          return {
            ...entry,
            evidenceFiles: [...entry.evidenceFiles, evidenceFile],
            updatedAt: new Date().toISOString()
          };
        }
        return entry;
      });
      
      setEntries(updatedEntries);
      toast({
        title: "Evidence uploaded",
        description: "File has been processed and attached to your CPD entry.",
      });
      
      return evidenceFile;
    } catch (error) {
      console.error('Error uploading evidence:', error);
      toast({
        title: "Upload failed",
        description: "Please try again later.",
        variant: "destructive"
      });
      return null;
    }
  };

  const updateSettings = (newSettings: CPDSettings) => {
    try {
      enhancedCPDService.saveSettings(newSettings);
      setSettings(newSettings);
      refreshData(); // Refresh to update compliance analysis
      toast({
        title: "Settings updated",
        description: "Your CPD preferences have been saved.",
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Settings update failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const dismissReminder = (reminderId: string) => {
    try {
      enhancedCPDService.dismissReminder(reminderId);
      refreshData();
      toast({
        title: "Reminder dismissed",
        description: "The reminder has been marked as completed.",
      });
    } catch (error) {
      console.error('Error dismissing reminder:', error);
      toast({
        title: "Error dismissing reminder",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const getAnalytics = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      return await enhancedCPDService.getDetailedAnalytics(user.id);
    } catch (error) {
      console.error('Error getting analytics:', error);
      return null;
    }
  };

  const addFromTemplate = (template: any, additionalData?: any) => {
    const entryData: Omit<EnhancedCPDEntry, 'id' | 'createdAt' | 'updatedAt'> = {
      date: new Date().toISOString().split('T')[0],
      activity: template.title,
      category: template.category,
      type: template.type,
      hours: template.estimatedHours,
      provider: template.provider || 'Self-selected',
      description: template.description,
      learningOutcomes: template.learningOutcomes?.join('; '),
      evidenceFiles: [],
      status: 'pending',
      templateUsed: template.id,
      skillsGained: [],
      ...additionalData
    };

    return addEntry(entryData);
  };

  return {
    // Data
    entries,
    settings,
    reminders,
    compliance,
    loading,
    
    // Actions
    addEntry,
    addFromTemplate,
    uploadEvidence,
    updateSettings,
    dismissReminder,
    refreshData,
    getAnalytics,
  };
};