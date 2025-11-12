import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Save, Download, RefreshCw, AlertTriangle, Wrench, Shield, Clock } from 'lucide-react';
import type { MethodStatementData } from '@/types/method-statement';

interface MethodStatementReviewEditorProps {
  methodData: MethodStatementData;
  onSave: () => void;
  isSaving: boolean;
  lastSaved: Date | null;
  onStartOver: () => void;
}

export const MethodStatementReviewEditor: React.FC<MethodStatementReviewEditorProps> = ({
  methodData,
  onSave,
  isSaving,
  lastSaved,
  onStartOver
}) => {
  const getRiskLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleExportPDF = () => {
    // TODO: Implement PDF export
    console.log('Export PDF:', methodData);
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <Card className="p-4 bg-elec-card border-emerald-500/20">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-400" />
            <h2 className="text-lg font-semibold">Method Statement Generated</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onSave}
              disabled={isSaving}
              className="border-emerald-500/30 hover:bg-emerald-500/10"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPDF}
              className="border-emerald-500/30 hover:bg-emerald-500/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onStartOver}
              className="border-orange-500/30 hover:bg-orange-500/10"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              New Statement
            </Button>
          </div>
        </div>
        {lastSaved && (
          <p className="text-xs text-muted-foreground mt-2">
            Last saved: {lastSaved.toLocaleTimeString()}
          </p>
        )}
      </Card>

      {/* Overview Card */}
      <Card className="p-6 bg-elec-card border-emerald-500/20">
        <h3 className="text-xl font-semibold mb-4">{methodData.jobTitle}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Location</p>
            <p className="text-sm font-medium">{methodData.location || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Contractor</p>
            <p className="text-sm font-medium">{methodData.contractor || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Supervisor</p>
            <p className="text-sm font-medium">{methodData.supervisor || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Overall Risk Level</p>
            <Badge className={getRiskLevelColor(methodData.overallRiskLevel)}>
              {methodData.overallRiskLevel?.toUpperCase()}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Duration</p>
            <p className="text-sm font-medium flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {methodData.totalEstimatedTime || 'Not specified'}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Steps</p>
            <p className="text-sm font-medium">{methodData.steps?.length || 0} steps</p>
          </div>
        </div>
      </Card>

      {/* Installation Steps */}
      <Card className="p-6 bg-elec-card border-emerald-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="h-5 w-5 text-emerald-400" />
          <h3 className="text-lg font-semibold">Installation Steps</h3>
        </div>
        <div className="space-y-4">
          {methodData.steps?.map((step) => (
            <div key={step.id} className="p-4 bg-elec-dark/50 rounded-lg border border-emerald-500/10">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-emerald-400">{step.stepNumber}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-semibold mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                  
                  {step.safetyRequirements && step.safetyRequirements.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-orange-400 mb-1 flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        Safety Requirements
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                        {step.safetyRequirements.map((req, idx) => (
                          <li key={idx} className="list-disc">{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {step.equipmentNeeded && step.equipmentNeeded.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs font-semibold text-blue-400 mb-1">Equipment Needed</p>
                      <div className="flex flex-wrap gap-1">
                        {step.equipmentNeeded.map((eq, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {eq}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{step.estimatedDuration}</span>
                    </div>
                    <Badge className={getRiskLevelColor(step.riskLevel)} variant="outline">
                      {step.riskLevel} risk
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Hazards (if available) */}
      {methodData.riskAssessment?.hazards && methodData.riskAssessment.hazards.length > 0 && (
        <Card className="p-6 bg-elec-card border-orange-500/20">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-orange-400" />
            <h3 className="text-lg font-semibold">Identified Hazards</h3>
          </div>
          <div className="space-y-3">
            {methodData.riskAssessment.hazards.map((hazard, idx) => (
              <div key={idx} className="p-3 bg-orange-500/5 rounded-lg border border-orange-500/20">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium flex-1">{hazard.hazard}</p>
                  <Badge className={getRiskLevelColor(hazard.riskLevel)} variant="outline">
                    {hazard.riskLevel}
                  </Badge>
                </div>
                {hazard.linkedToStep > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Linked to Step {hazard.linkedToStep}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* PPE Requirements */}
      {methodData.ppeDetails && methodData.ppeDetails.length > 0 && (
        <Card className="p-6 bg-elec-card border-blue-500/20">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold">PPE Requirements</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {methodData.ppeDetails.map((ppe) => (
              <div key={ppe.itemNumber} className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
                <div className="flex items-start gap-2">
                  <span className="text-xs font-bold text-blue-400">#{ppe.itemNumber}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{ppe.ppeType}</p>
                    <p className="text-xs text-muted-foreground">{ppe.standard}</p>
                    {ppe.mandatory && (
                      <Badge variant="outline" className="text-xs mt-1 bg-red-500/10 text-red-400 border-red-500/30">
                        Mandatory
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
