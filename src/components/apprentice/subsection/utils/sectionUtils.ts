
/**
 * Get the section number from a subsection ID
 * @param subsectionId The subsection ID (e.g. "1.1", "2.3")
 * @returns The section number (e.g. 1, 2)
 */
export const getSectionFromSubsectionId = (subsectionId: string): number => {
  const sectionNumber = parseInt(subsectionId.split('.')[0], 10);
  return isNaN(sectionNumber) ? 0 : sectionNumber;
};

/**
 * Determines if a subsection ID belongs to a specific section
 * @param subsectionId The subsection ID to check
 * @param sectionNumber The section number to compare against
 * @returns True if the subsection belongs to the section
 */
export const isSubsectionInSection = (subsectionId: string, sectionNumber: number): boolean => {
  return getSectionFromSubsectionId(subsectionId) === sectionNumber;
};

/**
 * Checks if a subsection ID is in the range between two section numbers (inclusive)
 * @param subsectionId The subsection ID to check
 * @param startSection The starting section number 
 * @param endSection The ending section number
 * @returns True if the subsection is in the range
 */
export const isSubsectionInRange = (
  subsectionId: string, 
  startSection: number, 
  endSection: number
): boolean => {
  const section = getSectionFromSubsectionId(subsectionId);
  return section >= startSection && section <= endSection;
};
