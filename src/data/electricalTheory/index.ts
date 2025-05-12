
import { SectionData } from '../courseTypes';
import { legislationSection } from './section1-legislation';

// Array of electrical theory sections
export const electricalTheorySections: SectionData[] = [
  legislationSection,
  // Placeholders for the remaining sections
  {
    sectionNumber: "2",
    title: "Technical Information",
    description: "Understanding and using technical information for electrical installation work",
    content: {
      introduction: "This section covers technical documents, manufacturer information, and specifications.",
      subsections: []
    }
  },
  {
    sectionNumber: "3",
    title: "Wiring Systems",
    description: "Different wiring systems used in electrical installations",
    content: {
      introduction: "This section covers various wiring methods and systems used in electrical installations.",
      subsections: []
    }
  },
  {
    sectionNumber: "4",
    title: "Service Position Equipment",
    description: "Understanding service position components and installation requirements",
    content: {
      introduction: "This section covers service heads, meters, consumer units, and related equipment.",
      subsections: []
    }
  },
  {
    sectionNumber: "5",
    title: "Lighting Circuits",
    description: "Design and installation of lighting circuits",
    content: {
      introduction: "This section covers lighting circuit types, switching arrangements, and installation methods.",
      subsections: []
    }
  },
  {
    sectionNumber: "6",
    title: "Ring and Radial Circuits",
    description: "Understanding socket outlet circuits and their applications",
    content: {
      introduction: "This section covers ring final and radial circuit designs and applications.",
      subsections: []
    }
  },
  {
    sectionNumber: "7",
    title: "Circuit Requirements",
    description: "Specific circuit requirements for different applications",
    content: {
      introduction: "This section covers specific requirements for various circuit types.",
      subsections: []
    }
  },
  {
    sectionNumber: "8",
    title: "Earthing and Bonding",
    description: "Principles and requirements for earthing and bonding",
    content: {
      introduction: "This section covers earthing arrangements, protective bonding, and safety requirements.",
      subsections: []
    }
  },
  {
    sectionNumber: "9",
    title: "Overcurrent Protection",
    description: "Protection against overcurrent in electrical installations",
    content: {
      introduction: "This section covers fuses, circuit breakers, and protection coordination.",
      subsections: []
    }
  },
  {
    sectionNumber: "10",
    title: "Circuit Design",
    description: "Principles of circuit design for electrical installations",
    content: {
      introduction: "This section covers design principles and calculations for electrical circuits.",
      subsections: []
    }
  }
];

// Export for backward compatibility
export const electricalTheoryContent = electricalTheorySections;
