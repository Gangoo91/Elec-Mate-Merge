
/**
 * Determines if a subsection ID belongs to a specific section
 */
export const isSubsectionInSection = (subsectionId: string, sectionNumber: number): boolean => {
  if (!subsectionId) return false;
  
  // Handle direct format match "sectionNumber.subsectionNumber" (e.g., "1.1")
  if (subsectionId.includes('.')) {
    const sectionPart = subsectionId.split('.')[0];
    return sectionPart === sectionNumber.toString();
  }
  
  // Special case for section 1 with simple numeric IDs 1, 2, 3
  if (sectionNumber === 1 && ["1", "2", "3"].includes(subsectionId)) {
    return true;
  }
  
  // For other numeric IDs, try to match section
  const idNum = parseInt(subsectionId, 10);
  if (!isNaN(idNum)) {
    if (sectionNumber === 1 && idNum <= 3) {
      return true;
    }
    
    return Math.floor(idNum / 10) === sectionNumber - 1;
  }
  
  return false;
};

/**
 * Determines if a subsection ID is within a range of sections
 */
export const isSubsectionInRange = (subsectionId: string, startSection: number, endSection: number): boolean => {
  for (let i = startSection; i <= endSection; i++) {
    if (isSubsectionInSection(subsectionId, i)) {
      return true;
    }
  }
  return false;
};
