
import { SectionData } from './types';
import { legislationSection } from './section1-legislation';
import { safeWorkingEnvironmentSection } from './section2-environment';
import { electricalSafetySection } from './section3-electrical';
import { accessEquipmentSection } from './section4-access';
import { hazardsSection } from './section5-hazards';
import { safeWorkingPracticesSection } from './section6-practices';

// Combine all sections into an array
export const healthAndSafetySections: SectionData[] = [
  legislationSection,
  safeWorkingEnvironmentSection,
  electricalSafetySection,
  accessEquipmentSection,
  hazardsSection,
  safeWorkingPracticesSection
];

// For backward compatibility
export const healthAndSafetyContent = healthAndSafetySections;

// Helper function to get a specific section
export const getHealthAndSafetySection = (sectionNumber: string): SectionData | null => {
  return healthAndSafetySections.find(section => section.sectionNumber === sectionNumber) || null;
};
