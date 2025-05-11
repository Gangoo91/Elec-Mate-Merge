
/**
 * Determines if a subsection ID belongs to a specific section
 */
export const isSubsectionInSection = (subsectionId: string, sectionNumber: number): boolean => {
  if (!subsectionId) return false;
  
  // Direct match for format "sectionNumber.subsectionNumber" (e.g., "1.1")
  if (subsectionId.includes('.')) {
    const sectionPart = subsectionId.split('.')[0];
    return sectionPart === sectionNumber.toString();
  }
  
  // For numeric IDs, try to match section
  const idNum = parseInt(subsectionId, 10);
  if (!isNaN(idNum) && idNum <= 3) {
    return sectionNumber === 1;
  }
  
  return !isNaN(idNum) && Math.floor(idNum / 10) === sectionNumber - 1;
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
