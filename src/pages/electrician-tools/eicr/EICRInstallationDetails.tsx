import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight, Building } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { EICRDataManager } from '@/utils/eicrDataPersistence';
import EICRProgressIndicator from '@/components/eicr/EICRProgressIndicator';

const EICRInstallationDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: '',
    description: '',
    age: '',
    earthingSystem: '',
    supply: '',
    mainSwitch: '',
    mainEarth: '',
    mainBonding: '',
    alterations: false,
  });

  useEffect(() => {
    // Load existing data if available
    const savedData = EICRDataManager.loadInstallationDetails();
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  const updateField = (field: string, value: any) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    
    // Auto-save to localStorage
    EICRDataManager.saveInstallationDetails(updatedData);
  };

  const canProceed = () => {
    return formData.address && formData.description && formData.earthingSystem && formData.supply;
  };

  const handleNext = () => {
    if (canProceed()) {
      EICRDataManager.saveInstallationDetails(formData);
      navigate('/electrician-tools/eicr/inspector-details');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
            <Building className="h-8 w-8 text-elec-yellow" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">EICR Installation Details</h1>
            <p className="text-muted-foreground">
              Enter comprehensive installation information for the electrical installation condition report
            </p>
          </div>
        </div>
        <Link to="/electrician-tools/eicr-reports">
          <Button variant="outline" className="flex items-center gap-2 border-elec-yellow/20 hover:border-elec-yellow/40">
            <ArrowLeft className="h-4 w-4" />
            Back to EICR Reports
          </Button>
        </Link>
      </div>

      {/* Progress Indicator */}
      <EICRProgressIndicator currentStep="installation-details" />

      {/* Enhanced Main Form */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Installation Information
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Provide detailed information about the electrical installation being inspected
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Address Section */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="address" className="flex items-center gap-2">
                Installation Address * 
                <span className="text-xs text-muted-foreground">(Include postcode)</span>
              </Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => updateField('address', e.target.value)}
                placeholder="Enter the complete installation address including postcode..."
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50 mt-2"
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="flex items-center gap-2">
                Installation Description *
                <span className="text-xs text-muted-foreground">(Type and use)</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Describe the type and use of installation (e.g., Three-bedroom domestic dwelling, Commercial office building, Industrial workshop, etc.)"
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50 mt-2"
                rows={3}
                required
              />
            </div>
          </div>

          {/* Technical Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="age">Estimated Age</Label>
              <Input
                id="age"
                value={formData.age}
                onChange={(e) => updateField('age', e.target.value)}
                placeholder="e.g., 15-20 years"
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50 mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Approximate age of the electrical installation
              </p>
            </div>

            <div>
              <Label htmlFor="earthing">Earthing System *</Label>
              <Select
                value={formData.earthingSystem}
                onValueChange={(value) => updateField('earthingSystem', value)}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50 mt-2">
                  <SelectValue placeholder="Select earthing arrangement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TN-S">TN-S (Separate earth conductor)</SelectItem>
                  <SelectItem value="TN-C-S">TN-C-S (PME - Protective Multiple Earthing)</SelectItem>
                  <SelectItem value="TT">TT (Earth electrode system)</SelectItem>
                  <SelectItem value="IT">IT (Isolated terra)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Type of earthing arrangement as per BS 7671
              </p>
            </div>

            <div>
              <Label htmlFor="supply">Supply Characteristics *</Label>
              <Select
                value={formData.supply}
                onValueChange={(value) => updateField('supply', value)}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50 mt-2">
                  <SelectValue placeholder="Select supply type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single-phase-230v">Single-phase 230V 50Hz</SelectItem>
                  <SelectItem value="three-phase-400v">Three-phase 400V 50Hz</SelectItem>
                  <SelectItem value="single-phase-110v">Single-phase 110V (Site supply)</SelectItem>
                  <SelectItem value="dc-supply">DC Supply</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Supply voltage and frequency characteristics
              </p>
            </div>
          </div>

          {/* Additional Technical Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="mainSwitch">Main Switch/Isolator Rating</Label>
              <Input
                id="mainSwitch"
                value={formData.mainSwitch}
                onChange={(e) => updateField('mainSwitch', e.target.value)}
                placeholder="e.g., 100A DP"
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50 mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Rating and type of main switch
              </p>
            </div>

            <div>
              <Label htmlFor="mainEarth">Main Earthing Conductor</Label>
              <Input
                id="mainEarth"
                value={formData.mainEarth}
                onChange={(e) => updateField('mainEarth', e.target.value)}
                placeholder="e.g., 16mm² Cu"
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50 mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Cross-sectional area and material
              </p>
            </div>

            <div>
              <Label htmlFor="mainBonding">Main Bonding Conductors</Label>
              <Input
                id="mainBonding"
                value={formData.mainBonding}
                onChange={(e) => updateField('mainBonding', e.target.value)}
                placeholder="e.g., 10mm² Cu"
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50 mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Cross-sectional area and material
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 p-3 bg-elec-dark/50 rounded-lg border border-elec-yellow/10">
              <Checkbox
                id="alterations"
                checked={formData.alterations}
                onCheckedChange={(checked) => updateField('alterations', checked)}
              />
              <Label htmlFor="alterations" className="text-sm">
                Evidence of alterations or additions since original installation
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Navigation */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <Link to="/electrician-tools/eicr-reports">
              <Button variant="outline" className="flex items-center gap-2 border-elec-yellow/20 hover:border-elec-yellow/40">
                <ArrowLeft className="h-4 w-4" />
                Back to Reports
              </Button>
            </Link>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">
                Next: Inspector Details
              </p>
              <p className="text-xs text-muted-foreground">
                {canProceed() ? 'Ready to proceed' : 'Complete required fields to continue'}
              </p>
            </div>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next: Inspector Details
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Information Panel */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-lg text-blue-300">EICR Process Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center text-xs font-medium">1</div>
              <span className="font-medium text-elec-yellow">Installation Details</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-500/20 text-gray-400 flex items-center justify-center text-xs font-medium">2</div>
              <span className="text-muted-foreground">Inspector Details</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-500/20 text-gray-400 flex items-center justify-center text-xs font-medium">3</div>
              <span className="text-muted-foreground">Circuit Information</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-500/20 text-gray-400 flex items-center justify-center text-xs font-medium">4</div>
              <span className="text-muted-foreground">Visual Inspection</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Complete all steps to generate a comprehensive EICR report compliant with BS 7671 standards
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICRInstallationDetails;
