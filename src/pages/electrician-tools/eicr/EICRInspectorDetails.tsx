
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const EICRInspectorDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    qualification: '',
    registration: '',
    organisation: '',
    inspectionDate: '',
    nextDueDate: '',
  });

  useEffect(() => {
    // Check if installation details exist
    const installationData = localStorage.getItem('eicr-installation-details');
    if (!installationData) {
      navigate('/electrician-tools/eicr/installation-details');
    }
  }, [navigate]);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    return formData.name && formData.qualification && formData.inspectionDate;
  };

  const handleNext = () => {
    if (canProceed()) {
      localStorage.setItem('eicr-inspector-details', JSON.stringify(formData));
      navigate('/electrician-tools/eicr/circuits');
    }
  };

  const handleBack = () => {
    navigate('/electrician-tools/eicr/installation-details');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30">
            <User className="h-8 w-8 text-elec-yellow" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inspector Details</h1>
            <p className="text-muted-foreground">
              Enter the inspector and inspection information
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
          <CardTitle>Inspector Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Inspector Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Full name"
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
                required
              />
            </div>

            <div>
              <Label htmlFor="qualification">Qualification *</Label>
              <Select
                value={formData.qualification}
                onValueChange={(value) => updateField('qualification', value)}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50">
                  <SelectValue placeholder="Select qualification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="City & Guilds 2391-52">City & Guilds 2391-52</SelectItem>
                  <SelectItem value="City & Guilds 2394/2395">City & Guilds 2394/2395</SelectItem>
                  <SelectItem value="EAL 600/4338/4">EAL 600/4338/4</SelectItem>
                  <SelectItem value="NICEIC Qualified">NICEIC Qualified</SelectItem>
                  <SelectItem value="NAPIT Qualified">NAPIT Qualified</SelectItem>
                  <SelectItem value="STROMA Qualified">STROMA Qualified</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="registration">Registration Number</Label>
              <Input
                id="registration"
                value={formData.registration}
                onChange={(e) => updateField('registration', e.target.value)}
                placeholder="NICEIC/NAPIT/STROMA etc. number"
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
              />
            </div>

            <div>
              <Label htmlFor="organisation">Organisation</Label>
              <Input
                id="organisation"
                value={formData.organisation}
                onChange={(e) => updateField('organisation', e.target.value)}
                placeholder="Company or organisation name"
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
              />
            </div>

            <div>
              <Label htmlFor="inspectionDate">Inspection Date *</Label>
              <Input
                id="inspectionDate"
                type="date"
                value={formData.inspectionDate}
                onChange={(e) => updateField('inspectionDate', e.target.value)}
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
                required
              />
            </div>

            <div>
              <Label htmlFor="nextDueDate">Next Inspection Due</Label>
              <Input
                id="nextDueDate"
                type="date"
                value={formData.nextDueDate}
                onChange={(e) => updateField('nextDueDate', e.target.value)}
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
            <Button 
              onClick={handleBack}
              variant="outline" 
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back: Installation Details
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2"
            >
              Next: Circuit Information
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICRInspectorDetails;
