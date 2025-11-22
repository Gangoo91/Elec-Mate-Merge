// Map installation methods to BS 7671 reference methods
export function getReferenceMethod(installationType: string): string {
  const type = installationType?.toLowerCase() || '';
  
  // BS 7671 Reference Methods from Appendix 4
  if (type.includes('clipped') || type.includes('direct')) return 'C';
  if (type.includes('conduit') && type.includes('wall')) return 'A1';
  if (type.includes('conduit') && type.includes('masonry')) return 'A2';
  if (type.includes('conduit') && type.includes('thermal')) return 'B1';
  if (type.includes('trunking')) return 'B2';
  if (type.includes('embedded')) return 'B1';
  if (type.includes('enclosed') && type.includes('touching')) return 'D1';
  if (type.includes('enclosed') && type.includes('spaced')) return 'D2';
  if (type.includes('free air')) return 'E';
  if (type.includes('tray') && type.includes('perforated')) return 'F';
  if (type.includes('tray') && type.includes('ladder')) return 'G';
  
  // Default to clipped direct (most common)
  return 'C';
}
