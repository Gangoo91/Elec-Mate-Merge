import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Save, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import type { RAMSData } from '@/types/rams';
import type { MethodStatementData } from '@/types/method-statement';
import { RAMSReviewEditor } from './RAMSReviewEditor';
import { updateRAMSDocument } from '@/utils/rams-pdf-storage';

interface RAMSQuickEditDialogProps {
  documentId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const RAMSQuickEditDialog: React.FC<RAMSQuickEditDialogProps> = ({
  documentId,
  isOpen,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [ramsData, setRamsData] = useState<RAMSData | null>(null);
  const [methodData, setMethodData] = useState<Partial<MethodStatementData> | null>(null);

  useEffect(() => {
    if (isOpen && documentId) {
      loadDocument();
    }
  }, [isOpen, documentId]);

  const loadDocument = async () => {
    setIsLoading(true);
    try {
      // Load the RAMS document
      const { data, error } = await supabase
        .from('rams_documents')
        .select('*')
        .eq('id', documentId)
        .single();

      if (error) throw error;

      // Extract emergency contacts from ai_generation_metadata if present
      const meta = (data.ai_generation_metadata as any) || {};
      const contacts = meta.emergencyContacts || {};

      const loadedRamsData: RAMSData = {
        projectName: data.project_name,
        location: data.location,
        date: data.date,
        assessor: data.assessor,
        activities: (data.activities as string[]) || [],
        risks: (data.risks as any[]) || [],
        contractor: data.contractor || '',
        supervisor: data.supervisor || '',
        requiredPPE: (data.required_ppe as string[]) || [],
        ppeDetails: (data.ppe_details as any[]) || [],
        // Emergency contacts (stored in ai_generation_metadata)
        siteManagerName: contacts.siteManagerName || '',
        siteManagerPhone: contacts.siteManagerPhone || '',
        firstAiderName: contacts.firstAiderName || '',
        firstAiderPhone: contacts.firstAiderPhone || '',
        safetyOfficerName: contacts.safetyOfficerName || '',
        safetyOfficerPhone: contacts.safetyOfficerPhone || '',
        assemblyPoint: contacts.assemblyPoint || '',
      };

      // Also load the linked method statement (steps, tools, materials etc.)
      const { data: methodRow } = await supabase
        .from('method_statements')
        .select('*')
        .eq('rams_document_id', documentId)
        .maybeSingle();

      const loadedMethodData: Partial<MethodStatementData> = {
        jobTitle: methodRow?.job_title || data.project_name,
        location: methodRow?.location || data.location,
        contractor: methodRow?.contractor || data.contractor || '',
        supervisor: methodRow?.supervisor || data.supervisor || '',
        workType: methodRow?.work_type || 'Electrical Installation',
        duration: methodRow?.duration || undefined,
        teamSize: methodRow?.team_size || undefined,
        description: methodRow?.description || undefined,
        overallRiskLevel: (methodRow?.overall_risk_level as any) || 'medium',
        reviewDate: methodRow?.review_date || undefined,
        approvedBy: methodRow?.approved_by || undefined,
        steps: (methodRow?.steps as any[]) || [],
        toolsRequired: (methodRow?.tools_required as string[]) || [],
        materialsRequired: (methodRow?.materials_required as string[]) || [],
        practicalTips: (methodRow?.practical_tips as string[]) || [],
        commonMistakes: (methodRow?.common_mistakes as string[]) || [],
        totalEstimatedTime: methodRow?.total_estimated_time || undefined,
        difficultyLevel: (methodRow?.difficulty_level as any) || undefined,
        complianceRegulations: (methodRow?.compliance_regulations as string[]) || [],
        complianceWarnings: (methodRow?.compliance_warnings as string[]) || [],
      };

      setRamsData(loadedRamsData);
      setMethodData(loadedMethodData);
    } catch (error) {
      console.error('Error loading document:', error);
      toast({
        title: 'Error',
        description: 'Failed to load document data',
        variant: 'destructive',
      });
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!ramsData || !methodData) return;

    setIsSaving(true);
    try {
      const result = await updateRAMSDocument(documentId, ramsData, methodData);

      if (result.success) {
        toast({
          title: 'Document Updated',
          description: 'Your RAMS document has been updated successfully',
          variant: 'success',
        });
        onClose();
      } else {
        throw new Error(result.error || 'Failed to update document');
      }
    } catch (error) {
      console.error('Error updating document:', error);
      toast({
        title: 'Update Failed',
        description: 'Failed to update document. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = (updatedRams: RAMSData, updatedMethod: Partial<MethodStatementData>) => {
    setRamsData(updatedRams);
    setMethodData(updatedMethod);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-4xl h-[85vh] sm:h-[90vh] p-0">
        <div className="flex flex-col h-full overflow-hidden">
          <DialogHeader className="px-4 py-3 border-b border-border shrink-0">
            <DialogTitle className="flex items-center justify-between">
              <span className="text-base sm:text-lg">Quick Edit RAMS Document</span>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                size="sm"
                className="bg-gradient-to-r from-elec-yellow to-yellow-400 hover:from-elec-yellow/90 hover:to-yellow-400/90 text-elec-dark"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-4 py-3">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
              </div>
            ) : ramsData && methodData ? (
              <RAMSReviewEditor
                ramsData={ramsData}
                methodData={methodData}
                isSaving={isSaving}
                onUpdate={handleUpdate}
                mode="standalone"
              />
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
