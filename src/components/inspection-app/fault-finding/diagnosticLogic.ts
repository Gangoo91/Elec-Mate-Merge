
import { DiagnosticResult } from './types';

export const generateResult = (userAnswers: { [key: string]: string }): DiagnosticResult => {
  // Simplified diagnostic logic based on answers
  const initial = userAnswers.initial;
  let diagnosticResult: DiagnosticResult;

  if (initial === 'Electrical shock from equipment') {
    diagnosticResult = {
      faultType: 'Earth Fault/Insulation Failure',
      confidence: 95,
      immediateActions: [
        'IMMEDIATELY isolate the affected equipment',
        'Do not touch the equipment',
        'Switch off power at the consumer unit',
        'Seek medical attention if shock was severe'
      ],
      safetyWarning: 'DANGER: Risk of electrocution - Do not use equipment until fault is found and corrected',
      nextSteps: [
        'Test earth continuity of affected equipment',
        'Check RCD operation',
        'Perform PAT testing on portable equipment',
        'Contact qualified electrician immediately'
      ]
    };
  } else if (initial === 'Burning smell or visible damage') {
    diagnosticResult = {
      faultType: 'Overheating/Fire Risk',
      confidence: 90,
      immediateActions: [
        'IMMEDIATELY isolate power supply',
        'Evacuate area if smoke present',
        'Call fire brigade if active fire',
        'Do not use water on electrical fires'
      ],
      safetyWarning: 'CRITICAL: Fire risk - Immediate professional attention required',
      nextSteps: [
        'Locate source of overheating',
        'Check all connections for looseness',
        'Thermal imaging survey if available',
        'Replace damaged components before re-energising'
      ]
    };
  } else if (initial === 'Circuit breaker/RCD tripping') {
    diagnosticResult = {
      faultType: 'Circuit Protection Operation',
      confidence: 85,
      immediateActions: [
        'Do not immediately reset the protective device',
        'Identify which circuit is affected',
        'Check for obvious causes (water, damage)',
        'Isolate loads before investigation'
      ],
      nextSteps: [
        'Test the protective device operation',
        'Check insulation resistance of affected circuits',
        'Inspect for damaged cables or connections',
        'Test each load individually'
      ]
    };
  } else {
    diagnosticResult = {
      faultType: 'General Electrical Fault',
      confidence: 70,
      immediateActions: [
        'Ensure safe working conditions',
        'Switch off affected circuits',
        'Check consumer unit for trips',
        'Document all symptoms'
      ],
      nextSteps: [
        'Systematic testing of installation',
        'Visual inspection of all accessible parts',
        'Use appropriate test equipment',
        'Consult BS 7671 for testing procedures'
      ]
    };
  }

  return diagnosticResult;
};
