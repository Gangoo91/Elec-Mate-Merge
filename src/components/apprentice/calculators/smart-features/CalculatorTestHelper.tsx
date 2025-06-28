
import { useEffect } from 'react';

interface CalculatorTestHelperProps {
  calculatorType: string;
}

const CalculatorTestHelper = ({ calculatorType }: CalculatorTestHelperProps) => {
  useEffect(() => {
    console.log('CalculatorTestHelper - Testing calculator type:', calculatorType);
    
    // Log available calculator types for debugging
    const availableCalculators = [
      'ohms-law', 'basic-wattage', 'power-triangle', 'single-phase-power',
      'power-consumption', 'appliance-power', 'power-loss', 'cable-size',
      'power-factor', 'three-phase-power', 'zs-values', 'adiabatic',
      'lumen', 'unit-converter', 'energy-cost', 'conduit-fill',
      'diversity-factor', 'earthing-system', 'rcd-trip-time'
    ];
    
    if (!availableCalculators.includes(calculatorType)) {
      console.warn('Calculator type not in available list:', calculatorType);
    }
  }, [calculatorType]);

  return null; // This is a test helper component, no UI needed
};

export default CalculatorTestHelper;
