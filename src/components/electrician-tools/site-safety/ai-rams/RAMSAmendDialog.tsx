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
        title: 'Error',
        description: 'Failed to load document data',
        variant: 'destructive',
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
      assemblyPoint: documentData.assembly_point || '',
    };

    const methodData: Partial<MethodStatementData> = {
      jobTitle: documentData.project_name,
      location: documentData.location,
      contractor: documentData.contractor || '',
      supervisor: documentData.supervisor || '',
      steps: [],
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
            assemblyPoint: documentData.assembly_point || '',
          },
        },
      },
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[92vw] sm:w-auto sm:max-w-[480px] max-h-[85dvh] sm:max-h-[90dvh] overflow-y-auto overflow-x-hidden rounded-2xl border-white/[0.08] bg-[hsl(240,5.9%,12%)] p-0">
        <div className="p-5 sm:p-6 space-y-5">
          <DialogHeader className="space-y-1">
            <DialogTitle className="flex items-center gap-2.5 text-base sm:text-lg">
              <div className="p-2 rounded-lg bg-elec-yellow/10">
                <Edit3 className="h-4 w-4 text-elec-yellow" />
              </div>
              Amend RAMS
            </DialogTitle>
            <DialogDescription className="text-sm text-white">
              Choose how to update this document
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
            </div>
          ) : documentData ? (
            <div className="space-y-4">
              {/* Document Info */}
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] divide-y divide-white/[0.06]">
                <div className="flex items-center gap-3 p-3.5">
                  <div className="w-9 h-9 rounded-lg bg-elec-yellow/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-elec-yellow" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-white mb-0.5">Project</p>
                    <p className="text-sm font-semibold text-white break-words leading-tight">
                      {documentData.project_name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-white mb-0.5">Location</p>
                    <p className="text-sm text-white break-words leading-tight">
                      {documentData.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3.5">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-4 w-4 text-purple-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-white mb-0.5">Created</p>
                    <p className="text-sm text-white">
                      {new Date(documentData.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2.5">
                <button
                  onClick={handleQuickEdit}
                  className="w-full h-14 px-4 flex items-center gap-3 rounded-xl bg-elec-yellow text-black font-semibold touch-manipulation active:opacity-90 active:scale-[0.98] transition-all"
                >
                  <Edit3 className="h-5 w-5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-bold">Quick Edit</p>
                    <p className="text-[11px] font-medium text-black/60">
                      Edit risks and steps directly
                    </p>
                  </div>
                </button>

                <button
                  onClick={handleRegenerateWithAI}
                  className="w-full h-14 px-4 flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-semibold touch-manipulation active:bg-white/[0.06] active:scale-[0.98] transition-all"
                >
                  <Sparkles className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-bold">Regenerate with AI</p>
                    <p className="text-[11px] font-medium text-white">
                      Rebuild from scratch with new info
                    </p>
                  </div>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};
