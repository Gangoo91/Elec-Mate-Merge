
import type { SectionData } from '../healthAndSafety/types';

export const technicalInformationSection: SectionData = {
  sectionNumber: "2",
  title: "AC and DC Systems",
  content: {
    subsections: [
      {
        id: "2.1",
        title: "Direct Current (DC)",
        content: "Principles and applications of direct current (DC) in electrical systems."
      },
      {
        id: "2.2",
        title: "Alternating Current (AC)",
        content: "Principles and applications of alternating current (AC) in electrical systems."
      }
    ]
  }
};
