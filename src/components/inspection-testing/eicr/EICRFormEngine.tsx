
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Save, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { useEICR } from '@/contexts/EICRContext';

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'textarea' | 'date';
  required?: boolean;
  options?: string[];
  validation?: (value: any) => string | null;
  placeholder?: string;
  section: string;
}

const formFields: FormField[] = [
  // Installation Details
  { id: 'address', label: 'Installation Address', type: 'textarea', required: true, section: 'installation' },
  { id: 'description', label: 'Description of Installation', type: 'text', required: true, section: 'installation' },
  { id: 'estimatedAge', label: 'Estimated Age of Installation', type: 'select', options: ['Less than 5 years', '5-10 years', '10-20 years', '20+ years', 'Unknown'], section: 'installation' },
  { id: 'alterations', label: 'Evidence of Alterations/Additions', type: 'checkbox', section: 'installation' },
  { id: 'earthing', label: 'Earthing Arrangements', type: 'select', options: ['TN-S', 'TN-C-S', 'TT', 'IT'], required: true, section: 'installation' },
  { id: 'supply', label: 'Supply Characteristics', type: 'text', placeholder: '230V/400V, 50Hz, 3-phase', section: 'installation' },
  { id: 'mainSwitch', label: 'Main Switch Rating (A)', type: 'number', section: 'installation' },
  { id: 'mainEarth', label: 'Main Earthing Conductor (mm²)', type: 'number', section: 'installation' },
  { id: 'mainBonding', label: 'Main Bonding Conductors (mm²)', type: 'text', section: 'installation' },
  
  // Inspection Details
  { id: 'extentOfInspection', label: 'Extent of Inspection', type: 'textarea', required: true, section: 'inspection' },
  { id: 'limitations', label: 'Limitations', type: 'textarea', section: 'inspection' },
  { id: 'departures', label: 'Departures from BS 7671', type: 'textarea', section: 'inspection' },
  { id: 'riskAssessment', label: 'Risk Assessment Required', type: 'checkbox', section: 'inspection' },
  
  // Inspector Details
  { id: 'inspectorName', label: 'Inspector Name', type: 'text', required: true, section: 'inspector' },
  { id: 'qualification', label: 'Qualification', type: 'text', required: true, section: 'inspector' },
];

