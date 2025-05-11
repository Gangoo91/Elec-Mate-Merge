
import { legislationSection } from './section1-legislation';
import { safeWorkingEnvironmentSection } from './section2-environment';
import { electricalSafetySection } from './section3-electrical';
import { accessEquipmentSection } from './section4-access';
import { hazardsSection } from './section5-hazards';
import { safeWorkingPracticesSection } from './section6-practices';

export const healthAndSafetySections = [
  legislationSection,
  safeWorkingEnvironmentSection,
  electricalSafetySection,
  accessEquipmentSection,
  hazardsSection,
  safeWorkingPracticesSection
];

export const getHealthSafetySectionById = (sectionId: string) => {
  return healthAndSafetySections.find(section => section.sectionNumber === sectionId);
};

export const getSubsectionById = (sectionId: string, subsectionId: string) => {
  const section = getHealthSafetySectionById(sectionId);
  if (!section) return null;
  
  const subsections = section.content && 
                     typeof section.content === 'object' && 
                     'subsections' in section.content ? 
                     section.content.subsections : 
                     section.subsections || [];
                     
  return subsections.find(sub => sub.id === subsectionId);
};
