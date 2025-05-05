
import { SectionData } from '../healthAndSafety/types';
import { electricalTheorySection } from './section-electrical-theory';
import { installationMethodsSection } from './section-installation-methods';
import { basicElectricalTheorySection } from './section1-basics';
import { acDcSuppliesSection } from './section2-acdc';
import { circuitTypesSection } from './section3-circuits';
import { installationPracticesSection } from './section4-installation';
import { regulationsStandardsSection } from './section5-regulations';
import { inspectionTestingSection } from './section6-testing';
import { environmentalConsiderationsSection } from './section7-environmental';

// Export individual sections
export const electricalTheoryContent: SectionData[] = [
  electricalTheorySection,
  basicElectricalTheorySection,
  acDcSuppliesSection,
  circuitTypesSection,
  installationPracticesSection,
  regulationsStandardsSection,
  inspectionTestingSection,
  environmentalConsiderationsSection
];

// Export section data separately 
export { 
  electricalTheorySection, 
  installationMethodsSection,
  basicElectricalTheorySection,
  acDcSuppliesSection,
  circuitTypesSection,
  installationPracticesSection,
  regulationsStandardsSection,
  inspectionTestingSection,
  environmentalConsiderationsSection
};
