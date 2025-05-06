
import type { SectionData } from '../healthAndSafety/types';
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
import { installationMethodsSection } from './section-installation-methods';

// Export main electrical theory section
export const electricalTheorySection: SectionData = {
  sectionNumber: "0",
  title: "Electrical Theory Overview",
  content: {
    subsections: [
      {
        id: "0.1",
        title: "Introduction to Electrical Theory",
        content: "An overview of electrical theory principles and their application in electrical installation work."
      },
      {
        id: "0.2",
        title: "Key Concepts",
        content: "Key concepts and terminology used throughout the electrical theory sections."
      }
    ]
  }
};

// Export other sections
export {
  basicElectricalTheorySection,
  technicalInformationSection,
  wiringSectionsSection,
  servicePositionSection,
  lightingCircuitsSection,
  ringRadialCircuitsSection,
  circuitRequirementsSection,
  earthingBondingSection,
  overcurrentProtectionSection,
  circuitDesignSection,
  installationMethodsSection
};
