import { useState, useCallback } from 'react';

export interface ValidationResult {
  isValid: boolean;
  level: 'success' | 'warning' | 'error';
  message: string;
}

interface ValidationRule {
  validator: (value: any) => boolean;
  message: string;
  level: 'warning' | 'error';
}

export const useFormValidation = () => {
  const [validationResults, setValidationResults] = useState<Record<string, ValidationResult>>({});

  // Common validators
  const validators = {
    required: (value: any): boolean => {
      if (typeof value === 'string') return value.trim() !== '';
      return value !== null && value !== undefined && value !== '';
    },
    
    numeric: (value: any): boolean => {
      const num = parseFloat(value);
      return !isNaN(num) && isFinite(num);
    },
    
    positiveNumber: (value: any): boolean => {
      const num = parseFloat(value);
      return !isNaN(num) && num > 0;
    },
    
    range: (min: number, max: number) => (value: any): boolean => {
      const num = parseFloat(value);
      return !isNaN(num) && num >= min && num <= max;
    },
    
    email: (value: string): boolean => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    },
    
    ukPostcode: (value: string): boolean => {
      return /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i.test(value);
    }
  };

  // Electrical-specific validators
  const electricalValidators = {
    earthElectrodeResistance: (value: any): ValidationResult => {
      if (!value) return { isValid: true, level: 'warning', message: '' };
      
      const num = parseFloat(value);
      if (isNaN(num)) {
        return { isValid: false, level: 'error', message: 'Must be a valid number' };
      }
      
      if (num < 0.1 || num > 999) {
        return { isValid: false, level: 'error', message: 'Resistance must be between 0.1 and 999 Ω' };
      }
      
      if (num > 200) {
        return { isValid: true, level: 'warning', message: 'High resistance - verify earthing system' };
      }
      
      return { isValid: true, level: 'success', message: 'Valid resistance value' };
    },
    
    mainBondingSize: (value: any): ValidationResult => {
      if (!value) return { isValid: true, level: 'warning', message: '' };
      
      const validSizes = ['6mm', '10mm', '16mm', '25mm', '35mm', '50mm'];
      const normalized = value.toLowerCase().replace(/²/g, '').replace(/\s/g, '');
      
      if (!validSizes.some(size => normalized.includes(size.replace('mm', '')))) {
        return { isValid: false, level: 'error', message: 'Use standard CSA: 6mm, 10mm, 16mm, 25mm, 35mm, or 50mm' };
      }
      
      return { isValid: true, level: 'success', message: 'Valid bonding conductor size' };
    },
    
    rcdRating: (value: string): ValidationResult => {
      if (!value) return { isValid: true, level: 'warning', message: '' };
      
      const validRatings = ['30mA', '100mA', '300mA', '500mA'];
      if (!validRatings.includes(value)) {
        return { isValid: false, level: 'error', message: 'Select a standard RCD rating' };
      }
      
      return { isValid: true, level: 'success', message: 'Valid RCD rating' };
    }
  };

  const validateField = useCallback((fieldName: string, value: any, rules: ValidationRule[]): ValidationResult => {
    // Check if there's a specific electrical validator
    if (fieldName in electricalValidators) {
      return electricalValidators[fieldName as keyof typeof electricalValidators](value);
    }
    
    // Run through generic rules
    for (const rule of rules) {
      if (!rule.validator(value)) {
        return {
          isValid: false,
          level: rule.level,
          message: rule.message
        };
      }
    }
    
    return {
      isValid: true,
      level: 'success',
      message: ''
    };
  }, []);

  const validate = useCallback((fieldName: string, value: any, rules: ValidationRule[]) => {
    const result = validateField(fieldName, value, rules);
    setValidationResults(prev => ({
      ...prev,
      [fieldName]: result
    }));
    return result;
  }, [validateField]);

  const clearValidation = useCallback((fieldName: string) => {
    setValidationResults(prev => {
      const newResults = { ...prev };
      delete newResults[fieldName];
      return newResults;
    });
  }, []);

  return {
    validationResults,
    validate,
    clearValidation,
    validators,
    electricalValidators
  };
};
