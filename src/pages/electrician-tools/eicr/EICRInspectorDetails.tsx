
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, User, FileCheck, Building, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const EICRInspectorDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    qualification: '',
    registrationBody: '',
    registrationNumber: '',
    organisationType: '',
    organisation: '',
    inspectionDate: '',
    nextDueDate: '',
    additionalQualifications: '',
    yearsExperience: '',
    specialisations: '',
    notes: ''
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
    return formData.name && formData.qualification && formData.registrationBody && formData.inspectionDate;
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

  const qualificationOptions = [
    { value: 'city-guilds-2391-52', label: 'City & Guilds 2391-52 (Inspection & Testing)' },
    { value: 'city-guilds-2394-2395', label: 'City & Guilds 2394/2395 (Design & Verification)' },
    { value: 'city-guilds-2391-50', label: 'City & Guilds 2391-50 (Initial Verification)' },
    { value: 'city-guilds-2391-51', label: 'City & Guilds 2391-51 (Periodic Inspection)' },
    { value: 'eal-600-4338-4', label: 'EAL 600/4338/4 (Inspection & Testing)' },
    { value: 'btec-level-4', label: 'BTEC Level 4 HNC/HND Electrical Engineering' },
    { value: 'degree-electrical', label: 'Degree in Electrical Engineering' },
    { value: 'iet-membership', label: 'IET Professional Membership' },
    { value: 'nvq-level-4', label: 'NVQ Level 4 Installing Electrotechnical Systems' },
    { value: 'apprenticeship-advanced', label: 'Advanced Apprenticeship in Electrical Installation' },
    { value: 'other', label: 'Other (Please specify in notes)' }
  ];

  const registrationBodyOptions = [
    { value: 'niceic', label: 'NICEIC' },
    { value: 'napit', label: 'NAPIT' },
    { value: 'stroma', label: 'STROMA Certification' },
    { value: 'certsure', label: 'Certsure (ELECSA)' },
    { value: 'nic-eic', label: 'NIC EIC' },
    { value: 'bpec', label: 'BPEC' },
    { value: 'jib', label: 'JIB (Joint Industry Board)' },
    { value: 'iet', label: 'IET (Institution of Engineering and Technology)' },
    { value: 'local-authority', label: 'Local Authority Building Control' },
    { value: 'none', label: 'Not Registered' },
    { value: 'other', label: 'Other' }
  ];

  const organisationTypeOptions = [
    { value: 'sole-trader', label: 'Sole Trader' },
    { value: 'limited-company', label: 'Limited Company' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'contractor', label: 'Electrical Contractor' },
    { value: 'consultant', label: 'Electrical Consultant' },
    { value: 'local-authority', label: 'Local Authority' },
    { value: 'housing-association', label: 'Housing Association' },
    { value: 'maintenance-company', label: 'Maintenance Company' },
    { value: 'testing-specialist', label: 'Testing Specialist' },
    { value: 'other', label: 'Other' }
  ];

  const experienceOptions = [
    { value: '0-2', label: '0-2 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '6-10', label: '6-10 years' },
    { value: '11-15', label: '11-15 years' },
    { value: '16-20', label: '16-20 years' },
    { value: '20+', label: '20+ years' }
  ];

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

      {/* Inspector Information */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-elec-yellow" />
            Inspector Information
          </CardTitle>
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
              <Label htmlFor="qualification">Primary Qualification *</Label>
              <Select
                value={formData.qualification}
                onValueChange={(value) => updateField('qualification', value)}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50">
                  <SelectValue placeholder="Select primary qualification" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20 max-h-60">
                  {qualificationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="additionalQualifications">Additional Qualifications</Label>
              <Input
                id="additionalQualifications"
                value={formData.additionalQualifications}
                onChange={(e) => updateField('additionalQualifications', e.target.value)}
                placeholder="e.g., 18th Edition, PAT Testing"
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
              />
            </div>

            <div>
              <Label htmlFor="yearsExperience">Years of Experience</Label>
              <Select
                value={formData.yearsExperience}
                onValueChange={(value) => updateField('yearsExperience', value)}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  {experienceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Registration Details */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-elec-yellow" />
            Registration Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="registrationBody">Registration Body *</Label>
              <Select
                value={formData.registrationBody}
                onValueChange={(value) => updateField('registrationBody', value)}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50">
                  <SelectValue placeholder="Select registration body" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  {registrationBodyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="registrationNumber">Registration Number</Label>
              <Input
                id="registrationNumber"
                value={formData.registrationNumber}
                onChange={(e) => updateField('registrationNumber', e.target.value)}
                placeholder="Registration/membership number"
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Organisation Details */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-elec-yellow" />
            Organisation Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="organisationType">Organisation Type</Label>
              <Select
                value={formData.organisationType}
                onValueChange={(value) => updateField('organisationType', value)}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50">
                  <SelectValue placeholder="Select organisation type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  {organisationTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="organisation">Organisation/Company Name</Label>
              <Input
                id="organisation"
                value={formData.organisation}
                onChange={(e) => updateField('organisation', e.target.value)}
                placeholder="Company or organisation name"
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
              />
            </div>

            <div>
              <Label htmlFor="specialisations">Specialisations</Label>
              <Input
                id="specialisations"
                value={formData.specialisations}
                onChange={(e) => updateField('specialisations', e.target.value)}
                placeholder="e.g., Domestic, Commercial, Industrial"
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inspection Details */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-elec-yellow" />
            Inspection Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              placeholder="Any additional information or special considerations..."
              className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow/50 min-h-[100px]"
            />
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
