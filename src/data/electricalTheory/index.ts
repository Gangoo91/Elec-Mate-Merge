
import { SectionData } from '../healthAndSafety/types';
import { electricalTheorySection } from './section-electrical-theory';
import { installationMethodsSection } from './section-installation-methods';
import { basicElectricalTheorySection } from './section1-basics';
import { technicalInformationSection } from './section2-acdc';
import { wiringSectionsSection } from './section3-circuits';
import { servicePositionSection } from './section4-installation';
import { lightingCircuitsSection } from './section5-regulations';
import { ringRadialCircuitsSection } from './section6-ring';
import { circuitRequirementsSection } from './section7-requirements';
import { earthingBondingSection } from './section8-earthing';
import { overcurrentProtectionSection } from './section9-protection';
import { circuitDesignSection } from './section10-design';

// Export individual sections
export const electricalTheoryContent: SectionData[] = [
  electricalTheorySection,
  basicElectricalTheorySection,
  technicalInformationSection,
  wiringSectionsSection,
  servicePositionSection,
  lightingCircuitsSection,
  ringRadialCircuitsSection,
  circuitRequirementsSection,
  earthingBondingSection,
  overcurrentProtectionSection,
  circuitDesignSection
];

// Export section data separately 
export { 
  electricalTheorySection, 
  installationMethodsSection,
  basicElectricalTheorySection,
  technicalInformationSection,
  wiringSectionsSection,
  servicePositionSection,
  lightingCircuitsSection,
  ringRadialCircuitsSection,
  circuitRequirementsSection,
  earthingBondingSection,
  overcurrentProtectionSection,
  circuitDesignSection
};
