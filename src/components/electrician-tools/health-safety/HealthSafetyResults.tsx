/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react';
import { saveOrSharePdf } from '@/utils/save-or-share-pdf';
import { Button } from '@/components/ui/button';
import { Copy, Download, RotateCcw, Edit2, Save, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { openOrDownloadPdf } from '@/utils/pdf-download';
import { copyToClipboard } from '@/utils/clipboard';
import { RiskSummaryStats } from './results/RiskSummaryStats';
import { EnhancedHazardCard } from './results/EnhancedHazardCard';
import { PPERequirementsGrid } from './results/PPERequirementsGrid';
import { EmergencyProceduresSection } from './results/EmergencyProceduresSection';

interface HealthSafetyResultsProps {
  data: any;
  onStartOver: () => void;
}

export const HealthSafetyResults = ({ data, onStartOver }: HealthSafetyResultsProps) => {
  const [editableData, setEditableData] = useState(data);
  const originalData = useRef(data);
  const [isEditingRiskAssessment, setIsEditingRiskAssessment] = useState(false);

  const handleSaveRiskAssessment = () => {
    setIsEditingRiskAssessment(false);
    toast.success('Risk assessment changes saved');
  };

  const handleCancelRiskAssessment = () => {
    setEditableData((prev: any) => ({
      ...prev,
      hazards: originalData.current.hazards,
    }));
    setIsEditingRiskAssessment(false);
    toast.info('Changes cancelled');
  };

  const handleUpdateHazard = (index: number, field: string, value: any) => {
    setEditableData((prev: any) => {
      const newHazards = [...prev.hazards];
      newHazards[index] = { ...newHazards[index], [field]: value };
      return { ...prev, hazards: newHazards };
    });
  };

  const handleDeleteHazard = (index: number) => {
    setEditableData((prev: any) => ({
      ...prev,
      hazards: prev.hazards.filter((_: any, i: number) => i !== index),
    }));
  };

  const handleAddHazard = () => {
    setEditableData((prev: any) => ({
      ...prev,
      hazards: [
        ...prev.hazards,
        {
          hazard: 'New Hazard',
          likelihood: 3,
          severity: 3,
          riskScore: 9,
          controlMeasure: '',
          regulation: '',
        },
      ],
    }));
  };

  const handleUpdatePPE = (index: number, field: string, value: any) => {
    setEditableData((prev: any) => {
      const newPPE = [...prev.ppe];
      newPPE[index] = { ...newPPE[index], [field]: value };
      return { ...prev, ppe: newPPE };
    });
  };

  const handleDeletePPE = (index: number) => {
    setEditableData((prev: any) => ({
      ...prev,
      ppe: prev.ppe.filter((_: any, i: number) => i !== index),
    }));
  };

  const handleAddPPE = () => {
    setEditableData((prev: any) => ({
      ...prev,
      ppe: [
        ...prev.ppe,
        {
          ppeType: 'New PPE Item',
          standard: 'BS EN',
          purpose: '',
          mandatory: false,
        },
      ],
    }));
  };

  const handleUpdateProcedure = (index: number, value: string) => {
    setEditableData((prev: any) => {
      const newProcedures = [...prev.emergencyProcedures];
      newProcedures[index] = value;
      return { ...prev, emergencyProcedures: newProcedures };
    });
  };

  const handleDeleteProcedure = (index: number) => {
    setEditableData((prev: any) => ({
      ...prev,
      emergencyProcedures: prev.emergencyProcedures.filter((_: any, i: number) => i !== index),
    }));
  };

  const handleMoveProcedure = (index: number, direction: 'up' | 'down') => {
    setEditableData((prev: any) => {
      const newProcedures = [...prev.emergencyProcedures];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newProcedures.length) return prev;
      [newProcedures[index], newProcedures[targetIndex]] = [
        newProcedures[targetIndex],
        newProcedures[index],
      ];
      return { ...prev, emergencyProcedures: newProcedures };
    });
  };

  const handleAddProcedure = () => {
    setEditableData((prev: any) => ({
      ...prev,
      emergencyProcedures: [...prev.emergencyProcedures, 'New emergency procedure'],
    }));
  };

  const handleUpdateNotes = (value: string) => {
    setEditableData((prev: any) => ({ ...prev, notes: value }));
  };

  const handleCopy = () => {
    copyToClipboard(JSON.stringify(editableData, null, 2));
    toast.success('Copied to clipboard');
  };

  const handleExportPDF = async () => {
    const loadingToast = toast.loading('Generating professional PDF...');

    try {
      const { supabase } = await import('@/integrations/supabase/client');
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Try PDF Monkey first
      const { data: pdfResult, error } = await supabase.functions.invoke(
        'generate-health-safety-pdf',
        {
          body: {
            healthSafetyData: editableData,
            userId: user?.id,
          },
        }
      );

      if (error) throw error;

      // Check if we should use fallback
      if (pdfResult?.useFallback) {
        console.log('Using jsPDF fallback:', pdfResult.message);
        toast.dismiss(loadingToast);

        // Fallback to jsPDF
        const { generateRiskAssessmentPDF } = require('@/utils/pdf-generators/risk-assessment-pdf');

        const pdfData = {
          projectName: editableData.projectName || 'Untitled Project',
          location: editableData.location || 'Not specified',
          assessor: 'AI Health & Safety Advisor',
          date: new Date().toISOString().split('T')[0],
          projectType: editableData.workType || 'general',
          hazards: editableData.hazards || [],
          requiredPPE: editableData.ppe?.map((p: any) => p.ppeType) || [],
          emergencyProcedures: editableData.emergencyProcedures || [],
          notes: editableData.notes,
        };

        const pdf = generateRiskAssessmentPDF(pdfData);
        await saveOrSharePdf(
          pdf,
          `Risk-Assessment-${editableData.projectName || 'Document'}-${new Date().toISOString().split('T')[0]}.pdf`
        );

        toast.success('PDF exported successfully (basic format)');
        return;
      }

      // Success with PDF Monkey
      if (pdfResult?.success && pdfResult?.downloadUrl) {
        toast.dismiss(loadingToast);

        await openOrDownloadPdf(
          pdfResult.downloadUrl,
          `Health-Safety-${editableData.projectName || 'Document'}-${new Date().toISOString().split('T')[0]}.pdf`
        );

        toast.success('Professional PDF exported successfully');
      } else {
        throw new Error('PDF generation failed');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error('PDF generation error:', error);
      toast.error('Failed to export PDF');
    }
  };

  const toggleEdit = () => {
    if (isEditingRiskAssessment) {
      handleSaveRiskAssessment();
    } else {
      setIsEditingRiskAssessment(true);
    }
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
            <Shield className="h-5 w-5 text-orange-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Safety Assessment</h2>
            <p className="text-xs text-white">Comprehensive risk assessment</p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className="h-9 px-3 rounded-lg bg-white/[0.06] text-white ring-1 ring-white/[0.08] text-xs font-medium flex items-center gap-1.5 touch-manipulation active:scale-[0.97]"
          >
            <Copy className="h-3.5 w-3.5" /> Copy
          </button>
          <button
            onClick={onStartOver}
            className="h-9 px-3 rounded-lg bg-white/[0.06] text-white ring-1 ring-white/[0.08] text-xs font-medium flex items-center gap-1.5 touch-manipulation active:scale-[0.97]"
          >
            <RotateCcw className="h-3.5 w-3.5" /> New
          </button>
        </div>
      </div>

      {/* Summary Statistics */}
      <RiskSummaryStats
        hazards={editableData?.hazards || []}
        ppeItems={editableData?.ppe || []}
        emergencyProcedures={editableData?.emergencyProcedures || []}
      />

      {/* Risk Assessment */}
      {editableData?.hazards && editableData.hazards.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
              Risk Assessment
            </h2>
            <button
              onClick={toggleEdit}
              className="h-8 px-3 rounded-lg bg-white/[0.06] text-white ring-1 ring-white/[0.08] text-[11px] font-medium flex items-center gap-1.5 touch-manipulation"
            >
              {isEditingRiskAssessment ? (
                <>
                  <Save className="h-3 w-3" /> Save
                </>
              ) : (
                <>
                  <Edit2 className="h-3 w-3" /> Edit
                </>
              )}
            </button>
          </div>
          <div className="space-y-2">
            {editableData.hazards.map((hazard: any, idx: number) => (
              <EnhancedHazardCard
                key={idx}
                hazard={hazard}
                index={idx}
                onUpdate={handleUpdateHazard}
                onDelete={handleDeleteHazard}
              />
            ))}
          </div>
          {isEditingRiskAssessment && (
            <Button onClick={handleAddHazard} variant="outline" className="w-full">
              Add Hazard
            </Button>
          )}
        </section>
      )}

      {/* PPE Requirements */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          PPE Requirements
        </h2>
        <PPERequirementsGrid
          ppeItems={editableData?.ppe || []}
          onUpdate={(updatedPPE) => {
            setEditableData((prev: any) => ({ ...prev, ppe: updatedPPE }));
          }}
        />
      </section>

      {/* Emergency Procedures */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Emergency Procedures
        </h2>
        <EmergencyProceduresSection
          procedures={editableData?.emergencyProcedures || []}
          onUpdate={handleUpdateProcedure}
          onDelete={handleDeleteProcedure}
          onMove={handleMoveProcedure}
          onAdd={handleAddProcedure}
        />
      </section>

      {/* Notes */}
      {editableData?.notes && (
        <section className="space-y-3">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
            Additional Notes
          </h2>
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-4">
            <p className="text-sm text-white whitespace-pre-wrap">{editableData.notes}</p>
          </div>
        </section>
      )}

      {/* Download PDF Button */}
      <button
        onClick={handleExportPDF}
        className="w-full h-14 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-base flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] shadow-lg shadow-orange-500/20"
      >
        <Download className="h-5 w-5" /> Download PDF
      </button>
    </div>
  );
};
