/**
 * Derive work type from job description for cache categorization
 */
export function deriveWorkType(jobDescription: string, jobScale: string): string {
  const desc = jobDescription.toLowerCase();
  
  // Electrical work indicators
  if (desc.includes('electrical') || desc.includes('wiring') || desc.includes('circuit') || 
      desc.includes('socket') || desc.includes('lighting') || desc.includes('consumer unit') ||
      desc.includes('fuse') || desc.includes('switch') || desc.includes('cable')) {
    return 'electrical';
  }
  
  // Plumbing indicators  
  if (desc.includes('plumbing') || desc.includes('pipe') || desc.includes('water') ||
      desc.includes('heating') || desc.includes('boiler') || desc.includes('radiator')) {
    return 'plumbing';
  }
  
  // HVAC indicators
  if (desc.includes('hvac') || desc.includes('air conditioning') || desc.includes('ventilation') ||
      desc.includes('cooling') || desc.includes('climate')) {
    return 'hvac';
  }
  
  // Construction/Building indicators
  if (desc.includes('construction') || desc.includes('building') || desc.includes('renovation') ||
      desc.includes('demolition') || desc.includes('masonry') || desc.includes('carpentry')) {
    return 'construction';
  }
  
  // Default to job scale as fallback
  return jobScale || 'general';
}
