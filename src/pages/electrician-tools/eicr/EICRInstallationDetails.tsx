
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, Building } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

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

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    return formData.address && formData.description && formData.earthingSystem && formData.supply;
  };

  const handleNext = () => {
    if (canProceed()) {
      // Save to localStorage for persistence
      localStorage.setItem('eicr-installation-details', JSON.stringify(formData));
      navigate('/electrician-tools/eicr/inspector-details');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
            <Building className="h-8 w-8 text-elec-yellow" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Installation Details</h1>
            <p className="text-muted-foreground">
              Enter the electrical installation information for this EICR
            </p>
          </div>
        </div>
        <Link to="/electrician-tools/eicr-reports">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to EICR Reports
          </Button>
        </Link>
      </div>

      {/* Main Form */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Installation Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Address Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Label htmlFor="address">Installation Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => updateField('address', e.target.value)}
                placeholder="Full installation address including postcode..."
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
                rows={3}
                required
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Installation Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Type and use of installation (e.g., Domestic dwelling, Commercial office, etc.)"
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
                rows={3}
                required
              />
            </div>
          </div>

          {/* Technical Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="age">Estimated Age</Label>
              <Input
                id="age"
                value={formData.age}
                onChange={(e) => updateField('age', e.target.value)}
                placeholder="e.g., 15-20 years"
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
              />
            </div>

            <div>
              <Label htmlFor="earthing">Earthing System *</Label>
              <Select
                value={formData.earthingSystem}
                onValueChange={(value) => updateField('earthingSystem', value)}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50">
                  <SelectValue placeholder="Select earthing type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TN-S">TN-S (Separate earth)</SelectItem>
                  <SelectItem value="TN-C-S">TN-C-S (PME)</SelectItem>
                  <SelectItem value="TT">TT (Earth electrode)</SelectItem>
                  <SelectItem value="IT">IT (Isolated)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="supply">Supply Type *</Label>
              <Select
                value={formData.supply}
                onValueChange={(value) => updateField('supply', value)}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50">
                  <SelectValue placeholder="Select supply type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single-phase">Single-phase (230V)</SelectItem>
                  <SelectItem value="three-phase">Three-phase (400V)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Technical Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="mainSwitch">Main Switch Rating</Label>
              <Input
                id="mainSwitch"
                value={formData.mainSwitch}
                onChange={(e) => updateField('mainSwitch', e.target.value)}
                placeholder="e.g., 100A"
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
              />
            </div>

            <div>
              <Label htmlFor="mainEarth">Main Earthing Conductor</Label>
              <Input
                id="mainEarth"
                value={formData.mainEarth}
                onChange={(e) => updateField('mainEarth', e.target.value)}
                placeholder="e.g., 16mm²"
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
              />
            </div>

            <div>
              <Label htmlFor="mainBonding">Main Bonding Conductors</Label>
              <Input
                id="mainBonding"
                value={formData.mainBonding}
                onChange={(e) => updateField('mainBonding', e.target.value)}
                placeholder="e.g., 10mm²"
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <Link to="/electrician-tools/eicr-reports">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Reports
              </Button>
            </Link>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2"
            >
              Next: Inspector Details
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICRInstallationDetails;
