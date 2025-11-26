import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Download, RotateCcw, Edit, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { SendToAgentDropdown } from '@/components/install-planner-v2/SendToAgentDropdown';
import { RiskSummaryStats } from './results/RiskSummaryStats';
import { EnhancedHazardCard } from './results/EnhancedHazardCard';
import { PPERequirementsGrid } from './results/PPERequirementsGrid';
import { EmergencyProceduresSection } from './results/EmergencyProceduresSection';

interface HealthSafetyResultsProps {
  data: any;
  onStartOver: () => void;
}

export const HealthSafetyResults = ({ data, onStartOver }: HealthSafetyResultsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState(data);
  const originalData = useRef(data);

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Changes saved");
  };

  const handleCancel = () => {
    setEditableData(originalData.current);
    setIsEditing(false);
    toast.info("Changes cancelled");
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
      hazards: prev.hazards.filter((_: any, i: number) => i !== index)
    }));
  };

  const handleAddHazard = () => {
    setEditableData((prev: any) => ({
      ...prev,
      hazards: [...prev.hazards, {
        hazard: 'New Hazard',
        likelihood: 3,
        severity: 3,
        riskScore: 9,
        controlMeasure: '',
        regulation: ''
      }]
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
      ppe: prev.ppe.filter((_: any, i: number) => i !== index)
    }));
  };

  const handleAddPPE = () => {
    setEditableData((prev: any) => ({
      ...prev,
      ppe: [...prev.ppe, {
        ppeType: 'New PPE Item',
        standard: 'BS EN',
        purpose: '',
        mandatory: false
      }]
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
      emergencyProcedures: prev.emergencyProcedures.filter((_: any, i: number) => i !== index)
    }));
  };

  const handleMoveProcedure = (index: number, direction: 'up' | 'down') => {
    setEditableData((prev: any) => {
      const newProcedures = [...prev.emergencyProcedures];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newProcedures.length) return prev;
      [newProcedures[index], newProcedures[targetIndex]] = [newProcedures[targetIndex], newProcedures[index]];
      return { ...prev, emergencyProcedures: newProcedures };
    });
  };

  const handleAddProcedure = () => {
    setEditableData((prev: any) => ({
      ...prev,
      emergencyProcedures: [...prev.emergencyProcedures, 'New emergency procedure']
    }));
  };

  const handleUpdateNotes = (value: string) => {
    setEditableData((prev: any) => ({ ...prev, notes: value }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(editableData, null, 2));
    toast.success("Copied to clipboard");
  };

  const handleExportPDF = async () => {
    const loadingToast = toast.loading("Generating professional PDF...");
    
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      const { data: { user } } = await supabase.auth.getUser();

      // Try PDF Monkey first
      const { data: pdfResult, error } = await supabase.functions.invoke('generate-health-safety-pdf', {
        body: {
          healthSafetyData: editableData,
          userId: user?.id
        }
      });

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
          notes: editableData.notes
        };
        
        const pdf = generateRiskAssessmentPDF(pdfData);
        pdf.save(`Risk-Assessment-${editableData.projectName || 'Document'}-${new Date().toISOString().split('T')[0]}.pdf`);
        
        toast.success("PDF exported successfully (basic format)");
        return;
      }

      // Success with PDF Monkey
      if (pdfResult?.success && pdfResult?.downloadUrl) {
        toast.dismiss(loadingToast);
        
        // Trigger download
        const link = document.createElement('a');
        link.href = pdfResult.downloadUrl;
        link.download = `Health-Safety-${editableData.projectName || 'Document'}-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast.success("Professional PDF exported successfully");
      } else {
        throw new Error('PDF generation failed');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error('PDF generation error:', error);
      toast.error("Failed to export PDF");
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h3 className="text-xl font-semibold">Safety Documentation Results</h3>
        <div className="flex items-center gap-2 flex-wrap">
          {!isEditing ? (
            <>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="touch-manipulation"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleCopy}
                className="touch-manipulation"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleExportPDF}
                className="touch-manipulation"
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <SendToAgentDropdown 
                currentAgent="health-safety" 
                currentOutput={editableData} 
              />
              <Button 
                size="sm" 
                variant="ghost"
                onClick={onStartOver}
                className="touch-manipulation"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Start Over
              </Button>
            </>
          ) : (
            <>
              <Button 
                size="sm" 
                onClick={handleSave}
                className="touch-manipulation"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleCancel}
                className="touch-manipulation"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Summary Statistics */}
      <RiskSummaryStats
        hazards={editableData?.hazards || []}
        ppeItems={editableData?.ppe || []}
        emergencyProcedures={editableData?.emergencyProcedures || []}
      />

      {/* Risk Assessment - Enhanced Cards */}
      {editableData?.hazards && editableData.hazards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {editableData.hazards.map((hazard: any, idx: number) => (
              <EnhancedHazardCard 
                key={idx} 
                hazard={hazard} 
                index={idx}
                isEditing={isEditing}
                onUpdate={handleUpdateHazard}
                onDelete={handleDeleteHazard}
              />
            ))}
            {isEditing && (
              <Button 
                onClick={handleAddHazard}
                variant="outline"
                className="w-full"
              >
                Add Hazard
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* PPE Requirements - Enhanced Grid */}
      <PPERequirementsGrid 
        ppeItems={editableData?.ppe || []}
        isEditing={isEditing}
        onUpdate={handleUpdatePPE}
        onDelete={handleDeletePPE}
        onAdd={handleAddPPE}
      />

      {/* Emergency Procedures - Enhanced Section */}
      <EmergencyProceduresSection 
        procedures={editableData?.emergencyProcedures || []}
        isEditing={isEditing}
        onUpdate={handleUpdateProcedure}
        onDelete={handleDeleteProcedure}
        onMove={handleMoveProcedure}
        onAdd={handleAddProcedure}
      />

      {/* Notes */}
      {(editableData?.notes || isEditing) && (
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea
                value={editableData.notes || ''}
                onChange={(e) => handleUpdateNotes(e.target.value)}
                placeholder="Add additional notes..."
                className="min-h-[100px]"
              />
            ) : (
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{editableData.notes}</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
