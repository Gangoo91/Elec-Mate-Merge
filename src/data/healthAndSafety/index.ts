
import { SectionData } from './types';
import { legislationSection } from './section1-legislation';
import { safeWorkingEnvironmentSection } from './section2-environment';
import { electricalSafetySection } from './section3-electrical';
import { accessEquipmentSection } from './section4-access';
import { hazardsSection } from './section5-hazards';
import { safeWorkingPracticesSection } from './section6-practices';

export const healthAndSafetyContent: SectionData[] = [
  legislationSection,
  safeWorkingEnvironmentSection,
  electricalSafetySection,
  accessEquipmentSection,
  hazardsSection,
  safeWorkingPracticesSection
];

export * from './types';
