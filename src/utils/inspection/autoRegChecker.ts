
// Re-export everything from the new modular structure for backward compatibility
export { 
  checkRegulationCompliance, 
  checkAllResultsCompliance,
  type RegulationWarning,
  type RegulationCheckResult 
} from './regulationChecker';
