
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { User, CheckCircle, AlertTriangle } from 'lucide-react';
import { EICRDataManager } from '@/utils/eicrDataPersistence';

interface InspectorDetailsFormProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const InspectorDetailsForm: React.FC<InspectorDetailsFormProps> = ({ onComplete, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    qualification: '',
    registrationBody: '',
    registrationNumber: '',
    companyName: '',
    organisationType: '',
    address: '',
    postcode: '',
    phone: '',
    email: '',
    insuranceDetails: '',
    additionalQualifications: [] as string[],
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedData = EICRDataManager.loadInspectorDetails();
    if (savedData) {
      setFormData(prev => ({ ...prev, ...savedData }));
    }
  }, []);

  const qualifications = [
    '18th Edition BS 7671:2018+A2:2022',
    '17th Edition BS 7671:2008',
    'City & Guilds 2391-52 (Inspection & Testing)',
    'City & Guilds 2391-51 (Initial Verification)',
    'City & Guilds 2391-50 (In-Service)',
    'IET Level 4 Electrical Installation',
    'NICEIC Approved Contractor',
    'NAPIT Registered',
    'ECA Member',
    'SELECT Member',
    'Other'
  ];

  const registrationBodies = [
    'NICEIC',
    'NAPIT',
    'STROMA Certification',
    'ELECSA',
    'Benchmark Certification',
    'Certsure (NICEIC Group)',
    'BSI',
    'BAFE',
    'Not Registered',
    'Other'
  ];

  const organisationTypes = [
    'Sole Trader',
    'Limited Company',
    'Partnership',
    'Public Limited Company (PLC)',
    'Local Authority',
    'NHS Trust',
    'Housing Association',
    'Educational Institution',
    'Charity/Non-Profit',
    'Other'
  ];

  const additionalQualificationOptions = [
    'PAT Testing Certification',
    'Emergency Lighting Testing',
    'Fire Alarm Systems',
    'CCTV Installation',
    'Data Cabling',
    'Solar PV Installation',
    'EV Charging Point Installation',
    'Smart Home Technology',
    'Industrial Controls',
    'HVAC Electrical Systems'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Inspector name is required';
    }

    if (!formData.qualification) {
      newErrors.qualification = 'Primary qualification is required';
    }

    if (!formData.registrationBody) {
      newErrors.registrationBody = 'Registration body is required';
    }

    if (formData.registrationBody && formData.registrationBody !== 'Not Registered' && !formData.registrationNumber.trim()) {
      newErrors.registrationNumber = 'Registration number is required for registered contractors';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company/organisation name is required';
    }

    if (!formData.organisationType) {
      newErrors.organisationType = 'Organisation type is required';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      EICRDataManager.saveInspectorDetails(formData);
      onComplete(formData);
    }
  };

  const handleAdditionalQualificationChange = (qualification: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      additionalQualifications: checked 
        ? [...prev.additionalQualifications, qualification]
        : prev.additionalQualifications.filter(q => q !== qualification)
    }));
  };

  const isFormValid = formData.name && formData.qualification && formData.registrationBody && formData.companyName && formData.organisationType;

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-elec-yellow" />
            Inspector Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-elec-yellow">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter full name"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {/* Qualifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-elec-yellow">Qualifications & Registration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="qualification">Primary Qualification *</Label>
                  <Select value={formData.qualification} onValueChange={(value) => setFormData(prev => ({ ...prev, qualification: value }))}>
                    <SelectTrigger className={errors.qualification ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select qualification" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {qualifications.map(qual => (
                        <SelectItem key={qual} value={qual}>{qual}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.qualification && <p className="text-sm text-red-400 mt-1">{errors.qualification}</p>}
                </div>

                <div>
                  <Label htmlFor="registrationBody">Registration Body *</Label>
                  <Select value={formData.registrationBody} onValueChange={(value) => setFormData(prev => ({ ...prev, registrationBody: value }))}>
                    <SelectTrigger className={errors.registrationBody ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select registration body" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {registrationBodies.map(body => (
                        <SelectItem key={body} value={body}>{body}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.registrationBody && <p className="text-sm text-red-400 mt-1">{errors.registrationBody}</p>}
                </div>
              </div>

              {formData.registrationBody && formData.registrationBody !== 'Not Registered' && (
                <div>
                  <Label htmlFor="registrationNumber">Registration Number *</Label>
                  <Input
                    id="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, registrationNumber: e.target.value }))}
                    placeholder="Enter registration number"
                    className={errors.registrationNumber ? 'border-red-500' : ''}
                  />
                  {errors.registrationNumber && <p className="text-sm text-red-400 mt-1">{errors.registrationNumber}</p>}
                </div>
              )}
            </div>

            {/* Additional Qualifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-elec-yellow">Additional Qualifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {additionalQualificationOptions.map(qual => (
                  <div key={qual} className="flex items-center space-x-2">
                    <Checkbox
                      id={qual}
                      checked={formData.additionalQualifications.includes(qual)}
                      onCheckedChange={(checked) => handleAdditionalQualificationChange(qual, checked as boolean)}
                    />
                    <Label htmlFor={qual} className="text-sm">{qual}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Organisation Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-elec-yellow">Organisation Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company/Organisation Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="Enter company name"
                    className={errors.companyName ? 'border-red-500' : ''}
                  />
                  {errors.companyName && <p className="text-sm text-red-400 mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <Label htmlFor="organisationType">Organisation Type *</Label>
                  <Select value={formData.organisationType} onValueChange={(value) => setFormData(prev => ({ ...prev, organisationType: value }))}>
                    <SelectTrigger className={errors.organisationType ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select organisation type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      {organisationTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.organisationType && <p className="text-sm text-red-400 mt-1">{errors.organisationType}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="address">Business Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter business address"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="postcode">Postcode</Label>
                <Input
                  id="postcode"
                  value={formData.postcode}
                  onChange={(e) => setFormData(prev => ({ ...prev, postcode: e.target.value }))}
                  placeholder="Enter postcode"
                />
              </div>
            </div>

            {/* Insurance & Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-elec-yellow">Insurance & Additional Information</h3>
              
              <div>
                <Label htmlFor="insuranceDetails">Public Liability Insurance Details</Label>
                <Textarea
                  id="insuranceDetails"
                  value={formData.insuranceDetails}
                  onChange={(e) => setFormData(prev => ({ ...prev, insuranceDetails: e.target.value }))}
                  placeholder="Insurance provider, policy number, coverage amount, expiry date"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any additional information or notes"
                  rows={3}
                />
              </div>
            </div>

            {/* Validation Status */}
            {isFormValid ? (
              <Alert className="bg-green-500/10 border-green-500/30">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-200">
                  All required inspector details have been completed.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="bg-yellow-500/10 border-yellow-500/30">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                <AlertDescription className="text-yellow-200">
                  Please complete all required fields marked with *.
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-600">
              <Button type="button" onClick={onBack} variant="outline">
                Back to Installation Details
              </Button>
              
              <Button 
                type="submit"
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                disabled={!isFormValid}
              >
                Continue to Circuit Information
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InspectorDetailsForm;
