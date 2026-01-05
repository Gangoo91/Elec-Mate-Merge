
import { RegulationWarning } from './regulationChecker/types';

export interface RegulationExplanation {
  regulation: string;
  plainEnglish: string;
  why: string;
  commonCauses: string[];
  fixingSuggestions: string[];
  severity: 'info' | 'warning' | 'critical';
}

// Comprehensive regulation explanations in plain English
const REGULATION_EXPLANATIONS: Record<string, RegulationExplanation> = {
  'BS 7671 Regulation 411.4.5': {
    regulation: 'BS 7671 Regulation 411.4.5',
    plainEnglish: 'The earth fault loop impedance (Zs) must be low enough to ensure the protective device operates quickly in case of an earth fault.',
    why: 'If Zs is too high, the protective device won\'t trip fast enough during an earth fault, creating a dangerous electric shock risk.',
    commonCauses: [
      'Poor earthing connections',
      'Long cable runs without adequate earth conductor',
      'Corroded or loose earth connections',
      'Inadequate main earthing terminal',
      'Poor quality supply earth'
    ],
    fixingSuggestions: [
      'Check and tighten all earthing connections',
      'Upgrade earth conductor size if necessary',
      'Improve main earthing arrangement',
      'Consider RCD protection as additional safety measure',
      'Contact DNO if supply earth is inadequate'
    ],
    severity: 'critical'
  },
  
  'BS 7671 Regulation 612.3.2': {
    regulation: 'BS 7671 Regulation 612.3.2',
    plainEnglish: 'Insulation resistance must be at least 1MΩ to ensure cables and equipment are properly insulated.',
    why: 'Low insulation resistance indicates damaged or deteriorated insulation, which could cause electric shock or fire.',
    commonCauses: [
      'Moisture ingress in cables or accessories',
      'Damaged cable insulation',
      'Deteriorated equipment insulation',
      'Condensation in electrical equipment',
      'Rodent damage to cables'
    ],
    fixingSuggestions: [
      'Identify and eliminate moisture sources',
      'Replace damaged cables or equipment',
      'Improve cable protection and routing',
      'Ensure proper IP ratings for location',
      'Use appropriate cable types for environment'
    ],
    severity: 'critical'
  },
  
  'BS 7671 Regulation 612.6': {
    regulation: 'BS 7671 Regulation 612.6',
    plainEnglish: 'All single-pole switches and protective devices must be connected in the line conductor only, not the neutral.',
    why: 'Incorrect polarity means switches might not isolate the dangerous live conductor, creating serious shock risks.',
    commonCauses: [
      'Incorrect wiring during installation',
      'Reversed line and neutral at supply',
      'Mistakes during circuit modifications',
      'Poor workmanship or lack of testing'
    ],
    fixingSuggestions: [
      'Check and correct all connections',
      'Verify supply polarity at origin',
      'Test all circuits systematically',
      'Ensure competent person carries out corrections'
    ],
    severity: 'critical'
  },
  
  'BS 7671 Regulation 411.3.3': {
    regulation: 'BS 7671 Regulation 411.3.3',
    plainEnglish: 'Socket outlets and circuits supplying portable equipment must have RCD protection (usually 30mA).',
    why: 'RCD protection provides additional safety against electric shock, especially important for portable equipment and outdoor use.',
    commonCauses: [
      'Older installations without RCD protection',
      'Circuits added without considering RCD requirements',
      'Faulty or missing RCD devices'
    ],
    fixingSuggestions: [
      'Install 30mA RCD protection',
      'Consider RCBO for individual circuit protection',
      'Test RCD devices regularly',
      'Upgrade consumer unit if necessary'
    ],
    severity: 'warning'
  },
  
  'BS 7671 Appendix 15': {
    regulation: 'BS 7671 Appendix 15',
    plainEnglish: 'Ring final circuits must be properly designed and tested to ensure load is shared equally between both legs.',
    why: 'Incorrect ring circuit installation can cause overloading of one leg, leading to overheating and potential fire risk.',
    commonCauses: [
      'Broken ring continuity',
      'Incorrect connections at sockets',
      'Ring wired as radial circuit',
      'Multiple rings interconnected incorrectly'
    ],
    fixingSuggestions: [
      'Check ring continuity end-to-end',
      'Verify correct connections at each socket',
      'Test both legs of ring separately',
      'Consider converting to radial if ring integrity cannot be maintained'
    ],
    severity: 'warning'
  },

  'BS 7671 Regulation 433.1': {
    regulation: 'BS 7671 Regulation 433.1',
    plainEnglish: 'The protective device must be rated to protect the cable from overload current.',
    why: 'If the protective device rating is too high for the cable, it won\'t protect against overload, potentially causing fire.',
    commonCauses: [
      'Oversized protective devices installed',
      'Cable size reduced without changing protection',
      'Incorrect cable rating calculations',
      'Non-compliance with cable capacity tables'
    ],
    fixingSuggestions: [
      'Check cable current carrying capacity',
      'Ensure protective device rating suits cable',
      'Apply derating factors for installation conditions',
      'Replace oversized protective devices'
    ],
    severity: 'critical'
  },

  'BS 7671 Regulation 526.3': {
    regulation: 'BS 7671 Regulation 526.3',
    plainEnglish: 'All electrical connections must be accessible for inspection, testing and maintenance.',
    why: 'Hidden or inaccessible connections can develop faults over time and cannot be properly maintained.',
    commonCauses: [
      'Connections buried in walls without access',
      'Junction boxes concealed behind fixed panels',
      'Connections in ceiling voids without access',
      'Maintenance-free claims without proper assessment'
    ],
    fixingSuggestions: [
      'Install proper access panels',
      'Use maintenance-free connection methods where appropriate',
      'Ensure all connections can be inspected',
      'Document connection locations clearly'
    ],
    severity: 'warning'
  },

  'BS 7671 Regulation 314.1': {
    regulation: 'BS 7671 Regulation 314.1',
    plainEnglish: 'Every installation must be divided into circuits to avoid danger and minimise inconvenience in case of fault.',
    why: 'Poor circuit division can mean large areas lose power during faults and make fault finding difficult.',
    commonCauses: [
      'Too few circuits for the installation size',
      'Mixed load types on single circuits',
      'Critical circuits not separated',
      'Poor load distribution planning'
    ],
    fixingSuggestions: [
      'Separate circuits by function and area',
      'Provide adequate number of circuits',
      'Keep lighting and power circuits separate',
      'Consider critical loads requiring separate supply'
    ],
    severity: 'warning'
  }
};

