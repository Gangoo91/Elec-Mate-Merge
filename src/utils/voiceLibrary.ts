// Common phrases for electrical testing that should be pre-cached
export const COMMON_PHRASES = [
  // Status phrases
  'Satisfactory',
  'Not applicable',
  'Pass',
  'Fail',
  'Complete',
  'Processing',
  'Please wait',
  
  // Test result confirmations
  'Test passed',
  'Test failed',
  'Reading recorded',
  'Value saved',
  'Circuit complete',
  'All tests complete',
  
  // Warnings
  'Warning: Reading out of range',
  'Caution: Please verify',
  'Alert: Attention required',
  'Error: Invalid value',
  
  // Actions
  'Moving to next circuit',
  'Marked as satisfactory',
  'C1 defect recorded',
  'C2 defect recorded',
  'C3 improvement recommended',
  'Not applicable marked',
  
  // BS 7671 references
  'Regulation 411.3.2',
  'Regulation 411.3.3',
  'Regulation 411.4.2',
  'Regulation 411.5.2',
  'BS 7671 current edition',
  'Amendment 2',
  
  // Common test names
  'R1 plus R2',
  'Insulation resistance',
  'Earth fault loop impedance',
  'Zed S',
  'RCD test',
  'Polarity test',
  'Ring final circuit',
  
  // Units
  'ohms',
  'megohms',
  'milliamps',
  'amps',
  'volts',
  'milliseconds',
  
  // Circuit types
  'Lighting circuit',
  'Socket outlet',
  'Cooker circuit',
  'Immersion heater',
  'Shower circuit',
  'Fixed appliance',
  
  // Instructions
  'Speak now',
  'Recording',
  'Voice commands active',
  'Need help? Say help or commands',
  
  // Numbers (commonly used)
  'Zero',
  'Zero point five',
  'One',
  'Two',
  'Three',
  'Five',
  'Ten',
  'Thirty',
  'Fifty',
  'One hundred',
  'Two hundred fifty',
  'Five hundred',
];

// Format electrical terms for natural speech
export const formatForSpeech = (text: string): string => {
  return text
    // Convert electrical symbols to words
    .replace(/Ω/g, 'ohms')
    .replace(/MΩ/g, 'megohms')
    .replace(/kΩ/g, 'kilo ohms')
    .replace(/mA/g, 'milliamps')
    .replace(/A\b/g, 'amps')
    .replace(/V\b/g, 'volts')
    .replace(/W\b/g, 'watts')
    .replace(/kW/g, 'kilowatts')
    .replace(/ms/g, 'milliseconds')
    .replace(/Hz/g, 'hertz')
    
    // Convert test notation to spoken format
    .replace(/R1\+R2/g, 'R one plus R two')
    .replace(/R1/g, 'R one')
    .replace(/R2/g, 'R two')
    .replace(/Zs/g, 'Zed S')
    .replace(/Ze/g, 'Zed E')
    
    // Convert comparison operators
    .replace(/>/g, 'greater than')
    .replace(/</g, 'less than')
    .replace(/≥/g, 'greater than or equal to')
    .replace(/≤/g, 'less than or equal to')
    
    // Convert special characters
    .replace(/✓/g, 'satisfactory')
    .replace(/✗/g, 'unsatisfactory')
    .replace(/N\/A/gi, 'not applicable')
    
    // Improve number readability
    .replace(/(\d+)\.(\d+)/g, (match, whole, decimal) => {
      return `${whole} point ${decimal.split('').join(' ')}`;
    })
    
    // Convert subscript/superscript numbers (if any)
    .replace(/²/g, 'squared')
    .replace(/³/g, 'cubed')
    
    // Clean up spacing
    .replace(/\s+/g, ' ')
    .trim();
};

// Group phrases by category for organized pre-caching
export const PHRASE_CATEGORIES = {
  status: COMMON_PHRASES.slice(0, 7),
  confirmations: COMMON_PHRASES.slice(7, 13),
  warnings: COMMON_PHRASES.slice(13, 17),
  actions: COMMON_PHRASES.slice(17, 23),
  regulations: COMMON_PHRASES.slice(23, 28),
  tests: COMMON_PHRASES.slice(28, 34),
  units: COMMON_PHRASES.slice(34, 40),
  circuits: COMMON_PHRASES.slice(40, 46),
  instructions: COMMON_PHRASES.slice(46, 50),
  numbers: COMMON_PHRASES.slice(50),
};
