
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
        title: "Working at Height Requirements",
        content: "Legal requirements and equipment selection for working at height safely in electrical installations.",
        keyPoints: ["Follow Work at Height Regulations 2005", "Select appropriate access equipment for each task", "Consider electrical hazards when choosing equipment"]
      },
      {
        id: "3",
        title: "MEWPs and Scaffolding",
        content: "Safe use of Mobile Elevating Work Platforms (MEWPs) and scaffolding in electrical work.",
        keyPoints: ["Only use equipment you're trained and certified to operate", "Inspect all components before assembly", "Follow manufacturer's guidelines"]
      }
    ]
  }
};
