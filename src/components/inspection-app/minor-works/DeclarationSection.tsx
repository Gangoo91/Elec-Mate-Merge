import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PenTool, Shield, AlertTriangle, FileText, CheckCircle, Download } from 'lucide-react';
import SignatureInput from '@/components/signature/SignatureInput';

interface DeclarationSectionProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  onGenerateCertificate: () => void;
  onSaveDraft: () => void;
  isValid: boolean;
}

const DeclarationSection = ({ 
  formData, 
  onUpdate, 
  onGenerateCertificate, 
  onSaveDraft,
  isValid 
}: DeclarationSectionProps) => {
  const getCompletionStatus = () => {
    const required = [
      'propertyAddress', 'clientName', 'workDate', 'workType', 'workDescription',
      'earthingArrangement', 'electricianName', 'electricianPosition', 'signatureDate'
    ];
    
    const completed = required.filter(field => formData[field]?.trim()).length;
    return { completed, total: required.length, percentage: Math.round((completed / required.length) * 100) };
  };

  const status = getCompletionStatus();

  return (
    <div className="space-y-6">
      {/* Certificate Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle className="h-5 w-5 text-primary" />
            Certificate Completion Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Completion Progress</span>
            <Badge variant={status.percentage >= 100 ? "default" : "secondary"}>
              {status.completed}/{status.total} sections completed
            </Badge>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${status.percentage}%` }}
            />
          </div>
          
          <p className="text-sm text-muted-foreground">
            {status.percentage}% complete. {status.percentage < 100 ? 
              `${status.total - status.completed} more sections required.` : 
              'All required sections completed.'
            }
          </p>
        </CardContent>
      </Card>

      {/* Competent Person Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-primary" />
            Competent Person Declaration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="electricianName" className="text-sm font-medium">
                  Name of Competent Person *
                </Label>
                <Input
                  id="electricianName"
                  placeholder="Full name of qualified electrician"
                  value={formData.electricianName || ''}
                  onChange={(e) => onUpdate('electricianName', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="electricianPosition" className="text-sm font-medium">
                  Position/Role *
                </Label>
                <Input
                  id="electricianPosition"
                  placeholder="e.g., Qualified Electrician, Electrical Contractor"
                  value={formData.electricianPosition || ''}
                  onChange={(e) => onUpdate('electricianPosition', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="qualificationLevel" className="text-sm font-medium">
                  Qualification Level
                </Label>
                <MobileSelectPicker
                  value={formData.qualificationLevel || ''}
                  onValueChange={(value) => onUpdate('qualificationLevel', value)}
                  options={[
                    { value: 'level3', label: 'Level 3 - 18th Edition' },
                    { value: 'level4', label: 'Level 4 - HNC/HND' },
                    { value: 'degree', label: 'Degree in Electrical Engineering' },
                    { value: 'other', label: 'Other (specify in notes)' },
                  ]}
                  placeholder="Select qualification level"
                  title="Qualification Level"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="schemeProvider" className="text-sm font-medium">
                  Competent Person Scheme
                </Label>
                <MobileSelectPicker
                  value={formData.schemeProvider || ''}
                  onValueChange={(value) => onUpdate('schemeProvider', value)}
                  options={[
                    { value: 'niceic', label: 'NICEIC' },
                    { value: 'napit', label: 'NAPIT' },
                    { value: 'elecsa', label: 'ELECSA' },
                    { value: 'bpec', label: 'BPEC' },
                    { value: 'stroma', label: 'Stroma' },
                    { value: 'other', label: 'Other scheme' },
                    { value: 'none', label: 'Not applicable' },
                  ]}
                  placeholder="Select scheme provider"
                  title="Competent Person Scheme"
                />
              </div>
              
              <div>
                <Label htmlFor="registrationNumber" className="text-sm font-medium">
                  Registration Number
                </Label>
                <Input
                  id="registrationNumber"
                  placeholder="Scheme registration number"
                  value={formData.registrationNumber || ''}
                  onChange={(e) => onUpdate('registrationNumber', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="signatureDate" className="text-sm font-medium">
                  Date of Declaration *
                </Label>
                <Input
                  id="signatureDate"
                  type="date"
                  value={formData.signatureDate || ''}
                  onChange={(e) => onUpdate('signatureDate', e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regulatory Declaration */}
      <Card className="border-blue-200 bg-blue-50/30 dark:border-blue-800 dark:bg-blue-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-blue-700 dark:text-blue-400">
            <FileText className="h-5 w-5" />
            Regulatory Declaration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white/60 dark:bg-black/20 p-4 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
            <p className="text-sm leading-relaxed text-blue-900 dark:text-blue-100">
              <strong>I/We certify that:</strong><br/>
              The work described above has been carried out by me/us in accordance with BS 7671:2018 
              (IET Wiring Regulations 18th Edition) and that all the information recorded above is accurate 
              to the best of my/our knowledge and belief.
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="bs7671Compliance"
                checked={formData.bs7671Compliance || false}
                onCheckedChange={(checked) => onUpdate('bs7671Compliance', checked)}
              />
              <Label htmlFor="bs7671Compliance" className="text-sm leading-relaxed">
                I confirm the work complies with BS 7671:2018 (IET Wiring Regulations 18th Edition)
              </Label>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="testResultsAccurate"
                checked={formData.testResultsAccurate || false}
                onCheckedChange={(checked) => onUpdate('testResultsAccurate', checked)}
              />
              <Label htmlFor="testResultsAccurate" className="text-sm leading-relaxed">
                I confirm all test results and measurements recorded are accurate
              </Label>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="workSafety"
                checked={formData.workSafety || false}
                onCheckedChange={(checked) => onUpdate('workSafety', checked)}
              />
              <Label htmlFor="workSafety" className="text-sm leading-relaxed">
                I confirm the work has been carried out safely and in accordance with relevant safety standards
              </Label>
            </div>
            
            {formData.partPRequired === 'yes' && (
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="partPNotification"
                  checked={formData.partPNotification || false}
                  onCheckedChange={(checked) => onUpdate('partPNotification', checked)}
                />
                <Label htmlFor="partPNotification" className="text-sm leading-relaxed">
                  I confirm Building Regulations (Part P) notification requirements have been considered
                </Label>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Digital Signature */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <PenTool className="h-5 w-5 text-primary" />
            Digital Signature
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignatureInput
            label="Digital Signature/Declaration"
            value={formData.digitalSignature || ''}
            onChange={(signature) => onUpdate('digitalSignature', signature)}
            placeholder="Type full name, draw signature, or use a saved signature"
            required
          />
          <p className="text-xs text-muted-foreground">
            By providing your signature, you are confirming a legally binding digital signature
          </p>
          
          <div>
            <Label htmlFor="additionalNotes" className="text-sm font-medium">
              Additional Notes & Observations
            </Label>
            <Textarea
              id="additionalNotes"
              placeholder="Any additional comments, recommendations, or important notes regarding the installation..."
              value={formData.additionalNotes || ''}
              onChange={(e) => onUpdate('additionalNotes', e.target.value)}
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Certificate Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Download className="h-5 w-5 text-primary" />
            Certificate Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isValid && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Please complete all required fields before generating the certificate. 
                Required sections are marked with an asterisk (*).
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={onGenerateCertificate}
              disabled={!isValid}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate Final Certificate
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onSaveDraft}
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Certificates are generated in PDF format compliant with BS 7671:2018 requirements
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeclarationSection;