import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Plus, 
  X, 
  Download, 
  Eye, 
  AlertTriangle, 
  Building, 
  Shield,
  Edit3,
  Loader2,
  Grid3x3
} from 'lucide-react';
import { useRAMS } from './rams/RAMSContext';
import { generateRAMSPDF } from '@/utils/rams-pdf';
import { RAMSPDFPreview } from './RAMSPDFPreview';
import { SignaturePad } from './common/SignaturePad';
import { HazardSelect } from './common/HazardSelect';
import { RiskSelect } from './common/RiskSelect';
import { RiskMatrix } from './common/RiskMatrix';
import { toast } from '@/hooks/use-toast';

const RAMSGenerator: React.FC = () => {
  const {
    ramsData,
    reportOptions,
    signOff,
    updateProjectInfo,
    addActivity,
    removeActivity,
    addRisk,
    updateRisk,
    removeRisk,
    setBranding,
    setSignatures,
    validate,
    reset
  } = useRAMS();

  const [showPreview, setShowPreview] = useState(false);
  const [newActivity, setNewActivity] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [newRisk, setNewRisk] = useState({
    hazard: '',
    risk: '',
    likelihood: 1,
    severity: 1,
    controls: ''
  });
  const [showAddRisk, setShowAddRisk] = useState(false);
  const [editingRisk, setEditingRisk] = useState<string | null>(null);
  const [editRiskData, setEditRiskData] = useState({
    hazard: '',
    risk: '',
    likelihood: 1,
    severity: 1,
    controls: ''
  });
  const [selectedHazard, setSelectedHazard] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('');

  const validation = validate();

  const handleAddActivity = () => {
    console.log('handleAddActivity called', { newActivity, ramsData });
    if (newActivity.trim()) {
      addActivity(newActivity.trim());
      setNewActivity('');
      toast({
        title: 'Activity Added',
        description: 'Work activity has been added to the RAMS.',
        variant: 'success'
      });
    } else {
      console.log('Activity is empty, not adding');
    }
  };

  const handleAddRisk = () => {
    if (newRisk.hazard && newRisk.risk) {
      const riskRating = newRisk.likelihood * newRisk.severity;
      const residualRisk = Math.max(1, Math.floor(riskRating / 2));
      
      addRisk({
        ...newRisk,
        riskRating,
        residualRisk
      });
      
      setNewRisk({
        hazard: '',
        risk: '',
        likelihood: 1,
        severity: 1,
        controls: ''
      });
      setSelectedHazard('');
      setSelectedRisk('');
      setShowAddRisk(false);
      
      toast({
        title: 'Risk Added',
        description: 'Risk assessment has been added to the RAMS.',
        variant: 'success'
      });
    }
  };

  const handleHazardChange = (hazard: string) => {
    setSelectedHazard(hazard);
    setNewRisk(prev => ({ ...prev, hazard }));
    // Reset risk when hazard changes
    setSelectedRisk('');
    setNewRisk(prev => ({ ...prev, risk: '' }));
  };

  const handleRiskChange = (risk: string) => {
    setSelectedRisk(risk);
    setNewRisk(prev => ({ ...prev, risk }));
  };

  const handleControlMeasuresChange = (measures: string[]) => {
    setNewRisk(prev => ({ ...prev, controls: measures.join('\n• ') }));
  };

  const handleEditRisk = (risk: any) => {
    setEditingRisk(risk.id);
    setEditRiskData({
      hazard: risk.hazard,
      risk: risk.risk,
      likelihood: risk.likelihood,
      severity: risk.severity,
      controls: risk.controls || ''
    });
  };

  const handleSaveEdit = () => {
    if (editingRisk && editRiskData.hazard && editRiskData.risk) {
      const riskRating = editRiskData.likelihood * editRiskData.severity;
      const residualRisk = Math.max(1, Math.floor(riskRating / 2));
      
      updateRisk(editingRisk, {
        ...editRiskData,
        riskRating,
        residualRisk
      });
      
      setEditingRisk(null);
      setEditRiskData({
        hazard: '',
        risk: '',
        likelihood: 1,
        severity: 1,
        controls: ''
      });
      
      toast({
        title: 'Risk Updated',
        description: 'Risk assessment has been updated successfully.',
        variant: 'success'
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingRisk(null);
    setEditRiskData({
      hazard: '',
      risk: '',
      likelihood: 1,
      severity: 1,
      controls: ''
    });
  };

  const handleGeneratePDF = async () => {
    // Enhanced validation with specific guidance
    if (!validation.isValid) {
      toast({
        title: 'Validation Error',
        description: validation.errors.join('. ') + '. Please complete these sections first.',
        variant: 'destructive'
      });
      return;
    }

    // Ensure we have at least one risk
    if (!ramsData.risks || ramsData.risks.length === 0) {
      toast({
        title: 'No Risks Identified',
        description: 'Please add at least one risk assessment before generating the PDF.',
        variant: 'destructive'
      });
      return;
    }

    setIsGenerating(true);
    try {
      await generateRAMSPDF(ramsData, { 
        ...reportOptions, 
        signOff,
        includeSignatures: true 
      });
      toast({
        title: 'PDF Generated Successfully',
        description: 'Professional RAMS document has been downloaded.',
        variant: 'success'
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: 'Generation Failed',
        description: error instanceof Error ? error.message : 'Failed to generate PDF. Please check your data and try again.',
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getRiskLevelColor = (rating: number) => {
    if (rating <= 4) return 'bg-green-500';
    if (rating <= 9) return 'bg-yellow-500';
    if (rating <= 16) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getRiskLevelText = (rating: number) => {
    if (rating <= 4) return 'Low';
    if (rating <= 9) return 'Medium';
    if (rating <= 16) return 'High';
    return 'Very High';
  };

  const riskStats = {
    total: ramsData.risks.length,
    low: ramsData.risks.filter(r => r.riskRating <= 4).length,
    medium: ramsData.risks.filter(r => r.riskRating > 4 && r.riskRating <= 9).length,
    high: ramsData.risks.filter(r => r.riskRating > 9 && r.riskRating <= 16).length,
    veryHigh: ramsData.risks.filter(r => r.riskRating > 16).length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-elec-yellow/20 bg-elec-gray/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Risk Assessment
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Create comprehensive Risk Assessment & Method Statement documents for safe electrical work
          </p>
        </CardHeader>
      </Card>

      {/* Validation Alert */}
      {!validation.isValid && (
        <Alert className="border-yellow-500/50 bg-yellow-500/10">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Incomplete RAMS:</strong> {validation.errors.join(', ')}
          </AlertDescription>
        </Alert>
      )}

      {/* Project Information */}
      <Card className="border-elec-yellow/20 bg-elec-gray/60">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Building className="h-5 w-5" />
            Project Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="projectName" className="text-white">Project Name *</Label>
              <Input
                id="projectName"
                value={ramsData.projectName}
                onChange={(e) => updateProjectInfo({ projectName: e.target.value })}
                placeholder="Enter project name"
                className="mt-1 bg-elec-dark/50 border-elec-yellow/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="location" className="text-white">Location *</Label>
              <Input
                id="location"
                value={ramsData.location}
                onChange={(e) => updateProjectInfo({ location: e.target.value })}
                placeholder="Enter project location"
                className="mt-1 bg-elec-dark/50 border-elec-yellow/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="assessor" className="text-white">Assessor *</Label>
              <Input
                id="assessor"
                value={ramsData.assessor}
                onChange={(e) => updateProjectInfo({ assessor: e.target.value })}
                placeholder="Enter assessor name"
                className="mt-1 bg-elec-dark/50 border-elec-yellow/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="date" className="text-white">Assessment Date *</Label>
              <Input
                id="date"
                type="date"
                value={ramsData.date}
                onChange={(e) => updateProjectInfo({ date: e.target.value })}
                className="mt-1 bg-elec-dark/50 border-elec-yellow/20 text-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Activities */}
      <Card className="border-elec-yellow/20 bg-elec-gray/60">
        <CardHeader>
          <CardTitle className="text-white">Work Activities ({ramsData.activities.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              placeholder="Enter work activity"
              className="bg-elec-dark/50 border-elec-yellow/20 text-white flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleAddActivity()}
            />
            <Button
              onClick={handleAddActivity}
              className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 sm:px-4"
            >
              <Plus className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Add</span>
            </Button>
          </div>
          
          {ramsData.activities.length > 0 && (
            <div className="space-y-2">
              {ramsData.activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-elec-dark/30 rounded-lg">
                  <span className="text-white text-sm leading-relaxed flex-1 break-words">
                    {index + 1}. {activity}
                  </span>
                  <Button
                    onClick={() => removeActivity(index)}
                    size="sm"
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Risk Assessment Summary */}
      <Card className="border-elec-yellow/20 bg-elec-gray/60">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Risk Assessment Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mb-4">
            <Card className="border-blue-500/30 bg-elec-gray/50">
              <CardContent className="p-2 sm:p-3 text-center">
                <div className="text-base sm:text-lg font-bold text-blue-400">{riskStats.total}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </CardContent>
            </Card>
            <Card className="border-green-500/30 bg-elec-gray/50">
              <CardContent className="p-2 sm:p-3 text-center">
                <div className="text-base sm:text-lg font-bold text-green-400">{riskStats.low}</div>
                <div className="text-xs text-muted-foreground">Low</div>
              </CardContent>
            </Card>
            <Card className="border-yellow-500/30 bg-elec-gray/50">
              <CardContent className="p-2 sm:p-3 text-center">
                <div className="text-base sm:text-lg font-bold text-yellow-400">{riskStats.medium}</div>
                <div className="text-xs text-muted-foreground">Medium</div>
              </CardContent>
            </Card>
            <Card className="border-orange-500/30 bg-elec-gray/50">
              <CardContent className="p-2 sm:p-3 text-center">
                <div className="text-base sm:text-lg font-bold text-orange-400">{riskStats.high}</div>
                <div className="text-xs text-muted-foreground">High</div>
              </CardContent>
            </Card>
            <Card className="border-red-500/30 bg-elec-gray/50 col-span-2 sm:col-span-1">
              <CardContent className="p-2 sm:p-3 text-center">
                <div className="text-base sm:text-lg font-bold text-red-400">{riskStats.veryHigh}</div>
                <div className="text-xs text-muted-foreground">Very High</div>
              </CardContent>
            </Card>
          </div>

          {/* Risk List */}
            {/* Risk Matrix */}
            <RiskMatrix className="mb-4" />

            {ramsData.risks.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-white">Identified Risks ({ramsData.risks.length})</h4>
              {ramsData.risks.map((risk) => (
                <Card key={risk.id} className="border-elec-yellow/30 bg-elec-dark/20">
                  <CardContent className="p-3 sm:p-4">
                    {editingRisk === risk.id ? (
                      // Edit Mode
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-medium text-white">Edit Risk Assessment</h5>
                          <div className="flex gap-2">
                            <Button
                              onClick={handleSaveEdit}
                              size="sm"
                              className="bg-green-600 text-white hover:bg-green-700"
                              disabled={!editRiskData.hazard || !editRiskData.risk}
                            >
                              Save
                            </Button>
                            <Button
                              onClick={handleCancelEdit}
                              size="sm"
                              variant="outline"
                              className="border-gray-500/30 text-gray-400 hover:bg-gray-500/10"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <Label className="text-white text-sm">Hazard</Label>
                            <Input
                              value={editRiskData.hazard}
                              onChange={(e) => setEditRiskData(prev => ({ ...prev, hazard: e.target.value }))}
                              className="mt-1 bg-elec-dark/50 border-elec-yellow/20 text-white"
                            />
                          </div>
                          
                          <div>
                            <Label className="text-white text-sm">Risk/Consequence</Label>
                            <Input
                              value={editRiskData.risk}
                              onChange={(e) => setEditRiskData(prev => ({ ...prev, risk: e.target.value }))}
                              className="mt-1 bg-elec-dark/50 border-elec-yellow/20 text-white"
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <Label className="text-white text-sm">Likelihood (1-5)</Label>
                              <Select
                                value={editRiskData.likelihood.toString()}
                                onValueChange={(value) => setEditRiskData(prev => ({ ...prev, likelihood: parseInt(value) }))}
                              >
                                <SelectTrigger className="mt-1 bg-elec-dark/50 border-elec-yellow/20">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1 - Very Unlikely</SelectItem>
                                  <SelectItem value="2">2 - Unlikely</SelectItem>
                                  <SelectItem value="3">3 - Possible</SelectItem>
                                  <SelectItem value="4">4 - Likely</SelectItem>
                                  <SelectItem value="5">5 - Very Likely</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label className="text-white text-sm">Severity (1-5)</Label>
                              <Select
                                value={editRiskData.severity.toString()}
                                onValueChange={(value) => setEditRiskData(prev => ({ ...prev, severity: parseInt(value) }))}
                              >
                                <SelectTrigger className="mt-1 bg-elec-dark/50 border-elec-yellow/20">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">1 - Negligible</SelectItem>
                                  <SelectItem value="2">2 - Minor</SelectItem>
                                  <SelectItem value="3">3 - Moderate</SelectItem>
                                  <SelectItem value="4">4 - Major</SelectItem>
                                  <SelectItem value="5">5 - Catastrophic</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-white text-sm">Control Measures</Label>
                            <Textarea
                              value={editRiskData.controls}
                              onChange={(e) => setEditRiskData(prev => ({ ...prev, controls: e.target.value }))}
                              className="mt-1 bg-elec-dark/50 border-elec-yellow/20 text-white"
                              rows={2}
                            />
                          </div>
                          
                          {editRiskData.likelihood > 0 && editRiskData.severity > 0 && (
                            <div className="p-3 bg-elec-gray/30 rounded-lg">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Risk Level:</span>
                                <Badge className={`${getRiskLevelColor(editRiskData.likelihood * editRiskData.severity)} text-white`}>
                                  {getRiskLevelText(editRiskData.likelihood * editRiskData.severity)} ({editRiskData.likelihood * editRiskData.severity})
                                </Badge>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="flex-1 space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge className={`${getRiskLevelColor(risk.riskRating)} text-white text-xs`}>
                                {getRiskLevelText(risk.riskRating)} ({risk.riskRating})
                              </Badge>
                            </div>
                            <div>
                              <h5 className="font-medium text-white text-sm sm:text-base break-words leading-tight">
                                {risk.hazard}
                              </h5>
                              <p className="text-xs sm:text-sm text-muted-foreground break-words leading-relaxed mt-1">
                                {risk.risk}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                            <Button
                              onClick={() => handleEditRisk(risk)}
                              size="sm"
                              variant="outline"
                              className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                            >
                              <Edit3 className="h-4 w-4 sm:mr-1" />
                              <span className="hidden sm:inline">Edit</span>
                            </Button>
                            <Button
                              onClick={() => removeRisk(risk.id)}
                              size="sm"
                              variant="outline"
                              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                            >
                              <X className="h-4 w-4 sm:mr-1" />
                              <span className="hidden sm:inline">Remove</span>
                            </Button>
                          </div>
                        </div>
                        
                        <div className="text-xs text-muted-foreground bg-elec-dark/30 p-2 rounded">
                          <div className="flex flex-wrap gap-4">
                            <span>Likelihood: {risk.likelihood}/5</span>
                            <span>Severity: {risk.severity}/5</span>
                            <span>Score: {risk.riskRating}</span>
                          </div>
                          {risk.controls && (
                            <div className="mt-2 pt-2 border-t border-elec-yellow/20">
                              <span className="font-medium">Controls:</span>
                              <p className="break-words leading-relaxed">{risk.controls}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Optional Sections */}
      <Accordion type="single" collapsible className="space-y-4">
        {/* Branding Section */}
        <AccordionItem value="branding" className="border-elec-yellow/20 bg-elec-gray/60 rounded-lg px-4">
          <AccordionTrigger className="text-white hover:text-elec-yellow">
            Company Branding (Optional)
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
              <div>
                <Label className="text-white">Company Name</Label>
                <Input
                  value={reportOptions.companyName || ''}
                  onChange={(e) => setBranding({ companyName: e.target.value })}
                  placeholder="Enter company name"
                  className="mt-1 bg-elec-dark/50 border-elec-yellow/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white">Logo URL</Label>
                <Input
                  value={reportOptions.logoUrl || ''}
                  onChange={(e) => setBranding({ logoUrl: e.target.value })}
                  placeholder="Enter logo URL (optional)"
                  className="mt-1 bg-elec-dark/50 border-elec-yellow/20 text-white"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Electronic Signatures */}
        <AccordionItem value="signatures" className="border-elec-yellow/20 bg-elec-gray/60 rounded-lg px-4">
          <AccordionTrigger className="text-white hover:text-elec-yellow">
            Electronic Signatures (Optional)
          </AccordionTrigger>
          <AccordionContent className="space-y-6 pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <SignaturePad
                label="Prepared By"
                name={signOff.preparedBy?.name || ''}
                date={signOff.preparedBy?.date || ''}
                signatureDataUrl={signOff.preparedBy?.signatureDataUrl}
                onNameChange={(name) => setSignatures({ 
                  preparedBy: { ...signOff.preparedBy, name } 
                })}
                onDateChange={(date) => setSignatures({ 
                  preparedBy: { ...signOff.preparedBy, date } 
                })}
                onSignatureChange={(signatureDataUrl) => setSignatures({ 
                  preparedBy: { ...signOff.preparedBy, signatureDataUrl } 
                })}
              />
              
              <SignaturePad
                label="Reviewed By"
                name={signOff.reviewedBy?.name || ''}
                date={signOff.reviewedBy?.date || ''}
                signatureDataUrl={signOff.reviewedBy?.signatureDataUrl}
                onNameChange={(name) => setSignatures({ 
                  reviewedBy: { ...signOff.reviewedBy, name } 
                })}
                onDateChange={(date) => setSignatures({ 
                  reviewedBy: { ...signOff.reviewedBy, date } 
                })}
                onSignatureChange={(signatureDataUrl) => setSignatures({ 
                  reviewedBy: { ...signOff.reviewedBy, signatureDataUrl } 
                })}
              />
              
              <SignaturePad
                label="Approved By"
                name={signOff.approvedBy?.name || ''}
                date={signOff.approvedBy?.date || ''}
                signatureDataUrl={signOff.approvedBy?.signatureDataUrl}
                onNameChange={(name) => setSignatures({ 
                  approvedBy: { ...signOff.approvedBy, name } 
                })}
                onDateChange={(date) => setSignatures({ 
                  approvedBy: { ...signOff.approvedBy, date } 
                })}
                onSignatureChange={(signatureDataUrl) => setSignatures({ 
                  approvedBy: { ...signOff.approvedBy, signatureDataUrl } 
                })}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Action Bar */}
      <Card className="border-elec-yellow/20 bg-elec-gray/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => setShowPreview(true)}
              variant="outline"
              className="w-full border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              disabled={!validation.isValid}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview PDF
            </Button>
            
            <Button
              onClick={handleGeneratePDF}
              className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
              disabled={!validation.isValid || isGenerating}
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              {isGenerating ? 'Generating...' : 'Download PDF'}
            </Button>
            
            <Button
              onClick={reset}
              variant="outline"
              className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              Reset All Data
            </Button>
          </div>
          
          {!validation.isValid && (
            <p className="text-xs text-red-400 mt-2 text-center">
              Complete all required fields to generate PDF
            </p>
          )}
        </CardContent>
      </Card>

      {/* PDF Preview Modal */}
      <RAMSPDFPreview
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        ramsData={ramsData}
        reportOptions={reportOptions}
        signOff={signOff}
      />
    </div>
  );
};

export default RAMSGenerator;