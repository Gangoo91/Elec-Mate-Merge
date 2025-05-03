
import { SectionData } from '../healthAndSafety/types';
import { basicElectricalTheorySection } from './section1-basics';
import { acDcSuppliesSection } from './section2-acdc';
import { circuitTypesSection } from './section3-circuits';
import { installationPracticesSection } from './section4-installation';
import { regulationsStandardsSection } from './section5-regulations';
import { inspectionTestingSection } from './section6-testing';
import { environmentalConsiderationsSection } from './section7-environmental';

export const electricalTheoryContent: SectionData[] = [
  basicElectricalTheorySection,
  acDcSuppliesSection,
  circuitTypesSection,
  installationPracticesSection,
  regulationsStandardsSection,
  inspectionTestingSection,
  environmentalConsiderationsSection
];

export * from '../healthAndSafety/types';
