
import { TestResult } from '@/types/testResult';

// Detect if a circuit is a ring final circuit
export const isRingCircuit = (result: TestResult): boolean => {
  const description = result.circuitDescription?.toLowerCase() || '';
  const type = result.type?.toLowerCase() || '';
  
  return description.includes('ring') || 
         type.includes('ring') ||
         (result.protectiveDeviceRating === '32' && result.liveSize === '2.5mm');
};
