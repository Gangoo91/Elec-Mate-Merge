
// Add this function if it doesn't exist already
export const isSubsectionInSection = (subsectionId: string, sectionNumber: number): boolean => {
  // Check if subsection ID matches pattern like "6.1" for section 6
  if (subsectionId.includes('.')) {
    const sectionPart = parseInt(subsectionId.split('.')[0]);
    return sectionPart === sectionNumber;
  }
  
  // Handle numeric only subsectionIds based on URL section
  const urlPath = window.location.pathname;
  const sectionMatch = urlPath.match(/\/section\/(\d+)/);
  if (sectionMatch && sectionMatch[1]) {
    return parseInt(sectionMatch[1]) === sectionNumber;
  }
  
  return false;
};

// Add this function if it doesn't exist already
export const isSubsectionInRange = (subsectionId: string, startSection: number, endSection: number): boolean => {
  // Check if subsection ID is in format like "6.1"
  if (subsectionId.includes('.')) {
    const sectionPart = parseInt(subsectionId.split('.')[0]);
    return sectionPart >= startSection && sectionPart <= endSection;
  }
  
  // Handle numeric only subsectionIds based on URL section
  const urlPath = window.location.pathname;
  const sectionMatch = urlPath.match(/\/section\/(\d+)/);
  if (sectionMatch && sectionMatch[1]) {
    const urlSectionNum = parseInt(sectionMatch[1]);
    return urlSectionNum >= startSection && urlSectionNum <= endSection;
  }
  
  return false;
};
