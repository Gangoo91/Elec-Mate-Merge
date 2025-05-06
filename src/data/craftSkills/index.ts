
import type { SectionData } from '../healthAndSafety/types';

// Craft Skills Content
export const craftSkillsContent: SectionData[] = [
  {
    sectionNumber: "1",
    title: "Basic Tools and Techniques",
    content: {
      subsections: [
        {
          id: "1.1",
          title: "Hand Tools for Electrical Work",
          content: "Essential hand tools used in electrical installation work and how to use them safely.",
          keyPoints: [
            "Screwdrivers and pliers",
            "Wire strippers and crimpers",
            "Tool maintenance"
          ]
        },
        {
          id: "1.2",
          title: "Cable Installation Techniques",
          content: "Proper techniques for installing cables in various situations.",
          keyPoints: [
            "Pulling cables through conduit",
            "Maintaining bend radii",
            "Fixing methods"
          ]
        }
      ]
    }
  },
  {
    sectionNumber: "2",
    title: "Termination and Connection",
    content: {
      subsections: [
        {
          id: "2.1",
          title: "Cable Termination Methods",
          content: "Various methods for properly terminating cables in electrical equipment.",
          keyPoints: [
            "Screw terminals",
            "Crimped connections",
            "Compression lugs"
          ]
        },
        {
          id: "2.2",
          title: "Connection Testing",
          content: "How to test electrical connections for integrity and compliance.",
          keyPoints: [
            "Continuity testing",
            "Insulation resistance",
            "Polarity checking"
          ]
        }
      ]
    }
  }
];
