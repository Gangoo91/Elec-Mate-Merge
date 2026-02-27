import React from 'react';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

// Form field wrapper - MUST be outside main component to prevent focus loss
const FormField = ({ label, required, hint, children }: FormFieldProps) => (
  <div className="space-y-2">
    <Label className="text-sm text-white">
      {label}
      {required && <span className="text-elec-yellow ml-1">*</span>}
    </Label>
    {children}
    {hint && <p className="text-xs text-white">{hint}</p>}
  </div>
);

export default FormField;
