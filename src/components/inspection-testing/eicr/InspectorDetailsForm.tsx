
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight, User, Award, Building, Phone, Mail, Shield } from 'lucide-react';

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

  const qualifications = [
    '18th Edition BS 7671:2018+A2:2022',
    '17th Edition BS 7671:2008',
    'C&G 2391-52 Inspection & Testing',
    'C&G 2391-51 Initial Verification',
    'NVQ Level 3 Electrical Installation',
    'BTEC Level 3 Electrical Engineering',
    'Apprenticeship Completion',
    'Other Professional Qualification'
  ];

  const registrationBodies = [
    'NICEIC',
    'NAPIT',
    'ELECSA',
    'Stroma',
    'Benchmark Certification',
    'BSI',
    'BPEC',
    'Other'
  ];

  const organisationTypes = [
    'Sole Trader',
    'Limited Company',
    'Partnership',
    'Electrical Contractor',
    'Maintenance Company',
    'Local Authority',
    'Housing Association',
    'Other'
  ];

  const additionalQualificationOptions = [
    'C&G 2382-22 Requirements for Electrical Installations',
    'C&G 2377 PAT Testing',
    'C&G 2396 Design & Verification',
    'IEE Guidance Note 3',
    'COMPEX Ex Equipment',
    'First Aid Certification',
    'CSCS Card',
    'IPAF/PASMA Certification'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAdditionalQualificationToggle = (qualification: string) => {
    setFormData(prev => ({
      ...prev,
      additionalQualifications: prev.additionalQualifications.includes(qualification)
        ? prev.additionalQualifications.filter(q => q !== qualification)
        : [...prev.additionalQualifications, qualification]
    }));
  };

  const handleSubmit = () => {
    // Transform the form data to match the expected interface
    const transformedData = {
      name: formData.name,
      qualification: formData.qualification,
      company: formData.companyName, // Map companyName to company
      registrationNumber: formData.registrationNumber,
      contactDetails: `${formData.phone} | ${formData.email} | ${formData.address}, ${formData.postcode}` // Combine contact details
    };

    onComplete(transformedData);
  };

  const isFormValid = formData.name && formData.qualification && formData.companyName && formData.registrationNumber && formData.phone && formData.email;

  return (
    <Card className="border-elec-yellow/30 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-elec-yellow" />
          Inspector Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-4 w-4 text-elec-yellow" />
            <h3 className="font-medium">Personal Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter inspector's full name"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="qualification">Primary Qualification *</Label>
              <Select value={formData.qualification} onValueChange={(value) => handleInputChange('qualification', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select primary qualification" />
                </SelectTrigger>
                <SelectContent>
                  {qualifications.map((qual) => (
                    <SelectItem key={qual} value={qual}>{qual}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Registration Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Award className="h-4 w-4 text-elec-yellow" />
            <h3 className="font-medium">Registration Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="registrationBody">Registration Body</Label>
              <Select value={formData.registrationBody} onValueChange={(value) => handleInputChange('registrationBody', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select registration body" />
                </SelectTrigger>
                <SelectContent>
                  {registrationBodies.map((body) => (
                    <SelectItem key={body} value={body}>{body}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="registrationNumber">Registration Number *</Label>
              <Input
                id="registrationNumber"
                value={formData.registrationNumber}
                onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                placeholder="Enter registration number"
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Building className="h-4 w-4 text-elec-yellow" />
            <h3 className="font-medium">Company Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Enter company name"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="organisationType">Organisation Type</Label>
              <Select value={formData.organisationType} onValueChange={(value) => handleInputChange('organisationType', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select organisation type" />
                </SelectTrigger>
                <SelectContent>
                  {organisationTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter company address"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="postcode">Postcode</Label>
              <Input
                id="postcode"
                value={formData.postcode}
                onChange={(e) => handleInputChange('postcode', e.target.value)}
                placeholder="Enter postcode"
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Phone className="h-4 w-4 text-elec-yellow" />
            <h3 className="font-medium">Contact Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter phone number"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter email address"
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Insurance Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-4 w-4 text-elec-yellow" />
            <h3 className="font-medium">Insurance Information</h3>
          </div>
          
          <div>
            <Label htmlFor="insuranceDetails">Insurance Details</Label>
            <Textarea
              id="insuranceDetails"
              value={formData.insuranceDetails}
              onChange={(e) => handleInputChange('insuranceDetails', e.target.value)}
              placeholder="Enter insurance provider, policy number, and coverage details"
              className="mt-1"
            />
          </div>
        </div>

        {/* Additional Qualifications */}
        <div className="space-y-4">
          <h3 className="font-medium">Additional Qualifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {additionalQualificationOptions.map((qual) => (
              <div key={qual} className="flex items-center space-x-2">
                <Checkbox
                  id={qual}
                  checked={formData.additionalQualifications.includes(qual)}
                  onCheckedChange={() => handleAdditionalQualificationToggle(qual)}
                />
                <Label htmlFor={qual} className="text-sm">{qual}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            placeholder="Any additional notes or special requirements"
            className="mt-1"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6">
          <Button onClick={onBack} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Installation Details
          </Button>
          
          <Button 
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex items-center gap-2"
          >
            Continue to Circuits
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InspectorDetailsForm;
