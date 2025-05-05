
import { SectionData } from './types';

export const accessEquipmentSection: SectionData = {
  sectionNumber: "4",
  title: "Access Equipment Safety",
  content: {
    introduction: "Working at height is common in electrical installation and requires proper safety measures. This section covers ladders, scaffolding, and other access equipment safety considerations.",
    subsections: [
      {
        id: "1",
        title: "Ladder Safety",
        route: "/subsection/4/1"
      },
      {
        id: "2",
        title: "Scaffolding and Platforms",
        route: "/subsection/4/2"
      },
      {
        id: "3",
        title: "Equipment Inspection",
        route: "/subsection/4/3"
      }
    ]
  }
};
