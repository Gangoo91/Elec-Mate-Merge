
import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { TestResult } from '@/types/inspection-testing';

interface ValidationMessage {
  type: 'success' | 'warning' | 'error';
  message: string;
  standard?: string;
}

interface RealTimeValidatorProps {
  stepId: string;
  value: string;
  unit: string;
  circuitType?: string;
  onValidationChange: (isValid: boolean, messages: ValidationMessage[]) => void;
}

const RealTimeValidator = ({ 
  stepId, 
  value, 
  unit, 
  circuitType = 'lighting',
  onValidationChange 
}: RealTimeValidatorProps) => {
  const [validationMessages, setValidationMessages] = useState<ValidationMessage[]>([]);

  useEffect(() => {
    if (!value || isNaN(parseFloat(value))) {
      setValidationMessages([]);
      onValidationChange(true, []);
      return;
    }

    const numValue = parseFloat(value);
    const messages = validateReading(stepId, numValue, unit, circuitType);
    const hasErrors = messages.some(m => m.type === 'error');
    
    setValidationMessages(messages);
    onValidationChange(!hasErrors, messages);
  }, [stepId, value, unit, circuitType, onValidationChange]);

  const validateReading = (stepId: string, value: number, unit: string, circuitType: string): ValidationMessage[] => {
    const messages: ValidationMessage[] = [];

    if (stepId.includes('continuity')) {
      return validateContinuity(value, unit, circuitType);
    }
    if (stepId.includes('insulation')) {
      return validateInsulation(value, unit);
    }
    if (stepId.includes('earth-fault-loop') || stepId.includes('zs')) {
      return validateEarthLoop(value, unit, circuitType);
    }
    if (stepId.includes('rcd')) {
      return validateRCD(value, unit);
    }

    return messages;
  };

  const validateContinuity = (value: number, unit: string, circuitType: string): ValidationMessage[] => {
    const messages: ValidationMessage[] = [];

    if (unit !== 'Ω') {
      messages.push({
        type: 'warning',
        message: 'Continuity should be measured in Ohms (Ω)',
        standard: 'BS 7671 Section 612.2'
      });
    }

    if (value > 1.67) {
      messages.push({
        type: 'error',
        message: `Reading ${value}Ω exceeds maximum permitted (1.67Ω)`,
        standard: 'BS 7671 Table 62'
      });
    } else if (value > 0.05) {
      messages.push({
        type: 'warning',
        message: `Reading acceptable but investigate values above 0.05Ω`,
        standard: 'IET Guidance Note 3'
      });
    } else {
      messages.push({
        type: 'success',
        message: 'Continuity test within acceptable limits',
        standard: 'BS 7671 compliant'
      });
    }

    return messages;
  };

  const validateInsulation = (value: number, unit: string): ValidationMessage[] => {
    const messages: ValidationMessage[] = [];

    if (unit !== 'MΩ') {
      messages.push({
        type: 'warning',
        message: 'Insulation resistance should be measured in MegaOhms (MΩ)',
        standard: 'BS 7671 Section 612.3'
      });
    }

    if (value < 1.0) {
      messages.push({
        type: 'error',
        message: `${value}MΩ below minimum requirement (1MΩ)`,
        standard: 'BS 7671 Table 61'
      });
    } else if (value < 2.0) {
      messages.push({
        type: 'warning',
        message: 'Consider further investigation below 2MΩ',
        standard: 'IET Guidance Note 3'
      });
    } else {
      messages.push({
        type: 'success',
        message: 'Insulation resistance within acceptable limits',
        standard: 'BS 7671 compliant'
      });
    }

    return messages;
  };

  const validateEarthLoop = (value: number, unit: string, circuitType: string): ValidationMessage[] => {
    const messages: ValidationMessage[] = [];

    if (unit !== 'Ω') {
      messages.push({
        type: 'warning',
        message: 'Earth fault loop impedance should be measured in Ohms (Ω)',
        standard: 'BS 7671 Section 612.9'
      });
    }

    // Common UK Zs limits based on protective device
    const zsLimits: { [key: string]: number } = {
      'lighting': 2.87,    // 16A Type B MCB
      'power': 1.44,       // 32A Type B MCB  
      'cooker': 0.72,      // 32A Type C MCB
      'shower': 1.15,      // 40A Type C MCB
      'immersion': 2.30    // 20A Type B MCB
    };

    const limit = zsLimits[circuitType] || 2.87;

    if (value > limit) {
      messages.push({
        type: 'error',
        message: `Zs ${value}Ω exceeds maximum (${limit}Ω) for ${circuitType} circuit`,
        standard: 'BS 7671 Appendix 3'
      });
    } else if (value > limit * 0.8) {
      messages.push({
        type: 'warning',
        message: 'Approaching Zs limit - check temperature corrections',
        standard: 'BS 7671 Section 612.9'
      });
    } else {
      messages.push({
        type: 'success',
        message: 'Earth fault loop impedance within limits',
        standard: 'BS 7671 compliant'
      });
    }

    return messages;
  };

  const validateRCD = (value: number, unit: string): ValidationMessage[] => {
    const messages: ValidationMessage[] = [];

    if (unit !== 'ms') {
      messages.push({
        type: 'warning',
        message: 'RCD trip time should be measured in milliseconds (ms)',
        standard: 'BS 7671 Section 612.13'
      });
    }

    if (value > 300) {
      messages.push({
        type: 'error',
        message: `RCD trip time ${value}ms exceeds maximum (300ms)`,
        standard: 'BS 7671 Section 415.1'
      });
    } else if (value > 40) {
      messages.push({
        type: 'warning',
        message: 'Consider testing at 5x rated current for faster trip time',
        standard: 'IET Guidance Note 3'
      });
    } else {
      messages.push({
        type: 'success',
        message: 'RCD operation within acceptable limits',
        standard: 'BS 7671 compliant'
      });
    }

    return messages;
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return XCircle;
      default: return AlertTriangle;
    }
  };

  const getColorClass = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-500/10 border-green-500/30 text-green-200';
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-200';
      case 'error': return 'bg-red-500/10 border-red-500/30 text-red-200';
      default: return 'bg-blue-500/10 border-blue-500/30 text-blue-200';
    }
  };

  if (validationMessages.length === 0) return null;

  return (
    <div className="space-y-2">
      {validationMessages.map((msg, index) => {
        const Icon = getIcon(msg.type);
        return (
          <Alert key={index} className={getColorClass(msg.type)}>
            <Icon className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-1">
                <div>{msg.message}</div>
                {msg.standard && (
                  <div className="text-xs opacity-75">
                    Reference: {msg.standard}
                  </div>
                )}
              </div>
            </AlertDescription>
          </Alert>
        );
      })}
    </div>
  );
};

export default RealTimeValidator;
