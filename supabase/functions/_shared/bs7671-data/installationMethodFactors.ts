// Map installation methods to BS 7671 reference methods
export function getReferenceMethod(installationType: string): string {
  const type = installationType?.toLowerCase() || '';
  
  // BS 7671 Reference Methods from Appendix 4
  if (type.includes('clipped') || type.includes('direct') || type.includes('swa_cleats')) return 'C';
  if (type.includes('conduit') && type.includes('wall')) return 'A1';
  if (type.includes('conduit') && type.includes('masonry')) return 'A2';
  if (type.includes('conduit') && type.includes('thermal')) return 'B1';
  if (type.includes('dado') || type.includes('skirting')) return 'B2'; // Dado/skirting trunking
  if (type.includes('trunking')) return 'B2';
  if (type.includes('embedded') || type.includes('in_wall')) return 'B1';
  if (type.includes('enclosed') && type.includes('touching')) return 'D1';
  if (type.includes('enclosed') && type.includes('spaced')) return 'D2';
  if (type.includes('free air') || type.includes('loft_joists')) return 'E';
  if (type.includes('basket') || type.includes('cable_basket')) return 'E'; // Cable basket
  if (type.includes('tray') && type.includes('perforated')) return 'F';
  if (type.includes('ladder') || type.includes('cable_ladder')) return 'G'; // Cable ladder
  if (type.includes('thermal_insulation')) return 'A2'; // In thermal insulation
  
  // Default to clipped direct (most common)
  return 'C';
}
