import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  onClose
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
      const { data, error } = await supabase
        .from('rams_documents')
        .select('*')
        .eq('id', documentId)
        .single();

      if (error) throw error;

      const loadedRamsData: RAMSData = {
        projectName: data.project_name,
        location: data.location,
        date: data.date,
        assessor: data.assessor,
        activities: data.activities as string[] || [],
        risks: data.risks as any[] || [],
        contractor: data.contractor || '',
        supervisor: data.supervisor || ''
      };

      const loadedMethodData: Partial<MethodStatementData> = {
        jobTitle: data.project_name,
        location: data.location,
        contractor: data.contractor || '',
        supervisor: data.supervisor || '',
        steps: []
      };

      setRamsData(loadedRamsData);
      setMethodData(loadedMethodData);
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

  const handleSave = async () => {
    if (!ramsData || !methodData) return;

    setIsSaving(true);
    try {
      const result = await updateRAMSDocument(documentId, ramsData, methodData);

      if (result.success) {
        toast({
          title: 'Document Updated',
          description: 'Your RAMS document has been updated successfully',
          variant: 'success'
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
        variant: 'destructive'
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
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Quick Edit RAMS Document</span>
            <Button
              onClick={handleSave}
              disabled={isSaving}
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
                  Save Changes
                </>
              )}
            </Button>
          </DialogTitle>
        </DialogHeader>

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
      </DialogContent>
    </Dialog>
  );
};
