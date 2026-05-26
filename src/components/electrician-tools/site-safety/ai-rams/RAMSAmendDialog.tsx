import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ArrowRight, Loader2 } from 'lucide-react';
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

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <div className="py-3 flex items-baseline gap-4">
    <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 w-24 shrink-0">
      {label}
    </span>
    <span className="text-[13.5px] text-white flex-1 min-w-0 break-words leading-relaxed">
      {value}
    </span>
  </div>
);

export const RAMSAmendDialog: React.FC<RAMSAmendDialogProps> = ({
  documentId,
  isOpen,
  onClose,
  onQuickEdit,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [documentData, setDocumentData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && documentId) {
      loadDocument();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        title: 'Could not load document',
        description: 'Failed to load document data',
        variant: 'destructive',
      });
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickEdit = async () => {
    if (!documentData) return;

    const meta = (documentData.ai_generation_metadata as Record<string, unknown>) || {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contacts: any = (meta as any).emergencyContacts || {};

    const ramsData: RAMSData = {
      projectName: documentData.project_name,
      location: documentData.location,
      date: documentData.date,
      assessor: documentData.assessor,
      activities: documentData.activities || [],
      risks: documentData.risks || [],
      contractor: documentData.contractor || '',
      supervisor: documentData.supervisor || '',
      requiredPPE: documentData.required_ppe || [],
      ppeDetails: documentData.ppe_details || [],
      siteManagerName: contacts.siteManagerName || documentData.site_manager_name || '',
      siteManagerPhone: contacts.siteManagerPhone || documentData.site_manager_phone || '',
      firstAiderName: contacts.firstAiderName || documentData.first_aider_name || '',
      firstAiderPhone: contacts.firstAiderPhone || documentData.first_aider_phone || '',
      safetyOfficerName: contacts.safetyOfficerName || documentData.safety_officer_name || '',
      safetyOfficerPhone: contacts.safetyOfficerPhone || documentData.safety_officer_phone || '',
      assemblyPoint: contacts.assemblyPoint || documentData.assembly_point || '',
    };

    const { data: methodRow } = await supabase
      .from('method_statements')
      .select('*')
      .eq('rams_document_id', documentData.id)
      .maybeSingle();

    const methodData: Partial<MethodStatementData> = {
      jobTitle: methodRow?.job_title || documentData.project_name,
      location: methodRow?.location || documentData.location,
      contractor: methodRow?.contractor || documentData.contractor || '',
      supervisor: methodRow?.supervisor || documentData.supervisor || '',
      workType: methodRow?.work_type || 'Electrical Installation',
      duration: methodRow?.duration || undefined,
      teamSize: methodRow?.team_size || undefined,
      description: methodRow?.description || undefined,
      overallRiskLevel: (methodRow?.overall_risk_level as MethodStatementData['overallRiskLevel']) || 'medium',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      steps: ((methodRow?.steps as any[]) || []) as MethodStatementData['steps'],
      toolsRequired: (methodRow?.tools_required as string[]) || [],
      materialsRequired: (methodRow?.materials_required as string[]) || [],
      practicalTips: (methodRow?.practical_tips as string[]) || [],
      commonMistakes: (methodRow?.common_mistakes as string[]) || [],
    };

    if (onQuickEdit) {
      onQuickEdit(ramsData, methodData);
    }
    onClose();
  };

  const handleRegenerateWithAI = () => {
    if (!documentData) return;

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
            assemblyPoint: documentData.assembly_point || '',
          },
        },
      },
    });
    onClose();
  };

  const createdAt =
    documentData?.created_at &&
    new Date(documentData.created_at).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[92vw] sm:w-auto sm:max-w-[480px] max-h-[85dvh] sm:max-h-[90dvh] overflow-y-auto overflow-x-hidden rounded-2xl border-white/[0.08] bg-[hsl(0_0%_8%)] p-0">
        <div className="p-6 space-y-6">
          <DialogHeader className="space-y-2 text-left">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
              Amend RAMS
            </div>
            <DialogTitle className="text-[22px] sm:text-[26px] font-semibold tracking-tight leading-[1.15] text-white">
              Update this document.
            </DialogTitle>
            <DialogDescription className="text-[13px] text-white/65 leading-relaxed">
              Edit risks and steps in place, or regenerate the whole document with new context.
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
            </div>
          ) : documentData ? (
            <div className="space-y-5">
              {/* Editorial info rows */}
              <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                <InfoRow label="Project" value={documentData.project_name} />
                <InfoRow label="Location" value={documentData.location || '—'} />
                {createdAt && <InfoRow label="Created" value={createdAt} />}
              </div>

              {/* Actions */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={handleQuickEdit}
                  className="w-full h-14 px-5 flex items-center justify-between gap-3 rounded-xl bg-elec-yellow text-black font-semibold touch-manipulation active:scale-[0.99] transition-transform"
                >
                  <div className="text-left">
                    <p className="text-[14px] font-semibold">Quick edit</p>
                    <p className="text-[11.5px] font-medium text-black/65">
                      Edit risks and steps directly
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={handleRegenerateWithAI}
                  className="w-full h-14 px-5 flex items-center justify-between gap-3 rounded-xl bg-white/[0.04] border border-white/[0.10] text-white touch-manipulation active:scale-[0.99] hover:border-elec-yellow/40 transition-colors"
                >
                  <div className="text-left">
                    <p className="text-[14px] font-semibold">Regenerate with AI</p>
                    <p className="text-[11.5px] font-medium text-white/55">
                      Rebuild from scratch with new info
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/55 shrink-0" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};
