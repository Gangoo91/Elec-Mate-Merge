
import { TestResult } from './testResult';

// Calculate intelligent points served based on circuit description and type
export const calculatePointsServed = (
  circuitDescription: string,
  circuitType: string,
  protectiveDeviceType: string
): string => {
  const desc = (circuitDescription || '').toLowerCase();
  const type = (circuitType || '').toLowerCase();
  const deviceType = (protectiveDeviceType || '').toLowerCase();
  
  // Sockets and Lighting circuits - leave blank for user to fill
  if (type.includes('socket') || desc.includes('socket')) return '';
  if (type.includes('light') || desc.includes('light')) return '';
  
  // Standalone protective devices (RCD, Main Switch) - 1 point
  if (deviceType.includes('rcd') && !deviceType.includes('rcbo')) return '1';
  if (desc.includes('main switch') || desc.includes('mainswitch')) return '1';
  
  // Fixed appliances - 1 point each
  if (desc.includes('cooker')) return '1';
  if (desc.includes('shower')) return '1';
  if (desc.includes('immersion')) return '1';
  if (desc.includes('ev charg') || desc.includes('car charg')) return '1';
  if (desc.includes('boiler')) return '1';
  if (desc.includes('hob')) return '1';
  if (desc.includes('oven')) return '1';
  if (desc.includes('heater') && !desc.includes('water')) return '1';
  if (desc.includes('water heater')) return '1';
  if (desc.includes('extractor')) return '1';
  if (desc.includes('fan')) return '1';
  
  // Default: 1 point for other circuits
  return '1';
};

// Auto-fill suggestions function
export const getAutoFillSuggestions = (circuitType: string): Partial<TestResult> => {
  const suggestions: Partial<TestResult> = {};
  
  switch (circuitType) {
    case 'Lighting':
      suggestions.liveSize = '1.5mm';
      suggestions.cpcSize = '1.5mm';
      suggestions.protectiveDeviceType = 'MCB';
      suggestions.protectiveDeviceRating = '6';
      suggestions.referenceMethod = '1';
      break;
    case 'Ring':
      suggestions.liveSize = '2.5mm';
      suggestions.cpcSize = '2.5mm';
      suggestions.protectiveDeviceType = 'MCB';
      suggestions.protectiveDeviceRating = '32';
      suggestions.referenceMethod = '1';
      break;
    case 'Radial':
      suggestions.liveSize = '2.5mm';
      suggestions.cpcSize = '2.5mm';
      suggestions.protectiveDeviceType = 'MCB';
      suggestions.protectiveDeviceRating = '20';
      suggestions.referenceMethod = '1';
      break;
    case 'Cooker':
      suggestions.liveSize = '6.0mm';
      suggestions.cpcSize = '6.0mm';
      suggestions.protectiveDeviceType = 'MCB';
      suggestions.protectiveDeviceRating = '32';
      suggestions.referenceMethod = '1';
      break;
    case 'Shower':
      suggestions.liveSize = '10mm';
      suggestions.cpcSize = '10mm';
      suggestions.protectiveDeviceType = 'MCB';
      suggestions.protectiveDeviceRating = '40';
      suggestions.referenceMethod = '1';
      break;
    default:
      break;
  }
  
  return suggestions;
};