// Get plain English explanation for a regulation
export const getRegulationExplanation = (regulation: string): RegulationExplanation | null => {
  return REGULATION_EXPLANATIONS[regulation] || null;
};

// Get contextual fix suggestions based on warning
export const getContextualSuggestions = (warning: RegulationWarning): string[] => {
  const explanation = getRegulationExplanation(warning.regulation);
  if (!explanation) {
    // Provide generic suggestions based on warning content if no specific explanation exists
    const suggestions: string[] = [];
    
    if (warning.title.toLowerCase().includes('zs') || warning.title.toLowerCase().includes('impedance')) {
      suggestions.push('Verify all earthing connections are tight and secure');
      suggestions.push('Check earth continuity throughout the circuit');
      suggestions.push('Consider if RCD protection could provide additional safety');
    }
    
    if (warning.title.toLowerCase().includes('insulation')) {
      suggestions.push('Investigate potential moisture ingress sources');
      suggestions.push('Check for damaged cable insulation');
      suggestions.push('Ensure appropriate cable types for the environment');
    }
    
    if (warning.title.toLowerCase().includes('rcd')) {
      suggestions.push('Install appropriate RCD protection (typically 30mA for socket outlets)');
      suggestions.push('Test RCD operation regularly');
    }
    
    if (warning.title.toLowerCase().includes('polarity')) {
      suggestions.push('Check line and neutral connections throughout circuit');
      suggestions.push('Verify correct connection at consumer unit');
    }
    
    return suggestions;
  }
  
  const suggestions = [...explanation.fixingSuggestions];
  
  // Add specific suggestions based on warning content
  if (warning.title.includes('Zs')) {
    suggestions.push('Consider parallel earth paths if available');
    suggestions.push('Check protective device rating is appropriate');
  }
  
  if (warning.title.includes('Insulation')) {
    suggestions.push('Allow installation to dry if moisture detected');
    suggestions.push('Consider environmental factors affecting insulation');
  }
  
  if (warning.title.includes('RCD')) {
    suggestions.push('Verify RCD sensitivity rating (30mA for shock protection)');
    suggestions.push('Check for any RCD already in circuit path');
  }
  
  return suggestions;
};

// Generate comprehensive regulation report
export const generateRegulationReport = (warnings: RegulationWarning[]): {
  criticalCount: number;
  warningCount: number;
  explanations: RegulationExplanation[];
  overallAssessment: string;
} => {
  const criticalCount = warnings.filter(w => w.severity === 'critical').length;
  const warningCount = warnings.filter(w => w.severity === 'warning').length;
  
  const uniqueRegulations = [...new Set(warnings.map(w => w.regulation))];
  const explanations = uniqueRegulations
    .map(getRegulationExplanation)
    .filter(Boolean) as RegulationExplanation[];
  
  let overallAssessment = '';
  if (criticalCount > 0) {
    overallAssessment = `${criticalCount} critical safety issue(s) require immediate attention before the installation can be considered safe.`;
  } else if (warningCount > 0) {
    overallAssessment = `${warningCount} warning(s) identified. While not immediately dangerous, these should be addressed to ensure full compliance.`;
  } else {
    overallAssessment = 'No regulation compliance issues detected. Installation meets BS 7671 requirements.';
  }
  
  return {
    criticalCount,
    warningCount,
    explanations,
    overallAssessment
  };
};
