export type WizardStep = 'template' | 'client' | 'inspection' | 'review';

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  estimatedTime: string;
  features: string[];
  category: 'inspection' | 'installation' | 'testing' | 'certification';
  isPopular?: boolean;
  isNew?: boolean;
}

export interface WizardData {
  template: ReportTemplate | null;
  clientDetails: Record<string, any>;
  inspectionDetails: Record<string, any>;
  additionalNotes: string;
  isAutoSaving: boolean;
  lastSaved: string | null;
}

export interface StepProps {
  onNext?: () => void;
  onBack?: () => void;
}

export interface TemplateStepProps extends StepProps {
  selectedTemplate: ReportTemplate | null;
  onTemplateSelect: (template: ReportTemplate) => void;
}

export interface ClientDetailsStepProps extends StepProps {
  data: Record<string, any>;
  template: ReportTemplate | null;
  onDataChange: (data: Record<string, any>) => void;
}

export interface InspectionDetailsStepProps extends StepProps {
  data: Record<string, any>;
  template: ReportTemplate | null;
  onDataChange: (data: Record<string, any>) => void;
}

export interface ReviewGenerateStepProps extends StepProps {
  wizardData: WizardData;
  onDataChange: (section: keyof WizardData, data: any) => void;
  onReset: () => void;
}

export interface AIFormField {
  id: string;
  type: 'text' | 'select' | 'textarea' | 'date' | 'number' | 'checkbox' | 'radio';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string; description?: string }>;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  aiSuggestions?: boolean;
  conditionalOn?: {
    field: string;
    value: string | string[];
  };
  helpText?: string;
  category: string;
}