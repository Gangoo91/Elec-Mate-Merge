
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, FileText, User, Home, Settings } from 'lucide-react';

interface EICRSetupFormProps {
  onStartSession: (installationDetails: any, technician: any) => void;
}

const EICRSetupForm: React.FC<EICRSetupFormProps> = ({ onStartSession }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const [installationDetails, setInstallationDetails] = useState({
    address: '',
    description: '',
    estimatedAge: '',
    evidenceOfAlterations: false,
    alterationsDescription: '',
    earthingArrangements: '',
    supplyCharacteristics: '',
    mainSwitchRating: '',
    mainEarthingConductor: '',
    mainBondingConductors: '',
    installationType: 'domestic',
    numberOfCircuits: '',
    distributionBoard: ''
  });

  const [inspectionDetails, setInspectionDetails] = useState({
    extentOfInspection: '',
    limitations: '',
    departuresFromBS7671: '',
    riskAssessmentRequired: false,
    accessRestrictions: '',
    samplingBasis: ''
  });

  const [technicianDetails, setTechnicianDetails] = useState({
    name: '',
    qualification: '',
    company: '',
    registrationNumber: '',
    contactDetails: '',
    signatureDate: new Date().toISOString().split('T')[0]
  });

  const steps = [
    { title: 'Installation Details', icon: Home },
    { title: 'Inspection Scope', icon: Settings },
    { title: 'Inspector Details', icon: User },
    { title: 'Review & Start', icon: FileText }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const completeData = {
      ...installationDetails,
      inspectionDetails,
      technicianDetails
    };
    onStartSession(completeData, technicianDetails);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return installationDetails.address && installationDetails.description && 
               installationDetails.earthingArrangements && installationDetails.supplyCharacteristics;
      case 1:
        return inspectionDetails.extentOfInspection;
      case 2:
        return technicianDetails.name && technicianDetails.qualification;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Installation Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Installation Address *</Label>
                <Textarea
                  id="address"
                  value={installationDetails.address}
                  onChange={(e) => setInstallationDetails(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Full address including postcode"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description of Installation *</Label>
                <Textarea
                  id="description"
                  value={installationDetails.description}
                  onChange={(e) => setInstallationDetails(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the electrical installation"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="installationType">Installation Type</Label>
                <Select 
                  value={installationDetails.installationType} 
                  onValueChange={(value) => setInstallationDetails(prev => ({ ...prev, installationType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="domestic">Domestic</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedAge">Estimated Age</Label>
                <Input
                  id="estimatedAge"
                  value={installationDetails.estimatedAge}
                  onChange={(e) => setInstallationDetails(prev => ({ ...prev, estimatedAge: e.target.value }))}
                  placeholder="e.g. 15 years"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfCircuits">Number of Circuits</Label>
                <Input
                  id="numberOfCircuits"
                  type="number"
                  value={installationDetails.numberOfCircuits}
                  onChange={(e) => setInstallationDetails(prev => ({ ...prev, numberOfCircuits: e.target.value }))}
                  placeholder="Total circuits"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="earthingArrangements">Earthing Arrangements *</Label>
                <Select 
                  value={installationDetails.earthingArrangements} 
                  onValueChange={(value) => setInstallationDetails(prev => ({ ...prev, earthingArrangements: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select earthing system" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TN-S">TN-S (Separate earth)</SelectItem>
                    <SelectItem value="TN-C-S">TN-C-S (Combined neutral-earth)</SelectItem>
                    <SelectItem value="TT">TT (Earth electrode)</SelectItem>
                    <SelectItem value="IT">IT (Isolated)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplyCharacteristics">Supply Characteristics *</Label>
                <Select 
                  value={installationDetails.supplyCharacteristics} 
                  onValueChange={(value) => setInstallationDetails(prev => ({ ...prev, supplyCharacteristics: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select supply type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="230V-1P-50Hz">230V 1-phase 50Hz</SelectItem>
                    <SelectItem value="400V-3P-50Hz">400V 3-phase 50Hz</SelectItem>
                    <SelectItem value="110V-1P-50Hz">110V 1-phase 50Hz</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mainSwitchRating">Main Switch Rating</Label>
                <Input
                  id="mainSwitchRating"
                  value={installationDetails.mainSwitchRating}
                  onChange={(e) => setInstallationDetails(prev => ({ ...prev, mainSwitchRating: e.target.value }))}
                  placeholder="e.g. 100A"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mainEarthingConductor">Main Earthing Conductor</Label>
                <Input
                  id="mainEarthingConductor"
                  value={installationDetails.mainEarthingConductor}
                  onChange={(e) => setInstallationDetails(prev => ({ ...prev, mainEarthingConductor: e.target.value }))}
                  placeholder="e.g. 16mm²"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mainBondingConductors">Main Bonding Conductors</Label>
                <Input
                  id="mainBondingConductors"
                  value={installationDetails.mainBondingConductors}
                  onChange={(e) => setInstallationDetails(prev => ({ ...prev, mainBondingConductors: e.target.value }))}
                  placeholder="e.g. 10mm²"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="evidenceOfAlterations"
                  checked={installationDetails.evidenceOfAlterations}
                  onCheckedChange={(checked) => 
                    setInstallationDetails(prev => ({ ...prev, evidenceOfAlterations: !!checked }))
                  }
                />
                <Label htmlFor="evidenceOfAlterations">Evidence of alterations or additions</Label>
              </div>

              {installationDetails.evidenceOfAlterations && (
                <div className="space-y-2">
                  <Label htmlFor="alterationsDescription">Description of Alterations</Label>
                  <Textarea
                    id="alterationsDescription"
                    value={installationDetails.alterationsDescription}
                    onChange={(e) => setInstallationDetails(prev => ({ ...prev, alterationsDescription: e.target.value }))}
                    placeholder="Describe any alterations or additions"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Inspection Scope & Limitations</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="extentOfInspection">Extent of Inspection *</Label>
                <Select 
                  value={inspectionDetails.extentOfInspection} 
                  onValueChange={(value) => setInspectionDetails(prev => ({ ...prev, extentOfInspection: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select inspection extent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full installation inspection</SelectItem>
                    <SelectItem value="partial">Partial inspection</SelectItem>
                    <SelectItem value="sample">Sample inspection</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="limitations">Limitations of Inspection</Label>
                <Textarea
                  id="limitations"
                  value={inspectionDetails.limitations}
                  onChange={(e) => setInspectionDetails(prev => ({ ...prev, limitations: e.target.value }))}
                  placeholder="Any areas not inspected or limitations encountered"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accessRestrictions">Access Restrictions</Label>
                <Textarea
                  id="accessRestrictions"
                  value={inspectionDetails.accessRestrictions}
                  onChange={(e) => setInspectionDetails(prev => ({ ...prev, accessRestrictions: e.target.value }))}
                  placeholder="Any access restrictions or areas that could not be inspected"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="departuresFromBS7671">Departures from BS 7671</Label>
                <Textarea
                  id="departuresFromBS7671"
                  value={inspectionDetails.departuresFromBS7671}
                  onChange={(e) => setInspectionDetails(prev => ({ ...prev, departuresFromBS7671: e.target.value }))}
                  placeholder="Any identified departures from current standards"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="samplingBasis">Sampling Basis (if applicable)</Label>
                <Textarea
                  id="samplingBasis"
                  value={inspectionDetails.samplingBasis}
                  onChange={(e) => setInspectionDetails(prev => ({ ...prev, samplingBasis: e.target.value }))}
                  placeholder="Basis for sampling if not a full inspection"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="riskAssessmentRequired"
                  checked={inspectionDetails.riskAssessmentRequired}
                  onCheckedChange={(checked) => 
                    setInspectionDetails(prev => ({ ...prev, riskAssessmentRequired: !!checked }))
                  }
                />
                <Label htmlFor="riskAssessmentRequired">Risk assessment required for further investigation</Label>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Inspector Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="inspectorName">Inspector Name *</Label>
                <Input
                  id="inspectorName"
                  value={technicianDetails.name}
                  onChange={(e) => setTechnicianDetails(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification *</Label>
                <Input
                  id="qualification"
                  value={technicianDetails.qualification}
                  onChange={(e) => setTechnicianDetails(prev => ({ ...prev, qualification: e.target.value }))}
                  placeholder="e.g. 18th Edition BS 7671, C&G 2391"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company/Organisation</Label>
                <Input
                  id="company"
                  value={technicianDetails.company}
                  onChange={(e) => setTechnicianDetails(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Company name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input
                  id="registrationNumber"
                  value={technicianDetails.registrationNumber}
                  onChange={(e) => setTechnicianDetails(prev => ({ ...prev, registrationNumber: e.target.value }))}
                  placeholder="Professional registration number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactDetails">Contact Details</Label>
              <Textarea
                id="contactDetails"
                value={technicianDetails.contactDetails}
                onChange={(e) => setTechnicianDetails(prev => ({ ...prev, contactDetails: e.target.value }))}
                placeholder="Phone, email, address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signatureDate">Signature Date</Label>
              <Input
                id="signatureDate"
                type="date"
                value={technicianDetails.signatureDate}
                onChange={(e) => setTechnicianDetails(prev => ({ ...prev, signatureDate: e.target.value }))}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Review & Start Inspection</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-elec-yellow/30">
                <CardHeader>
                  <CardTitle className="text-sm">Installation Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div><strong>Address:</strong> {installationDetails.address || 'Not specified'}</div>
                  <div><strong>Type:</strong> {installationDetails.installationType}</div>
                  <div><strong>Earthing:</strong> {installationDetails.earthingArrangements || 'Not specified'}</div>
                  <div><strong>Supply:</strong> {installationDetails.supplyCharacteristics || 'Not specified'}</div>
                  <div><strong>Circuits:</strong> {installationDetails.numberOfCircuits || 'Not specified'}</div>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/30">
                <CardHeader>
                  <CardTitle className="text-sm">Inspector Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div><strong>Inspector:</strong> {technicianDetails.name || 'Not specified'}</div>
                  <div><strong>Qualification:</strong> {technicianDetails.qualification || 'Not specified'}</div>
                  <div><strong>Company:</strong> {technicianDetails.company || 'Not specified'}</div>
                  <div><strong>Scope:</strong> {inspectionDetails.extentOfInspection || 'Not specified'}</div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-medium text-blue-400 mb-2">Ready to Start</h4>
              <p className="text-blue-300 text-sm">
                All required information has been collected. Click "Start EICR Process" to begin the 
                visual inspection and testing procedures following BS 7671:2018+A2:2022.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="border-elec-yellow/30 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-elec-yellow" />
            EICR Setup Wizard
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
        <Progress value={progress} className="h-2 mt-2" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Step Navigation */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  index <= currentStep 
                    ? 'bg-elec-yellow border-elec-yellow text-black' 
                    : 'border-gray-600 text-gray-400'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    index < currentStep ? 'bg-elec-yellow' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4 border-t border-gray-600">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2"
            >
              Start EICR Process
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EICRSetupForm;
