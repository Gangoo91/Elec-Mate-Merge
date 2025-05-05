
import { SectionData } from './types';

export const safeWorkingEnvironmentSection: SectionData = {
  sectionNumber: "2",
  title: "Safe Working Environment",
  content: {
    introduction: "Maintaining a safe working environment is essential in electrical installation. This section covers workplace inspections, documentation, and safety communication systems.",
    subsections: [
      {
        id: "1",
        title: "Workplace Inspection Procedures",
        route: "/subsection/2/1"
      },
      {
        id: "2",
        title: "Documentation and Record-Keeping",
        route: "/subsection/2/2"
      },
      {
        id: "3",
        title: "Safety Communication Systems",
        route: "/subsection/2/3"
      }
    ]
  }
};
