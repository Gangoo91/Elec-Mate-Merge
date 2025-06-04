
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield } from 'lucide-react';
import { ValidationResult } from '@/types/inspection-testing';

interface TestStepValidationProps {
  validation: ValidationResult | null;
}

const TestStepValidation = ({ validation }: TestStepValidationProps) => {
  if (!validation) return null;

  return (
    <Alert className={`${
      validation.severity === 'error' ? 'bg-red-500/10 border-red-500/30' :
      validation.severity === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' :
      'bg-green-500/10 border-green-500/30'
    }`}>
      <Shield className={`h-4 w-4 ${
        validation.severity === 'error' ? 'text-red-400' :
        validation.severity === 'warning' ? 'text-yellow-400' :
        'text-green-400'
      }`} />
      <AlertDescription className={
        validation.severity === 'error' ? 'text-red-200' :
        validation.severity === 'warning' ? 'text-yellow-200' :
        'text-green-200'
      }>
        <strong>BS 7671 Validation:</strong> {validation.message}
      </AlertDescription>
    </Alert>
  );
};

export default TestStepValidation;
