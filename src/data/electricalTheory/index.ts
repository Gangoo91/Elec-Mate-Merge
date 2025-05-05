
import { SectionData } from '../healthAndSafety/types';
import { electricalTheorySection } from './section-electrical-theory';
import { installationMethodsSection } from './section-installation-methods';

// Export individual sections
export const electricalTheoryContent: SectionData[] = [
  electricalTheorySection
];

// Export section data separately 
export { 
  electricalTheorySection, 
  installationMethodsSection
};
