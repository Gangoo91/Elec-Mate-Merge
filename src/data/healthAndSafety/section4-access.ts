
import { SectionData } from './types';

export const accessEquipmentSection: SectionData = {
  sectionNumber: "4",
  title: "Access Equipment Safety",
  description: "Safety considerations for using access equipment in electrical work",
  content: {
    introduction: "Working at height is common in electrical installation and requires proper safety measures. This section covers ladders, scaffolding, and other access equipment safety considerations.",
    subsections: [
      {
        id: "1",
        title: "Ladder Safety",
        content: "Proper ladder selection, inspection, and use is critical to preventing falls and injuries.",
        keyPoints: ["Always inspect ladders before use", "Maintain three points of contact", "Position ladders at the correct angle"]
      },
      {
        id: "2",
        title: "Scaffolding and Platforms",
        content: "Scaffolding and platforms must be properly erected, inspected, and maintained to ensure worker safety.",
        keyPoints: ["Only use scaffolding erected by trained personnel", "Inspect scaffolding before each use", "Ensure platforms are fully boarded"]
      },
      {
        id: "3",
        title: "Equipment Inspection",
        content: "Regular inspection of access equipment helps identify defects and prevent accidents.",
        keyPoints: ["Follow manufacturer's inspection guidelines", "Document all inspections", "Remove defective equipment from service"]
      }
    ]
  }
};
