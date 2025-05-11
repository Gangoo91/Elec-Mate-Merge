
/**
 * Determines if a subsection ID belongs to a specific section
 */
export const isSubsectionInSection = (subsectionId: string, sectionNumber: number): boolean => {
  if (!subsectionId) return false;
  
  // Handle legacy format (e.g., "1") and new format (e.g., "1.1")
  if (subsectionId.includes('.')) {
    return subsectionId.startsWith(`${sectionNumber}.`);
  }
  
  // For numeric IDs, try to match section
  const idNum = parseInt(subsectionId, 10);
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
