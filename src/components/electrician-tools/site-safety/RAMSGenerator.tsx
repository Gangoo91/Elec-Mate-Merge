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
  Loader2
} from 'lucide-react';
import { useRAMS } from './rams/RAMSContext';
import { generateRAMSPDF } from '@/utils/rams-pdf';
import { RAMSPDFPreview } from './RAMSPDFPreview';
import { SignaturePad } from './common/SignaturePad';
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
      setShowAddRisk(false);
      
      toast({
        title: 'Risk Added',
        description: 'Risk assessment has been added to the RAMS.',
        variant: 'success'
      });
    }
  };

  const handleGeneratePDF = async () => {
    if (!validation.isValid) {
      toast({
        title: 'Validation Error',
        description: validation.errors.join(', '),
        variant: 'destructive'
      });
      return;
    }

    setIsGenerating(true);
    try {
      await generateRAMSPDF(ramsData, { ...reportOptions, signOff });
      toast({
        title: 'PDF Generated',
        description: 'RAMS document has been downloaded successfully.',
        variant: 'success'
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: 'Generation Failed',
        description: 'Failed to generate PDF. Please try again.',
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
            RAMS Generator
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Create comprehensive Risk Assessment & Method Statement documents compliant with BS 7671 18th Edition
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="flex gap-2">
            <Input
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              placeholder="Enter work activity"
              className="bg-elec-dark/50 border-elec-yellow/20 text-white"
              onKeyPress={(e) => e.key === 'Enter' && handleAddActivity()}
            />
            <Button
              onClick={handleAddActivity}
              className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {ramsData.activities.length > 0 && (
            <div className="space-y-2">
              {ramsData.activities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-elec-dark/30 rounded-lg">
                  <span className="text-white">{index + 1}. {activity}</span>
                  <Button
                    onClick={() => removeActivity(index)}
                    size="sm"
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
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
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
            <Card className="border-blue-500/30 bg-elec-gray/50">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-blue-400">{riskStats.total}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </CardContent>
            </Card>
            <Card className="border-green-500/30 bg-elec-gray/50">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-green-400">{riskStats.low}</div>
                <div className="text-xs text-muted-foreground">Low</div>
              </CardContent>
            </Card>
            <Card className="border-yellow-500/30 bg-elec-gray/50">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-yellow-400">{riskStats.medium}</div>
                <div className="text-xs text-muted-foreground">Medium</div>
              </CardContent>
            </Card>
            <Card className="border-orange-500/30 bg-elec-gray/50">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-orange-400">{riskStats.high}</div>
                <div className="text-xs text-muted-foreground">High</div>
              </CardContent>
            </Card>
            <Card className="border-red-500/30 bg-elec-gray/50">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-red-400">{riskStats.veryHigh}</div>
                <div className="text-xs text-muted-foreground">Very High</div>
              </CardContent>
            </Card>
          </div>

          {/* Risk List */}
          {ramsData.risks.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-white">Identified Risks ({ramsData.risks.length})</h4>
              {ramsData.risks.map((risk) => (
                <Card key={risk.id} className="border-elec-yellow/30 bg-elec-dark/20">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className={`${getRiskLevelColor(risk.riskRating)} text-white text-xs`}>
                            {getRiskLevelText(risk.riskRating)} ({risk.riskRating})
                          </Badge>
                        </div>
                        <div>
                          <p className="font-medium text-white">{risk.hazard}</p>
                          <p className="text-sm text-muted-foreground">{risk.risk}</p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          L: {risk.likelihood} | S: {risk.severity} | Controls: {risk.controls || 'None specified'}
                        </div>
                      </div>
                      <Button
                        onClick={() => removeRisk(risk.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => setShowPreview(true)}
              variant="outline"
              className="flex-1 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              disabled={!validation.isValid}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview PDF
            </Button>
            
            <Button
              onClick={handleGeneratePDF}
              className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
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
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              Reset
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