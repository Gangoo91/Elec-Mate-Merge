/**
 * Fast client-side parser for common UK electrical patterns (BS 7671)
 * Extracts key information without calling GPT for speed
 */

export function fastParseElectrical(text: string, availableFields: any[]): Record<string, any> {
  const lowerText = text.toLowerCase();
  const extracted: Record<string, any> = {};
  
  // Earthing arrangement (more variations)
  if (lowerText.includes('tn-s') || lowerText.includes('tns') || lowerText.match(/\btn\s*s\b/)) {
    if (availableFields.some(f => f.name === 'earthingArrangement')) extracted.earthingArrangement = 'TN-S';
  } else if (lowerText.includes('tn-c-s') || lowerText.includes('tncs') || lowerText.includes('tn c s') || lowerText.includes('pme')) {
    if (availableFields.some(f => f.name === 'earthingArrangement')) extracted.earthingArrangement = 'TN-C-S';
  } else if (lowerText.match(/\btt\b/) || lowerText.includes('t t')) {
    if (availableFields.some(f => f.name === 'earthingArrangement')) extracted.earthingArrangement = 'TT';
  }
  
  // Phases
  if (lowerText.includes('single phase') || lowerText.match(/\bsingle\b/) || lowerText.includes('1 phase')) {
    if (availableFields.some(f => f.name === 'phases')) extracted.phases = '1';
  } else if (lowerText.includes('three phase') || lowerText.match(/\bthree\b/) || lowerText.includes('3 phase')) {
    if (availableFields.some(f => f.name === 'phases')) extracted.phases = '3';
  }
  
  // Voltage
  if (lowerText.includes('230') || lowerText.includes('two thirty')) {
    if (availableFields.some(f => f.name === 'supplyVoltage')) extracted.supplyVoltage = '230';
  } else if (lowerText.includes('400') || lowerText.includes('four hundred')) {
    if (availableFields.some(f => f.name === 'supplyVoltage')) extracted.supplyVoltage = '400';
  }
  
  // Main switch rating
  const ampMatch = text.match(/(?:main\s*switch|rating)?\s*(\d+)\s*(amp|a\b)/i);
  if (ampMatch && availableFields.some(f => f.name === 'mainProtectiveDevice')) {
    extracted.mainProtectiveDevice = `${ampMatch[1]}A main switch`;
  }
  
  // UK postcode
  const postcodeMatch = text.match(/\b([A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2})\b/i);
  if (postcodeMatch && availableFields.some(f => f.name === 'clientAddress' || f.name === 'installationAddress')) {
    const formatted = postcodeMatch[1].toUpperCase().replace(/\s+/g, '').replace(/^(.+)(\d[A-Z]{2})$/, '$1 $2');
    if (availableFields.some(f => f.name === 'clientAddress')) extracted.clientAddress = formatted;
  }
  
  // UK phone
  let phoneText = text.replace(/\boh\b/gi, '0').replace(/\s+/g, '');
  const phoneMatch = phoneText.match(/\b(07\d{9}|01\d{9})\b/);
  if (phoneMatch && availableFields.some(f => f.name === 'clientPhone')) {
    extracted.clientPhone = phoneMatch[1];
  }
  
  // Tests
  const continuityMatch = lowerText.match(/continuity[:\s]*(\d+\.?\d*)/i);
  if (continuityMatch && availableFields.some(f => f.name === 'continuity')) {
    extracted.continuity = parseFloat(continuityMatch[1]);
  }
  
  const insulationMatch = lowerText.match(/insulation[:\s]*(\d+\.?\d*)/i);
  if (insulationMatch && availableFields.some(f => f.name === 'insulationResistance')) {
    extracted.insulationResistance = parseFloat(insulationMatch[1]);
  }
  
  console.log('Fast parse:', extracted);
  return extracted;
}
