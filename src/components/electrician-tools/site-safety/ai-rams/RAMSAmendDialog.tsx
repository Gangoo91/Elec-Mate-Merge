import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Edit3, Sparkles, Calendar, MapPin, User, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import type { RAMSData } from '@/types/rams';
import type { MethodStatementData } from '@/types/method-statement';
import { useNavigate } from 'react-router-dom';

interface RAMSAmendDialogProps {
  documentId: string;
  isOpen: boolean;
  onClose: () => void;
  onQuickEdit?: (ramsData: RAMSData, methodData: Partial<MethodStatementData>) => void;
}

export const RAMSAmendDialog: React.FC<RAMSAmendDialogProps> = ({
  documentId,
  isOpen,
  onClose,
  onQuickEdit
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [documentData, setDocumentData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && documentId) {
      loadDocument();
    }
  }, [isOpen, documentId]);

  const loadDocument = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('rams_documents')
        .select('*')
        .eq('id', documentId)
        .single();

      if (error) throw error;
      setDocumentData(data);
    } catch (error) {
      console.error('Error loading document:', error);
      toast({
        title: 'Error',
        description: 'Failed to load document data',
        variant: 'destructive'
      });
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickEdit = () => {
    if (!documentData) return;

    // Parse RAMS data from document
    const ramsData: RAMSData = {
      projectName: documentData.project_name,
      location: documentData.location,
      date: documentData.date,
      assessor: documentData.assessor,
      activities: documentData.activities || [],
      risks: documentData.risks || [],
      contractor: documentData.contractor || '',
      supervisor: documentData.supervisor || '',
      siteManagerName: documentData.site_manager_name || '',
      siteManagerPhone: documentData.site_manager_phone || '',
      firstAiderName: documentData.first_aider_name || '',
      firstAiderPhone: documentData.first_aider_phone || '',
      safetyOfficerName: documentData.safety_officer_name || '',
      safetyOfficerPhone: documentData.safety_officer_phone || '',
      assemblyPoint: documentData.assembly_point || ''
    };

    const methodData: Partial<MethodStatementData> = {
      jobTitle: documentData.project_name,
      location: documentData.location,
      contractor: documentData.contractor || '',
      supervisor: documentData.supervisor || '',
      steps: []
    };

    if (onQuickEdit) {
      onQuickEdit(ramsData, methodData);
    }
    onClose();
  };

  const handleRegenerateWithAI = () => {
    if (!documentData) return;

    // Navigate to AI generator with pre-filled data
    navigate('/electrician-tools/ai-rams', {
      state: {
        amendMode: true,
        documentId: documentData.id,
        initialData: {
          jobDescription: `Amend existing RAMS for: ${documentData.project_name}`,
          projectInfo: {
            projectName: documentData.project_name,
            location: documentData.location,
            assessor: documentData.assessor,
            contractor: documentData.contractor || '',
            supervisor: documentData.supervisor || '',
            siteManagerName: documentData.site_manager_name || '',
            siteManagerPhone: documentData.site_manager_phone || '',
            firstAiderName: documentData.first_aider_name || '',
            firstAiderPhone: documentData.first_aider_phone || '',
            safetyOfficerName: documentData.safety_officer_name || '',
            safetyOfficerPhone: documentData.safety_officer_phone || '',
            assemblyPoint: documentData.assembly_point || ''
          }
        }
      }
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:max-w-[500px] max-h-[85vh] sm:max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base sm:text-xl">
            <Edit3 className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
            Amend RAMS Document
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-base">
            Choose how you'd like to update this document
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
          </div>
        ) : documentData ? (
          <div className="space-y-3 sm:space-y-6 py-2 sm:py-4">
            {/* Document Info */}
            <div className="space-y-2 sm:space-y-3.5 p-3 sm:p-5 rounded-lg bg-elec-gray/80 border-2 border-elec-yellow/30">
              <div className="flex items-start gap-2 sm:gap-2.5">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Project</p>
                  <p className="text-sm sm:text-base font-semibold break-words">{documentData.project_name}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-2.5">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Location</p>
                  <p className="text-sm sm:text-base break-words">{documentData.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-2.5">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Created</p>
                  <p className="text-sm sm:text-base">{new Date(documentData.created_at).toLocaleDateString('en-GB')}</p>
                </div>
              </div>
            </div>

            {/* Edit Options */}
            <div className="space-y-2 sm:space-y-3">
              <Button
                onClick={handleQuickEdit}
                className="w-full min-h-[56px] sm:min-h-[68px] py-3 sm:py-4 px-3 sm:px-5 flex-col items-start gap-1.5 sm:gap-2 bg-gradient-to-r from-elec-yellow to-yellow-400 hover:from-elec-yellow/90 hover:to-yellow-400/90 text-elec-dark shadow-lg"
              >
                <div className="flex items-center gap-2 sm:gap-2.5 w-full">
                  <Edit3 className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-base sm:text-lg font-bold">Quick Edit</span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-elec-dark/90">
                  Edit risks and steps directly - fast updates
                </span>
              </Button>

              <Button
                onClick={handleRegenerateWithAI}
                variant="outline"
                className="w-full min-h-[56px] sm:min-h-[68px] py-3 sm:py-4 px-3 sm:px-5 flex-col items-start gap-1.5 sm:gap-2 border-2 border-elec-yellow/50 hover:border-elec-yellow hover:bg-elec-yellow/10"
              >
                <div className="flex items-center gap-2 sm:gap-2.5 w-full">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
                  <span className="text-base sm:text-lg font-bold">Regenerate with AI</span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                  Use AI to rebuild from scratch with new information
                </span>
              </Button>
            </div>

            {/* Cancel Button */}
            <Button
              onClick={onClose}
              variant="ghost"
              className="w-full min-h-[40px] sm:min-h-[44px] text-sm sm:text-base border border-transparent hover:border-elec-yellow/30"
            >
              Cancel
            </Button>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};
