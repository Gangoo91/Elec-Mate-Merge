import React from 'react';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

const FormField = ({ label, required, hint, children }: FormFieldProps) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">
      {label}{required && ' *'}
    </Label>
    {children}
    {hint && <p className="text-[10px] text-white mt-1">{hint}</p>}
  </div>
);

export default FormField;
