import { TestResult } from '@/types/testResult';
import { RegulationWarning } from './types';

/**
 * Check for protective device directionality requirements (Amendment 3:2024)
 * Reg 530.3.201: Selection and erection of equipment for protection shall take 
 * account of appropriate use of either a unidirectional or bidirectional protective device.
 */
export const checkDeviceDirectionality = (result: TestResult): RegulationWarning[] => {
  const warnings: RegulationWarning[] = [];
  const description = result.circuitDescription?.toLowerCase() || '';
  
  // Check for installations that require bidirectional consideration
  const hasBidirectionalSource = 
    description.includes('solar') ||
    description.includes('pv') ||
    description.includes('photovoltaic') ||
    description.includes('battery') ||
    description.includes('storage') ||
    description.includes('generator') ||
    description.includes('ev charger') ||
    description.includes('ev charging') ||
    description.includes('electric vehicle');
  
  if (hasBidirectionalSource && result.protectiveDeviceType) {
    warnings.push({
      severity: 'warning',
      title: 'Check Protective Device Directionality',
      description: `Circuit "${result.circuitDescription}" may have bidirectional power flow. Verify protective device supports bidirectional operation or is correctly oriented.`,
      regulation: 'BS 7671 Regulation 530.3.201 (Amendment 3:2024)',
      suggestion: 'Check device markings for "line/load", "in/out", or directional arrows. Consult manufacturer data sheet to confirm bidirectional capability or correct orientation for reverse power flow.'
    });
  }
  
  return warnings;
};
