import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Download, RotateCcw, Edit2, Save, X, Shield, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
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
    toast.success("Risk assessment changes saved");
  };

  const handleCancelRiskAssessment = () => {
    setEditableData((prev: any) => ({
      ...prev,
      hazards: originalData.current.hazards
    }));
    setIsEditingRiskAssessment(false);
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
      {/* Header Section with Gradient */}
      <Card className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border-blue-500/20">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground mb-1">Safety Documentation Results</h3>
              <p className="text-sm text-muted-foreground">Comprehensive risk assessment and safety procedures</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
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
                variant="ghost"
                onClick={onStartOver}
                className="touch-manipulation"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Start Over
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Risk Assessment
              </CardTitle>
              {isEditingRiskAssessment ? (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleSaveRiskAssessment}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancelRiskAssessment}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditingRiskAssessment(true)}
                >
                  <Edit2 className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {editableData.hazards.map((hazard: any, idx: number) => (
              <EnhancedHazardCard 
                key={idx} 
                hazard={hazard} 
                index={idx}
                onUpdate={handleUpdateHazard}
                onDelete={handleDeleteHazard}
              />
            ))}
            {isEditingRiskAssessment && (
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
        onUpdate={(updatedPPE) => {
          setEditableData((prev: any) => ({ ...prev, ppe: updatedPPE }));
        }}
      />

      {/* Emergency Procedures - Enhanced Section */}
      <EmergencyProceduresSection 
        procedures={editableData?.emergencyProcedures || []}
        onUpdate={handleUpdateProcedure}
        onDelete={handleDeleteProcedure}
        onMove={handleMoveProcedure}
        onAdd={handleAddProcedure}
      />

      {/* Notes */}
      {editableData?.notes && (
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground whitespace-pre-wrap">{editableData.notes}</p>
          </CardContent>
        </Card>
      )}

      {/* Generate PDF Button at Bottom */}
      <div className="pt-4 border-t">
        <Button 
          onClick={handleExportPDF}
          className="w-full h-12 text-base font-semibold"
          size="lg"
        >
          <Download className="h-5 w-5 mr-2" />
          Generate PDF
        </Button>
      </div>
    </div>
  );
};
