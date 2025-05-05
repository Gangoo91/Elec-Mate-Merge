
import { SectionData } from './types';

export const electricalSafetySection: SectionData = {
  sectionNumber: "3",
  title: "Basic Electrical Safety",
  content: {
    introduction: "Understanding basic electrical safety principles is essential for all electrical workers. This section covers fundamental safety concepts, risk assessment, and special installation considerations.",
    subsections: [
      {
        id: "1",
        title: "Electrical Safety Fundamentals",
        route: "/subsection/3/1"
      },
      {
        id: "2",
        title: "Risk Assessment in Electrical Work",
        route: "/subsection/3/2"
      },
      {
        id: "3",
        title: "Special Installations",
        route: "/subsection/3/3"
      }
    ]
  }
};