const EICRFormEngine = () => {
  const { eicrSession, initializeEICR } = useEICR();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (eicrSession?.eicr_report) {
      // Pre-populate form from existing EICR data
      const report = eicrSession.eicr_report;
      setFormData({
        address: report.installation_details.address,
        description: report.installation_details.description,
        estimatedAge: report.installation_details.estimated_age,
        alterations: report.installation_details.evidence_of_alterations,
        earthing: report.installation_details.earthing_arrangements,
        supply: report.installation_details.supply_characteristics,
        mainSwitch: report.installation_details.main_switch_rating,
        mainEarth: report.installation_details.main_earthing_conductor,
        mainBonding: report.installation_details.main_bonding_conductors,
        extentOfInspection: report.inspection_details.extent_of_inspection,
        limitations: report.inspection_details.limitations.join(', '),
        departures: report.inspection_details.departures_from_bs7671.join(', '),
        riskAssessment: report.inspection_details.risk_assessment_required,
        inspectorName: report.inspector_details.name,
        qualification: report.inspector_details.qualification,
      });
    }
  }, [eicrSession]);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[fieldId]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateField = (field: FormField, value: any): string | null => {
    if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return `${field.label} is required`;
    }
    
    if (field.validation) {
      return field.validation(value);
    }
    
    return null;
  };

  const validateSection = (sectionName: string): boolean => {
    const sectionFields = formFields.filter(f => f.section === sectionName);
    const errors: Record<string, string> = {};
    let isValid = true;

    sectionFields.forEach(field => {
      const error = validateField(field, formData[field.id]);
      if (error) {
        errors[field.id] = error;
        isValid = false;
      }
    });

    setValidationErrors(prev => ({ ...prev, ...errors }));
    return isValid;
  };

  const handleSectionComplete = (sectionName: string) => {
    if (validateSection(sectionName)) {
      setCompletedSections(prev => new Set(prev).add(sectionName));
      
      // Auto-save to EICR context
      saveToEICR();
    }
  };

  const saveToEICR = () => {
    if (!eicrSession) {
      // Initialize new EICR
      const installationDetails = {
        address: formData.address || '',
        description: formData.description || '',
        estimatedAge: formData.estimatedAge || '',
        alterations: formData.alterations || false,
        earthing: formData.earthing || '',
        supply: formData.supply || '',
        mainSwitch: formData.mainSwitch || '',
        mainEarth: formData.mainEarth || '',
        mainBonding: formData.mainBonding || '',
      };
      
      const inspectorDetails = {
        name: formData.inspectorName || '',
        qualification: formData.qualification || '',
      };
      
      initializeEICR(installationDetails, inspectorDetails);
    }
  };

  const renderField = (field: FormField) => {
    const value = formData[field.id] || '';
    const hasError = !!validationErrors[field.id];

    switch (field.type) {
      case 'text':
      case 'number':
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} className={hasError ? 'text-red-400' : ''}>
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </Label>
            <Input
              id={field.id}
              type={field.type}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className={`bg-elec-dark border-elec-yellow/20 ${hasError ? 'border-red-500' : ''}`}
            />
            {hasError && <p className="text-sm text-red-400">{validationErrors[field.id]}</p>}
          </div>
        );
        
      case 'textarea':
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} className={hasError ? 'text-red-400' : ''}>
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </Label>
            <Textarea
              id={field.id}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className={`bg-elec-dark border-elec-yellow/20 ${hasError ? 'border-red-500' : ''}`}
              rows={3}
            />
            {hasError && <p className="text-sm text-red-400">{validationErrors[field.id]}</p>}
          </div>
        );
        
      case 'select':
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} className={hasError ? 'text-red-400' : ''}>
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </Label>
            <Select value={value} onValueChange={(val) => handleFieldChange(field.id, val)}>
              <SelectTrigger className={`bg-elec-dark border-elec-yellow/20 ${hasError ? 'border-red-500' : ''}`}>
                <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasError && <p className="text-sm text-red-400">{validationErrors[field.id]}</p>}
          </div>
        );
        
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={value}
              onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
            />
            <Label htmlFor={field.id} className={hasError ? 'text-red-400' : ''}>
              {field.label}
            </Label>
            {hasError && <p className="text-sm text-red-400">{validationErrors[field.id]}</p>}
          </div>
        );
        
      default:
        return null;
    }
  };

  const renderSection = (sectionName: string, title: string) => {
    const sectionFields = formFields.filter(f => f.section === sectionName);
    const isCompleted = completedSections.has(sectionName);
    
    return (
      <Card key={sectionName} className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              {title}
              {isCompleted && <CheckCircle className="h-5 w-5 text-green-400" />}
            </span>
            <Badge variant={isCompleted ? "default" : "outline"} className="text-xs">
              {isCompleted ? 'Complete' : 'Pending'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sectionFields.map(field => (
            <div key={field.id}>
              {renderField(field)}
            </div>
          ))}
          <Button 
            onClick={() => handleSectionComplete(sectionName)}
            className="w-full mt-4"
            variant={isCompleted ? "outline" : "default"}
          >
            <Save className="h-4 w-4 mr-2" />
            {isCompleted ? 'Update Section' : 'Complete Section'}
          </Button>
        </CardContent>
      </Card>
    );
  };

  const sections = [
    { id: 'installation', title: 'Installation Details' },
    { id: 'inspection', title: 'Inspection Details' },
    { id: 'inspector', title: 'Inspector Details' },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-elec-yellow" />
            EICR Form Engine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>{completedSections.size} / {sections.length} sections complete</span>
            </div>
            {Object.keys(validationErrors).length > 0 && (
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="h-4 w-4" />
                <span>{Object.keys(validationErrors).length} validation errors</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {sections.map(section => renderSection(section.id, section.title))}
    </div>
  );
};

export default EICRFormEngine;
